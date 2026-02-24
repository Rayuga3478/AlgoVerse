import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import * as d3 from 'd3';

interface GraphNode {
    id: string;
    value: string;
    x?: number;
    y?: number;
}

interface GraphEdge {
    source: string;
    target: string;
    weight?: number;
}

interface GraphState {
    nodes: GraphNode[];
    edges: GraphEdge[];
}

export const GraphVisualizer: React.FC = () => {
    const { animation, currentStepIndex } = useVisualizerStore();
    const containerRef = useRef<HTMLDivElement>(null);

    const currentStep = animation?.steps[currentStepIndex];
    if (!currentStep) return null;

    const state = currentStep.state as GraphState;
    const rawNodes = state.nodes || [];
    const rawEdges = state.edges || [];
    const highlights = currentStep.highlights || [];

    const [simNodes, setSimNodes] = useState<any[]>([]);
    const [simEdges, setSimEdges] = useState<any[]>([]);

    // D3 Force Simulation setup
    useEffect(() => {
        if (!containerRef.current) return;

        const width = 600;
        const height = 400;

        // We make a copy of nodes and edges because d3 mutates them
        const nodesCopy = rawNodes.map(n => ({ ...n }));
        const edgesCopy = rawEdges.map(e => ({ ...e, source: e.source, target: e.target }));

        const simulation = d3.forceSimulation(nodesCopy)
            .force("link", d3.forceLink(edgesCopy).id((d: any) => d.id).distance(120))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", () => {
                setSimNodes([...nodesCopy]);
                setSimEdges([...edgesCopy]);
            });

        // Run for a few ticks to stabilize initially
        simulation.tick(50);

        return () => {
            simulation.stop();
        };
    }, [rawNodes, rawEdges]);

    return (
        <div ref={containerRef} className="relative w-[600px] h-[400px]">

            {/* SVG Edges Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none text-zinc-600">
                <AnimatePresence>
                    {simEdges.map((edge) => {
                        const sourceHighlight = highlights.includes(edge.source.id);
                        const targetHighlight = highlights.includes(edge.target.id);
                        const isHighlightedEdge = sourceHighlight && targetHighlight;

                        return (
                            <g key={`${edge.source.id}-${edge.target.id}`}>
                                <motion.line
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        stroke: isHighlightedEdge ? '#c084fc' : '#52525b',
                                        strokeWidth: isHighlightedEdge ? 4 : 2,
                                    }}
                                    x1={edge.source.x}
                                    y1={edge.source.y}
                                    x2={edge.target.x}
                                    y2={edge.target.y}
                                    className="transition-colors duration-300"
                                />

                                {/* Edge Weight Optional Label */}
                                {edge.weight && (
                                    <text
                                        x={(edge.source.x + edge.target.x) / 2}
                                        y={(edge.source.y + edge.target.y) / 2 - 10}
                                        fill="#a1a1aa"
                                        fontSize="12"
                                        textAnchor="middle"
                                    >
                                        {edge.weight}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </AnimatePresence>
            </svg>

            {/* HTML Nodes Layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <AnimatePresence>
                    {simNodes.map((node) => {
                        const isHighlighted = highlights.includes(node.id) || highlights.includes(node.value);

                        return (
                            <motion.div
                                key={node.id}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: node.x - 24, // center it (w-12 = 48 -> offset 24)
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
                                {node.value}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

        </div>
    );
};
