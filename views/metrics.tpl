% rebase('layout.tpl', title='Расчёт метрик графа')
<link rel="stylesheet" href="/static/content/graphs_styles.css">

<div class="main-content">
    <div class="math-intro">
        <h1>Калькулятор параметров графа</h1>
    </div>

    <div class="metrics-container">
        <!-- левая панель -->
        <div class="left-panel">

            <div class="input-section">
                <h2>Количество узлов:</h2>
                <div class="textarea-container">
                    <div class="line-numbers" id="node-count-lines">1</div>
                    <textarea class="input-field node-count-field"
                              id="node-count-textarea"
                              placeholder="Введите количество узлов..."
                              rows="1">3</textarea>
                </div>
            </div>

            <div class="input-section">
                <h2>Данные графа:</h2>
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
                <button type="button" id="metrics-calc-btn">Рассчитать</button>
                <button id="button" type="button" onclick="location.href='theory'">Теория</button>
            </div>
        </div>

        <!-- правая панель -->
        <div class="right-panel">
            <div class="graph-output">
                <h2>Визуализация графа:</h2>
                <div class="graph-container">
                    <div class="graph-placeholder">
                        Область для отображения графа
                    </div>
                </div>
            </div>
        </div>
    </div>
        <div class="panel" id="results-panel"
             style="width: 80%;  margin: 0 auto;">
        <h2>Результаты вычислений:</h2>
        <div class="section">
            <div class="description">
                <h3>Эксцентриситет вершин:</h3>
                <div id="eccentricity-result">Не рассчитано</div>
            </div>

            <div class="description">
                <h3>Радиус графа:</h3>
                <div id="radius-result">Не рассчитано</div>
            </div>

            <div class="description">
                <h3>Диаметр графа:</h3>
                <div id="diameter-result">Не рассчитано</div>
            </div>

            <div class="description">
                <h3>Центр графа:</h3>
                <div id="center-result">Не рассчитано</div>
            </div>

            <div class="description">
                <h3>Периферия графа:</h3>
                <div id="periphery-result">Не рассчитано</div>
            </div>

            <div class="description">
                <h3>Плотность графа:</h3>
                <div id="density-result">Не рассчитано</div>
            </div>
        </div>
    </div>
</div>

<footer class="site-footer">
    <div class="footer-content">
        <p>© 2025 Графовые задачи</p>
        <p><a href="https://github.com/mwh4t/BottleWebProject_C221K_C222_5_AKP.git">О проекте</a> |
            <a href="https://github.com/mwh4t/BottleWebProject_C221K_C222_5_AKP/blob/main/README.md">Документация</a></p>
    </div>
</footer>
