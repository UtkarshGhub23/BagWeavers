import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { cart } = useCart();
    const { user, signOut } = useAuth();

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

    return (
        <header className="reference-header">
            <div className="reference-header-container">
                {/* Left: Logo + Collection Text */}
                <div className="header-left">
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
                            <span className="header-brand-name">BagWeavers</span>
                        </div>
                    </a>
                    <span className="header-collection-text">Handmade Collection</span>
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
                    <button className="header-icon-btn" onClick={() => {
                        const pincode = prompt('Enter your pincode:');
                        if (pincode) alert(`Delivery available at ${pincode}!`);
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="10" r="3" />
                            <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.05 11.5 7.35 11.76a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8z" />
                        </svg>
                    </button>

                    <button className="header-icon-btn header-heart-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>

                    <button className="header-icon-btn header-cart-btn" onClick={() => navigate('/cart')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        {cartItemCount > 0 && (
                            <span className="header-cart-badge">{cartItemCount}</span>
                        )}
                    </button>

                    {user ? (
                        <div className="header-user-profile">
                            <span className="header-user-name">{user.name}</span>
                            <div className="header-user-avatar">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    ) : (
                        <button className="header-signin-btn" onClick={() => navigate('/auth/signin')}>
                            Sign In
                        </button>
                    )}
                </div>
            </div>

            {/* Search Overlay */}
            {searchOpen && (
                <div className="header-search-overlay">
                    <div className="header-search-container">
                        <input
                            type="text"
                            placeholder="Search anything..."
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
        </header>
    );
}
