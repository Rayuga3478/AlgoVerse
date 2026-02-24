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

        // Center the root
        nodesList.forEach(n => {
            // Shift down slightly
            n.y += 50;
        });

        return { nodes: nodesList, links: linksList };
    }, [root]);

    return (
        <div className="relative w-full h-[500px] flex justify-center overflow-visible">

            {/* Edges - SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                <g transform="translate(50%, 0)">
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
                                        stroke: isHighlightedEdge ? '#c084fc' : '#52525b', // purple-400 or zinc-600
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
            <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translateX(50%)' }}>
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
                                    x: node.x - 24, // center offset (width/2)
                                    y: node.y - 24,
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className={`
                  absolute w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg
                  shadow-xl transition-colors pointer-events-auto
                  ${isHighlighted
                                        ? 'border-violet-400 bg-violet-900/80 text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] z-10'
                                        : 'border-zinc-700 bg-zinc-800 text-zinc-300 z-0'
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
