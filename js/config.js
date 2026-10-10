/*
 * إعدادات المتجر — دا الملف الوحيد اللي محتاج تعدله عشان بيانات التواصل والدفع.
 */
window.STORE = {
  name: 'AURA',
  tagline: 'More than accessories',
  madeBy: 'نبيه',

  // رقم الواتساب بالصيغة الدولية من غير + (مثال: 201012345678)
  whatsapp: '201285537109',

  // بيانات الدفع اللي بتظهر للعميلة بعد الطلب
  instapay: 'aura@instapay',
  vodafoneCash: '01000000000',

  instagram: 'https://instagram.com/',

  currency: 'ج.م',
  shippingFee: 70,          // مصاريف الشحن الثابتة
  freeShippingOver: 1500,   // شحن مجاني فوق المبلغ دا (0 = مفيش)
};

/*
 * صور الموقع. اللي بتبدأ بـ images/ صور منتجاتك، والباقي من Unsplash (مسموح استخدامها مجاناً).
 * عشان تغير صورة، حط لينك تاني أو مسار صورة جوه فولدر images/ (مثال: 'images/hero.jpg').
 */
window.IMG = function (id, w) {
  if (id.indexOf('/') !== -1) return id; // مسار محلي أو لينك كامل
  return 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + (w || 900) + '&q=80';
};

window.SITE_IMAGES = {
  hero: 'images/products/pink-crystal-bow-bag.jpg', // شنطة كريستال بينك بفيونكة
  heroSmall: 'images/products/pearl-flower-keychains.jpg', // ميداليات وردة لولي
  gift: 'photo-1625552186152-668cd2f0b707',        // علب هدايا بشريطة بينك وورد مجفف
  aboutMain: 'photo-1599071338288-49173359e0fd',   // إيد شايلة علبة خشب
  aboutSide: 'images/products/pearl-bag-classic.jpg', // شنطة لولي كلاسيك
  custom: 'photo-1659032882718-3e54e7da86ab',      // ترابيزة شغل عليها خامات
};
