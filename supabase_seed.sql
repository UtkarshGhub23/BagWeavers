-- Seed categories (Same 5 as before)
INSERT INTO categories (id, name, slug, image, count) VALUES
(1, 'Handbags & Clutches', 'handbags-clutches', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80', 45),
(2, 'School bags', 'school-bags', 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=400&q=80', 28),
(3, 'Other Luggage & Bags', 'other-luggage-bags', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80', 32),
(4, 'Accessories bag', 'accessories-bag', 'https://images.unsplash.com/photo-1590874102052-81523c9076b1?auto=format&fit=crop&w=400&q=80', 19),
(5, 'Bottle cover bag', 'bottle-cover-bag', 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=400&q=80', 15)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    image = EXCLUDED.image,
    count = EXCLUDED.count;

-- Seed products (expanded collection)
INSERT INTO products (id, name, category, price, original_price, discount, rating, reviews, images, colors, sizes, description, specifications, in_stock) VALUES
-- Handbags & Clutches
(1, 'Elegant Tote Bag', 'Handbags & Clutches', 1299, 1999, 35, 4.5, 128, ARRAY['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80'], ARRAY['Brown', 'Black', 'Beige'], ARRAY['Small', 'Medium', 'Large'], 'Handcrafted elegant tote bag perfect for daily use. Made with premium quality materials and attention to detail.', '{"material": "Genuine Leather", "dimensions": "35cm x 30cm x 15cm", "weight": "800g", "closure": "Zipper", "pockets": "3 interior, 2 exterior"}', true),
(2, 'Floral Print Handbag', 'Handbags & Clutches', 899, 1499, 40, 4.3, 95, ARRAY['https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'], ARRAY['Multicolor', 'Pink', 'Blue'], ARRAY['Medium'], 'Beautiful floral print handbag that adds a touch of elegance to any outfit. Perfect for casual outings.', '{"material": "Canvas with Leather Trim", "dimensions": "30cm x 25cm x 12cm", "weight": "600g", "closure": "Magnetic Snap", "pockets": "2 interior, 1 exterior"}', true),
(3, 'Classic Black Shoulder Bag', 'Handbags & Clutches', 1599, 2499, 36, 4.7, 203, ARRAY['https://images.unsplash.com/photo-1590874102052-81523c9076b1?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'], ARRAY['Black', 'Brown', 'Navy'], ARRAY['Medium', 'Large'], 'Timeless black shoulder bag suitable for both professional and casual settings. Premium craftsmanship guaranteed.', '{"material": "Premium Synthetic Leather", "dimensions": "32cm x 28cm x 14cm", "weight": "750g", "closure": "Zipper", "pockets": "4 interior, 1 exterior"}', true),
(6, 'Mini Crossbody Bag', 'Handbags & Clutches', 699, 1199, 42, 4.2, 89, ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80'], ARRAY['Pink', 'White', 'Black'], ARRAY['Small'], 'Compact and stylish crossbody bag perfect for essentials. Great for parties and events.', '{"material": "PU Leather", "dimensions": "20cm x 15cm x 8cm", "weight": "300g", "closure": "Zipper", "pockets": "1 interior"}', true),
(7, 'Velvet Evening Clutch', 'Handbags & Clutches', 1499, 2199, 32, 4.8, 56, ARRAY['https://images.unsplash.com/photo-1566150905458-1bf1fd111c36?auto=format&fit=crop&w=800&q=80'], ARRAY['Maroon', 'Midnight Blue', 'Emerald'], ARRAY['XS'], 'Luxury velvet clutch with gold-tone hardware. The perfect companion for formal events.', '{"material": "Velvet & Silk Lining", "dimensions": "22cm x 12cm x 5cm", "weight": "400g", "closure": "Clasp", "pockets": "1 interior"}', true),
-- School bags
(5, 'Colorful Backpack', 'School bags', 999, 1599, 38, 4.4, 187, ARRAY['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'], ARRAY['Blue', 'Red', 'Green', 'Purple'], ARRAY['Small', 'Medium'], 'Vibrant and spacious backpack ideal for school or daily adventures. Comfortable and durable.', '{"material": "Polyester", "dimensions": "40cm x 30cm x 15cm", "weight": "650g", "closure": "Zipper", "pockets": "Multiple compartments"}', true),
(8, 'Ergonomic Laptop Backpack', 'School bags', 2499, 3499, 28, 4.9, 112, ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'], ARRAY['Grey', 'Charcoal'], ARRAY['Large'], 'Professionally designed backpack with padded laptop sleeve and ergonomic back support.', '{"material": "Water-resistant Oxford", "dimensions": "45cm x 32cm x 18cm", "weight": "1100g", "closure": "Hidden Zipper", "pockets": "Laptop sleeve, 5 interior, 2 side"}', true),
-- Other Luggage & Bags
(4, 'Vintage Messenger Bag', 'Other Luggage & Bags', 1799, 2799, 36, 4.6, 156, ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80'], ARRAY['Brown', 'Tan', 'Black'], ARRAY['Medium', 'Large'], 'Vintage-style messenger bag with modern functionality. Perfect for work or travel.', '{"material": "Canvas with Leather Accents", "dimensions": "38cm x 30cm x 12cm", "weight": "900g", "closure": "Buckle and Flap", "pockets": "3 interior, 2 exterior"}', true),
(9, 'Leather Weekend Duffel', 'Other Luggage & Bags', 3999, 5999, 33, 4.8, 42, ARRAY['https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80'], ARRAY['Dark Brown', 'Tan'], ARRAY['Extra Large'], 'Premium leather duffel bag designed for short trips and weekend getaways. Spacious and stylish.', '{"material": "Full Grain Leather", "dimensions": "55cm x 30cm x 28cm", "weight": "1500g", "closure": "Heavy Duty Zipper", "pockets": "Main compartment, 2 side zip"}', true),
-- Accessories bag
(10, 'Bohemian Makeup Pouch', 'Accessories bag', 499, 799, 37, 4.5, 78, ARRAY['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'], ARRAY['Patterned'], ARRAY['Small'], 'Beautifully patterned makeup pouch for organizing your cosmetics and essentials on the go.', '{"material": "Cotton & Linen", "dimensions": "20cm x 12cm x 8cm", "weight": "150g", "closure": "Zipper", "pockets": "1 main"}', true),
-- Bottle cover bag
(11, 'Hand-knitted Bottle Carrier', 'Bottle cover bag', 349, 499, 30, 4.7, 34, ARRAY['https://images.unsplash.com/photo-1602143302325-014d24ee590a?auto=format&fit=crop&w=800&q=80'], ARRAY['Eco-Green', 'Cream'], ARRAY['One Size'], 'Eco-friendly hand-knitted bottle carrier. Perfect for carrying your reusable bottles in style.', '{"material": "Recycled Cotton Yarn", "dimensions": "Fits 750ml-1L bottles", "weight": "100g", "closure": "Drawstring", "pockets": "None"}', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    original_price = EXCLUDED.original_price,
    discount = EXCLUDED.discount,
    rating = EXCLUDED.rating,
    reviews = EXCLUDED.reviews,
    images = EXCLUDED.images,
    colors = EXCLUDED.colors,
    sizes = EXCLUDED.sizes,
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications,
    in_stock = EXCLUDED.in_stock;
