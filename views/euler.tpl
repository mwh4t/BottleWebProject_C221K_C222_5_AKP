% rebase('layout.tpl', title='euler')
<link rel="stylesheet" href="/static/content/graphs_styles.css">

<div class="main-content">
    <div class="math-intro">
        <h1>Поиск Эйлерова цикла</h1>
    </div>

    <!-- Форма ввода матрицы -->
    <div class="matrix-input">
        <h2>Матрица смежности:</h2>
        <form action="/calculate" method="POST" id="matrix-form">
            <div class="matrix-controls">
                <label>Количество вершин (1-20):
                    <input type="number" id="matrix-size" name="size" min="1" max="20" value="3">
                </label>
            </div>
            
            <div class="matrix-container" id="matrix-container">
                <!-- Таблица сгенерирована JavaScript -->
            </div>
        </form>
    </div>

    <div class="buttons">
        <button id="calc-btn" type="button">Рассчитать</button>
        <button id="teory-btn" type="button" onclick=" location.href='theory'">К теории</button>
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

<script>
    // Функция генерации матрицы
    function generateMatrix(size) {
        const container = document.getElementById('matrix-container');
        let tableHTML = '<table class="matrix-table"><tr><th></th>';
        
        // Заголовки столбцов
        for (let i = 0; i < size; i++) {
            tableHTML += `<th>${i+1}</th>`;
        }
        tableHTML += '</tr>';
        
        // Тело матрицы
        for (let i = 0; i < size; i++) {
            tableHTML += `<tr><th>${i+1}</th>`;
            for (let j = 0; j < size; j++) {
                const disabled = i === j ? 'disabled' : '';
                const value = i === j ? '0' : '';
                tableHTML += `
                    <td>
                        <input type="number" name="cell-${i}-${j}" 
                               class="matrix-cell" min="0" max="1" 
                               value="${value}" ${disabled}>
                    </td>`;
            }
            tableHTML += '</tr>';
        }
        tableHTML += '</table>';
        
        container.innerHTML = tableHTML;
        
        // Добавляем валидацию
        document.querySelectorAll('.matrix-cell').forEach(cell => {
            cell.addEventListener('change', function() {
                if (this.value !== '0' && this.value !== '1') {
                    this.style.backgroundColor = '#ffe3e3';
                    setTimeout(() => {
                        if (this.value !== '0' && this.value !== '1') {
                            this.value = '';
                        }
                        this.style.backgroundColor = '';
                    }, 1000);
                }
            });
        });
    }
    
    // Генерация примера
    function loadExample() {
        const exampleMatrix = [
            [0, 1, 0, 1],
            [1, 0, 1, 0],
            [0, 1, 0, 1],
            [1, 0, 1, 0]
        ];
        
        document.getElementById('matrix-size').value = 4;
        generateMatrix(4);
        
        // Заполняем значениями
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (i !== j) {
                    const cell = document.querySelector(`input[name="cell-${i}-${j}"]`);
                    if (cell) cell.value = exampleMatrix[i][j];
                }
            }
        }
    }
    
    // Инициализация при загрузке
    document.addEventListener('DOMContentLoaded', () => {
        generateMatrix(3);
        
        // Обработчик изменения размера
        document.getElementById('matrix-size').addEventListener('change', function() {
            generateMatrix(parseInt(this.value));
        });
        
        // Обработчик кнопки примера
        document.getElementById('example-btn').addEventListener('click', loadExample);
        
        // Обработчик отправки формы
        document.getElementById('matrix-form').addEventListener('submit', function(e) {
            const size = parseInt(document.getElementById('matrix-size').value);
            let isValid = true;
            
            // Проверка значений
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (i === j) continue;
                    const cell = document.querySelector(`input[name="cell-${i}-${j}"]`);
                    if (cell && cell.value !== '0' && cell.value !== '1') {
                        cell.style.backgroundColor = '#ffe3e3';
                        isValid = false;
                    }
                }
            }
            
            if (!isValid) {
                alert('Пожалуйста, введите только 0 или 1 в ячейки матрицы!');
                e.preventDefault();
            }
        });
    });
</script>