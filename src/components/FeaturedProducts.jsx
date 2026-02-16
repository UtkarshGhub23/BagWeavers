import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { supabase } from '../lib/supabase';
import { usePreferences } from '../context/PreferencesContext';

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = usePreferences();

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

    if (loading) return <div className="loading-container">{t('featured.loading')}</div>;
    if (error) return <div className="error-message">{t('common.error')}: {error}</div>;

    return (
        <section className="featured-products" id="featured">
            <div className="section-header">
                <div className="section-title-group">
                    <h2 className="section-title">{t('featured.title')}</h2>
                    <p className="section-subtitle">{t('featured.subtitle')}</p>
                </div>
                <a href="#" className="view-all">
                    {t('featured.viewAll')}
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
