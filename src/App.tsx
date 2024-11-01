import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FlashCard } from './components/FlashCard';
import { ProgressStats } from './components/ProgressStats';
import { AddCardModal } from './components/AddCardModal';
import { useFlashcards } from './hooks/useFlashcards';

function App() {
  const { cards, currentCard, addCard, updateCard, nextCard } = useFlashcards();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">FlashMaster</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus size={20} /> Add Card
          </button>
        </div>

        <div className="mb-8">
          <ProgressStats cards={cards} />
        </div>

        <div className="flex justify-center">
          {currentCard ? (
            <FlashCard
              card={currentCard}
              onResponse={(quality) => updateCard(currentCard.id, quality)}
              onNext={nextCard}
            />
          ) : (
            <div className="rounded-xl bg-white p-8 text-center shadow-lg">
              <p className="text-xl text-gray-600">No cards to review!</p>
              <p className="mt-2 text-gray-500">Add some cards to get started.</p>
            </div>
          )}
        </div>

        <AddCardModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addCard}
        />
      </div>
    </div>
  );
}

export default App;