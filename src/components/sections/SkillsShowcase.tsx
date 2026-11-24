import React from 'react';
import { motion } from 'motion/react';
import { SKILLS_DATA } from '../../data/portfolioData';

/* ---- colour per category ---- */
const catColor: Record<string, string> = {
  languages:     '#22d3ee',
  frameworks:    '#8b5cf6',
  '3d-creative': '#f43f5e',
  'tools-devops': '#fbbf24',
};

function SkillPill({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-full glass-panel-elevated hover:bg-white/[0.06] transition-colors group cursor-default select-none">
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}50` }}
      />
      <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function SkillsShowcase() {
  const row1 = SKILLS_DATA.filter((_, i) => i % 2 === 0);
  const row2 = SKILLS_DATA.filter((_, i) => i % 2 === 1);

  return (
    <section className="w-full py-24 overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 px-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Tech <span className="gradient-text-cyan-purple">Arsenal</span>
        </h2>
        <p className="text-neutral-500 max-w-lg mx-auto text-base font-light">
          Languages, frameworks, and tools I use to build.
        </p>
      </motion.div>

      {/* Marquee container */}
      <div className="relative">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-r from-[#030308] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-l from-[#030308] to-transparent z-10 pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <div className="flex gap-4 mb-4 marquee-left hover:[animation-play-state:paused]">
          {[...row1, ...row1].map((s, i) => (
            <SkillPill key={`r1-${i}`} name={s.name} color={catColor[s.category] || '#8b5cf6'} />
          ))}
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex gap-4 marquee-right hover:[animation-play-state:paused]">
          {[...row2, ...row2].map((s, i) => (
            <SkillPill key={`r2-${i}`} name={s.name} color={catColor[s.category] || '#8b5cf6'} />
          ))}
        </div>
      </div>
    </section>
  );
}
