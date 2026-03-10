import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
    completedProblems: string[];
    lastPracticeDate: string | null;
    currentStreak: number;
    toggleProblem: (id: string) => void;
    updateStreak: () => void;
}

export const useProgressStore = create<ProgressState>()(
    persist(
        (set) => ({
            completedProblems: [],
            lastPracticeDate: null,
            currentStreak: 0,
            toggleProblem: (id: string) =>
                set((state) => {
                    const isCompleted = state.completedProblems.includes(id);
                    const newCompleted = isCompleted
                        ? state.completedProblems.filter((problemId) => problemId !== id)
                        : [...state.completedProblems, id];

                    return { completedProblems: newCompleted };
                }),
            updateStreak: () =>
                set((state) => {
                    const today = new Date().toDateString();
                    if (state.lastPracticeDate === today) {
                        return state; // Already practiced today
                    }

                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);

                    if (state.lastPracticeDate === yesterday.toDateString()) {
                        return {
                            lastPracticeDate: today,
                            currentStreak: state.currentStreak + 1,
                        };
                    } else {
                        return {
                            lastPracticeDate: today,
                            currentStreak: 1, // Reset streak if missed day
                        };
                    }
                }),
        }),
        {
            name: 'algoverse-progress-storage',
        }
    )
);
