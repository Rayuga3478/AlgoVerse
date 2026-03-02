import { useEffect, useRef } from 'react';

export const BackgroundEffects = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Mouse state
        let mouse = {
            x: -2000,
            y: -2000,
            radius: 150
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -2000;
            mouse.y = -2000;
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            baseX: number;
            baseY: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                // Base anchor for subtle floating motion
                this.baseX = this.x;
                this.baseY = this.y;
                // Varying sizes
                this.size = Math.random() * 2.5 + 0.5;
                // Slow ambient drift
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
            }

            update() {
                // Apply subtle ambient movement
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges slowly
                if (this.x < 0 || this.x > canvas!.width) {
                    this.speedX *= -1;
                }
                if (this.y < 0 || this.y > canvas!.height) {
                    this.speedY *= -1;
                }

                // Interaction with mouse (Repulsion)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                // Push particles away
                const directionX = forceDirectionX * force * -2;
                const directionY = forceDirectionY * force * -2;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Try to return to original base drifting slightly
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 150;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 150;
                    }
                }
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(255, 255, 255, ${this.size * 0.15})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            // Responsive density based on screen size
            const pixelCount = canvas.width * canvas.height;
            const targetParticles = Math.min(Math.floor(pixelCount / 12000), 75); // Max 75 for performance

            for (let i = 0; i < targetParticles; i++) {
                particles.push(new Particle());
            }
        };

        const drawRadialGlow = () => {
            if (!ctx) return;
            // Only draw if mouse is somewhat on screen
            if (mouse.x > -1000) {
                const gradient = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, 400
                );
                gradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)'); // primary
                gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
                gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

                ctx.fillStyle = gradient;

                // Set blending mode to screen for cinematic glow
                ctx.globalCompositeOperation = 'screen';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'source-over'; // Reset
            }
        };

        const drawConnections = () => {
            // Avoid connections on very small screens to save CPU overhead
            if (canvas.width < 768) return;

            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        opacityValue = 1 - (distance / 150);
                        ctx!.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.15})`;
                        ctx!.lineWidth = 1;
                        ctx!.beginPath();
                        ctx!.moveTo(particles[a].x, particles[a].y);
                        ctx!.lineTo(particles[b].x, particles[b].y);
                        ctx!.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Draw Mouse Glow
            drawRadialGlow();

            // 2. Draw Connection Lines
            drawConnections();

            // 3. Update & Draw Particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); // Reinitialize densities
        };

        // Event Listeners
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Bootstrap
        handleResize(); // Set initial dimensions
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-0 animate-fade-in"
            style={{
                animation: 'fadeIn 1.5s ease-out forwards'
            }}
        />
    );
};
