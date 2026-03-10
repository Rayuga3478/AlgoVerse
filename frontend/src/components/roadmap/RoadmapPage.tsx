import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { roadmap } from '../../data/roadmap';
import { useProgressStore } from '../../store/progressStore';
import { TopicSection } from './TopicSection';
import { ProgressBar } from './ProgressBar';

export const RoadmapPage: React.FC = () => {
    const { completedProblems, toggleProblem, updateStreak } = useProgressStore();

    useEffect(() => {
        updateStreak();
    }, [updateStreak]);

    const totalProblems = roadmap.reduce((acc, topic) => acc + topic.problems.length, 0);
    const totalCompleted = completedProblems.length;

    return (
        <div className="w-full h-full p-4 lg:p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 rounded-[2rem] border border-white/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl lg:text-5xl font-space font-light text-white tracking-tighter mb-4">
                            DSA <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">Roadmap</span>
                        </h1>
                        <p className="text-white/60 font-inter mb-8 max-w-xl leading-relaxed">
                            Master Data Structures and Algorithms through a structured path. Track your progress and visualize solutions right here.
                        </p>

                        <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-4">Total Progress</h3>
                            <ProgressBar completed={totalCompleted} total={totalProblems} label={`${totalCompleted} of ${totalProblems} Problems`} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    {roadmap.map((topic, index) => (
                        <motion.div
                            key={topic.topic}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <TopicSection
                                topic={topic}
                                completedProblems={completedProblems}
                                onToggleProblem={toggleProblem}
                                defaultExpanded={index === 0}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
