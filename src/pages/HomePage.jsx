import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import TrustSection from '../components/TrustSection';
import Categories from '../components/Categories';

export default function HomePage() {
    return (
        <div className="homepage-reveal-wrapper">
            <div className="reveal"><Hero /></div>
            <div className="reveal"><FeaturedProducts /></div>
            <div className="reveal"><TrustSection /></div>
            <div className="reveal"><Categories /></div>
        </div>
    );
}
