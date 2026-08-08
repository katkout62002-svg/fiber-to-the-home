export type UserRole = 'apprentice' | 'wizard';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  wizardTip: string;
  keyTakeaways: string[];
  diagramType?: 'structure' | 'spectrum' | 'gpon_map' | 'connector_types' | 'splicing_steps' | 'otdr_trace' | 'link_budget';
  imageUrl?: string;
  imageCaption?: string;
}

export interface CourseModule {
  id: number;
  title: string;
  subtitle: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  iconName: string;
  description: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface FaultItem {
  id: string;
  title: string;
  category: 'splicing' | 'otdr' | 'connector' | 'cable';
  symptoms: string;
  cause: string;
  prevention: string;
  remedy: string;
  wizardQuote: string;
  visualType: 'bubble' | 'offset' | 'fat' | 'dust' | 'macrobend' | 'fibercut';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface OtdrEvent {
  distanceKm: number;
  type: 'launch' | 'connector' | 'splice' | 'macrobend' | 'fibercut' | 'end';
  lossDb: number;
  reflectanceDb?: number;
  description: string;
  hasFault?: boolean;
}

export interface SplicingStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  actionInstruction: string;
  goldenRule: string;
  mistakeAlert?: string;
}

export interface CertificateData {
  studentName: string;
  issueDate: string;
  score: number;
  roleTitle: string;
  certificateId: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  title: string;
  content: string;
  hashtag: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  tags: string[];
  solved?: boolean;
}
