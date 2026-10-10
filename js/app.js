(function () {
  'use strict';

  var S = window.STORE;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var money = function (n) { return Number(n).toLocaleString('ar-EG') + ' ' + S.currency; };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var params = new URLSearchParams(location.search);
  var findProduct = function (id) { return PRODUCTS.find(function (p) { return p.id === id; }); };
  var findCategory = function (id) { return CATEGORIES.find(function (c) { return c.id === id; }); };

  // ---------- storage (best effort) ----------
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  // ---------- cart ----------
  var Cart = {
    items: function () { return load('aura_cart', []); },
    count: function () { return this.items().reduce(function (n, i) { return n + i.qty; }, 0); },
    add: function (id, qty, note) {
      var items = this.items();
      var key = id + '|' + (note || '');
      var found = items.find(function (i) { return i.key === key; });
      if (found) found.qty += qty; else items.push({ key: key, id: id, qty: qty, note: note || '' });
      save('aura_cart', items);
      updateCartBadge();
    },
    setQty: function (key, qty) {
      var items = this.items().map(function (i) { if (i.key === key) i.qty = qty; return i; })
        .filter(function (i) { return i.qty > 0; });
      save('aura_cart', items);
      updateCartBadge();
    },
    clear: function () { save('aura_cart', []); updateCartBadge(); },
    subtotal: function () {
      return this.items().reduce(function (sum, i) {
        var p = findProduct(i.id); return sum + (p ? p.price * i.qty : 0);
      }, 0);
    },
  };

  function shippingFor(subtotal) {
    if (!subtotal) return 0;
    if (S.freeShippingOver && subtotal >= S.freeShippingOver) return 0;
    return S.shippingFee;
  }

  function updateCartBadge() {
    var b = $('#cart-count');
    if (!b) return;
    var n = Cart.count();
    b.textContent = n;
    b.hidden = n === 0;
  }

  function toast(msg) {
    var t = $('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  function waLink(text) {
    return 'https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(text);
  }

  // ---------- layout ----------
  function renderHeader() {
    var el = $('#site-header');
    if (!el) return;
    var page = document.body.dataset.page;
    var link = function (href, label, key) {
      return '<a href="' + href + '"' + (page === key ? ' aria-current="page"' : '') + '>' + label + '</a>';
    };
    el.innerHTML =
      '<div class="wrap header-inner">' +
        '<a class="logo" href="index.html" aria-label="' + esc(S.name) + '">' + esc(S.name) + '<span>✦</span></a>' +
        '<nav class="nav" id="nav">' +
          link('index.html#catalog', 'المنتجات', 'home') +
          link('custom-order.html', 'تصميم خاص', 'custom') +
          link('about.html', 'قصتنا', 'about') +
        '</nav>' +
        '<div class="header-actions">' +
          '<a class="cart-btn" href="cart.html" aria-label="السلة">' +
            '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Zm4 0V6a3 3 0 0 1 6 0v2"/></svg>' +
            '<span class="badge" id="cart-count" hidden>0</span>' +
          '</a>' +
          '<button class="menu-btn" id="menu-btn" aria-label="القائمة" aria-expanded="false"><span></span><span></span></button>' +
        '</div>' +
      '</div>';
    var btn = $('#menu-btn');
    btn.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open);
    });
    $('#nav').addEventListener('click', function (e) {
      if (e.target.tagName === 'A') document.body.classList.remove('menu-open');
    });
    updateCartBadge();
  }

  function renderFooter() {
    var el = $('#site-footer');
    if (!el) return;
    el.innerHTML =
      '<div class="wrap footer-inner">' +
        '<div class="footer-brand"><a class="logo" href="index.html">' + esc(S.name) + '<span>✦</span></a>' +
          '<p>إكسسوارات هاند ميد بلمسة ناعمة وفخمة.<br><span class="en">' + esc(S.tagline) + '</span></p></div>' +
        '<nav class="footer-links">' +
          '<a href="track.html">تتبع طلبي</a>' +
          '<a href="faq.html">أسئلة شائعة</a>' +
          '<a href="policies.html">الشحن والاستبدال</a>' +
          '<a href="' + esc(S.instagram) + '" target="_blank" rel="noopener">إنستجرام</a>' +
        '</nav>' +
      '</div>' +
      '<div class="wrap footer-bottom">© ' + new Date().getFullYear() + ' ' + esc(S.name) + ' · معمول بواسطة ' + esc(S.madeBy) + '</div>';
  }

  // ---------- shared pieces ----------
  function img(id, w, alt, cls) {
    return '<img src="' + IMG(id, w) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async"' +
      (cls ? ' class="' + cls + '"' : '') + ' onerror="this.classList.add(\'img-fallback\')">';
  }

  function productCard(p) {
    var cat = findCategory(p.category);
    return '<article class="card">' +
      '<a class="card-media" href="product.html?id=' + p.id + '">' +
        img(p.images[0], 700, p.name) +
        (p.images[1] ? img(p.images[1], 700, p.name, 'alt-img') : '') +
        (p.bestseller ? '<span class="tag">الأكثر طلباً</span>' : '') +
      '</a>' +
      '<div class="card-body">' +
        '<span class="card-cat">' + esc(cat ? cat.name : '') + '</span>' +
        '<h3><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h3>' +
        '<div class="card-foot"><span class="price">' + money(p.price) + '</span>' +
        '<button class="icon-add" data-add="' + p.id + '" aria-label="أضيفي ' + esc(p.name) + ' للسلة">+</button></div>' +
      '</div>' +
    '</article>';
  }

  function bindAddButtons(root) {
    (root || document).addEventListener('click', function (e) {
      var b = e.target.closest('[data-add]');
      if (!b) return;
      Cart.add(b.dataset.add, 1);
      var card = b.closest('.card');
      document.dispatchEvent(new CustomEvent('aura:add', { detail: { from: card && card.querySelector('.card-media img') } }));
      toast('اتضافت للسلة ✦');
    });
  }

  // ---------- pages ----------
  var pages = {};

  pages.home = function () {
    $('#hero-img').innerHTML = img(SITE_IMAGES.hero, 1400, 'إيد بتشتغل على قطعة إكسسوار هاند ميد');
    $('#hero-img-small').innerHTML = img(SITE_IMAGES.heroSmall, 600, 'طقم لولي بينك');
    $('#gift-img').innerHTML = img(SITE_IMAGES.gift, 1100, 'علب هدايا بشريطة بينك');

    $('#cats').innerHTML = CATEGORIES.map(function (c) {
      return '<a class="cat" href="index.html?category=' + c.id + '#catalog">' +
        img(c.image, 600, c.name) +
        '<span class="cat-label"><strong>' + esc(c.name) + '</strong><small>' + esc(c.en) + '</small></span></a>';
    }).join('');

    $('#bestsellers').innerHTML = PRODUCTS.filter(function (p) { return p.bestseller; }).slice(0, 4).map(productCard).join('');

    var current = params.get('category') || 'all';
    var filters = $('#filters');
    filters.innerHTML = '<button data-cat="all">الكل</button>' + CATEGORIES.map(function (c) {
      return '<button data-cat="' + c.id + '">' + esc(c.name) + '</button>';
    }).join('');
    function draw() {
      filters.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b.dataset.cat === current); });
      var list = PRODUCTS.filter(function (p) { return current === 'all' || p.category === current; });
      $('#catalog-grid').innerHTML = list.map(productCard).join('') || '<p class="muted">مفيش منتجات في القسم دا دلوقتي.</p>';
    }
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      current = b.dataset.cat;
      var url = new URL(location.href);
      if (current === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', current);
      history.replaceState(null, '', url);
      draw();
    });
    draw();
    bindAddButtons();
  };

  pages.product = function () {
    var p = findProduct(params.get('id'));
    var root = $('#product');
    if (!p) {
      root.innerHTML = '<div class="empty"><h1>المنتج دا مش موجود</h1><a class="btn" href="index.html#catalog">ارجعي للمنتجات</a></div>';
      return;
    }
    document.title = p.name + ' | ' + S.name;
    var cat = findCategory(p.category);
    root.innerHTML =
      '<div class="pdp">' +
        '<div class="gallery">' +
          '<div class="gallery-main" id="g-main">' + img(p.images[0], 1100, p.name) + '</div>' +
          (p.images.length > 1 ? '<div class="thumbs">' + p.images.map(function (im, i) {
            return '<button data-i="' + i + '"' + (i === 0 ? ' class="active"' : '') + '>' + img(im, 200, p.name) + '</button>';
          }).join('') + '</div>' : '') +
        '</div>' +
        '<div class="pdp-info">' +
          '<a class="crumb" href="index.html?category=' + p.category + '#catalog">' + esc(cat ? cat.name : '') + '</a>' +
          '<h1>' + esc(p.name) + '</h1>' +
          '<p class="price big">' + money(p.price) + '</p>' +
          '<p class="lead">' + esc(p.description) + '</p>' +
          (p.customizable ? '<label class="field"><span>تخصيص (اختياري)</span><input id="note" maxlength="80" placeholder="اسم، حرف، لون، مقاس..."></label>' : '') +
          '<div class="qty-row"><div class="qty"><button data-q="-1" aria-label="أقل">−</button><output id="qty">1</output><button data-q="1" aria-label="أكتر">+</button></div>' +
          '<button class="btn" id="add">أضيفي للسلة</button></div>' +
          '<ul class="perks"><li>✦ معمولة بإيد، ومفيش قطعتين زي بعض بالظبط</li><li>✦ بتوصل في تغليف هدية</li><li>✦ الدفع إنستا باي أو فودافون كاش</li></ul>' +
          '<details open><summary>الخامات</summary><p>' + esc(p.materials) + '</p></details>' +
          '<details><summary>العناية بالقطعة</summary><p>شيليها قبل الشاور أو الرياضة، وبعديها عن المية والبرفان واللوشن. خزنيها في مكان ناشف وامسحيها بقماشة ناعمة.</p></details>' +
          '<details><summary>الشحن والاستبدال</summary><p>التجهيز من ١ لـ ٣ أيام (من ٣ لـ ٧ للقطع المخصوصة)، والتوصيل من ٢ لـ ٥ أيام. <a href="policies.html">التفاصيل</a></p></details>' +
        '</div>' +
      '</div>';

    var thumbs = root.querySelector('.thumbs');
    if (thumbs) thumbs.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      thumbs.querySelectorAll('button').forEach(function (x) { x.classList.toggle('active', x === b); });
      $('#g-main').innerHTML = img(p.images[+b.dataset.i], 1100, p.name);
    });
    var qty = 1;
    root.querySelector('.qty').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      qty = Math.max(1, Math.min(20, qty + +b.dataset.q));
      $('#qty').textContent = qty;
    });
    $('#add').addEventListener('click', function () {
      var note = $('#note') ? $('#note').value.trim() : '';
      Cart.add(p.id, qty, note);
      document.dispatchEvent(new CustomEvent('aura:add', { detail: { from: $('#g-main img') } }));
      toast('اتضافت للسلة ✦');
    });

    var related = PRODUCTS.filter(function (x) { return x.category === p.category && x.id !== p.id; })
      .concat(PRODUCTS.filter(function (x) { return x.category !== p.category && x.bestseller; })).slice(0, 4);
    $('#related').innerHTML = related.map(productCard).join('');
    bindAddButtons($('#related'));
  };

  pages.cart = function () {
    var root = $('#cart');
    function draw() {
      var items = Cart.items();
      if (!items.length) {
        root.innerHTML = '<div class="empty"><h2>السلة فاضية</h2><p class="muted">لسه مختارتيش حاجة.</p><a class="btn" href="index.html#catalog">تصفحي المنتجات</a></div>';
        return;
      }
      var sub = Cart.subtotal(), ship = shippingFor(sub);
      root.innerHTML =
        '<div class="cart-layout">' +
          '<div class="cart-items">' + items.map(function (i) {
            var p = findProduct(i.id); if (!p) return '';
            return '<div class="line">' +
              '<a href="product.html?id=' + p.id + '">' + img(p.images[0], 240, p.name) + '</a>' +
              '<div class="line-info"><a href="product.html?id=' + p.id + '"><strong>' + esc(p.name) + '</strong></a>' +
                (i.note ? '<small>تخصيص: ' + esc(i.note) + '</small>' : '') +
                '<span class="price">' + money(p.price) + '</span></div>' +
              '<div class="qty"><button data-k="' + esc(i.key) + '" data-q="-1" aria-label="أقل">−</button><output>' + i.qty + '</output><button data-k="' + esc(i.key) + '" data-q="1" aria-label="أكتر">+</button></div>' +
            '</div>';
          }).join('') + '</div>' +
          '<form class="checkout" id="checkout">' +
            '<h2>بيانات التوصيل</h2>' +
            '<label class="field"><span>الاسم</span><input name="name" required autocomplete="name"></label>' +
            '<label class="field"><span>رقم الموبايل / واتساب</span><input name="phone" required inputmode="tel" pattern="[0-9+ ]{10,15}" autocomplete="tel"></label>' +
            '<label class="field"><span>المحافظة</span><input name="gov" required></label>' +
            '<label class="field"><span>العنوان بالتفصيل</span><textarea name="address" rows="2" required></textarea></label>' +
            '<label class="field"><span>ملاحظات (لو هدية اكتبي رسالة الكارت هنا)</span><textarea name="notes" rows="2"></textarea></label>' +
            '<fieldset class="pay"><legend>طريقة الدفع</legend>' +
              '<label><input type="radio" name="pay" value="InstaPay" checked> إنستا باي</label>' +
              '<label><input type="radio" name="pay" value="Vodafone Cash"> فودافون كاش</label>' +
            '</fieldset>' +
            '<div class="totals">' +
              '<div><span>المنتجات</span><span>' + money(sub) + '</span></div>' +
              '<div><span>الشحن</span><span>' + (ship ? money(ship) : 'مجاني') + '</span></div>' +
              '<div class="grand"><span>الإجمالي</span><span>' + money(sub + ship) + '</span></div>' +
            '</div>' +
            '<button class="btn block" type="submit">تأكيد الطلب</button>' +
            '<p class="muted small">الدفع مقدماً. بعد التأكيد هيظهرلك رقم التحويل والمبلغ.</p>' +
          '</form>' +
        '</div>';
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-k]'); if (!b) return;
      var it = Cart.items().find(function (i) { return i.key === b.dataset.k; });
      if (it) { Cart.setQty(it.key, it.qty + +b.dataset.q); draw(); }
    });
    root.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(e.target);
      var items = Cart.items();
      var sub = Cart.subtotal(), ship = shippingFor(sub);
      var orders = load('aura_orders', []);
      var id = 'OR-' + String(Date.now()).slice(-5);
      var order = {
        id: id, date: new Date().toISOString(), status: 'في انتظار الدفع',
        name: f.get('name'), phone: f.get('phone'), gov: f.get('gov'), address: f.get('address'),
        notes: f.get('notes'), pay: f.get('pay'), items: items, subtotal: sub, shipping: ship, total: sub + ship,
      };
      orders.push(order);
      save('aura_orders', orders);
      Cart.clear();
      location.href = 'order.html?id=' + encodeURIComponent(id) + '&phone=' + encodeURIComponent(order.phone);
    });
    draw();
  };

  function orderText(o) {
    var lines = o.items.map(function (i) {
      var p = findProduct(i.id);
      return '• ' + (p ? p.name : i.id) + ' × ' + i.qty + (i.note ? ' (' + i.note + ')' : '');
    });
    return 'طلب جديد من ' + S.name + ' ✦\n' +
      'رقم الطلب: ' + o.id + '\n' + lines.join('\n') + '\n' +
      'الإجمالي: ' + money(o.total) + '\n' +
      'الدفع: ' + o.pay + '\n' +
      'الاسم: ' + o.name + '\nالموبايل: ' + o.phone + '\nالعنوان: ' + o.gov + ' - ' + o.address +
      (o.notes ? '\nملاحظات: ' + o.notes : '');
  }

  pages.order = function () {
    var root = $('#order');
    var id = (params.get('id') || '').trim().toUpperCase();
    var phone = (params.get('phone') || '').replace(/\s/g, '');
    var o = load('aura_orders', []).find(function (x) { return x.id === id && x.phone.replace(/\s/g, '') === phone; });
    if (!o) {
      root.innerHTML = '<div class="empty"><h1>مش لاقيين الطلب دا</h1><p class="muted">اتأكدي من رقم الطلب والموبايل، أو كلمينا على واتساب.</p>' +
        '<a class="btn" href="track.html">جربي تاني</a> <a class="btn ghost" href="' + waLink('عايزة أسأل عن طلبي رقم ' + id) + '" target="_blank" rel="noopener">واتساب</a></div>';
      return;
    }
    var payTo = o.pay === 'InstaPay' ? S.instapay : S.vodafoneCash;
    root.innerHTML =
      '<div class="order-card">' +
        '<span class="eyebrow">✦ طلبك اتسجل</span>' +
        '<h1>رقم الطلب ' + esc(o.id) + '</h1>' +
        '<p class="status">' + esc(o.status) + '</p>' +
        '<div class="pay-box"><p>حولي <strong>' + money(o.total) + '</strong> على ' + esc(o.pay) + ':</p>' +
          '<p class="pay-to">' + esc(payTo) + '</p>' +
          '<p class="muted small">بعد التحويل ابعتي سكرين التحويل على واتساب مع رقم الطلب. لو التحويل موصلش خلال ٤٨ ساعة ممكن الطلب يتلغي.</p>' +
          '<a class="btn" href="' + waLink(orderText(o) + '\n\nدا سكرين التحويل:') + '" target="_blank" rel="noopener">ابعتي الطلب والسكرين على واتساب</a>' +
        '</div>' +
        '<ul class="order-lines">' + o.items.map(function (i) {
          var p = findProduct(i.id);
          return '<li><span>' + esc(p ? p.name : i.id) + ' × ' + i.qty + (i.note ? ' <small>(' + esc(i.note) + ')</small>' : '') + '</span><span>' + (p ? money(p.price * i.qty) : '') + '</span></li>';
        }).join('') +
          '<li><span>الشحن</span><span>' + (o.shipping ? money(o.shipping) : 'مجاني') + '</span></li>' +
          '<li class="grand"><span>الإجمالي</span><span>' + money(o.total) + '</span></li></ul>' +
      '</div>';
  };

  pages.track = function () {
    $('#track-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(e.target);
      location.href = 'order.html?id=' + encodeURIComponent(f.get('id').trim()) + '&phone=' + encodeURIComponent(f.get('phone').trim());
    });
  };

  pages.custom = function () {
    $('#custom-img').innerHTML = img(SITE_IMAGES.custom, 1000, 'ترابيزة شغل عليها خامات إكسسوارات');
    var sel = $('#c-type');
    sel.innerHTML = '<option value="">اختاري (اختياري)</option>' + CATEGORIES.map(function (c) {
      return '<option>' + esc(c.name) + '</option>';
    }).join('') + '<option>حاجة تانية</option>';
    var idea = $('#c-idea'), counter = $('#c-count');
    idea.addEventListener('input', function () { counter.textContent = idea.value.length + ' / 2000'; });
    var file = $('#c-file'), prev = $('#c-preview');
    file.addEventListener('change', function () {
      var f = file.files[0];
      if (!f) { prev.hidden = true; return; }
      prev.src = URL.createObjectURL(f);
      prev.hidden = false;
    });
    $('#custom-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(e.target);
      var id = 'CU-' + String(Date.now()).slice(-5);
      var text = 'طلب تصميم خاص من ' + S.name + ' ✦\nرقم الطلب: ' + id + '\nالاسم: ' + f.get('name') + '\nالموبايل: ' + f.get('phone') +
        (f.get('type') ? '\nنوع القطعة: ' + f.get('type') : '') + '\nالفكرة: ' + f.get('idea') +
        (file.files[0] ? '\n(هبعت صورة مرجعية في الرسالة الجاية)' : '');
      $('#custom-done').hidden = false;
      $('#custom-id').textContent = id;
      $('#custom-wa').href = waLink(text);
      e.target.hidden = true;
      window.open(waLink(text), '_blank', 'noopener');
    });
  };

  pages.about = function () {
    $('#about-main').innerHTML = img(SITE_IMAGES.aboutMain, 1000, 'إيد شايلة علبة خشب');
    $('#about-side').innerHTML = img(SITE_IMAGES.aboutSide, 700, 'أساور معروضة على ستاند خشب');
  };

  // ---------- boot ----------
  renderHeader();
  renderFooter();
  var page = document.body.dataset.page;
  if (pages[page]) pages[page]();

})();
