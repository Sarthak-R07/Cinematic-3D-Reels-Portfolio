import React from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';
import { REEL_SECTIONS } from '../../data/portfolioData';
import { audioSynth } from '../../utils/audioSynthesizer';

interface ReelOverlayProps {
  activeReel: number;
  onNavigate: (index: number) => void;
}

export default function ReelOverlay({ activeReel, onNavigate }: ReelOverlayProps) {
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);

  const handleAudioToggle = async () => {
    const playing = await audioSynth.toggle();
    setIsAudioPlaying(playing);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-6 md:p-8 select-none">
      {/* Top Navigation & Controls */}
      <div className="w-full max-w-6xl mx-auto flex items-start justify-between">
        {/* Segmented Progress */}
        <div className="flex-1 flex gap-2 max-w-sm">
          {REEL_SECTIONS.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => onNavigate(idx)}
              className="pointer-events-auto flex-1 h-1 rounded-full bg-white/10 overflow-hidden cursor-pointer"
              aria-label={`Go to ${section.title}`}
            >
              <motion.div
                className="h-full bg-white"
                animate={{ width: idx <= activeReel ? '100%' : '0%' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </button>
          ))}
        </div>

        {/* Minimalist Audio Toggle */}
        <button
          onClick={handleAudioToggle}
          className="pointer-events-auto ml-4 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Toggle Audio"
        >
          {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
        </button>
      </div>

      {/* Bottom Up/Down Controls */}
      <div className="w-full max-w-6xl mx-auto flex items-end justify-end">
        <div className="pointer-events-auto flex flex-col gap-2">
          <button
            onClick={() => onNavigate(Math.max(0, activeReel - 1))}
            disabled={activeReel === 0}
            className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center transition-colors cursor-pointer ${
              activeReel === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-white'
            }`}
            aria-label="Previous Reel"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate(Math.min(REEL_SECTIONS.length - 1, activeReel + 1))}
            disabled={activeReel === REEL_SECTIONS.length - 1}
            className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center transition-colors cursor-pointer ${
              activeReel === REEL_SECTIONS.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-white'
            }`}
            aria-label="Next Reel"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
