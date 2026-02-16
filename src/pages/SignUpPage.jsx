import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
    const navigate = useNavigate();
    const { signUp, signInWithOAuth } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [confirmationSent, setConfirmationSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setSubmitting(true);
        try {
            const { error: authError, needsConfirmation } = await signUp(
                formData.name,
                formData.email,
                formData.password,
                formData.phone
            );

            if (authError) {
                setError(authError.message || 'Registration failed. Please try again.');
            } else if (needsConfirmation) {
                setConfirmationSent(true);
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (confirmationSent) {
        return (
            <div className="auth-split-screen">
                <div className="auth-brand-panel">
                    <div className="auth-brand-content">
                        <div className="auth-brand-logo">
                            <span className="brand-icon">WV</span>
                            <span className="brand-text">Weaves of Vrinda</span>
                        </div>
                        <h1>Almost There!</h1>
                        <p className="auth-brand-tagline">
                            Just one more step to unlock the world of handcrafted luxury bags.
                        </p>
                    </div>
                    <div className="auth-brand-decoration"></div>
                </div>
                <div className="auth-form-panel">
                    <div className="auth-form-container">
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5">
                                    <path d="M22 2L15 22l-4-9-9-4z" />
                                </svg>
                            </div>
                            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Check Your Email</h1>
                            <p className="auth-subtitle">
                                We've sent a confirmation link to <strong>{formData.email}</strong>.
                                Please click the link in the email to activate your account.
                            </p>
                            <button
                                className="btn-auth-submit"
                                onClick={() => navigate('/auth/signin')}
                                style={{ marginTop: '1.5rem' }}
                            >
                                Go to Sign In
                            </button>
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
                    <h1>Join the Family!</h1>
                    <p className="auth-brand-tagline">
                        Create an account to explore handcrafted luxury bags and exclusive offers.
                    </p>
                    <div className="auth-brand-features">
                        <div className="brand-feature">
                            <span className="feature-icon">🎁</span>
                            <span>Exclusive Member Offers</span>
                        </div>
                        <div className="brand-feature">
                            <span className="feature-icon">📦</span>
                            <span>Track Your Orders</span>
                        </div>
                        <div className="brand-feature">
                            <span className="feature-icon">❤️</span>
                            <span>Save Your Wishlist</span>
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
                        <h2>Sign Up</h2>
                        <p>Create your Weaves of Vrinda account</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                                required
                                disabled={submitting}
                            />
                        </div>

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
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="9876543210"
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
                                placeholder="At least 6 characters"
                                required
                                disabled={submitting}
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                placeholder="Re-enter password"
                                required
                                disabled={submitting}
                            />
                        </div>

                        <button type="submit" className="btn-auth-submit" disabled={submitting}>
                            {submitting ? (
                                <span className="logout-spinner-wrap">
                                    <span className="logout-spinner"></span>
                                    Creating Account...
                                </span>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>

                    <div className="auth-social-separator">Or</div>

                    <div className="auth-social-group">
                        <button
                            className="btn-social-auth google"
                            onClick={() => signInWithOAuth('google')}
                            disabled={submitting}
                        >
                            <svg viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Sign Up with Google
                        </button>
                        <button
                            className="btn-social-auth facebook"
                            onClick={() => signInWithOAuth('facebook')}
                            disabled={submitting}
                        >
                            <svg viewBox="0 0 24 24">
                                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Sign Up with Facebook
                        </button>
                        <button
                            className="btn-social-auth apple"
                            onClick={() => signInWithOAuth('apple')}
                            disabled={submitting}
                        >
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.14 0-1.53-.67-2.88-.67-1.36 0-1.79.65-2.88.67-1.12.02-2.22-.75-3.24-1.66-2.09-1.85-3.66-5.23-3.66-8.15 0-4.88 3.01-7.46 5.86-7.46 1.5 0 2.62.91 3.53.91.87 0 2.16-1.01 3.84-1.01 1.43 0 2.8.53 3.65 1.5-3.32 1.95-2.78 6.4 1.25 8.12-1.22 3.32-3.19 6.75-4.25 8.14zM12.03 5.48c-.03-2.34 1.94-4.33 4.22-4.28.26 2.31-2.08 4.45-4.22 4.28z" />
                            </svg>
                            Sign Up with Apple
                        </button>
                    </div>

                    <p className="auth-footer">
                        Already have an account? <Link to="/auth/signin">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
