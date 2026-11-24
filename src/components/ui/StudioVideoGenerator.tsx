import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Film, Loader2, Play, CheckCircle } from 'lucide-react';

export default function StudioVideoGenerator({ onVideoReady }: { onVideoReady: (videoUrl: string) => void }) {
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'generating' | 'polling' | 'downloading' | 'complete' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 3); // Max 3
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => {
            if (prev.length < 3) return [...prev, reader.result as string];
            return prev;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const generateVideo = async () => {
    if (images.length === 0) return;
    setStatus('generating');
    setErrorMsg('');

    try {
      // 1. Start Generation
      const startRes = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images }),
      });
      const startData = await startRes.json();
      
      if (!startRes.ok) throw new Error(startData.error || 'Failed to start generation');
      const opName = startData.operationName;

      // 2. Poll Status
      setStatus('polling');
      let done = false;
      while (!done) {
        await new Promise(r => setTimeout(r, 10000)); // Poll every 10 seconds
        
        const pollRes = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName: opName }),
        });
        const pollData = await pollRes.json();
        
        if (!pollRes.ok) throw new Error(pollData.error || 'Failed to poll status');
        done = pollData.done;
      }

      // 3. Download
      setStatus('downloading');
      const downloadRes = await fetch('/api/video-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName: opName }),
      });

      if (!downloadRes.ok) {
        const errData = await downloadRes.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to download video');
      }

      const blob = await downloadRes.blob();
      const videoUrl = URL.createObjectURL(blob);
      
      setStatus('complete');
      onVideoReady(videoUrl);
      
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during video generation.');
      setStatus('error');
    }
  };

  if (status === 'complete') {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-500/10 border border-green-500/20 rounded-2xl">
        <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Cinematic Intro Ready!</h3>
        <p className="text-green-200">The video has been successfully applied to your background.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl mt-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Cinematic AI Studio</h3>
        <p className="text-neutral-400">Upload up to 3 reference images to generate your custom Veo cinematic background video.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-[9/16] md:aspect-video bg-neutral-800 rounded-xl overflow-hidden group">
            <img src={img} alt={`Upload ${i+1}`} className="w-full h-full object-cover" />
            <button 
              onClick={() => removeImage(i)}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
            >
              ×
            </button>
          </div>
        ))}
        {images.length < 3 && (
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-[9/16] md:aspect-video flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/20 rounded-xl hover:border-white/50 hover:bg-white/5 transition-all cursor-pointer text-neutral-400 hover:text-white"
          >
            <Upload className="w-6 h-6" />
            <span className="text-sm font-medium">Add Image</span>
          </button>
        )}
      </div>

      <input 
        type="file" 
        accept="image/*" 
        multiple 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileUpload}
      />

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={generateVideo}
          disabled={images.length === 0 || status !== 'idle'}
          className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all
            ${images.length === 0 || status !== 'idle' 
              ? 'bg-white/10 text-white/30 cursor-not-allowed' 
              : 'bg-white text-black hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]'
            }`}
        >
          {status === 'idle' && <><Film className="w-5 h-5" /> Generate Cinematic Intro</>}
          {status === 'generating' && <><Loader2 className="w-5 h-5 animate-spin" /> Starting Engine...</>}
          {status === 'polling' && <><Loader2 className="w-5 h-5 animate-spin" /> Rendering Video (Takes a few mins)...</>}
          {status === 'downloading' && <><Loader2 className="w-5 h-5 animate-spin" /> Downloading Intro...</>}
        </button>

        {errorMsg && (
          <div className="text-red-400 text-sm mt-4 p-4 bg-red-500/10 rounded-lg w-full text-center">
            {errorMsg}
          </div>
        )}
        
        {status === 'polling' && (
          <p className="text-sm text-neutral-500 mt-2 text-center">
            Grab a coffee! Veo cinematic renders take high processing power and typically complete in 2-4 minutes.
          </p>
        )}
      </div>
    </div>
  );
}
