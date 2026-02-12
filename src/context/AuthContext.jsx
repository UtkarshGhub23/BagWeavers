import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('bagweavers_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('bagweavers_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('bagweavers_user');
        }
    }, [user]);

    const signIn = (email, password) => {
        // Simulate authentication - in production, this would call an API
        const mockUser = {
            id: Date.now(),
            name: email.split('@')[0],
            email: email,
        };
        setUser(mockUser);
        return mockUser;
    };

    const signUp = (name, email, password, phone) => {
        // Simulate registration - in production, this would call an API
        const newUser = {
            id: Date.now(),
            name,
            email,
            phone,
        };
        setUser(newUser);
        return newUser;
    };

    const signOut = () => {
        setUser(null);
    };

    const value = {
        user,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
