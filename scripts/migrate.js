import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { products, categories } from '../src/data/products.js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing environment variables in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
    console.log('Starting migration...');

    // 1. Clear existing data (optional, but good for idempotency)
    // Note: Only if RLS allows or if using service role key.
    // Using anon key might fail here if delete isn't allowed.

    // 2. Migrate Categories
    console.log('Migrating categories...');
    for (const category of categories) {
        const { error } = await supabase
            .from('categories')
            .upsert({
                id: category.id,
                name: category.name,
                slug: category.slug,
                image: category.image,
                count: category.count
            });

        if (error) console.error(`Error migrating category ${category.name}:`, error.message);
    }

    // 3. Migrate Products
    console.log('Migrating products...');
    for (const product of products) {
        const { error } = await supabase
            .from('products')
            .upsert({
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                original_price: product.originalPrice,
                discount: product.discount,
                rating: product.rating,
                reviews: product.reviews,
                images: product.images,
                colors: product.colors,
                sizes: product.sizes,
                description: product.description,
                specifications: product.specifications,
                in_stock: product.inStock
            });

        if (error) console.error(`Error migrating product ${product.name}:`, error.message);
    }

    console.log('Migration completed!');
}

migrate();
