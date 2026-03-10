import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProgressStore } from '../../store/progressStore';
import { roadmap } from '../../data/roadmap';
import { ProgressBar } from '../roadmap/ProgressBar';
import { Flame, CheckCircle2, TrendingUp, Compass, Zap, Target, AlertTriangle } from 'lucide-react';

export const DashboardPage: React.FC = () => {
    const { completedProblems, currentStreak, updateStreak } = useProgressStore();

    useEffect(() => {
        updateStreak();
    }, [updateStreak]);

    const allProblems = useMemo(() => roadmap.flatMap(t => t.problems), []);

    const totalProblems = allProblems.length;
    const totalCompleted = completedProblems.length;
    const overallPercentage = totalProblems > 0 ? Math.round((totalCompleted / totalProblems) * 100) : 0;

    // Difficulty breakdown
    const totalEasy = allProblems.filter(p => p.difficulty === 'Easy').length;
    const totalMedium = allProblems.filter(p => p.difficulty === 'Medium').length;
    const totalHard = allProblems.filter(p => p.difficulty === 'Hard').length;
    const easySolved = allProblems.filter(p => p.difficulty === 'Easy' && completedProblems.includes(p.id)).length;
    const mediumSolved = allProblems.filter(p => p.difficulty === 'Medium' && completedProblems.includes(p.id)).length;
    const hardSolved = allProblems.filter(p => p.difficulty === 'Hard' && completedProblems.includes(p.id)).length;

    return (
        <div className="w-full h-full p-4 lg:p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <h1 className="text-4xl lg:text-5xl font-space font-light text-white tracking-tighter mb-4">
                        Welcome <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">Back</span>
                    </h1>
                    <p className="text-white/60 font-inter max-w-xl leading-relaxed">
                        Your learning dashboard. Track your journey through the AlgoVerse.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/20 transition-colors duration-500"></div>
                        <Flame className="w-8 h-8 text-rose-400 mb-4 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                        <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-1">Daily Streak</h3>
                        <div className="text-4xl font-space font-bold text-white">{currentStreak} <span className="text-xl text-white/30">Days</span></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass-panel p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-4 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-1">Total Solved</h3>
                        <div className="text-4xl font-space font-bold text-white">{totalCompleted} <span className="text-xl text-white/30">/ {totalProblems}</span></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="glass-panel p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
                        <TrendingUp className="w-8 h-8 text-indigo-400 mb-4 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                        <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-1">Completion</h3>
                        <div className="text-4xl font-space font-bold text-white">{overallPercentage}<span className="text-xl text-white/30">%</span></div>
                    </motion.div>
                </div>

                {/* Difficulty Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.35 }}
                        className="glass-panel p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
                        <Zap className="w-7 h-7 text-emerald-400 mb-3 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <h3 className="text-sm font-semibold text-emerald-400/70 uppercase tracking-widest mb-1">Easy</h3>
                        <div className="text-3xl font-space font-bold text-white">{easySolved} <span className="text-lg text-white/30">/ {totalEasy}</span></div>
                        <div className="mt-3 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: totalEasy > 0 ? `${(easySolved / totalEasy) * 100}%` : '0%' }}
                                transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="glass-panel p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-colors duration-500"></div>
                        <Target className="w-7 h-7 text-amber-400 mb-3 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        <h3 className="text-sm font-semibold text-amber-400/70 uppercase tracking-widest mb-1">Medium</h3>
                        <div className="text-3xl font-space font-bold text-white">{mediumSolved} <span className="text-lg text-white/30">/ {totalMedium}</span></div>
                        <div className="mt-3 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: totalMedium > 0 ? `${(mediumSolved / totalMedium) * 100}%` : '0%' }}
                                transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
                                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.45 }}
                        className="glass-panel p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/20 transition-colors duration-500"></div>
                        <AlertTriangle className="w-7 h-7 text-rose-400 mb-3 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                        <h3 className="text-sm font-semibold text-rose-400/70 uppercase tracking-widest mb-1">Hard</h3>
                        <div className="text-3xl font-space font-bold text-white">{hardSolved} <span className="text-lg text-white/30">/ {totalHard}</span></div>
                        <div className="mt-3 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: totalHard > 0 ? `${(hardSolved / totalHard) * 100}%` : '0%' }}
                                transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                                className="h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-400"
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-panel p-8 rounded-[2rem] border border-white/5"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Compass className="w-6 h-6 text-indigo-400" />
                        <h2 className="text-2xl font-space font-semibold text-white tracking-wide">Topic Progress</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {roadmap.map((topic) => {
                            const total = topic.problems.length;
                            const completed = topic.problems.filter(p => completedProblems.includes(p.id)).length;

                            if (total === 0) return null;

                            return (
                                <div key={topic.topic} className="flex flex-col gap-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">{topic.topic}</span>
                                    </div>
                                    <ProgressBar completed={completed} total={total} />
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
