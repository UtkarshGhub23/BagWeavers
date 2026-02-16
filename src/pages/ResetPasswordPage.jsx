import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const { updatePassword } = useAuth();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setSubmitting(true);
        try {
            const { error: updateError } = await updatePassword(formData.password);
            if (updateError) {
                setError(updateError.message || 'Failed to reset password');
            } else {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="auth-split-screen">
                <div className="auth-brand-panel">
                    <div className="auth-brand-content">
                        <div className="auth-brand-logo">
                            <span className="brand-icon">BW</span>
                            <span className="brand-text">BagWeavers</span>
                        </div>
                        <h1>All Done!</h1>
                        <p className="auth-brand-tagline">
                            Your password has been updated. Welcome back to BagWeavers!
                        </p>
                    </div>
                    <div className="auth-brand-decoration"></div>
                </div>
                <div className="auth-form-panel">
                    <div className="auth-form-container">
                        <div style={{ textAlign: 'center' }}>
                            <div className="auth-confirmation-icon auth-success-icon">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 12l3 3 5-5" />
                                </svg>
                            </div>
                            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Password Reset!</h1>
                            <p className="auth-subtitle">
                                Your password has been successfully updated.
                            </p>
                            <p className="auth-confirmation-hint">
                                Redirecting you to the homepage...
                            </p>
                            <div className="auth-redirect-bar">
                                <div className="auth-redirect-progress"></div>
                            </div>
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
                    <h1>New Password</h1>
                    <p className="auth-brand-tagline">
                        Choose a strong password to keep your BagWeavers account secure.
                    </p>
                    <div className="auth-brand-features">
                        <div className="brand-feature">
                            <span className="feature-icon">🔑</span>
                            <span>Use 6+ Characters</span>
                        </div>
                        <div className="brand-feature">
                            <span className="feature-icon">🛡️</span>
                            <span>Mix Letters & Numbers</span>
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
                                    <line x1="12" y1="16" x2="12" y2="19" stroke="#C87533" strokeWidth="1.5" />
                                </svg>
                            </div>
                        </div>
                        <h2>Reset Password</h2>
                        <p>Create a new password for your account</p>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="At least 6 characters"
                                required
                                disabled={submitting}
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                placeholder="Re-enter new password"
                                required
                                disabled={submitting}
                            />
                        </div>

                        <button type="submit" className="btn-auth-submit" disabled={submitting}>
                            {submitting ? (
                                <span className="logout-spinner-wrap">
                                    <span className="logout-spinner"></span>
                                    Resetting...
                                </span>
                            ) : (
                                'Reset Password'
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
