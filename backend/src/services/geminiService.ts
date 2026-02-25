import { GoogleGenerativeAI, Schema, SchemaType } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const dsaStepSchema: Schema = {
    type: SchemaType.OBJECT,
    properties: {
        structure: {
            type: SchemaType.STRING,
            description: "Type of data structure (e.g., array, binary_tree, linked_list, graph, sorting, dp, backtracking, bit_manipulation)",
        },
        title: {
            type: SchemaType.STRING,
            description: "Human-readable title (e.g., Quick Sort, Binary Search Tree Insertion)",
        },
        algorithm: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "A list of strings representing the step-by-step pseudocode or general algorithm process.",
        },
        complexity: {
            type: SchemaType.OBJECT,
            properties: {
                time: { type: SchemaType.STRING },
                space: { type: SchemaType.STRING },
            },
            required: ["time", "space"],
        },
        steps: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    action: { type: SchemaType.STRING, description: "Short action name (e.g., init, compare, swap, insert)" },
                    explanation: { type: SchemaType.STRING, description: "Detailed explanation of what is happening in this step." },
                    state: {
                        type: SchemaType.OBJECT,
                        description: "The complete state of the data structure at this step. For arrays/sorting, use { array: [1,2,3] }",
                        properties: {}
                    },
                    highlights: {
                        type: SchemaType.ARRAY,
                        items: { type: SchemaType.STRING },
                        description: "Array of node IDs or array indices to highlight in this step. (e.g. ['0', '5'])"
                    },
                    pointers: {
                        type: SchemaType.OBJECT,
                        description: "Map of pointer names to their current node ID or array index. (e.g. { i: 0, pivot: 5 })",
                        properties: {}
                    }
                },
                required: ["action", "explanation", "state", "highlights", "pointers"],
            }
        }
    },
    required: ["structure", "title", "algorithm", "complexity", "steps"],
};

export async function generateDSASteps(prompt: string) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured.');
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1, // Keep it deterministic
        }
    });

    const systemPrompt = `
You are AlgoVerse, an expert Computer Science tutor and Data Structure/Algorithm behavior engine.
The user will give you a prompt like "Sort 5, 2, 9, 1 using quicksort" or "Find shortest path from A to D".
You must return a JSON object EXACTLY matching this structure, and absolutely nothing else (no markdown wrapping):

{
  "structure": "array" | "binary_tree" | "graph" | "sorting",
  "title": "Algorithm Title",
  "algorithm": [
    "Step 1: Set pivot to the last element",
    "Step 2: Partition the array around the pivot",
    "Step 3: Recursively sort the left and right sub-arrays"
  ],
  "complexity": { "time": "O(n)", "space": "O(1)" },
  "steps": [
    {
      "action": "init",
      "explanation": "Detailed explanation of this step",
      "state": {
         "array": [1, 2, 3]
      },
      "highlights": ["0", "1"],
      "pointers": { "i": 0, "j": 1 }
    }
  ]
}

RULES:
1. 'structure' MUST be one of: array, sorting, binary_tree, graph.
2. GRANULARITY: Provide step-by-step animations, aiming for around 15 to 25 steps total. Do not skip major steps, but avoid generating 40+ overly tedious micro-steps. The 'algorithm' field is a high-level summary, while the 'steps' array shows the visual progression.
3. LARGE INITIAL STATE: Always start the animation with a rich, expansive data structure. For example, arrays should have 8-15 elements. Trees should have 7-12 nodes spread across multiple levels. Graphs should have 5-10 nodes with multiple interconnected edges. Do NOT use trivially small structures (like a 3-node tree).
4. 'highlights' should contain indices of elements currently being compared or modified (as strings).
5. 'pointers' should contain any tracking variables (like 'i', 'j', 'pivot', 'mid', 'curr') pointing to their indices/IDs.
6. The 'state' object MUST contain the full snapshot of the structure at each step.
   - For arrays: "state": { "array": [val1, val2] }
   - For trees: "state": { "tree": { "id": "root", "value": 10, "left": null, "right": null } }
   - For graphs: "state": { "nodes": [{ "id": "A", "value": "A" }], "edges": [{ "source": "A", "target": "B" }] }
`;

    const finalPrompt = `${systemPrompt}\n\nUSER PROMPT: ${prompt}`;

    try {
        const result = await model.generateContent(finalPrompt);
        const response = await result.response;
        let text = response.text();

        // Remove markdown formatting if present
        if (text.startsWith('```json')) {
            text = text.replace(/^```json\n/, '').replace(/\n```$/, '');
        } else if (text.startsWith('```')) {
            text = text.replace(/^```\n/, '').replace(/\n```$/, '');
        }

        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
}
