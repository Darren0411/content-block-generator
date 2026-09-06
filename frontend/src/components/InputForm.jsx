import { useState } from 'react';

export function InputForm({ onSubmit, isLoading }) {
  const [description, setDescription] = useState('');
  const maxLength = 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-semibold mb-2">
            Business Description
          </label>
          <textarea
            id="description"
            placeholder="e.g., A cozy neighborhood coffee shop..."
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, maxLength))}
            disabled={isLoading}
            className="w-full min-h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-xs text-gray-500 mt-2">
            {description.length} / {maxLength}
          </div>
        </div>
        <button
          type="submit"
          disabled={!description.trim() || isLoading}
          className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Landing Page'}
        </button>
      </div>
    </form>
  );
}