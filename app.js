/* ─────────────────────────────────────────────────────────────
   Shared app logic for Lovro's site (neo-brutal redesign).
   Pages define `Lovro.onLangChange` (optional) to react to
   language switches; `Lovro.applyLang()` is called once after
   load and again on every language change.
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ─── Translations ──────────────────────────────────────── */
  const T = {
    en: {
      /* meta / titles */
      title_home: 'Lovro — one short video about Jesus, every day',
      title_days: '30 Days about Jesus — Lovro',
      meta_desc_home: 'Lovro posts a short video about Jesus and the Bible every day. Follow the journey on Instagram, browse all 30 days in one place, and think with a daily quote in Thinkel.',
      meta_desc_days: 'All 30 short videos about Jesus in one place — one per day, each linking to its Instagram reel.',
      og_title_home: 'Lovro — one short video about Jesus, every day',
      og_desc_home: 'A daily short video about Jesus and the Bible, the 30-day journey in one place, and a free daily-quote app.',

      /* global */
      skip: 'Skip to content',
      new_tab: '(opens in a new tab)',
      footer: '© 2026 Lovro Abram · made with faith, light & love',
      back_home: 'Home',

      /* hero */
      hero_badge: 'One short video, every day',
      hero_h1: 'Faith, one short <span class="hl">video</span> a day.',
      hero_line: "I'm Lovro — I post a short video about Jesus and the Bible every single day.",
      hero_fig: "that's me",
      ig_primary: 'Follow on Instagram',
      days_btn: 'Browse the 30 days',

      /* home page */
      about_title: 'About me',
      tagline: 'Storyteller · Video maker · Follower of Jesus',
      about_p1: 'I am Lovro. What began as a 30-day challenge became a daily habit: short, honest videos about Jesus and the Bible — who He is, what He said, and why it still matters.',
      about_p2: 'This site is that journey, written down and shared: the videos, a daily quote to think with, and a place to start your own 30 days.',
      days_title: 'The journey with Jesus',
      days_note: 'The whole journey in one place — all 30 short videos, one per day, ready whenever you are.',
      cta_btn: '30 Days about Jesus',
      thinkel_title: 'Thinkel — daily quotes',
      thinkel_desc: 'One thought-provoking quote a day. Save it, write your thoughts, share it as an image.',
      thinkel_btn: 'Open',

      /* 30-days page */
      days_h1: '30 Days about Jesus',
      days_subtitle: '30 days, 30 short videos about Jesus — every day something new.',
      progress_label: 'Days released',
      progress: '{d} of 30 days released',
      all_done: 'All 30 days are live — thank you for walking with me!',
      day_watch: 'Watch',
      day_locked: 'Coming soon',
      watch_day: 'Watch day {d} on Instagram',
      day_locked_label: 'Day {d}, coming soon',
      grid_note: 'Locked days unlock as new videos go live on Instagram.',
      toast_locked: 'This day is not live yet — follow me on Instagram to catch it first!',
      grid_noscript: 'The day grid needs JavaScript.',
      grid_noscript_link: 'See the videos on Instagram →',

      /* instagram card */
      ig_title: 'Instagram',
      ig_desc: 'Follow the journey and catch each new video the day it drops.',
      ig_btn: 'Follow'
    },
    sl: {
      /* meta / titles */
      title_home: 'Lovro — vsak dan en kratek video o Jezusu',
      title_days: '30 dni o Jezusu — Lovro',
      meta_desc_home: 'Lovro vsak dan objavi kratek video o Jezusu in Svetem pismu. Sledi poti na Instagramu, poglej vseh 30 dni na enem mestu in razmišljaj z dnevnim citatom v Thinkelu.',
      meta_desc_days: 'Vseh 30 kratkih videov o Jezusu na enem mestu — en na dan, vsak s povezavo do Instagramreela.',
      og_title_home: 'Lovro — vsak dan en kratek video o Jezusu',
      og_desc_home: 'Dnevni kratek video o Jezusu in Svetem pismu, pot 30 dni na enem mestu in brezplačna aplikacija z dnevnimi citati.',

      skip: 'Preskoči na vsebino',
      new_tab: '(odpre se v novem zavihku)',
      footer: '© 2026 Lovro Abram · narejeno z vero, svetlobo in ljubeznijo',
      back_home: 'Domov',

      /* hero */
      hero_badge: 'En kratek video, vsak dan',
      hero_h1: 'Vera, en kratek <span class="hl">video</span> na dan.',
      hero_line: 'Sem Lovro — vsak dan objavim kratek video o Jezusu in Svetem pismu.',
      hero_fig: 'to sem jaz',
      ig_primary: 'Sledi na Instagramu',
      days_btn: 'Prebrskaj 30 dni',

      /* home page */
      about_title: 'O meni',
      tagline: 'Pripovedovalec · video ustvarjalec · sledilec Jezusa',
      about_p1: 'Sem Lovro. Kar se je začelo kot 30-dnevni izziv, je postala dnevna navada: kratki, iskreni videi o Jezusu in Svetem pismu — kdo je, kaj je rekel in zakaj še danes šteje.',
      about_p2: 'Ta stran je ta pot, zapisana in deljena: videi, dnevni citat za razmislek in mesto, kjer začneš svojih 30 dni.',
      days_title: 'Pot z Jezusom',
      days_note: 'Cela pot na enem mestu — vseh 30 kratkih videov, en na dan, pripravljeno, kadar koli si pripravljen ti.',
      cta_btn: '30 dni o Jezusu',
      thinkel_title: 'Thinkel — dnevni citati',
      thinkel_desc: 'En citat na dan za razmislek. Shrani ga, zapiši svoje misli, deli kot sliko.',
      thinkel_btn: 'Odpri',

      /* 30-days page */
      days_h1: '30 dni o Jezusu',
      days_subtitle: '30 dni, 30 kratkih videov o Jezusu — vsak dan nekaj novega.',
      progress_label: 'Objavljeni dnevi',
      progress: '{d} od 30 objavljenih dni',
      all_done: 'Vseh 30 dni je objavljenih — hvala, ker hodiš z mano!',
      day_watch: 'Poglej',
      day_locked: 'Kmalu',
      watch_day: 'Poglej dan {d} na Instagramu',
      day_locked_label: 'Dan {d}, kmalu',
      grid_note: 'Zaklenjeni dnevi se odklenejo, ko bodo novi videi objavljeni na Instagramu.',
      toast_locked: 'Ta dan še ni objavljen — sledi mi na Instagramu in ga ujemi prvi!',
      grid_noscript: 'Mreža dni potrebuje JavaScript.',
      grid_noscript_link: 'Poglej videe na Instagramu →',

      /* instagram card */
      ig_title: 'Instagram',
      ig_desc: 'Sledi poti in ujemi vsak novi video, ko objavi.',
      ig_btn: 'Sledi'
    }
  };

  /* ─── Language persistence (guarded) ────────────────────── */
  function loadLang () {
    try { return localStorage.getItem('lovro_lang'); }
    catch { return null; }
  }
  function saveLang (l) {
    try { localStorage.setItem('lovro_lang', l); } catch {}
  }

  /* EN is the default; SL only when the browser language is Slovenian
     or the visitor picked it before. */
  const detected = (navigator.language || 'en').toLowerCase().startsWith('sl') ? 'sl' : 'en';
  const initialLang = loadLang() || detected;

  /* ─── Public API ────────────────────────────────────────── */
  const Lovro = {
    lang: initialLang,
    onLangChange: null,   /* pages may assign a callback */

    t (key) {
      return (T[this.lang] && T[this.lang][key]) || T.en[key] || key;
    },
    fill (template, day) {
      return String(template).split('{d}').join(day);
    },

    setLang (l) {
      this.lang = l;
      saveLang(l);
      this.applyLang();
    },

    applyLang () {
      document.documentElement.lang = this.lang;

      /* <body data-i18n-title="title_home"> */
      const titleKey = document.body.dataset.i18nTitle;
      if (titleKey) document.title = this.t(titleKey);

      /* [data-i18n] -> textContent */
      document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = this.t(el.dataset.i18n);
      });

      /* [data-i18n-html] -> innerHTML (first-party strings only) */
      document.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.innerHTML = this.t(el.dataset.i18nHtml);
      });

      /* [data-i18n-attr="attr:key, attr2:key2"] -> setAttribute */
      document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        el.dataset.i18nAttr.split(',').forEach(pair => {
          const [attr, key] = pair.split(':').map(s => s.trim());
          if (attr && key) el.setAttribute(attr, this.t(key));
        });
      });

      /* Language buttons: visual + ARIA state */
      document.querySelectorAll('.lang-opt').forEach(b => {
        const active = b.dataset.lang === this.lang;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      if (typeof this.onLangChange === 'function') {
        this.onLangChange();
      }
    },

    showToast (msg) {
      const el = document.getElementById('toast');
      if (!el) return;
      el.textContent = msg;
      el.classList.add('show');
      clearTimeout(Lovro._toastTimer);
      Lovro._toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
    }
  };

  /* ─── Wire up language buttons ──────────────────────────── */
  document.querySelectorAll('.lang-opt').forEach(b => {
    b.addEventListener('click', () => Lovro.setLang(b.dataset.lang));
  });

  /* ─── Reveal animation (JS-gated: visible without JS) ───── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(x => {
        if (x.isIntersecting) {
          x.target.classList.add('in');
          io.unobserve(x.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ─── First paint ───────────────────────────────────────── */
  Lovro.applyLang();

  window.Lovro = Lovro;
})();
