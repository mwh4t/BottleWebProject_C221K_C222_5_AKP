// выдвижение сайдбара
$(document).ready(function() {
    if ($('#sidebar').hasClass('collapsed')) {
        $('#content').addClass('expanded');
    }

    $('#sidebarToggle').on('click', function() {
        $('#sidebar').toggleClass('collapsed');
        $('#content').toggleClass('expanded');
        console.log('Sidebar toggled');
    });
});



// обработка textarea с номерами строк
document.addEventListener('DOMContentLoaded', function() {
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
                function() {
                if (limitLines(this, 1)) {
                    // позиционирование курсора в конец
                    this.selectionStart = this.selectionEnd = this.value.length;
                }
                updateLineNumbers(this, nodeCountLines);
            });

            nodeCountTextarea.addEventListener('keydown',
                function(e) {
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
                function() {
                if (limitLines(this, 20)) {
                    // позиционирование курсора в конец
                    this.selectionStart = this.selectionEnd = this.value.length;
                }
                updateLineNumbers(this, graphDataLines);
            });

            graphDataTextarea.addEventListener('keydown',
                function(e) {
                setTimeout(() => {
                    limitLines(this, 20);
                    updateLineNumbers(this, graphDataLines);
                }, 0);
            });
        }

        const calcBtn =
            document.getElementById('calc-btn');
        if (calcBtn) {
            calcBtn.addEventListener('click', function() {
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
