import React from 'react';
import { motion } from 'motion/react';
import HeroNameIntro from './sections/HeroNameIntro';
import SkillsShowcase from './sections/SkillsShowcase';
import DroppingProjects from './sections/DroppingProjects';
import AchievementsShowcase from './sections/AchievementsShowcase';
import ContactSection from './sections/ContactSection';

export default function MainPortfolio() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 w-full flex flex-col items-center"
    >
      {/* ---- HERO ---- */}
      <HeroNameIntro />

      {/* ---- section line ---- */}
      <div className="section-line w-full max-w-3xl mx-auto" />

      {/* ---- SKILLS MARQUEE ---- */}
      <SkillsShowcase />

      <div className="section-line w-full max-w-3xl mx-auto" />

      {/* ---- PROJECTS ---- */}
      <DroppingProjects />

      <div className="section-line w-full max-w-3xl mx-auto" />

      {/* ---- ACHIEVEMENTS ---- */}
      <AchievementsShowcase />

      <div className="section-line w-full max-w-3xl mx-auto" />

      {/* ---- CONTACT ---- */}
      <div className="h-20 w-full" />
      <ContactSection />
      <div className="h-32 w-full" />
    </motion.main>
  );
}
