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
    const { nodes, links, scale } = useMemo(() => {
        if (!root) return { nodes: [], links: [], scale: 1 };

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
        const treeLayout = d3.tree<TreeNode>().nodeSize([85, 110]);
        const rootNode = treeLayout(hierarchy);

        const nodesList = rootNode.descendants();
        const linksList = rootNode.links();

        let minX = 0;
        let maxX = 0;
        let maxY = 0;

        // Shift nodes down from the top edge and find bounds
        nodesList.forEach(n => {
            n.y += 60; // top padding
            if (!((n.data as any).isDummy)) {
                if (n.x < minX) minX = n.x;
                if (n.x > maxX) maxX = n.x;
                if (n.y > maxY) maxY = n.y;
            }
        });

        // Calculate dynamic scale to ensure tree fits within the 500px container bounds without overflowing
        const treeWidth = maxX - minX + 160;   // Add 160 padding for width
        const treeHeight = maxY + 100;         // Add 100 padding for height

        // Assuming max available width is ~600px before interfering with UI, and height is 400px
        const scaleX = 600 / Math.max(treeWidth, 1);
        const scaleY = 400 / Math.max(treeHeight, 1);
        const finalScale = Math.min(1, scaleX, scaleY);

        return { nodes: nodesList, links: linksList, scale: finalScale };
    }, [root]);

    return (
        <div className="relative w-full h-[500px] flex justify-center items-start overflow-hidden pointer-events-none">

            <motion.div
                className="relative w-0 h-full origin-top"
                animate={{ scale }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {/* Edges - SVG Layer */}
                <svg className="absolute top-0 -left-[1000px] w-[2000px] h-full pointer-events-none overflow-visible">
                    <g transform="translate(1000, 0)">
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
                <div className="absolute top-0 left-0 w-0 h-full pointer-events-none">
                    <AnimatePresence>
                        {nodes.map((node) => {
                            if ((node.data as any).isDummy) return null;

                            const isHighlighted = highlights.includes(node.data.id) || highlights.includes(String(node.data.value));

                            return (
                                <motion.div
                                    key={node.data.id}
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
            </motion.div>
        </div>
    );
};
