"""
Routes and views for the bottle application.
"""

from bottle import route, view, response, post, request
from datetime import datetime
import json
from services.euler import process_euler_request

@route('/')
@route('/home')
@view('index')
def home():
    """Renders the home page."""
    return dict(
        year=datetime.now().year
    )

@route('/about')
@view('about')
def about():
    return

@route('/euler')
@view('euler')
def euler():
    return

@route('/hamilton')
@view('hamilton')
def hamilton():
    return

@route('/metrics')
@view('metrics')
def metrics():
    return

@route('/theory')
@view('theory')
def theory():
    return

#Сбор данных из формы со смежной матрицей
@post('/calculate')
def calculate():
    """Обрабатывает POST запрос для расчёта Эйлерова цикла"""
    try:
        # Получаем размер матрицы
        size = int(request.forms.get('size', 3))

        # Собираем матрицу из формы
        matrix_data = []
        for i in range(size):
            row = []
            for j in range(size):
                cell_name = f'cell-{i}-{j}'
                cell_value = request.forms.get(cell_name, '0')
                row.append(cell_value)
            matrix_data.append(row)

        # Обрабатываем запрос
        result = process_euler_request(matrix_data)

        # Устанавливаем заголовок для JSON
        response.content_type = 'application/json'

        # Логируем информацию о сохранении (опционально)
        if 'save_info' in result and result['save_info']['saved']:
            print(f"[INFO] {result['save_info']['message']}")
        elif 'save_info' in result:
            print(f"[WARNING] Не удалось сохранить данные: {result['save_info']['message']}")

        return json.dumps(result, ensure_ascii=False)

    except Exception as e:
        response.content_type = 'application/json'
        error_response = {
            'success': False,
            'error': f'Ошибка сервера: {str(e)}',
            'message': 'Произошла ошибка при обработке запроса'
        }

        print(f"[ERROR] Ошибка в /calculate: {str(e)}")

        return json.dumps(error_response, ensure_ascii=False)


#Сохрание и чтение из euler_results.json
@route('/results')
def get_results():
    """Возвращает сохраненные результаты из JSON файла"""
    try:
        import os
        json_file_path = os.path.join(os.path.dirname(__file__), 'euler_results.json')

        if os.path.exists(json_file_path):
            with open(json_file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            response.content_type = 'application/json'
            return json.dumps({
                'success': True,
                'results': data,
                'count': len(data) if isinstance(data, list) else 1
            }, ensure_ascii=False)
        else:
            response.content_type = 'application/json'
            return json.dumps({
                'success': True,
                'results': [],
                'count': 0,
                'message': 'Файл с результатами не найден'
            }, ensure_ascii=False)

    except Exception as e:
        response.content_type = 'application/json'
        return json.dumps({
            'success': False,
            'error': f'Ошибка при чтении результатов: {str(e)}'
        }, ensure_ascii=False)