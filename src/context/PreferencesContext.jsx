import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const PreferencesContext = createContext();

export function usePreferences() {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error('usePreferences must be used within PreferencesProvider');
    }
    return context;
}

// ─── Conversion Rates (approximate, relative to INR) ───
const CONVERSION_RATES = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
};

const CURRENCY_CONFIG = {
    INR: { symbol: '₹', locale: 'en-IN', code: 'INR' },
    USD: { symbol: '$', locale: 'en-US', code: 'USD' },
    EUR: { symbol: '€', locale: 'de-DE', code: 'EUR' },
};

// ─── Translations Dictionary ───
const translations = {
    // ── Header ──
    'header.handmadeCollection': {
        en: 'Handmade Collection',
        hi: 'हस्तनिर्मित संग्रह',
        mr: 'हस्तनिर्मित संग्रह',
    },
    'header.signIn': {
        en: 'Sign In',
        hi: 'साइन इन',
        mr: 'साइन इन',
    },
    'header.account': {
        en: 'Account',
        hi: 'खाता',
        mr: 'खाते',
    },
    'header.manageUsers': {
        en: 'Manage Users',
        hi: 'उपयोगकर्ता प्रबंधन',
        mr: 'वापरकर्ते व्यवस्थापन',
    },
    'header.invoiceBreakdown': {
        en: 'Invoice Breakdown',
        hi: 'चालान विवरण',
        mr: 'बीजक तपशील',
    },
    'header.support': {
        en: 'Support',
        hi: 'सहायता',
        mr: 'मदत',
    },
    'header.logout': {
        en: 'Logout',
        hi: 'लॉगआउट',
        mr: 'लॉगआउट',
    },
    'header.searchPlaceholder': {
        en: 'Search anything...',
        hi: 'कुछ भी खोजें...',
        mr: 'काहीही शोधा...',
    },

    // ── Menu Bar ──
    'menu.allCollections': {
        en: 'All Collections',
        hi: 'सभी संग्रह',
        mr: 'सर्व संग्रह',
    },
    'menu.handbags': {
        en: 'Handbags',
        hi: 'हैंडबैग',
        mr: 'हँडबॅग',
    },
    'menu.backpacks': {
        en: 'Backpacks',
        hi: 'बैकपैक',
        mr: 'बॅकपॅक',
    },
    'menu.crossbody': {
        en: 'Crossbody',
        hi: 'क्रॉसबॉडी',
        mr: 'क्रॉसबॉडी',
    },
    'menu.totes': {
        en: 'Totes',
        hi: 'टोट बैग',
        mr: 'टोट बॅग',
    },
    'menu.clutches': {
        en: 'Clutches',
        hi: 'क्लच',
        mr: 'क्लच',
    },

    // ── Hero Section ──
    'hero.discoverArt': {
        en: 'Discover the art of',
        hi: 'कला की खोज करें',
        mr: 'कलेचा शोध घ्या',
    },
    'hero.handmadeElegance': {
        en: 'Handmade Elegance',
        hi: 'हस्तनिर्मित शोभा',
        mr: 'हस्तनिर्मित सुंदरता',
    },
    'hero.description': {
        en: 'Crafted with passion, designed for style. Elevate your everyday look with our exclusive collection of handmade bags.',
        hi: 'जुनून से बनाया, स्टाइल के लिए डिज़ाइन किया। हमारे विशेष हस्तनिर्मित बैग संग्रह से अपने रोज़ के लुक को निखारें।',
        mr: 'आवडीने तयार केलेले, शैलीसाठी डिझाइन केलेले। आमच्या विशेष हस्तनिर्मित बॅग संग्रहाने तुमचा रोजचा लुक उंचावा.',
    },

    // ── Featured Products ──
    'featured.title': {
        en: 'Featured Products',
        hi: 'विशेष उत्पाद',
        mr: 'वैशिष्ट्यपूर्ण उत्पादने',
    },
    'featured.subtitle': {
        en: 'Handpicked collection just for you',
        hi: 'खास आपके लिए चुना गया संग्रह',
        mr: 'फक्त तुमच्यासाठी निवडलेला संग्रह',
    },
    'featured.viewAll': {
        en: 'View All →',
        hi: 'सभी देखें →',
        mr: 'सर्व पहा →',
    },
    'featured.loading': {
        en: 'Loading products...',
        hi: 'उत्पाद लोड हो रहे हैं...',
        mr: 'उत्पादने लोड होत आहेत...',
    },

    // ── Trust Section ──
    'trust.securePayments': {
        en: 'Secure Payments',
        hi: 'सुरक्षित भुगतान',
        mr: 'सुरक्षित पेमेंट',
    },
    'trust.assuredQuality': {
        en: 'Assured Quality',
        hi: 'गुणवत्ता की गारंटी',
        mr: 'खात्रीशीर गुणवत्ता',
    },
    'trust.madeInIndia': {
        en: 'Made In India',
        hi: 'भारत में निर्मित',
        mr: 'भारतात बनवलेले',
    },
    'trust.timelyDelivery': {
        en: 'Timely Delivery',
        hi: 'समय पर डिलीवरी',
        mr: 'वेळेवर डिलिव्हरी',
    },

    // ── Categories ──
    'categories.title': {
        en: 'Our Categories',
        hi: 'हमारी श्रेणियाँ',
        mr: 'आमच्या श्रेणी',
    },
    'categories.loading': {
        en: 'Loading categories...',
        hi: 'श्रेणियाँ लोड हो रही हैं...',
        mr: 'श्रेणी लोड होत आहेत...',
    },

    // ── Footer ──
    'footer.tagline': {
        en: 'Crafting elegance, one stitch at a time. Premium handmade bags designed for the modern lifestyle.',
        hi: 'एक-एक टांके से बुनी शोभा। आधुनिक जीवनशैली के लिए डिज़ाइन किए गए प्रीमियम हस्तनिर्मित बैग।',
        mr: 'एका टाक्याने विणलेली सुंदरता. आधुनिक जीवनशैलीसाठी डिझाइन केलेले प्रीमियम हस्तनिर्मित बॅग.',
    },
    'footer.followUs': {
        en: 'Follow us',
        hi: 'हमें फ़ॉलो करें',
        mr: 'आम्हाला फॉलो करा',
    },
    'footer.help': {
        en: 'Help',
        hi: 'मदद',
        mr: 'मदत',
    },
    'footer.shop': {
        en: 'Shop',
        hi: 'खरीदें',
        mr: 'खरेदी',
    },
    'footer.contact': {
        en: 'Contact',
        hi: 'संपर्क',
        mr: 'संपर्क',
    },
    'footer.weAccept': {
        en: 'We accept',
        hi: 'हम स्वीकार करते हैं',
        mr: 'आम्ही स्वीकारतो',
    },

    // ── Product Card ──
    'product.addToCart': {
        en: 'Add to Cart',
        hi: 'कार्ट में डालें',
        mr: 'कार्टमध्ये जोडा',
    },
    'product.added': {
        en: '✓ Added',
        hi: '✓ जोड़ा गया',
        mr: '✓ जोडले',
    },
    'product.off': {
        en: 'OFF',
        hi: 'छूट',
        mr: 'सूट',
    },

    // ── Cart Page ──
    'cart.title': {
        en: 'Shopping Cart',
        hi: 'शॉपिंग कार्ट',
        mr: 'शॉपिंग कार्ट',
    },
    'cart.empty': {
        en: 'Your cart is empty',
        hi: 'आपका कार्ट खाली है',
        mr: 'तुमची कार्ट रिकामी आहे',
    },
    'cart.startShopping': {
        en: 'Start Shopping',
        hi: 'खरीदारी शुरू करें',
        mr: 'खरेदी सुरू करा',
    },
    'cart.subtotal': {
        en: 'Subtotal',
        hi: 'उप-योग',
        mr: 'उप-एकूण',
    },
    'cart.shipping': {
        en: 'Shipping',
        hi: 'शिपिंग',
        mr: 'शिपिंग',
    },
    'cart.freeShipping': {
        en: 'FREE',
        hi: 'मुफ्त',
        mr: 'मोफत',
    },
    'cart.freeAbove': {
        en: 'Free shipping above',
        hi: 'इससे अधिक पर मुफ्त शिपिंग',
        mr: 'यापेक्षा जास्त वर मोफत शिपिंग',
    },
    'cart.tax': {
        en: 'Tax (GST 18%)',
        hi: 'कर (GST 18%)',
        mr: 'कर (GST 18%)',
    },
    'cart.total': {
        en: 'Total',
        hi: 'कुल',
        mr: 'एकूण',
    },
    'cart.proceedToCheckout': {
        en: 'Proceed to Checkout',
        hi: 'चेकआउट पर जाएँ',
        mr: 'चेकआउटवर जा',
    },
    'cart.remove': {
        en: 'Remove',
        hi: 'हटाएं',
        mr: 'काढा',
    },
    'cart.items': {
        en: 'items',
        hi: 'आइटम',
        mr: 'आयटम',
    },

    // ── Wishlist Page ──
    'wishlist.title': {
        en: 'My Wishlist',
        hi: 'मेरी विशलिस्ट',
        mr: 'माझी विशलिस्ट',
    },
    'wishlist.empty': {
        en: 'Your wishlist is empty',
        hi: 'आपकी विशलिस्ट खाली है',
        mr: 'तुमची विशलिस्ट रिकामी आहे',
    },
    'wishlist.explore': {
        en: 'Explore Products',
        hi: 'उत्पाद एक्सप्लोर करें',
        mr: 'उत्पादने एक्सप्लोर करा',
    },

    // ── Product Detail Page ──
    'productDetail.description': {
        en: 'Description',
        hi: 'विवरण',
        mr: 'वर्णन',
    },
    'productDetail.specifications': {
        en: 'Specifications',
        hi: 'विशिष्टता',
        mr: 'वैशिष्ट्ये',
    },
    'productDetail.reviews': {
        en: 'Reviews',
        hi: 'समीक्षाएं',
        mr: 'पुनरावलोकने',
    },
    'productDetail.color': {
        en: 'Color',
        hi: 'रंग',
        mr: 'रंग',
    },
    'productDetail.size': {
        en: 'Size',
        hi: 'आकार',
        mr: 'आकार',
    },
    'productDetail.quantity': {
        en: 'Quantity',
        hi: 'मात्रा',
        mr: 'संख्या',
    },
    'productDetail.inStock': {
        en: 'In Stock',
        hi: 'स्टॉक में',
        mr: 'स्टॉकमध्ये',
    },
    'productDetail.outOfStock': {
        en: 'Out of Stock',
        hi: 'स्टॉक में नहीं',
        mr: 'स्टॉक संपले',
    },
    'productDetail.buyNow': {
        en: 'Buy Now',
        hi: 'अभी खरीदें',
        mr: 'आता खरेदी करा',
    },
    'productDetail.addToWishlist': {
        en: 'Add to Wishlist',
        hi: 'विशलिस्ट में जोड़ें',
        mr: 'विशलिस्टमध्ये जोडा',
    },

    // ── Checkout Page ──
    'checkout.title': {
        en: 'Checkout',
        hi: 'चेकआउट',
        mr: 'चेकआउट',
    },
    'checkout.shippingAddress': {
        en: 'Shipping Address',
        hi: 'शिपिंग पता',
        mr: 'शिपिंग पत्ता',
    },
    'checkout.orderSummary': {
        en: 'Order Summary',
        hi: 'ऑर्डर सारांश',
        mr: 'ऑर्डर सारांश',
    },
    'checkout.placeOrder': {
        en: 'Place Order',
        hi: 'ऑर्डर दें',
        mr: 'ऑर्डर द्या',
    },
    'checkout.paymentMethod': {
        en: 'Payment Method',
        hi: 'भुगतान विधि',
        mr: 'पेमेंट पद्धत',
    },

    // ── Account / Settings ──
    'settings.accountSettings': {
        en: 'Account Settings',
        hi: 'खाता सेटिंग्स',
        mr: 'खाते सेटिंग्ज',
    },
    'settings.accountDesc': {
        en: 'Manage your personal information and account details',
        hi: 'अपनी व्यक्तिगत जानकारी और खाता विवरण प्रबंधित करें',
        mr: 'तुमची वैयक्तिक माहिती आणि खाते तपशील व्यवस्थापित करा',
    },
    'settings.personalInfo': {
        en: 'Personal Information',
        hi: 'व्यक्तिगत जानकारी',
        mr: 'वैयक्तिक माहिती',
    },
    'settings.fullName': {
        en: 'Full Name',
        hi: 'पूरा नाम',
        mr: 'पूर्ण नाव',
    },
    'settings.email': {
        en: 'Email Address',
        hi: 'ईमेल पता',
        mr: 'ईमेल पत्ता',
    },
    'settings.phone': {
        en: 'Phone Number',
        hi: 'फोन नंबर',
        mr: 'फोन नंबर',
    },
    'settings.edit': {
        en: 'Edit',
        hi: 'संपादित करें',
        mr: 'संपादित करा',
    },
    'settings.saveChanges': {
        en: 'Save Changes',
        hi: 'बदलाव सहेजें',
        mr: 'बदल जतन करा',
    },
    'settings.saving': {
        en: 'Saving...',
        hi: 'सहेज रहा है...',
        mr: 'जतन करत आहे...',
    },
    'settings.cancel': {
        en: 'Cancel',
        hi: 'रद्द करें',
        mr: 'रद्द करा',
    },
    'settings.quickActions': {
        en: 'Quick Actions',
        hi: 'त्वरित कार्य',
        mr: 'जलद क्रिया',
    },
    'settings.myWishlist': {
        en: 'My Wishlist',
        hi: 'मेरी विशलिस्ट',
        mr: 'माझी विशलिस्ट',
    },
    'settings.myCart': {
        en: 'My Cart',
        hi: 'मेरा कार्ट',
        mr: 'माझी कार्ट',
    },
    'settings.ordersAddresses': {
        en: 'Orders & Addresses',
        hi: 'ऑर्डर और पते',
        mr: 'ऑर्डर आणि पत्ते',
    },
    'settings.ordersDesc': {
        en: 'Manage your saved addresses and shipping preferences',
        hi: 'अपने सहेजे गए पते और शिपिंग प्राथमिकताएं प्रबंधित करें',
        mr: 'तुमचे जतन केलेले पत्ते आणि शिपिंग प्राधान्ये व्यवस्थापित करा',
    },
    'settings.paymentSettings': {
        en: 'Payment Settings',
        hi: 'भुगतान सेटिंग्स',
        mr: 'पेमेंट सेटिंग्ज',
    },
    'settings.paymentDesc': {
        en: 'Manage your payment methods and preferences',
        hi: 'अपनी भुगतान विधियां और प्राथमिकताएं प्रबंधित करें',
        mr: 'तुमच्या पेमेंट पद्धती आणि प्राधान्ये व्यवस्थापित करा',
    },
    'settings.notifications': {
        en: 'Notification Settings',
        hi: 'सूचना सेटिंग्स',
        mr: 'सूचना सेटिंग्ज',
    },
    'settings.notificationsDesc': {
        en: 'Control how and when you receive updates',
        hi: 'नियंत्रित करें कि आप अपडेट कब और कैसे प्राप्त करें',
        mr: 'तुम्हाला अपडेट्स कधी आणि कसे मिळतात ते नियंत्रित करा',
    },
    'settings.privacySecurity': {
        en: 'Privacy & Security',
        hi: 'गोपनीयता और सुरक्षा',
        mr: 'गोपनीयता आणि सुरक्षा',
    },
    'settings.privacyDesc': {
        en: 'Manage your account security and privacy preferences',
        hi: 'अपनी खाता सुरक्षा और गोपनीयता प्राथमिकताएं प्रबंधित करें',
        mr: 'तुमच्या खाते सुरक्षा आणि गोपनीयता प्राधान्ये व्यवस्थापित करा',
    },
    'settings.changePassword': {
        en: 'Change Password',
        hi: 'पासवर्ड बदलें',
        mr: 'पासवर्ड बदला',
    },
    'settings.newPassword': {
        en: 'New Password',
        hi: 'नया पासवर्ड',
        mr: 'नवीन पासवर्ड',
    },
    'settings.confirmPassword': {
        en: 'Confirm New Password',
        hi: 'नया पासवर्ड सत्यापित करें',
        mr: 'नवीन पासवर्ड पुष्टी करा',
    },
    'settings.passwordChanged': {
        en: 'Password changed successfully!',
        hi: 'पासवर्ड सफलतापूर्वक बदला गया!',
        mr: 'पासवर्ड यशस्वीरित्या बदलला!',
    },
    'settings.changing': {
        en: 'Changing...',
        hi: 'बदल रहा है...',
        mr: 'बदलत आहे...',
    },
    'settings.preferences': {
        en: 'App Preferences',
        hi: 'ऐप प्राथमिकताएं',
        mr: 'ॲप प्राधान्ये',
    },
    'settings.preferencesDesc': {
        en: 'Customize your browsing experience',
        hi: 'अपने ब्राउज़िंग अनुभव को अनुकूलित करें',
        mr: 'तुमचा ब्राउझिंग अनुभव सानुकूलित करा',
    },
    'settings.display': {
        en: 'Display',
        hi: 'प्रदर्शन',
        mr: 'प्रदर्शन',
    },
    'settings.darkMode': {
        en: 'Dark Mode',
        hi: 'डार्क मोड',
        mr: 'डार्क मोड',
    },
    'settings.darkModeDesc': {
        en: 'Switch between light and dark theme',
        hi: 'लाइट और डार्क थीम के बीच स्विच करें',
        mr: 'लाइट आणि डार्क थीम दरम्यान स्विच करा',
    },
    'settings.regional': {
        en: 'Regional',
        hi: 'क्षेत्रीय',
        mr: 'प्रादेशिक',
    },
    'settings.language': {
        en: 'Language',
        hi: 'भाषा',
        mr: 'भाषा',
    },
    'settings.currency': {
        en: 'Currency',
        hi: 'मुद्रा',
        mr: 'चलन',
    },
    'settings.supportLegal': {
        en: 'Support & Legal',
        hi: 'सहायता और कानूनी',
        mr: 'मदत आणि कायदेशीर',
    },
    'settings.supportLegalDesc': {
        en: 'Get help and read our policies',
        hi: 'मदद लें और हमारी नीतियां पढ़ें',
        mr: 'मदत मिळवा आणि आमची धोरणे वाचा',
    },
    'settings.contactSupport': {
        en: 'Contact Support',
        hi: 'सहायता से संपर्क करें',
        mr: 'मदत संपर्क',
    },
    'settings.contactSupportDesc': {
        en: 'Get help from our team',
        hi: 'हमारी टीम से मदद लें',
        mr: 'आमच्या टीमकडून मदत मिळवा',
    },
    'settings.faqs': {
        en: 'FAQs',
        hi: 'अक्सर पूछे जाने वाले प्रश्न',
        mr: 'वारंवार विचारले जाणारे प्रश्न',
    },
    'settings.faqsDesc': {
        en: 'Frequently asked questions',
        hi: 'अक्सर पूछे जाने वाले प्रश्न',
        mr: 'वारंवार विचारले जाणारे प्रश्न',
    },
    'settings.memberSince': {
        en: 'Member since',
        hi: 'से सदस्य',
        mr: 'पासून सदस्य',
    },
    'settings.profileUpdated': {
        en: 'Profile updated successfully!',
        hi: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!',
        mr: 'प्रोफाइल यशस्वीरित्या अपडेट झाले!',
    },
    'settings.signInRequired': {
        en: 'Sign In Required',
        hi: 'साइन इन आवश्यक है',
        mr: 'साइन इन आवश्यक आहे',
    },
    'settings.signInToView': {
        en: 'Please sign in to view your settings',
        hi: 'अपनी सेटिंग्स देखने के लिए साइन इन करें',
        mr: 'तुमचे सेटिंग्ज पाहण्यासाठी साइन इन करा',
    },
    'settings.notProvided': {
        en: 'Not provided',
        hi: 'प्रदान नहीं किया गया',
        mr: 'दिलेले नाही',
    },

    // ── Common ──
    'common.error': {
        en: 'Error',
        hi: 'त्रुटि',
        mr: 'त्रुटी',
    },
    'common.loading': {
        en: 'Loading...',
        hi: 'लोड हो रहा है...',
        mr: 'लोड होत आहे...',
    },
};

export function PreferencesProvider({ children }) {
    const [currency, setCurrency] = useState(() => {
        const saved = localStorage.getItem('bw_preferences');
        if (saved) {
            try {
                return JSON.parse(saved).currency || 'INR';
            } catch { return 'INR'; }
        }
        return 'INR';
    });

    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('bw_preferences');
        if (saved) {
            try {
                return JSON.parse(saved).language || 'en';
            } catch { return 'en'; }
        }
        return 'en';
    });

    // Persist preferences
    useEffect(() => {
        localStorage.setItem('bw_preferences', JSON.stringify({ currency, language }));
    }, [currency, language]);

    // Format price: convert from INR to the selected currency
    const formatPrice = useCallback((amountInINR) => {
        if (amountInINR == null || isNaN(amountInINR)) return '';
        const rate = CONVERSION_RATES[currency] || 1;
        const converted = amountInINR * rate;
        const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.INR;

        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: config.code,
            minimumFractionDigits: currency === 'INR' ? 0 : 2,
            maximumFractionDigits: currency === 'INR' ? 0 : 2,
        }).format(converted);
    }, [currency]);

    // Translation helper
    const t = useCallback((key) => {
        const entry = translations[key];
        if (!entry) return key;
        return entry[language] || entry.en || key;
    }, [language]);

    const value = {
        currency,
        setCurrency,
        language,
        setLanguage,
        formatPrice,
        t,
    };

    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    );
}
