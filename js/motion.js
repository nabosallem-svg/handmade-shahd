/*
 * أنيميشن الموقع. كله بيتقفل لوحده لو الجهاز مظبوط على "تقليل الحركة".
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var root = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  if (reduce) {
    root.classList.add('motion-off');
    $$('.reveal, .stagger > *').forEach(function (el) { el.classList.add('in'); });
    return;
  }
  root.classList.add('motion-on');

  // ---------- intro loader (once per visit) ----------
  var seen = false;
  try { seen = sessionStorage.getItem('aura_intro') === '1'; sessionStorage.setItem('aura_intro', '1'); } catch (e) { /* ignore */ }
  if (!seen && document.body.dataset.page === 'home') {
    var loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-word">' + 'AURA'.split('').map(function (c, i) {
      return '<span style="--i:' + i + '">' + c + '</span>';
    }).join('') + '<i>✦</i></div><div class="loader-line"></div>';
    document.body.appendChild(loader);
    setTimeout(function () { loader.classList.add('out'); }, 900);
    setTimeout(function () { loader.remove(); }, 1700);
    root.classList.add('intro-delay');
  }
  requestAnimationFrame(function () { document.body.classList.add('loaded'); });

  // ---------- scroll progress ----------
  var bar = document.createElement('div');
  bar.className = 'progress';
  document.body.appendChild(bar);

  // ---------- hero: split headline into words ----------
  var h1 = $('.hero h1');
  if (h1) {
    var first = h1.firstChild;
    if (first && first.nodeType === 3) {
      var words = first.textContent.trim().split(/\s+/);
      var frag = document.createDocumentFragment();
      words.forEach(function (w, i) {
        var s = document.createElement('span');
        s.className = 'word';
        s.style.setProperty('--i', i);
        s.textContent = w;
        frag.appendChild(s);
        frag.appendChild(document.createTextNode(' '));
      });
      h1.replaceChild(frag, first);
    }
  }

  // ---------- hero: floating sparkles ----------
  var heroArt = $('.hero-art');
  var hero = $('.hero');
  if (hero) {
    var field = document.createElement('div');
    field.className = 'sparkle-field';
    field.setAttribute('aria-hidden', 'true');
    for (var k = 0; k < 10; k++) {
      var sp = document.createElement('span');
      sp.textContent = Math.random() > .5 ? '✦' : '✧';
      sp.style.left = (Math.random() * 100) + '%';
      sp.style.top = (Math.random() * 100) + '%';
      sp.style.fontSize = (8 + Math.random() * 16) + 'px';
      sp.style.animationDelay = (-Math.random() * 12) + 's';
      sp.style.animationDuration = (8 + Math.random() * 10) + 's';
      field.appendChild(sp);
    }
    hero.insertBefore(field, hero.firstChild);
  }

  // ---------- stagger groups: grids that are filled by JS ----------
  ['#cats', '#bestsellers', '#catalog-grid', '#related', '.perks-row', '.values', '.cart-items', '.order-lines', '.faq-group'].forEach(function (sel) {
    $$(sel).forEach(function (el) { el.classList.add('stagger'); });
  });

  // ---------- reveal on scroll ----------
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      if (el.parentElement && el.parentElement.classList.contains('stagger')) {
        var sibs = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.setProperty('--d', (sibs % 8) * 70 + 'ms');
      }
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: .05 });

  function observeAll(scope) {
    $$('.reveal:not(.in), .stagger > *:not(.in), .page-title:not(.in), .section-head h2:not(.in), .prose > *:not(.in), .split-media:not(.in), .custom-media:not(.in), .gallery:not(.in), .pdp-info > *:not(.in), .order-card:not(.in), .form-card:not(.in), .checkout:not(.in)', scope)
      .forEach(function (el) { el.classList.add('will-reveal'); io.observe(el); });
  }
  observeAll(document);

  // content rendered later (filters, cart redraws) animates in too
  var mo = new MutationObserver(function (muts) {
    var dirty = muts.some(function (m) { return m.addedNodes.length; });
    if (dirty) requestAnimationFrame(function () { observeAll(document); bindCards(document); bindMagnets(document); });
  });
  mo.observe($('main') || document.body, { childList: true, subtree: true });

  // ---------- scroll-driven: progress, header, parallax ----------
  var header = $('.site-header');
  var heroMain = $('.hero-main');
  var heroSmall = $('.hero-small');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
      if (header) header.classList.toggle('scrolled', y > 12);
      if (heroMain && y < innerHeight * 1.2) {
        heroMain.style.setProperty('--py', (y * 0.08) + 'px');
        if (heroSmall) heroSmall.style.setProperty('--py', (y * -0.12) + 'px');
      }
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- desktop pointer effects ----------
  if (finePointer) {
    // hero image follows the mouse a little
    if (heroArt) {
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5;
        var y = (e.clientY - r.top) / r.height - .5;
        heroArt.style.setProperty('--mx', (x * 18) + 'px');
        heroArt.style.setProperty('--my', (y * 18) + 'px');
      });
      hero.addEventListener('mouseleave', function () {
        heroArt.style.setProperty('--mx', '0px');
        heroArt.style.setProperty('--my', '0px');
      });
    }
  }

  // cards: 3D tilt + light
  function bindCards(scope) {
    if (!finePointer) return;
    $$('.card:not([data-tilt]), .cat:not([data-tilt])', scope).forEach(function (card) {
      card.setAttribute('data-tilt', '');
      var raf = 0;
      card.addEventListener('mousemove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () { raf = 0; });
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width;
        var y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--rx', ((.5 - y) * 8) + 'deg');
        card.style.setProperty('--ry', ((x - .5) * 10) + 'deg');
        card.style.setProperty('--lx', (x * 100) + '%');
        card.style.setProperty('--ly', (y * 100) + '%');
      });
      card.addEventListener('mouseleave', function () {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }
  bindCards(document);

  // buttons: magnetic pull
  function bindMagnets(scope) {
    if (!finePointer) return;
    $$('.btn:not([data-mag]), .icon-add:not([data-mag]), .cart-btn:not([data-mag])', scope).forEach(function (b) {
      b.setAttribute('data-mag', '');
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty('--tx', ((e.clientX - r.left - r.width / 2) * .18) + 'px');
        b.style.setProperty('--ty', ((e.clientY - r.top - r.height / 2) * .28) + 'px');
      });
      b.addEventListener('mouseleave', function () {
        b.style.setProperty('--tx', '0px');
        b.style.setProperty('--ty', '0px');
      });
    });
  }
  bindMagnets(document);

  // ripple on every click target
  document.addEventListener('pointerdown', function (e) {
    var b = e.target.closest('.btn, .icon-add, .filters button, .qty button');
    if (!b) return;
    var r = b.getBoundingClientRect();
    var d = Math.max(r.width, r.height) * 2;
    var rip = document.createElement('span');
    rip.className = 'ripple';
    rip.style.width = rip.style.height = d + 'px';
    rip.style.left = (e.clientX - r.left - d / 2) + 'px';
    rip.style.top = (e.clientY - r.top - d / 2) + 'px';
    b.appendChild(rip);
    setTimeout(function () { rip.remove(); }, 650);
  });

  // ---------- add to cart: image flies into the bag ----------
  document.addEventListener('aura:add', function (e) {
    var cart = $('.cart-btn');
    var from = e.detail && e.detail.from;
    if (cart) {
      cart.classList.remove('bump');
      void cart.offsetWidth;
      cart.classList.add('bump');
    }
    if (!from || !cart) return;
    var a = from.getBoundingClientRect();
    var b = cart.getBoundingClientRect();
    var fly = from.cloneNode();
    fly.className = 'fly';
    fly.removeAttribute('loading');
    fly.style.left = a.left + 'px';
    fly.style.top = a.top + 'px';
    fly.style.width = a.width + 'px';
    fly.style.height = a.height + 'px';
    document.body.appendChild(fly);
    var dx = b.left + b.width / 2 - (a.left + a.width / 2);
    var dy = b.top + b.height / 2 - (a.top + a.height / 2);
    fly.animate([
      { transform: 'translate(0,0) scale(1) rotate(0)', opacity: 1, borderRadius: '18px' },
      { transform: 'translate(' + dx * .5 + 'px,' + (dy * .5 - 120) + 'px) scale(.45) rotate(-8deg)', opacity: .95, offset: .55, borderRadius: '50%' },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.06) rotate(12deg)', opacity: .3, borderRadius: '50%' },
    ], { duration: 850, easing: 'cubic-bezier(.5,0,.2,1)' }).onfinish = function () { fly.remove(); };

    // little burst of sparkles at the bag
    for (var i = 0; i < 8; i++) {
      var s = document.createElement('span');
      s.className = 'burst';
      s.textContent = '✦';
      s.style.left = (b.left + b.width / 2) + 'px';
      s.style.top = (b.top + b.height / 2) + 'px';
      var ang = (i / 8) * Math.PI * 2;
      s.style.setProperty('--bx', Math.cos(ang) * 34 + 'px');
      s.style.setProperty('--by', Math.sin(ang) * 34 + 'px');
      s.style.animationDelay = '780ms';
      document.body.appendChild(s);
      setTimeout(function (n) { return function () { n.remove(); }; }(s), 1700);
    }
  });

  // ---------- smooth page transitions ----------
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    if (!/\.html$|\/$/.test(url.pathname)) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(function () { location.href = a.href; }, 120);
  });
  addEventListener('pageshow', function (e) { if (e.persisted) document.body.classList.remove('leaving'); });

  // ---------- count-up prices when they appear ----------
  // (kept subtle: only the big product price)
  var big = $('.price.big');
  if (big) big.classList.add('pop');
})();
