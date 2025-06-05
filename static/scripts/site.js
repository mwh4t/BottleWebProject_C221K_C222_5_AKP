


// обработка textarea с номерами строк
document.addEventListener('DOMContentLoaded', function () {
    const nodeCountTextarea =
        document.getElementById('node-count-textarea');
    const graphDataTextarea =
        document.getElementById('graph-data-textarea');

    if (nodeCountTextarea || graphDataTextarea) {
        const nodeCountLines =
            document.getElementById('node-count-lines');
        const graphDataLines =
            document.getElementById('graph-data-lines');

        // обновление номеров строк
        function updateLineNumbers(textarea, lineNumbersDiv) {
            const lines = textarea.value.split('\n');
            const lineCount = lines.length;

            let numbersHTML = '';
            for (let i = 1; i <= lineCount; i++) {
                numbersHTML += i + (i < lineCount ? '<br>' : '');
            }
            lineNumbersDiv.innerHTML = numbersHTML;

            // фиксированная высота
            const fixedLineHeight = '20px';
            lineNumbersDiv.style.lineHeight = fixedLineHeight;
            textarea.style.lineHeight = fixedLineHeight;

            const paddingTop =
                parseInt(getComputedStyle(textarea).paddingTop);
            const paddingBottom =
                parseInt(getComputedStyle(textarea).paddingBottom);

            const newHeight =
                (lineCount * parseInt(fixedLineHeight)) + paddingTop + paddingBottom;
            const minHeight =
                parseInt(textarea.getAttribute('rows')) * parseInt(fixedLineHeight) + paddingTop + paddingBottom;

            textarea.style.height = Math.max(newHeight, minHeight) + 'px';
            lineNumbersDiv.style.height = textarea.style.height;
        }

        // ограничение строк
        function limitLines(textarea, maxLines) {
            const lines = textarea.value.split('\n');
            if (lines.length > maxLines) {
                textarea.value = lines.slice(0, maxLines).join('\n');
                return true;
            }
            return false;
        }

        if (nodeCountTextarea && nodeCountLines) {
            nodeCountTextarea.addEventListener('input',
                function () {
                    if (limitLines(this, 1)) {
                        // позиционирование курсора в конец
                        this.selectionStart = this.selectionEnd = this.value.length;
                    }
                    updateLineNumbers(this, nodeCountLines);
                });

            nodeCountTextarea.addEventListener('keydown',
                function (e) {
                    // предотвращение ввода новой строки
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    } else {
                        setTimeout(() => {
                            limitLines(this, 1);
                            updateLineNumbers(this, nodeCountLines);
                        }, 0);
                    }
                });
        }

        if (graphDataTextarea && graphDataLines) {
            graphDataTextarea.addEventListener('input',
                function () {
                    if (limitLines(this, 20)) {
                        // позиционирование курсора в конец
                        this.selectionStart = this.selectionEnd = this.value.length;
                    }
                    updateLineNumbers(this, graphDataLines);
                });

            graphDataTextarea.addEventListener('keydown',
                function (e) {
                    setTimeout(() => {
                        limitLines(this, 20);
                        updateLineNumbers(this, graphDataLines);
                    }, 0);
                });
        }

        const calcBtn =
            document.getElementById('calc-btn');
        if (calcBtn) {
            calcBtn.addEventListener('click', function () {
                alert('Функция расчёта будет добавлена позже');
            });
        }

        if (nodeCountTextarea && nodeCountLines) {
            limitLines(nodeCountTextarea, 1);
            updateLineNumbers(nodeCountTextarea, nodeCountLines);
        }
        if (graphDataTextarea && graphDataLines) {
            limitLines(graphDataTextarea, 20);
            updateLineNumbers(graphDataTextarea, graphDataLines);
        }
    }
});



// функция генерации матрицы
function generateMatrix(size) {
    const container = document
        .getElementById('matrix-container');
    let tableHTML = '<table class="matrix-table"><tr><th></th>';

    // заголовки столбцов
    for (let i = 0; i < size; i++) {
        tableHTML += `<th>${i + 1}</th>`;
    }
    tableHTML += '</tr>';

    // тело матрицы
    for (let i = 0; i < size; i++) {
        tableHTML += `<tr><th>${i + 1}</th>`;
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

    // добавляем валидацию
    document.querySelectorAll('.matrix-cell')
        .forEach(cell => {
            cell.addEventListener('change', function () {
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

// генерация примера
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
                const cell = document
                    .querySelector(`input[name="cell-${i}-${j}"]`);
                if (cell) cell.value = exampleMatrix[i][j];
            }
        }
    }
}

// инициализация при загрузке
document.addEventListener('DOMContentLoaded',
    () => {
        generateMatrix(3);

        // обработчик изменения размера
        document.getElementById('matrix-size')
            .addEventListener('change', function () {
                generateMatrix(parseInt(this.value));
            });

        // обработчик кнопки примера
        document.getElementById('example-btn')
            .addEventListener('click', loadExample);

        // обработчик отправки формы
        document.getElementById('matrix-form')
            .addEventListener('submit', function (e) {
                const size = parseInt(document
                    .getElementById('matrix-size').value);
                let isValid = true;

                // проверка значений
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        if (i === j) continue;
                        const cell = document
                            .querySelector(`input[name="cell-${i}-${j}"]`);
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


//Добавленно, при созании логики рабоыт Эйлерова цикла
function calculateEulerCycle() {
    const form = document.getElementById('matrix-form');
    const formData = new FormData(form);
    const calcBtn = document.getElementById('calc-btn');
    const canvas = document.getElementById('graph-canvas');
    const graphContainer = document.querySelector('.graph-container');

    // Блокируем кнопку на время расчёта
    calcBtn.disabled = true;
    calcBtn.textContent = 'Рассчитываем...';

    // Очищаем предыдущий результат
    canvas.style.display = 'none';
    graphContainer.innerHTML = '<canvas id="graph-canvas"></canvas><div id="loading">Обработка данных...</div>';

    // Отправляем запрос
    fetch('/calculate', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Убираем индикатор загрузки
            const loading = document.getElementById('loading');
            if (loading) loading.remove();

            if (data.success) {
                displayResult(data);
            } else {
                displayError(data.error || data.message);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            displayError('Произошла ошибка при соединении с сервером');
        })
        .finally(() => {
            // Разблокируем кнопку
            calcBtn.disabled = false;
            calcBtn.textContent = 'Рассчитать';
        });
}

// функция отображения результата
function displayResult(data) {
    const graphContainer = document.querySelector('.graph-container');

    // Создаём элемент для отображения изображения
    const resultHTML = `
        <div class="result-container">
            <div class="result-message">
                <h3>${data.message}</h3>
                ${data.cycle ? `<p><strong>Найденный путь:</strong> ${data.cycle.map(v => v + 1).join(' → ')}</p>` : ''}
            </div>
            <div class="graph-image">
                <img src="data:image/png;base64,${data.image}" alt="Визуализация графа" />
            </div>
        </div>
    `;

    graphContainer.innerHTML = resultHTML;
}

// функция отображения ошибки
function displayError(errorMessage) {
    const graphContainer = document.querySelector('.graph-container');

    const errorHTML = `
        <div class="error-container">
            <h3>Ошибка</h3>
            <p>${errorMessage}</p>
        </div>
    `;

    graphContainer.innerHTML = errorHTML;
}

// инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    generateMatrix(3);

    // обработчик изменения размера
    document.getElementById('matrix-size')
        .addEventListener('change', function () {
            generateMatrix(parseInt(this.value));
        });

    // обработчик кнопки примера
    document.getElementById('example-btn')
        .addEventListener('click', loadExample);

    // обработчик кнопки расчёта
    const calcBtn = document.getElementById('calc-btn');
    if (calcBtn) {
        calcBtn.addEventListener('click', function () {
            // Проверяем валидность формы перед отправкой
            const size = parseInt(document.getElementById('matrix-size').value);
            let isValid = true;

            // проверка значений
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
                return;
            }

            calculateEulerCycle();
        });
    }

    // обработчик отправки формы (для предотвращения стандартной отправки)
    document.getElementById('matrix-form')
        .addEventListener('submit', function (e) {
            e.preventDefault();
            calculateEulerCycle();
        });
});

// Гамильтонов цикл

// выдвижение сайдбара (оставляем без изменений)
$(document).ready(function () {
    if ($('#sidebar').hasClass('collapsed')) {
        $('#content').addClass('expanded');
    }

    $('#sidebarToggle').on('click', function () {
        $('#sidebar').toggleClass('collapsed');
        $('#content').toggleClass('expanded');
        console.log('Sidebar toggled');
    });
});


// функция генерации матрицы
function generateMatrix(size) {
    const container = document.getElementById('hamilton-matrix-container');
    let tableHTML = '<table class="matrix-table"><tr><th></th>';

    for (let i = 0; i < size; i++) {
        tableHTML += `<th>${i + 1}</th>`;
    }
    tableHTML += '</tr>';

    for (let i = 0; i < size; i++) {
        tableHTML += `<tr><th>${i + 1}</th>`;
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

    document.querySelectorAll('.matrix-cell')
        .forEach(cell => {
            cell.addEventListener('change', function () {
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

// генерация примера
function loadExample() {
    const exampleMatrix = [
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0]
    ];

    document.getElementById('hamilton-matrix-size').value = 4;
    generateMatrix(4);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i !== j) {
                const cell = document.querySelector(`input[name="cell-${i}-${j}"]`);
                if (cell) cell.value = exampleMatrix[i][j];
            }
        }
    }
}

// Алгоритм поиска Гамильтонова цикла (бэктрекинг)
function findHamiltonianCycle(graph) {
    const n = graph.length;
    const path = Array(n).fill(-1);
    path[0] = 0;

    function isSafe(v, pos) {
        if (graph[path[pos - 1]][v] === 0) return false;
        if (path.includes(v)) return false;
        return true;
    }

    function util(pos) {
        if (pos === n) {
            return graph[path[pos - 1]][path[0]] === 1;
        }

        for (let v = 1; v < n; v++) {
            if (isSafe(v, pos)) {
                path[pos] = v;
                if (util(pos + 1)) return true;
                path[pos] = -1;
            }
        }
        return false;
    }

    if (!util(1)) return null;
    path.push(path[0]);
    return path;
}

// Генерация матрицы (как в первом скрипте)
function generateHamiltonMatrix(size) {
    const container = document.getElementById('hamilton-matrix-container');
    let tableHTML = '<table class="matrix-table"><tr><th></th>';

    for (let i = 0; i < size; i++) {
        tableHTML += `<th>${i + 1}</th>`;
    }
    tableHTML += '</tr>';

    for (let i = 0; i < size; i++) {
        tableHTML += `<tr><th>${i + 1}</th>`;
        for (let j = 0; j < size; j++) {
            const disabled = i === j ? 'disabled' : '';
            const value = i === j ? '0' : '';
            tableHTML += `
                <td>
                    <input type="number" name="cell-${i}-${j}" class="matrix-cell"
                           min="0" max="1" value="${value}" ${disabled}>
                </td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    container.innerHTML = tableHTML;

    // Валидация при изменении ячеек
    document.querySelectorAll('.matrix-cell').forEach(cell => {
        cell.addEventListener('change', function () {
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

// Загрузка примера
function loadHamiltonExample() {
    const exampleMatrix = [
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0]
    ];

    document.getElementById('hamilton-matrix-size').value = 4;
    generateHamiltonMatrix(4);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i !== j) {
                const cell = document.querySelector(`input[name="cell-${i}-${j}"]`);
                if (cell) cell.value = exampleMatrix[i][j];
            }
        }
    }
}

// Проверка валидности матрицы (0 или 1)
function validateHamiltonMatrix(size) {
    let isValid = true;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i === j) continue;
            const cell = document.querySelector(`input[name="cell-${i}-${j}"]`);
            if (!cell) continue;
            if (cell.value !== '0' && cell.value !== '1') {
                cell.style.backgroundColor = '#ffe3e3';
                isValid = false;
            }
        }
    }
    return isValid;
}

async function calculateHamiltonCycleServer() {
    const size = parseInt(document.getElementById('hamilton-matrix-size').value);
    if (!validateHamiltonMatrix(size)) {
        alert('Пожалуйста, введите только 0 или 1 в ячейки матрицы!');
        return;
    }

    const matrix = [];
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            const cell = document.querySelector(`input[name="cell-${i}-${j}"]`);
            matrix[i][j] = parseInt(cell.value);
        }
    }

    const response = await fetch('/hamilton', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matrix)
    });

    // Вместо response.json() используем response.text()
    const html = await response.text();

    // Вставляем полученный HTML внутрь контейнера
    const container = document.querySelector('.graph-container');
    container.innerHTML = html;
}


document.addEventListener('DOMContentLoaded', () => {
    // Генерируем начальную матрицу (например, 3x3)
    generateHamiltonMatrix(3);

    // При изменении размера матрицы генерируем новую
    document.getElementById('hamilton-matrix-size')
        .addEventListener('change', e => {
            generateHamiltonMatrix(parseInt(e.target.value));
        });

    // Кнопка загрузки примера
    document.getElementById('hamilton-example-btn')
        .addEventListener('click', loadHamiltonExample);

    // Кнопка "Рассчитать" теперь вызывает серверную функцию
    const calcBtn = document.getElementById('hamilton-calc-btn');
    if (calcBtn) {
        calcBtn.addEventListener('click', e => {
            e.preventDefault();
            calculateHamiltonCycleServer();
        });
    }

    // Отправка формы тоже вызывает серверную функцию
    const form = document.getElementById('hamilton-matrix-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            calculateHamiltonCycleServer();
        });
    }
});
