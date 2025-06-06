/**
 * @author mwh4t
 */
// выдвижение сайдбара
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

document.addEventListener('DOMContentLoaded', function() {
    // кнопка расчёта
    const calcButton = document.getElementById('metrics-calc-btn');

    if (calcButton) {
        calcButton.addEventListener('click', function() {
            // получение данных из полей
            const nodeCount = document.getElementById('node-count-textarea').value;
            const graphData = document.getElementById('graph-data-textarea').value;

            // валидация
            if (!nodeCount || !graphData) {
                alert('Пожалуйста, заполните количество узлов и данные графа');
                return;
            }

            // отправка AJAX-запроса
            fetch('/metrics/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'node-count-textarea': nodeCount,
                    'graph-data-textarea': graphData
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Ошибка: ' + data.error);
                    return;
                }

                // отображение результатов
                updateResults(data);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке запроса');
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const helpIcon = document
        .getElementById('graph-data-help');
    const tooltip = document
        .getElementById('graph-data-tooltip');

    helpIcon.addEventListener('click',
        function(e) {
        e.stopPropagation();

        const rect = helpIcon.getBoundingClientRect();
        tooltip.style.left = rect.right + 5 + 'px';
        tooltip.style.top = rect.top - 10 + 'px';

        tooltip.style.display = tooltip.style.display ===
        'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function() {
        tooltip.style.display = 'none';
    });

    tooltip.addEventListener('click',
        function(e) {
        e.stopPropagation();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const nodeCountTextarea = document
        .getElementById('node-count-textarea');

    // валидация ввода
    nodeCountTextarea.addEventListener('input',
        function(e) {
        this.value = this.value.replace(/\D/g, '');

        if (this.value === '0') {
            this.value = '1';
        } else if (this.value !== '' &&
            parseInt(this.value) > 20) {
            this.value = '20';
        }
    });

    nodeCountTextarea.addEventListener('blur',
        function(e) {
        if (this.value === '' || this.value === '0') {
            this.value = '1';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // удаление всех слушателей событий на кнопке расчёта
    const calcButton = document.getElementById('metrics-calc-btn');
    if (calcButton) {
        // замена кнопки на новую
        const newCalcButton = calcButton.cloneNode(true);
        calcButton.parentNode.replaceChild(newCalcButton, calcButton);

        // добавление нового слушателя событий
        newCalcButton.addEventListener('click', function(e) {
            e.preventDefault();

            const graphDataTextarea =
                document.getElementById('graph-data-textarea');
            const graphData = graphDataTextarea.value;
            const nodeCount = parseInt(document
                .getElementById('node-count-textarea').value) || 1;
            const lines = graphData.split('\n');
            let isValid = true;
            let errorMessage = '';
            let actualNodeCount = 0;

            // валидация данных
            for (let i = 0; i < Math.min(nodeCount,
                lines.length); i++) {
                if (lines[i].trim() && !/^\d+$/.test(lines[i].trim())) {
                    isValid = false;
                    errorMessage =
                        `Строка ${i+1}: должен быть указан номер узла (целое число)`;
                    break;
                }
                if (lines[i].trim()) actualNodeCount++;
            }

            for (let i = nodeCount; i < lines.length; i++) {
                if (lines[i].trim()) {
                    const parts =
                        lines[i].trim().split(/\s+/);
                    if (parts.length !== 2 || !/^\d+$/.test(parts[0]) ||
                        !/^\d+$/.test(parts[1])) {
                        isValid = false;
                        errorMessage =
                            `Строка ${i+1}: неверный формат ребра. Должно быть "узел1 узел2"`;
                        break;
                    }

                    const node1 = parseInt(parts[0]);
                    const node2 = parseInt(parts[1]);
                    if (node1 < 1 || node1 > actualNodeCount || node2 < 1 ||
                        node2 > actualNodeCount) {
                        isValid = false;
                        errorMessage =
                            `Строка ${i+1}: ребро ${node1}-${node2} ссылается на несуществующий узел`;
                        break;
                    }
                }
            }

            if (!isValid) {
                alert(errorMessage);
                return;
            }

            fetch('/metrics/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'node-count-textarea': nodeCount,
                    'graph-data-textarea': graphData
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Ошибка: ' + data.error);
                    return;
                }

                // обновление результатов
                updateResults(data);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке запроса');
            });
        });
    }
});

// обновление результатов на странице
function updateResults(data) {
    // обновление визуализации
    const graphPlaceholder = document
        .querySelector('.graph-placeholder');
    if (graphPlaceholder) {
        graphPlaceholder.innerHTML =
            `<img src="data:image/png;base64,${data.graph_image}" alt="Граф" style="max-width:100%;">`;
    }

    // обновление метрик
    if (data.metrics) {
        const eccentricity = document
            .getElementById('eccentricity-result');
        if (eccentricity) {
            if (typeof data.metrics.eccentricity === 'string') {
                eccentricity.textContent = data.metrics.eccentricity;
            } else {
                let eccentricityText = '';
                for (const [node, value] of Object
                    .entries(data.metrics.eccentricity)) {
                    eccentricityText += `Вершина ${node}: ${value} `;
                }
                eccentricity.textContent = eccentricityText;
            }
        }

        const radius = document
            .getElementById('radius-result');
        if (radius) radius.textContent = data.metrics.radius;

        const diameter = document
            .getElementById('diameter-result');
        if (diameter) diameter.textContent = data.metrics.diameter;

        const center = document
            .getElementById('center-result');
        if (center) {
            if (Array.isArray(data.metrics.center)) {
                center.textContent = data.metrics.center.join(', ');
            } else {
                center.textContent = data.metrics.center;
            }
        }

        const periphery = document
            .getElementById('periphery-result');
        if (periphery) {
            if (Array.isArray(data.metrics.periphery)) {
                periphery.textContent = data.metrics.periphery.join(', ');
            } else {
                periphery.textContent = data.metrics.periphery;
            }
        }

        const density = document
            .getElementById('density-result');
        if (density) density.textContent = data.metrics
            .density.toFixed(4);
    }
}



/**
 * @author ab4shevd
 */
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

// расчёт эйлерова цикла
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
