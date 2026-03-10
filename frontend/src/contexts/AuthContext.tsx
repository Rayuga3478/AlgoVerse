import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';

interface AppUser {
    firebaseUid: string;
    email: string;
    name: string;
    avatarUrl?: string; // New field for profile picture
    searchHistory: { prompt: string; timestamp: string }[];
}

interface AuthContextType {
    user: AppUser | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
    updateProfile: (name?: string, avatarUrl?: string) => Promise<void>; // New updater function
    deleteHistoryItem: (timestamp: string) => Promise<void>; // Delete a search history item
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
    refreshUser: async () => { },
    updateProfile: async () => { },
    deleteHistoryItem: async () => { }
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [user, setUser] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchAppUser = async (fUser: User) => {
        try {
            const res = await fetch('http://localhost:5000/api/user/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firebaseUid: fUser.uid,
                    email: fUser.email,
                    name: fUser.displayName || 'User'
                })
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Failed to sync user with backend:', error);
            setUser(null);
        }
    };

    useEffect(() => {
        // If auth is mocked (no keys), immediately stop loading and return
        if (!auth || !auth.name) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setFirebaseUser(user);
            if (user) {
                await fetchAppUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        await firebaseSignOut(auth);
        setUser(null);
    };

    const refreshUser = async () => {
        if (firebaseUser) {
            await fetchAppUser(firebaseUser);
        }
    };

    const updateProfile = async (name?: string, avatarUrl?: string) => {
        if (!user) return;

        try {
            const res = await fetch('http://localhost:5000/api/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firebaseUid: user.firebaseUid,
                    name,
                    avatarUrl
                })
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUser(updatedUser); // immediately sync React state with MongoDB changes
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const deleteHistoryItem = async (timestamp: string) => {
        if (!user) return;

        try {
            const res = await fetch('http://localhost:5000/api/user/history', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firebaseUid: user.firebaseUid,
                    timestamp
                })
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUser(updatedUser); // immediately sync React state with MongoDB changes
            }
        } catch (error) {
            console.error('Failed to delete search history item:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut, refreshUser, updateProfile, deleteHistoryItem }}>
            {children}
        </AuthContext.Provider>
    );
};
