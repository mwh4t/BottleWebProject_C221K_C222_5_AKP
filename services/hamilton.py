import matplotlib

matplotlib.use('Agg')  # Неинтерактивный бэкенд
import matplotlib.pyplot as plt
import networkx as nx
import io
import base64
import json
import os
from datetime import datetime
from collections import defaultdict


class HamiltonianCycleFinder:
    def __init__(self, adjacency_matrix):
        self.matrix = adjacency_matrix
        self.n = len(adjacency_matrix)
        self.graph = self._create_graph()

    def _create_graph(self):
        graph = defaultdict(list)
        for i in range(self.n):
            for j in range(self.n):
                if self.matrix[i][j] == 1:
                    graph[i].append(j)
        return graph

    def _is_safe(self, v, pos, path):
        if self.matrix[path[pos - 1]][v] == 0:
            return False
        if v in path:
            return False
        return True

    def _hamiltonian_cycle_util(self, path, pos):
        if pos == self.n:
            return self.matrix[path[pos - 1]][path[0]] == 1
        for v in range(1, self.n):
            if self._is_safe(v, pos, path):
                path[pos] = v
                if self._hamiltonian_cycle_util(path, pos + 1):
                    return True
                path[pos] = -1
        return False

    def find_hamiltonian_cycle(self):
        path = [-1] * self.n
        path[0] = 0
        if self._hamiltonian_cycle_util(path, 1):
            path.append(path[0])
            return path, "Гамильтонов цикл найден"
        else:
            return None, "Гамильтонов цикл не найден"


def create_graph_visualization(adjacency_matrix, cycle=None, message=""):
    n = len(adjacency_matrix)
    G = nx.Graph()

    for i in range(n):
        G.add_node(i, label=str(i + 1))

    edges = []
    for i in range(n):
        for j in range(i + 1, n):
            if adjacency_matrix[i][j] == 1:
                G.add_edge(i, j)
                edges.append((i, j))

    plt.figure(figsize=(10, 8))
    plt.clf()

    if n <= 6:
        pos = nx.circular_layout(G)
    else:
        pos = nx.spring_layout(G, k=2, iterations=50)

    node_colors = ['lightblue'] * n
    edge_colors = ['gray'] * len(edges)

    if cycle and len(cycle) > 1:
        for v in cycle:
            if v < n:
                node_colors[v] = 'lightgreen'

        cycle_edges = []
        for i in range(len(cycle) - 1):
            u, v = cycle[i], cycle[i + 1]
            cycle_edges.append((min(u, v), max(u, v)))

        for i, (u, v) in enumerate(edges):
            if (u, v) in cycle_edges or (v, u) in cycle_edges:
                edge_colors[i] = 'red'

    nx.draw_networkx_nodes(G, pos, node_color=node_colors, node_size=800, alpha=0.9)
    nx.draw_networkx_edges(G, pos, edge_color=edge_colors, width=2, alpha=0.7)

    labels = {i: str(i + 1) for i in range(n)}
    nx.draw_networkx_labels(G, pos, labels, font_size=16, font_weight='bold')

    plt.title(f"Граф ({n} вершин)\n{message}", fontsize=14, pad=20)
    plt.axis('off')

    if cycle:
        cycle_str = " → ".join([str(v + 1) for v in cycle])
        plt.figtext(0.5, 0.02, f"Цикл: {cycle_str}", ha='center', fontsize=12, style='italic')

    buffer = io.BytesIO()
    plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight', facecolor='white', edgecolor='none')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.getvalue()).decode()
    plt.close()

    return image_base64


def save_result_to_json(result_data, filename="hamilton_results.json"):
    try:
        result_data['timestamp'] = datetime.now().isoformat()
        json_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), filename)

        existing_data = []
        if os.path.exists(json_file_path):
            try:
                with open(json_file_path, 'r', encoding='utf-8') as f:
                    existing_data = json.load(f)
                    if not isinstance(existing_data, list):
                        existing_data = [existing_data]
            except (json.JSONDecodeError, IOError):
                existing_data = []

        existing_data.append(result_data)

        if len(existing_data) > 100:
            existing_data = existing_data[-100:]

        with open(json_file_path, 'w', encoding='utf-8') as f:
            json.dump(existing_data, f, ensure_ascii=False, indent=2)

        return True, f"Данные сохранены в {filename}"

    except Exception as e:
        return False, f"Ошибка при сохранении в JSON: {str(e)}"


def process_hamilton_request(matrix_data):
    try:
        matrix = []
        size = len(matrix_data)

        for i in range(size):
            row = []
            for j in range(size):
                row.append(int(matrix_data[i][j]))
            matrix.append(row)

        finder = HamiltonianCycleFinder(matrix)
        cycle, message = finder.find_hamiltonian_cycle()

        image_base64 = create_graph_visualization(matrix, cycle, message)

        result = {
            'success': True,
            'cycle': cycle,
            'message': message,
            'image': image_base64,
            'has_cycle': cycle is not None and len(cycle) > 2,
            'graph_data': {
                'adjacency_matrix': matrix,
                'vertices_count': size,
                'edges_count': sum(sum(row) for row in matrix) // 2,
                'cycle_length': len(cycle) if cycle else 0
            }
        }

        json_data = {
            'success': result['success'],
            'cycle': result['cycle'],
            'message': result['message'],
            'has_cycle': result['has_cycle'],
            'graph_data': result['graph_data']
        }

        save_success, save_message = save_result_to_json(json_data)
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

        save_result_to_json(error_result)
        return error_result
