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
 * صور الموقع. عشان تغير صورة، حط الصورة جوه فولدر images/ واكتب مسارها هنا.
 */
window.IMG = function (path) {
  return path;
};

window.SITE_IMAGES = {
  hero: 'images/products/pink-crystal-bow-bag.jpg', // شنطة كريستال بينك بفيونكة
  heroSmall: 'images/products/pearl-flower-charm.jpg', // تعليقة وردة لولي
  gift: 'images/products/pearl-flower-keychains.jpg', // ميداليات توزيعات بكروت
  aboutMain: 'images/products/pearl-bow-mini-bag.jpg', // شنطة لولي ميني بفيونكة
  aboutSide: 'images/products/pearl-bag-classic.jpg', // شنطة لولي كلاسيك
  custom: 'images/products/pearl-pocket-mirrors.jpg', // مرايات جيب لولي وخامات الشغل
};
