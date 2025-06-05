import unittest
from unittest.mock import MagicMock, patch
import sys
import os
import networkx as nx

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# нужные функции из модуля
from services.graph_metrics import (
    parse_graph_data,
    calculate_metrics,
    visualize_graph,
    process_graph_data,
    handle_metrics_request
)


class MetricsTests(unittest.TestCase):

    def test_valid_node_count_and_graph_data(self):
        # проверка корректного ввода количества узлов и данных графа
        node_count = "3"
        graph_data = "1\n2\n3\n1 2\n2 3\n3 1"

        result = process_graph_data(node_count, graph_data)

        self.assertTrue(result['success'])
        self.assertIn('metrics', result)
        self.assertIn('graph_image', result)

    def test_empty_node_count(self):
        # проверка поведения при пустом поле количества узлов
        node_count = ""
        graph_data = "1\n2\n3\n1 2\n2 3\n3 1"

        result = process_graph_data(node_count, graph_data)

        self.assertFalse(result['success'])
        self.assertIn('error', result)

    def test_non_numeric_node_count(self):
        # проверка поведения при вводе нечислового значения в поле количества узлов
        node_count = "abc"
        graph_data = "1\n2\n3\n1 2\n2 3\n3 1"

        result = process_graph_data(node_count, graph_data)

        self.assertFalse(result['success'])
        self.assertIn('error', result)

    def test_zero_node_count(self):
        # проверка поведения при вводе нулевого количества узлов
        node_count = "0"
        graph_data = "1\n2\n3\n1 2\n2 3\n3 1"

        G = parse_graph_data(node_count, graph_data)

        self.assertEqual(G.number_of_nodes(), 3)
        self.assertEqual(G.number_of_edges(), 3)

    # def test_negative_node_count(self):
    #     # проверка поведения при вводе отрицательного количества узлов
    #     node_count = "-3"
    #     graph_data = "1\n2\n3\n1 2\n2 3\n3 1"
    #
    #     result = process_graph_data(node_count, graph_data)
    #
    #     self.assertTrue(result['success'])
    #     self.assertIn('error', result)

    def test_empty_graph_data(self):
        # проверка поведения при пустом поле данных графа
        node_count = "3"
        graph_data = ""

        G = parse_graph_data(node_count, graph_data)

        self.assertEqual(G.number_of_nodes(), 1) # 1 узел
        self.assertEqual(G.number_of_edges(), 0)

    def test_malformed_graph_data(self):
        # проверка поведения при неправильно форматированных данных графа
        node_count = "3"
        graph_data = "1\n2\n3\n1 2\n2 3\nошибка"

        G = parse_graph_data(node_count, graph_data)

        self.assertEqual(G.number_of_edges(), 2)  # только первые два ребра будут добавлены

    def test_node_count_greater_than_actual_nodes(self):
        # проверка поведения когда указанное количество узлов больше фактического
        node_count = "5"
        graph_data = "1\n2\n3\n1 2\n2 3\n3 1"

        G = parse_graph_data(node_count, graph_data)

        self.assertEqual(G.number_of_nodes(), 5)  # фактически только 5 узлов

    def test_node_count_less_than_actual_nodes(self):
        # проверка поведения когда указанное количество узлов меньше фактического
        node_count = "2"
        graph_data = "1\n2\n3\n1 2\n2 3\n3 1"

        G = parse_graph_data(node_count, graph_data)

        self.assertEqual(G.number_of_nodes(), 3)  # будут добавлены только первые 3 узла
        self.assertEqual(G.number_of_edges(), 3)

    def test_request_handler_with_valid_inputs(self):
        # проверка обработчика запросов с корректными данными
        mock_request = MagicMock()
        mock_request.forms.get.side_effect = lambda key, default=None: {
            'node-count-textarea': '3',
            'graph-data-textarea': '1\n2\n3\n1 2\n2 3\n3 1'
        }.get(key, default)

        result = handle_metrics_request(mock_request)

        self.assertIn('graph_image', result)
        self.assertIn('metrics', result)

    def test_request_handler_with_invalid_node_count(self):
        # проверка обработчика запросов с некорректным количеством узлов
        mock_request = MagicMock()
        mock_request.forms.get.side_effect = lambda key, default=None: {
            'node-count-textarea': 'abc',
            'graph-data-textarea': '1\n2\n3\n1 2\n2 3\n3 1'
        }.get(key, default)

        result = handle_metrics_request(mock_request)

        self.assertIn('error', result)

    def test_large_node_count(self):
        # проверка поведения при вводе большого количества узлов
        node_count = "1000"
        graph_data = "1\n2\n3\n1 2\n2 3\n3 1"

        G = parse_graph_data(node_count, graph_data)

        self.assertEqual(G.number_of_nodes(), 6)  # только 6 узлов

    def test_graph_with_isolated_nodes(self):
        # проверка графа с изолированными узлами
        node_count = "4"
        graph_data = "1\n2\n3\n4\n1 2\n3 4"

        G = parse_graph_data(node_count, graph_data)
        metrics = calculate_metrics(G)

        self.assertEqual(G.number_of_nodes(), 4)
        self.assertEqual(G.number_of_edges(), 2)
        self.assertFalse(metrics['is_connected'])

    def test_graph_with_duplicate_edges(self):
        # проверка графа с дублирующимися рёбрами
        node_count = "3"
        graph_data = "1\n2\n3\n1 2\n1 2\n2 3"

        G = parse_graph_data(node_count, graph_data)

        self.assertEqual(G.number_of_nodes(), 3)
        self.assertEqual(G.number_of_edges(), 2)  # дубликаты не должны учитываться
