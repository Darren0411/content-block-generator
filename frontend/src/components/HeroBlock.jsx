export function HeroBlock({ block, onEdit }) {
  return (
    <section className="w-full bg-linear-to-r from-blue-50 to-indigo-50 py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {block.heading}
        </h1>
        {block.subheading && (
          <p className="text-lg text-gray-600 mb-6">
            {block.subheading}
          </p>
        )}
        <button
          onClick={() => onEdit('Hero', block)}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Edit section
        </button>
      </div>
    </section>
  );
}