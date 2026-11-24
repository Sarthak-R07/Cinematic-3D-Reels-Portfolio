import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';
import { MEDIA_PROJECTS } from '../../data/portfolioData';

export default function MediaTimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = MEDIA_PROJECTS[activeIndex];

  return (
    <div className="relative w-full h-full flex flex-col justify-center p-6 max-w-5xl mx-auto z-10 pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="w-full text-center mb-8 mt-8 md:mt-0"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Media & Motion</h2>
        <p className="text-lg text-zinc-400 font-light">Selected visual works and interactive prototypes.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.2 }} 
        className="w-full flex flex-col items-center"
      >
        {/* Main Display Player */}
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.4 }}
              className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${activeProject.previewGradient} flex flex-col items-center justify-center p-8 border border-white/10 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="z-10 text-center max-w-2xl px-4">
                <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center mx-auto mb-6 text-white cursor-pointer hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <h3 className="text-2xl md:text-4xl font-semibold text-white mb-4 leading-tight">{activeProject.title}</h3>
                <p className="text-sm md:text-base text-zinc-300 font-light">{activeProject.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimalist Selection Menu */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 mt-6 pb-2 w-full max-w-4xl justify-start md:justify-center">
          {MEDIA_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 px-6 py-3.5 rounded-full transition-colors text-sm font-medium border cursor-pointer ${
                activeIndex === idx 
                  ? 'bg-white text-black border-white' 
                  : 'glass-panel text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
