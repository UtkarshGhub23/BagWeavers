import { helpLinks, shopLinks } from '../data';
import { usePreferences } from '../context/PreferencesContext';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
    const { t } = usePreferences();
    const { theme, setTheme } = useTheme();

    return (
        <footer className="main-footer" id="main-footer">
            <div className="footer-container">
                <div className="footer-top">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <svg viewBox="0 0 60 60" width="65" height="65">
                                <circle cx="30" cy="30" r="28" fill="#f5e642" stroke="#ccc" strokeWidth="1" />
                                <circle cx="30" cy="30" r="22" fill="#fff" opacity="0.5" />
                                <rect x="18" y="18" width="24" height="20" rx="3" fill="none" stroke="#333" strokeWidth="2" />
                                <path d="M22 18 Q22 10 30 10 Q38 10 38 18" fill="none" stroke="#333" strokeWidth="2" />
                                <line x1="30" y1="24" x2="30" y2="30" stroke="#333" strokeWidth="2" />
                                <line x1="27" y1="30" x2="33" y2="30" stroke="#333" strokeWidth="2" />
                            </svg>
                            <span className="footer-logo-text">
                                Bag<i>Weavers</i>
                            </span>
                        </div>
                        <p className="footer-tagline">
                            {t('footer.tagline')}
                        </p>
                        <div className="footer-social">
                            <span>{t('footer.followUs')}</span>
                            <a href="https://www.instagram.com/the.weavers_?igsh=bHM1OHExa3RkZG94" target="_blank" rel="noreferrer" className="social-icon instagram-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="5" />
                                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="footer-links-group">
                        <div className="footer-links">
                            <h3>{t('footer.help')}</h3>
                            <ul>
                                {helpLinks.map((link) => (
                                    <li key={link}>
                                        <a href="#">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h3>{t('footer.shop')}</h3>
                            <ul>
                                {shopLinks.map((link) => (
                                    <li key={link}>
                                        <a href="#">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h3>{t('footer.contact')}</h3>
                            <ul>
                                <li className="contact-item-footer">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="10" r="3" />
                                        <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.05 11.5 7.35 11.76a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8z" />
                                    </svg>
                                    <span>Chowk bazar, Holigate<br />Mathura, UP 281001</span>
                                </li>
                                <li className="contact-item-footer">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <span>+91 9568555951</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <div className="footer-theme-switcher">
                        <button
                            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                            onClick={() => setTheme('light')}
                            title="Light Mode"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        </button>
                        <button
                            className={`theme-btn ${theme === 'system' ? 'active' : ''}`}
                            onClick={() => setTheme('system')}
                            title="System Preference"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                        </button>
                        <button
                            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                            onClick={() => setTheme('dark')}
                            title="Dark Mode"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        </button>
                    </div>

                    <div className="payment-methods">
                        <span>{t('footer.weAccept')}</span>
                        <div className="payment-icons">
                            <span className="payment-badge visa">VISA</span>
                            <span className="payment-badge mastercard">
                                <span className="mc-circle mc-red"></span>
                                <span className="mc-circle mc-yellow"></span>
                            </span>
                            <span className="payment-badge gpay">G Pay</span>
                            <span className="payment-badge bhim">BHIM UPI</span>
                            <span className="payment-badge netbanking">🏦 Net Banking</span>
                            <span className="payment-badge wallet">💳 Wallet</span>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <p>© 2026 BagWeavers. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
