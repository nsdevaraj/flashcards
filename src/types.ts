export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  lastReviewed?: Date;
  nextReview?: Date;
  difficulty: 'easy' | 'medium' | 'hard';
  repetitions: number;
  interval: number;
  easeFactor: number;
}

export interface StudyStats {
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
  streakDays: number;
  lastStudyDate?: Date;
}