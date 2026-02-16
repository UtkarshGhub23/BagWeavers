import { useState } from 'react';

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormSubmitted(false), 4000);
    };

    const faqs = [
        {
            q: 'How can I track my order?',
            a: 'Once your order is shipped, you will receive an email and WhatsApp notification with the tracking link. You can also check your order status from the "My Account" section.'
        },
        {
            q: 'What is your return & exchange policy?',
            a: 'We accept returns within 7 days of delivery. The product must be unused and in its original packaging. Contact our support team to initiate a return or exchange.'
        },
        {
            q: 'How long does delivery take?',
            a: 'Standard delivery takes 5-7 business days across India. For expedited shipping, please contact us on WhatsApp and we\'ll arrange it for you.'
        },
        {
            q: 'Are your bags genuinely handmade?',
            a: 'Yes! Every BagWeavers product is handcrafted by skilled artisans in Mathura, Uttar Pradesh. Each bag is unique and crafted with premium quality materials.'
        },
        {
            q: 'Can I get a custom bag design?',
            a: 'Absolutely! We offer custom orders. Please reach out to us via WhatsApp or email with your requirements, and our design team will work with you to create your perfect bag.'
        },
        {
            q: 'What payment methods do you accept?',
            a: 'We accept all major payment methods including Visa, Mastercard, Google Pay, BHIM UPI, Net Banking, and digital wallets.'
        }
    ];

    return (
        <div className="support-page">
            {/* Hero Section */}
            <div className="support-hero">
                <div className="support-hero-content">
                    <span className="support-hero-badge">We're here for you</span>
                    <h1>How can we help?</h1>
                    <p>Our support team is always ready to assist you. Reach out to us through any of the channels below.</p>
                </div>
            </div>

            <div className="support-container">
                {/* Contact Cards */}
                <section className="support-contact-grid">
                    <div className="support-contact-card">
                        <div className="support-card-icon support-card-icon-phone">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <h3>Call Us</h3>
                        <p className="support-card-detail">+91 9568555951</p>
                        <p className="support-card-time">Mon – Sat, 10 AM – 7 PM IST</p>
                        <a href="tel:+919568555951" className="support-card-action">Call Now →</a>
                    </div>

                    <div className="support-contact-card">
                        <div className="support-card-icon support-card-icon-whatsapp">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </div>
                        <h3>WhatsApp</h3>
                        <p className="support-card-detail">+91 9568555951</p>
                        <p className="support-card-time">Quick response within 30 mins</p>
                        <a href="https://wa.me/919568555951?text=Hi%20BagWeavers%2C%20I%20need%20help%20with%20my%20order" target="_blank" rel="noreferrer" className="support-card-action">Chat on WhatsApp →</a>
                    </div>

                    <div className="support-contact-card">
                        <div className="support-card-icon support-card-icon-email">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <h3>Email Us</h3>
                        <p className="support-card-detail">support@bagweavers.com</p>
                        <p className="support-card-time">We reply within 24 hours</p>
                        <a href="mailto:support@bagweavers.com" className="support-card-action">Send Email →</a>
                    </div>

                    <div className="support-contact-card">
                        <div className="support-card-icon support-card-icon-location">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="10" r="3" />
                                <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.05 11.5 7.35 11.76a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8z" />
                            </svg>
                        </div>
                        <h3>Visit Us</h3>
                        <p className="support-card-detail">Chowk Bazar, Holigate</p>
                        <p className="support-card-time">Mathura, UP 281001, India</p>
                        <a href="https://maps.google.com/?q=Chowk+Bazar+Holigate+Mathura+UP+281001" target="_blank" rel="noreferrer" className="support-card-action">Get Directions →</a>
                    </div>
                </section>

                {/* Support Team */}
                <section className="support-team-section">
                    <div className="support-section-header">
                        <h2>Meet Our Support Team</h2>
                        <p>Dedicated professionals committed to making your BagWeavers experience perfect.</p>
                    </div>
                    <div className="support-team-grid">
                        <div className="support-team-card">
                            <div className="support-team-avatar">
                                {/* To add photo: place image in public/team/ and uncomment the img tag */}
                                {/* <img src="/BagWeavers/team/utkarsh.jpg" alt="Utkarsh Tripathi" /> */}
                                <span className="support-team-initials">UT</span>
                            </div>
                            <h4>Utkarsh Tripathi</h4>
                            <span className="support-team-role">Founder & Lead</span>
                            <p>Oversees all operations, product quality, and strategic direction of BagWeavers.</p>
                        </div>
                        <div className="support-team-card">
                            <div className="support-team-avatar">
                                {/* <img src="/BagWeavers/team/khushboo.jpg" alt="Khushboo Agrawal" /> */}
                                <span className="support-team-initials">KA</span>
                            </div>
                            <h4>Khushboo Agrawal</h4>
                            <span className="support-team-role">Customer Support</span>
                            <p>Handles order inquiries, returns, and ensures every customer has a great experience.</p>
                        </div>
                        <div className="support-team-card">
                            <div className="support-team-avatar">
                                {/* <img src="/BagWeavers/team/shivangi.jpg" alt="Shivangi Soni" /> */}
                                <span className="support-team-initials">SS</span>
                            </div>
                            <h4>Shivangi Soni</h4>
                            <span className="support-team-role">Product Specialist</span>
                            <p>Expert in bag materials, care instructions, and custom order consultations.</p>
                        </div>
                        <div className="support-team-card">
                            <div className="support-team-avatar">
                                {/* <img src="/BagWeavers/team/vansh.jpg" alt="Vansh Agrawal" /> */}
                                <span className="support-team-initials">VA</span>
                            </div>
                            <h4>Vansh Agrawal</h4>
                            <span className="support-team-role">Shipping & Logistics</span>
                            <p>Manages deliveries, tracking, and ensures your orders arrive safely on time.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="support-faq-section">
                    <div className="support-section-header">
                        <h2>Frequently Asked Questions</h2>
                        <p>Quick answers to the most common questions about orders, shipping, and products.</p>
                    </div>
                    <div className="support-faq-list">
                        {faqs.map((faq, i) => (
                            <div className={`support-faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
                                <button className="support-faq-question" onClick={() => toggleFaq(i)}>
                                    <span>{faq.q}</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`support-faq-chevron ${openFaq === i ? 'open' : ''}`}>
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                {openFaq === i && (
                                    <div className="support-faq-answer">
                                        <p>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section className="support-form-section">
                    <div className="support-section-header">
                        <h2>Send Us a Message</h2>
                        <p>Can't find what you're looking for? Drop us a message and we'll get back to you.</p>
                    </div>

                    {formSubmitted && (
                        <div className="support-form-success">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Message sent successfully! We'll get back to you within 24 hours.</span>
                        </div>
                    )}

                    <form className="support-form" onSubmit={handleSubmit}>
                        <div className="support-form-row">
                            <div className="support-form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="support-form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="support-form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                placeholder="What is this about?"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                            />
                        </div>
                        <div className="support-form-group">
                            <label>Message</label>
                            <textarea
                                rows="5"
                                placeholder="Describe your issue or question..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="support-form-submit">
                            Send Message
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </form>
                </section>

                {/* Working Hours */}
                <section className="support-hours-section">
                    <div className="support-hours-card">
                        <div className="support-hours-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <div className="support-hours-info">
                            <h3>Business Hours</h3>
                            <div className="support-hours-grid">
                                <div className="support-hours-row">
                                    <span className="support-hours-day">Monday – Friday</span>
                                    <span className="support-hours-time">10:00 AM – 7:00 PM IST</span>
                                </div>
                                <div className="support-hours-row">
                                    <span className="support-hours-day">Saturday</span>
                                    <span className="support-hours-time">10:00 AM – 5:00 PM IST</span>
                                </div>
                                <div className="support-hours-row">
                                    <span className="support-hours-day">Sunday</span>
                                    <span className="support-hours-time closed">Closed</span>
                                </div>
                            </div>
                            <p className="support-hours-note">WhatsApp support is available 24/7 for urgent queries.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
