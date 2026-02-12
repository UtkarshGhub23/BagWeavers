import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ id, image, name, price, originalPrice, discount, product }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleCardClick = () => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent card click
        if (product) {
            addToCart(product, 1);
            // Show brief feedback
            const btn = e.target;
            const originalText = btn.textContent;
            btn.textContent = '✓ Added';
            btn.style.background = '#4CAF50';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 1500);
        }
    };

    return (
        <div className="product-card" id={`product-${id}`} onClick={handleCardClick}>
            <div className="product-image">
                <img src={image} alt={name} loading="lazy" />
                {discount && <span className="discount-badge">{discount}% OFF</span>}
            </div>
            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <div className="product-pricing">
                    <span className="product-price">₹{price}</span>
                    {originalPrice && <span className="product-original">₹{originalPrice}</span>}
                </div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
