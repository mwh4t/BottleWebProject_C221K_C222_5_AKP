<h1 align="center">Веб-приложение "Графовые задачи: циклы и метрики"</h1>

<p align="center">
  <img src="https://img.shields.io/github/created-at/mwh4t/BottleWebProject_C221K_C222_5_AKP"/>
  <img src="https://img.shields.io/github/contributors/mwh4t/BottleWebProject_C221K_C222_5_AKP?color=white"/>
  <img src="https://img.shields.io/github/commit-activity/t/mwh4t/BottleWebProject_C221K_C222_5_AKP?color=red"/>
  <img src="https://img.shields.io/github/languages/count/mwh4t/BottleWebProject_C221K_C222_5_AKP"/>
  <img src="https://img.shields.io/github/languages/code-size/mwh4t/BottleWebProject_C221K_C222_5_AKP?color=black"/>
</p>

___

## Краткое описание
Учебное веб-приложение на Python с использованием фреймворка Bottle для визуализации и анализа графов. Проект реализует три ключевых алгоритма теории графов: поиск Эйлерова цикла, Гамильтонова цикла и вычисление метрик графа. Приложение позволяет вводить граф вручную или загружать из файла, визуализировать его структуру и получать результаты работы алгоритмов.

## Запуск проекта
1. Клонировать репозиторий:
```
git clone https://github.com/mwh4t/BottleWebProject_C221K_C222_5_AKP.git
```
```
cd BottleWebProject_C221K_C222_5_AKP
```

2. Создать виртуальное окружение:
```
python3 -m venv venv
```

* <p align="center">
  <img src="https://img.shields.io/badge/Linux-FFFFFF?style=flat&logo=linux&logoColor=black" align="center"/>
  <img src="https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white)" align="center"/>
</p>

```
source venv/bin/activate
```

* <p align="center">
  или <br> <img src="https://img.shields.io/badge/Windows-0078D6?style=flat&logo=windows&logoColor=white" align="center"/> (CMD)
</p>

```
venv\Scripts\activate.bat
```

* <p align="center">
  или <br> <img src="https://img.shields.io/badge/Windows-0078D6?style=flat&logo=windows&logoColor=white" align="center"/> (PowerShell)
</p>

```
venv\Scripts\Activate.ps1
```

3. Установить зависимости:
```
pip3 install -r requirements.txt
```

4. Запустить проект:
```
python3 app.py
```

5. Открыть сайт по адресу:
```
http://localhost:5555
```

## Разработчики и задачи
| Разработчик   | Вариант задания                                                                                        |
|---------------|--------------------------------------------------------------------------------------------------------|
| Абашев Д.     | Поиск Эйлерова цикла в Эйлеровом графе.                                                                |
| Покровская Е. | Поиск Гамильтонова цикла в графе.                                                                      |
| Корзунов М.   | Расчёт следующих метрик данного графа: эксцентриситет, радиус, диаметр, центр, периферию и плотность.  |
