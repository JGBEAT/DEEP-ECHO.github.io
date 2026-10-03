#!/usr/bin/env python3
"""Generate the static language versions of the site from the Chinese pages.

    After editing the Chinese pages (index.html, silent-wreckage.html) or
    js/i18n.js, run:

        python tools/build_en.py          # English -> /en/
        python tools/build_en.py ja       # any other language in js/i18n.js -> /ja/

The Chinese pages at the site root are the source. For every root *.html page
this script writes <lang>/<page>.html with:
  * text of every  data-i18n="key"  element replaced by the <lang> dictionary
  * attributes listed in  data-i18n-attr="attr:key;..."  replaced the same way
  * <html lang>, og:locale, canonical and og:url switched to the <lang> version
  * relative asset paths (assets/, css/, js/) prefixed with ../
Links between pages (index.html, silent-wreckage.html#...) stay relative, so
they point at the same-language pages. The hreflang alternates are absolute
and identical on every version, so they are copied unchanged.

Python standard library only. Generated files carry a "do not edit" banner.
"""
import glob
import html
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://abdeepecho.github.io/'
I18N = os.path.join(ROOT, 'js', 'i18n.js')
LOCALES = {'en': 'en_US', 'ja': 'ja_JP', 'ko': 'ko_KR', 'zh-Hans': 'zh_CN'}
ASSET_PREFIXES = ('assets/', 'css/', 'js/')
BRAND = '幽海工作室'   # the studio name stays Chinese in every language
CJK = re.compile(r'[㐀-鿿豈-﫿]')


def js_unescape(s):
    """Unescape a single-quoted JS string literal body."""
    out, i = [], 0
    while i < len(s):
        c = s[i]
        if c == '\\' and i + 1 < len(s):
            n = s[i + 1]
            if n == 'u' and re.match(r'[0-9a-fA-F]{4}', s[i + 2:i + 6]):
                out.append(chr(int(s[i + 2:i + 6], 16)))
                i += 6
                continue
            out.append({'n': '\n', 't': '\t', 'r': '\r'}.get(n, n))
            i += 2
            continue
        out.append(c)
        i += 1
    return ''.join(out)


def load_dict(lang):
    src = open(I18N, encoding='utf-8').read()
    m = re.search(r"\n    '%s': \{\n(.*?)\n    \}" % re.escape(lang), src, re.S)
    if not m:
        sys.exit('No "%s" dictionary found in js/i18n.js' % lang)
    pairs = re.findall(r"'((?:[^'\\]|\\.)*)'\s*:\s*'((?:[^'\\]|\\.)*)'", m.group(1))
    return {js_unescape(k): js_unescape(v) for k, v in pairs}


def load_short_name(lang):
    """Short label for the globe button, from NAMES in js/i18n.js."""
    src = open(I18N, encoding='utf-8').read()
    m = re.search(r"'%s'\s*:\s*\{\s*name:\s*'[^']*',\s*short:\s*'([^']*)'" % re.escape(lang), src)
    return m.group(1) if m else lang.upper()


def esc_text(v):
    return html.escape(v, quote=False)


def esc_attr(v):
    return html.escape(v, quote=True)


def build_page(src_html, lang, d, page_name, warnings):
    out = src_html

    # 1. element text
    def text_repl(m):
        key, inner = m.group('key'), m.group('inner')
        if '<' in inner:
            warnings.append('%s: data-i18n="%s" wraps markup, left unchanged' % (page_name, key))
            return m.group(0)
        if key not in d:
            warnings.append('%s: missing "%s" in %s dictionary' % (page_name, key, lang))
            return m.group(0)
        return m.group('open') + esc_text(d[key]) + m.group('close')

    out = re.sub(
        r'(?P<open><(?P<tag>[a-zA-Z][a-zA-Z0-9]*)\b[^>]*?\sdata-i18n="(?P<key>[^"]+)"[^>]*>)'
        r'(?P<inner>.*?)(?P<close></(?P=tag)>)',
        text_repl, out, flags=re.S)

    # 2. attributes
    def attr_tag_repl(m):
        tag = m.group(0)
        for pair in m.group(1).split(';'):
            if ':' not in pair:
                continue
            attr, key = [x.strip() for x in pair.split(':', 1)]
            if key not in d:
                warnings.append('%s: missing "%s" in %s dictionary' % (page_name, key, lang))
                continue
            new = '%s="%s"' % (attr, esc_attr(d[key]))
            tag, n = re.subn(r'(?<=\s)%s="[^"]*"' % re.escape(attr), lambda _m: new, tag, count=1)
            if not n:
                tag = tag[:-1].rstrip('/').rstrip() + ' ' + new + '>'
        return tag

    out = re.sub(r'<[a-zA-Z][^>]*\sdata-i18n-attr="([^"]+)"[^>]*>', attr_tag_repl, out)

    # globe button label (also set at runtime; this is the no-JS / crawler value)
    out = re.sub(r'(<span class="lang-current" data-lang-current[^>]*>)[^<]*(</span>)',
                 lambda m: m.group(1) + esc_text(load_short_name(lang)) + m.group(2), out)

    # 3. language, locale, canonical / og:url
    out = re.sub(r'<html lang="[^"]*"', '<html lang="%s"' % lang, out, count=1)
    if lang in LOCALES:
        out = re.sub(r'(<meta property="og:locale" content=")[^"]*(")', r'\g<1>%s\2' % LOCALES[lang], out)
    for pat in (r'(<link rel="canonical" href="%s)' % re.escape(SITE),
                r'(<meta property="og:url" content="%s)' % re.escape(SITE)):
        out = re.sub(pat, r'\g<1>%s/' % lang, out)

    # 4. relative asset paths -> ../
    def path_repl(m):
        attr, val = m.group(1), m.group(2)
        if attr == 'srcset':
            parts = []
            for item in val.split(','):
                item = item.strip()
                parts.append('../' + item if item.startswith(ASSET_PREFIXES) else item)
            return '%s="%s"' % (attr, ', '.join(parts))
        return '%s="%s"' % (attr, '../' + val if val.startswith(ASSET_PREFIXES) else val)

    out = re.sub(r'\b(src|href|srcset|data-full|data-fallback)="([^"]*)"', path_repl, out)

    banner = ('<!-- GENERATED by tools/build_en.py %s from ../%s. Do not edit by hand:\n'
              '     edit the Chinese page or js/i18n.js, then run  python tools/build_en.py %s -->\n'
              % (lang, page_name, lang))
    out = out.replace('<!doctype html>\n', '<!doctype html>\n' + banner, 1)

    # 5. audit: Chinese text left outside comments / lang="zh-Hant" islands
    body = re.sub(r'<!--.*?-->', '', out, flags=re.S)
    body = re.sub(r'<(\w+)[^>]*lang="zh-Hant"[^>]*>.*?</\1>', '', body, flags=re.S)
    intended = {v.strip() for v in d.values()}      # translations may contain Chinese on purpose
    for t in re.findall(r'>([^<>]*)<', body):
        t = html.unescape(t).strip()
        if t in intended or not CJK.search(t.replace(BRAND, '')):
            continue
        if t:
            warnings.append('%s: untranslated text: %s' % (page_name, t.strip()[:60]))
    return out


def main():
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except AttributeError:
        pass
    lang = sys.argv[1] if len(sys.argv) > 1 else 'en'
    d = load_dict(lang)
    out_dir = os.path.join(ROOT, lang)
    os.makedirs(out_dir, exist_ok=True)
    warnings = []
    # real pages only (skips e.g. the Google Search Console verification file)
    pages = [p for p in sorted(glob.glob(os.path.join(ROOT, '*.html')))
             if '<html lang=' in open(p, encoding='utf-8').read(4096)]
    for path in pages:
        name = os.path.basename(path)
        src = open(path, encoding='utf-8').read()
        page = build_page(src, lang, d, name, warnings)
        with open(os.path.join(out_dir, name), 'w', encoding='utf-8', newline='\n') as f:
            f.write(page)
        print('wrote %s/%s' % (lang, name))
    for w in warnings:
        print('  warning:', w)
    print('%d page(s), %d dictionary entries, %d warning(s)' % (len(pages), len(d), len(warnings)))


if __name__ == '__main__':
    main()
