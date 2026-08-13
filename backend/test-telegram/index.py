import json
import os
import requests
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Тестирует отправку сообщения в Telegram
    """
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', 'NOT_SET')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID', 'NOT_SET')
        proxy_url = os.environ.get('PROXY_URL')
        proxies = {'http': proxy_url, 'https': proxy_url} if proxy_url else None
        
        # Проверяем getMe (информация о боте)
        me_url = f"https://api.telegram.org/bot{bot_token}/getMe"
        me_response = requests.get(me_url, timeout=15, proxies=proxies)
        me_data = me_response.json()
        
        # Пробуем отправить тестовое сообщение
        test_message = """🧪 <b>ТЕСТОВОЕ СООБЩЕНИЕ</b>

Это тест отправки уведомлений.
Если вы видите это сообщение — всё работает!

✅ Бот активен
✅ Связь установлена"""
        
        send_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        send_response = requests.post(send_url, json={
            'chat_id': chat_id,
            'text': test_message,
            'parse_mode': 'HTML'
        }, timeout=15, proxies=proxies)
        
        send_data = send_response.json()
        
        result = {
            'bot_info': me_data,
            'send_result': send_data,
            'chat_id_used': chat_id,
            'bot_token_prefix': bot_token[:20] + '...' if len(bot_token) > 20 else 'INVALID',
            'proxy_used': bool(proxy_url)
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result, ensure_ascii=False, indent=2),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }