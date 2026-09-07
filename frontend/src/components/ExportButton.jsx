import toast from 'react-hot-toast';

export function ExportButton({ content }) {
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
    );
    element.setAttribute('download', 'landing-page.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('📥 JSON exported successfully!');
  };

  const handleExportHTML = () => {
    const htmlContent = generateHTML(content);
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`
    );
    element.setAttribute('download', 'landing-page.html');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('💾 HTML exported successfully!');
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleExportJSON}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Export JSON
      </button>
      <button
        onClick={handleExportHTML}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Download HTML
      </button>
    </div>
  );
}

function generateHTML(content) {
  const heroBlock = content.blocks.find(b => b.type === 'Hero');
  const featuresBlock = content.blocks.find(b => b.type === 'Features');
  const footerBlock = content.blocks.find(b => b.type === 'Footer');

  const featuresHTML = featuresBlock ? `
    <section class="py-24 px-6 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">Key Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${featuresBlock.items
            .map(
              (item, idx) => `
            <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-lg font-bold mb-4">
                ${idx + 1}
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">${item.title}</h3>
              <p class="text-gray-600 leading-relaxed">${item.description}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  ` : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heroBlock?.heading || 'Landing Page'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade {
      animation: fadeIn 0.8s ease-in-out;
    }
  </style>
</head>
<body class="bg-white">
  <!-- Hero Section -->
  <section class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 px-6 flex items-center relative overflow-hidden">
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
    
    <div class="max-w-3xl mx-auto text-center relative z-10 animate-fade">
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        ${heroBlock?.heading || 'Welcome'}
      </h1>
      ${
        heroBlock?.subheading
          ? `<p class="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
        ${heroBlock.subheading}
      </p>`
          : ''
      }
      <a href="#features" class="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
        Explore Now ↓
      </a>
    </div>
  </section>

  <!-- Features Section -->
  ${featuresHTML}

  <!-- Footer -->
  <footer class="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-6 relative overflow-hidden">
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>
    
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <p class="text-lg text-gray-300">
          ${footerBlock?.text || 'Thank you for visiting'}
        </p>
      </div>
      
      <div class="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
        <p>Generated with AI Landing Page Generator • ${new Date().getFullYear()}</p>
      </div>
    </div>
  </footer>
</body>
</html>
  `;
}