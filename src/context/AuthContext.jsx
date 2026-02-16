import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch profile from Supabase profiles table
    const fetchProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
                return null;
            }
            return data;
        } catch (err) {
            console.error('Profile fetch error:', err);
            return null;
        }
    };

    // Initialize auth state and listen for changes
    useEffect(() => {
        // Get initial session
        const initAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    setUser(session.user);
                    const prof = await fetchProfile(session.user.id);
                    setProfile(prof);
                }
            } catch (err) {
                console.error('Auth init error:', err);
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    setUser(session.user);
                    const prof = await fetchProfile(session.user.id);
                    setProfile(prof);
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                    setProfile(null);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) return { error };

        // Fetch profile after sign in
        if (data.user) {
            const prof = await fetchProfile(data.user.id);
            setProfile(prof);
        }
        return { error: null };
    };

    const signUp = async (name, email, password, phone) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name, phone },
            },
        });
        if (error) return { error };

        // If user is auto-confirmed, update profile with phone
        if (data.user && !data.user.identities?.length === 0) {
            // User already exists
            return { error: { message: 'An account with this email already exists.' } };
        }

        // Update profile with phone number if auto-confirmed
        if (data.user && data.session) {
            await supabase
                .from('profiles')
                .update({ name, phone })
                .eq('id', data.user.id);

            const prof = await fetchProfile(data.user.id);
            setProfile(prof);
        }

        return { error: null, needsConfirmation: !data.session };
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Sign out error:', error);
        setUser(null);
        setProfile(null);
    };

    const resetPassword = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });
        return { error };
    };

    const updatePassword = async (newPassword) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        return { error };
    };

    const updateProfile = async (updates) => {
        if (!user) return { error: { message: 'Not authenticated' } };

        const { data, error } = await supabase
            .from('profiles')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)
            .select()
            .single();

        if (error) return { error };

        setProfile(data);
        return { error: null };
    };

    // Build a unified user object from auth + profile
    const currentUser = user
        ? {
            id: user.id,
            email: user.email,
            name: profile?.name || user.user_metadata?.name || user.email?.split('@')[0] || '',
            phone: profile?.phone || user.user_metadata?.phone || '',
            created_at: profile?.created_at || user.created_at,
        }
        : null;

    const value = {
        user: currentUser,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        updateProfile,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
