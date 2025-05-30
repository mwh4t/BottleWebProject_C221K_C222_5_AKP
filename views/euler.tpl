% rebase('layout.tpl', title='euler')

<link rel="stylesheet" href="/static/content/graphs_styles.css">

<div class="main-content">
    <div class="math-intro">
        <h1>Поиск Эйлерова</h1>
    </div>

    <!-- Форма ввода матрицы -->
    <div class="matrix-input">
        <h2>Матрица смежности:</h2>
        <form action="/calculate" method="POST">
            <textarea name="adjacency-matrix" placeholder="Введите матрицу смежности..." readonly onfocus="this.removeAttribute('readonly');">0 1 0
1 0 1
0 1 0</textarea>
            <div class="buttons">
                <button type="submit">Рассчитать</button>
                <button type="button" onclick="location.href='/theory'">К теории</button>
            </div>
        </form>
    </div>

    <!-- Область вывода графика -->
    <div class="graph-output">
        <h2>Визуализация графа:</h2>
        <div class="graph-container">
            <canvas id="graph-canvas"></canvas>
        </div>
    </div>
</div>