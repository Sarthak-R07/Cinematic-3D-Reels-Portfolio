import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Project data — enhanced with accent palette + colour-coded tags    */
/* ------------------------------------------------------------------ */
const projects = [
  {
    id: 1,
    number: '01',
    title: 'Swaraj Saathi',
    role: 'Founder & Creator',
    description:
      'An AI-native application built for the welfare and empowerment of rural India. Leveraging voice AI and civic automation to bridge the digital divide between citizens and local governance.',
    tags: [
      { label: 'React Native', color: '#61DAFB' },
      { label: 'FastAPI',      color: '#009688' },
      { label: 'Sarvam AI',   color: '#8b5cf6' },
      { label: 'Gemini',      color: '#f43f5e' },
    ],
    gradientFrom: 'from-cyan-500/[0.12]',
    gradientTo:   'to-violet-500/[0.12]',
    borderColor:  'border-cyan-500/20',
    hoverBorder:  'group-hover:border-cyan-500/40',
  },
  {
    id: 2,
    number: '02',
    title: 'Renuka Devi Platform',
    role: 'Lead Developer',
    description:
      'A comprehensive digital platform for the Shri Renuka Devi Temple. Designed for accessibility, multilingual support, and enabling rural devotees to access darshan timings and transport info.',
    tags: [
      { label: 'Web Design',    color: '#F97316' },
      { label: 'Frontend',      color: '#3B82F6' },
      { label: 'Multilingual',  color: '#10B981' },
    ],
    gradientFrom: 'from-orange-500/[0.12]',
    gradientTo:   'to-rose-500/[0.12]',
    borderColor:  'border-orange-500/20',
    hoverBorder:  'group-hover:border-orange-500/40',
  },
  {
    id: 3,
    number: '03',
    title: 'Swaraj Saathi Web',
    role: 'Architect & Developer',
    description:
      'The web portal extension of the Swaraj Saathi ecosystem. Providing scalable architecture and an intuitive dashboard for wider accessibility and municipal transparency.',
    tags: [
      { label: 'React',      color: '#61DAFB' },
      { label: 'Next.js',    color: '#ffffff' },
      { label: 'Full-Stack', color: '#8b5cf6' },
    ],
    gradientFrom: 'from-emerald-500/[0.12]',
    gradientTo:   'to-cyan-500/[0.12]',
    borderColor:  'border-emerald-500/20',
    hoverBorder:  'group-hover:border-emerald-500/40',
  },
];

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */
export default function DroppingProjects() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-24 flex flex-col gap-20">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Selected <span className="gradient-text-cyan-purple">Works</span>
        </h2>
        <div
          className="w-16 h-[2px] mx-auto rounded-full"
          style={{ background: 'linear-gradient(90deg, #22d3ee, #8b5cf6)' }}
        />
      </motion.div>

      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Single project card                                               */
/* ------------------------------------------------------------------ */
function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 120, rotate: isEven ? -3 : 3, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 55, damping: 17, mass: 1.2 }}
      className="relative group w-full"
    >
      {/* Background glow (visible on hover) */}
      <div
        className={`absolute -inset-1 bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo} rounded-[1.75rem] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 pointer-events-none`}
      />

      {/* Card body */}
      <div
        className={`relative p-8 md:p-12 rounded-3xl glass-panel-elevated border ${project.borderColor} ${project.hoverBorder} transition-all duration-500 overflow-hidden card-hover`}
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-1">
            {/* Project number watermark */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-7xl font-black gradient-text-cyan-purple opacity-[0.12] mb-3 leading-none select-none"
            >
              {project.number}
            </motion.div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase mb-3"
            >
              {project.role}
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight"
            >
              {project.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-base text-neutral-400 leading-relaxed max-w-2xl mb-8 font-light"
            >
              {project.description}
            </motion.p>

            {/* Tech tags with colour dots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2.5"
            >
              {project.tags.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] text-sm text-neutral-300 border border-white/[0.07]"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: t.color }}
                  />
                  {t.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Arrow CTA */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white text-black shrink-0 cursor-pointer hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300"
          >
            <ArrowUpRight className="w-7 h-7" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
