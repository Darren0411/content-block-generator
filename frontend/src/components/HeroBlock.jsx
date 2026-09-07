export function HeroBlock({ block, onEdit }) {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-32 px-6 relative overflow-hidden flex items-center">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
          <span className="text-base">✨</span> AI Generated
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
          {block.heading}
        </h1>

        {/* Subheading */}
        {block.subheading && (
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
            {block.subheading}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
          >
            <span>Explore Features</span>
            <span className="text-xl">↓</span>
          </a>
          <button
            onClick={() => onEdit('Hero', block)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 hover:border-blue-400 text-gray-900 font-bold rounded-lg transition-all hover:shadow-lg active:scale-95"
          >
            <span> Edit</span>
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-600 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span>Instant Generation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span>AI Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✏️</span>
            <span>Fully Customizable</span>
          </div>
        </div>
      </div>
    </section>
  );
}