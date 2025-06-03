% rebase('layout.tpl', title='Главная страница', year=year)
<link rel="stylesheet" href="/static/content/base.css">

<div class="math-intro">
    <div class="main-content">
        <div class="math-intro">
            <h1>Учебная практика</h1>
        </div>

        <div class="theory-content">
            <h2>Веб-приложение "Графовые алгоритмы: Эйлеровы и Гамильтоновы циклы, метрики графов"</h2>
            <div class="theory-text">
            <h2><strong>О проекте</strong></h2>
                <p>Учебное веб-приложение на Python с использованием фреймворка Bottle для визуализации и анализа графов.
                Проект реализует три ключевых алгоритма теории графов: поиск Эйлерова цикла, 
                Гамильтонова цикла и вычисление метрик графа. Приложение позволяет вводить граф вручную
                или загружать из файла, визуализировать его структуру и получать результаты работы алгоритмов.</p>
            </div>
        </div>

        <div class="theory-content">
            <div class="theory-text">
            <h3>Эйлеровы циклы (Абашев Денис)</h3>
            <p><strong>Эйлеров цикл</strong> — это замкнутый путь в графе, который проходит через каждое ребро
            ровно один раз и возвращается в начальную вершину. </p>
            <p>Подробнее изучить теорию или произвести рассёт можно на странице поиска Эйлерова цикла.</p>
                <div class="buttons">
                    <button type="button" onclick="location.href='/theory#euler-theory'">Перейти</button>
                </div>
            </div>
        </div>
            
        <div class="theory-content">
            <div class="theory-text">
                <h3>Гамильтоновы циклы (Покровская Елизавета)</h3>
                <p><strong>Гамильтонов цикл</strong> — это замкнутый путь в графе, который проходит через каждую вершину
                ровно один раз и возвращается в начальную точку.</p>
                <p>Подробнее изучить теорию или произвести рассёт можно на странице поиска Гамильтонов цикла.</p>
                <div class="buttons">
                    <button type="button" onclick="location.href='/theory#gamilton-theory'">Перейти</button>
                </div>
            </div>
        </div>

        <div class="theory-content">
            <div class="theory-text">
                <h3>Метрики графов (Корзунов Матвей)</h3>
                <p><strong>Эксцентриситет вершины</strong> — максимальное расстояние от данной вершины
                до всех остальных в графе. Обозначается как ecc(v).</p>
                <p><strong>Радиус графа</strong> — минимальный эксцентриситет среди всех вершин: R = min(ecc(v)).</p>
                <p><strong>Диаметр графа</strong> — максимальный эксцентриситет: D = max(ecc(v)).</p>
                <p>Подробнее изучить теорию или произвести рассёт можно на странице поиска рассёта метрик.</p>
                <div class="buttons">
                    <button type="button" onclick="location.href='/theory#metrics-theory'">Перейти</button>
                </div>
            </div>
        </div>

        <div class="theory-content">
            <h2>Как начать работу?</h2>
            <div class="theory-text">
                <p>1. Выберите интересующий вас раздел.</p>
                <p>2. Введите данные графа (матрицу смежности или список ребер), 
                предворительно изучив теорию (по желанию).</p>
                <p>3. Нажмите рассчитать для получения результатов.</p>
                <p>4. Изучите результат и визуализацию.</p>
            </div>
        </div>

        <div class="theory-content">
            <h2>Нашли баг или ошибку?</h2>
            <div class="theory-text">
                <p>Напиши нам на почту →</p>
                <div class="buttons">
                    <button onclick="location.href='about'">Перейти</button>
                </div>
            </div>
        </div>
    </div>
</div>
 
<footer class="site-footer">
    <div class="footer-content">
        <p>© 2025 Графовые задачи</p>
        <p><a href="https://github.com/mwh4t/BottleWebProject_C221K_C222_5_AKP.git">GitHub</a> |
            <a href="https://github.com/mwh4t/BottleWebProject_C221K_C222_5_AKP/blob/main/README.md">Документация</a></p>
    </div>
</footer>
