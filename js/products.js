/*
 * الأقسام والمنتجات.
 * الشنط والميداليات والمرايات صورها حقيقية (images/products). الأسعار تقريبية — عدّلها.
 * الأساور والسلاسل والحلقان لسه منتجات تجريبية بصور من Unsplash — بدّلها بمنتجاتك أو امسحها.
 * images: أول صورة هي الأساسية. ممكن تحط id صورة من Unsplash أو مسار محلي زي 'images/products/x.jpg'.
 */
window.CATEGORIES = [
  { id: 'bags', name: 'شنط خرز ولولي', en: 'Beaded bags', image: 'images/products/red-crystal-bag.jpg' },
  { id: 'charms', name: 'ميداليات وتعليقات', en: 'Charms & keychains', image: 'images/products/pearl-flower-charm.jpg' },
  { id: 'mirrors', name: 'مرايات لولي', en: 'Pearl mirrors', image: 'images/products/pearl-mirror-frame.jpg' },
  { id: 'bracelets', name: 'أساور', en: 'Bracelets', image: 'photo-1632670549453-7a3dfac254a2' },
  { id: 'necklaces', name: 'سلاسل وعقود', en: 'Necklaces', image: 'photo-1601121141122-e62a764f15c9' },
  { id: 'earrings', name: 'حلقان', en: 'Earrings', image: 'photo-1682822749969-61a63203c501' },
];

window.PRODUCTS = [
  {
    id: 'pink-crystal-bow-bag', category: 'bags', name: 'شنطة كريستال بينك بفيونكة', price: 750, bestseller: true,
    description: 'شنطة كروس من خرز الكريستال البينك، بفيونكة ستان ويد طويلة من نفس الخرز. معمولة حباية حباية بالإيد.',
    materials: 'خرز كريستال بينك، شريطة ستان، إكسسوارات معدن ذهبي', customizable: true,
    images: ['images/products/pink-crystal-bow-bag.jpg'],
  },
  {
    id: 'pearl-bag-classic', category: 'bags', name: 'شنطة لولي كلاسيك', price: 650, bestseller: true,
    description: 'شنطة يد من اللولي الأبيض بشكلها الكلاسيك، لايقة على الفساتين والخروجات والمناسبات.',
    materials: 'لولي صناعي، خيط نايلون قوي', customizable: true,
    images: ['images/products/pearl-bag-classic.jpg'],
  },
  {
    id: 'red-crystal-bag', category: 'bags', name: 'شنطة كريستال أحمر', price: 700, bestseller: true,
    description: 'شنطة يد من خرز الكريستال الأحمر اللامع، لونها جريء وبتلفت النظر.',
    materials: 'خرز كريستال أحمر وشفاف', customizable: true,
    images: ['images/products/red-crystal-bag.jpg'],
  },
  {
    id: 'pink-crystal-chain-bag', category: 'bags', name: 'شنطة كريستال بينك بسلسلة', price: 750,
    description: 'شنطة بينك من الكريستال بسلسلة فضي للكتف، شكلها ناعم ومناسبة للسهرات.',
    materials: 'خرز كريستال بينك، سلسلة معدن فضي', customizable: true,
    images: ['images/products/pink-crystal-chain-bag.jpg'],
  },
  {
    id: 'pink-crystal-mini-bag', category: 'bags', name: 'شنطة كريستال بينك ميني', price: 650,
    description: 'شنطة ميني من الكريستال البينك بيد قصيرة وسلسلة للكتف.',
    materials: 'خرز كريستال بينك، سلسلة معدن ذهبي', customizable: true,
    images: ['images/products/pink-crystal-mini-bag.jpg'],
  },
  {
    id: 'burgundy-crystal-clutch', category: 'bags', name: 'كلاتش كريستال نبيتي', price: 700,
    description: 'كلاتش مستطيل من الكريستال النبيتي بسلسلة ذهبي عريضة، فخم جداً للمناسبات.',
    materials: 'خرز كريستال نبيتي، سلسلة معدن ذهبي', customizable: true,
    images: ['images/products/burgundy-crystal-clutch.jpg'],
  },
  {
    id: 'pearl-bow-mini-bag', category: 'bags', name: 'شنطة لولي ميني بفيونكة', price: 550,
    description: 'شنطة صغيرة من اللولي بدرجتين وفيونكة ستان، هدية حلوة جداً.',
    materials: 'لولي صناعي، شريطة ستان', customizable: true,
    images: ['images/products/pearl-bow-mini-bag.jpg'],
  },
  {
    id: 'pearl-flower-charm', category: 'charms', name: 'تعليقة شنطة وردة لولي', price: 120, bestseller: true,
    description: 'وردة لولي بقلب ذهبي تتعلق في الشنطة أو المفاتيح، وبتغير شكل أي شنطة.',
    materials: 'لولي صناعي، خرز ذهبي، حلقة معدن', customizable: true,
    images: ['images/products/pearl-flower-charm.jpg'],
  },
  {
    id: 'pearl-flower-keychains', category: 'charms', name: 'ميداليات وردة لولي (توزيعات)', price: 60,
    description: 'ميداليات وردة لولي صغيرة، مثالية كتوزيعات للخطوبة والفرح والسبوع، ومعاها كارت باسماء أصحاب المناسبة. السعر للقطعة.',
    materials: 'لولي صناعي، خرز ذهبي، حلقة معدن ذهبي', customizable: true,
    images: ['images/products/pearl-flower-keychains.jpg'],
  },
  {
    id: 'pearl-mirror-frame', category: 'mirrors', name: 'برواز مراية لولي', price: 450,
    description: 'مراية ببرواز لولي كامل، تحطيها على التسريحة أو تتصوري قدامها.',
    materials: 'مراية، لولي صناعي', customizable: false,
    images: ['images/products/pearl-mirror-frame.jpg'],
  },
  {
    id: 'pearl-pocket-mirrors', category: 'mirrors', name: 'مراية جيب لولي', price: 150,
    description: 'مراية صغيرة مدورة بإطار لولي، بتتحط في الشنطة. متاحة بلولي أبيض أو فضي.',
    materials: 'مراية، لولي صناعي', customizable: true,
    images: ['images/products/pearl-pocket-mirrors.jpg'],
  },
  {
    id: 'soft-bead-bracelet', category: 'bracelets', name: 'إسوارة خرز ناعمة', price: 180,
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
    id: 'pearl-bracelet', category: 'bracelets', name: 'إسوارة لولي كلاسيك', price: 220,
    description: 'صف لولي ناعم بقفل معدن، شكلها فخم وبسيط في نفس الوقت. هدية مضمونة.',
    materials: 'لولي صناعي، قفل معدن', customizable: false,
    images: ['photo-1583167616102-d8d4b7d02c6c'],
  },
  {
    id: 'blush-pearl-set', category: 'necklaces', name: 'طقم لولي بلاش', price: 450,
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
    id: 'pearl-drop-earrings', category: 'earrings', name: 'حلق لولي دروب', price: 150,
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
];
