import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
    const navigate = useNavigate();
    const { signUp } = useAuth();
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

                    <p className="auth-footer">
                        Already have an account? <Link to="/auth/signin">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
