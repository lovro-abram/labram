/* ─────────────────────────────────────────────────────────────
   Shared app logic for Lovro's site.
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
      title_home: 'Lovro — Photos, Faith & the 30-Day Journey',
      title_days: '30 Days about Jesus — Lovro',
      meta_desc_home: 'Lovro — photographer and storyteller following Jesus. Photos with Bible verses, the 30-day video challenge and a free PDF of the journey.',
      meta_desc_days: '30 days, 30 short videos about Jesus, every day something new.',

      /* global */
      skip: 'Skip to content',
      new_tab: '(opens in a new tab)',
      footer: '© 2026 Lovro Abram · made with faith, light & love',

      /* home page */
      about_title: 'About me',
      tagline: 'Photographer · Storyteller · Follower of Jesus',
      about_p1: "I am Lovro — a photographer who sees God's fingerprints in every frame. For years I shared photos with motivational quotes; today the same photos carry the words that actually hold me: Bible verses.",
      about_p2: 'I also film short videos about Jesus and the Bible. What began as a 30-day challenge became a personal journey of growth, discovery and a deeper relationship with Him. This site is that journey, written down and shared.',
      cta_title: 'The journey whith Jesus',
      cta_note: 'One short video per day — 30 days, one journey.',
      cta_btn: '30 Days about Jesus',
      thinkel_title: 'Daily quotes — Thinkel',
      thinkel_desc: 'One quote a day to think with. Save favorites, write your thoughts, share quotes as image...',
      thinkel_btn: 'Open',
      ig_title: 'Instagram',
      ig_desc: 'Follow the journey, catch new videos first, and see the astonishing photos.',
      ig_btn: 'Follow',

      /* 30-days page */
      days_h1: '30 Days about Jesus',
      days_subtitle: '30 days, 30 short videos about Jesus, every day something new.',
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
      grid_noscript_link: 'See the videos on Instagram →'
    },
    sl: {
      title_home: 'Lovro — fotografije, vera in pot 30 dni',
      title_days: '30 dni o Jezusu — Lovro',
      meta_desc_home: 'Lovro — fotograf in pripovedovalec, ki sledi Jezusu. Fotografije s svetopisemskimi vrsticami, 30-dnevni video izziv in brezplačen PDF poti.',
      meta_desc_days: '30 dni, 30 kratkih videov o Jezusu, vsak dan nekaj novega.',

      skip: 'Preskoči na vsebino',
      new_tab: '(odpre se v novem zavihku)',
      footer: '© 2026 Lovro Abram · narejeno z vero, svetlobo in ljubeznijo',

      about_title: 'O meni',
      tagline: 'Fotograf · pripovedovalec · sledilec Jezusa',
      about_p1: 'Sem Lovro — fotograf, ki v vsakem kadru vidi Božje sledi. Dolgo sem delil fotografije z motivacijskimi citati; danes iste fotografije nosijo besede, ki me zares držijo: svetopisemske vrstice.',
      about_p2: 'Snemam tudi kratke videe o Jezusu in Svetem pismu. Kar se je začelo kot 30-dnevni izziv, je postalo osebna pot rasti, odkrivanja in poglobljenega odnosa z njim. Ta stran je ta pot, zapisana in deljena.',
      cta_title: 'Pot z Jezusom',
      cta_note: 'En kratek video na dan — 30 dni, ena pot.',
      cta_btn: '30 dni o Jezusu',
      thinkel_title: 'Dnevni citati — Thinkel',
      thinkel_desc: 'En citat na dan za razmislek. Shrani priljubljene, zapiši svoje misli, deli citat kot sliko...',
      thinkel_btn: 'Odpri',
      ig_title: 'Instagram',
      ig_desc: 'Sledi poti, prvi ujemi nove videe in poglej osupljive fotografije.',
      ig_btn: 'Sledi',

      days_h1: '30 dni o Jezusu',
      days_subtitle: '30 dni, 30 kratkih videov o Jezusu, vsak dan nekaj novega.',
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
      grid_noscript_link: 'Poglej videe na Instagramu →'
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

  /* ─── Reveal animation (with graceful fallback) ─────────── */
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