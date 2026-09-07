export function ErrorAlert({ error, onDismiss }) {
  if (!error) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex justify-between items-start animate-slideIn">
      <div className="flex gap-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <h3 className="font-semibold text-red-900 mb-1">Error</h3>
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-600 hover:text-red-800 font-bold text-xl ml-4 flex-shrink-0"
      >
        ✕
      </button>
    </div>
  );
}