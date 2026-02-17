import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { usePreferences } from '../context/PreferencesContext';

const SECTIONS = [
    { id: 'account', icon: '🔧', label: 'Account Settings' },
    { id: 'orders', icon: '📦', label: 'Orders & Addresses' },
    { id: 'payment', icon: '💳', label: 'Payment Settings' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'privacy', icon: '🔐', label: 'Privacy & Security' },
    { id: 'preferences', icon: '🎨', label: 'Preferences' },
    { id: 'support', icon: '📞', label: 'Support & Legal' },
];

export default function AccountPage() {
    const navigate = useNavigate();
    const { user, isAuthenticated, updateProfile, updatePassword, signOut } = useAuth();
    const { theme, setTheme } = useTheme();
    const { currency, setCurrency, language, setLanguage, t } = usePreferences();
    const [searchParams] = useSearchParams();
    const [activeSection, setActiveSection] = useState('account');

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && SECTIONS.some(s => s.id === tab)) {
            setActiveSection(tab);
        }
    }, [searchParams]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Password change state
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [passwordSaving, setPasswordSaving] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    // Addresses state
    const [addresses, setAddresses] = useState(() => {
        const saved = localStorage.getItem('bw_addresses');
        return saved ? JSON.parse(saved) : [];
    });
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addressForm, setAddressForm] = useState({
        label: 'Home',
        name: '',
        phone: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false,
    });

    // Notifications state
    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('bw_notifications');
        return saved ? JSON.parse(saved) : {
            orderUpdates: true,
            offers: true,
            newCollection: true,
            whatsapp: false,
            email: true,
        };
    });

    // Persist notifications
    useEffect(() => {
        localStorage.setItem('bw_notifications', JSON.stringify(notifications));
    }, [notifications]);

    // Persist addresses
    useEffect(() => {
        localStorage.setItem('bw_addresses', JSON.stringify(addresses));
    }, [addresses]);

    if (!isAuthenticated) {
        return (
            <div className="auth-page">
                <div className="auth-container">
                    <div className="auth-card" style={{ textAlign: 'center' }}>
                        <div className="account-lock-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                <circle cx="12" cy="16" r="1" />
                            </svg>
                        </div>
                        <h1>Sign In Required</h1>
                        <p className="auth-subtitle">Please sign in to view your settings</p>
                        <button className="btn-auth-submit" onClick={() => navigate('/auth/signin')}>
                            Sign In
                        </button>
                        <p className="auth-footer">
                            Don't have an account? <Link to="/auth/signup">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const { error: updateError } = await updateProfile({
                name: formData.name,
                phone: formData.phone,
            });

            if (updateError) {
                setError(updateError.message || 'Failed to update profile');
            } else {
                setSaved(true);
                setIsEditing(false);
                setTimeout(() => setSaved(false), 3000);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');

        if (passwordData.newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        setPasswordSaving(true);
        try {
            const { error } = await updatePassword(passwordData.newPassword);
            if (error) {
                setPasswordError(error.message || 'Failed to change password');
            } else {
                setPasswordSuccess(true);
                setPasswordData({ newPassword: '', confirmPassword: '' });
                setTimeout(() => setPasswordSuccess(false), 3000);
            }
        } catch (err) {
            setPasswordError('Something went wrong. Please try again.');
        } finally {
            setPasswordSaving(false);
        }
    };

    const handleAddressSave = () => {
        if (!addressForm.name || !addressForm.phone || !addressForm.line1 || !addressForm.city || !addressForm.state || !addressForm.pincode) {
            return;
        }

        let newAddresses;
        if (editingAddress !== null) {
            newAddresses = addresses.map((a, i) => i === editingAddress ? { ...addressForm } : a);
        } else {
            newAddresses = [...addresses, { ...addressForm }];
        }

        // Handle default
        if (addressForm.isDefault) {
            newAddresses = newAddresses.map((a, i) => ({
                ...a,
                isDefault: editingAddress !== null ? i === editingAddress : i === newAddresses.length - 1,
            }));
        }

        setAddresses(newAddresses);
        setShowAddressForm(false);
        setEditingAddress(null);
        setAddressForm({ label: 'Home', name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '', isDefault: false });
    };

    const handleDeleteAddress = (index) => {
        setAddresses(addresses.filter((_, i) => i !== index));
    };

    const handleEditAddress = (index) => {
        setAddressForm(addresses[index]);
        setEditingAddress(index);
        setShowAddressForm(true);
    };

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const memberSince = user.created_at
        ? new Date(user.created_at).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'Recently';

    // ─────────────────────────── RENDER SECTIONS ───────────────────────────

    const renderAccountSettings = () => (
        <div className="settings-section">
            <div className="settings-section-header">
                <h2>Account Settings</h2>
                <p>Manage your personal information and account details</p>
            </div>

            {saved && (
                <div className="account-success-banner">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Profile updated successfully!
                </div>
            )}

            {error && <div className="settings-error">{error}</div>}

            {/* Profile Avatar */}
            <div className="settings-profile-card">
                <div className="settings-avatar">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="settings-profile-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <span className="settings-member-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Member since {memberSince}
                    </span>
                </div>
            </div>

            {/* Edit Personal Info */}
            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>Personal Information</h3>
                    {!isEditing && (
                        <button className="settings-edit-btn" onClick={() => setIsEditing(true)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <form onSubmit={handleSave} className="settings-form">
                        <div className="settings-form-group">
                            <label>Full Name</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your full name" disabled={saving} />
                        </div>
                        <div className="settings-form-group">
                            <label>Email Address</label>
                            <input type="email" value={formData.email} disabled title="Email cannot be changed" className="settings-input-disabled" />
                        </div>
                        <div className="settings-form-group">
                            <label>Phone Number</label>
                            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Your phone number" disabled={saving} />
                        </div>
                        <div className="settings-form-actions">
                            <button type="submit" className="settings-btn-primary" disabled={saving}>
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button type="button" className="settings-btn-secondary" onClick={() => {
                                setIsEditing(false);
                                setError('');
                                setFormData({ name: user.name, email: user.email, phone: user.phone || '' });
                            }} disabled={saving}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className="settings-info-grid">
                        <div className="settings-info-item">
                            <span className="settings-info-label">Full Name</span>
                            <span className="settings-info-value">{user.name}</span>
                        </div>
                        <div className="settings-info-item">
                            <span className="settings-info-label">Email Address</span>
                            <span className="settings-info-value">{user.email}</span>
                        </div>
                        <div className="settings-info-item">
                            <span className="settings-info-label">Phone Number</span>
                            <span className="settings-info-value">{user.phone || 'Not provided'}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Danger Zone */}
            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>Quick Actions</h3>
                </div>
                <div className="settings-quick-actions">
                    <button className="settings-action-btn" onClick={() => navigate('/wishlist')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        My Wishlist
                    </button>
                    <button className="settings-action-btn" onClick={() => navigate('/cart')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        My Cart
                    </button>
                    <button className="settings-action-btn settings-action-logout" onClick={() => navigate('/auth/logout')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );

    const renderOrdersAddresses = () => (
        <div className="settings-section">
            <div className="settings-section-header">
                <h2>Orders & Addresses</h2>
                <p>Manage your saved addresses and shipping preferences</p>
            </div>

            {/* Addresses */}
            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>Saved Addresses</h3>
                    <button className="settings-edit-btn" onClick={() => {
                        setShowAddressForm(true);
                        setEditingAddress(null);
                        setAddressForm({ label: 'Home', name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '', isDefault: false });
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add New
                    </button>
                </div>

                {showAddressForm && (
                    <div className="settings-address-form">
                        <div className="settings-form-row">
                            <div className="settings-form-group">
                                <label>Label</label>
                                <select value={addressForm.label} onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}>
                                    <option value="Home">🏠 Home</option>
                                    <option value="Work">💼 Work</option>
                                    <option value="Other">📍 Other</option>
                                </select>
                            </div>
                            <div className="settings-form-group">
                                <label>Full Name</label>
                                <input type="text" value={addressForm.name} onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })} placeholder="Recipient name" />
                            </div>
                        </div>
                        <div className="settings-form-group">
                            <label>Phone Number</label>
                            <input type="tel" value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} placeholder="10-digit phone number" />
                        </div>
                        <div className="settings-form-group">
                            <label>Address Line 1</label>
                            <input type="text" value={addressForm.line1} onChange={(e) => setAddressForm({ ...addressForm, line1: e.target.value })} placeholder="House no., Building, Street" />
                        </div>
                        <div className="settings-form-group">
                            <label>Address Line 2 (Optional)</label>
                            <input type="text" value={addressForm.line2} onChange={(e) => setAddressForm({ ...addressForm, line2: e.target.value })} placeholder="Landmark, Area" />
                        </div>
                        <div className="settings-form-row">
                            <div className="settings-form-group">
                                <label>City</label>
                                <input type="text" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} placeholder="City" />
                            </div>
                            <div className="settings-form-group">
                                <label>State</label>
                                <input type="text" value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} placeholder="State" />
                            </div>
                            <div className="settings-form-group">
                                <label>Pincode</label>
                                <input type="text" value={addressForm.pincode} onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })} placeholder="6-digit code" />
                            </div>
                        </div>
                        <label className="settings-checkbox-label">
                            <input type="checkbox" checked={addressForm.isDefault} onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })} />
                            Set as default shipping address
                        </label>
                        <div className="settings-form-actions">
                            <button className="settings-btn-primary" onClick={handleAddressSave}>
                                {editingAddress !== null ? 'Update Address' : 'Save Address'}
                            </button>
                            <button className="settings-btn-secondary" onClick={() => { setShowAddressForm(false); setEditingAddress(null); }}>Cancel</button>
                        </div>
                    </div>
                )}

                {addresses.length === 0 && !showAddressForm ? (
                    <div className="settings-empty-state">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <p>No saved addresses yet</p>
                        <span>Add an address for faster checkout</span>
                    </div>
                ) : (
                    <div className="settings-address-list">
                        {addresses.map((addr, i) => (
                            <div key={i} className={`settings-address-card ${addr.isDefault ? 'default' : ''}`}>
                                <div className="settings-address-top">
                                    <span className="settings-address-label">
                                        {addr.label === 'Home' ? '🏠' : addr.label === 'Work' ? '💼' : '📍'} {addr.label}
                                    </span>
                                    {addr.isDefault && <span className="settings-default-badge">Default</span>}
                                </div>
                                <p className="settings-address-name">{addr.name}</p>
                                <p className="settings-address-line">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                                <p className="settings-address-line">{addr.city}, {addr.state} - {addr.pincode}</p>
                                <p className="settings-address-phone">📞 {addr.phone}</p>
                                <div className="settings-address-actions">
                                    <button onClick={() => handleEditAddress(i)}>Edit</button>
                                    <button onClick={() => handleDeleteAddress(i)} className="settings-delete-btn">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Order History */}
            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>Order History</h3>
                </div>
                <div className="settings-empty-state">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <p>No orders yet</p>
                    <span>Your order history will appear here</span>
                    <button className="settings-btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('/')}>
                        Start Shopping
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPaymentSettings = () => (
        <div className="settings-section">
            <div className="settings-section-header">
                <h2>Payment Settings</h2>
                <p>Manage your payment methods and preferences</p>
            </div>

            <div className="settings-card">
                <div className="settings-coming-soon">
                    <div className="settings-coming-soon-icon">
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                            <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                    </div>
                    <h3>Coming Soon</h3>
                    <p>We're working on adding saved payment methods including UPI, cards, and wallets for faster checkout.</p>
                    <div className="settings-coming-soon-features">
                        <span>💳 Saved Cards</span>
                        <span>📱 UPI Payments</span>
                        <span>👛 Wallets</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="settings-section">
            <div className="settings-section-header">
                <h2>Notification Settings</h2>
                <p>Control how and when you receive updates</p>
            </div>

            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>Email & Push</h3>
                </div>
                <div className="settings-toggle-list">
                    <div className="settings-toggle-item">
                        <div className="settings-toggle-info">
                            <span className="settings-toggle-label">Order Updates</span>
                            <span className="settings-toggle-desc">Receive updates on order status, shipping & delivery</span>
                        </div>
                        <label className="settings-toggle">
                            <input type="checkbox" checked={notifications.orderUpdates} onChange={() => toggleNotification('orderUpdates')} />
                            <span className="settings-toggle-slider"></span>
                        </label>
                    </div>

                    <div className="settings-toggle-item">
                        <div className="settings-toggle-info">
                            <span className="settings-toggle-label">Offers & Discounts</span>
                            <span className="settings-toggle-desc">Get notified about sales, coupons & special deals</span>
                        </div>
                        <label className="settings-toggle">
                            <input type="checkbox" checked={notifications.offers} onChange={() => toggleNotification('offers')} />
                            <span className="settings-toggle-slider"></span>
                        </label>
                    </div>

                    <div className="settings-toggle-item">
                        <div className="settings-toggle-info">
                            <span className="settings-toggle-label">New Collection Alerts</span>
                            <span className="settings-toggle-desc">Be the first to know about new bag collections</span>
                        </div>
                        <label className="settings-toggle">
                            <input type="checkbox" checked={notifications.newCollection} onChange={() => toggleNotification('newCollection')} />
                            <span className="settings-toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>Communication Channels</h3>
                </div>
                <div className="settings-toggle-list">
                    <div className="settings-toggle-item">
                        <div className="settings-toggle-info">
                            <span className="settings-toggle-label">WhatsApp Notifications</span>
                            <span className="settings-toggle-desc">Receive order updates on WhatsApp</span>
                        </div>
                        <label className="settings-toggle">
                            <input type="checkbox" checked={notifications.whatsapp} onChange={() => toggleNotification('whatsapp')} />
                            <span className="settings-toggle-slider"></span>
                        </label>
                    </div>

                    <div className="settings-toggle-item">
                        <div className="settings-toggle-info">
                            <span className="settings-toggle-label">Email Notifications</span>
                            <span className="settings-toggle-desc">Receive all notifications via email</span>
                        </div>
                        <label className="settings-toggle">
                            <input type="checkbox" checked={notifications.email} onChange={() => toggleNotification('email')} />
                            <span className="settings-toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPrivacySecurity = () => (
        <div className="settings-section">
            <div className="settings-section-header">
                <h2>Privacy & Security</h2>
                <p>Manage your account security and privacy preferences</p>
            </div>

            {/* Change Password */}
            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>Change Password</h3>
                </div>

                {passwordSuccess && (
                    <div className="account-success-banner">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Password changed successfully!
                    </div>
                )}

                {passwordError && <div className="settings-error">{passwordError}</div>}

                <form onSubmit={handlePasswordChange} className="settings-form">
                    <div className="settings-form-group">
                        <label>New Password</label>
                        <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} placeholder="At least 6 characters" disabled={passwordSaving} />
                    </div>
                    <div className="settings-form-group">
                        <label>Confirm New Password</label>
                        <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} placeholder="Re-enter new password" disabled={passwordSaving} />
                    </div>
                    <button type="submit" className="settings-btn-primary" disabled={passwordSaving}>
                        {passwordSaving ? 'Changing...' : 'Change Password'}
                    </button>
                </form>
            </div>

            {/* Two-Factor Auth */}
            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>Two-Factor Authentication</h3>
                </div>
                <div className="settings-coming-soon" style={{ padding: '24px 0' }}>
                    <div className="settings-coming-soon-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <h3>Coming Soon</h3>
                    <p>Enhanced security with 2FA will be available soon</p>
                </div>
            </div>

            {/* Login Activity */}
            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>Login Activity</h3>
                </div>
                <div className="settings-device-item">
                    <div className="settings-device-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                    </div>
                    <div className="settings-device-info">
                        <span className="settings-device-name">Current Device</span>
                        <span className="settings-device-detail">Active now · {new Date().toLocaleDateString('en-IN')}</span>
                    </div>
                    <span className="settings-active-badge">Active</span>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="settings-card settings-danger-card">
                <div className="settings-card-top">
                    <h3>Danger Zone</h3>
                </div>
                <div className="settings-danger-actions">
                    <div className="settings-danger-item">
                        <div>
                            <span className="settings-danger-label">Delete Account</span>
                            <span className="settings-danger-desc">Permanently delete your account and all data</span>
                        </div>
                        <button className="settings-btn-danger">Delete Account</button>
                    </div>
                    <div className="settings-danger-item">
                        <div>
                            <span className="settings-danger-label">Download My Data</span>
                            <span className="settings-danger-desc">Request a copy of all your account data</span>
                        </div>
                        <button className="settings-btn-secondary">Request Data</button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPreferences = () => (
        <div className="settings-section">
            <div className="settings-section-header">
                <h2>{t('settings.preferences')}</h2>
                <p>{t('settings.preferencesDesc')}</p>
            </div>

            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>{t('settings.display')}</h3>
                </div>
                <div className="settings-toggle-list">
                    <div className="settings-toggle-item">
                        <div className="settings-toggle-info">
                            <span className="settings-toggle-label">{t('settings.darkMode')}</span>
                            <span className="settings-toggle-desc">{t('settings.darkModeDesc')}</span>
                        </div>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="settings-select"
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        >
                            <option value="light">☀️ Light</option>
                            <option value="dark">🌙 Dark</option>
                            <option value="system">💻 System</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>{t('settings.regional')}</h3>
                </div>
                <div className="settings-form">
                    <div className="settings-form-group">
                        <label>{t('settings.language')}</label>
                        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option value="en">🇬🇧 English</option>
                            <option value="hi">🇮🇳 Hindi</option>
                            <option value="mr">🇮🇳 Marathi</option>
                        </select>
                    </div>
                    <div className="settings-form-group">
                        <label>{t('settings.currency')}</label>
                        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <option value="INR">🇮🇳 INR (₹)</option>
                            <option value="USD">🇺🇸 USD ($)</option>
                            <option value="EUR">🇪🇺 EUR (€)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSupportLegal = () => (
        <div className="settings-section">
            <div className="settings-section-header">
                <h2>Support & Legal</h2>
                <p>Get help and read our policies</p>
            </div>

            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>Support</h3>
                </div>
                <div className="settings-link-list">
                    <button className="settings-link-item" onClick={() => navigate('/contact')}>
                        <div className="settings-link-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <div className="settings-link-text">
                            <span>Contact Support</span>
                            <span className="settings-link-desc">Get help from our team</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>

                    <button className="settings-link-item" onClick={() => navigate('/contact')}>
                        <div className="settings-link-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>
                        <div className="settings-link-text">
                            <span>FAQs</span>
                            <span className="settings-link-desc">Frequently asked questions</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="settings-card">
                <div className="settings-card-top">
                    <h3>Legal</h3>
                </div>
                <div className="settings-link-list">
                    <div className="settings-link-item">
                        <div className="settings-link-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="1 4 1 10 7 10" />
                                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                            </svg>
                        </div>
                        <div className="settings-link-text">
                            <span>Return & Refund Policy</span>
                            <span className="settings-link-desc">Our return and refund terms</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>

                    <div className="settings-link-item">
                        <div className="settings-link-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <div className="settings-link-text">
                            <span>Privacy Policy</span>
                            <span className="settings-link-desc">How we handle your data</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>

                    <div className="settings-link-item">
                        <div className="settings-link-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                        </div>
                        <div className="settings-link-text">
                            <span>Terms & Conditions</span>
                            <span className="settings-link-desc">Terms of service</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>

                    <div className="settings-link-item">
                        <div className="settings-link-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                        </div>
                        <div className="settings-link-text">
                            <span>About Us</span>
                            <span className="settings-link-desc">Learn more about BagWeavers</span>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );

    const SECTION_RENDERERS = {
        account: renderAccountSettings,
        orders: renderOrdersAddresses,
        payment: renderPaymentSettings,
        notifications: renderNotifications,
        privacy: renderPrivacySecurity,
        preferences: renderPreferences,
        support: renderSupportLegal,
    };

    return (
        <div className="settings-page">
            <div className="settings-layout">
                {/* Sidebar */}
                <aside className="settings-sidebar">
                    <div className="settings-sidebar-header">
                        <div className="settings-sidebar-avatar">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="settings-sidebar-info">
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <nav className="settings-sidebar-nav">
                        {SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                <span className="settings-nav-icon">{section.icon}</span>
                                <span className="settings-nav-label">{section.label}</span>
                                {activeSection === section.id && (
                                    <svg className="settings-nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content Panel */}
                <main className="settings-content">
                    {SECTION_RENDERERS[activeSection]()}
                </main>
            </div>
        </div>
    );
}
