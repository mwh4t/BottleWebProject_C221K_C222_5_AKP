% rebase('layout.tpl', title='Metrics')
<link rel="stylesheet" href="/static/content/graphs_styles.css">

<div class="main-content">
    <div class="math-intro">
        <h1>Калькулятор параметров графа</h1>
    </div>

    <div class="metrics-container">
        <!-- левая панель -->
        <div class="left-panel">

            <div class="input-section">
                <h2>Node Count:</h2>
                <div class="textarea-container">
                    <div class="line-numbers" id="node-count-lines">1</div>
                    <textarea class="input-field node-count-field"
                              id="node-count-textarea"
                              placeholder="Введите количество узлов..."
                              rows="1">3</textarea>
                </div>
            </div>

            <div class="input-section">
                <h2>Graph Data:</h2>
                <div class="textarea-container">
                    <div class="line-numbers" id="graph-data-lines">1<br>2<br>3<br>4<br>5<br>6</div>
                    <textarea class="input-field graph-data-field"
                              id="graph-data-textarea"
                              placeholder="Введите данные графа..."
                              rows="6">1
2
3
1 2
2 3
3 1</textarea>
                </div>
            </div>

            <div class="buttons">
                <button type="button" id="calc-btn">Рассчитать</button>
                <button type="button" id="example-btn">Пример</button>
            </div>

            <div class="description">
                <h3>Параметры графа:</h3>
                <ul>
                    <li>Эксцентриситет</li>
                    <li>Радиус</li>
                    <li>Диаметр</li>
                    <li>Центр</li>
                    <li>Периферию</li>
                    <li>Плотность графа</li>
                </ul>
            </div>
        </div>

        <!-- правая панель -->
        <div class="right-panel">
            <div class="graph-output">
                <h2>Визуализация графа:</h2>
                <div class="graph-container">
                    <canvas id="graph-canvas"></canvas>
                    <div class="graph-placeholder">
                        Область для отображения графа
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
