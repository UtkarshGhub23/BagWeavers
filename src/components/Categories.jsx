import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { supabase } from '../lib/supabase';
import { usePreferences } from '../context/PreferencesContext';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = usePreferences();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data, error } = await supabase
                    .from('categories')
                    .select('*');

                if (error) throw error;
                setCategories(data || []);
            } catch (err) {
                console.error('Error fetching categories:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    if (loading) return <div className="loading-container">{t('categories.loading')}</div>;
    if (error) return <div className="error-message">{t('common.error')}: {error}</div>;

    return (
        <section className="categories-section" id="categories">
            <h2 className="categories-title">{t('categories.title')}</h2>
            <div className="categories-grid" id="categories-grid">
                {categories.map((cat) => (
                    <CategoryCard key={cat.id} {...cat} />
                ))}
            </div>
        </section>
    );
}
