import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '../../store/useVisualizerStore';

interface ArrayState {
    array: (number | string)[];
}

export const ArrayVisualizer: React.FC = () => {
    const { animation, currentStepIndex } = useVisualizerStore();

    // Pre-calculate stable IDs for elements across all steps to allow Framer Motion to physically swap boxes
    // rather than just tearing down DOM nodes or changing text if duplicates exist.
    const stepElementsWithIds = useMemo(() => {
        if (!animation || !animation.steps) return [];

        let prevElements: { id: string; val: number | string }[] = [];

        return animation.steps.map((step, stepId) => {
            const rawArray = (step.state as ArrayState)?.array || [];

            if (stepId === 0) {
                // Initialize unique stable IDs based on array index
                prevElements = rawArray.map((val, i) => ({ id: `item-${i}-${val}`, val }));
                return prevElements;
            } else {
                // For subsequent steps, map new raw values to the best matching previous stable ID
                const availablePrev = [...prevElements];
                const currentElements = rawArray.map((val, index) => {
                    // Try to find the exact same value in the previous step
                    const matchIdx = availablePrev.findIndex(p => p.val === val);
                    if (matchIdx !== -1) {
                        // Inherit ID from the matching element, so it physically moves
                        const matched = availablePrev.splice(matchIdx, 1)[0];
                        return { id: matched.id, val };
                    } else {
                        // Fallback (e.g. array resized/mutated unexpectedly)
                        return { id: `item-new-${index}-${Math.random()}`, val };
                    }
                });
                prevElements = currentElements;
                return currentElements;
            }
        });
    }, [animation]);

    const currentStep = animation?.steps[currentStepIndex];
    if (!currentStep) return null;

    const elements = stepElementsWithIds[currentStepIndex] || [];

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
            <div className={`flex ${isStack ? 'flex-col-reverse items-center gap-3' : 'relative h-24 w-full flex-row justify-center gap-5'}`}>
                <AnimatePresence>
                    {elements.map((item, idx) => {
                        const isHighlighted = highlights.includes(idx.toString()) || highlights.includes(item.val.toString());

                        return (
                            <motion.div
                                key={item.id}
                                layout
                                layoutId={item.id}
                                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className={`
                  relative flex flex-col items-center justify-center 
                  w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border font-space text-2xl font-light
                  transition-colors duration-500 backdrop-blur-md
                  ${isHighlighted
                                        ? 'border-rose-400/60 bg-rose-500/20 text-white shadow-[0_0_30px_rgba(244,63,94,0.4)] z-10'
                                        : 'border-white/10 bg-white/5 text-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.2)]'
                                    }
                `}
                            >
                                {item.val}

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
