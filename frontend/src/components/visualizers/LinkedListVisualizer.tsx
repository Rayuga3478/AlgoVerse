import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '../../store/useVisualizerStore';

interface LinkedListNode {
    id: string;
    value: string | number;
    next?: string | null; // ID of the next node
}

export const LinkedListVisualizer: React.FC = () => {
    const { animation, currentStepIndex } = useVisualizerStore();

    const currentStep = animation?.steps[currentStepIndex];
    if (!currentStep) return null;

    // Robust parsing of the linked list array from the state
    let nodes: LinkedListNode[] = [];
    const state = currentStep.state as Record<string, any>;

    if (Array.isArray(state)) {
        nodes = state;
    } else if (state.linked_list && Array.isArray(state.linked_list)) {
        nodes = state.linked_list;
    } else if (state.list && Array.isArray(state.list)) {
        nodes = state.list;
    } else if (state.array && Array.isArray(state.array)) {
        // Sometimes models refer to it as an array of linked list nodes visually
        nodes = state.array.map((val: any, idx: number) => ({
            id: String(idx),
            value: val,
            next: idx < state.array.length - 1 ? String(idx + 1) : null
        }));
    } else if (typeof state === 'object') {
        // Fallback: If it's a nested linked structure { id, value, next: { ... } }
        let curr: any = state.head || state.list || state.node || state;
        while (curr && curr.value !== undefined) {
            nodes.push({ id: curr.id || String(Math.random()), value: curr.value, next: curr.next?.id });
            curr = curr.next;
        }
    }

    const highlights = currentStep.highlights || [];
    const pointers = currentStep.pointers || {};

    // Sort logic to visually connect nodes in correct logical order if they represent a sequence
    // A more advanced graph visualizer builds edges, but a LL is linear. We'll simply map them linearly.

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="relative flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
                <AnimatePresence mode="popLayout">
                    {nodes.map((node, index) => {
                        const isHighlighted = highlights.includes(String(node.id)) || highlights.includes(String(node.value)) || highlights.includes(String(index));

                        // Find any active pointers tracking this node (e.g. `head`, `curr`, `prev`)
                        const activePointers = Object.entries(pointers)
                            .filter(([_, ptrValue]) => String(ptrValue) === String(node.id) || String(ptrValue) === String(index) || String(ptrValue) === String(node.value))
                            .map(([key]) => key);

                        return (
                            <div key={node.id} className="relative flex items-center">
                                {/* The Data Node */}
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                        transition: { type: "spring", stiffness: 300, damping: 20 }
                                    }}
                                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                    className={`
                                        relative w-24 h-16 flex rounded-xl border-2 backdrop-blur-md shadow-xl z-10
                                        ${isHighlighted
                                            ? 'border-emerald-400 bg-emerald-500/20 text-white shadow-[0_0_30px_rgba(52,211,153,0.3)]'
                                            : 'border-white/20 bg-white/5 text-zinc-300'}
                                    `}
                                >
                                    {/* Value Section */}
                                    <div className="flex-1 flex items-center justify-center font-space text-2xl font-medium border-r border-white/10">
                                        {node.value}
                                    </div>
                                    {/* Next Pointer Section */}
                                    <div className="w-6 flex items-center justify-center bg-white/5 rounded-r-xl">
                                        <div className="w-2 h-2 rounded-full bg-white/30" />
                                    </div>

                                    {/* Pointer Labels (e.g., "head", "curr") */}
                                    {activePointers.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute -bottom-8 left-0 right-0 flex flex-col items-center gap-1"
                                        >
                                            {activePointers.map(ptr => (
                                                <span key={ptr} className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-sm border border-rose-500/20">
                                                    {ptr}
                                                </span>
                                            ))}
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* Traversal Arrow (Render to next node if not the last item) */}
                                {index < nodes.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 64 }} /* 4rem gap */
                                        className="relative hidden md:flex items-center -ml-2 -z-10"
                                    >
                                        <div className={`h-1 w-full shrink-0 rounded-full transition-colors duration-300 ${isHighlighted ? 'bg-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'bg-white/15'}`} />
                                        <div className={`absolute right-0 w-3 h-3 rotate-45 border-t-2 border-r-2 -mx-1 transition-colors duration-300 ${isHighlighted ? 'border-emerald-400/80' : 'border-white/15'}`} />
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </AnimatePresence>

                {nodes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center text-zinc-600 font-space font-medium ml-2"
                    >
                        [NULL]
                    </motion.div>
                )}
            </div>
        </div>
    );
};
