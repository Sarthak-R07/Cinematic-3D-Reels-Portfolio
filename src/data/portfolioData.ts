import { SkillItem, AchievementItem, MediaProject, SocialLink, ReelSectionInfo } from '../types';

// =============================================================================
// TODO: Paste your personal info and hero details here
// =============================================================================
export const PERSONAL_INFO = {
  name: "SARTHAK RODGE", // TODO: Paste your name here
  handle: "@sarthak.dev", // TODO: Paste your handle here
  tagline: "Creative Developer // 3D & Full-Stack Architect", // TODO: Paste your tagline here
  subtagline: "Crafting hyper-cinematic 3D web experiences, robust APIs, and high-performance apps at the intersection of design & code.", // TODO: Paste your subtagline here
  location: "India // Remote Global", // TODO: Paste your location here
  statusBadge: "Available for High-Impact Roles & Hackathons", // TODO: Paste your availability status
  reelAudioTrack: "CYBER_PULSE // 128 BPM Synthwave", // Ambient track title
  viewsCount: "128.4K",
  initialLikes: 1420,
  initialBookmarks: 839,
  resumeLink: "#resume", // TODO: Paste your resume or drive link here
  contactEmail: "sarthakrodge69762@gmail.com", // TODO: Paste your email here
};

// =============================================================================
// REEL SECTIONS CONFIGURATION
// =============================================================================
export const REEL_SECTIONS: ReelSectionInfo[] = [
  {
    index: 0,
    id: "hero",
    title: "THE PROLOGUE",
    subtitle: "Creative Developer & 3D Specialist",
    audioTrackName: "REEL 01 • CYBER_PULSE (ORIGINAL MIX)",
    tags: ["#Developer", "#ThreeJS", "#CreativeTech", "#ReelsPortfolio"],
  },
  {
    index: 1,
    id: "skills",
    title: "TECH ARSENAL",
    subtitle: "Languages, Frameworks & 3D Engines",
    audioTrackName: "REEL 02 • NEURAL_SYNAPSE (BASS BOOST)",
    tags: ["#FastAPI", "#React", "#Cpp", "#Python", "#ReactNative"],
  },
  {
    index: 2,
    id: "achievements",
    title: "HALL OF TRIUMPHS",
    subtitle: "Hackathons, Awards & Milestones",
    audioTrackName: "REEL 03 • VICTORY_CHORD (CINEMATIC)",
    tags: ["#SmartIndiaHackathon", "#Winner", "#Innovator", "#Builds"],
  },
  {
    index: 3,
    id: "media",
    title: "MEDIA & MOTION",
    subtitle: "Video Editing, Motion Graphics & UI/UX",
    audioTrackName: "REEL 04 • TIMELINE_SHRRED (4K 60FPS)",
    tags: ["#PremierePro", "#AfterEffects", "#UIUX", "#MotionDesign"],
  },
  {
    index: 4,
    id: "contact",
    title: "SIGNAL INITIATION",
    subtitle: "Terminal Access & Collaborative Channels",
    audioTrackName: "REEL 05 • DISCONNECT_OUTRO (LOFI CHILL)",
    tags: ["#HireMe", "#Collab", "#Connect", "#Terminal"],
  },
];

// =============================================================================
// TODO: Paste your skills and tech stack data here
// =============================================================================
export const SKILLS_DATA: SkillItem[] = [
  // --- Languages ---
  {
    id: "lang-cpp",
    name: "C++", // TODO: Paste your language
    category: "languages",
    level: 92,
    experience: "Competitive Programming & Performance Core",
    tag: "Core Systems & STL",
    color: "#00599C",
    iconName: "Cpu",
  },
  {
    id: "lang-python",
    name: "Python", // TODO: Paste your language
    category: "languages",
    level: 95,
    experience: "Backend Services, Data Pipelines & AI",
    tag: "Data & Systems",
    color: "#3776AB",
    iconName: "Terminal",
  },
  {
    id: "lang-js",
    name: "JavaScript / TypeScript", // TODO: Paste your language
    category: "languages",
    level: 96,
    experience: "Modern ESNext, Type Safety & Async Architectures",
    tag: "Web & Mobile Core",
    color: "#F7DF1E",
    iconName: "Code",
  },
  {
    id: "lang-rust",
    name: "Rust / Go", // TODO: Paste your language
    category: "languages",
    level: 80,
    experience: "High-concurrency microservices & WebAssembly",
    tag: "Systems & Memory",
    color: "#DEA584",
    iconName: "Zap",
  },

  // --- Frameworks ---
  {
    id: "fw-react-native",
    name: "React Native", // TODO: Paste your framework
    category: "frameworks",
    level: 90,
    experience: "Cross-platform mobile apps with native bridges",
    tag: "iOS & Android",
    color: "#61DAFB",
    iconName: "Smartphone",
  },
  {
    id: "fw-fastapi",
    name: "FastAPI", // TODO: Paste your framework
    category: "frameworks",
    level: 94,
    experience: "Asynchronous Python APIs with OpenAPI & Pydantic",
    tag: "Microservices",
    color: "#009688",
    iconName: "Server",
  },
  {
    id: "fw-react-vite",
    name: "React & Next.js", // TODO: Paste your framework
    category: "frameworks",
    level: 95,
    experience: "Full-stack apps, SSR, state machines & reactive flows",
    tag: "Modern Frontend",
    color: "#61DAFB",
    iconName: "Layers",
  },
  {
    id: "fw-tailwind",
    name: "Tailwind CSS", // TODO: Paste your framework
    category: "frameworks",
    level: 98,
    experience: "Pixel-perfect cinematic glassmorphism & responsive layouts",
    tag: "UI Architecture",
    color: "#38BDF8",
    iconName: "Palette",
  },

  // --- 3D & Creative ---
  {
    id: "cr-threejs",
    name: "Three.js / R3F", // TODO: Paste your 3D tool
    category: "3d-creative",
    level: 89,
    experience: "Shaders, physics, lighting, GLTF pipelines & Drei",
    tag: "WebGL & Spatial UI",
    color: "#A855F7",
    iconName: "Box",
  },
  {
    id: "cr-motion",
    name: "Framer Motion", // TODO: Paste your animation tool
    category: "3d-creative",
    level: 95,
    experience: "Scroll-linked animations, physics springs, gestures",
    tag: "Micro-interactions",
    color: "#EC4899",
    iconName: "Sparkles",
  },
  {
    id: "cr-video",
    name: "Premiere & DaVinci", // TODO: Paste your video editing stack
    category: "3d-creative",
    level: 90,
    experience: "Color grading, audio design, speed ramps, reels storytelling",
    tag: "Post-Production",
    color: "#9999FF",
    iconName: "Film",
  },

  // --- Tools & DevOps ---
  {
    id: "tl-docker",
    name: "Docker & Linux", // TODO: Paste your tools
    category: "tools-devops",
    level: 88,
    experience: "Containerization, bash automation, cloud deployments",
    tag: "Infrastructure",
    color: "#2496ED",
    iconName: "Container",
  },
  {
    id: "tl-git",
    name: "Git & CI/CD", // TODO: Paste your tools
    category: "tools-devops",
    level: 94,
    experience: "Version control, automated testing & edge delivery",
    tag: "Workflows",
    color: "#F05032",
    iconName: "GitBranch",
  },
];

// =============================================================================
// TODO: Paste your Achievements & Hackathon Wins here
// =============================================================================
export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "ach-sih",
    title: "Smart India Hackathon (SIH)", // TODO: Paste event title
    subtitle: "National Finalist & Problem Statement Winners",
    event: "Ministry of Education / AICTE",
    date: "2024 - 2025", // TODO: Paste date
    rank: "🏆 1ST PLACE WINNER",
    description: "Architected a real-time distributed emergency routing and automated dispatch platform utilizing FastAPI, WebSockets, and geospatial optimization algorithms under intense 36-hour sprint.", // TODO: Paste description
    tags: ["FastAPI", "React Native", "GeoSpatial", "WebSockets", "IoT"],
    metrics: "Ranked #1 out of 500+ institutional engineering squads",
    isFeatured: true,
  },
  {
    id: "ach-hack-ai",
    title: "Global AI & Web3 Hackathon", // TODO: Paste event title
    subtitle: "Best Spatial Experience & Multimodal UI",
    event: "International Tech Summit",
    date: "OCTOBER 2024",
    rank: "🥇 RUNNER UP & TRACK WINNER",
    description: "Developed an interactive 3D spatial knowledge graph viewer using Three.js and vector embeddings, enabling developers to visually debug model latent spaces in virtual coordinates.",
    tags: ["Three.js", "Python", "Vector DB", "WebGL"],
    metrics: "Evaluated by top industry judges from Google & Meta",
    isFeatured: true,
  },
  {
    id: "ach-open-source",
    title: "Open Source Fellowship Grantee", // TODO: Paste event title
    subtitle: "High-Performance Core Contributor",
    event: "Open Developer Initiative",
    date: "SUMMER 2024",
    rank: "⭐ RECOGNIZED FELLOW",
    description: "Refactored cross-platform rendering pipelines, reducing frame drop by 38% in high-traffic canvas components and authoring comprehensive documentation.",
    tags: ["C++", "TypeScript", "Performance Tuning"],
    metrics: "Over 2,500+ GitHub stars across contributed repositories",
    isFeatured: false,
  },
  {
    id: "ach-code-olympiad",
    title: "National Code Olympiad", // TODO: Paste event title
    subtitle: "Algorithmic Precision & Speed Round",
    event: "Inter-University Coding Championship",
    date: "APRIL 2024",
    rank: "🎖️ TOP 1% PERCENTILE",
    description: "Solved complex dynamic programming and graph theory problems in record time under stringent memory bounds.",
    tags: ["C++", "Algorithms", "Graph Theory"],
    metrics: "Score: 98.6% across all algorithmic benchmark suites",
    isFeatured: false,
  },
];

// =============================================================================
// TODO: Paste your Media, Video Editing & UI/UX showcase projects here
// =============================================================================
export const MEDIA_PROJECTS: MediaProject[] = [
  {
    id: "media-reel-01",
    title: "CYBERPUNK NEON RUSH // COMMERCIAL EDIT", // TODO: Paste project title
    category: "Motion Graphics & Speed Ramp Reel",
    duration: "00:45",
    aspectRatio: "9:16 Vertical",
    resolution: "4K UHD @ 60FPS",
    tools: ["DaVinci Resolve", "After Effects", "Sound Design"],
    description: "High-octane commercial short with seamless whip pans, custom chromatic glitch transitions, beat-synced sound design, and custom 3D typography overlays.",
    metrics: "250K+ Organically Streamed Views across Reels/TikTok",
    previewGradient: "from-purple-900/60 via-indigo-900/50 to-black",
    accentColor: "#a855f7",
    tags: ["Color Grade", "Speed Ramp", "Sound FX", "3D Camera Tracker"],
  },
  {
    id: "media-reel-02",
    title: "FUTURISTIC HUD & SPATIAL UI // DESIGN CASE", // TODO: Paste project title
    category: "UI/UX & Interactive Prototyping",
    duration: "01:12",
    aspectRatio: "16:9 Cinema",
    resolution: "4K HDR Master",
    tools: ["Figma", "Three.js", "Blender", "After Effects"],
    description: "Interactive holographic HUD layout designed for next-generation vehicle telematics and tactical dashboards with glass refraction and real-time telemetry markers.",
    metrics: "Featured on Dribbble & Designer News Trending",
    previewGradient: "from-cyan-900/60 via-blue-950/50 to-black",
    accentColor: "#06b6d4",
    tags: ["Spatial UI", "Glassmorphism", "Blender", "Microinteractions"],
  },
  {
    id: "media-reel-03",
    title: "DEV HACKS // VIRAL TECH REEL SERIES", // TODO: Paste project title
    category: "Short-Form Educational Content",
    duration: "00:58",
    aspectRatio: "9:16 Vertical",
    resolution: "1080x1920 (Reels Spec)",
    tools: ["Premiere Pro", "Photoshop", "CapCut Pro"],
    description: "Snappy, retention-optimized short breakdowns explaining low-level systems programming and Three.js shader tricks with dynamic kinetic text and sound drops.",
    metrics: "45K+ Bookmarks & 8.5K Shares",
    previewGradient: "from-emerald-900/60 via-teal-950/50 to-black",
    accentColor: "#10b981",
    tags: ["Kinetic Typography", "Retention Hook", "Code Breakdown"],
  },
];

// =============================================================================
// TODO: Paste your social links and handles here
// =============================================================================
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "soc-github",
    name: "GitHub",
    handle: "github.com/sarthak-rodge", // TODO: Paste your link
    url: "https://github.com",
    iconName: "Github",
    accentColor: "#f43f5e",
  },
  {
    id: "soc-linkedin",
    name: "LinkedIn",
    handle: "linkedin.com/in/sarthak-rodge", // TODO: Paste your link
    url: "https://linkedin.com",
    iconName: "Linkedin",
    accentColor: "#0ea5e9",
  },
  {
    id: "soc-twitter",
    name: "X / Twitter",
    handle: "@sarthak_codes", // TODO: Paste your link
    url: "https://x.com",
    iconName: "Twitter",
    accentColor: "#38bdf8",
  },
  {
    id: "soc-email",
    name: "Direct Email",
    handle: "sarthakrodge69762@gmail.com", // TODO: Paste your link
    url: "mailto:sarthakrodge69762@gmail.com",
    iconName: "Mail",
    accentColor: "#a855f7",
  },
];
