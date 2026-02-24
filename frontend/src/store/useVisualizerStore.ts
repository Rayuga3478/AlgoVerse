import { create } from 'zustand';
import { AlgorithmAnimation } from '../types/dsa';

interface VisualizerState {
    // Data
    animation: AlgorithmAnimation | null;
    currentStepIndex: number;

    // Playback Control
    isPlaying: boolean;
    speed: number; // 1 = 1x, 2 = 2x

    // Actions
    setAnimation: (animation: AlgorithmAnimation) => void;
    play: () => void;
    pause: () => void;
    stepForward: () => void;
    stepBackward: () => void;
    reset: () => void;
    setSpeed: (speed: number) => void;
}

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
    animation: null,
    currentStepIndex: 0,
    isPlaying: false,
    speed: 1,

    setAnimation: (animation) => set({
        animation,
        currentStepIndex: 0,
        isPlaying: true
    }),

    play: () => set({ isPlaying: true }),

    pause: () => set({ isPlaying: false }),

    stepForward: () => {
        const { animation, currentStepIndex } = get();
        if (animation && currentStepIndex < animation.steps.length - 1) {
            set({ currentStepIndex: currentStepIndex + 1 });
        } else {
            set({ isPlaying: false });
        }
    },

    stepBackward: () => {
        const { currentStepIndex } = get();
        if (currentStepIndex > 0) {
            set({ currentStepIndex: currentStepIndex - 1, isPlaying: false });
        }
    },

    reset: () => set({ currentStepIndex: 0, isPlaying: false }),

    setSpeed: (speed) => set({ speed }),
}));
