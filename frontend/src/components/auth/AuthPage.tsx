import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Code } from 'lucide-react';

interface AuthPageProps {
    onLogin: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate auth API call
        setTimeout(() => {
            onLogin();
        }, 600);
    };

    return (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md"
            >
                <div className="glass-panel rounded-2xl p-8 relative overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mb-4 neon-glow">
                            <Code className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            {isLogin ? 'Welcome to AlgoVerse' : 'Join AlgoVerse'}
                        </h1>
                        <p className="text-zinc-400 text-sm mt-2 text-center">
                            {isLogin
                                ? 'Sign in to access interactive DSA visualizations'
                                : 'Create an account to master algorithms dynamically'}
                        </p>
                    </div>

                    {/* Toggle */}
                    <div className="flex p-1 bg-white/5 rounded-lg mb-8 relative">
                        <div
                            className="absolute inset-y-1 w-[calc(50%-4px)] bg-primary/20 border border-primary/30 rounded-md transition-all duration-300 ease-in-out"
                            style={{ left: isLogin ? '4px' : 'calc(50%)' }}
                        />
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${isLogin ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${!isLogin ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {!isLogin && (
                                <motion.div
                                    key="name"
                                    initial={{ opacity: 0, height: 0, y: -20 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -20 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                            placeholder="John Doe"
                                            required={!isLogin}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2.5 mt-6 font-medium text-sm flex items-center justify-center gap-2 transition-all neon-glow"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};
