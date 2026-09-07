import { useState } from 'react';

export function EditForm({ block, blockType, onSubmit, onCancel, isLoading }) {
  const [instruction, setInstruction] = useState('');
  const maxLength = 300;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (instruction.trim()) {
      onSubmit(blockType, instruction);
      setInstruction('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Edit {blockType}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="instruction" className="block text-sm font-semibold text-gray-700 mb-3">
              What would you like to change?
            </label>
            <textarea
              id="instruction"
              placeholder={`e.g., "Make the heading shorter" or "Add more details about features"`}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value.slice(0, maxLength))}
              disabled={isLoading}
              className="w-full min-h-24 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 resize-none transition disabled:bg-gray-50"
              autoFocus
            />
            <div className="text-xs text-gray-500 mt-2">
              {instruction.length} / {maxLength}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!instruction.trim() || isLoading}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}