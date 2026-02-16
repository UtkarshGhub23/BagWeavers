import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { usePreferences } from '../context/PreferencesContext';

export default function WishlistPage() {
    const navigate = useNavigate();
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { formatPrice, t } = usePreferences();

    const handleMoveToCart = (item) => {
        addToCart(item, 1);
        removeFromWishlist(item.id);
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="empty-cart">
                <div className="empty-cart-content">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="emptyHeartGrad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#ffd6e0" />
                                <stop offset="1" stopColor="#ffb3c6" />
                            </linearGradient>
                        </defs>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#emptyHeartGrad)" stroke="#e8607a" strokeWidth="1" />
                    </svg>
                    <h2>{t('wishlist.empty')}</h2>
                    <p>Save items you love to your wishlist!</p>
                    <button onClick={() => navigate('/')} className="btn-primary">
                        {t('wishlist.explore')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page wishlist-page">
            <div className="cart-container">
                <h1 className="cart-title">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="titleHeartGrad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#ffd6e0" />
                                <stop offset="1" stopColor="#ffb3c6" />
                            </linearGradient>
                        </defs>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#titleHeartGrad)" stroke="#e8607a" strokeWidth="1" />
                    </svg>
                    {' '}{t('wishlist.title')} ({wishlistItems.length} {t('cart.items')})
                </h1>

                <div className="wishlist-grid">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="wishlist-card">
                            <div className="wishlist-card-image" onClick={() => navigate(`/product/${item.id}`)}>
                                <img src={item.images?.[0] || item.image} alt={item.name} />
                                <button
                                    className="wishlist-remove-btn"
                                    onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}
                                    title="Remove from wishlist"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                            <div className="wishlist-card-info">
                                <h3 onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                                <p className="wishlist-card-category">{item.category}</p>
                                <div className="wishlist-card-price">
                                    <span className="price">{formatPrice(item.price)}</span>
                                    {item.originalPrice && (
                                        <span className="original-price">{formatPrice(item.originalPrice)}</span>
                                    )}
                                </div>
                                <button className="wishlist-add-cart-btn" onClick={() => handleMoveToCart(item)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5.5 9h13l-1.2 10.5a1.5 1.5 0 01-1.5 1.5H8.2a1.5 1.5 0 01-1.5-1.5L5.5 9z" />
                                        <path d="M8 9V7a4 4 0 018 0v2" />
                                    </svg>
                                    {t('product.addToCart')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
