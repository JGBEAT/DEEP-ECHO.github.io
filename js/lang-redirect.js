/* 幽海工作室 DeepEcho: early language redirect (runs in <head>, before paint).
 *
 * Every page lists its language versions as
 *   <link rel="alternate" hreflang="..." href="...">
 * and this script only ever redirects between those, so adding a language
 * (e.g. /ja/) needs no change here.
 *
 * Rules
 *   1. ?lang=xx            -> remember xx and go to that version (drops ?lang)
 *   2. saved choice        -> on default-language pages only, go to the saved
 *                             language's version if different
 *   3. first visit only, Chinese pages only: if the browser lists no Chinese
 *      language, go to the English version once. Never repeats, never runs
 *      after an explicit choice, and never runs for crawlers.
 */
(function () {
  'use strict';

  var STORE = 'deepecho-lang';        /* explicit choice (menu or ?lang=) */
  var AUTO = 'deepecho-lang-auto';    /* first-visit redirect already decided */
  var DEFAULT = 'zh-Hant';

  function get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* blocked */ } }

  var page = document.documentElement.getAttribute('lang') || DEFAULT;
  var alts = {};
  var links = document.querySelectorAll('link[rel="alternate"][hreflang]');
  for (var i = 0; i < links.length; i++) {
    var code = links[i].getAttribute('hreflang');
    if (code !== 'x-default') alts[code] = links[i].getAttribute('href');
  }

  /* "en-US" / "zh-TW" / "zh" -> a language that has a version of this page */
  function match(code) {
    if (!code) return null;
    code = String(code).toLowerCase();
    var k;
    for (k in alts) if (k.toLowerCase() === code) return k;
    var base = code.split('-')[0];
    for (k in alts) if (k.toLowerCase().split('-')[0] === base) return k;
    return null;
  }

  function go(lang) {
    if (!alts[lang] || lang === page) return false;
    /* use only the path, so this also works on localhost / previews */
    var path;
    try { path = new URL(alts[lang], window.location.href).pathname; } catch (e) { return false; }
    window.location.replace(window.location.origin + path + window.location.hash);
    return true;
  }

  var fromUrl = null;
  try { fromUrl = match(new URLSearchParams(window.location.search).get('lang')); } catch (e) { /* old browser */ }
  if (fromUrl) {
    set(STORE, fromUrl);
    if (!go(fromUrl) && window.history.replaceState) {
      /* already on the right version: tidy the URL */
      try {
        var u = new URL(window.location.href);
        u.searchParams.delete('lang');
        window.history.replaceState(window.history.state, '', u.pathname + u.search + u.hash);
      } catch (e) { /* ignore */ }
    }
    return;
  }

  if (/bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent || '')) return;

  /* a saved choice only redirects away from the default-language pages, so a
     shared /en/ (or later /ja/) link always opens in the language it points to */
  var saved = match(get(STORE));
  if (saved) { if (page === DEFAULT) go(saved); return; }

  if (page !== DEFAULT || get(AUTO)) return;
  set(AUTO, '1');
  var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
  for (var j = 0; j < prefs.length; j++) {
    if (/^zh\b/i.test(prefs[j])) return;
  }
  go(match('en'));
})();
