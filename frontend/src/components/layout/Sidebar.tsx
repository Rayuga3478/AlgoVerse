import React, { useState } from 'react';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import { Send, Zap, BrainCircuit, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const { animation, currentStepIndex, setAnimation } = useVisualizerStore();
    const currentStep = animation?.steps[currentStepIndex];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setErrorMsg('');

        try {
            const response = await fetch('http://localhost:5000/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.details || errorData?.error || 'Failed to generate visualization');
            }

            const animationData = await response.json();
            setAnimation(animationData);
            setPrompt('');
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.message || 'Error connecting to AI backend.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex w-full h-full relative z-10 border-r border-white/5 bg-black/20 backdrop-blur-3xl">
            {/* Vertical Text Accent */}
            <div className="w-16 flex items-center justify-center border-r border-white/5 relative hidden sm:flex">
                <div className="absolute top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-space text-white/40 font-bold">
                        Data Structures & Algorithms
                    </span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12 relative overflow-y-auto custom-scrollbar">

                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[1px] bg-white/30"></div>
                        <span className="text-xs uppercase tracking-[0.2em] font-space text-white/70 font-medium">Interactive Visualizer</span>
                    </div>
                    <h1 className="text-6xl xl:text-8xl font-space font-light text-white tracking-tighter leading-none mb-6">
                        Algo<br />
                        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">Verse</span>
                    </h1>
                    <p className="text-sm font-inter text-white/50 max-w-sm leading-relaxed">
                        Experience data structures and algorithms through seamless, cinematic animations. Enter a command below to generate your visualization.
                    </p>
                </div>

                {/* Input Form Section */}
                <div className="relative z-20 max-w-md w-full">
                    {errorMsg && (
                        <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                            <p className="text-xs text-rose-300/80 leading-relaxed font-inter">{errorMsg}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-rose-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex items-center glass-panel rounded-full p-2 pl-6">
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={isLoading}
                                placeholder="e.g., 'Sort 5, 2, 9, 1'"
                                className="flex-1 bg-transparent text-sm text-white focus:outline-none font-inter placeholder-white/30"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !prompt.trim()}
                                className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:hover:bg-white/10"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4 translate-x-[1px]" />
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Explanation Output Area */}
                {animation && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 space-y-4"
                    >
                        <h2 className="text-xl font-space font-semibold text-white tracking-widest uppercase mb-4">
                            {animation.title}
                        </h2>
                        <div className="flex gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-white/5 text-white/70 border border-white/10">
                                Time: {animation.complexity.time}
                            </span>
                            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-white/5 text-white/70 border border-white/10">
                                Space: {animation.complexity.space}
                            </span>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-rose-500"></div>
                            <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                Step {currentStepIndex + 1} of {animation.steps.length}
                            </h3>
                            <p className="text-sm font-inter text-white/80 leading-relaxed">
                                {currentStep?.explanation || 'Loading explanation...'}
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
