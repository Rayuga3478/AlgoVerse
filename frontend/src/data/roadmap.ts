export interface Problem {
    id: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    leetcode: string;
}

export interface Topic {
    topic: string;
    problems: Problem[];
}

export const roadmap: Topic[] = [
    {
        topic: "Arrays & Hashing",
        problems: [
            { id: "contains-duplicate", title: "Contains Duplicate", difficulty: "Easy", leetcode: "https://leetcode.com/problems/contains-duplicate/" },
            { id: "valid-anagram", title: "Valid Anagram", difficulty: "Easy", leetcode: "https://leetcode.com/problems/valid-anagram/" },
            { id: "two-sum", title: "Two Sum", difficulty: "Easy", leetcode: "https://leetcode.com/problems/two-sum/" },
            { id: "group-anagrams", title: "Group Anagrams", difficulty: "Medium", leetcode: "https://leetcode.com/problems/group-anagrams/" },
            { id: "top-k-frequent-elements", title: "Top K Frequent Elements", difficulty: "Medium", leetcode: "https://leetcode.com/problems/top-k-frequent-elements/" },
            { id: "product-of-array-except-self", title: "Product of Array Except Self", difficulty: "Medium", leetcode: "https://leetcode.com/problems/product-of-array-except-self/" },
            { id: "valid-sudoku", title: "Valid Sudoku", difficulty: "Medium", leetcode: "https://leetcode.com/problems/valid-sudoku/" },
            { id: "encode-and-decode-strings", title: "Encode and Decode Strings", difficulty: "Medium", leetcode: "https://leetcode.com/problems/encode-and-decode-strings/" },
            { id: "longest-consecutive-sequence", title: "Longest Consecutive Sequence", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-consecutive-sequence/" },
        ],
    },
    {
        topic: "Two Pointers",
        problems: [
            { id: "valid-palindrome", title: "Valid Palindrome", difficulty: "Easy", leetcode: "https://leetcode.com/problems/valid-palindrome/" },
            { id: "two-sum-ii", title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", leetcode: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
            { id: "3sum", title: "3Sum", difficulty: "Medium", leetcode: "https://leetcode.com/problems/3sum/" },
            { id: "container-with-most-water", title: "Container With Most Water", difficulty: "Medium", leetcode: "https://leetcode.com/problems/container-with-most-water/" },
            { id: "trapping-rain-water", title: "Trapping Rain Water", difficulty: "Hard", leetcode: "https://leetcode.com/problems/trapping-rain-water/" },
        ],
    },
    {
        topic: "Sliding Window",
        problems: [
            { id: "best-time-to-buy-and-sell-stock", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
            { id: "longest-substring-without-repeating-characters", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
            { id: "longest-repeating-character-replacement", title: "Longest Repeating Character Replacement", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
            { id: "permutation-in-string", title: "Permutation in String", difficulty: "Medium", leetcode: "https://leetcode.com/problems/permutation-in-string/" },
            { id: "minimum-window-substring", title: "Minimum Window Substring", difficulty: "Hard", leetcode: "https://leetcode.com/problems/minimum-window-substring/" },
            { id: "sliding-window-maximum", title: "Sliding Window Maximum", difficulty: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-maximum/" },
        ],
    },
    {
        topic: "Stack",
        problems: [
            { id: "valid-parentheses", title: "Valid Parentheses", difficulty: "Easy", leetcode: "https://leetcode.com/problems/valid-parentheses/" },
            { id: "min-stack", title: "Min Stack", difficulty: "Medium", leetcode: "https://leetcode.com/problems/min-stack/" },
            { id: "evaluate-reverse-polish-notation", title: "Evaluate Reverse Polish Notation", difficulty: "Medium", leetcode: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
            { id: "generate-parentheses", title: "Generate Parentheses", difficulty: "Medium", leetcode: "https://leetcode.com/problems/generate-parentheses/" },
            { id: "daily-temperatures", title: "Daily Temperatures", difficulty: "Medium", leetcode: "https://leetcode.com/problems/daily-temperatures/" },
            { id: "car-fleet", title: "Car Fleet", difficulty: "Medium", leetcode: "https://leetcode.com/problems/car-fleet/" },
            { id: "largest-rectangle-in-histogram", title: "Largest Rectangle in Histogram", difficulty: "Hard", leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
        ],
    },
    {
        topic: "Binary Search",
        problems: [
            { id: "binary-search", title: "Binary Search", difficulty: "Easy", leetcode: "https://leetcode.com/problems/binary-search/" },
            { id: "search-a-2d-matrix", title: "Search a 2D Matrix", difficulty: "Medium", leetcode: "https://leetcode.com/problems/search-a-2d-matrix/" },
            { id: "koko-eating-bananas", title: "Koko Eating Bananas", difficulty: "Medium", leetcode: "https://leetcode.com/problems/koko-eating-bananas/" },
            { id: "find-minimum-in-rotated-sorted-array", title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
            { id: "search-in-rotated-sorted-array", title: "Search in Rotated Sorted Array", difficulty: "Medium", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
            { id: "time-based-key-value-store", title: "Time Based Key-Value Store", difficulty: "Medium", leetcode: "https://leetcode.com/problems/time-based-key-value-store/" },
            { id: "median-of-two-sorted-arrays", title: "Median of Two Sorted Arrays", difficulty: "Hard", leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
        ],
    },
    {
        topic: "Linked List",
        problems: [
            { id: "reverse-linked-list", title: "Reverse Linked List", difficulty: "Easy", leetcode: "https://leetcode.com/problems/reverse-linked-list/" },
            { id: "merge-two-sorted-lists", title: "Merge Two Sorted Lists", difficulty: "Easy", leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/" },
            { id: "linked-list-cycle", title: "Linked List Cycle", difficulty: "Easy", leetcode: "https://leetcode.com/problems/linked-list-cycle/" },
            { id: "reorder-list", title: "Reorder List", difficulty: "Medium", leetcode: "https://leetcode.com/problems/reorder-list/" },
            { id: "remove-nth-node-from-end-of-list", title: "Remove Nth Node From End of List", difficulty: "Medium", leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
            { id: "copy-list-with-random-pointer", title: "Copy List with Random Pointer", difficulty: "Medium", leetcode: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
            { id: "add-two-numbers", title: "Add Two Numbers", difficulty: "Medium", leetcode: "https://leetcode.com/problems/add-two-numbers/" },
            { id: "find-the-duplicate-number", title: "Find the Duplicate Number", difficulty: "Medium", leetcode: "https://leetcode.com/problems/find-the-duplicate-number/" },
            { id: "lru-cache", title: "LRU Cache", difficulty: "Medium", leetcode: "https://leetcode.com/problems/lru-cache/" },
            { id: "merge-k-sorted-lists", title: "Merge K Sorted Lists", difficulty: "Hard", leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/" },
            { id: "reverse-nodes-in-k-group", title: "Reverse Nodes in K-Group", difficulty: "Hard", leetcode: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
        ],
    },
    {
        topic: "Trees",
        problems: [
            { id: "invert-binary-tree", title: "Invert Binary Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/invert-binary-tree/" },
            { id: "maximum-depth-of-binary-tree", title: "Maximum Depth of Binary Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
            { id: "diameter-of-binary-tree", title: "Diameter of Binary Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/diameter-of-binary-tree/" },
            { id: "balanced-binary-tree", title: "Balanced Binary Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/balanced-binary-tree/" },
            { id: "same-tree", title: "Same Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/same-tree/" },
            { id: "subtree-of-another-tree", title: "Subtree of Another Tree", difficulty: "Easy", leetcode: "https://leetcode.com/problems/subtree-of-another-tree/" },
            { id: "lowest-common-ancestor-of-a-binary-search-tree", title: "Lowest Common Ancestor of a BST", difficulty: "Medium", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
            { id: "binary-tree-level-order-traversal", title: "Binary Tree Level Order Traversal", difficulty: "Medium", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
            { id: "binary-tree-right-side-view", title: "Binary Tree Right Side View", difficulty: "Medium", leetcode: "https://leetcode.com/problems/binary-tree-right-side-view/" },
            { id: "count-good-nodes-in-binary-tree", title: "Count Good Nodes in Binary Tree", difficulty: "Medium", leetcode: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/" },
            { id: "validate-binary-search-tree", title: "Validate Binary Search Tree", difficulty: "Medium", leetcode: "https://leetcode.com/problems/validate-binary-search-tree/" },
            { id: "kth-smallest-element-in-a-bst", title: "Kth Smallest Element in a BST", difficulty: "Medium", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
            { id: "construct-binary-tree-from-preorder-and-inorder-traversal", title: "Construct Binary Tree from Preorder and Inorder", difficulty: "Medium", leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
            { id: "binary-tree-maximum-path-sum", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
            { id: "serialize-and-deserialize-binary-tree", title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", leetcode: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
        ],
    },
    {
        topic: "Tries",
        problems: [
            { id: "implement-trie-prefix-tree", title: "Implement Trie (Prefix Tree)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
            { id: "design-add-and-search-words-data-structure", title: "Design Add and Search Words Data Structure", difficulty: "Medium", leetcode: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
            { id: "word-search-ii", title: "Word Search II", difficulty: "Hard", leetcode: "https://leetcode.com/problems/word-search-ii/" },
        ],
    },
    {
        topic: "Heap / Priority Queue",
        problems: [
            { id: "kth-largest-element-in-a-stream", title: "Kth Largest Element in a Stream", difficulty: "Easy", leetcode: "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
            { id: "last-stone-weight", title: "Last Stone Weight", difficulty: "Easy", leetcode: "https://leetcode.com/problems/last-stone-weight/" },
            { id: "k-closest-points-to-origin", title: "K Closest Points to Origin", difficulty: "Medium", leetcode: "https://leetcode.com/problems/k-closest-points-to-origin/" },
            { id: "kth-largest-element-in-an-array", title: "Kth Largest Element in an Array", difficulty: "Medium", leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
            { id: "task-scheduler", title: "Task Scheduler", difficulty: "Medium", leetcode: "https://leetcode.com/problems/task-scheduler/" },
            { id: "design-twitter", title: "Design Twitter", difficulty: "Medium", leetcode: "https://leetcode.com/problems/design-twitter/" },
            { id: "find-median-from-data-stream", title: "Find Median from Data Stream", difficulty: "Hard", leetcode: "https://leetcode.com/problems/find-median-from-data-stream/" },
        ],
    },
    {
        topic: "Backtracking",
        problems: [
            { id: "subsets", title: "Subsets", difficulty: "Medium", leetcode: "https://leetcode.com/problems/subsets/" },
            { id: "combination-sum", title: "Combination Sum", difficulty: "Medium", leetcode: "https://leetcode.com/problems/combination-sum/" },
            { id: "permutations", title: "Permutations", difficulty: "Medium", leetcode: "https://leetcode.com/problems/permutations/" },
            { id: "subsets-ii", title: "Subsets II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/subsets-ii/" },
            { id: "combination-sum-ii", title: "Combination Sum II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/combination-sum-ii/" },
            { id: "word-search", title: "Word Search", difficulty: "Medium", leetcode: "https://leetcode.com/problems/word-search/" },
            { id: "palindrome-partitioning", title: "Palindrome Partitioning", difficulty: "Medium", leetcode: "https://leetcode.com/problems/palindrome-partitioning/" },
            { id: "letter-combinations-of-a-phone-number", title: "Letter Combinations of a Phone Number", difficulty: "Medium", leetcode: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
            { id: "n-queens", title: "N-Queens", difficulty: "Hard", leetcode: "https://leetcode.com/problems/n-queens/" },
        ],
    },
    {
        topic: "Graphs",
        problems: [
            { id: "number-of-islands", title: "Number of Islands", difficulty: "Medium", leetcode: "https://leetcode.com/problems/number-of-islands/" },
            { id: "max-area-of-island", title: "Max Area of Island", difficulty: "Medium", leetcode: "https://leetcode.com/problems/max-area-of-island/" },
            { id: "clone-graph", title: "Clone Graph", difficulty: "Medium", leetcode: "https://leetcode.com/problems/clone-graph/" },
            { id: "course-schedule", title: "Course Schedule", difficulty: "Medium", leetcode: "https://leetcode.com/problems/course-schedule/" },
            { id: "course-schedule-ii", title: "Course Schedule II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/course-schedule-ii/" },
            { id: "pacific-atlantic-water-flow", title: "Pacific Atlantic Water Flow", difficulty: "Medium", leetcode: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
            { id: "surrounded-regions", title: "Surrounded Regions", difficulty: "Medium", leetcode: "https://leetcode.com/problems/surrounded-regions/" },
            { id: "rotting-oranges", title: "Rotting Oranges", difficulty: "Medium", leetcode: "https://leetcode.com/problems/rotting-oranges/" },
            { id: "walls-and-gates", title: "Walls and Gates", difficulty: "Medium", leetcode: "https://leetcode.com/problems/walls-and-gates/" },
            { id: "redundant-connection", title: "Redundant Connection", difficulty: "Medium", leetcode: "https://leetcode.com/problems/redundant-connection/" },
            { id: "word-ladder", title: "Word Ladder", difficulty: "Hard", leetcode: "https://leetcode.com/problems/word-ladder/" },
        ],
    },
    {
        topic: "Advanced Graphs",
        problems: [
            { id: "network-delay-time", title: "Network Delay Time", difficulty: "Medium", leetcode: "https://leetcode.com/problems/network-delay-time/" },
            { id: "cheapest-flights-within-k-stops", title: "Cheapest Flights Within K Stops", difficulty: "Medium", leetcode: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" },
            { id: "swim-in-rising-water", title: "Swim in Rising Water", difficulty: "Hard", leetcode: "https://leetcode.com/problems/swim-in-rising-water/" },
            { id: "reconstruct-itinerary", title: "Reconstruct Itinerary", difficulty: "Hard", leetcode: "https://leetcode.com/problems/reconstruct-itinerary/" },
            { id: "min-cost-to-connect-all-points", title: "Min Cost to Connect All Points", difficulty: "Medium", leetcode: "https://leetcode.com/problems/min-cost-to-connect-all-points/" },
        ],
    },
    {
        topic: "1-D Dynamic Programming",
        problems: [
            { id: "climbing-stairs", title: "Climbing Stairs", difficulty: "Easy", leetcode: "https://leetcode.com/problems/climbing-stairs/" },
            { id: "min-cost-climbing-stairs", title: "Min Cost Climbing Stairs", difficulty: "Easy", leetcode: "https://leetcode.com/problems/min-cost-climbing-stairs/" },
            { id: "house-robber", title: "House Robber", difficulty: "Medium", leetcode: "https://leetcode.com/problems/house-robber/" },
            { id: "house-robber-ii", title: "House Robber II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/house-robber-ii/" },
            { id: "longest-palindromic-substring", title: "Longest Palindromic Substring", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-palindromic-substring/" },
            { id: "palindromic-substrings", title: "Palindromic Substrings", difficulty: "Medium", leetcode: "https://leetcode.com/problems/palindromic-substrings/" },
            { id: "decode-ways", title: "Decode Ways", difficulty: "Medium", leetcode: "https://leetcode.com/problems/decode-ways/" },
            { id: "coin-change", title: "Coin Change", difficulty: "Medium", leetcode: "https://leetcode.com/problems/coin-change/" },
            { id: "maximum-product-subarray", title: "Maximum Product Subarray", difficulty: "Medium", leetcode: "https://leetcode.com/problems/maximum-product-subarray/" },
            { id: "word-break", title: "Word Break", difficulty: "Medium", leetcode: "https://leetcode.com/problems/word-break/" },
            { id: "longest-increasing-subsequence", title: "Longest Increasing Subsequence", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-increasing-subsequence/" },
            { id: "partition-equal-subset-sum", title: "Partition Equal Subset Sum", difficulty: "Medium", leetcode: "https://leetcode.com/problems/partition-equal-subset-sum/" },
        ],
    },
    {
        topic: "2-D Dynamic Programming",
        problems: [
            { id: "unique-paths", title: "Unique Paths", difficulty: "Medium", leetcode: "https://leetcode.com/problems/unique-paths/" },
            { id: "longest-common-subsequence", title: "Longest Common Subsequence", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-common-subsequence/" },
            { id: "best-time-to-buy-and-sell-stock-with-cooldown", title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "Medium", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/" },
            { id: "coin-change-ii", title: "Coin Change II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/coin-change-ii/" },
            { id: "target-sum", title: "Target Sum", difficulty: "Medium", leetcode: "https://leetcode.com/problems/target-sum/" },
            { id: "interleaving-string", title: "Interleaving String", difficulty: "Medium", leetcode: "https://leetcode.com/problems/interleaving-string/" },
            { id: "edit-distance", title: "Edit Distance", difficulty: "Medium", leetcode: "https://leetcode.com/problems/edit-distance/" },
            { id: "burst-balloons", title: "Burst Balloons", difficulty: "Hard", leetcode: "https://leetcode.com/problems/burst-balloons/" },
            { id: "regular-expression-matching", title: "Regular Expression Matching", difficulty: "Hard", leetcode: "https://leetcode.com/problems/regular-expression-matching/" },
        ],
    },
    {
        topic: "Greedy",
        problems: [
            { id: "maximum-subarray", title: "Maximum Subarray", difficulty: "Medium", leetcode: "https://leetcode.com/problems/maximum-subarray/" },
            { id: "jump-game", title: "Jump Game", difficulty: "Medium", leetcode: "https://leetcode.com/problems/jump-game/" },
            { id: "jump-game-ii", title: "Jump Game II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/jump-game-ii/" },
            { id: "gas-station", title: "Gas Station", difficulty: "Medium", leetcode: "https://leetcode.com/problems/gas-station/" },
            { id: "hand-of-straights", title: "Hand of Straights", difficulty: "Medium", leetcode: "https://leetcode.com/problems/hand-of-straights/" },
            { id: "merge-triplets-to-form-target-triplet", title: "Merge Triplets to Form Target Triplet", difficulty: "Medium", leetcode: "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/" },
            { id: "partition-labels", title: "Partition Labels", difficulty: "Medium", leetcode: "https://leetcode.com/problems/partition-labels/" },
            { id: "valid-parenthesis-string", title: "Valid Parenthesis String", difficulty: "Medium", leetcode: "https://leetcode.com/problems/valid-parenthesis-string/" },
            { id: "candy", title: "Candy", difficulty: "Hard", leetcode: "https://leetcode.com/problems/candy/" },
        ],
    },
    {
        topic: "Intervals",
        problems: [
            { id: "insert-interval", title: "Insert Interval", difficulty: "Medium", leetcode: "https://leetcode.com/problems/insert-interval/" },
            { id: "employee-free-time", title: "Employee Free Time", difficulty: "Hard", leetcode: "https://leetcode.com/problems/employee-free-time/" },
            { id: "merge-intervals", title: "Merge Intervals", difficulty: "Medium", leetcode: "https://leetcode.com/problems/merge-intervals/" },
            { id: "non-overlapping-intervals", title: "Non-overlapping Intervals", difficulty: "Medium", leetcode: "https://leetcode.com/problems/non-overlapping-intervals/" },
            { id: "meeting-rooms", title: "Meeting Rooms", difficulty: "Easy", leetcode: "https://leetcode.com/problems/meeting-rooms/" },
            { id: "meeting-rooms-ii", title: "Meeting Rooms II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/meeting-rooms-ii/" },
            { id: "minimum-interval-to-include-each-query", title: "Minimum Interval to Include Each Query", difficulty: "Hard", leetcode: "https://leetcode.com/problems/minimum-interval-to-include-each-query/" },
        ],
    },
    {
        topic: "Math & Geometry",
        problems: [
            { id: "happy-number", title: "Happy Number", difficulty: "Easy", leetcode: "https://leetcode.com/problems/happy-number/" },
            { id: "plus-one", title: "Plus One", difficulty: "Easy", leetcode: "https://leetcode.com/problems/plus-one/" },
            { id: "rotate-image", title: "Rotate Image", difficulty: "Medium", leetcode: "https://leetcode.com/problems/rotate-image/" },
            { id: "spiral-matrix", title: "Spiral Matrix", difficulty: "Medium", leetcode: "https://leetcode.com/problems/spiral-matrix/" },
            { id: "set-matrix-zeroes", title: "Set Matrix Zeroes", difficulty: "Medium", leetcode: "https://leetcode.com/problems/set-matrix-zeroes/" },
            { id: "powx-n", title: "Pow(x, n)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/powx-n/" },
            { id: "multiply-strings", title: "Multiply Strings", difficulty: "Medium", leetcode: "https://leetcode.com/problems/multiply-strings/" },
            { id: "detect-squares", title: "Detect Squares", difficulty: "Medium", leetcode: "https://leetcode.com/problems/detect-squares/" },
        ],
    },
    {
        topic: "Bit Manipulation",
        problems: [
            { id: "single-number", title: "Single Number", difficulty: "Easy", leetcode: "https://leetcode.com/problems/single-number/" },
            { id: "number-of-1-bits", title: "Number of 1 Bits", difficulty: "Easy", leetcode: "https://leetcode.com/problems/number-of-1-bits/" },
            { id: "counting-bits", title: "Counting Bits", difficulty: "Easy", leetcode: "https://leetcode.com/problems/counting-bits/" },
            { id: "reverse-bits", title: "Reverse Bits", difficulty: "Easy", leetcode: "https://leetcode.com/problems/reverse-bits/" },
            { id: "missing-number", title: "Missing Number", difficulty: "Easy", leetcode: "https://leetcode.com/problems/missing-number/" },
            { id: "sum-of-two-integers", title: "Sum of Two Integers", difficulty: "Medium", leetcode: "https://leetcode.com/problems/sum-of-two-integers/" },
            { id: "reverse-integer", title: "Reverse Integer", difficulty: "Medium", leetcode: "https://leetcode.com/problems/reverse-integer/" },
            { id: "number-complement", title: "Number Complement", difficulty: "Easy", leetcode: "https://leetcode.com/problems/number-complement/" },
            { id: "hamming-distance", title: "Hamming Distance", difficulty: "Easy", leetcode: "https://leetcode.com/problems/hamming-distance/" },
        ],
    },
];
