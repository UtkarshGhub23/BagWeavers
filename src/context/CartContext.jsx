import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('bagweavers_cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('bagweavers_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
        setCartItems(prev => {
            const existingItem = prev.find(
                item => item.id === product.id &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
            );

            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id &&
                        item.selectedSize === selectedSize &&
                        item.selectedColor === selectedColor
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, { ...product, quantity, selectedSize, selectedColor }];
        });
    };

    const removeFromCart = (productId, selectedSize, selectedColor) => {
        setCartItems(prev => prev.filter(
            item => !(item.id === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor)
        ));
    };

    const updateQuantity = (productId, selectedSize, selectedColor, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId, selectedSize, selectedColor);
            return;
        }

        setCartItems(prev =>
            prev.map(item =>
                item.id === productId &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
