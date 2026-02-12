import { useState, useEffect } from 'react';

export default function Loader() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="loader-overlay">
            <div className="loader">
                <svg viewBox="0 0 80 80">
                    <rect x="8" y="8" width="64" height="64"></rect>
                </svg>
            </div>
            <p className="loader-text">Loading...</p>
        </div>
    );
}
