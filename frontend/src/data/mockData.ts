import { AlgorithmAnimation } from '../types/dsa';

export const AnimationData: Record<string, AlgorithmAnimation> = {
    quickSort: {
        structure: 'sorting',
        title: 'Quick Sort',
        complexity: { time: 'O(n log n)', space: 'O(log n)' },
        steps: [
            {
                action: 'init',
                explanation: 'Initial array to be sorted.',
                state: { array: [8, 3, 1, 7, 0, 10, 2] },
                highlights: [],
                pointers: {}
            },
            {
                action: 'select_pivot',
                explanation: 'Selecting the last element (2) as the pivot.',
                state: { array: [8, 3, 1, 7, 0, 10, 2] },
                highlights: ['6'], // index 6 is the pivot (val 2)
                pointers: { pivot: 6, i: -1, j: 0 }
            },
            {
                action: 'compare',
                explanation: 'Comparing 8 with pivot 2. 8 > 2, so do nothing.',
                state: { array: [8, 3, 1, 7, 0, 10, 2] },
                highlights: ['0', '6'],
                pointers: { pivot: 6, i: -1, j: 0 }
            },
            {
                action: 'compare',
                explanation: 'Comparing 3 with pivot 2. 3 > 2, so do nothing.',
                state: { array: [8, 3, 1, 7, 0, 10, 2] },
                highlights: ['1', '6'],
                pointers: { pivot: 6, i: -1, j: 1 }
            },
            {
                action: 'compare',
                explanation: 'Comparing 1 with pivot 2. 1 <= 2, so swap array[i+1] and array[j].',
                state: { array: [8, 3, 1, 7, 0, 10, 2] },
                highlights: ['2', '6'],
                pointers: { pivot: 6, i: 0, j: 2 }
            },
            {
                action: 'swap',
                explanation: 'Swapped 8 and 1.',
                state: { array: [1, 3, 8, 7, 0, 10, 2] }, // index 0 (was 8) and index 2 (was 1) swapped
                highlights: ['0', '2'],
                pointers: { pivot: 6, i: 0, j: 2 }
            },
            {
                action: 'compare',
                explanation: 'Comparing 7 with pivot 2. 7 > 2, so do nothing.',
                state: { array: [1, 3, 8, 7, 0, 10, 2] },
                highlights: ['3', '6'],
                pointers: { pivot: 6, i: 0, j: 3 }
            },
            {
                action: 'compare',
                explanation: 'Comparing 0 with pivot 2. 0 <= 2, so swap array[i+1] and array[j].',
                state: { array: [1, 3, 8, 7, 0, 10, 2] },
                highlights: ['4', '6'],
                pointers: { pivot: 6, i: 1, j: 4 }
            },
            {
                action: 'swap',
                explanation: 'Swapped 3 and 0.',
                state: { array: [1, 0, 8, 7, 3, 10, 2] }, // index 1 (was 3) and index 4 (was 0) swapped
                highlights: ['1', '4'],
                pointers: { pivot: 6, i: 1, j: 4 }
            },
            {
                action: 'compare',
                explanation: 'Comparing 10 with pivot 2. 10 > 2, so do nothing.',
                state: { array: [1, 0, 8, 7, 3, 10, 2] },
                highlights: ['5', '6'],
                pointers: { pivot: 6, i: 1, j: 5 }
            },
            {
                action: 'swap_pivot',
                explanation: 'Loop done. Swap pivot (2) with array[i+1] (8).',
                state: { array: [1, 0, 2, 7, 3, 10, 8] }, // index 2 (was 8) and index 6 (was 2)
                highlights: ['2', '6'],
                pointers: { pivot: 2 }
            },
            {
                action: 'partition_done',
                explanation: 'Partitioning is done. Element 2 is in its correct place. Recursively sort subarrays.',
                state: { array: [1, 0, 2, 7, 3, 10, 8] },
                highlights: ['2'],
                pointers: {}
            }
        ]
    }
};
