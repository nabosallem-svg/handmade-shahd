/*
 * الأقسام والمنتجات.
 * دي منتجات مبدئية بأسعار تقريبية — عدّل الأسماء والأسعار والصور على منتجاتك الحقيقية.
 * images: أول صورة هي الأساسية. ممكن تحط id صورة من Unsplash أو مسار محلي زي 'images/products/x.jpg'.
 */
window.CATEGORIES = [
  { id: 'bracelets', name: 'أساور', en: 'Bracelets', image: 'photo-1632670549453-7a3dfac254a2' },
  { id: 'necklaces', name: 'سلاسل وعقود', en: 'Necklaces', image: 'photo-1601121141122-e62a764f15c9' },
  { id: 'earrings', name: 'حلقان', en: 'Earrings', image: 'photo-1682822749969-61a63203c501' },
  { id: 'bags', name: 'شنط خرز ولولي', en: 'Beaded bags', image: 'photo-1759064716592-3963a0881ff8' },
  { id: 'keychains', name: 'ميداليات', en: 'Keychains', image: 'photo-1791002598765-7c6ef0873d43' },
  { id: 'rings', name: 'خواتم', en: 'Rings', image: 'photo-1624588057318-5f1b2eb81012' },
];

window.PRODUCTS = [
  {
    id: 'soft-bead-bracelet', category: 'bracelets', name: 'إسوارة خرز ناعمة', price: 180, bestseller: true,
    description: 'إسوارة خرز كريستال بألوان هادية، معمولة على خيط مطاط قوي ومريح في اللبس. ممكن نزود عليها حرف أو اسم.',
    materials: 'خرز كريستال وزجاج، خيط مطاط شفاف', customizable: true,
    images: ['photo-1638768892257-8aec93a524e5', 'photo-1632670549449-195cf8584a46'],
  },
  {
    id: 'ocean-bracelet', category: 'bracelets', name: 'إسوارة أوشن', price: 160,
    description: 'درجات الأزرق والفضي في إسوارة واحدة، لايقة على اللبس اليومي والصيفي.',
    materials: 'خرز زجاج، إكسسوارات معدن فضي', customizable: true,
    images: ['photo-1629890731335-52295b8be1d9', 'photo-1639706188490-876064810182'],
  },
  {
    id: 'pearl-bracelet', category: 'bracelets', name: 'إسوارة لولي كلاسيك', price: 220, bestseller: true,
    description: 'صف لولي ناعم بقفل معدن، شكلها فخم وبسيط في نفس الوقت. هدية مضمونة.',
    materials: 'لولي صناعي، قفل معدن', customizable: false,
    images: ['photo-1583167616102-d8d4b7d02c6c'],
  },
  {
    id: 'blush-pearl-set', category: 'necklaces', name: 'طقم لولي بلاش', price: 450, bestseller: true,
    description: 'عقد وحلق لولي بدرجة البينك الهادية. طقم كامل جاهز يتقدم هدية في علبته.',
    materials: 'لولي صناعي بينك، إكسسوارات معدن ذهبي', customizable: false,
    images: ['photo-1654699991494-892326ee8171', 'photo-1704957205218-d436eac4c607'],
  },
  {
    id: 'beaded-layers-necklace', category: 'necklaces', name: 'عقد خرز ليرز', price: 260,
    description: 'عقد خرز ملون بأكتر من طبقة، بيدي لمسة مبهجة لأي لبس.',
    materials: 'خرز زجاج وخشب، خيط نايلون قوي', customizable: true,
    images: ['photo-1523252012848-c22188792c27', 'photo-1574362098421-38623a3466b5'],
  },
  {
    id: 'gold-pearl-necklace', category: 'necklaces', name: 'سلسلة ذهبي ولولي', price: 290,
    description: 'خرز ذهبي ولولي متوزعين بتوازن، سلسلة رقيقة تنفع للخروجات والمناسبات.',
    materials: 'خرز معدن ذهبي، لولي صناعي', customizable: false,
    images: ['photo-1601121141122-e62a764f15c9', 'photo-1659288735090-9fb9e3b68fd8'],
  },
  {
    id: 'pearl-drop-earrings', category: 'earrings', name: 'حلق لولي دروب', price: 150, bestseller: true,
    description: 'حلق لولي نازل بشكل رقيق، خفيف على الودن ومناسب لكل يوم.',
    materials: 'لولي صناعي، شنكل معدن ذهبي', customizable: false,
    images: ['photo-1623303179820-de8ec58b03dc', 'photo-1682822749969-61a63203c501'],
  },
  {
    id: 'teardrop-earrings', category: 'earrings', name: 'حلق تيردروب جلد', price: 140,
    description: 'حلق على شكل نقطة بلونين، خفيف جداً وستايله عصري.',
    materials: 'جلد صناعي، شنكل معدن', customizable: true,
    images: ['photo-1573227890085-12ab5d68a170'],
  },
  {
    id: 'silver-hook-earrings', category: 'earrings', name: 'حلق فضي ميني', price: 120,
    description: 'حلقان فضي صغيرين بأشكال مختلفة، تختاري الشكل اللي يعجبك.',
    materials: 'معدن فضي', customizable: false,
    images: ['photo-1573227895118-8f8fa1172a09'],
  },
  {
    id: 'pearl-mini-bag', category: 'bags', name: 'شنطة لولي ميني', price: 650, bestseller: true,
    description: 'شنطة يد صغيرة معمولة لولي حباية حباية. بتاخد الموبايل والمفاتيح، ولايقة على الفساتين والسواريه.',
    materials: 'لولي صناعي، بطانة قماش، يد لولي', customizable: true,
    images: ['photo-1722510825571-8cdd1fe98ba4'],
  },
  {
    id: 'crystal-evening-bag', category: 'bags', name: 'شنطة سواريه كريستال', price: 780,
    description: 'شنطة سهرة مطرزة بكريستال وورد، معمولة بإيد بالكامل.',
    materials: 'خرز كريستال، قماش ستان، سلسلة معدن', customizable: true,
    images: ['photo-1787284461013-e58abaed4f78'],
  },
  {
    id: 'macrame-keychain', category: 'keychains', name: 'ميدالية مكرمية', price: 90,
    description: 'ميدالية مكرمية بتتلبس في الإيد، ألوان كتير ونقدر نعملها بلونك المفضل.',
    materials: 'خيط مكرمية قطن، حلقة معدن', customizable: true,
    images: ['photo-1791002598765-7c6ef0873d43'],
  },
  {
    id: 'silver-stone-ring', category: 'rings', name: 'خاتم فضي بحجر', price: 170,
    description: 'خاتم فضي ناعم بحجر صغير، مقاسه بيتظبط على صباعك.',
    materials: 'معدن فضي، حجر صناعي', customizable: true,
    images: ['photo-1624588057318-5f1b2eb81012'],
  },
];
