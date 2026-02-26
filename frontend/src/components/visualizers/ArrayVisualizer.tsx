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

    const isStack = animation.title.toLowerCase().includes('stack') || animation.structure.toLowerCase() === 'stack';

    return (
        <div className={`flex items-center gap-12 flex-col`}>

            {/* Pointers Top Area - only show if not a stack (or handle differently) */}
            {!isStack && (
                <div className="flex gap-4 min-h-[40px] relative w-full justify-center mb-4">
                    {Object.entries(pointers).map(([name, index]) => {
                        if (typeof index !== 'number') return null;
                        return (
                            <div key={name} className="flex flex-col items-center">
                                <span className="text-[10px] text-white/50 uppercase tracking-widest font-space font-bold mb-2">{name}</span>
                                <div className="w-0.5 h-8 bg-gradient-to-b from-transparent to-rose-400/50 rounded-full" />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Array Elements / Stack Elements */}
            <div className={`flex ${isStack ? 'flex-col-reverse items-center gap-3' : 'flex-row flex-wrap justify-center gap-5'}`}>
                <AnimatePresence>
                    {elements.map((val, idx) => {
                        const isHighlighted = highlights.includes(idx.toString()) || highlights.includes(val.toString());

                        return (
                            <motion.div
                                key={val}
                                layout
                                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className={`
                  relative flex flex-col items-center justify-center 
                  w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border font-space text-2xl font-light
                  transition-all duration-500 backdrop-blur-md
                  ${isHighlighted
                                        ? 'border-rose-400/60 bg-rose-500/20 text-white shadow-[0_0_30px_rgba(244,63,94,0.4)] scale-110 z-10'
                                        : 'border-white/10 bg-white/5 text-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.2)]'
                                    }
                `}
                            >
                                {val}

                                {/* Index label */}
                                <span className={`absolute text-[10px] uppercase tracking-widest text-white/40 font-bold font-space ${isStack ? '-right-8 top-1/2 -translate-y-1/2' : '-bottom-8'}`}>
                                    {idx}
                                </span>

                                {/* Pointers mapping to this index */}
                                <div className={`absolute flex gap-2 ${isStack ? '-left-16 top-1/2 -translate-y-1/2 flex-col items-end' : '-top-8'}`}>
                                    {Object.entries(pointers).map(([pName, pIdx]) =>
                                        pIdx === idx && (
                                            <span key={pName} className="px-2 py-1 bg-white/10 text-white/80 border border-white/20 rounded-md text-[9px] uppercase tracking-widest font-space font-bold leading-none whitespace-nowrap backdrop-blur-md shadow-lg">
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
