import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';

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
            alert(`Searching for: "${searchQuery.trim()}"`);
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
            <header className={`reference-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="reference-header-container">
                    {/* Left: Burger(Mobile) + Logo + Collection Text */}
                    <div className="header-left">
                        <button className="header-burger-btn" onClick={() => setMobileMenuOpen(true)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        <a href="/" className="header-logo-link" onClick={(e) => {
                            e.preventDefault();
                            navigate('/');
                        }}>
                            <div className="header-logo-icon">
                                <svg viewBox="0 0 60 60" width="32" height="32">
                                    <circle cx="30" cy="30" r="28" fill="#f5e642" stroke="#ccc" strokeWidth="1" />
                                    <circle cx="30" cy="30" r="22" fill="#fff" opacity="0.5" />
                                    <rect x="18" y="18" width="24" height="20" rx="3" fill="none" stroke="#333" strokeWidth="2" />
                                    <path d="M22 18 Q22 10 30 10 Q38 10 38 18" fill="none" stroke="#333" strokeWidth="2" />
                                    <line x1="30" y1="24" x2="30" y2="30" stroke="#333" strokeWidth="2" />
                                    <line x1="27" y1="30" x2="33" y2="30" stroke="#333" strokeWidth="2" />
                                </svg>
                                <span className="header-brand-name">Weaves of Vrinda</span>
                            </div>
                        </a>
                        <nav className="header-ecosystem-links">
                            <a href="https://vrindopnishad.in" className="ecosystem-link" target="_blank" rel="noreferrer">Vrindopnishad Portal</a>
                        </nav>
                        <span className="header-collection-text">{t('header.handmadeCollection')}</span>
                    </div>

                    {/* Center: Search Icon */}
                    <div className="header-center">
                        <button
                            className="header-search-icon-btn"
                            onClick={() => setSearchOpen(!searchOpen)}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </button>
                    </div>

                    {/* Right: Icons + User */}
                    <div className="header-right">
                        <button className="header-icon-btn header-heart-btn" onClick={() => navigate('/wishlist')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="heartFill" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#ffd6e0" />
                                        <stop offset="1" stopColor="#ffb3c6" />
                                    </linearGradient>
                                    <linearGradient id="heartStroke" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#e8607a" />
                                        <stop offset="1" stopColor="#c9344e" />
                                    </linearGradient>
                                </defs>
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#heartFill)" stroke="url(#heartStroke)" strokeWidth="1.5" />
                                <path d="M15 6.5l1.2 0.3 0.3 1.2-0.3 1.2-1.2 0.3-1.2-0.3-0.3-1.2 0.3-1.2z" fill="white" opacity="0.6" className="icon-sparkle" />
                            </svg>
                            {wishlistCount > 0 && (
                                <span className="header-wishlist-badge">{wishlistCount}</span>
                            )}
                        </button>

                        <button className="header-icon-btn header-cart-btn" onClick={() => navigate('/cart')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="bagFill" x1="5" y1="8" x2="19" y2="22" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#f5e6d0" />
                                        <stop offset="1" stopColor="#e8d0b3" />
                                    </linearGradient>
                                    <linearGradient id="bagStroke" x1="5" y1="6" x2="19" y2="22" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#C87533" />
                                        <stop offset="1" stopColor="#8B4513" />
                                    </linearGradient>
                                </defs>
                                <path d="M5.5 9h13l-1.2 10.5a1.5 1.5 0 01-1.5 1.5H8.2a1.5 1.5 0 01-1.5-1.5L5.5 9z" fill="url(#bagFill)" stroke="url(#bagStroke)" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M8 9V7a4 4 0 018 0v2" stroke="url(#bagStroke)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                                {/* Woven texture */}
                                <line x1="9" y1="13" x2="15" y2="13" stroke="#C87533" strokeWidth="0.6" opacity="0.25" />
                                <line x1="9.2" y1="15.5" x2="14.8" y2="15.5" stroke="#C87533" strokeWidth="0.6" opacity="0.25" />
                                <line x1="9.5" y1="18" x2="14.5" y2="18" stroke="#C87533" strokeWidth="0.6" opacity="0.25" />
                                {/* Clasp */}
                                <circle cx="12" cy="11" r="1" stroke="#C87533" strokeWidth="0.8" fill="none" />
                            </svg>
                            {cartItemCount > 0 && (
                                <span className="header-cart-badge">{cartItemCount}</span>
                            )}
                        </button>

                        {loading ? (
                            <div className="header-auth-loading">
                                <div className="header-auth-skeleton"></div>
                            </div>
                        ) : user ? (
                            <div className="header-user-dropdown-wrap" ref={dropdownRef}>
                                <button
                                    className={`header-user-profile ${dropdownOpen ? 'active' : ''}`}
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="header-user-name">{user.name}</span>
                                    <div className="header-user-avatar">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <svg className={`header-dropdown-chevron ${dropdownOpen ? 'open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                {dropdownOpen && (
                                    <div className="header-dropdown-menu" id="header-account-dropdown-menu">
                                        {/* Profile Header - Centered */}
                                        <div className="dropdown-profile-header">
                                            <div className="dropdown-avatar-large">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="dropdown-profile-name">{user.name}</span>
                                            <span className="dropdown-profile-email">{user.email}</span>
                                        </div>

                                        {/* Account - highlighted */}
                                        <button className="header-dropdown-item active" onClick={() => handleDropdownNav('/account')}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            <span>{t('header.account')}</span>
                                        </button>

                                        {/* Manage Users */}
                                        <button className="header-dropdown-item" onClick={() => handleDropdownNav('/account')}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                            <span>{t('header.manageUsers')}</span>
                                        </button>

                                        {/* Invoice Breakdown */}
                                        <button className="header-dropdown-item" onClick={() => handleDropdownNav('/account')}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <line x1="16" y1="13" x2="8" y2="13" />
                                                <line x1="16" y1="17" x2="8" y2="17" />
                                                <polyline points="10 9 9 9 8 9" />
                                            </svg>
                                            <span>{t('header.invoiceBreakdown')}</span>
                                        </button>

                                        <div className="header-dropdown-divider"></div>

                                        {/* Support */}
                                        <button className="header-dropdown-item" onClick={() => handleDropdownNav('/contact')}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <line x1="12" y1="17" x2="12.01" y2="17" />
                                            </svg>
                                            <span>{t('header.support')}</span>
                                        </button>

                                        <div className="header-dropdown-divider"></div>

                                        {/* Logout Button */}
                                        <div className="dropdown-logout-section">
                                            <button className="dropdown-logout-btn" onClick={() => handleDropdownNav('/auth/logout')}>
                                                {t('header.logout')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="header-signin-btn" onClick={() => navigate('/auth/signin')}>
                                {t('header.signIn')}
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Search Overlay */}
            {searchOpen && (
                <div className="header-search-overlay">
                    <div className="header-search-container">
                        <input
                            type="text"
                            placeholder={t('header.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            autoFocus
                        />
                        <button onClick={handleSearch} className="header-search-submit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </button>
                        <button onClick={() => setSearchOpen(false)} className="header-search-close">
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile Drawer */}
            <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
            <div className={`mobile-drawer ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-drawer-header">
                    <span className="header-brand-name">Weaves of Vrinda</span>
                    <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
                </div>
                <nav className="mobile-nav-links">
                    <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('menu.allCollections')}</Link>
                    <Link to="/category/handbags" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('menu.handbags')}</Link>
                    <Link to="/category/backpacks" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('menu.backpacks')}</Link>
                    <Link to="/category/crossbody" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('menu.crossbody')}</Link>
                    <Link to="/category/totes" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('menu.totes')}</Link>
                    <Link to="/category/clutches" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('menu.clutches')}</Link>
                </nav>
                <div className="mobile-drawer-footer">
                    {!user && (
                        <button className="header-signin-btn" style={{ width: '100%' }} onClick={() => handleDropdownNav('/auth/signin')}>
                            {t('header.signIn')}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
