import React from 'react';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import { ArrayVisualizer } from '../visualizers/ArrayVisualizer';
import { TreeVisualizer } from '../visualizers/TreeVisualizer';
import { GraphVisualizer } from '../visualizers/GraphVisualizer';

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

        </div>
    );
};
