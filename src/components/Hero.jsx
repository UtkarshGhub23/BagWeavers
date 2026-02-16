import { useState, useEffect } from 'react';
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero" id="hero">
            <div className="hero-container">

                {/* Left: Text Content */}
                <div className="hero-text-content">
                    <h1 className="hero-title">
                        Weaves of <span className="hero-w">Vrinda</span>
                    </h1>
                    <p className="hero-subtitle">
                        {t('hero.discoverArt')} <br />
                        <span className="highlight">{t('hero.handmadeElegance')}</span>
                    </p>
                    <p className="hero-description">
                        {t('hero.description')}
                    </p>


                    <div className="hero-contact">
                        <a href="https://www.instagram.com/the.weavers_?igsh=bHM1OHExa3RkZG94" className="hero-instagram" target="_blank" rel="noreferrer">
                            <div className="insta-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24">
                                    <defs>
                                        <linearGradient id="insta-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                            <stop offset="0%" style={{ stopColor: '#f09433' }} />
                                            <stop offset="25%" style={{ stopColor: '#e6683c' }} />
                                            <stop offset="50%" style={{ stopColor: '#dc2743' }} />
                                            <stop offset="75%" style={{ stopColor: '#cc2366' }} />
                                            <stop offset="100%" style={{ stopColor: '#bc1888' }} />
                                        </linearGradient>
                                    </defs>
                                    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="url(#insta-gradient)" strokeWidth="2" />
                                    <circle cx="12" cy="12" r="5" fill="none" stroke="url(#insta-gradient)" strokeWidth="2" />
                                    <circle cx="17.5" cy="6.5" r="1.5" fill="url(#insta-gradient)" />
                                </svg>
                            </div>
                            <span>Weaves of Vrinda</span>
                        </a>
                        <a href="https://whatsapp.com/channel/0029VbBYaqa8vd1Vf8k0Yp0N" className="hero-whatsapp" target="_blank" rel="noreferrer">
                            <div className="whatsapp-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
                                    <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1.1.2-3.4-.7a11.4 11.4 0 01-4.6-4.1 5.1 5.1 0 01-1.1-2.7 3 3 0 01.9-2.2.9.9 0 01.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.9 2a.5.5 0 010 .5 2 2 0 01-.3.5c-.2.2-.3.3-.5.5s-.4.4-.2.8a11.3 11.3 0 002 2.5 9 9 0 002.9 1.8c.4.2.6.2.8-.1s1-1.1 1.2-1.5.4-.3.7-.2 1.8.9 2.1 1 .6.3.7.4a3 3 0 01-.1 1.4z" />
                                </svg>
                            </div>
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>

                {/* Right: Visual Carousel */}
                <div className="hero-visual-content">
                    <div className="carousel-frame">
                        {heroImages.map((img, index) => (
                            <div
                                key={img}
                                className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${img})` }}
                            ></div>
                        ))}
                    </div>
                    {/* Decorative floating elements */}
                    <div className="float-shape shape-1"></div>
                    <div className="float-shape shape-2"></div>
                </div>
            </div>
        </section>
    );
}
