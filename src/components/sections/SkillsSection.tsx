import React from 'react';
import { motion } from 'motion/react';
import { Code, Terminal, Cpu, Smartphone, Server, Layers, Palette, Box, Sparkles, Film, Container, GitBranch, Zap } from 'lucide-react';
import { SKILLS_DATA } from '../../data/portfolioData';

// Map icon names to components
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Cpu, Terminal, Code, Zap, Smartphone, Server, Layers, Palette, Box, Sparkles, Film, Container, GitBranch,
};

export default function SkillsSection() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center p-6 max-w-6xl mx-auto z-10 pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="w-full text-center mb-12 mt-8 md:mt-0"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Tech Arsenal</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light">A refined selection of tools, languages, and frameworks I use to build digital experiences.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.2 }} 
        className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto no-scrollbar pb-10"
      >
        {SKILLS_DATA.map((skill) => {
          const IconComponent = iconMap[skill.iconName] || Code;
          return (
            <div 
              key={skill.id} 
              className="glass-panel p-5 rounded-2xl flex flex-col items-center text-center gap-4 hover:bg-white/5 transition-colors"
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5" 
              >
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white">{skill.name}</h3>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{skill.category.replace('-', ' ')}</p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
