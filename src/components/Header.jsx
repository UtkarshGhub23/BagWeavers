import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';
import { X, ChevronRight, User, Search, ShoppingBag, Heart, Menu, Package, Settings, HelpCircle, Home } from 'lucide-react';

export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { cart } = useCart();
    const { getWishlistCount } = useWishlist();
    const { user, signOut, loading } = useAuth();
    const { t } = usePreferences();

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
    const wishlistCount = getWishlistCount();

    const handleDropdownNav = (path) => {
        setDropdownOpen(false);
        navigate(path);
    };

    return (
        <>
            <motion.header
                className={`reference-header glass ${scrolled ? 'scrolled' : ''} elite-header`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Scroll Progress Indicator */}
                {!mobileMenuOpen && (
                    <motion.div
                        className="scroll-progress-indicator"
                        style={{ scaleX, transformOrigin: "0%" }}
                    />
                )}

                <div className="reference-header-container">
                    {/* Left: Burger(Mobile) + Logo */}
                    <div className="header-left">
                        <motion.button
                            className="header-burger-btn"
                            onClick={() => setMobileMenuOpen(true)}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Menu size={24} />
                        </motion.button>

                        <motion.a
                            href="/"
                            className="header-logo-link"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="header-logo-icon">
                                <svg viewBox="0 0 60 60" width="36" height="36">
                                    <rect x="15" y="15" width="30" height="25" rx="4" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
                                    <path d="M22 15 Q22 5 30 5 Q38 5 38 15" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
                                    <rect x="26" y="24" width="8" height="8" rx="1" fill="var(--primary)" opacity="0.2" />
                                </svg>
                                <span className="header-brand-name">Weaves of Vrinda</span>
                            </div>
                        </motion.a>

                        <nav className="header-nav-desktop desktop-only">
                            <Link to="/category/all" className="nav-link-standard">Collections</Link>
                            <Link to="/category/handbags" className="nav-link-standard">Handbags</Link>
                            <Link to="/category/backpacks" className="nav-link-standard">Backpacks</Link>
                        </nav>
                    </div>

                    {/* Center: Search Icon */}
                    <div className="header-center">
                        <motion.button
                            className="header-search-icon-btn"
                            onClick={() => setSearchOpen(true)}
                            whileHover={{ scale: 1.1, color: "var(--brown-accent)" }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Search size={22} />
                        </motion.button>
                    </div>

                    {/* Right: Icons + User */}
                    <div className="header-right">
                        <motion.button
                            className="header-icon-btn header-heart-btn"
                            onClick={() => navigate('/wishlist')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Heart size={24} color={wishlistCount > 0 ? "#e8607a" : "currentColor"} fill={wishlistCount > 0 ? "#e8607a" : "none"} />
                            {wishlistCount > 0 && (
                                <span className="header-wishlist-badge pulse">{wishlistCount}</span>
                            )}
                        </motion.button>

                        <motion.button
                            className="header-icon-btn header-cart-btn"
                            onClick={() => navigate('/cart')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ShoppingBag size={24} />
                            {cartItemCount > 0 && (
                                <span className="header-cart-badge pulse">{cartItemCount}</span>
                            )}
                        </motion.button>

                        {loading ? (
                            <div className="header-auth-skeleton"></div>
                        ) : user ? (
                            <div className="header-user-dropdown-wrap" ref={dropdownRef}>
                                <motion.button
                                    className={`header-user-profile ${dropdownOpen ? 'active' : ''}`}
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="header-user-avatar">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <ChevronRight size={14} className={`header-dropdown-chevron ${dropdownOpen ? 'open' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            className="header-dropdown-menu"
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="dropdown-profile-header">
                                                <div className="dropdown-avatar-large">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="dropdown-profile-name">{user.name}</span>
                                                <span className="dropdown-profile-email">{user.email}</span>
                                            </div>

                                            <button className="header-dropdown-item" onClick={() => handleDropdownNav('/account')}>
                                                <User size={18} />
                                                <span>{t('header.account')}</span>
                                            </button>

                                            <button className="header-dropdown-item" onClick={() => handleDropdownNav('/account?tab=orders')}>
                                                <Package size={18} />
                                                <span>{t('header.myOrders')}</span>
                                            </button>

                                            <button className="header-dropdown-item" onClick={() => handleDropdownNav('/wishlist')}>
                                                <Heart size={18} />
                                                <span>{t('header.wishlist')}</span>
                                            </button>

                                            <button className="header-dropdown-item" onClick={() => handleDropdownNav('/account?tab=preferences')}>
                                                <Settings size={18} />
                                                <span>{t('header.settings')}</span>
                                            </button>

                                            <button className="header-dropdown-item" onClick={() => handleDropdownNav('/contact')}>
                                                <HelpCircle size={18} />
                                                <span>{t('header.support')}</span>
                                            </button>

                                            <div className="header-dropdown-divider"></div>

                                            <div className="dropdown-logout-wrap">
                                                <button className="dropdown-logout-btn" onClick={() => signOut()}>
                                                    {t('header.logout')}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <motion.button
                                className="header-signin-btn"
                                onClick={() => navigate('/auth/signin')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="desktop-only">{t('header.signIn')}</span>
                                <User size={22} className="mobile-only" />
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.header>

            {/* Elite Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        className="header-search-overlay elite-search"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    >
                        <motion.div
                            className="header-search-container"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="search-input-wrapper">
                                <Search className="search-icon-inner" size={20} />
                                <input
                                    type="text"
                                    placeholder={t('header.searchPlaceholder')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    autoFocus
                                />
                                <motion.button
                                    onClick={() => setSearchOpen(false)}
                                    className="header-search-close"
                                    whileHover={{ rotate: 90 }}
                                >
                                    <X size={24} />
                                </motion.button>
                            </div>
                            <div className="search-hints">
                                <span>{t('header.popularSearches')}</span>
                                <button onClick={() => setSearchQuery('Handbags')}>Handbags</button>
                                <button onClick={() => setSearchQuery('Backpacks')}>Backpacks</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Sidebar Navigation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            className="mobile-drawer-overlay active"
                            onClick={() => setMobileMenuOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.div
                            className="mobile-drawer open"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        >
                            <div className="drawer-header-premium">
                                <div className="drawer-brand">
                                    <span className="brand-dot"></span>
                                    <h2>Weaves of Vrinda</h2>
                                </div>
                                <motion.button
                                    className="drawer-close-btn"
                                    onClick={() => setMobileMenuOpen(false)}
                                    whileTap={{ scale: 0.9, rotate: 90 }}
                                >
                                    <X size={24} />
                                </motion.button>
                            </div>

                            <div className="drawer-content-premium">
                                {/* User Profile Section */}
                                <div className="drawer-profile-section">
                                    {user ? (
                                        <div className="drawer-user-info">
                                            <div className="drawer-user-avatar">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="drawer-user-details">
                                                <span className="drawer-welcome">{t('header.welcome')}</span>
                                                <span className="drawer-name">{user.name}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="drawer-guest-info">
                                            <div className="drawer-guest-avatar">
                                                <User size={24} />
                                            </div>
                                            <div className="drawer-guest-details">
                                                <span className="drawer-welcome">{t('header.welcomeGuest')}</span>
                                                <Link to="/auth/signin" onClick={() => setMobileMenuOpen(false)} className="drawer-login-link">
                                                    {t('header.signIn')} <ChevronRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Actions Grid */}
                                <div className="drawer-quick-actions">
                                    <button onClick={() => { setMobileMenuOpen(false); navigate('/'); }} className="quick-action-item">
                                        <Home size={20} />
                                        <span>{t('header.home')}</span>
                                    </button>
                                    <button onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }} className="quick-action-item">
                                        <Search size={20} />
                                        <span>{t('header.search')}</span>
                                    </button>
                                    <button onClick={() => { setMobileMenuOpen(false); navigate('/contact'); }} className="quick-action-item">
                                        <HelpCircle size={20} />
                                        <span>{t('header.support')}</span>
                                    </button>
                                </div>

                                <div className="drawer-scroll-area">
                                    <div className="drawer-section">
                                        <h3 className="drawer-section-title">{t('menu.collections')}</h3>
                                        <nav className="drawer-nav-premium">
                                            {[
                                                { toPath: "/category/all", label: 'menu.allCollections' },
                                                { toPath: "/category/handbags", label: 'menu.handbags' },
                                                { toPath: "/category/backpacks", label: 'menu.backpacks' },
                                                { toPath: "/category/crossbody", label: 'menu.crossbody' },
                                                { toPath: "/category/totes", label: 'menu.totes' },
                                                { toPath: "/category/clutches", label: 'menu.clutches' }
                                            ].map((item, idx) => (
                                                <motion.div
                                                    key={item.toPath}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + idx * 0.05 }}
                                                >
                                                    <Link to={item.toPath} onClick={() => setMobileMenuOpen(false)} className="drawer-link-premium">
                                                        <span className="link-text">{t(item.label)}</span>
                                                        <ChevronRight size={18} className="link-chevron" />
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </nav>
                                    </div>

                                    {user && (
                                        <div className="drawer-section">
                                            <h3 className="drawer-section-title">{t('header.account')}</h3>
                                            <nav className="drawer-nav-premium">
                                                {[
                                                    { toPath: "/account", label: 'header.profile', icon: User },
                                                    { toPath: "/account?tab=orders", label: 'header.myOrders', icon: Package },
                                                    { toPath: "/wishlist", label: 'header.wishlist', icon: Heart },
                                                    { toPath: "/account?tab=preferences", label: 'header.settings', icon: Settings }
                                                ].map((item, idx) => (
                                                    <motion.div
                                                        key={item.toPath}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 + idx * 0.05 }}
                                                    >
                                                        <Link to={item.toPath} onClick={() => setMobileMenuOpen(false)} className="drawer-link-premium">
                                                            <div className="link-content-with-icon">
                                                                <item.icon size={18} />
                                                                <span className="link-text">{t(item.label)}</span>
                                                            </div>
                                                            <ChevronRight size={18} className="link-chevron" />
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </nav>
                                        </div>
                                    )}
                                </div>

                                <div className="drawer-footer-premium">
                                    <div className="drawer-social-links">
                                        <a href="https://www.instagram.com/the.weavers_?igsh=bHM1OHExa3RkZG94" target="_blank" rel="noreferrer" className="drawer-social-btn instagram">
                                            <span className="social-dot"></span> Instagram
                                        </a>
                                        <a href="https://whatsapp.com/channel/0029VbBYaqa8vd1Vf8k0Yp0N" target="_blank" rel="noreferrer" className="drawer-social-btn whatsapp">
                                            <span className="social-dot"></span> WhatsApp
                                        </a>
                                    </div>
                                    {user && (
                                        <button className="drawer-logout-action" onClick={() => { signOut(); setMobileMenuOpen(false); }}>
                                            {t('header.logout')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
