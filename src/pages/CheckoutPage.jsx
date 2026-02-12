import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();

    const [step, setStep] = useState(1);
    const [shippingInfo, setShippingInfo] = useState({
        fullName: user?.name || '',
        phone: user?.phone || '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('cod');

    if (!isAuthenticated) {
        return (
            <div className="checkout-auth-required">
                <h2>Please Sign In to Continue</h2>
                <p>You need to be signed in to complete your purchase.</p>
                <button onClick={() => navigate('/auth/signin')} className="btn-primary">
                    Sign In
                </button>
            </div>
        );
    }

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    const subtotal = getCartTotal();
    const shipping = subtotal > 1000 ? 0 : 50;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePlaceOrder = () => {
        const orderId = 'ORD' + Date.now();
        clearCart();
        navigate(`/order-confirmation/${orderId}`);
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <h1>Checkout</h1>

                {/* Progress Steps */}
                <div className="checkout-steps">
                    <div className={`step ${step >= 1 ? 'active' : ''}`}>
                        <span className="step-number">1</span>
                        <span className="step-label">Shipping</span>
                    </div>
                    <div className={`step ${step >= 2 ? 'active' : ''}`}>
                        <span className="step-number">2</span>
                        <span className="step-label">Payment</span>
                    </div>
                    <div className={`step ${step >= 3 ? 'active' : ''}`}>
                        <span className="step-number">3</span>
                        <span className="step-label">Review</span>
                    </div>
                </div>

                <div className="checkout-content">
                    <div className="checkout-main">
                        {/* Step 1: Shipping Address */}
                        {step === 1 && (
                            <form onSubmit={handleShippingSubmit} className="shipping-form">
                                <h2>Shipping Address</h2>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            value={shippingInfo.fullName}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={shippingInfo.phone}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Address *</label>
                                    <textarea
                                        value={shippingInfo.address}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                        required
                                        rows="3"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City *</label>
                                        <input
                                            type="text"
                                            value={shippingInfo.city}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>State *</label>
                                        <input
                                            type="text"
                                            value={shippingInfo.state}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Pincode *</label>
                                        <input
                                            type="text"
                                            value={shippingInfo.pincode}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                                            required
                                            pattern="[0-9]{6}"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn-next">Continue to Payment</button>
                            </form>
                        )}

                        {/* Step 2: Payment Method */}
                        {step === 2 && (
                            <div className="payment-section">
                                <h2>Payment Method</h2>

                                <div className="payment-options">
                                    <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className="payment-info">
                                            <strong>Cash on Delivery</strong>
                                            <p>Pay when you receive your order</p>
                                        </div>
                                    </label>

                                    <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            value="upi"
                                            checked={paymentMethod === 'upi'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className="payment-info">
                                            <strong>UPI Payment</strong>
                                            <p>Pay using Google Pay, PhonePe, Paytm</p>
                                        </div>
                                    </label>

                                    <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className="payment-info">
                                            <strong>Credit/Debit Card</strong>
                                            <p>Visa, Mastercard, Rupay</p>
                                        </div>
                                    </label>
                                </div>

                                <div className="checkout-actions">
                                    <button onClick={() => setStep(1)} className="btn-back">Back</button>
                                    <button onClick={() => setStep(3)} className="btn-next">Review Order</button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review Order */}
                        {step === 3 && (
                            <div className="review-section">
                                <h2>Review Your Order</h2>

                                <div className="review-shipping">
                                    <h3>Shipping Address</h3>
                                    <p>{shippingInfo.fullName}</p>
                                    <p>{shippingInfo.phone}</p>
                                    <p>{shippingInfo.address}</p>
                                    <p>{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
                                    <button onClick={() => setStep(1)} className="btn-edit">Edit</button>
                                </div>

                                <div className="review-payment">
                                    <h3>Payment Method</h3>
                                    <p>
                                        {paymentMethod === 'cod' && 'Cash on Delivery'}
                                        {paymentMethod === 'upi' && 'UPI Payment'}
                                        {paymentMethod === 'card' && 'Credit/Debit Card'}
                                    </p>
                                    <button onClick={() => setStep(2)} className="btn-edit">Edit</button>
                                </div>

                                <div className="review-items">
                                    <h3>Order Items</h3>
                                    {cartItems.map((item) => (
                                        <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="review-item">
                                            <img src={item.images[0]} alt={item.name} />
                                            <div className="review-item-info">
                                                <p className="item-name">{item.name}</p>
                                                <p className="item-options">
                                                    {item.selectedColor && `Color: ${item.selectedColor}`}
                                                    {item.selectedSize && ` | Size: ${item.selectedSize}`}
                                                </p>
                                                <p className="item-quantity">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="item-price">₹{item.price * item.quantity}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="checkout-actions">
                                    <button onClick={() => setStep(2)} className="btn-back">Back</button>
                                    <button onClick={handlePlaceOrder} className="btn-place-order">Place Order</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="checkout-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>₹{tax}</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>₹{total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
