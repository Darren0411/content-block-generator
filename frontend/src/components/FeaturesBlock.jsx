export function FeaturesBlock({ block, onEdit }) {
  return (
    <section id="features" className="w-full py-32 px-6 bg-white dark:bg-dark-card transition-colors relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold mb-6">
            <span className="text-base">🌟</span> Key Benefits
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-dark-text mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to succeed
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {block.items.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-card dark:to-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 transition-all hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 dark:hover:shadow-blue-900/30"
            >
              {/* Number badge */}
              <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-lg group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>

              {/* Icon placeholder */}
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform">
                {['⚡', '🎯', '💡', '🚀', '✨', '🔥'][idx % 6]}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-black text-gray-900 dark:text-dark-text mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Hover arrow */}
              <div className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2">
                →
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        {/* Edit button */}
        <div className="text-center">
          <button
            onClick={() => onEdit('Features', block)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
             Edit Features
          </button>
        </div>
      </div>
    </section>
  );
}