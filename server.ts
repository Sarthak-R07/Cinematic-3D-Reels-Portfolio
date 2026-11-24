import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // Endpoint 1: Start Video Generation
  app.post('/api/generate-video', async (req, res) => {
    try {
      const { images } = req.body; // Array of base64 images

      if (!images || images.length === 0) {
        return res.status(400).json({ error: 'No images provided' });
      }

      const referenceImagesPayload = images.map((imgBase64: string) => ({
        image: {
          imageBytes: imgBase64.split(',')[1] || imgBase64, // Remove data URI prefix if present
          mimeType: 'image/jpeg',
        },
        referenceType: 'ASSET',
      }));

      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-generate-preview',
        prompt: 'A highly cinematic intro video featuring these elements, dynamic camera movement, dramatic lighting, epic intro feel.',
        config: {
          numberOfVideos: 1,
          referenceImages: referenceImagesPayload,
          resolution: '720p',
          aspectRatio: '16:9',
        },
      });

      res.json({ operationName: operation.name });
    } catch (error: any) {
      console.error('Error starting video generation:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Endpoint 2: Poll Video Status
  app.post('/api/video-status', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) return res.status(400).json({ error: 'operationName required' });

      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      
      res.json({ done: updated.done });
    } catch (error: any) {
      console.error('Error polling video:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Endpoint 3: Download Video
  app.post('/api/video-download', async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) return res.status(400).json({ error: 'operationName required' });

      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      
      if (!updated.done) {
        return res.status(400).json({ error: 'Video generation is not complete yet.' });
      }

      const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
      if (!uri) {
        return res.status(500).json({ error: 'Video URI not found in completed operation.' });
      }

      const videoRes = await fetch(uri, {
        headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY! },
      });

      if (!videoRes.ok) {
        throw new Error(`Failed to download video from Google API: ${videoRes.statusText}`);
      }

      res.setHeader('Content-Type', 'video/mp4');
      
      // Node.js streaming from fetch body
      if (videoRes.body) {
        // @ts-ignore - node-fetch / undici body streams are iterable
        for await (const chunk of videoRes.body) {
          res.write(chunk);
        }
        res.end();
      } else {
        res.status(500).json({ error: 'Video body is empty' });
      }
    } catch (error: any) {
      console.error('Error downloading video:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
