import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    completed: number;
    total: number;
    label?: string;
    showText?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    completed,
    total,
    label,
    showText = true
}) => {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="w-full">
            {showText && (
                <div className="flex justify-between items-center mb-2">
                    {label && <span className="text-sm font-medium text-white/80">{label}</span>}
                    <span className="text-xs font-semibold text-white/60">
                        {completed} / {total} ({percentage}%)
                    </span>
                </div>
            )}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full"
                />
            </div>
        </div>
    );
};
