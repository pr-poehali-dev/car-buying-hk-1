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
    Принимает заявку на выкуп авто, сохраняет в базу данных и отправляет уведомление в WhatsApp
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
        
        # Отправляем уведомление в WhatsApp
        green_api_instance = os.environ.get('GREEN_API_INSTANCE_ID')
        green_api_token = os.environ.get('GREEN_API_TOKEN_V2')
        green_api_phone = os.environ.get('GREEN_API_NOTIFY_PHONE')
        
        whatsapp_message = f"""🚗 НОВАЯ ЗАЯВКА #{total_leads}

АВТОМОБИЛЬ: {lead.brand} {lead.model} {lead.year}

СОСТОЯНИЕ:
Техническое: {condition_map.get(lead.condition, lead.condition)}
Юридическое: {legal_map.get(lead.legalStatus, lead.legalStatus)}
Описание: {lead.description if lead.description else '—'}

МЕСТОПОЛОЖЕНИЕ: {location_map.get(lead.location, lead.location)}

КОНТАКТ:
Способ: {contact_map.get(lead.contactMethod, lead.contactMethod)}
Телефон: {lead.phone}

Время отклика: до 15 минут"""
        
        # WhatsApp через Green API с повторными попытками
        whatsapp_sent = False
        whatsapp_error_text = None
        
        if green_api_instance and green_api_token and green_api_phone:
            whatsapp_url = f"https://7107.api.greenapi.com/waInstance{green_api_instance}/sendMessage/{green_api_token}"
            for attempt in range(2):
                try:
                    whatsapp_response = requests.post(whatsapp_url, json={
                        'chatId': f'{green_api_phone}@c.us',
                        'message': whatsapp_message
                    }, timeout=8)
                    
                    if whatsapp_response.status_code == 200:
                        whatsapp_sent = True
                        break
                    else:
                        whatsapp_error_text = f'HTTP {whatsapp_response.status_code}: {whatsapp_response.text[:500]}'
                        print(f'Green API warning (попытка {attempt+1}): {whatsapp_error_text}')
                except Exception as whatsapp_error:
                    whatsapp_error_text = str(whatsapp_error)
                    print(f'Ошибка отправки в WhatsApp (попытка {attempt+1}): {whatsapp_error_text}')
        else:
            whatsapp_error_text = 'GREEN_API_INSTANCE_ID, GREEN_API_TOKEN или GREEN_API_NOTIFY_PHONE не настроены'
        
        # Сохраняем статус отправки в БД, чтобы заявка не потерялась
        try:
            conn = psycopg2.connect(db_url)
            cur = conn.cursor()
            cur.execute(
                "UPDATE t_p43245144_car_buying_hk_1.leads SET whatsapp_sent = %s, whatsapp_error = %s WHERE id = %s",
                (whatsapp_sent, whatsapp_error_text, lead_id)
            )
            conn.commit()
            cur.close()
            conn.close()
        except Exception as db_error:
            print(f'Ошибка обновления статуса уведомлений: {db_error}')
        
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