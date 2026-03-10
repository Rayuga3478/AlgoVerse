import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { roadmap } from '../../data/roadmap';
import { useProgressStore } from '../../store/progressStore';
import { ArrowLeft, Play, ExternalLink, CheckCircle2, Circle } from 'lucide-react';

export const ProblemPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { completedProblems, toggleProblem } = useProgressStore();

    let foundProblem = null;
    let foundTopic = null;

    for (const topic of roadmap) {
        const p = topic.problems.find(p => p.id === id);
        if (p) {
            foundProblem = p;
            foundTopic = topic.topic;
            break;
        }
    }

    if (!foundProblem) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white">
                <h2 className="text-2xl font-space">Problem Not Found</h2>
                <button onClick={() => navigate('/roadmap')} className="mt-4 text-indigo-400 hover:text-indigo-300">
                    Return to Roadmap
                </button>
            </div>
        );
    }

    const isCompleted = completedProblems.includes(foundProblem.id);

    const difficultyColors = {
        Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
        Hard: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    };

    const handleVisualize = async () => {
        navigate('/visualizer', { state: { autoPrompt: `Visualize how the ${foundProblem.title} algorithm works step by step.` } });
    };

    return (
        <div className="w-full h-full p-4 lg:p-8 overflow-y-auto custom-scrollbar flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel w-full max-w-3xl p-8 rounded-[2rem] border border-white/10 relative overflow-hidden"
            >
                <button
                    onClick={() => navigate('/roadmap')}
                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-semibold"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Roadmap
                </button>

                <div className="flex flex-col gap-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                                    {foundTopic}
                                </span>
                                <span className={`px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-full border ${difficultyColors[foundProblem.difficulty]}`}>
                                    {foundProblem.difficulty}
                                </span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-space font-bold text-white mb-2">
                                {foundProblem.title}
                            </h1>
                        </div>

                        <button
                            onClick={() => toggleProblem(foundProblem.id)}
                            className="group flex flex-col items-center gap-2 mt-2"
                        >
                            {isCompleted ? (
                                <CheckCircle2 className="w-10 h-10 text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] transition-transform group-hover:scale-110 group-active:scale-95" />
                            ) : (
                                <Circle className="w-10 h-10 text-white/20 transition-all group-hover:text-white/40 group-hover:scale-110 group-active:scale-95" />
                            )}
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isCompleted ? 'text-emerald-500' : 'text-white/30 group-hover:text-white/50'}`}>
                                {isCompleted ? 'Completed' : 'Mark Done'}
                            </span>
                        </button>
                    </div>

                    <p className="text-white/60 font-inter leading-relaxed">
                        This problem is part of the AlgoVerse roadmap. You can attempt solving it on LeetCode or use the AI Visualizer to understand the algorithm step by step.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-white/10">
                        <button
                            onClick={handleVisualize}
                            className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-semibold tracking-wide hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all active:scale-[0.98]"
                        >
                            <Play className="w-5 h-5" />
                            Visualize Algorithm
                        </button>

                        <a
                            href={foundProblem.leetcode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl glass-panel text-white font-semibold tracking-wide hover:bg-white/10 transition-all active:scale-[0.98]"
                        >
                            <ExternalLink className="w-5 h-5 text-white/70" />
                            Solve on LeetCode
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
