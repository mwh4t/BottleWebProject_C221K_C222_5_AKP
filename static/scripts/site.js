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



document.addEventListener('DOMContentLoaded', function() {
    const nodeCountTextarea = document.getElementById('node-count-textarea');
    const graphDataTextarea = document.getElementById('graph-data-textarea');

    if (nodeCountTextarea || graphDataTextarea) {
        const nodeCountLines = document.getElementById('node-count-lines');
        const graphDataLines = document.getElementById('graph-data-lines');

        function updateLineNumbers(textarea, lineNumbersDiv) {
            const lines = textarea.value.split('\n');
            const lineCount = lines.length;

            let numbersHTML = '';
            for (let i = 1; i <= lineCount; i++) {
                numbersHTML += i + (i < lineCount ? '<br>' : '');
            }
            lineNumbersDiv.innerHTML = numbersHTML;

            textarea.style.height = 'auto';
            const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
            const paddingTop = parseInt(getComputedStyle(textarea).paddingTop);
            const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom);

            const newHeight = (lineCount * (isNaN(lineHeight) ? 20 : lineHeight)) +
                              paddingTop + paddingBottom;

            const minHeight = parseInt(textarea.getAttribute('rows')) *
                             (isNaN(lineHeight) ? 20 : lineHeight) +
                             paddingTop + paddingBottom;

            textarea.style.height = Math.max(newHeight, minHeight) + 'px';

            lineNumbersDiv.style.height = textarea.style.height;
        }

        function loadExample() {
            if (nodeCountTextarea) {
                nodeCountTextarea.value = '3';
                updateLineNumbers(nodeCountTextarea, nodeCountLines);
            }

            if (graphDataTextarea) {
                graphDataTextarea.value = `1
2
3
1 2
2 3
3 1`;
                updateLineNumbers(graphDataTextarea, graphDataLines);
            }
        }

        if (nodeCountTextarea && nodeCountLines) {
            nodeCountTextarea.addEventListener('input', function() {
                updateLineNumbers(this, nodeCountLines);
            });

            nodeCountTextarea.addEventListener('keydown', function(e) {
                setTimeout(() => updateLineNumbers(this, nodeCountLines), 0);
            });
        }

        if (graphDataTextarea && graphDataLines) {
            graphDataTextarea.addEventListener('input', function() {
                updateLineNumbers(this, graphDataLines);
            });

            graphDataTextarea.addEventListener('keydown', function(e) {
                setTimeout(() => updateLineNumbers(this, graphDataLines), 0);
            });
        }

        const exampleBtn = document.getElementById('example-btn');
        if (exampleBtn) {
            exampleBtn.addEventListener('click', loadExample);
        }

        const calcBtn = document.getElementById('calc-btn');
        if (calcBtn) {
            calcBtn.addEventListener('click', function() {
                alert('Функция расчёта будет добавлена позже');
            });
        }

        if (nodeCountTextarea && nodeCountLines) {
            updateLineNumbers(nodeCountTextarea, nodeCountLines);
        }
        if (graphDataTextarea && graphDataLines) {
            updateLineNumbers(graphDataTextarea, graphDataLines);
        }
    }
});
