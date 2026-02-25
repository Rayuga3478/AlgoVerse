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
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 glass-panel border-t border-l border-white/20 rounded-full px-6 py-3 flex items-center gap-6 z-50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

            {/* Speed Control */}
            <div className="flex items-center gap-2 pr-6 border-r border-white/10 group">
                <FastForward className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                <select
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="bg-transparent text-xs font-bold tracking-widest text-white/70 focus:outline-none cursor-pointer appearance-none text-center"
                >
                    <option value={0.5} className="bg-zinc-900 text-white">0.5x</option>
                    <option value={1} className="bg-zinc-900 text-white">1.0x</option>
                    <option value={2} className="bg-zinc-900 text-white">2.0x</option>
                </select>
            </div>

            {/* Main Controls */}
            <div className="flex items-center gap-4">
                <button
                    onClick={reset}
                    title="Reset"
                    className="p-2 text-white/50 hover:text-white transition-all hover:bg-white/10 rounded-full hover:scale-110 active:scale-95"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>

                <button
                    onClick={stepBackward}
                    title="Step Backward"
                    className="p-2 text-white/50 hover:text-white transition-all hover:bg-white/10 rounded-full hover:scale-110 active:scale-95"
                >
                    <SkipBack className="w-4 h-4 fill-current" />
                </button>

                <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-rose-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
                    <button
                        onClick={isPlaying ? pause : play}
                        title={isPlaying ? "Pause" : "Play"}
                        className="relative p-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-all hover:scale-105 active:scale-95 z-10"
                    >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-[1px]" />}
                    </button>
                </div>

                <button
                    onClick={stepForward}
                    title="Step Forward"
                    className="p-2 text-white/50 hover:text-white transition-all hover:bg-white/10 rounded-full hover:scale-110 active:scale-95"
                >
                    <SkipForward className="w-4 h-4 fill-current" />
                </button>
            </div>
        </div>
    );
};
