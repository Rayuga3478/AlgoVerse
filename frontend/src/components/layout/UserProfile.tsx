import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, ChevronUp } from 'lucide-react';

interface UserProfileProps {
    onLogout: () => void;
    onNavigateToProfile?: () => void;
    userName?: string;
    email?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
    onLogout,
    onNavigateToProfile,
    userName = "Developer",
    email = "dev@algoverse.com"
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-0 mb-4 w-[240px] glass-panel rounded-xl overflow-hidden shadow-2xl z-50 p-2"
                    >
                        {/* Header info */}
                        <div className="px-3 py-3 border-b border-white/5 mb-1">
                            <p className="text-sm font-semibold text-white truncate">{userName}</p>
                            <p className="text-xs text-white/50 truncate mt-0.5">{email}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="space-y-1">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    onNavigateToProfile?.();
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors group"
                            >
                                <User className="w-4 h-4 group-hover:neon-glow" />
                                My Profile
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors group">
                                <Settings className="w-4 h-4 group-hover:neon-glow" />
                                Preferences
                            </button>

                            <div className="h-[1px] bg-white/5 my-1" />

                            <button
                                onClick={onLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg transition-colors group"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/10"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-primary flex items-center justify-center flex-shrink-0 neon-glow">
                    <span className="text-white font-bold text-sm">
                        {userName.charAt(0).toUpperCase()}
                    </span>
                </div>

                <div className="flex-1 text-left hidden sm:block">
                    <p className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">{userName}</p>
                    <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Free Plan</p>
                </div>

                <ChevronUp
                    className={`w-4 h-4 text-white/40 hidden sm:block transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`}
                />
            </button>
        </div>
    );
};
