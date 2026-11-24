import React, { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { ArrowDown, MapPin } from 'lucide-react';

const roleBadges = [
  { label: 'Student Founder', cls: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-300' },
  { label: 'Civic-Tech Builder', cls: 'bg-violet-500/10 border-violet-500/25 text-violet-300' },
  { label: 'AI & Full-Stack', cls: 'bg-rose-500/10 border-rose-500/25 text-rose-300' },
];

export default function HeroNameIntro() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const firstName = 'SARTHAK'.split('');
  const lastName  = 'RODGE'.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.3 },
    },
  };

  const letter: Variants = {
    hidden:  { opacity: 0, y: 80, rotateX: -90, filter: 'blur(12px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 14, stiffness: 110 } 
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-[28%] left-[18%] w-[420px] h-[420px] bg-cyan-500/[0.07] rounded-full blur-[150px] animate-pulse-soft pointer-events-none" />
      <div
        className="absolute bottom-[22%] right-[18%] w-[420px] h-[420px] bg-violet-500/[0.07] rounded-full blur-[150px] animate-pulse-soft pointer-events-none"
        style={{ animationDelay: '1.6s' }}
      />

      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, type: 'spring' }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-panel-elevated text-sm text-neutral-300 font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          Open for Collaborations &amp; Hackathons
        </div>
      </motion.div>

      {/* NAME — per-letter reveal with individual hover glow */}
      <motion.div variants={container} initial="hidden" animate="visible" className="perspective-1000">
        <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-5 text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none">
          {/* SARTHAK */}
          <div className="flex">
            {firstName.map((ch, i) => (
              <motion.span
                key={`f${i}`}
                variants={letter}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`inline-block transform-style-3d gradient-text-white cursor-default transition-all duration-300 ${
                  hoveredIdx === i ? 'text-glow-cyan' : ''
                }`}
                style={{
                  transform: hoveredIdx === i ? 'scale(1.08) translateY(-6px)' : 'scale(1)',
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* RODGE — accent gradient */}
          <div className="flex">
            {lastName.map((ch, i) => {
              const uid = i + 100;
              return (
                <motion.span
                  key={`l${i}`}
                  variants={letter}
                  onMouseEnter={() => setHoveredIdx(uid)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`inline-block transform-style-3d gradient-text-cyan-purple cursor-default transition-all duration-300 ${
                    hoveredIdx === uid ? 'text-glow-purple' : ''
                  }`}
                  style={{
                    transform: hoveredIdx === uid ? 'scale(1.08) translateY(-6px)' : 'scale(1)',
                  }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Role badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        {roleBadges.map((b) => (
          <span key={b.label} className={`px-4 py-1.5 rounded-full text-sm font-medium border ${b.cls}`}>
            {b.label}
          </span>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl font-light leading-relaxed"
      >
        Building AI-native civic-tech applications &amp; crafting digital
        experiences that solve real problems for real people.
      </motion.p>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
        className="mt-4 flex items-center gap-2 text-sm text-neutral-500"
      >
        <MapPin className="w-3.5 h-3.5" />
        <span>Pune, India · DYPIU</span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-600 font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-neutral-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
