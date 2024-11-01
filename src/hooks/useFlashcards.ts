import { useState, useEffect } from 'react';
import { Flashcard } from '../types';

const INITIAL_CARDS: Flashcard[] = [
  {
    id: '1',
    question: 'What is the capital of France?',
    answer: 'Paris',
    category: 'Geography',
    difficulty: 'easy',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5,
  },
  {
    id: '2',
    question: 'What is React?',
    answer: 'A JavaScript library for building user interfaces',
    category: 'Programming',
    difficulty: 'medium',
    repetitions: 0,
    interval: 1,
    easeFactor: 2.5,
  },
];

export function useFlashcards() {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('flashcards');
    return saved ? JSON.parse(saved) : INITIAL_CARDS;
  });

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(cards));
  }, [cards]);

  const addCard = (card: Omit<Flashcard, 'id' | 'repetitions' | 'interval' | 'easeFactor'>) => {
    const newCard: Flashcard = {
      ...card,
      id: Date.now().toString(),
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
    };
    setCards([...cards, newCard]);
  };

  const updateCard = (cardId: string, quality: number) => {
    setCards(cards.map(card => {
      if (card.id !== cardId) return card;

      const newInterval = calculateNextInterval(card, quality);
      const newEaseFactor = Math.max(1.3, card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

      return {
        ...card,
        repetitions: card.repetitions + 1,
        interval: newInterval,
        easeFactor: newEaseFactor,
        lastReviewed: new Date(),
        nextReview: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000),
      };
    }));
  };

  const calculateNextInterval = (card: Flashcard, quality: number): number => {
    if (quality < 3) return 1;
    if (card.repetitions === 0) return 1;
    if (card.repetitions === 1) return 6;
    return Math.round(card.interval * card.easeFactor);
  };

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
  };

  return {
    cards,
    currentCard: cards[currentCardIndex],
    addCard,
    updateCard,
    nextCard,
  };
}