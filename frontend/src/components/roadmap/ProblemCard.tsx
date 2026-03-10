import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ExternalLink, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Problem } from '../../data/roadmap';

interface ProblemCardProps {
    problem: Problem;
    isCompleted: boolean;
    onToggle: (id: string) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, isCompleted, onToggle }) => {
    const difficultyColors = {
        Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
        Hard: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`group relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${isCompleted
                    ? 'bg-white/5 border-white/10'
                    : 'bg-black/20 border-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
        >
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onToggle(problem.id)}
                    className="flex-shrink-0 transition-transform active:scale-90"
                >
                    {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    ) : (
                        <Circle className="w-6 h-6 text-white/30 group-hover:text-white/50" />
                    )}
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <Link
                        to={`/problem/${problem.id}`}
                        className={`font-medium transition-colors ${isCompleted ? 'text-white/50 line-through' : 'text-white/90 group-hover:text-white'}`}
                    >
                        {problem.title}
                    </Link>
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full border ${difficultyColors[problem.difficulty]} w-fit`}>
                        {problem.difficulty}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                    to={`/problem/${problem.id}`}
                    className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 hover:text-indigo-200 transition-colors tooltip-trigger"
                    title="Visualize Algorithm"
                >
                    <Play className="w-4 h-4" />
                </Link>
                <a
                    href={problem.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors tooltip-trigger"
                    title="Solve on LeetCode"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </motion.div>
    );
};
