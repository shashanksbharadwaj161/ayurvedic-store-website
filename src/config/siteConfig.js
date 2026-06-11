export const siteConfig = {
  // Brand
  brandName:    'Ayurvedic Medicines',
  tagline:      'Ancient Wisdom. Modern Wellness.',
  description:  'Premium Ayurvedic medicines and wellness products crafted from pure, natural ingredients following traditional formulations.',

  // Contact (placeholders — user fills in)
  phone:        '+91 XXXXXXXXXX',
  email:        'info@ayurvedicmedicines.com',
  whatsapp:     '91XXXXXXXXXX',
  address:      'India',

  // Social (placeholders)
  social: {
    instagram: 'https://instagram.com/ayurvedicmedicines',
    facebook:  'https://facebook.com/ayurvedicmedicines',
    youtube:   'https://youtube.com/@ayurvedicmedicines',
    whatsapp:  'https://wa.me/91XXXXXXXXXX',
  },

  // WooCommerce
  wcUrl:        import.meta.env.VITE_WC_URL || 'https://whitesmoke-zebra-795108.hostingersite.com',
  checkoutUrl:  `${import.meta.env.VITE_WC_URL || 'https://whitesmoke-zebra-795108.hostingersite.com'}/checkout`,

  // Announcement bar messages
  announcements: [
    '🌿 Free Shipping on Orders Above ₹999',
    '✨ 100% Pure & Natural Ayurvedic Formulations',
    '🎉 10% Off Your First Order — Use: WELCOME10',
    '🔬 Lab Tested & Quality Certified Products',
  ],

  // Logo
  logoUrl: '/images/logo.png',

  // Hero images (Unsplash fallbacks — user replaces with own)
  heroSlides: [
    {
      image:       'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=1600&q=80',
      headline:    'Ancient Wisdom,\nModern Wellness',
      subheadline: 'Premium Ayurvedic medicines crafted from pure, natural ingredients',
      cta:         'Shop All Products',
      ctaLink:     '/shop',
    },
    {
      image:       'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=80',
      headline:    'Balance Your\nDoshas',
      subheadline: 'Traditional formulations for Vata, Pitta & Kapha balance',
      cta:         'Explore Tablets & Vati',
      ctaLink:     '/shop/tablet-vati',
    },
    {
      image:       'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&q=80',
      headline:    'Nature\'s Purest\nIngredients',
      subheadline: 'Handpicked herbs and botanicals from trusted sources across India',
      cta:         'Shop Churna',
      ctaLink:     '/shop/churna',
    },
    {
      image:       'https://images.unsplash.com/photo-1556228578-dd539282b964?w=1600&q=80',
      headline:    'Beauty from\nWithin',
      subheadline: 'Ayurvedic cosmetics and skin care rooted in Vedic tradition',
      cta:         'Shop Cosmetics',
      ctaLink:     '/shop/cosmetics',
    },
  ],

  // Free shipping threshold
  freeShipping: 999,

  // Colors (matches Tailwind config)
  colors: {
    primary: '#6B9E7F',
    accent:  '#D97657',
    bark:    '#2C3E2D',
    cream:   '#FAFAF5',
  },
}
