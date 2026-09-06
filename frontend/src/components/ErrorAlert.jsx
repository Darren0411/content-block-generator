export function ErrorAlert({ error, onDismiss }) {
  if (!error) return null;

  return (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-start">
      <span className="text-red-800 text-sm">{error}</span>
      <button
        onClick={onDismiss}
        className="text-red-600 hover:text-red-800 font-semibold text-sm"
      >
        ✕
      </button>
    </div>
  );
}