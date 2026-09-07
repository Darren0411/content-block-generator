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

  const progress = (description.length / maxLength) * 100;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-6">
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-white mb-3">
            Describe Your Business
          </label>
          <textarea
            id="description"
            placeholder="e.g., A cozy neighborhood coffee shop with local art displays and freshly baked pastries..."
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, maxLength))}
            disabled={isLoading}
            className="w-full min-h-32 p-4 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition backdrop-blur-sm"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-400">
              {description.length} / {maxLength} characters
            </span>
            <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!description.trim() || isLoading}
          className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Generating...
            </div>
          ) : (
            'Generate Landing Page'
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Takes 5-10 seconds • Powered by AI
        </p>
      </div>
    </form>
  );
}