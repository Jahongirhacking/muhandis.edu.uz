import { Flex } from 'antd';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const NUM_BALLS = 9;
const DISTANCE_THRESHOLD = 800; // Cursor proximity to trigger movement
const MOVE_AMOUNT = 80; // Slightly increased movement distance
const FLOAT_VARIATION = 15; // Slight drifting effect

const FloatingBalls = () => {
    const ballsRef = useRef<HTMLElement[]>([]);
    const initialPositions = useRef<{ x: number; y: number }[]>([]);
    const idleTimelines = useRef<gsap.core.Timeline[]>([]);

    useEffect(() => {
        const pos = [
            [455, 807],
            [636, 671],
            [212, 801],
            [387, 650],
            [155, 554],
            [530, 392],
            [304, 430],
            [67, 373],
            [284, 227],
        ];

        ballsRef.current.forEach((ball, i) => {
            if (!ball) return;

            const x = window.innerWidth - ((pos[i][0] + 100) / 1728) * window.innerWidth;
            const y = window.innerHeight - (pos[i][1] / 969) * window.innerHeight;
            initialPositions.current[i] = { x, y };

            gsap.set(ball, { x, y });
        });

        // Create independent floating and scaling animations
        ballsRef.current.forEach((ball, i) => {
            if (!ball) return;

            const delay = Math.random() * 2; // Random start delay
            const timeline = gsap.timeline({ repeat: -1, yoyo: true, delay });

            timeline.to(ball, {
                scale: 1.2,
                duration: 1.5 + Math.random(), // Randomized duration
                ease: 'power1.inOut',
            }).to(ball, {
                scale: 1,
                duration: 1.5 + Math.random(),
                ease: 'power1.inOut',
            });

            idleTimelines.current[i] = timeline;
        });

        // Introduce slight floating movement over time
        ballsRef.current.forEach((ball) => {
            if (!ball) return;

            gsap.to(ball, {
                y: `+=${Math.random() * FLOAT_VARIATION - FLOAT_VARIATION / 2}`,
                x: `+=${Math.random() * FLOAT_VARIATION - FLOAT_VARIATION / 2}`,
                duration: 3 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        });

        const moveBalls = (e: MouseEvent) => {
            const { clientX: mouseX, clientY: mouseY } = e;

            ballsRef.current.forEach((ball, i) => {
                if (!ball) return;

                const rect = ball.getBoundingClientRect();
                const ballX = rect.left + rect.width / 2;
                const ballY = rect.top + rect.height / 2;

                const dx = ballX - mouseX;
                const dy = ballY - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < DISTANCE_THRESHOLD) {
                    idleTimelines.current[i]?.pause(); // Stop idle animation

                    const angle = Math.atan2(dy, dx);
                    const moveX = Math.cos(angle) * MOVE_AMOUNT;
                    const moveY = Math.sin(angle) * MOVE_AMOUNT;

                    gsap.to(ball, {
                        x: initialPositions.current[i].x + moveX,
                        y: initialPositions.current[i].y + moveY,
                        scale: 1.3,
                        duration: 1,
                        ease: 'power2.out',
                    });
                } else {
                    gsap.to(ball, {
                        x: initialPositions.current[i].x,
                        y: initialPositions.current[i].y,
                        scale: 1,
                        duration: 2,
                        ease: 'power2.out',
                        onComplete: () => {
                            idleTimelines.current[i]?.play()
                        },
                    });
                }
            });
        };

        window.addEventListener('mousemove', moveBalls);
        return () => {
            window.removeEventListener('mousemove', moveBalls);
            idleTimelines!.current.forEach((timeline) => timeline.kill());
        };
    }, [window.innerWidth]);

    return (
        <div className="ball-container">
            {Array.from({ length: NUM_BALLS }).map((_, i) => (
                <Flex
                    key={i}
                    ref={(el) => el && (ballsRef.current[i] = el)}
                    className="ball"
                    align="center"
                    justify="center"
                >
                    <img src={`/icons/ball_${i}.svg`} />
                </Flex>
            ))}
        </div>
    );
};

export default FloatingBalls;
