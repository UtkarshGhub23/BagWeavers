import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { usePreferences } from '../context/PreferencesContext';

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { formatPrice, t } = usePreferences();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProduct(data);
                if (data?.sizes?.[0]) setSelectedSize(data.sizes[0]);
                if (data?.colors?.[0]) setSelectedColor(data.colors[0]);
            } catch (err) {
                console.error('Error fetching product detail:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) return <div className="loading-container">{t('common.loading')}</div>;

    if (error || !product) {
        return (
            <div className="product-not-found">
                <h2>{error ? `${t('common.error')}: ${error}` : 'Product Not Found'}</h2>
                <button onClick={() => navigate('/')} className="btn-primary">
                    Back to Home
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedSize, selectedColor);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity, selectedSize, selectedColor);
        navigate('/cart');
    };

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
                    <span className="breadcrumb-separator">/</span>
                    <span onClick={() => navigate(`/category/${product.category}`)} className="breadcrumb-link">
                        {product.category}
                    </span>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{product.name}</span>
                </div>

                <div className="product-detail-content">
                    {/* Image Gallery */}
                    <div className="product-images">
                        <div className="main-image">
                            <img src={product.images ? product.images[selectedImage] : ''} alt={product.name} />
                            {product.discount > 0 && (
                                <span className="discount-badge">{product.discount}% {t('product.off')}</span>
                            )}
                        </div>
                        <div className="image-thumbnails">
                            {product.images?.map((img, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={img} alt={`${product.name} ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        <h1 className="product-title">{product.name}</h1>

                        <div className="product-rating">
                            <div className="stars">
                                {'★'.repeat(Math.floor(product.rating || 0))}
                                {'☆'.repeat(5 - Math.floor(product.rating || 0))}
                            </div>
                            <span className="rating-text">{product.rating}</span>
                            <span className="reviews-count">({product.reviews} {t('productDetail.reviews').toLowerCase()})</span>
                        </div>

                        <div className="product-price">
                            <span className="current-price">{formatPrice(product.price)}</span>
                            {product.original_price && (
                                <>
                                    <span className="original-price">{formatPrice(product.original_price)}</span>
                                    <span className="discount-text">{product.discount}% off</span>
                                </>
                            )}
                        </div>

                        <p className="product-description">{product.description}</p>

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="product-option">
                                <label>{t('productDetail.color')}:</label>
                                <div className="color-options">
                                    {product.colors.map(color => (
                                        <button
                                            key={color}
                                            className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="product-option">
                                <label>{t('productDetail.size')}:</label>
                                <div className="size-options">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="product-option">
                            <label>{t('productDetail.quantity')}:</label>
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="product-actions">
                            <button
                                className="btn-add-to-cart"
                                onClick={handleAddToCart}
                                disabled={!product.in_stock}
                            >
                                {addedToCart ? t('product.added') : t('product.addToCart')}
                            </button>
                            <button
                                className="btn-buy-now"
                                onClick={handleBuyNow}
                                disabled={!product.in_stock}
                            >
                                {t('productDetail.buyNow')}
                            </button>
                        </div>

                        {!product.in_stock && (
                            <p className="out-of-stock">{t('productDetail.outOfStock')}</p>
                        )}

                        {/* Specifications */}
                        {product.specifications && (
                            <div className="product-specifications">
                                <h3>{t('productDetail.specifications')}</h3>
                                <table>
                                    <tbody>
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <tr key={key}>
                                                <td className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                                                <td className="spec-value">{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
