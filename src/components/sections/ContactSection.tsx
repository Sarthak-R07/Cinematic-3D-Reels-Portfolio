import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../data/portfolioData';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

export default function ContactSection() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center p-6 max-w-4xl mx-auto z-10 pointer-events-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-violet-500/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
        className="w-full text-center"
      >
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          <span className="gradient-text-white">Let's Build</span>
          <br />
          <span className="gradient-text-cyan-purple">Together</span>
        </h2>

        <p className="text-lg md:text-xl text-neutral-400 font-light mb-14 max-w-xl mx-auto leading-relaxed">
          Currently open for new opportunities, collaborations, and civic-tech
          partnerships. Let's create something meaningful.
        </p>

        {/* Primary email CTA */}
        <a
          href={`mailto:${PERSONAL_INFO.contactEmail}`}
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-black font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] mb-16"
        >
          <Mail className="w-5 h-5" />
          <span>{PERSONAL_INFO.contactEmail}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </a>

        {/* Social links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mx-auto">
          {SOCIAL_LINKS.map((soc) => {
            const Icon = iconMap[soc.iconName] || Mail;
            return (
              <a
                key={soc.id}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel-elevated p-6 rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 group cursor-pointer card-hover"
              >
                <div
                  className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={
                    {
                      '--glow': soc.accentColor,
                    } as React.CSSProperties
                  }
                >
                  <Icon className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors duration-300">
                  {soc.name}
                </span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
