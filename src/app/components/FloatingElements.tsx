import { motion } from 'motion/react';

export function FloatingElements() {
  const shapes = [
    { color: 'from-[#FFB6C1] to-[#FF69B4]', size: 'w-16 h-16', delay: 0, duration: 6 },
    { color: 'from-[#87CEEB] to-[#4682B4]', size: 'w-24 h-24', delay: 1, duration: 8 },
    { color: 'from-[#FFE4B5] to-[#FFA500]', size: 'w-20 h-20', delay: 2, duration: 7 },
    { color: 'from-[#FFB6C1] to-[#FF69B4]', size: 'w-12 h-12', delay: 3, duration: 5 },
    { color: 'from-[#87CEEB] to-[#4682B4]', size: 'w-28 h-28', delay: 4, duration: 9 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute bg-gradient-to-br ${shape.color} ${shape.size} rounded-full opacity-10 blur-2xl`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}
