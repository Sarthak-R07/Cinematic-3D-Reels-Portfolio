import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface HeroSectionProps {
  onExploreNext: () => void;
  onContactClick: () => void;
}

export default function HeroSection({ onExploreNext, onContactClick }: HeroSectionProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="max-w-4xl"
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-white mb-6 leading-tight">
          {PERSONAL_INFO.name}
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-zinc-400 font-light mb-10 leading-relaxed max-w-2xl mx-auto">
          {PERSONAL_INFO.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={onExploreNext} 
            className="px-8 py-3.5 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            Explore Work <ArrowDown className="w-4 h-4" />
          </button>
          
          <button 
            onClick={onContactClick} 
            className="px-8 py-3.5 rounded-full glass-panel text-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
          >
            Contact <Mail className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
