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
                <span><span></span><span></span><span></span><span></span></span>
                <div className="base">
                    <span></span>
                    <div className="face"></div>
                </div>
            </div>
            <div className="longfazers">
                <span></span><span></span><span></span><span></span>
            </div>
            <p className="loader-text">Loading...</p>
        </div>
    );
}
