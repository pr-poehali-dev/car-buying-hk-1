import json
import os
import psycopg2
import requests
import base64
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field, field_validator

class LeadRequest(BaseModel):
    """Модель для валидации заявки на выкуп авто"""
    brand: str = Field(..., min_length=1, max_length=255)
    model: str = Field(..., min_length=1, max_length=255)
    year: str = Field(..., min_length=1, max_length=10)
    condition: str = Field(..., min_length=1, max_length=100)
    legalStatus: str = Field(..., min_length=1, max_length=100)
    description: str = Field(default='', max_length=5000)
    location: str = Field(..., min_length=1, max_length=255)
    contactMethod: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=5, max_length=50)
    photos: Optional[List[str]] = Field(default=[])
    
    @field_validator('brand', 'model', 'phone', 'year')
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        return v.strip()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Принимает заявку на выкуп авто, сохраняет в базу данных и отправляет уведомление в Telegram
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
        lead = LeadRequest(**body_data)
        
        # Подключаемся к базе данных
        db_url = os.environ['DATABASE_URL']
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        car_info = f"{lead.brand} {lead.model} {lead.year}, {lead.condition}, {lead.legalStatus}"
        
        # Сохраняем заявку
        cur.execute(
            """
            INSERT INTO t_p43245144_car_buying_hk_1.leads (name, phone, car_info)
            VALUES (%s, %s, %s)
            RETURNING id
            """,
            (lead.brand, lead.phone, car_info)
        )
        lead_id = cur.fetchone()[0]
        conn.commit()
        
        # Получаем общее количество заявок
        cur.execute("SELECT COUNT(*) FROM t_p43245144_car_buying_hk_1.leads")
        total_leads = cur.fetchone()[0]
        
        cur.close()
        conn.close()
        
        # Словари для человекочитаемых значений
        condition_map = {
            'excellent': 'Отличное',
            'good': 'Хорошее',
            'fair': 'Удовлетворительное',
            'average': 'Среднее',
            'poor': 'Плохое',
            'broken': 'Битое/на запчасти'
        }
        
        legal_map = {
            'clean': 'Чистое',
            'issues': 'Есть нюансы',
            'unclear': 'Не уверен',
            'pledge': 'Залог',
            'ban': 'Запрет на рег. действия',
            'wanted': 'В розыске',
            'problematic': 'Проблемное'
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
        
        contact_map = {
            'whatsapp': 'WhatsApp',
            'telegram': 'Telegram',
            'phone': 'Телефон'
        }
        
        # Отправляем в Telegram
        bot_token = os.environ['TELEGRAM_BOT_TOKEN']
        chat_id = os.environ['TELEGRAM_CHAT_ID']
        
        message = f"""🚗 <b>НОВАЯ ЗАЯВКА #{total_leads}</b>

<b>📋 АВТОМОБИЛЬ</b>
🚘 {lead.brand} {lead.model} {lead.year}

<b>🔧 СОСТОЯНИЕ</b>
⚙️ Техническое: <b>{condition_map.get(lead.condition, lead.condition)}</b>
📝 Юридическое: <b>{legal_map.get(lead.legalStatus, lead.legalStatus)}</b>
💬 Описание: {lead.description if lead.description else '—'}

<b>📍 МЕСТОПОЛОЖЕНИЕ</b>
{location_map.get(lead.location, lead.location)}

<b>📞 КОНТАКТ</b>
✅ Способ: <b>{contact_map.get(lead.contactMethod, lead.contactMethod)}</b>
📱 Телефон: <a href="tel:{lead.phone}">{lead.phone}</a>

⏰ <i>Время отклика: до 15 минут</i>"""
        
        # Отправляем в Telegram (не критично если не получится)
        try:
            telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            telegram_response = requests.post(telegram_url, json={
                'chat_id': chat_id,
                'text': message,
                'parse_mode': 'HTML'
            }, timeout=10)
            
            response_data = telegram_response.json()
            if response_data.get('ok'):
                # Отправляем фото если есть
                if lead.photos and len(lead.photos) > 0:
                    photo_url = f"https://api.telegram.org/bot{bot_token}/sendPhoto"
                    for i, photo_base64 in enumerate(lead.photos[:5]):
                        try:
                            if ',' in photo_base64:
                                photo_base64 = photo_base64.split(',')[1]
                            
                            photo_data = base64.b64decode(photo_base64)
                            
                            files = {
                                'photo': (f'photo{i+1}.jpg', photo_data, 'image/jpeg')
                            }
                            data = {
                                'chat_id': chat_id,
                                'caption': f'📷 Фото автомобиля {i+1}'
                            }
                            
                            requests.post(photo_url, data=data, files=files, timeout=10)
                                
                        except Exception as photo_error:
                            print(f'Ошибка отправки фото {i+1}: {photo_error}')
            else:
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
        
    except json.JSONDecodeError as e:
        print(f'JSON decode error: {str(e)}')
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
        print(f'Server error: {str(e)}')
        import traceback
        print(f'Traceback: {traceback.format_exc()}')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }