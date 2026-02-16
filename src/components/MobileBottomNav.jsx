import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePreferences } from '../context/PreferencesContext';
import { useAuth } from '../context/AuthContext';
import { Home, Search, ShoppingBag, User, Heart } from 'lucide-react';

export default function MobileBottomNav() {
    const location = useLocation();
    const { cart } = useCart();
    const { t } = usePreferences();
    const { user } = useAuth();

    const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="mobile-bottom-nav glass">
            <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
                <Home size={22} />
                <span>{t('header.home')}</span>
            </Link>
            <Link to="/wishlist" className={`bottom-nav-item ${isActive('/wishlist') ? 'active' : ''}`}>
                <Heart size={22} />
                <span>{t('header.wishlist')}</span>
            </Link>
            <Link to="/cart" className={`bottom-nav-item ${isActive('/cart') ? 'active' : ''}`}>
                <div className="bottom-nav-icon-wrap">
                    <ShoppingBag size={22} />
                    {cartItemCount > 0 && <span className="bottom-nav-badge">{cartItemCount}</span>}
                </div>
                <span>{t('header.cart')}</span>
            </Link>
            <Link to="/account" className={`bottom-nav-item ${isActive('/account') ? 'active' : ''}`}>
                <User size={22} />
                <span>{user ? t('header.account') : t('header.signIn')}</span>
            </Link>
        </nav>
    );
}
