import json
import os
import hmac
import psycopg2
from typing import Dict, Any

SCHEMA = 't_p43245144_car_buying_hk_1'
CORS = {'Access-Control-Allow-Origin': '*'}


def resp(code: int, data: Any) -> Dict[str, Any]:
    return {
        'statusCode': code,
        'headers': {'Content-Type': 'application/json', **CORS},
        'body': json.dumps(data, ensure_ascii=False),
        'isBase64Encoded': False
    }


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """Закрытый список заявок: просмотр и отметка «обработана». Доступ по паролю в заголовке X-Auth-Token."""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                **CORS,
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }

    headers = {k.lower(): v for k, v in (event.get('headers') or {}).items()}
    token = headers.get('x-auth-token', '')
    password = os.environ.get('ADMIN_PASSWORD', '')
    if not password or not hmac.compare_digest(token.encode(), password.encode()):
        return resp(401, {'error': 'Неверный пароль'})

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        lead_id = int(body.get('id'))
        processed = bool(body.get('processed'))
        cur.execute(
            f"UPDATE {SCHEMA}.leads SET processed = {'TRUE' if processed else 'FALSE'} WHERE id = {lead_id}"
        )
        conn.commit()
        cur.close()
        conn.close()
        return resp(200, {'success': True})

    cur.execute(
        f"""SELECT id, to_char(created_at, 'DD.MM.YYYY HH24:MI'), name, phone, car_info,
                   COALESCE(telegram_sent, FALSE), COALESCE(whatsapp_sent, FALSE), COALESCE(processed, FALSE)
            FROM {SCHEMA}.leads ORDER BY id DESC LIMIT 300"""
    )
    leads = [
        {
            'id': r[0], 'created_at': r[1], 'name': r[2], 'phone': r[3], 'car_info': r[4],
            'telegram_sent': r[5], 'whatsapp_sent': r[6], 'processed': r[7]
        }
        for r in cur.fetchall()
    ]
    cur.close()
    conn.close()
    return resp(200, {'leads': leads})
