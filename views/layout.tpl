<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} - My Bottle Application</title>
    <link rel="stylesheet" type="text/css" href="/static/content/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="/static/content/site.css" />
    <link rel="stylesheet" type="text/css" href="/static/content/base.css" />
    <script src="/static/scripts/modernizr-2.6.2.js"></script>
</head>

<body>
    <div class="wrapper">
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3><a href="/">УП02</a></h3>
            </div>

            <ul class="list-unstyled components">
                <li><a href="/euler">Поиск Эйлерова цикла</a></li>
                <li><a href="/hamilton">Поиск Гамильтонова цикла</a></li>
                <li><a href="/metrics">Поиск метрик</a></li>
            </ul>

            <div class="sidebar-footer">
                <p>&copy; 2025 - My Bottle Application</p>
            </div>
        </nav>

        <div id="content">
            {{!base}}
        </div>
    </div>

    <script src="/static/scripts/jquery-1.10.2.js"></script>
    <script src="/static/scripts/bootstrap.js"></script>
    <script src="/static/scripts/respond.js"></script>
</body>
</html>
