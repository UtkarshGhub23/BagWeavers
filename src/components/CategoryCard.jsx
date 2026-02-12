export default function CategoryCard({ id, image, name }) {
    return (
        <a href="#" className="category-card" id={`cat-${id}`}>
            <div className="category-image">
                <img src={image} alt={name} loading="lazy" />
            </div>
            <p className="category-name">{name}</p>
        </a>
    );
}
