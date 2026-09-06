export function FooterBlock({ block, onEdit }) {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-gray-300 mb-4">
          {block.text}
        </p>
        <div className="text-center">
          <button
            onClick={() => onEdit('Footer', block)}
            className="text-sm text-gray-400 hover:text-gray-200 underline"
          >
            Edit footer
          </button>
        </div>
      </div>
    </footer>
  );
}