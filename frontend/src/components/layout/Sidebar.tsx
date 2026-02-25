import React, { useState } from 'react';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import { Send, Zap, BrainCircuit, Activity } from 'lucide-react';

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
        <div className="w-96 flex flex-col h-full bg-zinc-950/80 border-r border-white/10 backdrop-blur-xl relative z-10 transition-all duration-300">

            {/* Brand Header */}
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                    <BrainCircuit className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">AlgoVerse</h1>
                    <p className="text-xs text-zinc-400 font-medium">AI-Powered DSA Visualizer</p>
                </div>
            </div>

            {/* Main Info Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {errorMsg && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                        <h3 className="text-sm font-semibold text-rose-400 mb-1">Generation Failed</h3>
                        <p className="text-xs text-rose-300/80 leading-relaxed">{errorMsg}</p>
                    </div>
                )}

                {!animation ? (
                    <div className="text-center py-10 space-y-4">
                        <Zap className="w-12 h-12 text-zinc-600 mx-auto" />
                        <h3 className="text-lg font-medium text-zinc-300">Awaiting Commands</h3>
                        <p className="text-sm text-zinc-500 max-w-[250px] mx-auto">
                            Ask AlgoVerse to visualize any data structure or algorithm operation.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-white mb-2">{animation.title}</h2>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                                    Time: {animation.complexity.time}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                    Space: {animation.complexity.space}
                                </span>
                            </div>
                        </div>

                        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-violet-500"></div>
                            <h3 className="text-sm text-zinc-400 font-semibold mb-2 flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                Step {currentStepIndex + 1} of {animation.steps.length}
                            </h3>
                            <p className="text-base text-zinc-200 leading-relaxed font-medium">
                                {currentStep?.explanation || 'Loading explanation...'}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/5 bg-zinc-950/50">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                        placeholder='e.g., "Insert 42 into a BST"'
                        className="w-full bg-zinc-900/80 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-inter placeholder-zinc-600"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors disabled:opacity-50 disabled:hover:bg-violet-600"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </button>
                </form>
                <p className="text-xs text-zinc-500 mt-3 text-center">
                    Powered by Gemini 2.5 Flash
                </p>
            </div>

        </div>
    );
};
