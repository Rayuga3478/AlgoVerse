import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Topic } from '../../data/roadmap';
import { ProblemCard } from './ProblemCard';
import { ProgressBar } from './ProgressBar';

interface TopicSectionProps {
    topic: Topic;
    completedProblems: string[];
    onToggleProblem: (id: string) => void;
    defaultExpanded?: boolean;
}

export const TopicSection: React.FC<TopicSectionProps> = ({
    topic,
    completedProblems,
    onToggleProblem,
    defaultExpanded = false
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const total = topic.problems.length;
    const completed = topic.problems.filter(p => completedProblems.includes(p.id)).length;
    const isAllCompleted = total > 0 && completed === total;

    return (
        <div className="mb-6 glass-panel rounded-2xl overflow-hidden border border-white/10">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/5 hover:bg-white/10 transition-colors gap-4"
            >
                <div className="flex items-center gap-4 text-left">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-rose-500/20 border border-white/10">
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-white/70" /> : <ChevronDown className="w-5 h-5 text-white/70" />}
                    </div>
                    <div>
                        <h2 className="text-xl font-space font-semibold text-white tracking-widest uppercase flex items-center gap-3">
                            {topic.topic}
                            {isAllCompleted && (
                                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    Completed
                                </span>
                            )}
                        </h2>
                        <div className="text-sm text-white/50 mt-1">
                            {completed} of {total} problems solved
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-48 ml-auto">
                    <ProgressBar completed={completed} total={total} showText={false} />
                </div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="p-4 sm:p-6 flex flex-col gap-3 bg-black/20">
                            {topic.problems.map((problem) => (
                                <ProblemCard
                                    key={problem.id}
                                    problem={problem}
                                    isCompleted={completedProblems.includes(problem.id)}
                                    onToggle={onToggleProblem}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
