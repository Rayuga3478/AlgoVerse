import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '../../store/useVisualizerStore';

interface ArrayState {
    array: (number | string)[];
}

export const ArrayVisualizer: React.FC = () => {
    const { animation, currentStepIndex } = useVisualizerStore();

    const currentStep = animation?.steps[currentStepIndex];
    if (!currentStep) return null;

    const state = currentStep.state as ArrayState;
    const elements = state.array || [];

    const highlights = currentStep.highlights || [];
    const pointers = currentStep.pointers || {};

    return (
        <div className="flex flex-col items-center gap-12">

            {/* Pointers Top Area */}
            <div className="flex gap-4 min-h-[40px] relative w-full justify-center">
                {Object.entries(pointers).map(([name, index]) => {
                    if (typeof index !== 'number') return null;
                    // Calculate approximate position. We will use absolute positioning later for better tracing,
                    // but for now, we just list them.
                    return (
                        <div key={name} className="flex flex-col items-center">
                            <span className="text-xs text-violet-400 font-mono font-bold mb-1">{name}</span>
                            <div className="w-1 h-8 bg-violet-500/50 rounded-full" />
                        </div>
                    );
                })}
            </div>

            {/* Array Elements Array */}
            <div className="flex flex-wrap justify-center gap-4">
                <AnimatePresence>
                    {elements.map((val, idx) => {
                        const isHighlighted = highlights.includes(idx.toString()) || highlights.includes(val.toString());

                        return (
                            <motion.div
                                key={val}
                                layout
                                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className={`
                  relative flex flex-col items-center justify-center 
                  w-16 h-16 rounded-xl border-2 font-mono text-xl font-bold
                  shadow-lg transition-colors
                  ${isHighlighted
                                        ? 'border-violet-400 bg-violet-900/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.6)]'
                                        : 'border-zinc-700 bg-zinc-800 text-zinc-300'
                                    }
                `}
                            >
                                {val}

                                {/* Index label */}
                                <span className="absolute -bottom-6 text-xs text-zinc-500 font-medium">
                                    {idx}
                                </span>

                                {/* Pointers mapping to this index */}
                                <div className="absolute -top-6 flex gap-1">
                                    {Object.entries(pointers).map(([pName, pIdx]) =>
                                        pIdx === idx && (
                                            <span key={pName} className="px-1.5 py-0.5 bg-violet-600/20 text-violet-300 border border-violet-500/30 rounded text-[10px] font-mono leading-none">
                                                {pName}
                                            </span>
                                        )
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

        </div>
    );
};
