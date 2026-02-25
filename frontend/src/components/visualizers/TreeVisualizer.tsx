import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import * as d3 from 'd3';

interface TreeNode {
    id: string;
    value: number | string;
    left?: TreeNode | null;
    right?: TreeNode | null;
}

interface TreeState {
    tree: TreeNode | null;
}

export const TreeVisualizer: React.FC = () => {
    const { animation, currentStepIndex } = useVisualizerStore();

    const currentStep = animation?.steps[currentStepIndex];
    if (!currentStep) return null;

    const state = currentStep.state as TreeState;
    const root = state.tree;
    const highlights = currentStep.highlights || [];

    // Use D3 to calculate tree layout
    const { nodes, links } = useMemo(() => {
        if (!root) return { nodes: [], links: [] };

        // Convert to D3 hierarchy
        const hierarchy = d3.hierarchy<TreeNode>(root, d => {
            const children = [];
            // D3 expects array of children. If left/right exist we push them,
            // If one is missing but the other exists, we need to push a dummy node
            // to maintain correct Left/Right visual structure in binary trees.
            if (d.left || d.right) {
                children.push(d.left || { id: `dummy-l-${d.id}`, value: '', isDummy: true });
                children.push(d.right || { id: `dummy-r-${d.id}`, value: '', isDummy: true });
            }
            return children as TreeNode[];
        });

        // Create a tree layout
        // Width and height here are logical units.
        const treeLayout = d3.tree<TreeNode>().nodeSize([80, 100]);
        const rootNode = treeLayout(hierarchy);

        const nodesList = rootNode.descendants();
        const linksList = rootNode.links();

        // Shift nodes down from the top edge
        nodesList.forEach(n => {
            // D3 tree centers x around 0 automatically
            // Anchor Y near the top so it flows downwards
            n.y += 80;
        });

        return { nodes: nodesList, links: linksList };
    }, [root]);

    return (
        <div className="relative w-full h-[500px] flex justify-center overflow-visible">

            {/* Edges - SVG Layer */}
            <svg className="absolute top-0 left-1/2 w-0 h-full pointer-events-none overflow-visible">
                <g>
                    <AnimatePresence>
                        {links.map((link) => {
                            if ((link.target.data as any).isDummy || (link.source.data as any).isDummy) return null;

                            const sourceHighlight = highlights.includes(link.source.data.id) || highlights.includes(String(link.source.data.value));
                            const targetHighlight = highlights.includes(link.target.data.id) || highlights.includes(String(link.target.data.value));
                            const isHighlightedEdge = sourceHighlight && targetHighlight;

                            return (
                                <motion.path
                                    key={`${link.source.data.id}-${link.target.data.id}`}
                                    initial={{ opacity: 0, pathLength: 0 }}
                                    animate={{
                                        opacity: 1,
                                        pathLength: 1,
                                        stroke: isHighlightedEdge ? '#fda4af' : 'rgba(255,255,255,0.15)', // rose-300 or white/15
                                        strokeWidth: isHighlightedEdge ? 4 : 2,
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    fill="none"
                                    d={`M ${link.source.x} ${link.source.y} L ${link.target.x} ${link.target.y}`}
                                    className="transition-colors duration-300 drop-shadow-md"
                                />
                            );
                        })}
                    </AnimatePresence>
                </g>
            </svg>

            {/* Nodes - HTML Layer */}
            <div className="absolute top-0 left-1/2 w-0 h-full pointer-events-none">
                <AnimatePresence>
                    {nodes.map((node) => {
                        if ((node.data as any).isDummy) return null;

                        const isHighlighted = highlights.includes(node.data.id) || highlights.includes(String(node.data.value));

                        return (
                            <motion.div
                                key={node.data.id}
                                layoutId={`node-${node.data.id}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: node.x - 32, // center offset (width/2 for w-16)
                                    y: node.y - 32,
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className={`
                  absolute w-16 h-16 rounded-full border flex items-center justify-center font-space font-light text-2xl
                  transition-all duration-500 pointer-events-auto backdrop-blur-md
                  ${isHighlighted
                                        ? 'border-rose-400/60 bg-rose-500/20 text-white shadow-[0_0_30px_rgba(244,63,94,0.4)] scale-110 z-10'
                                        : 'border-white/10 bg-white/5 text-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.2)] z-0'
                                    }
                `}
                            >
                                {node.data.value}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

        </div>
    );
};
