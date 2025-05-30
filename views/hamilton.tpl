% rebase('layout.tpl', title='hemilton')

<div class="math-intro">
</div>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Поиск гамильтонова цикла</title>
</head>
<body>

    <h1>Поиск гамильтонова цикла или цепи</h1>

    <form id="hamilton-form">
        <label for="adj-matrix">Введите матрицу смежности (через пробелы и переносы строк):</label><br>
        <textarea id="adj-matrix" name="adj-matrix" placeholder="Пример:
0 1 1 0
1 0 1 1
1 1 0 1
0 1 1 0"></textarea>

        <div class="buttons">
            <button type="button" id="calculate">Рассчитать</button>
            <button type="button" onclick="window.location.href='/theory'">Перейти к теории</button>
        </div>
    </form>

    <h2>Визуализация графа:</h2>
    <div id="graph-output">
        <!-- Здесь будет отображаться граф -->
    </div>

    <script>
        document.getElementById("calculate").addEventListener("click", function() {
            const matrixText = document.getElementById("adj-matrix").value;
            // Тут должен быть JS-код для отправки данных и визуализации результата
            console.log("Расчет по введенной матрице:", matrixText);
            // Здесь можно вызывать визуализацию с помощью библиотеки типа vis.js или D3.js
        });
    </script>

</body>
</html>
