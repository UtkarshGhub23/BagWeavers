import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setSubmitting(true);
        try {
            const { error: authError } = await signIn(formData.email, formData.password);
            if (authError) {
                setError(authError.message || 'Invalid email or password');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-split-screen">
            <div className="auth-brand-panel">
                <div className="auth-brand-content">
                    <div className="auth-brand-logo">
                        <span className="brand-icon">BW</span>
                        <span className="brand-text">BagWeavers</span>
                    </div>
                    <h1>Welcome Back!</h1>
                    <p className="auth-brand-tagline">
                        Discover the finest handcrafted bags, made with passion and precision.
                    </p>
                    <div className="auth-brand-features">
                        <div className="brand-feature">
                            <span className="feature-icon">✨</span>
                            <span>100% Handcrafted</span>
                        </div>
                        <div className="brand-feature">
                            <span className="feature-icon">🛡️</span>
                            <span>Premium Quality</span>
                        </div>
                        <div className="brand-feature">
                            <span className="feature-icon">🚚</span>
                            <span>Fast Delivery</span>
                        </div>
                    </div>
                </div>
                <div className="auth-brand-decoration"></div>
            </div>

            <div className="auth-form-panel">
                <div className="auth-form-container">
                    <Link to="/" className="auth-back-home">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back to Home
                    </Link>
                    <div className="auth-header">
                        <h2>Sign In</h2>
                        <p>Access your account to manage orders and wishlist</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="your@email.com"
                                required
                                disabled={submitting}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Enter your password"
                                required
                                disabled={submitting}
                            />
                        </div>

                        <div className="auth-forgot-link-wrap">
                            <Link to="/auth/forgot-password" className="auth-forgot-link">
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className="btn-auth-submit" disabled={submitting}>
                            {submitting ? (
                                <span className="logout-spinner-wrap">
                                    <span className="logout-spinner"></span>
                                    Signing In...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/auth/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
