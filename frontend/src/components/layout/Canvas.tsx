import React from 'react';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import { ArrayVisualizer } from '../visualizers/ArrayVisualizer';
import { TreeVisualizer } from '../visualizers/TreeVisualizer';
import { GraphVisualizer } from '../visualizers/GraphVisualizer';
import { Code2 } from 'lucide-react';

export const Canvas: React.FC = () => {
    const { animation } = useVisualizerStore();

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
        <div className="flex-1 relative overflow-hidden bg-black/40">

            {/* Dynamic Background Grid Pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #ffffff05 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff05 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Main Canvas Area */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
                {renderVisualizer()}
            </div>

            {/* Algorithm Overlay Panel */}
            {animation?.algorithm && Array.isArray(animation.algorithm) && animation.algorithm.length > 0 && (
                <div className="absolute top-6 right-6 w-80 max-h-[calc(100vh-120px)] overflow-y-auto bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6 custom-scrollbar z-40">
                    <h3 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        Algorithm Steps
                    </h3>
                    <div className="space-y-4">
                        {animation.algorithm.map((step, idx) => {
                            // Clean up "Step X:" if the model includes it
                            const cleanStep = step.replace(/^(?:Step\s*\d+:?|\d+\.)\s*/i, '');
                            return (
                                <div key={idx} className="flex gap-3 items-start">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 text-xs flex items-center justify-center font-bold border border-violet-500/30">
                                        {idx + 1}
                                    </span>
                                    <p className="text-sm text-zinc-300 leading-relaxed pt-0.5">
                                        {cleanStep}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

        </div>
    );
};
