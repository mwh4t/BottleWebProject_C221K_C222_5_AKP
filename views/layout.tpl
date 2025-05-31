<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} - Графовые задачи</title>
<!--    <link rel="stylesheet" type="text/css" href="/static/content/bootstrap.min.css" />-->
<!--    <link rel="stylesheet" type="text/css" href="/static/content/site.css" />-->
    <link rel="stylesheet" type="text/css" href="/static/content/base.css" />
    <script src="/static/scripts/modernizr-2.6.2.js"></script>
</head>

<body>
    <!-- верхняя панель -->
    <nav id="topbar">
        <div class="container">
            <div class="topbar-left">
                <button type="button" id="sidebarToggle" class="btn btn-info">
                    <span>☰</span>
                </button>
                <div class="logo"><a href="/">Графовые задачи: циклы и метрики</a></div>
            </div>
            <ul class="top-nav">
                <li><a href="/about">О нас</a></li>
            </ul>
        </div>
    </nav>

    <!-- основное содержимое -->
    <div class="wrapper">
        <!-- боковая панель -->
        <nav id="sidebar" class="collapsed">
            <ul class="list-unstyled components">
                <li><a href="/euler">Поиск Эйлерова цикла</a></li>
                <li><a href="/hamilton">Поиск Гамильтонова цикла</a></li>
                <li><a href="/metrics">Расчёт метрик</a></li>
            </ul>
        </nav>

        <div id="content">
            {{!base}}
        </div>
    </div>

    <!-- JS скрипты -->
    <script src="/static/scripts/jquery-1.10.2.js"></script>
    <script src="/static/scripts/bootstrap.js"></script>
    <script src="/static/scripts/respond.js"></script>
    <script src="/static/scripts/site.js"></script>
</body>
</html>
