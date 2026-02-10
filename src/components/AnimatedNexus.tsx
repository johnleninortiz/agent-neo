import { motion } from "motion/react";

interface AnimatedNexusProps {
  state?: 'idle' | 'active' | 'thinking';
}

export default function AnimatedNexus({ state = 'idle' }: AnimatedNexusProps) {
  // Hexagons configuration
  const hexagons = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: 90 - i * 14, // Decreasing size, max radius around 90
    duration: 10 + i * 2,
    reverse: i % 2 === 0
  }));

  // Colors based on state
  const getStrokeColor = (index: number) => {
    if (state === 'idle') return '#9CA3AF'; // Gray-400
    if (state === 'active') return index % 2 === 0 ? '#06B6D4' : '#3B82F6'; // Cyan-500 / Blue-500
    
    // Thinking: Base color (will be animated in the motion path)
    return '#3B82F6'; // Default to Blue-500
  };

  const getStrokeWidth = () => {
    return state === 'idle' ? 3 : 4; 
  };

  // Helper for rounded hexagon path
  const createHexagonPath = (cx: number, cy: number, r: number) => {
    const points = Array.from({ length: 6 }).map((_, i) => {
        const theta = (Math.PI / 3) * i - Math.PI / 2;
        return {
            x: cx + r * Math.cos(theta),
            y: cy + r * Math.sin(theta)
        };
    });

    const getPoint = (i: number) => points[(i + 6) % 6];
    const lerp = (p1: {x:number, y:number}, p2: {x:number, y:number}, t: number) => ({
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t
    });

    const reduction = 0.15; // 15% of side length for corner
    let d = "";
    
    for (let i = 0; i < 6; i++) {
        const curr = getPoint(i);
        const next = getPoint(i + 1);
        
        // Start path at: lerp(points[0], points[1], 0.1)
        if (i === 0) {
            const start = lerp(curr, next, reduction);
            d += `M ${start.x},${start.y} `;
        }
        
        const lineEnd = lerp(curr, next, 1 - reduction);
        d += `L ${lineEnd.x},${lineEnd.y} `;
        
        const nextStart = lerp(next, getPoint(i+2), reduction);
        d += `Q ${next.x},${next.y} ${nextStart.x},${nextStart.y} `;
    }
    
    return d + "Z";
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-white rounded-full overflow-hidden" style={{ background: 'transparent', width: '100%', height: '100%' }}>
        {/* Container size is handled by parent, we use viewBox 0 0 200 200 */}
        <svg viewBox="0 0 200 200" className="w-full h-full p-1">
            {hexagons.map((hex) => (
                <motion.path
                    key={`${hex.id}-${state}`} // Force remount on state change to prevent "spin-back"
                    d={createHexagonPath(100, 100, hex.size)}
                    fill="none"
                    stroke={getStrokeColor(hex.id)}
                    strokeWidth={getStrokeWidth()}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{
                        rotate: (state === 'thinking' || state === 'idle') ? (hex.reverse ? 360 : -360) : 0,
                        // Thinking: Sinusoidal wave effect on scale and strokeWidth
                        scale: state === 'thinking' ? [1, 1.15, 0.9, 1] : 1,
                        strokeWidth: state === 'thinking' ? [4, 6, 2, 4] : getStrokeWidth(),
                        // Thinking: Dynamic color cycle blue -> green
                        stroke: state === 'thinking' ? ['#3B82F6', '#2DD4BF', '#10B981', '#2DD4BF', '#3B82F6'] : getStrokeColor(hex.id),
                    }}
                    transition={{
                        rotate: {
                            duration: state === 'idle' ? hex.duration * 5 : hex.duration, // Even slower for gray idle
                            repeat: Infinity,
                            ease: "linear",
                        },
                        scale: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            // (5 - hex.id) staggers from inner (5) to outer (0) like a drop ripple
                            delay: (5 - hex.id) * 0.15 
                        },
                        strokeWidth: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: (5 - hex.id) * 0.15
                        },
                        stroke: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: hex.id * 0.2
                        }
                    }}
                    style={{ originX: "50%", originY: "50%" }}
                />
            ))}
        </svg>
    </div>
  );
}
