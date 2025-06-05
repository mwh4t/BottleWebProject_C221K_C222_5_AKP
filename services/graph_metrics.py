import networkx as nx
import matplotlib.pyplot as plt
import io
import base64
import numpy as np


# преобразование входных данных в граф
def parse_graph_data(node_count, graph_data):
    lines = graph_data.strip().split('\n')

    # создание графа
    G = nx.DiGraph()

    # добавление узлов
    nodes = []
    for i in range(min(int(node_count), len(lines))):
        node_id = lines[i].strip()
        G.add_node(node_id)
        nodes.append(node_id)

    # добавление рёбер
    for i in range(int(node_count), len(lines)):
        edge = lines[i].strip().split()
        if len(edge) >= 2:
            G.add_edge(edge[0], edge[1])

    return G

# вычисление метрик графа
def calculate_metrics(G):
    metrics = {}

    # преобразование направленного графа в неориентированный
    UG = G.to_undirected()

    try:
        if not nx.is_connected(UG):
            metrics['is_connected'] = False
            metrics['eccentricity'] = "Граф несвязный"
            metrics['radius'] = "Граф несвязный"
            metrics['diameter'] = "Граф несвязный"
            metrics['center'] = "Граф несвязный"
            metrics['periphery'] = "Граф несвязный"
        else:
            metrics['is_connected'] = True

            # эксцентриситет вершин
            eccentricity = nx.eccentricity(UG)
            metrics['eccentricity'] = {node: value for node, value in eccentricity.items()}

            # радиус графа
            metrics['radius'] = nx.radius(UG)

            # диаметр графа
            metrics['diameter'] = nx.diameter(UG)

            # центр графа
            metrics['center'] = list(nx.center(UG))

            # периферия графа
            metrics['periphery'] = list(nx.periphery(UG))
    except Exception as e:
        metrics['is_connected'] = False
        metrics['error'] = str(e)

    # плотность графа
    metrics['density'] = nx.density(G)

    return metrics

# визуализация графа
def visualize_graph(G):
    # определение размера фигуры
    node_count = G.number_of_nodes()
    width_factor = max(7, min(node_count * 1.2, 12))
    height_factor = width_factor * 0.52

    plt.figure(figsize=(width_factor, height_factor))

    if node_count <= 10:
        pos = nx.spring_layout(G, seed=42, k=1.2 / np.sqrt(node_count))
    else:
        pos = nx.shell_layout(G)

    for node in pos:
        pos[node][0] *= 1.3

    # узлы с чёткими границами
    nodes = nx.draw_networkx_nodes(G, pos,
                                   node_color='lightblue',
                                   node_size=500,
                                   edgecolors='black',
                                   linewidths=1.5)

    # рёбра с указанием направления
    edges = nx.draw_networkx_edges(G, pos,
                                   arrowstyle='->',
                                   arrowsize=12,
                                   edge_color='darkblue',
                                   width=1.2)

    # подписи к узлам
    labels = nx.draw_networkx_labels(G, pos, font_size=12, font_weight='bold')

    plt.axis('off')  # отключение осей
    plt.tight_layout()  # отступы
    plt.subplots_adjust(left=-0.05, right=1.05, top=0.95, bottom=0.05)

    # сохранение изображения
    buf = io.BytesIO()
    plt.savefig(buf, format='png', dpi=100, bbox_inches='tight', pad_inches=0.05)
    buf.seek(0)

    # кодирование в Base64
    image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    plt.close()

    return image_base64

# обработка данных графа
def process_graph_data(node_count, graph_data):
    try:
        G = parse_graph_data(node_count, graph_data)

        metrics = calculate_metrics(G)
        graph_image = visualize_graph(G)

        return {
            'success': True,
            'metrics': metrics,
            'graph_image': graph_image
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

# обработка запроса на получение метрик
def handle_metrics_request(request):
    node_count = request.forms.get('node-count-textarea', '')
    graph_data = request.forms.get('graph-data-textarea', '')

    result = process_graph_data(node_count, graph_data)

    if result['success']:
        return {
            'graph_image': result['graph_image'],
            'metrics': result['metrics']
        }
    else:
        return {
            'error': result['error']
        }
