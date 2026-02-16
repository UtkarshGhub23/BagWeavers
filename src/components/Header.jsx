import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';
import { X, ChevronRight, User, Search, ShoppingBag, Heart, Menu } from 'lucide-react';

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
                <motion.div
                    className="scroll-progress-indicator"
                    style={{ scaleX, transformOrigin: "0%" }}
                />

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

                        <Link to="/" className="header-logo-link">
                            <motion.div
                                className="header-logo-icon"
                                whileHover={{ scale: 1.05 }}
                            >
                                <svg viewBox="0 0 60 60" width="32" height="32">
                                    <circle cx="30" cy="30" r="28" fill="#f5e642" stroke="#ccc" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="22" fill="#fff" opacity="0.5" />
                                    <rect x="18" y="18" width="24" height="20" rx="3" fill="none" stroke="#333" strokeWidth="2" />
                                    <path d="M22 18 Q22 10 30 10 Q38 10 38 18" fill="none" stroke="#333" strokeWidth="2" />
                                    <line x1="30" y1="24" x2="30" y2="30" stroke="#333" strokeWidth="2" />
                                    <line x1="27" y1="30" x2="33" y2="30" stroke="#333" strokeWidth="2" />
                                </svg>
                                <span className="header-brand-name">Weaves of Vrinda</span>
                            </motion.div>
                        </Link>

                        <nav className="header-ecosystem-links desktop-only">
                            <a href="https://vrindopnishad.in" className="ecosystem-link" target="_blank" rel="noreferrer">Vrindopnishad Portal</a>
                        </nav>
                        <span className="header-collection-text desktop-only">{t('header.handmadeCollection')}</span>
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

                                            <div className="header-dropdown-divider"></div>

                                            <button className="dropdown-logout-btn" onClick={() => signOut()}>
                                                {t('header.logout')}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <motion.button
                                className="header-signin-btn"
                                onClick={() => navigate('/signin')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('header.signIn')}
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
                                <span>{t('header.popularSearches')}:</span>
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
                                <div className="drawer-section">
                                    <h3 className="drawer-section-title">Collections</h3>
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
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + idx * 0.05 }}
                                            >
                                                <Link to={item.toPath} onClick={() => setMobileMenuOpen(false)} className="drawer-link-premium">
                                                    <span className="link-text">{t(item.label)}</span>
                                                    <ChevronRight size={18} />
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </nav>
                                </div>

                                <div className="drawer-footer-premium">
                                    {user ? (
                                        <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="drawer-user-btn">
                                            <User size={20} />
                                            <span>{t('header.account')}</span>
                                        </Link>
                                    ) : (
                                        <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="drawer-auth-btn">
                                            {t('header.signIn')}
                                        </Link>
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
