# Craft
Cli & API инструмент для работы с генерацией и обработкой окружения DApp

[GitLab Repo](https://git.kryptonhub.com/tapok_satan/craft)

## Цели
- Инструментарий для создания и публикации приложения "за 5 минут"
- Создание окружения
- Работа в режиме разработки, инструменты разработки и отладки
- Работа с смартконтрактами, парсинг, отладка и проверки
- Генерации шаблонов и скелетов модулей Dapp
- Публикация приложения в Маркетплейсе

__________________________________________________________________

### Создание DApp
<p align="center">
    <img src="toolchain/create.gif" /> 
</p>

Создание приложения относительно выбранного окружения: фреймворк, стили, язык и тд.

#### Targets
- Manifest в соответствии с выбранными параметрами
- Базовое окружение и webpack.config:
    - Hotreload - обновлять весь код в процессе написания для живого просмотра в браузере
    - Простая компиляция всех необходимых assets
    - Мета-возможности с использованием webpack loaders

```
Usage: create [options]

🛠   Create new DApp package

Options:

  -n, --name <name>            🏷   Your package name
  -c, --compiler <compiler>    🛠   Target compiler
  -s, --style <preprocessor>   💈   Styles preprocessor
  -f, --framework <framework>  📦  Starter framework
  -h, --help                   output usage information
```
__________________________________________________________________

### Сборка DApp


__________________________________________________________________

### Подпись и верификация бандла
Создание подписи для нашего финального bundle, с последующей загрузкой в ipfs,  возможностью валидировать приложение по подписи и точности авторства и принадлежности нашему сервису. 

#### Цели
- Создать ключ подписания, на стороне разработчика: изучить вид ключа и способ его регистарции в нашей системе, с возможностью для нас иметь возможность зарезервировать этот уникальный ключ относительно авторства и текущего бандла.
- Подписать ключем создав сигнатуру: изучить как мы будем подписывать ключем приложения, как хранить сигнатуру, как определять работу с публичными/приватными ключами и тд
- Опубликовать в ipfs: изучить как хранить в ipfs данные, и файл манифеста с сигнатурой, в первой итерации тестировать просто файл с некой подписью, для последующей проверки по жизненному циклу.
- Проверить сигнатуру на наличие в системе, и на авторство приложения: изучить и сформулировать подход к работе с верификацией enroll разработчика и его приложения, как будет проходить валидация со стороны клиента на принадлежность к маркетплейсу.

#### Финальный ожидаемый результат
- Изучить возможности и подходы с верификацией бандла. Выбор ключа и тд. P.S - в текущем условленном варианте было решено загружать в ipfs целиком директорию - так что в вариант в котором по умолчанию создается подписанный целиком архив - исключается (если не появится прочей обоснованной аргументации использования).
- Изучить и описать процесс создания ключа, какую его часть мы будем хранить и где - для последующей валидации на стороне клиента.
- Изучить процесс валидации и проверки бандла после его загрузки.

*Идеальный вариант*
- CLI Комманда
    - Склонировать репозиторий [Craft](https://git.kryptonhub.com/tapok_satan/craft)
    - Добавить в нем новую команду в cli и назвать ее sign
    - Сделать базовый набор аргументов для подписи, например: папка с бандлом и манифестом, выбор существующего ключа или создание нового, и тд.
    - Кроме аргументов описать также нормальную работу с step-by-step настройкой. (по аналогии с create командой)
    - Создать функцию создания подписи, которая сможет подписывать бандл
    - Создать миддлварь которая будет авторизовывать пользователя в enroll программе, и загружать его подпись или некоторую сигнатуру для валидации (ту что узнаешь в   процессе ресерча)
    - После подписания бандла приложение может быть готово для публикации
- Enroll Система: Изучить и продумать как нам сделать enroll систему
    - Для регистрации разработчиков
    - Созданию базовых описаний приложения - или получении их из манифеста (тоже изучить)
    - Работа с подписью - относительно изучения верификации приложения с нашей стороны
    - Работа с записью с описанием нашего приложения и его адреса для скачивания
- Документирование:
    - В этот документ, в подпукте "Подпись и верификация бандла" писать о результатах ресерчей, с аргументацией и алгоритмами принципов работы и тд.


#### Описания, Результаты
*Здесь описывать результаты работ по этому блоку*
__________________________________________________________________