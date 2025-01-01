'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  name?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ name = "Panchal Uday Dipakbhai" }) => {
  const [currentPath, setCurrentPath] = useState(0);
  const letters = name.split('');

  // SVG paths for the pen
  const penPaths = {
    pen: "M10,0 L8,8 L0,10 L8,12 L10,20 L12,12 L20,10 L12,8 Z",
    nib: "M9,9 L11,11 M9,11 L11,9"
  };

  // Calculate path positions for each letter
  const letterPaths = letters.map((_, index) => {
    const x = 100 + (index * 30); // Horizontal spacing
    const y = 100; // Vertical position
    const wobble = Math.sin(index * 0.5) * 2; // Slight natural wobble
    return `M${x},${y + wobble} L${x + 20},${y + wobble}`;
  });

  // Animation variants for the pen
  const penVariants = {
    initial: { x: 80, y: 80 },
    animate: {
      x: letterPaths.map(path => {
        const coords = path.split(' ')[1].split(',');
        return parseFloat(coords[0]);
      }),
      y: letterPaths.map(path => {
        const coords = path.split(' ')[1].split(',');
        return parseFloat(coords[1]) - 20;
      }),
      transition: {
        duration: 3,
        times: letterPaths.map((_, i) => i / letterPaths.length),
        ease: "easeInOut",
      }
    }
  };

  // Letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPath(prev => (prev < letters.length - 1 ? prev + 1 : prev));
    }, 5000 / letters.length);

    return () => clearInterval(timer);
  }, [letters.length]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Main writing animation container */}
      <div className="relative w-full max-w-4xl aspect-video">
        {/* Paper effect */}
        <motion.div
          className="absolute inset-0 bg-white/5 rounded-lg shadow-2xl backdrop-blur-sm"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Writing lines */}
          <div className="absolute inset-0 flex flex-col justify-center">
            <div className="w-full h-px bg-white/20" />
            <div className="w-full h-px bg-white/10 mt-12" />
          </div>

          {/* Pen animation */}
          <motion.svg
            viewBox="0 0 800 200"
            className="w-full h-full"
          >
            {/* Writing path guide */}
            <motion.path
              d="M100,100 L700,100"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
              fill="none"
            />

            {/* Animated pen */}
            <motion.g
              variants={penVariants}
              initial="initial"
              animate="animate"
            >
              <motion.path
                d={penPaths.pen}
                fill="url(#pen-gradient)"
                className="drop-shadow-lg"
                style={{ transformOrigin: '10px 10px' }}
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 0.95, 1],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                }}
              />
              <path
                d={penPaths.nib}
                stroke="white"
                strokeWidth="0.5"
                fill="none"
              />
            </motion.g>

            {/* Text being written */}
            {letters.map((letter, index) => (
              <motion.text
                key={index}
                x={70 + (index * 30)}
                y={100}
                className="text-3xl font-cursive fill-white"
                style={{ fontFamily: "'Dancing Script', cursive" }}
                variants={letterVariants}
                initial="hidden"
                animate={index <= currentPath ? "visible" : "hidden"}
              >
                {letter}
              </motion.text>
            ))}

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="pen-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* Loading progress */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-white/20 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;