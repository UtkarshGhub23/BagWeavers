import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePreferences } from '../context/PreferencesContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Home, Search, ShoppingBag, User, Heart } from 'lucide-react';

export default function MobileBottomNav() {
    const location = useLocation();
    const { cart } = useCart();
    const { t } = usePreferences();
    const { getWishlistCount } = useWishlist();
    const { user } = useAuth();

    const cartCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
    const wishlistCount = getWishlistCount();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="mobile-bottom-nav glass bottom-nav-premium mobile-only">
            <Link to="/" className={`bottom-nav-item-premium ${isActive('/') ? 'active' : ''}`}>
                <div className="nav-icon-wrap"><Home size={22} /></div>
                <span>{t('header.home')}</span>
            </Link>
            <Link to="/wishlist" className={`bottom-nav-item-premium ${isActive('/wishlist') ? 'active' : ''}`}>
                <div className="nav-icon-wrap">
                    <Heart size={22} />
                    {wishlistCount > 0 && <span className="bottom-nav-badge-premium pulse">{wishlistCount}</span>}
                </div>
                <span>{t('header.wishlist')}</span>
            </Link>
            <Link to="/cart" className={`bottom-nav-item-premium ${isActive('/cart') ? 'active' : ''}`}>
                <div className="nav-icon-wrap">
                    <ShoppingBag size={22} />
                    {cartCount > 0 && <span className="bottom-nav-badge-premium pulse">{cartCount}</span>}
                </div>
                <span>{t('header.cart')}</span>
            </Link>
            <Link to={user ? "/settings" : "/signin"} className={`bottom-nav-item-premium ${isActive('/settings') || isActive('/signin') ? 'active' : ''}`}>
                <div className="nav-icon-wrap"><User size={22} /></div>
                <span>{user ? t('header.account') : t('header.signIn')}</span>
            </Link>
        </nav>
    );
}
