% rebase('layout.tpl', title='hemilton') 
<!-- Подключение шаблона layout.tpl с заголовком страницы "hemilton" -->

<link rel="stylesheet" href="/static/content/graphs_styles.css">
<!-- Подключение внешнего CSS-файла со всеми стилями -->

<div class="math-intro">
</div>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8"> <!-- Установка кодировки на UTF-8 -->
    <title>Поиск гамильтонова цикла</title> <!-- Заголовок страницы -->
</head>
<body>

    <div class="main-content">
        <!-- Основной заголовок страницы -->
        <h1>Поиск гамильтонова цикла или цепи</h1>

        <!-- Форма для ввода матрицы смежности -->
        <form id="hamilton-form" class="matrix-input">
            <label for="adj-matrix">
                Введите матрицу смежности (через пробелы и переносы строк):
            </label><br>

            <!-- Многострочное текстовое поле для ввода матрицы -->
            <textarea id="adj-matrix" name="adj-matrix" placeholder="Пример:
0 1 1 0
1 0 1 1
1 1 0 1
0 1 1 0"></textarea>

            <!-- Кнопки действия -->
            <div class="buttons">
                <!-- Кнопка для запуска расчета -->
                <button type="button" id="calculate">Рассчитать</button>

                <!-- Кнопка для перехода на страницу с теоретическим материалом -->
                <button type="button" onclick="window.location.href='/theory'">
                    Перейти к теории
                </button>
            </div>
        </form>

        <!-- Блок заголовка для визуализации -->
        <h2>Визуализация графа:</h2>

        <!-- Контейнер, где будет отрисован граф -->
        <div class="graph-output">
            <div id="graph-canvas">
                <!-- Здесь появится визуализация графа -->
            </div>
        </div>
    </div>

    <!-- Скрипт, обрабатывающий нажатие на кнопку "Рассчитать" -->
    <script>
        document.getElementById("calculate").addEventListener("click", function() {
            const matrixText = document.getElementById("adj-matrix").value;
            // Вывод содержимого матрицы в консоль для проверки (можно убрать на продакшене)
            console.log("Расчет по введенной матрице:", matrixText);

            // Здесь будет код вызова визуализации (например, через библиотеку D3.js или vis.js)
        });
    </script>

</body>
</html>
