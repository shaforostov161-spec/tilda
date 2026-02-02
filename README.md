# Tilda Mods

Набор кастомных модификаций для сайтов на Tilda. Сейчас доступен мод **Accordion**.

## Установка в Tilda

1. Откройте настройки сайта → **Дополнительное** → **HTML-код для вставки внутрь HEAD**.
2. Добавьте ссылки на файлы `dist/tilda-mods.css` и `dist/tilda-mods.js`.
3. Опубликуйте сайт.

Пример вставки:

```html
<link rel="stylesheet" href="https://your-domain.com/dist/tilda-mods.css">
<script defer src="https://your-domain.com/dist/tilda-mods.js"></script>
```

> Если используете файлы через CDN или напрямую из GitHub Pages — подставьте соответствующий URL.

## Accordion

### HTML-структура

```html
<div class="tm-acc" data-single="1">
  <div class="tm-acc-item">
    <div class="tm-acc-trigger">Вопрос 1</div>
    <div class="tm-acc-body">
      <p>Ответ 1</p>
    </div>
  </div>
  <div class="tm-acc-item">
    <div class="tm-acc-trigger">Вопрос 2</div>
    <div class="tm-acc-body">
      <p>Ответ 2</p>
    </div>
  </div>
</div>
```

### Поведение

- Контейнер: `.tm-acc`.
- Включите режим «открыт только один» через `data-single="1"`.
- Элемент: `.tm-acc-item`.
- Триггер: `.tm-acc-trigger`.
- Контент: `.tm-acc-body`.

### Примечания

- Скрипт написан на vanilla JS, не использует jQuery.
- Защита от повторной инициализации, есть `MutationObserver` для элементов, добавленных позже.
