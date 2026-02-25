export type DataStructureType =
    | 'array'
    | 'linked_list'
    | 'stack'
    | 'queue'
    | 'binary_tree'
    | 'graph'
    | 'sorting'
    | 'dp'
    | 'backtracking'
    | 'bit_manipulation';

export interface BaseState {
    [key: string]: any;
}

export interface TransitionStep<T = BaseState> {
    action: string;
    explanation: string;
    state: T;
    highlights?: string[]; // IDs of nodes/elements to highlight
    pointers?: Record<string, string | number>; // e.g. { i: 0, j: 2, pivot: 5 }
}

export interface Complexity {
    time: string;
    space: string;
}

export interface AlgorithmAnimation<T = BaseState> {
    structure: DataStructureType;
    title: string;
    algorithm?: string[];
    complexity: Complexity;
    steps: TransitionStep<T>[];
}
