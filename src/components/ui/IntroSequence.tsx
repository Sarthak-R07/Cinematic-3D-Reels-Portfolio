import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 3800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030308] select-none overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.08,
        filter: 'blur(12px)',
        transition: { duration: 0.8, ease: 'easeInOut' },
      }}
    >
      {/* Background radial glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.4, ease: 'easeOut' }}
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col items-center justify-center gap-1">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 0.4, letterSpacing: '0.3em' }}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          className="text-xs md:text-sm text-neutral-500 uppercase tracking-[0.3em] mb-6 font-medium"
        >
          Portfolio
        </motion.div>

        {/* Line 1: SARTHAK */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '130%', rotateX: 25, filter: 'blur(6px)' }}
            animate={{ y: '0%', rotateX: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.7, type: 'spring', bounce: 0.12 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none"
          >
            SARTHAK
          </motion.div>
        </div>

        {/* Line 2: RODGE */}
        <div className="overflow-hidden -mt-1 md:-mt-2">
          <motion.div
            initial={{ y: '130%', rotateX: 25, filter: 'blur(6px)' }}
            animate={{ y: '0%', rotateX: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 1.0, type: 'spring', bounce: 0.12 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black gradient-text-cyan-purple tracking-tight leading-none"
          >
            RODGE
          </motion.div>
        </div>

        {/* Expanding gradient line */}
        <motion.div
          className="mt-8 h-[1px]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '55vw', opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(6,182,212,0.4) 25%, rgba(139,92,246,0.6) 50%, rgba(244,63,94,0.4) 75%, transparent)',
          }}
        />

        {/* Year watermark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="mt-5 text-[10px] text-neutral-600 tracking-[0.5em] uppercase font-medium"
        >
          © 2026
        </motion.div>
      </div>
    </motion.div>
  );
}
