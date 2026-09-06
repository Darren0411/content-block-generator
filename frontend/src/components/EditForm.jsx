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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Edit {blockType}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="instruction" className="block text-sm font-semibold mb-2">
              What would you like to change?
            </label>
            <textarea
              id="instruction"
              placeholder={`e.g., "Make the heading shorter" or "Add more details about coffee"`}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value.slice(0, maxLength))}
              disabled={isLoading}
              className="w-full min-h-20 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!instruction.trim() || isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}