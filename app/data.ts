export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  image: string;
  images?: string[];
  colors?: string[];
  description: string;
  specifications: Record<string, string>;
  subcategory?: string;
  sizes?: string[];
}

export const categories = [
  'Electronics',
  'Clothing',
  'Beauty',
  'Home & Kitchen',
  'Sports',
  'Books',
  'Toys',
  'Jewelry',
  'Automotive',
  'Garden & Outdoor'
] as const;

export const brands = [
  'Apple',
  'Samsung',
  'Nike',
  'Adidas',
  'Sony',
  'LG',
  'HP',
  'Dell',
  'Dyson',
  'Bose',
  'Canon',
  'KitchenAid',
  'Peloton',
  'LEGO',
  'Tiffany',
  'Tag Heuer',
  'La Mer'
] as const;

export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro Max',
    brand: 'Apple',
    category: 'Electronics',
    price: 1299,
    oldPrice: 1399,
    rating: 4.8,
    reviews: 2547,
    inStock: true,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-gold-select?wid=940&hei=1112&fmt=png-alpha&.v=1671641958063',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-gold-select?wid=940&hei=1112&fmt=png-alpha&.v=1671641958063',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-silver-select?wid=940&hei=1112&fmt=png-alpha&.v=1671641958092',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-purple-select?wid=940&hei=1112&fmt=png-alpha&.v=1671641958159'
    ],
    colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
    description: 'iPhone 14 Pro Max. Capture incredible detail with a 48MP Main camera. Experience iPhone in a whole new way with Dynamic Island. And get peace of mind with groundbreaking safety features.',
    specifications: {
      screen: '6.7-inch Super Retina XDR display',
      processor: 'A16 Bionic chip',
      camera: '48MP main, 12MP ultra wide',
      battery: 'Up to 29 hours video playback',
      storage: '128GB, 256GB, 512GB, 1TB'
    }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23 Ultra',
    brand: 'Samsung',
    category: 'Electronics',
    price: 1199,
    oldPrice: 1299,
    rating: 4.7,
    reviews: 1876,
    inStock: true,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/uk/2302/gallery/uk-galaxy-s23-ultra-s918-sm-s918bzggeub-534859553?$1300_1038_PNG$',
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/uk/2302/gallery/uk-galaxy-s23-ultra-s918-sm-s918bzggeub-534859553?$1300_1038_PNG$',
      'https://images.samsung.com/is/image/samsung/p6pim/uk/2302/gallery/uk-galaxy-s23-ultra-s918-sm-s918bzggeub-534859554?$1300_1038_PNG$',
      'https://images.samsung.com/is/image/samsung/p6pim/uk/2302/gallery/uk-galaxy-s23-ultra-s918-sm-s918bzggeub-534859555?$1300_1038_PNG$'
    ],
    colors: ['Phantom Black', 'Cream', 'Green', 'Lavender'],
    description: 'Meet Galaxy S23 Ultra, the ultimate Samsung smartphone. Capture stunning photos in any light with our most advanced camera yet.',
    specifications: {
      screen: '6.8-inch Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 2',
      camera: '200MP main, 12MP ultra wide',
      battery: '5000mAh',
      storage: '256GB, 512GB, 1TB'
    }
  },
  {
    id: '3',
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    category: 'Electronics',
    price: 2499,
    oldPrice: 2699,
    rating: 4.9,
    reviews: 1254,
    inStock: true,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673229',
    images: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673229',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-silver-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673229'
    ],
    colors: ['Space Gray', 'Silver'],
    description: 'The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro or M2 Max chip — the most powerful chip ever in a laptop.',
    specifications: {
      screen: '16-inch Liquid Retina XDR display',
      processor: 'Apple M2 Pro or M2 Max',
      memory: 'Up to 96GB unified memory',
      storage: 'Up to 8TB SSD',
      battery: 'Up to 22 hours'
    }
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Electronics',
    price: 399,
    oldPrice: 449,
    rating: 4.7,
    reviews: 892,
    inStock: true,
    image: 'https://www.sony.com/image/2e3fb52c325cd09e86d0a4db973be368?fmt=png-alpha&wid=900',
    images: [
      'https://www.sony.com/image/2e3fb52c325cd09e86d0a4db973be368?fmt=png-alpha&wid=900',
      'https://www.sony.com/image/7f1c8e4ad94355b844078018595cd394?fmt=png-alpha&wid=900',
      'https://www.sony.com/image/4df0ad14369f5486b7f2f1864f265237?fmt=png-alpha&wid=900'
    ],
    colors: ['Black', 'Silver'],
    description: 'Industry-leading noise cancellation with eight microphones and Auto NC Optimizer. Crystal clear hands-free calling with 4 beamforming microphones.',
    specifications: {
      driver: '30mm drivers',
      battery: 'Up to 30 hours',
      charging: 'USB-C fast charging',
      features: 'Multipoint connection, LDAC'
    }
  },
  {
    id: '5',
    name: 'Nike Air Jordan 1',
    brand: 'Nike',
    category: 'Clothing',
    subcategory: 'Shoes',
    price: 180,
    oldPrice: 200,
    rating: 4.8,
    reviews: 2156,
    inStock: true,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f094af40-f82f-4fb9-a246-e031bf6fc411/air-jordan-1-high-og-shoes-MxQ8Zr.png',
    images: [
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f094af40-f82f-4fb9-a246-e031bf6fc411/air-jordan-1-high-og-shoes-MxQ8Zr.png',
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/72f3b8f6-a55e-46d3-8505-733e15e7c4a4/air-jordan-1-high-og-shoes-MxQ8Zr.png'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Chicago', 'Royal Blue', 'Shadow'],
    description: 'The Air Jordan 1 High is a true icon of sneaker culture. This original colorway features premium leather and the classic Nike Air cushioning.',
    specifications: {
      material: 'Full-grain leather upper',
      cushioning: 'Nike Air technology',
      closure: 'Lace-up',
      sole: 'Rubber outsole'
    }
  },
  {
    id: '6',
    name: 'Dyson V15 Detect',
    brand: 'Dyson',
    category: 'Home & Kitchen',
    price: 749,
    oldPrice: 799,
    rating: 4.6,
    reviews: 756,
    inStock: true,
    image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/419612-01.png?$responsive$&cropPathE=desktop&fit=stretch,1&wid=1920',
    images: [
      'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/419612-01.png?$responsive$&cropPathE=desktop&fit=stretch,1&wid=1920',
      'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/secondary/419612-02.png?$responsive$&cropPathE=desktop&fit=stretch,1&wid=1920'
    ],
    description: 'Laser reveals microscopic dust, LCD screen shows scientific proof of a deep clean. Powerful Dyson Hyperdymium™ motor.',
    specifications: {
      runtime: 'Up to 60 minutes',
      weight: '6.8 lbs',
      binVolume: '0.2 gallons',
      filtration: 'Advanced HEPA'
    }
  },
  {
    id: '9',
    name: 'LG 34" UltraWide Monitor',
    brand: 'LG',
    category: 'Electronics',
    price: 699,
    oldPrice: 799,
    rating: 4.6,
    reviews: 523,
    inStock: true,
    image: 'https://www.lg.com/us/images/monitors/md08003850/gallery/desktop-01.jpg',
    description: 'Ultra-wide curved monitor perfect for productivity and gaming with HDR10.',
    specifications: {
      display: '34-inch UltraWide QHD',
      refreshRate: '160Hz',
      response: '1ms',
      features: 'HDR10, FreeSync Premium'
    }
  },
  {
    id: '10',
    name: 'Adidas Ultraboost 22',
    brand: 'Adidas',
    category: 'Clothing',
    subcategory: 'Shoes',
    price: 189,
    oldPrice: 199,
    rating: 4.7,
    reviews: 1245,
    inStock: true,
    image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg',
    sizes: ['7', '8', '9', '10', '11', '12'],
    description: 'Enhanced comfort and energy return with Boost technology.',
    specifications: {
      material: 'Primeknit upper',
      cushioning: 'Boost midsole',
      outsole: 'Continental™ Rubber',
      weight: '12.5 oz'
    }
  },
  {
    id: '11',
    name: 'Kindle Paperwhite',
    brand: 'Amazon',
    category: 'Electronics',
    price: 139,
    rating: 4.8,
    reviews: 2890,
    inStock: true,
    image: 'https://m.media-amazon.com/images/I/61P9Ts0jnhL._AC_SL1500_.jpg',
    description: 'The thinnest, lightest Kindle Paperwhite yet with a 6.8" display.',
    specifications: {
      display: '6.8" glare-free',
      storage: '8GB or 32GB',
      waterproof: 'IPX8 rated',
      battery: 'Up to 10 weeks'
    }
  },
  {
    id: '12',
    name: 'KitchenAid Stand Mixer',
    brand: 'KitchenAid',
    category: 'Home & Kitchen',
    price: 399,
    oldPrice: 449,
    rating: 4.9,
    reviews: 3567,
    inStock: true,
    image: 'https://kitchenaid-h.assetsadobe.com/is/image/content/dam/business-unit/kitchenaid/en-us/digital-assets/pages/countertop-appliances/stand-mixers/professional-5-plus-5-quart-bowl-lift-stand-mixer-KV25G0X/Desktop_KA_KV25G0XER_001.png',
    colors: ['Empire Red', 'Onyx Black', 'Silver'],
    description: 'Professional 5 Plus Series with 5-quart stainless steel bowl.',
    specifications: {
      power: '450 watts',
      capacity: '5-quart',
      speeds: '10 speeds',
      attachments: '11 optional attachments'
    }
  },
  {
    id: '13',
    name: 'Canon EOS R6',
    brand: 'Canon',
    category: 'Electronics',
    price: 2499,
    oldPrice: 2699,
    rating: 4.8,
    reviews: 856,
    inStock: true,
    image: 'https://www.canon.com.au/-/media/images/products/cameras/eos-r/eos-r6/hero/eos-r6-hero.ashx',
    description: 'Professional full-frame mirrorless camera with advanced autofocus.',
    specifications: {
      sensor: '20.1MP Full-frame CMOS',
      stabilization: '8-stop IS',
      video: '4K 60p, Full HD 120p',
      autofocus: 'Dual Pixel CMOS AF II'
    }
  },
  {
    id: '14',
    name: 'Bose QuietComfort Earbuds II',
    brand: 'Bose',
    category: 'Electronics',
    price: 299,
    rating: 4.7,
    reviews: 1232,
    inStock: true,
    image: 'https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc_earbuds_ii/product_silo_images/QCEBII_PDP_BLACK-1.jpg',
    colors: ['Triple Black', 'Soapstone'],
    description: 'World-class noise cancellation and high-fidelity audio.',
    specifications: {
      batteryLife: 'Up to 6 hours',
      chargingCase: 'Additional 18 hours',
      connectivity: 'Bluetooth 5.3',
      waterResistant: 'IPX4'
    }
  },
  {
    id: '15',
    name: 'Herman Miller Aeron Chair',
    brand: 'Herman Miller',
    category: 'Home & Kitchen',
    price: 1395,
    oldPrice: 1495,
    rating: 4.9,
    reviews: 2456,
    inStock: true,
    image: 'https://store.hermanmiller.com/dw/image/v2/BBBG_PRD/on/demandware.static/-/Sites-master-catalog/default/dwc4902807/hi-res/aeron-chair-graphite_2195428.png',
    colors: ['Graphite', 'Carbon', 'Mineral'],
    description: 'The most ergonomic and innovative office chair, remastered.',
    specifications: {
      size: 'Size B (Medium)',
      warranty: '12 years',
      features: 'PostureFit SL, 8Z Pellicle',
      material: 'Recycled content'
    }
  },
  {
    id: '16',
    name: 'Samsung Galaxy Watch 5 Pro',
    brand: 'Samsung',
    category: 'Electronics',
    price: 449,
    oldPrice: 499,
    rating: 4.6,
    reviews: 987,
    inStock: true,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/2208/gallery/levant-galaxy-watch5-pro-sm-r920nzkamea-533155749',
    description: 'Advanced health monitoring and outdoor activities tracking.',
    specifications: {
      display: '1.4" Super AMOLED',
      battery: '590mAh',
      durability: 'IP68 + 5ATM',
      sensors: 'BioActive Sensor'
    }
  },
  {
    id: '17',
    name: 'Nike Dri-FIT Running Shirt',
    brand: 'Nike',
    category: 'Clothing',
    price: 35,
    rating: 4.5,
    reviews: 892,
    inStock: true,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/dri-fit-mens-running-top-N0BTR5.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Grey', 'Blue'],
    description: 'Lightweight and breathable running shirt with sweat-wicking technology.',
    specifications: {
      material: '100% recycled polyester',
      fit: 'Standard fit',
      technology: 'Dri-FIT',
      features: 'Reflective elements'
    }
  },
  {
    id: '18',
    name: 'Philips Hue Starter Kit',
    brand: 'Philips',
    category: 'Home & Kitchen',
    price: 199,
    oldPrice: 229,
    rating: 4.7,
    reviews: 1543,
    inStock: true,
    image: 'https://www.philips-hue.com/sites/default/files/styles/16_9_large/public/2020-09/White-and-color-ambiance-starter-kit-E27.jpg',
    description: 'Smart lighting system with bridge and color-changing bulbs.',
    specifications: {
      bulbs: '3x E27 LED bulbs',
      bridge: 'Hue Bridge included',
      compatibility: 'Alexa, Google Assistant',
      colors: '16 million colors'
    }
  },
  {
    id: '19',
    name: 'Le Creuset Dutch Oven',
    brand: 'Le Creuset',
    category: 'Home & Kitchen',
    price: 399,
    rating: 4.9,
    reviews: 2156,
    inStock: true,
    image: 'https://www.lecreuset.com/dw/image/v2/BBXB_PRD/on/demandware.static/-/Sites-le-creuset-master/default/dwd94cc4f7/images/black-friday/LS2501-267F.jpg',
    colors: ['Flame', 'Marine', 'Cerise'],
    description: '5.5 qt. round Dutch oven, perfect for slow-cooking, roasting, and baking.',
    specifications: {
      material: 'Enameled cast iron',
      capacity: '5.5 quarts',
      dishwasher: 'Safe',
      warranty: 'Lifetime'
    }
  },
  {
    id: '20',
    name: 'La Mer Moisturizing Cream',
    brand: 'La Mer',
    category: 'Beauty',
    price: 190,
    rating: 4.8,
    reviews: 3245,
    inStock: true,
    image: 'https://www.cremedelamer.com/-/media/project/corporate/corporate-rebranding/crem-de-la-mer/products/moisturizers/moisturizing-cream/moisturizing-cream-2oz/moisturizing-cream-2oz-mobile.jpg',
    description: 'Luxury moisturizing cream with Miracle Broth™ for deep hydration and healing.',
    specifications: {
      size: '2 oz / 60 ml',
      type: 'Rich cream',
      ingredients: 'Miracle Broth™, lime tea',
      benefits: 'Hydration, healing, renewal'
    }
  },
  {
    id: '21',
    name: 'Peloton Bike+',
    brand: 'Peloton',
    category: 'Sports',
    price: 2495,
    oldPrice: 2795,
    rating: 4.9,
    reviews: 1876,
    inStock: true,
    image: 'https://images.ctfassets.net/6g4gfm8wk7b6/79yVl9DlrvL4x3oVnuPDtE/7907f3c436def1c055529af731eeb5c1/Peloton-Bike-Plus.png',
    description: 'Premium indoor exercise bike with 23.8" HD touchscreen and Auto Follow resistance.',
    specifications: {
      screen: '23.8" HD touchscreen',
      resistance: 'Digital auto-follow',
      sound: '4-channel audio',
      dimensions: '4\' x 2\' footprint'
    }
  },
  {
    id: '22',
    name: 'LEGO Star Wars Millennium Falcon',
    brand: 'LEGO',
    category: 'Toys',
    price: 799,
    rating: 4.9,
    reviews: 2341,
    inStock: true,
    image: 'https://www.lego.com/cdn/cs/set/assets/blt3e446b6889283199/75192_alt1.jpg',
    description: 'Ultimate Collector Series Millennium Falcon with 7,541 pieces.',
    specifications: {
      pieces: '7,541 pieces',
      minifigures: '4 classic, 3 sequel trilogy',
      age: '16+',
      dimensions: '33" x 22" x 8"'
    }
  },
  {
    id: '23',
    name: 'Tiffany T1 Wide Diamond Ring',
    brand: 'Tiffany',
    category: 'Jewelry',
    price: 6800,
    rating: 4.9,
    reviews: 156,
    inStock: true,
    image: 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-t1-wide-ring-67467928_1000956_ED.jpg',
    description: '18k rose gold ring with pavé diamonds, 4.5mm wide.',
    specifications: {
      material: '18k rose gold',
      diamonds: 'Pavé-set round brilliant',
      width: '4.5mm',
      style: 'Band ring'
    }
  },
  {
    id: '24',
    name: 'Dyson Airwrap Complete',
    brand: 'Dyson',
    category: 'Beauty',
    price: 599,
    oldPrice: 649,
    rating: 4.7,
    reviews: 4532,
    inStock: true,
    image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/399611-01.png',
    description: 'Complete hair styling system with Coanda airflow technology.',
    specifications: {
      attachments: '6 styling attachments',
      technology: 'Coanda effect',
      power: '1300W',
      heat: 'Intelligent heat control'
    }
  },
  {
    id: '25',
    name: 'Tag Heuer Connected Calibre E4',
    brand: 'Tag Heuer',
    category: 'Jewelry',
    price: 2050,
    rating: 4.6,
    reviews: 234,
    inStock: true,
    image: 'https://www.tagheuer.com/on/demandware.static/-/Sites-tagheuer-master/default/dw4d7ef1d6/TAG_Heuer_Connected_Watch/SBR8010.BT6255_2000.png',
    description: 'Luxury smartwatch with premium materials and advanced fitness tracking.',
    specifications: {
      case: '45mm stainless steel',
      display: 'OLED touchscreen',
      battery: 'All-day battery life',
      water: '50m water resistant'
    }
  },
  {
    id: '26',
    name: 'Vitamix Professional Series 750',
    brand: 'Vitamix',
    category: 'Home & Kitchen',
    price: 599,
    oldPrice: 649,
    rating: 4.8,
    reviews: 3421,
    inStock: true,
    image: 'https://resources.vitamix.com/images/default-source/product-image/professional-series-750-blender-black.png',
    description: 'Professional-grade blender with 5 pre-programmed settings and variable speed control.',
    specifications: {
      power: '2.2 HP motor',
      capacity: '64 oz container',
      programs: '5 pre-programmed settings',
      warranty: '7-year full warranty'
    }
  },
  {
    id: '27',
    name: 'Weber Genesis II E-335',
    brand: 'Weber',
    category: 'Garden & Outdoor',
    price: 1099,
    rating: 4.7,
    reviews: 892,
    inStock: true,
    image: 'https://www.weber.com/on/demandware.static/-/Sites-weber-master-catalog/default/dw984ee0d8/images/grill-images/genesis-2/Gen-II-E-335-Black.png',
    description: 'Premium gas grill with three high-performance burners and Sear Station.',
    specifications: {
      burners: '3 high-performance burners',
      area: '669 sq in cooking area',
      features: 'Sear Station, Side burner',
      ignition: 'Infinity Ignition'
    }
  },
  {
    id: '28',
    name: 'Trek Émonda SLR 9',
    brand: 'Trek',
    category: 'Sports',
    price: 12499,
    rating: 4.9,
    reviews: 156,
    inStock: true,
    image: 'https://trek.scene7.com/is/image/TrekBicycleProducts/EmondaSLR9_22_35307_A_Portrait?wid=1200',
    colors: ['Project One', 'Prismatic Pearl', 'Raw Carbon'],
    description: 'Ultra-lightweight carbon road bike with SRAM Red eTap AXS.',
    specifications: {
      frame: 'OCLV 800 Series Carbon',
      groupset: 'SRAM Red eTap AXS',
      wheels: 'Bontrager Aeolus RSL 37',
      weight: '6.5 kg'
    }
  },
  {
    id: '29',
    name: 'DJI Air 3',
    brand: 'DJI',
    category: 'Electronics',
    price: 1099,
    oldPrice: 1199,
    rating: 4.8,
    reviews: 567,
    inStock: true,
    image: 'https://dji-official-fe.djicdn.com/cms/uploads/2f91b6c6b1010e906594355a768e6040.png',
    description: 'Lightweight drone with 4K camera and advanced obstacle avoidance.',
    specifications: {
      camera: '4K/60fps HDR Video',
      flightTime: '34 minutes',
      range: '12 km transmission',
      sensors: 'Omnidirectional obstacle sensing'
    }
  },
  {
    id: '30',
    name: 'Breville Oracle Touch',
    brand: 'Breville',
    category: 'Home & Kitchen',
    price: 2499,
    rating: 4.7,
    reviews: 789,
    inStock: true,
    image: 'https://www.breville.com/content/dam/breville/us/assets/espresso/finished-goods/bes990/hero/bes990bss1bus1-hero.png',
    description: 'Automatic espresso machine with touch screen and integrated grinder.',
    specifications: {
      boiler: 'Dual stainless steel boilers',
      grinder: 'Integrated conical burr',
      display: '4" color touchscreen',
      pressure: '15 bar Italian pump'
    }
  },
  {
    id: '31',
    name: 'Tempurpedic ProBreeze',
    brand: 'Tempurpedic',
    category: 'Home & Kitchen',
    price: 4499,
    oldPrice: 4799,
    rating: 4.8,
    reviews: 1234,
    inStock: true,
    image: 'https://www.tempurpedic.com/dw/image/v2/BFMK_PRD/on/demandware.static/-/Sites-tempur-master-catalog/default/dwc5332af8/images/product-images/ProBreeze-ANGLE.png',
    sizes: ['Twin XL', 'Queen', 'King', 'Cal King'],
    description: 'Premium cooling mattress with advanced pressure relief.',
    specifications: {
      height: '12 inches',
      cooling: '3° cooler',
      material: 'TEMPUR-CM+ material',
      cover: 'SmartClimate Dual Cover System'
    }
  },
  {
    id: '32',
    name: 'Rolex Submariner',
    brand: 'Rolex',
    category: 'Jewelry',
    price: 9950,
    rating: 4.9,
    reviews: 456,
    inStock: true,
    image: 'https://content.rolex.com/dam/2021/upright-bba-with-shadow/m124060-0001.png',
    description: 'Iconic diving watch in Oystersteel with rotating bezel.',
    specifications: {
      case: '41mm Oystersteel',
      movement: 'Calibre 3230',
      waterResistance: '300 metres',
      certification: 'Superlative Chronometer'
    }
  },
  {
    id: '33',
    name: 'Ergotron HX Monitor Arm',
    brand: 'Ergotron',
    category: 'Electronics',
    price: 299,
    rating: 4.7,
    reviews: 892,
    inStock: true,
    image: 'https://www.ergotron.com/Portals/0/ProductImages/45-475-216_wh_hero2.jpg',
    colors: ['White', 'Black'],
    description: 'Premium monitor arm for displays up to 42 lbs.',
    specifications: {
      capacity: 'Up to 42 lbs',
      rotation: '360° rotation',
      extension: '23.6" extension',
      vesa: 'VESA 75/100 compatible'
    }
  },
  {
    id: '34',
    name: 'Roomba j7+',
    brand: 'iRobot',
    category: 'Home & Kitchen',
    price: 799,
    oldPrice: 849,
    rating: 4.6,
    reviews: 2341,
    inStock: true,
    image: 'https://www.irobot.com/content/dam/irobot/home-page/product-panel/j7-robot.png',
    description: 'Smart robot vacuum with obstacle avoidance and self-emptying base.',
    specifications: {
      runtime: 'Up to 75 minutes',
      navigation: 'PrecisionVision',
      dustBin: 'Self-emptying',
      app: 'iRobot Home app'
    }
  },
  {
    id: '35',
    name: 'Nintendo Switch OLED',
    brand: 'Nintendo',
    category: 'Electronics',
    price: 349,
    rating: 4.8,
    reviews: 3456,
    inStock: true,
    image: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.25/c_scale,w_800/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set/image-gallery/photo01',
    colors: ['White', 'Neon'],
    description: 'Enhanced gaming console with 7-inch OLED screen.',
    specifications: {
      screen: '7-inch OLED',
      storage: '64GB',
      battery: '4.5-9 hours',
      modes: 'TV, Tabletop, Handheld'
    }
  },
  {
    id: '36',
    name: 'Yeti Tundra 65',
    brand: 'Yeti',
    category: 'Sports',
    price: 375,
    rating: 4.8,
    reviews: 2789,
    inStock: true,
    image: 'https://cdn.shopify.com/s/files/1/0346/1367/5733/products/tundra-65-hard-cooler-white-1-back_1024x1024.png',
    colors: ['White', 'Tan', 'Navy'],
    description: 'Premium hard cooler with exceptional ice retention.',
    specifications: {
      capacity: '42 cans with ice',
      insulation: 'Permafrost™ insulation',
      construction: 'Rotomolded',
      dimensions: '30⅝" × 17½" × 16"'
    }
  },
  {
    id: '37',
    name: 'Sonos Arc',
    brand: 'Sonos',
    category: 'Electronics',
    price: 899,
    rating: 4.7,
    reviews: 1567,
    inStock: true,
    image: 'https://www.sonos.com/content/dam/sonos/images/products/arc/arc-black-front.png',
    colors: ['Black', 'White'],
    description: 'Premium Dolby Atmos soundbar with 11 high-performance drivers.',
    specifications: {
      audio: 'Dolby Atmos',
      speakers: '11 drivers',
      voice: 'Built-in voice control',
      connectivity: 'HDMI eARC'
    }
  },
  {
    id: '38',
    name: 'Theragun Pro',
    brand: 'Therabody',
    category: 'Sports',
    price: 599,
    oldPrice: 649,
    rating: 4.8,
    reviews: 1234,
    inStock: true,
    image: 'https://www.therabody.com/dw/image/v2/BDXQ_PRD/on/demandware.static/-/Sites-thg-master/default/dw7c8d1f89/images/PDP/PRO-1200x1200.png',
    description: 'Professional-grade percussive therapy device.',
    specifications: {
      speed: '1750-2400 PPM',
      battery: '300-minute total battery life',
      force: 'Up to 60 lbs',
      attachments: '6 attachments included'
    }
  },
  {
    id: '39',
    name: 'Ring Video Doorbell Pro 2',
    brand: 'Ring',
    category: 'Electronics',
    price: 249,
    oldPrice: 279,
    rating: 4.6,
    reviews: 2345,
    inStock: true,
    image: 'https://ring-assets.s3.amazonaws.com/products/video-doorbell-pro-2/default/vidDoorPro2_desktop.png',
    description: 'Advanced video doorbell with 3D motion detection.',
    specifications: {
      resolution: '1536p HD Video',
      view: 'Head-to-toe view',
      audio: 'Two-way talk',
      power: 'Hardwired installation'
    }
  },
  {
    id: '40',
    name: 'Meross Smart Garage Door Opener',
    brand: 'Meross',
    category: 'Home & Kitchen',
    price: 49,
    rating: 4.5,
    reviews: 12567,
    inStock: true,
    image: 'https://cdn.shopify.com/s/files/1/0066/8149/3229/products/MSG100_4.jpg',
    description: 'Smart garage controller compatible with multiple platforms.',
    specifications: {
      compatibility: 'HomeKit, Alexa, Google',
      connection: '2.4GHz Wi-Fi',
      sensors: 'Door position sensor',
      control: 'Remote access'
    }
  },
  {
    id: '41',
    name: 'Ooni Koda 16',
    brand: 'Ooni',
    category: 'Home & Kitchen',
    price: 599,
    rating: 4.8,
    reviews: 987,
    inStock: true,
    image: 'https://ooni.com/cdn/shop/products/Ooni-Koda-16-Front-View-2.jpg',
    description: 'Gas-powered pizza oven that reaches 950°F in 20 minutes.',
    specifications: {
      fuelType: 'Gas',
      pizzaSize: 'Up to 16"',
      temperature: 'Up to 950°F',
      cookTime: '60 seconds per pizza'
    }
  },
  {
    id: '42',
    name: 'Traeger Timberline XL',
    brand: 'Traeger',
    category: 'Garden & Outdoor',
    price: 3499,
    oldPrice: 3799,
    rating: 4.7,
    reviews: 456,
    inStock: true,
    image: 'https://www.traeger.com/dw/image/v2/BGRM_PRD/on/demandware.static/-/Sites-traeger-master-catalog/default/dw4c1f033c/images/TBL9921/TBL9921-1200x1200-01.jpg',
    description: 'Smart wood pellet grill with WiFIRE® technology.',
    specifications: {
      cookingSpace: '1320 sq in',
      hopper: '22 lb capacity',
      control: 'WiFIRE® enabled',
      features: 'Smart Combustion™'
    }
  },
  {
    id: '43',
    name: 'GoPro HERO11 Black',
    brand: 'GoPro',
    category: 'Electronics',
    price: 499,
    oldPrice: 549,
    rating: 4.7,
    reviews: 1432,
    inStock: true,
    image: 'https://gopro.com/content/dam/help/hero11-black/product-images/hero11-black-photo-1.png',
    description: 'Advanced action camera with 5.3K video and HyperSmooth 5.0.',
    specifications: {
      video: '5.3K60 / 4K120',
      photo: '27MP stills',
      stabilization: 'HyperSmooth 5.0',
      waterproof: '33ft (10m)'
    }
  },
  {
    id: '44',
    name: 'Bose Smart Soundbar 900',
    brand: 'Bose',
    category: 'Electronics',
    price: 899,
    rating: 4.6,
    reviews: 789,
    inStock: true,
    image: 'https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/speakers/bose_smart_soundbar_900/product_silo_images/soundbar_900_EC_hero.png',
    description: 'Premium soundbar with Dolby Atmos and voice control.',
    specifications: {
      channels: '9 channels',
      audio: 'Dolby Atmos',
      voice: 'Alexa & Google Assistant',
      connectivity: 'Wi-Fi, Bluetooth'
    }
  },
  {
    id: '45',
    name: 'Saint Laurent Card Holder',
    brand: 'Saint Laurent',
    category: 'Accessories',
    price: 275,
    rating: 4.5,
    reviews: 234,
    inStock: true,
    image: 'https://www.ysl.com/product-images/monogram-card-case-in-grain-de-poudre-embossed-leather_cod45410793tf.jpg',
    colors: ['Black', 'Red', 'Navy'],
    description: 'Luxury card holder in grain de poudre embossed leather.',
    specifications: {
      material: 'Embossed leather',
      slots: '5 card slots',
      dimensions: '3" x 4.3"',
      hardware: 'Gold-toned'
    }
  },
  {
    id: '46',
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
    category: 'Electronics',
    price: 99,
    rating: 4.8,
    reviews: 3456,
    inStock: true,
    image: 'https://resource.logitechg.com/content/dam/gaming/en/products/mx-master-3s/gallery/mx-master-3s-gallery-1-graphite.png',
    colors: ['Graphite', 'Pale Gray'],
    description: 'Advanced wireless mouse with electromagnetic scroll wheel.',
    specifications: {
      sensor: '8000 DPI track-anywhere',
      buttons: '7 customizable buttons',
      battery: 'Up to 70 days',
      connection: 'Bluetooth or USB'
    }
  },
  {
    id: '47',
    name: 'Google Nest Learning Thermostat',
    brand: 'Google',
    category: 'Home & Kitchen',
    price: 249,
    oldPrice: 279,
    rating: 4.6,
    reviews: 15678,
    inStock: true,
    image: 'https://lh3.googleusercontent.com/kdFOnM8Yey6GV7WX6A7wX5fKxy_Qba7EQnZlRzpXYI-BnXhgf6_k_Vp4IPM1P-MYkwHHGGt1v-wu-N6Q2B7R7Ie6BpM=w1000-rw',
    colors: ['Stainless Steel', 'Copper', 'Black'],
    description: 'Smart thermostat that learns your schedule and preferences.',
    specifications: {
      display: '2.08" diameter display',
      sensors: 'Temperature, Humidity, Activity',
      compatibility: 'Works with 95% of systems',
      features: 'Auto-Schedule, Home/Away'
    }
  },
  {
    id: '48',
    name: 'Philips Sonicare DiamondClean 9700',
    brand: 'Philips',
    category: 'Beauty',
    price: 299,
    oldPrice: 329,
    rating: 4.7,
    reviews: 2345,
    inStock: true,
    image: 'https://www.usa.philips.com/c-dam/corporate/philips-sonicare-diamondclean-9700/hx9922_01-front.jpg',
    colors: ['Rose Gold', 'Black', 'White'],
    description: 'Premium smart electric toothbrush with 5 modes.',
    specifications: {
      modes: '5 brushing modes',
      battery: '14-day battery life',
      pressure: 'Pressure sensor',
      app: 'Connected brushing app'
    }
  },
  {
    id: '49',
    name: 'Makita 18V LXT Drill Kit',
    brand: 'Makita',
    category: 'Tools',
    price: 299,
    rating: 4.8,
    reviews: 3456,
    inStock: true,
    image: 'https://cdn.makitatools.com/apps/cms/img/xfd/9f9c6488-ef4e-4bc0-a8dd-7c8f0b6f533f_xfd07z_p_1500px.png',
    description: 'Professional cordless drill kit with brushless motor.',
    specifications: {
      power: '18V LXT',
      torque: '1,090 in.lbs',
      speed: '2-speed (0-550 & 0-2,100 RPM)',
      includes: '2 batteries, charger, case'
    }
  },
  {
    id: '50',
    name: 'UE Hyperboom',
    brand: 'Ultimate Ears',
    category: 'Electronics',
    price: 399,
    rating: 4.7,
    reviews: 789,
    inStock: true,
    image: 'https://www.ultimateears.com/content/dam/ultimate-ears/en/hyperboom/product-images/hyperboom-1.png',
    description: 'Powerful portable speaker with adaptive EQ and massive sound.',
    specifications: {
      battery: '24-hour battery life',
      connections: '4 input sources',
      water: 'IPX4 rated',
      features: 'Adaptive EQ, Party Up'
    }
  }
];

export const newArrivals: Product[] = [
  {
    id: '7',
    name: 'iPad Pro 12.9"',
    brand: 'Apple',
    category: 'Electronics',
    price: 1099,
    rating: 4.9,
    reviews: 445,
    inStock: true,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-cell-spacegray-202104?wid=940&hei=1112&fmt=png-alpha&.v=1617126613000',
    description: 'The ultimate iPad experience with the M2 chip, 12.9-inch Liquid Retina XDR display, and 5G capability.',
    specifications: {
      display: '12.9-inch Liquid Retina XDR',
      chip: 'M2',
      storage: '128GB - 2TB',
      camera: '12MP Wide + 10MP Ultra Wide'
    }
  },
  {
    id: '8',
    name: 'Samsung 65" OLED TV',
    brand: 'Samsung',
    category: 'Electronics',
    price: 2299,
    rating: 4.7,
    reviews: 234,
    inStock: true,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/uk/qa65s95batxxu/gallery/uk-oled-s95b-qa65s95batxxu-531503843?$1300_1038_PNG$',
    description: 'Experience next-level picture quality with the Samsung OLED TV, featuring Neural Quantum Processor 4K.',
    specifications: {
      display: '65-inch OLED 4K',
      processor: 'Neural Quantum Processor 4K',
      sound: 'Dolby Atmos',
      features: 'Gaming Hub, Smart Hub'
    }
  }
];

export const bestSellers = featuredProducts.filter(product => 
  product.rating !== undefined && product.rating >= 4.8
);

export const specialOffers = featuredProducts
  .filter(product => 
    product.oldPrice !== undefined && product.oldPrice > product.price
  )
  .map(product => ({
    ...product,
    discount: Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)
  }));

export const productsByCategory: Record<string, Product[]> = categories.reduce((acc, category) => {
  acc[category] = featuredProducts.filter(product => product.category === category);
  return acc;
}, {} as Record<string, Product[]>);

export const productsByBrand: Record<string, Product[]> = brands.reduce((acc, brand) => {
  acc[brand] = featuredProducts.filter(product => product.brand === brand);
  return acc;
}, {} as Record<string, Product[]>);