import React, { useEffect } from 'react';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, FastForward } from 'lucide-react';

export const PlaybackControls: React.FC = () => {
    const {
        animation,
        isPlaying,
        speed,
        play,
        pause,
        stepForward,
        stepBackward,
        reset,
        setSpeed
    } = useVisualizerStore();

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isPlaying) {
            timer = setInterval(() => {
                stepForward();
            }, 1000 / speed);
        }
        return () => clearInterval(timer);
    }, [isPlaying, speed, stepForward]);

    if (!animation) return null;

    return (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 glass-panel rounded-full px-6 py-3 flex items-center gap-6 z-20">

            {/* Speed Control */}
            <div className="flex items-center gap-2 pr-4 border-r border-white/10">
                <FastForward className="w-4 h-4 text-zinc-400" />
                <select
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="bg-transparent text-sm text-zinc-300 focus:outline-none cursor-pointer"
                >
                    <option value={0.5} className="bg-zinc-900 text-white">0.5x</option>
                    <option value={1} className="bg-zinc-900 text-white">1x</option>
                    <option value={2} className="bg-zinc-900 text-white">2x</option>
                </select>
            </div>

            {/* Main Controls */}
            <div className="flex items-center gap-4">
                <button
                    onClick={reset}
                    title="Reset"
                    className="p-2 text-zinc-400 hover:text-white transition-colors hover:bg-white/5 rounded-full"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>

                <button
                    onClick={stepBackward}
                    title="Step Backward"
                    className="p-2 text-zinc-400 hover:text-white transition-colors hover:bg-white/5 rounded-full"
                >
                    <SkipBack className="w-5 h-5" />
                </button>

                <button
                    onClick={isPlaying ? pause : play}
                    title={isPlaying ? "Pause" : "Play"}
                    className="p-3 bg-violet-600 hover:bg-violet-500 text-white rounded-full transition-transform hover:scale-105 shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                >
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
                </button>

                <button
                    onClick={stepForward}
                    title="Step Forward"
                    className="p-2 text-zinc-400 hover:text-white transition-colors hover:bg-white/5 rounded-full"
                >
                    <SkipForward className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
