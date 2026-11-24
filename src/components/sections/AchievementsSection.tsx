import React from 'react';
import { motion } from 'motion/react';
import { ACHIEVEMENTS_DATA } from '../../data/portfolioData';

export default function AchievementsSection() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center p-6 max-w-4xl mx-auto z-10 pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="w-full text-center mb-10 mt-8 md:mt-0"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Milestones & Wins</h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.2 }} 
        className="w-full flex flex-col gap-4 max-h-[60vh] overflow-y-auto no-scrollbar pb-10"
      >
        {ACHIEVEMENTS_DATA.map((item) => (
          <div 
            key={item.id} 
            className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-white/5 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase tracking-wider font-medium text-white">{item.date}</span>
                <span className="text-xs font-medium text-purple-400">{item.rank}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-1.5">{item.title}</h3>
              <p className="text-sm text-zinc-400">{item.event}</p>
            </div>
            
            <div className="flex-1 text-sm md:text-base text-zinc-300 font-light leading-relaxed border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0">
              {item.description}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
