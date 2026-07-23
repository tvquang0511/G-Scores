// Global TypeScript interfaces and types for G-Scores frontend

export interface StudentScore {
  registrationNumber: string;
  math: number | null;
  literature: number | null;
  foreignLanguage: number | null;
  physics: number | null;
  chemistry: number | null;
  biology: number | null;
  history: number | null;
  geography: number | null;
  civicEducation: number | null;
  foreignLanguageCode: string | null;
}

export interface SubjectStatistics {
  subject: string;
  subjectName: string;
  excellent: number;
  good: number;
  average: number;
  poor: number;
}

export interface GroupRanking {
  registrationNumber: string;
  math?: number;
  literature?: number;
  foreignLanguage?: number;
  physics?: number;
  chemistry?: number;
  biology?: number;
  history?: number;
  geography?: number;
  total: number;
}
