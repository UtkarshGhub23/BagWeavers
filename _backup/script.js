// BagWeavers - Interactive JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // ==== Scroll Reveal Animation ====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .category-card, .trust-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ==== Sticky Header Shadow on Scroll ====
    const header = document.getElementById('top-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // ==== Search Bar Functionality ====
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching for: "${query}"`);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // ==== Location Button ====
    const locationBtn = document.getElementById('location-btn');
    locationBtn.addEventListener('click', () => {
        const pincode = prompt('Enter your pincode to check delivery availability:');
        if (pincode) {
            alert(`Delivery is available at pincode ${pincode}! 🎉`);
        }
    });

    // ==== Cart Button ====
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.addEventListener('click', () => {
        alert('Your cart is empty. Start shopping!');
    });

    // ==== Sign In ====
    const signinLink = document.getElementById('signin-link');
    signinLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Sign in feature coming soon!');
    });

    // ==== Product Card Click ====
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('.product-name').textContent;
            alert(`Opening product: ${name}`);
        });
    });

    // ==== Smooth scroll for navigation ====
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ==== Mobile responsive nav ====
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 200) {
            if (currentScroll > lastScroll) {
                nav.style.transform = 'translateY(-100%)';
                nav.style.transition = 'transform 0.3s ease';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
});
