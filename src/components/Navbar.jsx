import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const categories = [
        { name: 'Handbags', path: '/' },
        { name: 'Backpacks', path: '/' },
        { name: 'Crossbody', path: '/' },
        { name: 'Totes', path: '/' },
        { name: 'Clutches', path: '/' },
    ];

    return (
        <nav className="main-nav-minimal">
            <div className="nav-minimal-container">
                {/* Left Navigation */}
                <div className="nav-left">
                    {categories.slice(0, 2).map((category, index) => (
                        <button
                            key={index}
                            className="nav-link-minimal"
                            onClick={() => navigate(category.path)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Center Logo */}
                <div className="nav-center-logo">
                    <button
                        className="nav-logo-btn"
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        <svg viewBox="0 0 60 60" width="40" height="40">
                            <circle cx="30" cy="30" r="28" fill="#f5e642" stroke="#ccc" strokeWidth="1" />
                            <circle cx="30" cy="30" r="22" fill="#fff" opacity="0.5" />
                            <rect x="18" y="18" width="24" height="20" rx="3" fill="none" stroke="#333" strokeWidth="2" />
                            <path d="M22 18 Q22 10 30 10 Q38 10 38 18" fill="none" stroke="#333" strokeWidth="2" />
                            <line x1="30" y1="24" x2="30" y2="30" stroke="#333" strokeWidth="2" />
                            <line x1="27" y1="30" x2="33" y2="30" stroke="#333" strokeWidth="2" />
                        </svg>
                    </button>
                </div>

                {/* Right Navigation */}
                <div className="nav-right">
                    {categories.slice(2).map((category, index) => (
                        <button
                            key={index}
                            className="nav-link-minimal"
                            onClick={() => navigate(category.path)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
