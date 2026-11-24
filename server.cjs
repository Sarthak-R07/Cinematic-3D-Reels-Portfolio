var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "50mb" }));
  app.post("/api/generate-video", async (req, res) => {
    try {
      const { images } = req.body;
      if (!images || images.length === 0) {
        return res.status(400).json({ error: "No images provided" });
      }
      const referenceImagesPayload = images.map((imgBase64) => ({
        image: {
          imageBytes: imgBase64.split(",")[1] || imgBase64,
          // Remove data URI prefix if present
          mimeType: "image/jpeg"
        },
        referenceType: "ASSET"
      }));
      const operation = await ai.models.generateVideos({
        model: "veo-3.1-generate-preview",
        prompt: "A highly cinematic intro video featuring these elements, dynamic camera movement, dramatic lighting, epic intro feel.",
        config: {
          numberOfVideos: 1,
          referenceImages: referenceImagesPayload,
          resolution: "720p",
          aspectRatio: "16:9"
        }
      });
      res.json({ operationName: operation.name });
    } catch (error) {
      console.error("Error starting video generation:", error);
      res.status(500).json({ error: error.message });
    }
  });
  app.post("/api/video-status", async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) return res.status(400).json({ error: "operationName required" });
      const op = new import_genai.GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      res.json({ done: updated.done });
    } catch (error) {
      console.error("Error polling video:", error);
      res.status(500).json({ error: error.message });
    }
  });
  app.post("/api/video-download", async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) return res.status(400).json({ error: "operationName required" });
      const op = new import_genai.GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      if (!updated.done) {
        return res.status(400).json({ error: "Video generation is not complete yet." });
      }
      const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
      if (!uri) {
        return res.status(500).json({ error: "Video URI not found in completed operation." });
      }
      const videoRes = await fetch(uri, {
        headers: { "x-goog-api-key": process.env.GEMINI_API_KEY }
      });
      if (!videoRes.ok) {
        throw new Error(`Failed to download video from Google API: ${videoRes.statusText}`);
      }
      res.setHeader("Content-Type", "video/mp4");
      if (videoRes.body) {
        for await (const chunk of videoRes.body) {
          res.write(chunk);
        }
        res.end();
      } else {
        res.status(500).json({ error: "Video body is empty" });
      }
    } catch (error) {
      console.error("Error downloading video:", error);
      res.status(500).json({ error: error.message });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
