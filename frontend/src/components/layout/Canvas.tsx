import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import { ArrayVisualizer } from '../visualizers/ArrayVisualizer';
import { TreeVisualizer } from '../visualizers/TreeVisualizer';
import { GraphVisualizer } from '../visualizers/GraphVisualizer';
import { Code2, ChevronRight, Menu } from 'lucide-react';

export const Canvas: React.FC = () => {
    const { animation } = useVisualizerStore();
    const [showSteps, setShowSteps] = useState(true);

    const renderVisualizer = () => {
        if (!animation) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
                    <div className="w-24 h-24 rounded-2xl border border-zinc-800 flex items-center justify-center bg-zinc-900/50">
                        <span className="text-4xl text-zinc-700">✧</span>
                    </div>
                    <p className="text-lg font-medium tracking-wide">Enter a prompt to begin</p>
                </div>
            );
        }

        const structureType = animation.structure.toLowerCase();

        switch (structureType) {
            case 'array':
            case 'sorting':
                return <ArrayVisualizer />;
            case 'binary_tree':
                return <TreeVisualizer />;
            case 'graph':
                return <GraphVisualizer />;
            default:
                return (
                    <div className="flex items-center justify-center h-full text-zinc-400">
                        Visualizer for {animation.structure} is not yet implemented.
                    </div>
                );
        }
    };

    return (
        <div className="flex-1 w-full h-full relative p-4 lg:p-8 flex items-center justify-center">

            {/* The Main Frosted Glass Panel Container */}
            <div className="w-full h-full glass-panel rounded-[2.5rem] relative overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-t border-l border-white/20">

                {/* Dynamic Background Grid Pattern */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: `
                linear-gradient(to right, #ffffff05 1px, transparent 1px),
                linear-gradient(to bottom, #ffffff05 1px, transparent 1px)
              `,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Main Canvas Area */}
                <div
                    className={`flex-1 relative w-full h-full flex items-center justify-center p-4 transition-all duration-500 ${showSteps && animation?.algorithm && animation.algorithm.length > 0 ? 'lg:pr-[320px]' : 'lg:pr-4'}`}
                >
                    {renderVisualizer()}
                </div>
            </div>

            {/* Algorithm Overlay Panel */}
            <AnimatePresence>
                {showSteps && animation?.algorithm && Array.isArray(animation.algorithm) && animation.algorithm.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                        className="absolute top-12 right-12 w-72 max-h-[calc(100vh-160px)] overflow-y-auto glass-panel border-t border-l border-white/20 shadow-2xl rounded-3xl p-5 custom-scrollbar z-40"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Code2 className="w-4 h-4" />
                                Algorithm Steps
                            </h3>
                            <button
                                onClick={() => setShowSteps(false)}
                                className="text-white/40 hover:text-white/80 p-1 rounded-full hover:bg-white/10 transition-colors"
                                title="Hide Steps"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {animation.algorithm.map((step, idx) => {
                                // Clean up "Step X:" if the model includes it
                                const cleanStep = step.replace(/^(?:Step\s*\d+:?|\d+\.)\s*/i, '');
                                return (
                                    <div key={idx} className="flex gap-3 items-start group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 text-white/50 group-hover:bg-violet-500/20 group-hover:text-violet-300 group-hover:border-violet-500/30 transition-all text-xs flex items-center justify-center font-bold border border-white/10">
                                            {idx + 1}
                                        </span>
                                        <p className="text-[13px] text-zinc-300/80 leading-relaxed pt-0.5 group-hover:text-zinc-100 transition-colors">
                                            {cleanStep}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Panel Button (Visible when hidden) */}
            <AnimatePresence>
                {!showSteps && animation?.algorithm && Array.isArray(animation.algorithm) && animation.algorithm.length > 0 && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setShowSteps(true)}
                        className="absolute top-12 right-12 z-50 w-12 h-12 rounded-2xl glass-panel border-t border-l border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all shadow-xl backdrop-blur-md"
                        title="Show Algorithm Steps"
                    >
                        <Menu className="w-5 h-5" />
                    </motion.button>
                )}
            </AnimatePresence>

        </div>
    );
};
