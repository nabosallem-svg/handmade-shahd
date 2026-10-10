/*
 * الأقسام والمنتجات.
 * كل الصور في images/products. الأسعار تقريبية — عدّلها.
 * images: أول صورة هي الأساسية، مسار جوه فولدر images/products/.
 */
window.CATEGORIES = [
  { id: 'bags', name: 'شنط خرز ولولي', en: 'Beaded bags', image: 'images/products/red-crystal-bag.jpg' },
  { id: 'charms', name: 'ميداليات وتعليقات', en: 'Charms & keychains', image: 'images/products/pearl-flower-charm.jpg' },
  { id: 'mirrors', name: 'مرايات لولي', en: 'Pearl mirrors', image: 'images/products/pearl-mirror-frame.jpg' },
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
];
