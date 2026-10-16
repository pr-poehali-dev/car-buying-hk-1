import json
import os
import requests


def handler(event, context):
    """Диагностика Green API: статус, привязанный номер, журнал последних исходящих сообщений"""
    inst = os.environ.get('GREEN_API_INSTANCE_ID', '')
    tok = os.environ.get('GREEN_API_TOKEN_V2', '')
    phone = os.environ.get('GREEN_API_NOTIFY_PHONE', '')
    base = f"https://{inst[:4]}.api.green-api.com/waInstance{inst}"
    out = {'notify_phone_tail': phone[-6:], 'notify_phone_len': len(phone), 'instance_len': len(inst), 'instance_head': inst[:4], 'instance_tail': inst[-4:], 'token_head': tok[:3], 'token_len': len(tok)}

    def call(name, method, url, body=None):
        try:
            r = requests.request(method, url, json=body, timeout=8)
            out[name] = {'http': r.status_code, 'body': r.text[:600]}
        except Exception as e:
            out[name] = str(e)[:200]

    call('state', 'GET', f"{base}/getStateInstance/{tok}")
    call('wa_account', 'GET', f"{base}/getWaSettings/{tok}")
    call('check_whatsapp', 'POST', f"{base}/checkWhatsapp/{tok}", {'phoneNumber': int(phone) if phone.isdigit() else 0})
    call('last_outgoing', 'GET', f"{base}/lastOutgoingMessages/{tok}?minutes=60")
    return {'statusCode': 200, 'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 'body': json.dumps(out, ensure_ascii=False)}
