import json
import os
import psycopg2
import requests
from typing import Dict, Any
from pydantic import BaseModel, Field, field_validator

class CallbackRequest(BaseModel):
    """Модель для валидации заявки на обратный звонок"""
    phone: str = Field(..., min_length=5, max_length=50)
    contactMethod: str = Field(..., min_length=1, max_length=100)
    city: str = Field(default='khabarovsk', max_length=100)
    
    @field_validator('phone')
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        return v.strip()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Принимает заявку на обратный звонок, сохраняет в базу данных и отправляет уведомление в Telegram
    Args: event - dict с httpMethod, body, headers
          context - объект с request_id, function_name
    Returns: HTTP response dict
    """
    method: str = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    try:
        # Парсим и валидируем данные
        body_data = json.loads(event.get('body', '{}'))
        callback = CallbackRequest(**body_data)
        
        # Подключаемся к базе данных
        db_url = os.environ['DATABASE_URL']
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        contact_map = {
            'whatsapp': 'WhatsApp',
            'telegram': 'Telegram',
            'phone': 'Телефон'
        }
        
        location_map = {
            'khabarovsk': 'Хабаровск',
            'komsomolsk': 'Комсомольск-на-Амуре',
            'amursk': 'Амурск',
            'sovetskaya-gavan': 'Советская Гавань',
            'bikin': 'Бикин',
            'vyazemsky': 'Вяземский',
            'nikolaevsk': 'Николаевск-на-Амуре',
            'vanino': 'Ванино',
            'pereyaslavka': 'Переяславка',
            'khabarovsky-raion': 'Хабаровский район',
            'komsomolsky-raion': 'Комсомольский район',
            'other': 'Другой населённый пункт'
        }
        
        city_name = location_map.get(callback.city, callback.city)
        car_info = f"Обратный звонок через {contact_map.get(callback.contactMethod, callback.contactMethod)} • {city_name}"
        
        # Сохраняем заявку
        cur.execute(
            """
            INSERT INTO t_p43245144_car_buying_hk_1.leads (name, phone, car_info)
            VALUES (%s, %s, %s)
            RETURNING id
            """,
            ('Обратный звонок', callback.phone, car_info)
        )
        lead_id = cur.fetchone()[0]
        conn.commit()
        
        # Получаем общее количество заявок
        cur.execute("SELECT COUNT(*) FROM t_p43245144_car_buying_hk_1.leads")
        total_leads = cur.fetchone()[0]
        
        cur.close()
        conn.close()
        
        # Отправляем в Telegram
        bot_token = os.environ['TELEGRAM_BOT_TOKEN']
        chat_id = os.environ['TELEGRAM_CHAT_ID']
        
        message = f"""📞 <b>ОБРАТНЫЙ ЗВОНОК #{total_leads}</b>

━━━━━━━━━━━━━━━━━━━━
<b>📍 МЕСТОПОЛОЖЕНИЕ</b>
━━━━━━━━━━━━━━━━━━━━
{city_name}

━━━━━━━━━━━━━━━━━━━━
<b>📱 КОНТАКТ</b>
━━━━━━━━━━━━━━━━━━━━
✅ Способ связи: <b>{contact_map.get(callback.contactMethod, callback.contactMethod)}</b>
📱 Телефон: <code>{callback.phone}</code>

⏰ <i>Перезвонить в течение 5 минут!</i>"""
        
        # Отправляем в Telegram (не критично если не получится)
        try:
            telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            telegram_response = requests.post(telegram_url, json={
                'chat_id': chat_id,
                'text': message,
                'parse_mode': 'HTML'
            }, timeout=10)
            
            response_data = telegram_response.json()
            if not response_data.get('ok'):
                error_desc = response_data.get('description', 'Unknown error')
                print(f'Telegram API warning: {error_desc}')
        except Exception as telegram_error:
            print(f'Ошибка отправки в Telegram: {telegram_error}')
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена',
                'lead_id': lead_id
            }),
            'isBase64Encoded': False
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Неверный формат данных'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }