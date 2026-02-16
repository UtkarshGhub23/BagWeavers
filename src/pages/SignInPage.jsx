import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
    const navigate = useNavigate();
    const { signIn, signInWithOAuth } = useAuth();
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

    const handleSocialLogin = async (provider) => {
        setError('');
        setSubmitting(true);
        try {
            const { error } = await signInWithOAuth(provider);
            if (error) {
                if (error.message?.includes('provider is not enabled')) {
                    setError(`Google Sign-in is not yet enabled in your Supabase Dashboard. Please go to Auth > Providers to turn it on.`);
                } else {
                    setError(error.message || `Failed to sign in with ${provider}`);
                }
            }
        } catch (err) {
            setError(`An error occurred during ${provider} sign in.`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-split-screen">
            <div className="auth-brand-panel">
                <div className="auth-brand-content">
                    <div className="auth-brand-logo">
                        <span className="brand-icon">WV</span>
                        <span className="brand-text">Weaves of Vrinda</span>
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

                    <div className="auth-social-separator">Or</div>

                    <div className="auth-social-group">
                        <button
                            className="btn-social-auth google"
                            onClick={() => handleSocialLogin('google')}
                            disabled={submitting}
                        >
                            <svg viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Sign in with Google
                        </button>
                        <button
                            className="btn-social-auth facebook"
                            onClick={() => handleSocialLogin('facebook')}
                            disabled={submitting}
                        >
                            <svg viewBox="0 0 24 24">
                                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Sign in with Facebook
                        </button>
                        <button
                            className="btn-social-auth apple"
                            onClick={() => handleSocialLogin('apple')}
                            disabled={submitting}
                        >
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.14 0-1.53-.67-2.88-.67-1.36 0-1.79.65-2.88.67-1.12.02-2.22-.75-3.24-1.66-2.09-1.85-3.66-5.23-3.66-8.15 0-4.88 3.01-7.46 5.86-7.46 1.5 0 2.62.91 3.53.91.87 0 2.16-1.01 3.84-1.01 1.43 0 2.8.53 3.65 1.5-3.32 1.95-2.78 6.4 1.25 8.12-1.22 3.32-3.19 6.75-4.25 8.14zM12.03 5.48c-.03-2.34 1.94-4.33 4.22-4.28.26 2.31-2.08 4.45-4.22 4.28z" />
                            </svg>
                            Sign in with Apple
                        </button>
                    </div>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/auth/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
