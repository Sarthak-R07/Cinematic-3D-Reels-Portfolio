export interface SkillItem {
  id: string;
  name: string;
  category: 'languages' | 'frameworks' | '3d-creative' | 'tools-devops';
  level: number; // 0 - 100
  experience: string;
  tag: string;
  color: string;
  iconName: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  event: string;
  date: string;
  rank: string;
  description: string;
  tags: string[];
  metrics?: string;
  linkUrl?: string;
  isFeatured?: boolean;
}

export interface MediaProject {
  id: string;
  title: string;
  category: string;
  duration: string;
  aspectRatio: string;
  resolution: string;
  tools: string[];
  description: string;
  metrics: string;
  previewGradient: string;
  accentColor: string;
  videoUrl?: string;
  tags: string[];
}

export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  iconName: string;
  accentColor: string;
}

export interface ReelSectionInfo {
  index: number;
  id: string;
  title: string;
  subtitle: string;
  audioTrackName: string;
  tags: string[];
}
