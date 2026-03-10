import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Camera, Bell, ArrowLeft, Loader2, Check, Clock, Search, LogOut, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProfilePageProps {
    onBack: () => void;
    onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, onLogout }) => {
    const { user, updateProfile, deleteHistoryItem } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initialize with user data if available
    const [name, setName] = useState(user?.name || '');
    const [email] = useState(user?.email || ''); // Email is read-only
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Convert image to base64 for simplistic MongoDB storage
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setAvatarUrl(base64String);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setIsSaved(false);

        await updateProfile(name, avatarUrl);

        setIsSaving(false);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4"
        >
            <div className="w-full max-w-2xl glass-panel rounded-3xl p-8 relative overflow-hidden">

                {/* Header Ribbon Glow */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-primary to-rose-500"></div>

                {/* Top bar */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium group"
                    >
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        Back to Dashboard
                    </button>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-white/50 hover:text-rose-400 transition-all text-sm font-medium border border-transparent hover:border-rose-500/30 group"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">

                    {/* Avatar Section */}
                    <div className="flex flex-col items-center space-y-6">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                        <div
                            className="relative group cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="w-32 h-32 rounded-full border-2 border-white/10 bg-black/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50 group-hover:neon-glow relative">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white font-bold text-4xl">
                                        {name.charAt(0).toUpperCase()}
                                    </span>
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                    <Camera className="w-6 h-6 text-white mb-1" />
                                    <span className="text-[10px] uppercase tracking-wider font-semibold">Change Photo</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center space-y-1">
                            <h3 className="text-lg font-bold text-white">{name}</h3>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                                <Shield className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Free Plan</span>
                            </div>
                        </div>
                    </div>

                    {/* Settings Form */}
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-sm font-space font-bold uppercase tracking-wider text-white/40 mb-2 border-b border-white/5 pb-2">Personal Information</h4>

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Display Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        readOnly
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white/50 cursor-not-allowed"
                                        disabled
                                    />
                                </div>
                                <p className="text-[10px] text-zinc-500 mt-1 ml-1">Email changes require identity verification.</p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <h4 className="text-sm font-space font-bold uppercase tracking-wider text-white/40 mb-2 border-b border-white/5 pb-2">Preferences</h4>

                            <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center">
                                        <Bell className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Email Notifications</p>
                                        <p className="text-xs text-white/40">Receive updates on new algorithms</p>
                                    </div>
                                </div>
                                <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-primary">
                                    <span className="inline-block h-4 w-4 translate-x-4 rounded-full bg-white transition" />
                                </div>
                            </label>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 min-w-[140px] ${isSaved
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-primary hover:bg-primary/90 text-white neon-glow'
                                    }`}
                            >
                                {isSaving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : isSaved ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Saved
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </form>

                </div>

                {/* Search History Section */}
                <div className="mt-12 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center neon-glow">
                            <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-space font-bold text-white">Search History</h3>
                            <p className="text-xs text-zinc-400">Your recently generated algorithm visualizations</p>
                        </div>
                    </div>

                    <div className="bg-black/20 border border-white/5 rounded-2xl overflow-hidden">
                        {!user?.searchHistory || user.searchHistory.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center justify-center text-zinc-500">
                                <Search className="w-8 h-8 mb-3 opacity-50" />
                                <p className="text-sm">No search history yet.</p>
                                <p className="text-xs mt-1">Generate your first visualization from the dashboard!</p>
                            </div>
                        ) : (
                            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                {user.searchHistory.slice().reverse().map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                                <Search className="w-4 h-4 text-white/40" />
                                            </div>
                                            <span className="text-sm font-medium text-white/90">"{item.prompt}"</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-zinc-500 font-mono">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </span>
                                            <button
                                                onClick={() => deleteHistoryItem(item.timestamp)}
                                                className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors group/btn"
                                                title="Delete this search"
                                            >
                                                <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
