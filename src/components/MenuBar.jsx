import { Link } from 'react-router-dom';
import { usePreferences } from '../context/PreferencesContext';

export default function MenuBar() {
    const { t } = usePreferences();

    return (
        <nav className="menu-bar">
            <div className="menu-bar-container">
                <div className="menu-bar-left">
                    <Link to="/" className="menu-bar-brand">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Weaves of Vrinda
                    </Link>
                    <Link to="/" className="menu-bar-link">
                        {t('menu.allCollections')}
                    </Link>
                    <Link to="/category/handbags" className="menu-bar-link">
                        {t('menu.handbags')}
                    </Link>
                    <Link to="/category/backpacks" className="menu-bar-link">
                        {t('menu.backpacks')}
                    </Link>
                    <Link to="/category/crossbody" className="menu-bar-link">
                        {t('menu.crossbody')}
                    </Link>
                    <Link to="/category/totes" className="menu-bar-link">
                        {t('menu.totes')}
                    </Link>
                    <Link to="/category/clutches" className="menu-bar-link">
                        {t('menu.clutches')}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
