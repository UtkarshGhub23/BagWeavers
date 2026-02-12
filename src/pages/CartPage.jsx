import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <div className="empty-cart-content">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    <h2>Your Cart is Empty</h2>
                    <p>Add some products to get started!</p>
                    <button onClick={() => navigate('/')} className="btn-primary">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    const subtotal = getCartTotal();
    const shipping = subtotal > 1000 ? 0 : 50;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1 className="cart-title">Shopping Cart ({getCartCount()} items)</h1>

                <div className="cart-content">
                    {/* Cart Items */}
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.images[0]} alt={item.name} />
                                </div>

                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-category">{item.category}</p>

                                    <div className="cart-item-options">
                                        {item.selectedColor && (
                                            <span className="option">Color: {item.selectedColor}</span>
                                        )}
                                        {item.selectedSize && (
                                            <span className="option">Size: {item.selectedSize}</span>
                                        )}
                                    </div>

                                    <div className="cart-item-price">
                                        <span className="price">₹{item.price}</span>
                                        {item.originalPrice && (
                                            <span className="original-price">₹{item.originalPrice}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                                            className="qty-btn"
                                        >
                                            -
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                            className="qty-btn"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>

                                    <div className="item-total">
                                        ₹{item.price * item.quantity}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="cart-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                        </div>

                        {shipping === 0 && (
                            <p className="free-shipping-msg">🎉 You got free shipping!</p>
                        )}

                        <div className="summary-row">
                            <span>Tax (18%):</span>
                            <span>₹{tax}</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>₹{total}</span>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="checkout-btn"
                        >
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="continue-shopping-btn"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
