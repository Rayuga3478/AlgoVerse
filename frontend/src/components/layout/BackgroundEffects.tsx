import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects = () => {
    const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Generate random particles (constant across renders)
    const [particles] = useState(() =>
        Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 5,
        }))
    );

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden isolate">
            {/* Mouse Follow Glow */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full bg-primary/20 mix-blend-screen blur-[120px] -translate-x-1/2 -translate-y-1/2"
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                }}
                transition={{
                    type: 'tween',
                    ease: 'easeOut',
                    duration: 0.8,
                }}
                style={{ left: 0, top: 0 }}
            />

            {/* Soft Floating Particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-white/20 blur-[1px]"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        y: [0, -80, 0],
                        x: [0, 40, 0],
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};
