import React, { useState } from 'react';
import { Flashcard } from '../types';
import { ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Props {
  card: Flashcard;
  onResponse: (quality: number) => void;
  onNext: () => void;
}

export function FlashCard({ card, onResponse, onNext }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleFlip = () => {
    if (!hasAnswered) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleResponse = (quality: number) => {
    setHasAnswered(true);
    onResponse(quality);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setHasAnswered(false);
    onNext();
  };

  return (
    <div className="w-full max-w-xl">
      <div
        className={`relative h-64 w-full cursor-pointer perspective-1000 transform-gpu transition-transform duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
      >
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full w-full rounded-xl bg-white p-8 shadow-lg">
            <div className="flex h-full flex-col items-center justify-center">
              <span className="text-sm text-gray-500">{card.category}</span>
              <h2 className="mt-4 text-center text-xl font-semibold">{card.question}</h2>
              <p className="mt-4 text-center text-gray-600">Click to reveal answer</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full w-full rounded-xl bg-white p-8 shadow-lg">
            <div className="flex h-full flex-col items-center justify-center">
              <p className="text-center text-lg">{card.answer}</p>
              
              {!hasAnswered && (
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleResponse(1)}
                    className="flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200"
                  >
                    <ThumbsDown size={20} /> Hard
                  </button>
                  <button
                    onClick={() => handleResponse(3)}
                    className="flex items-center gap-2 rounded-lg bg-yellow-100 px-4 py-2 text-yellow-600 hover:bg-yellow-200"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => handleResponse(5)}
                    className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2 text-green-600 hover:bg-green-200"
                  >
                    <ThumbsUp size={20} /> Easy
                  </button>
                </div>
              )}
              
              {hasAnswered && (
                <button
                  onClick={handleNext}
                  className="mt-6 flex items-center gap-2 rounded-lg bg-blue-100 px-6 py-2 text-blue-600 hover:bg-blue-200"
                >
                  Next <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}