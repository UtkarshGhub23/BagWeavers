import { useParams, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

    return (
        <div className="order-confirmation-page">
            <div className="confirmation-container">
                <div className="confirmation-card">
                    <div className="success-icon">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>

                    <h1>Order Placed Successfully!</h1>
                    <p className="confirmation-message">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>

                    <div className="order-details">
                        <div className="detail-row">
                            <span className="label">Order ID:</span>
                            <span className="value">{orderId}</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Estimated Delivery:</span>
                            <span className="value">{estimatedDelivery.toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}</span>
                        </div>
                    </div>

                    <p className="confirmation-note">
                        We've sent a confirmation email with your order details.
                    </p>

                    <div className="confirmation-actions">
                        <button onClick={() => navigate('/')} className="btn-primary">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
