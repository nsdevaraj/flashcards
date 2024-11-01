import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (card: { question: string; answer: string; category: string; difficulty: 'easy' | 'medium' | 'hard' }) => void;
}

export function AddCardModal({ isOpen, onClose, onAdd }: Props) {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    difficulty: 'medium' as const,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ question: '', answer: '', category: '', difficulty: 'medium' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add New Flashcard</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Question</label>
            <textarea
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.question}
              onChange={e => setFormData({ ...formData, question: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Answer</label>
            <textarea
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.answer}
              onChange={e => setFormData({ ...formData, answer: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.difficulty}
              onChange={e => setFormData({ ...formData, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}