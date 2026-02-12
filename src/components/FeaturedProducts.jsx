import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { supabase } from '../lib/supabase';

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .limit(6);

                if (error) throw error;
                setProducts(data || []);
            } catch (err) {
                console.error('Error fetching featured products:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) return <div className="loading-container">Loading products...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <section className="featured-products" id="featured">
            <div className="section-header">
                <div className="section-title-group">
                    <h2 className="section-title">Featured Products</h2>
                    <p className="section-subtitle">Handpicked collection just for you</p>
                </div>
                <a href="#" className="view-all">
                    View All →
                </a>
            </div>
            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.images ? product.images[0] : ''}
                        name={product.name}
                        price={product.price}
                        originalPrice={product.original_price}
                        discount={product.discount}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}
