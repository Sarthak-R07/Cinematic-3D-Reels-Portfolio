import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Scene from './components/3d/Scene';
import CustomCursor from './components/ui/CustomCursor';
import IntroSequence from './components/ui/IntroSequence';
import MainPortfolio from './components/MainPortfolio';
import StudioVideoGenerator from './components/ui/StudioVideoGenerator';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [videoBg, setVideoBg] = useState<string | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-[#030308] text-white overflow-x-hidden selection:bg-violet-500/30 selection:text-cyan-300 grain-overlay">
      <CustomCursor />

      {/* Animated mesh-gradient ambient background */}
      <div className="mesh-gradient" />

      {/* Video Background (from AI Studio generator) */}
      {videoBg && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <video
            src={videoBg}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-50 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/60 via-transparent to-[#030308]/90" />
        </div>
      )}

      {/* Persistent 3D Background — fades if video is present */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${
          videoBg ? 'opacity-15' : 'opacity-35'
        }`}
      >
        <Scene activeReel={0} />
      </div>

      <AnimatePresence mode="wait">
        {!introDone ? (
          <IntroSequence key="intro" onComplete={() => setIntroDone(true)} />
        ) : (
          <div key="main" className="relative z-10">
            <MainPortfolio />

            {/* AI Video Generator — appended after main portfolio */}
            <div className="w-full max-w-5xl mx-auto px-6 py-24 border-t border-white/5">
              <StudioVideoGenerator onVideoReady={(url) => setVideoBg(url)} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
