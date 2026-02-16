import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ForgotPasswordPage() {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setSubmitting(true);
        try {
            const { error: resetError } = await resetPassword(email);
            if (resetError) {
                setError(resetError.message || 'Failed to send reset email');
            } else {
                setSent(true);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (sent) {
        return (
            <div className="auth-split-screen">
                <div className="auth-brand-panel">
                    <div className="auth-brand-content">
                        <div className="auth-brand-logo">
                            <span className="brand-icon">BW</span>
                            <span className="brand-text">BagWeavers</span>
                        </div>
                        <h1>Check Your Inbox</h1>
                        <p className="auth-brand-tagline">
                            We've sent you a password reset link. You'll be back in no time!
                        </p>
                    </div>
                    <div className="auth-brand-decoration"></div>
                </div>
                <div className="auth-form-panel">
                    <div className="auth-form-container">
                        <div style={{ textAlign: 'center' }}>
                            <div className="auth-confirmation-icon">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C87533" strokeWidth="1.5">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M22 4L12 13L2 4" />
                                </svg>
                            </div>
                            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Check Your Email</h1>
                            <p className="auth-subtitle">
                                We've sent a password reset link to
                            </p>
                            <p className="auth-confirmation-email">{email}</p>
                            <p className="auth-confirmation-hint">
                                Click the link in the email to reset your password. If you don't see it, check your spam folder.
                            </p>

                            <button
                                className="btn-auth-submit btn-auth-secondary"
                                onClick={() => { setSent(false); setEmail(''); }}
                            >
                                Try a different email
                            </button>

                            <p className="auth-footer">
                                Remember your password? <Link to="/auth/signin">Sign In</Link>
                            </p>
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
                    <h1>Don't Worry!</h1>
                    <p className="auth-brand-tagline">
                        It happens to the best of us. We'll help you get back into your account.
                    </p>
                    <div className="auth-brand-features">
                        <div className="brand-feature">
                            <span className="feature-icon">🔒</span>
                            <span>Secure Reset Process</span>
                        </div>
                        <div className="brand-feature">
                            <span className="feature-icon">⚡</span>
                            <span>Instant Email Delivery</span>
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
                        <div className="auth-icon-header">
                            <div className="auth-lock-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C87533" strokeWidth="1.5">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    <circle cx="12" cy="16" r="1" fill="#C87533" />
                                </svg>
                            </div>
                        </div>
                        <h2>Forgot Password?</h2>
                        <p>No worries! Enter your email and we'll send you a reset link.</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                disabled={submitting}
                                autoFocus
                            />
                        </div>

                        <button type="submit" className="btn-auth-submit" disabled={submitting}>
                            {submitting ? (
                                <span className="logout-spinner-wrap">
                                    <span className="logout-spinner"></span>
                                    Sending...
                                </span>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>

                    <p className="auth-footer">
                        <Link to="/auth/signin" className="auth-back-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Back to Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
