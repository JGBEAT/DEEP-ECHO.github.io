# 幽海工作室 DeepEcho 官網

Static site served by GitHub Pages at https://abdeepecho.github.io/ (no build step needed to serve it).

## Languages

- The Chinese pages at the root (`index.html`, `silent-wreckage.html`) are the source.
- English pages in `/en/` are **generated**. Do not edit them by hand.
- Translations live in `js/i18n.js` (one dictionary per language).

**After editing the Chinese pages or `js/i18n.js`, run:**

```
python tools/build_en.py
```

(Python 3, standard library only.) It rewrites `en/index.html` and `en/silent-wreckage.html` and prints a warning for any missing translation or leftover Chinese text.

To add another language later (for example Japanese): add a `"ja"` dictionary and name in `js/i18n.js`, add `<link rel="alternate" hreflang="ja" ...>` to the root pages, run `python tools/build_en.py ja` and `python tools/build_en.py en`, and add the URLs to `sitemap.xml`. See the comment at the top of `js/i18n.js`.

## Cache-busting

CSS/JS links end in `?v=N`. Bump the number in the root pages (then rebuild) when you change `css/` or `js/`, so visitors don't get stale files.

## Commission form

Set `FORM_ENDPOINT` at the top of `js/scripts.js` to a Formspree endpoint to receive submissions directly; when empty, the form opens the visitor's email app.
