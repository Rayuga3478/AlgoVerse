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
                                        stroke: isHighlightedEdge ? '#fda4af' : 'rgba(255,255,255,0.15)',
                                        strokeWidth: isHighlightedEdge ? 4 : 2,
                                    }}
                                    x1={edge.source.x}
                                    y1={edge.source.y}
                                    x2={edge.target.x}
                                    y2={edge.target.y}
                                    className="transition-colors duration-500"
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
                                    x: node.x - 32, // center it (w-16 = 64 -> offset 32)
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
                                {node.value}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

        </div>
    );
};
