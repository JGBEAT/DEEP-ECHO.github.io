/* 幽海工作室 DEEP ECHO: site scripts (vanilla JS, no dependencies) */

/* Commission form endpoint.
 * Leave empty to fall back to opening the visitor's email app (mailto:).
 * To receive submissions directly, create a free Formspree form and paste its
 * endpoint here, e.g. 'https://formspree.io/f/xxxxxxx'. */
const FORM_ENDPOINT = '';

(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var header = document.querySelector('.site-header');
  var gauge = document.querySelector('.depth');

  /* translated string from js/i18n.js, with a Chinese fallback */
  function label(key, fallbackText) {
    var i18n = window.DeepEchoI18n;
    var v = i18n && i18n.t(key);
    return v || fallbackText;
  }

  /* ------------------------------------------------------------------
     Header state + depth gauge (rAF-throttled scroll handler)
     ------------------------------------------------------------------ */
  var ticking = false;
  function updateScroll() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (gauge) {
      var max = root.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      gauge.style.setProperty('--p', p.toFixed(4));
    }
  }
  function requestScrollUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateScroll);
    }
  }
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate);
  updateScroll();

  /* ------------------------------------------------------------------
     Mobile menu: aria-expanded, Esc closes, links close, rest of page inert
     ------------------------------------------------------------------ */
  var toggle = document.querySelector('.menu-toggle');
  var menu = toggle ? document.getElementById(toggle.getAttribute('aria-controls')) : null;

  if (toggle && menu) {
    var inertTargets = document.querySelectorAll('main, .site-footer, .skip-link');
    var isOpen = false;

    var setMenu = function (open, returnFocus) {
      isOpen = open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', label(open ? 'menu.close' : 'menu.open', open ? '關閉選單' : '開啟選單'));
      menu.classList.toggle('is-open', open);
      if (header) header.classList.toggle('menu-open', open);
      document.body.classList.toggle('no-scroll', open);
      for (var i = 0; i < inertTargets.length; i++) inertTargets[i].inert = open;
      if (!open && returnFocus) toggle.focus();
    };

    toggle.addEventListener('click', function () { setMenu(!isOpen); });

    /* keep the toggle label in the current language */
    document.addEventListener('de:langchange', function () {
      toggle.setAttribute('aria-label', label(isOpen ? 'menu.close' : 'menu.open', isOpen ? '關閉選單' : '開啟選單'));
    });

    menu.addEventListener('click', function (e) {
      if (isOpen && e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (isOpen && (e.key === 'Escape' || e.key === 'Esc')) setMenu(false, true);
    });

    var desktopMQ = window.matchMedia('(min-width: 901px)');
    var onDesktop = function (e) { if (e.matches && isOpen) setMenu(false); };
    if (desktopMQ.addEventListener) desktopMQ.addEventListener('change', onDesktop);
    else if (desktopMQ.addListener) desktopMQ.addListener(onDesktop);
  }

  /* ------------------------------------------------------------------
     Scroll spy: mark the in-page nav link of the section in view
     ------------------------------------------------------------------ */
  var spyLinks = document.querySelectorAll('.nav-links a[href^="#"]:not([data-nav-cta])');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var linkFor = {};
    var sections = [];
    for (var s = 0; s < spyLinks.length; s++) {
      var id = spyLinks[s].getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) { linkFor[id] = spyLinks[s]; sections.push(sec); }
    }
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          for (var k in linkFor) linkFor[k].removeAttribute('aria-current');
          link.setAttribute('aria-current', 'true');
        } else if (link.getAttribute('aria-current')) {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (el) { spy.observe(el); });
  }

  /* ------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------ */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMQ.matches || !('IntersectionObserver' in window)) {
    for (var r = 0; r < reveals.length; r++) reveals[r].classList.add('is-visible');
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    for (var v = 0; v < reveals.length; v++) revealer.observe(reveals[v]);
  }

  /* ------------------------------------------------------------------
     Screenshot lightbox (<dialog>: native focus handling + Esc to close)
     ------------------------------------------------------------------ */
  var lightbox = document.getElementById('lightbox');
  var shots = document.querySelectorAll('.shot');
  if (lightbox && shots.length && typeof lightbox.showModal === 'function') {
    var lbImg = lightbox.querySelector('.lightbox-img');
    var lbCount = lightbox.querySelector('.lightbox-count');
    var lbIndex = 0;
    var lbOpener = null;

    var show = function (i) {
      lbIndex = (i + shots.length) % shots.length;
      var src = shots[lbIndex].querySelector('img');
      lbImg.src = src.getAttribute('data-full') || src.currentSrc || src.src;
      lbImg.alt = src.alt;
      lbCount.textContent = (lbIndex + 1) + ' / ' + shots.length;
    };

    for (var si = 0; si < shots.length; si++) {
      shots[si].addEventListener('click', function (e) {
        lbOpener = e.currentTarget;
        show(parseInt(lbOpener.getAttribute('data-shot'), 10) || 0);
        lightbox.showModal();
        document.body.classList.add('no-scroll');
      });
    }

    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { show(lbIndex - 1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () { show(lbIndex + 1); });
    lightbox.querySelector('.lightbox-close').addEventListener('click', function () { lightbox.close(); });

    lightbox.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(lbIndex - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); show(lbIndex + 1); }
    });

    /* click on the dark backdrop (the dialog itself, outside the figure) closes */
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.close();
    });

    lightbox.addEventListener('close', function () {
      document.body.classList.remove('no-scroll');
      /* hidden tiles (7, 8) cannot take focus, so fall back to the last visible one */
      var target = lbOpener && lbOpener.offsetParent ? lbOpener : document.querySelector('.shot--more');
      if (target) target.focus();
    });
  }

  /* ------------------------------------------------------------------
     Lite YouTube embed: poster + play button, iframe only after a click
     ------------------------------------------------------------------ */
  var ytBoxes = document.querySelectorAll('.yt[data-yt]');
  Array.prototype.forEach.call(ytBoxes, function (box) {
    var poster = box.querySelector('.yt-poster');
    if (poster) {
      /* maxresdefault does not exist for every video; YouTube then serves a
         120x90 placeholder (or a 404), so swap to hqdefault */
      var fallback = function () {
        var fb = poster.getAttribute('data-fallback');
        if (fb && poster.getAttribute('src') !== fb) poster.setAttribute('src', fb);
      };
      poster.addEventListener('error', fallback);
      poster.addEventListener('load', function () {
        if (poster.naturalWidth && poster.naturalWidth <= 120) fallback();
      });
      if (poster.complete && poster.naturalWidth && poster.naturalWidth <= 120) fallback();
    }
    var play = box.querySelector('.yt-play');
    if (!play) return;
    play.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.className = 'yt-frame';
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(box.getAttribute('data-yt')) + '?autoplay=1';
      iframe.title = box.getAttribute('data-title') || 'YouTube video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      box.classList.add('is-playing');
      box.appendChild(iframe);
      iframe.focus();
    });
  });

  /* ------------------------------------------------------------------
     FAQ: native <details>; opening one closes the others
     ------------------------------------------------------------------ */
  var accordions = document.querySelectorAll('[data-accordion]');
  Array.prototype.forEach.call(accordions, function (acc) {
    /* "toggle" does not bubble, so listen in the capture phase */
    acc.addEventListener('toggle', function (e) {
      if (!e.target.open) return;
      var open = acc.querySelectorAll('details[open]');
      for (var i = 0; i < open.length; i++) if (open[i] !== e.target) open[i].open = false;
    }, true);
  });

  /* ------------------------------------------------------------------
     Screenshot bands: gentle parallax while in view (off for reduced motion)
     ------------------------------------------------------------------ */
  var bands = document.querySelectorAll('.band');
  if (bands.length && 'IntersectionObserver' in window) {
    var liveBands = [];
    var bandTick = false;
    var updateBands = function () {
      bandTick = false;
      if (reduceMQ.matches) return;
      var vh = window.innerHeight;
      liveBands.forEach(function (band) {
        var r = band.getBoundingClientRect();
        /* -1 when the band enters at the bottom, +1 when it leaves at the top */
        var p = ((vh / 2) - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
        p = Math.max(-1, Math.min(1, p));
        band.firstElementChild.style.transform = 'translate3d(0,' + (p * 8).toFixed(2) + '%,0)';
      });
    };
    var requestBands = function () {
      if (!bandTick) { bandTick = true; window.requestAnimationFrame(updateBands); }
    };
    var bandIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var i = liveBands.indexOf(en.target);
        if (en.isIntersecting && i < 0) liveBands.push(en.target);
        if (!en.isIntersecting && i > -1) liveBands.splice(i, 1);
      });
      requestBands();
    });
    Array.prototype.forEach.call(bands, function (b) { bandIO.observe(b); });
    window.addEventListener('scroll', requestBands, { passive: true });
    window.addEventListener('resize', requestBands);
  }

  /* ------------------------------------------------------------------
     Commission form: inline validation, then Formspree (if configured)
     or a pre-filled mailto: as the fallback
     ------------------------------------------------------------------ */
  var form = document.getElementById('inquiry');
  if (form) {
    var statusEl = form.querySelector('.form-status');
    var submitBtn = form.querySelector('.inquiry-submit');
    var field = function (name) { return form.elements.namedItem(name); };
    var rules = [
      { name: 'name', key: 'form.err.name', ok: function (el) { return el.value.trim() !== ''; } },
      { name: 'email', key: 'form.err.email', ok: function (el) { return el.value.trim() !== '' && el.validity.valid; } },
      { name: 'type', key: 'form.err.type', ok: function (el) { return el.value !== ''; } },
      { name: 'details', key: 'form.err.details', ok: function (el) { return el.value.trim() !== ''; } }
    ];

    var setError = function (el, key) {
      var err = document.getElementById(el.id + '-err');
      if (!err) return;
      if (key) {
        err.setAttribute('data-err', key);
        err.textContent = label(key, '');
        err.hidden = false;
        el.setAttribute('aria-invalid', 'true');
      } else {
        err.removeAttribute('data-err');
        err.textContent = '';
        err.hidden = true;
        el.removeAttribute('aria-invalid');
      }
    };

    var validate = function () {
      var first = null;
      rules.forEach(function (r) {
        var el = field(r.name);
        var ok = r.ok(el);
        setError(el, ok ? null : r.key);
        if (!ok && !first) first = el;
      });
      return first;
    };

    /* clear an error as soon as the field becomes valid */
    rules.forEach(function (r) {
      var el = field(r.name);
      el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', function () {
        if (el.getAttribute('aria-invalid') === 'true' && r.ok(el)) setError(el, null);
      });
    });

    var say = function (key, kind) {
      statusEl.setAttribute('data-msg', key);
      statusEl.textContent = label(key, '');
      statusEl.className = 'form-status' + (kind ? ' is-' + kind : '');
    };

    /* keep visible messages in the current language */
    document.addEventListener('de:langchange', function () {
      var errs = form.querySelectorAll('.field-error[data-err]');
      for (var i = 0; i < errs.length; i++) errs[i].textContent = label(errs[i].getAttribute('data-err'), '');
      var msg = statusEl.getAttribute('data-msg');
      if (msg) statusEl.textContent = label(msg, '');
    });

    var optionText = function (sel) {
      return sel.value ? sel.options[sel.selectedIndex].textContent.trim() : '';
    };

    var buildMailto = function () {
      var colon = root.lang === 'en' ? ': ' : '：';
      var none = label('form.none', '（未填）');
      var name = field('name').value.trim();
      var type = optionText(field('type')) || label('form.type.other', '其他');
      var subject = '[' + label('form.subject', '委託') + '] ' + type + ' - ' + name;
      var rows = [
        [label('form.name', '姓名或公司'), name],
        ['Email', field('email').value.trim()],
        [label('form.type', '專案類型'), type],
        [label('form.budget', '預算範圍'), optionText(field('budget')) || none],
        [label('form.timeline', '期望時程'), field('timeline').value.trim() || none],
        [label('form.links', '參考連結'), field('links').value.trim() || none]
      ];
      var body = rows.map(function (r) { return r[0] + colon + r[1]; }).join('\n') +
        '\n\n' + label('form.details', '專案說明') + colon + '\n' + field('details').value.trim();
      return 'mailto:abstarhuides@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = validate();
      if (first) {
        say('form.err.summary', 'error');
        first.focus();
        return;
      }
      /* honeypot filled: almost certainly a bot, pretend all is well */
      if (field('_gotcha') && field('_gotcha').value) {
        form.reset();
        say('form.ok', 'ok');
        return;
      }
      if (!FORM_ENDPOINT) {
        say('form.mailto', 'info');
        window.location.href = buildMailto();
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = label('form.sending', '傳送中…');
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        say('form.ok', 'ok');
      }).catch(function () {
        say('form.fail', 'error');
      }).then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = label('form.submit', '送出委託');
      });
    });

    /* exposed for debugging / testing the mailto fallback without sending */
    window.DeepEchoForm = { validate: validate, buildMailto: buildMailto };
  }

  /* ------------------------------------------------------------------
     Marine snow: slow sinking particles on a canvas inside the hero.
     Capped count, DPR capped at 2, paused when the hero is offscreen or
     the tab is hidden, static single frame under reduced motion.
     ------------------------------------------------------------------ */
  function MarineSnow(canvas) {
    var ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return;

    var host = canvas.parentElement;
    var cs = window.getComputedStyle(canvas);
    var accent = cs.getPropertyValue('--snow-accent').trim() || '#5FD3C6';
    var base = cs.getPropertyValue('--snow-base').trim() || '#8DA2B8';
    var cap = parseInt(canvas.getAttribute('data-max'), 10) || 60;

    var w = 0, h = 0, parts = [];
    var running = false, inView = true, last = 0, raf = 0;

    function seed(p, anywhere) {
      p.x = Math.random() * w;
      p.y = anywhere ? Math.random() * h : -6;
      p.r = 0.4 + Math.pow(Math.random(), 2.4) * 1.9;
      p.vy = 5 + Math.random() * 14 + p.r * 3;        /* px per second, sinking */
      p.phase = Math.random() * Math.PI * 2;
      p.sway = 0.15 + Math.random() * 0.35;            /* rad per second */
      p.amp = 3 + Math.random() * 12;                   /* px */
      p.a = 0.12 + Math.random() * 0.45;
      p.tw = Math.random() * Math.PI * 2;
      p.c = Math.random() < 0.28 ? accent : base;
      return p;
    }

    function resize() {
      var rect = host.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(cap, Math.round((w * h) / 15000));
      while (parts.length < n) parts.push(seed({}, true));
      parts.length = n;
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].x > w) parts[i].x = Math.random() * w;
        if (parts[i].y > h) parts[i].y = Math.random() * h;
      }
      if (!running) draw(0);
    }

    function draw(dt) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y += p.vy * dt;
        p.phase += p.sway * dt;
        p.tw += dt * 0.9;
        if (p.y > h + 6) seed(p, false);
        var x = p.x + Math.sin(p.phase) * p.amp;
        var alpha = p.a * (0.7 + 0.3 * Math.sin(p.tw));
        ctx.fillStyle = p.c;
        if (p.r > 1.5) {
          ctx.globalAlpha = alpha * 0.18;
          ctx.beginPath();
          ctx.arc(x, p.y, p.r * 3, 0, 6.2832);
          ctx.fill();
        }
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function frame(t) {
      var dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t;
      draw(dt);
      raf = window.requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMQ.matches) return;
      running = true;
      last = 0;
      raf = window.requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      window.cancelAnimationFrame(raf);
    }
    function sync() {
      if (inView && !document.hidden) start(); else stop();
    }

    resize();

    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host);
    else window.addEventListener('resize', resize);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        host.classList.toggle('is-offscreen', !inView);
        sync();
      }).observe(host);
    }

    document.addEventListener('visibilitychange', sync);

    var onMotionPref = function () {
      if (reduceMQ.matches) { stop(); draw(0); } else sync();
    };
    if (reduceMQ.addEventListener) reduceMQ.addEventListener('change', onMotionPref);
    else if (reduceMQ.addListener) reduceMQ.addListener(onMotionPref);

    sync();
  }

  var canvases = document.querySelectorAll('canvas.snow');
  for (var c = 0; c < canvases.length; c++) MarineSnow(canvases[c]);
})();
