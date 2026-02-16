import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LogoutPage() {
    const navigate = useNavigate();
    const { signOut, isAuthenticated } = useAuth();
    const [loggingOut, setLoggingOut] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!isAuthenticated && !loggingOut && !done) {
            navigate('/');
        }
    }, [isAuthenticated, loggingOut, done, navigate]);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            // Small delay for visual feedback
            await new Promise((r) => setTimeout(r, 600));
            await signOut();
            setDone(true);
            setTimeout(() => {
                navigate('/');
            }, 1800);
        } catch (err) {
            console.error('Logout error:', err);
            setLoggingOut(false);
        }
    };

    if (done) {
        return (
            <div className="auth-page">
                <div className="auth-container">
                    <div className="auth-card logout-card">
                        <div className="logout-success-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h1>See You Soon!</h1>
                        <p className="auth-subtitle">You've been signed out successfully.</p>
                        <p className="logout-redirect-text">Redirecting to home page...</p>
                        <div className="logout-progress-bar">
                            <div className="logout-progress-fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-split-screen">
            <div className="auth-brand-panel">
                <div className="auth-brand-content">
                    <div className="auth-brand-logo">
                        <span className="brand-icon">BW</span>
                        <span className="brand-text">BagWeavers</span>
                    </div>
                    <h1>See You Soon!</h1>
                    <p className="auth-brand-tagline">
                        We hope to see you back for more handcrafted luxury bags.
                    </p>
                    <div className="auth-brand-features">
                        <div className="brand-feature">
                            <span className="feature-icon">✨</span>
                            <span>New Arrivals Weekly</span>
                        </div>
                        <div className="brand-feature">
                            <span className="feature-icon">🎁</span>
                            <span>Exclusive Offers</span>
                        </div>
                    </div>
                </div>
                <div className="auth-brand-decoration"></div>
            </div>

            <div className="auth-form-panel">
                <div className="auth-form-container">
                    <button onClick={() => navigate('/')} className="auth-back-home">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back to Home
                    </button>
                    <div className="auth-card logout-card" style={{ maxWidth: '100%', border: 'none', boxShadow: 'none', padding: 0 }}>
                        <div className="logout-icon">
                            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#C87533" strokeWidth="1.5">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </div>
                        <h1>Leaving So Soon?</h1>
                        <p className="auth-subtitle">Are you sure you want to sign out of your BagWeavers account?</p>

                        <div className="logout-actions">
                            <button
                                className="btn-auth-submit btn-logout-confirm"
                                onClick={handleLogout}
                                disabled={loggingOut}
                            >
                                {loggingOut ? (
                                    <span className="logout-spinner-wrap">
                                        <span className="logout-spinner"></span>
                                        Signing Out...
                                    </span>
                                ) : (
                                    'Yes, Sign Out'
                                )}
                            </button>
                            <button
                                className="btn-logout-cancel"
                                onClick={() => navigate(-1)}
                                disabled={loggingOut}
                            >
                                No, Stay Signed In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
