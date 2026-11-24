import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Star, Medal } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../../data/portfolioData';

/* ---- map rank emojis to lucide icons ---- */
function RankIcon({ rank }: { rank: string }) {
  if (rank.includes('🏆')) return <Trophy className="w-5 h-5" />;
  if (rank.includes('🥇')) return <Award  className="w-5 h-5" />;
  if (rank.includes('⭐')) return <Star   className="w-5 h-5" />;
  if (rank.includes('🎖️')) return <Medal  className="w-5 h-5" />;
  return <Award className="w-5 h-5" />;
}

function cleanRank(rank: string) {
  return rank.replace(/[🏆🥇⭐🎖️]/gu, '').trim();
}

export default function AchievementsShowcase() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-24">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Milestones &amp;{' '}
          <span className="gradient-text-cyan-purple">Recognition</span>
        </h2>
        <p className="text-neutral-500 max-w-lg mx-auto text-base font-light">
          Hackathons, competitions, and moments that defined the journey.
        </p>
      </motion.div>

      {/* Cards grid — featured items span two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ACHIEVEMENTS_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              delay: idx * 0.08,
              duration: 0.5,
              type: 'spring',
              bounce: 0.12,
            }}
            className={`relative group glass-panel-elevated rounded-2xl p-6 card-hover overflow-hidden ${
              item.isFeatured ? 'md:col-span-2' : ''
            }`}
          >
            {/* Accent top border for featured items */}
            {item.isFeatured && (
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, #22d3ee, #8b5cf6, #f43f5e)',
                }}
              />
            )}

            <div className="flex flex-col md:flex-row gap-5 items-start">
              {/* Icon badge */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  item.isFeatured
                    ? 'bg-violet-500/15 text-violet-400'
                    : 'bg-white/[0.05] text-neutral-400'
                }`}
              >
                <RankIcon rank={item.rank} />
              </div>

              <div className="flex-1 min-w-0">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-white/[0.07] text-[10px] uppercase tracking-wider font-semibold text-neutral-300">
                    {item.date}
                  </span>
                  <span className="text-xs font-semibold text-violet-400">
                    {cleanRank(item.rank)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-500 mb-3">{item.event}</p>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {item.description}
                </p>

                {item.metrics && (
                  <p className="mt-3 text-xs text-cyan-400/70 font-medium">
                    {item.metrics}
                  </p>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/[0.04] text-xs text-neutral-400 border border-white/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
