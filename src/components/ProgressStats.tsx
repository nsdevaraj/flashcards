import React from 'react';
import { Flashcard } from '../types';
import { Brain, Target, Calendar, TrendingUp } from 'lucide-react';

interface Props {
  cards: Flashcard[];
}

export function ProgressStats({ cards }: Props) {
  const totalCards = cards.length;
  const reviewedToday = cards.filter(
    card => card.lastReviewed && new Date(card.lastReviewed).toDateString() === new Date().toDateString()
  ).length;
  
  const averageEaseFactor = cards.reduce((acc, card) => acc + card.easeFactor, 0) / totalCards;
  const masteredCards = cards.filter(card => card.repetitions >= 5).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-blue-100 p-3">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Cards</p>
            <p className="text-2xl font-semibold">{totalCards}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-green-100 p-3">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Reviewed Today</p>
            <p className="text-2xl font-semibold">{reviewedToday}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-yellow-100 p-3">
            <TrendingUp className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg. Ease Factor</p>
            <p className="text-2xl font-semibold">{averageEaseFactor.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-purple-100 p-3">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Mastered</p>
            <p className="text-2xl font-semibold">{masteredCards}</p>
          </div>
        </div>
      </div>
    </div>
  );
}