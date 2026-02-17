import { usePreferences } from '../context/PreferencesContext';

export default function TrustSection() {
    const { t } = usePreferences();

    return (
        <section className="trust-section" id="trust-section">
            <div className="trust-grid">
                {/* Secure Payments */}
                <div className="trust-item" id="trust-1">
                    <div className="trust-icon secure-payments">
                        <svg width="50" height="50" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="28" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
                            <rect x="16" y="24" width="32" height="20" rx="3" fill="var(--primary)" opacity="0.15" />
                            <rect x="16" y="24" width="32" height="20" rx="3" fill="none" stroke="var(--primary)" strokeWidth="2" />
                            <rect x="16" y="28" width="32" height="6" fill="var(--primary)" opacity="0.3" />
                            <path d="M48 18 L50 16 L52 26 L42 24 L44 22 C42 18 37 16 32 16 C25 16 20 21 20 28" fill="none" stroke="var(--primary)" strokeWidth="2" />
                            <circle cx="50" cy="20" r="8" fill="#4CAF50" />
                            <path d="M46 20 L49 23 L55 17" fill="none" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                    <p className="trust-label">{t('trust.securePayments')}</p>
                </div>

                {/* Assured Quality */}
                <div className="trust-item" id="trust-2">
                    <div className="trust-icon assured-quality">
                        <svg width="50" height="50" viewBox="0 0 64 64">
                            <path d="M32 4 L38 20 L32 16 L26 20 Z" fill="var(--primary)" opacity="0.3" />
                            <circle cx="32" cy="34" r="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
                            <path d="M32 8 L34 14 L32 12 L30 14 Z" fill="var(--primary)" />
                            <path d="M24 34 L30 40 L42 28" fill="none" stroke="var(--primary)" strokeWidth="3" />
                            <path d="M32 14 C32 14 46 18 46 34 C46 50 32 58 32 58 C32 58 18 50 18 34 C18 18 32 14 32 14Z" fill="none" stroke="var(--primary)" strokeWidth="2" opacity="0.5" />
                        </svg>
                    </div>
                    <p className="trust-label">{t('trust.assuredQuality')}</p>
                </div>

                {/* Made In India */}
                <div className="trust-item" id="trust-3">
                    <div className="trust-icon made-in-india">
                        <svg width="50" height="50" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="24" fill="var(--primary)" opacity="0.1" />
                            <circle cx="32" cy="32" r="24" fill="none" stroke="var(--primary)" strokeWidth="2" />
                            <text x="32" y="26" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--primary)">MADE</text>
                            <text x="32" y="35" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--primary)">IN</text>
                            <text x="32" y="44" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--primary)">INDIA</text>
                            <path d="M15 20 Q32 8 49 20" fill="none" stroke="var(--primary)" strokeWidth="2" />
                            <path d="M15 44 Q32 56 49 44" fill="none" stroke="var(--primary)" strokeWidth="2" />
                        </svg>
                    </div>
                    <p className="trust-label">{t('trust.madeInIndia')}</p>
                </div>

                {/* Timely Delivery */}
                <div className="trust-item" id="trust-4">
                    <div className="trust-icon timely-delivery">
                        <svg width="50" height="50" viewBox="0 0 64 64">
                            <circle cx="18" cy="48" r="5" fill="none" stroke="var(--primary)" strokeWidth="2" />
                            <circle cx="46" cy="48" r="5" fill="none" stroke="var(--primary)" strokeWidth="2" />
                            <path d="M13 43 L13 32 L38 32 L38 43 L51 43 L51 38 L44 28 L38 28 L38 32" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
                            <line x1="23" y1="48" x2="41" y2="48" stroke="var(--primary)" strokeWidth="2" />
                            <rect x="28" y="20" width="6" height="14" rx="1" fill="var(--primary)" opacity="0.3" />
                            <path d="M31 16 L31 28" stroke="var(--primary)" strokeWidth="2" />
                            <path d="M31 22 L36 22" stroke="var(--primary)" strokeWidth="2" />
                        </svg>
                    </div>
                    <p className="trust-label">{t('trust.timelyDelivery')}</p>
                </div>
            </div>
        </section>
    );
}
