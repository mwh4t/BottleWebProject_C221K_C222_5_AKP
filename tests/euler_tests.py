import unittest
import sys
import os
import tempfile
import json
from unittest.mock import patch, mock_open

# Добавляем путь к модулям проекта
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'services'))

from services.euler import EulerianCycleFinder, process_euler_request, save_result_to_json


class TestEulerianCycleFinder(unittest.TestCase):
    """Тесты для класса EulerianCycleFinder"""

    def setUp(self):
        """Настройка тестовых данных"""
        # Граф с Эйлеровым циклом (треугольник)
        self.euler_cycle_matrix = [
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0]
        ]

        # Граф с Эйлеровым путем (две вершины с нечетной степенью)
        self.euler_path_matrix = [
            [0, 1, 1, 0],
            [1, 0, 1, 1],
            [1, 1, 0, 0],
            [0, 1, 0, 0]
        ]

        # Граф без Эйлерова цикла/пути (4 вершины с нечетной степенью)
        self.no_euler_matrix = [
            [0, 1, 1, 1],
            [1, 0, 1, 1],
            [1, 1, 0, 1],
            [1, 1, 1, 0]
        ]

        # Несвязный граф
        self.disconnected_matrix = [
            [0, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 0]
        ]

        # Граф с одной вершиной
        self.single_node_matrix = [[0]]

    def test_create_graph(self):
        """Тест создания графа из матрицы смежности"""
        finder = EulerianCycleFinder(self.euler_cycle_matrix)

        self.assertEqual(finder.n, 3)
        self.assertEqual(len(finder.graph), 3)
        self.assertIn(1, finder.graph[0])
        self.assertIn(2, finder.graph[0])

    def test_euler_cycle_detection(self):
        """Тест обнаружения Эйлерова цикла"""
        finder = EulerianCycleFinder(self.euler_cycle_matrix)
        has_cycle, message = finder.has_eulerian_cycle()

        self.assertTrue(has_cycle)
        self.assertIn("Эйлеров цикл", message)

    def test_euler_path_detection(self):
        """Тест обнаружения Эйлерова пути"""
        finder = EulerianCycleFinder(self.euler_path_matrix)
        has_cycle, message = finder.has_eulerian_cycle()

        self.assertFalse(has_cycle)
        self.assertIn("Эйлеров путь", message)

    def test_no_euler_detection(self):
        """Тест случая без Эйлерова цикла/пути"""
        finder = EulerianCycleFinder(self.no_euler_matrix)
        has_cycle, message = finder.has_eulerian_cycle()

        self.assertFalse(has_cycle)
        self.assertIn("не имеет Эйлерова цикла", message)

    def test_disconnected_graph(self):
        """Тест несвязного графа"""
        finder = EulerianCycleFinder(self.disconnected_matrix)
        has_cycle, message = finder.has_eulerian_cycle()

        self.assertFalse(has_cycle)
        self.assertIn("не является связным", message)

    def test_single_node_graph(self):
        """Тест графа с одной вершиной"""
        finder = EulerianCycleFinder(self.single_node_matrix)
        has_cycle, message = finder.has_eulerian_cycle()

        # Граф с одной вершиной технически имеет Эйлеров цикл
        self.assertTrue(has_cycle)
        self.assertIn("Эйлеров цикл", message)

    def test_find_euler_cycle(self):
        """Тест поиска Эйлерова цикла"""
        finder = EulerianCycleFinder(self.euler_cycle_matrix)
        cycle, message = finder.find_eulerian_cycle()

        self.assertIsNotNone(cycle)
        self.assertGreater(len(cycle), 1)
        self.assertEqual(cycle[0], cycle[-1])  # Цикл должен замыкаться
        self.assertIn("найден", message)

    def test_find_euler_path(self):
        """Тест поиска Эйлерова пути"""
        finder = EulerianCycleFinder(self.euler_path_matrix)
        cycle, message = finder.find_eulerian_cycle()

        self.assertIsNone(cycle)
        self.assertIn("путь", message)

    def test_connectivity_check(self):
        """Тест проверки связности графа"""
        # Связный граф
        finder_connected = EulerianCycleFinder(self.euler_cycle_matrix)
        self.assertTrue(finder_connected._is_connected())

        # Несвязный граф
        finder_disconnected = EulerianCycleFinder(self.disconnected_matrix)
        self.assertFalse(finder_disconnected._is_connected())


class TestDataValidation(unittest.TestCase):
    """Тесты валидации входных данных"""

    def test_valid_matrix_processing(self):
        """Тест обработки корректной матрицы"""
        matrix_data = [['0', '1', '1'], ['1', '0', '1'], ['1', '1', '0']]
        result = process_euler_request(matrix_data)

        self.assertTrue(result['success'])
        self.assertIn('cycle', result)
        self.assertIn('message', result)
        self.assertIn('graph_data', result)

    def test_invalid_matrix_values(self):
        """Тест обработки матрицы с некорректными значениями"""
        matrix_data = [['0', 'a', '1'], ['1', '0', '1'], ['1', '1', '0']]
        result = process_euler_request(matrix_data)

        self.assertFalse(result['success'])
        self.assertIn('error', result)

    def test_large_matrix(self):
        """Тест обработки большой матрицы"""
        size = 10
        matrix_data = [['0'] * size for _ in range(size)]
        # Создаем цикл: 0-1-2-...-9-0
        for i in range(size):
            matrix_data[i][(i + 1) % size] = '1'
            matrix_data[(i + 1) % size][i] = '1'

        result = process_euler_request(matrix_data)

        self.assertTrue(result['success'])
        self.assertEqual(result['graph_data']['vertices_count'], size)


if __name__ == '__main__':
    # Настройка детального вывода тестов
    unittest.main(verbosity=2)