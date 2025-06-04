import matplotlib

matplotlib.use('Agg')  # Используем не-интерактивный бэкенд
import matplotlib.pyplot as plt
import networkx as nx
import numpy as np
import io
import base64
import json
import os
from datetime import datetime
from collections import defaultdict


class EulerianCycleFinder:
    def __init__(self, adjacency_matrix):
        self.matrix = adjacency_matrix
        self.n = len(adjacency_matrix)
        self.graph = self._create_graph()

    def _create_graph(self):
        """Создаёт граф из матрицы смежности"""
        graph = defaultdict(list)
        for i in range(self.n):
            for j in range(self.n):
                if self.matrix[i][j] == 1:
                    graph[i].append(j)
        return graph

    def has_eulerian_cycle(self):
        """Проверяет, есть ли в графе Эйлеров цикл"""
        # Для неориентированного графа: все вершины должны иметь чётную степень
        # Для ориентированного графа: входящая степень = исходящей степени для всех вершин

        # Проверяем, является ли граф связным
        if not self._is_connected():
            return False, "Граф не является связным"

        # Проверяем степени вершин (считаем граф неориентированным)
        degrees = [0] * self.n
        for i in range(self.n):
            for j in range(self.n):
                if self.matrix[i][j] == 1:
                    degrees[i] += 1

        # Все степени должны быть чётными
        odd_degree_vertices = [i for i in range(self.n) if degrees[i] % 2 == 1]

        if len(odd_degree_vertices) == 0:
            return True, "Граф имеет Эйлеров цикл"
        elif len(odd_degree_vertices) == 2:
            return False, f"Граф имеет Эйлеров путь (вершины с нечётной степенью: {[v + 1 for v in odd_degree_vertices]})"
        else:
            return False, f"Граф не имеет Эйлерова цикла или пути (вершин с нечётной степенью: {len(odd_degree_vertices)})"

    def _is_connected(self):
        """Проверяет связность графа"""
        if self.n == 0:
            return True

        # Находим первую вершину с рёбрами
        start = -1
        for i in range(self.n):
            if sum(self.matrix[i]) > 0:
                start = i
                break

        if start == -1:  # Нет рёбер
            return True

        # DFS для проверки связности
        visited = [False] * self.n
        self._dfs(start, visited)

        # Проверяем, что все вершины с рёбрами посещены
        for i in range(self.n):
            if sum(self.matrix[i]) > 0 and not visited[i]:
                return False

        return True

    def _dfs(self, v, visited):
        """Обход в глубину"""
        visited[v] = True
        for u in range(self.n):
            if self.matrix[v][u] == 1 and not visited[u]:
                self._dfs(u, visited)

    def find_eulerian_cycle(self):
        """Находит Эйлеров цикл методом Флёри"""
        has_cycle, message = self.has_eulerian_cycle()
        if not has_cycle:
            return None, message

        # Создаём копию матрицы для модификации
        temp_matrix = [row[:] for row in self.matrix]

        # Начинаем с первой вершины, имеющей рёбра
        start = 0
        for i in range(self.n):
            if sum(temp_matrix[i]) > 0:
                start = i
                break

        cycle = [start]
        current = start

        while True:
            # Находим следующее ребро
            next_vertex = self._find_next_edge(current, temp_matrix)
            if next_vertex == -1:
                break

            # Удаляем ребро
            temp_matrix[current][next_vertex] = 0
            temp_matrix[next_vertex][current] = 0

            cycle.append(next_vertex)
            current = next_vertex

        if len(cycle) > 1 and cycle[0] == cycle[-1]:
            return cycle, "Эйлеров цикл найден"
        else:
            return cycle, "Найден Эйлеров путь"

    def _find_next_edge(self, v, matrix):
        """Находит следующее ребро для алгоритма Флёри"""
        # Сначала ищем не-мостовые рёбра
        for u in range(self.n):
            if matrix[v][u] == 1:
                if not self._is_bridge(v, u, matrix):
                    return u

        # Если все рёбра - мосты, берём любое
        for u in range(self.n):
            if matrix[v][u] == 1:
                return u

        return -1

    def _is_bridge(self, u, v, matrix):
        """Проверяет, является ли ребро мостом"""
        # Временно удаляем ребро
        matrix[u][v] = 0
        matrix[v][u] = 0

        # Проверяем связность
        visited = [False] * self.n
        self._dfs_bridge(u, visited, matrix)

        is_bridge = not visited[v]

        # Восстанавливаем ребро
        matrix[u][v] = 1
        matrix[v][u] = 1

        return is_bridge

    def _dfs_bridge(self, v, visited, matrix):
        """DFS для проверки мостов"""
        visited[v] = True
        for u in range(self.n):
            if matrix[v][u] == 1 and not visited[u]:
                self._dfs_bridge(u, visited, matrix)


def create_graph_visualization(adjacency_matrix, cycle=None, message=""):
    """Создаёт визуализацию графа с помощью matplotlib"""
    n = len(adjacency_matrix)

    # Создаём граф NetworkX
    G = nx.Graph()

    # Добавляем вершины
    for i in range(n):
        G.add_node(i, label=str(i + 1))

    # Добавляем рёбра
    edges = []
    for i in range(n):
        for j in range(i + 1, n):  # Избегаем дублирования рёбер
            if adjacency_matrix[i][j] == 1:
                G.add_edge(i, j)
                edges.append((i, j))

    # Настройки для визуализации
    plt.figure(figsize=(10, 8))
    plt.clf()

    # Позиционирование вершин
    if n <= 6:
        pos = nx.circular_layout(G)
    else:
        pos = nx.spring_layout(G, k=2, iterations=50)

    # Цвета для вершин и рёбер
    node_colors = ['lightblue'] * n
    edge_colors = ['gray'] * len(edges)

    # Если есть цикл, выделяем его
    if cycle and len(cycle) > 1:
        # Выделяем вершины цикла
        for v in cycle:
            if v < n:
                node_colors[v] = 'lightgreen'

        # Выделяем рёбра цикла
        cycle_edges = []
        for i in range(len(cycle) - 1):
            u, v = cycle[i], cycle[i + 1]
            cycle_edges.append((min(u, v), max(u, v)))

        for i, (u, v) in enumerate(edges):
            if (u, v) in cycle_edges or (v, u) in cycle_edges:
                edge_colors[i] = 'red'

    # Рисуем граф
    nx.draw_networkx_nodes(G, pos, node_color=node_colors,
                           node_size=800, alpha=0.9)
    nx.draw_networkx_edges(G, pos, edge_color=edge_colors,
                           width=2, alpha=0.7)

    # Подписи вершин
    labels = {i: str(i + 1) for i in range(n)}
    nx.draw_networkx_labels(G, pos, labels, font_size=16, font_weight='bold')

    plt.title(f"Граф ({n} вершин)\n{message}", fontsize=14, pad=20)
    plt.axis('off')

    # Добавляем информацию о цикле
    if cycle:
        cycle_str = " → ".join([str(v + 1) for v in cycle])
        plt.figtext(0.5, 0.02, f"Цикл: {cycle_str}",
                    ha='center', fontsize=12, style='italic')

    # Сохраняем в base64
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.getvalue()).decode()
    plt.close()

    return image_base64


def save_result_to_json(result_data, filename="euler_results.json"):
    """Сохраняет результаты в JSON файл"""
    try:
        # Добавляем временную метку
        result_data['timestamp'] = datetime.now().isoformat()

        # Путь к файлу в корне проекта
        json_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), filename)

        # Читаем существующие данные, если файл существует
        existing_data = []
        if os.path.exists(json_file_path):
            try:
                with open(json_file_path, 'r', encoding='utf-8') as f:
                    existing_data = json.load(f)
                    if not isinstance(existing_data, list):
                        existing_data = [existing_data]  # Если файл содержит один объект
            except (json.JSONDecodeError, IOError):
                existing_data = []  # Если файл поврежден, начинаем с пустого списка

        # Добавляем новый результат
        existing_data.append(result_data)

        # Ограничиваем количество сохраненных результатов (например, последние 100)
        if len(existing_data) > 100:
            existing_data = existing_data[-100:]

        # Сохраняем обновленные данные
        with open(json_file_path, 'w', encoding='utf-8') as f:
            json.dump(existing_data, f, ensure_ascii=False, indent=2)

        return True, f"Данные сохранены в {filename}"

    except Exception as e:
        return False, f"Ошибка при сохранении в JSON: {str(e)}"


def process_euler_request(matrix_data):
    """Обрабатывает запрос на поиск Эйлерова цикла"""
    try:
        # Парсим матрицу
        matrix = []
        size = len(matrix_data)

        for i in range(size):
            row = []
            for j in range(size):
                row.append(int(matrix_data[i][j]))
            matrix.append(row)

        # Создаём объект для поиска цикла
        finder = EulerianCycleFinder(matrix)

        # Ищем цикл
        cycle, message = finder.find_eulerian_cycle()

        # Создаём визуализацию
        image_base64 = create_graph_visualization(matrix, cycle, message)

        # Подготавливаем данные для результата
        result = {
            'success': True,
            'cycle': cycle,
            'message': message,
            'image': image_base64,
            'has_cycle': cycle is not None and len(cycle) > 2,
            'graph_data': {
                'adjacency_matrix': matrix,
                'vertices_count': size,
                'edges_count': sum(sum(row) for row in matrix) // 2,  # Для неориентированного графа
                'cycle_length': len(cycle) if cycle else 0
            }
        }

        # Сохраняем результат в JSON (без изображения для экономии места)
        json_data = {
            'success': result['success'],
            'cycle': result['cycle'],
            'message': result['message'],
            'has_cycle': result['has_cycle'],
            'graph_data': result['graph_data']
        }

        save_success, save_message = save_result_to_json(json_data)

        # Добавляем информацию о сохранении в результат
        result['save_info'] = {
            'saved': save_success,
            'message': save_message
        }

        return result

    except Exception as e:
        error_result = {
            'success': False,
            'error': f"Ошибка при обработке: {str(e)}",
            'message': 'Произошла ошибка при анализе графа'
        }

        # Пытаемся сохранить и информацию об ошибке
        save_result_to_json(error_result)

        return error_result