% rebase('layout.tpl', title='hamilton')
<link rel="stylesheet" href="/static/content/graphs_styles.css">

<div class="main-content">
    <div class="math-intro">
        <h1>Поиск Гамильтонова цикла</h1>
    </div>

    <!-- Форма ввода матрицы -->
    <div class="matrix-input">
        <h2>Матрица смежности:</h2>
        <form action="/hamilton" method="POST" id="matrix-form">
            <div class="matrix-controls">
                <label>Количество вершин (1-20):
                    <input type="number" id="matrix-size" name="size" min="1" max="20" value="4">
                </label>
            </div>

            <div class="matrix-container" id="matrix-container">
                <!-- Таблица сгенерирована JavaScript -->
            </div>
        </form>
    </div>

    <div class="buttons">
        <button id="calc-btn" type="submit" form="matrix-form">Рассчитать</button>
        <button id="theory-btn" type="button" onclick="location.href='/theory#hamilton-theory'">К теории</button>
        <button id="example-btn" type="button">Пример</button>
    </div>

    <!-- Область вывода графика -->
    <div class="graph-output">
        <h2>Визуализация графа:</h2>
        <div class="graph-container">
            <canvas id="graph-canvas"></canvas>
        </div>
    </div>
</div>

<footer class="site-footer">
    <div class="footer-content">
        <p>© 2025 Графовые задачи</p>
        <p><a href="https://github.com/mwh4t/BottleWebProject_C221K_C222_5_AKP.git">GitHub</a> |
            <a href="https://github.com/mwh4t/BottleWebProject_C221K_C222_5_AKP/blob/main/README.md">Документация</a>
        </p>
    </div>
</footer>
