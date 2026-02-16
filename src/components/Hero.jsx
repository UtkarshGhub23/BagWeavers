import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePreferences } from '../context/PreferencesContext';

const heroImages = [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80',
];

export default function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { t } = usePreferences();
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero-premium" id="hero">
            <div className="hero-bg-accent"></div>
            <div className="hero-container-premium">
                {/* Visual Content - Layered background */}
                <div className="hero-visual-premium">
                    <div className="premium-carousel-wrap">
                        {heroImages.map((img, index) => (
                            <div
                                key={img}
                                className={`premium-slide ${index === currentImageIndex ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${img})` }}
                            >
                                <div className="slide-overlay"></div>
                            </div>
                        ))}
                    </div>
                    {/* Decorative Elements */}
                    <div className="hero-blob blob-1"></div>
                    <div className="hero-blob blob-2"></div>
                </div>

                {/* Text Content */}
                <div className="hero-content-premium">
                    <div className="hero-badge-wrap">
                        <span className="hero-badge">{t('header.handmadeCollection')}</span>
                    </div>
                    <h1 className="hero-title-premium">
                        Weaves of <span className="hero-gradient-text">Vrinda</span>
                    </h1>
                    <p className="hero-subtitle-premium">
                        {t('hero.discoverArt')} <br />
                        <span className="hero-highlight">{t('hero.handmadeElegance')}</span>
                    </p>
                    <p className="hero-desc-premium">
                        {t('hero.description')}
                    </p>

                    <div className="hero-actions-premium">
                        <button className="premium-cta-btn" onClick={() => navigate('/category/all')}>
                            {t('common.shopNow')}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>

                    <div className="hero-social-premium">
                        <a href="https://www.instagram.com/the.weavers_?igsh=bHM1OHExa3RkZG94" className="premium-social-link" target="_blank" rel="noreferrer">
                            <span className="social-label">Instagram</span>
                        </a>
                        <div className="social-divider"></div>
                        <a href="https://whatsapp.com/channel/0029VbBYaqa8vd1Vf8k0Yp0N" className="premium-social-link" target="_blank" rel="noreferrer">
                            <span className="social-label">WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
