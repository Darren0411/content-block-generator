import { useState, useEffect } from 'react';
import axios from 'axios';
import { InputForm } from './components/InputForm';
import { ContentRenderer } from './components/ContentRenderer';
import { ErrorAlert } from './components/ErrorAlert';
import { EditForm } from './components/EditForm';
import { ToastProvider } from './components/ToastProvider';
import { ExportButton } from './components/ExportButton';
import toast from 'react-hot-toast';

const API_BASE_URL = 
  process.env.NODE_ENV === 'production'
    ? 'https://content-block-generator-backend.onrender.com'
    : 'http://localhost:5001';

function App() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('darkMode') === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Cmd/Ctrl + N: Generate new
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        if (content) {
          setContent(null);
          setError(null);
          toast.success('Ready to generate new page');
        }
      }
      // Esc: Close edit modal
      if (e.key === 'Escape' && editingBlock) {
        e.preventDefault();
        handleEditCancel();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [content, editingBlock]);

  const handleGenerate = async (businessDescription) => {
    setIsLoading(true);
    setError(null);

    try {
      const toastId = toast.loading('🚀 Generating your landing page...', {
        duration: Infinity,
      });

      const response = await axios.post(`${API_BASE_URL}/api/generate`, {
        businessDescription,
      });

      toast.dismiss(toastId);

      if (response.data.success) {
        setContent(response.data.content);
        toast.success('✨ Landing page generated!');
      } else {
        toast.error(response.data.error || 'Failed to generate content');
        setError(response.data.error);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Something went wrong';
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (blockType, block) => {
    setEditingBlock({ blockType, block });
  };

  const handleEditSubmit = async (blockType, instruction) => {
    setIsLoading(true);
    setError(null);

    try {
      const toastId = toast.loading(`✏️ Updating ${blockType}...`, {
        duration: Infinity,
      });

      const response = await axios.post(`${API_BASE_URL}/api/edit`, {
        currentContent: content,
        blockType,
        editInstruction: instruction,
      });

      toast.dismiss(toastId);

      if (response.data.success) {
        setContent(response.data.content);
        setEditingBlock(null);
        toast.success(`✨ ${blockType} updated!`);
      } else {
        toast.error(response.data.error || 'Failed to edit content');
        setError(response.data.error);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditingBlock(null);
  };

  const handleDismissError = () => {
    setError(null);
  };

  // Results page
  if (content) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors">
        <ToastProvider />

        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="fixed top-6 right-6 z-50 p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl"
          aria-label="Toggle dark mode"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* Results Header */}
        <header className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-dark-text">
                  ✨ Your Landing Page
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  AI-generated, ready to customize, and exportable
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <ExportButton content={content} />
                <button
                  onClick={() => {
                    setContent(null);
                    setError(null);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  ✨ Generate Another
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <ErrorAlert error={error} onDismiss={handleDismissError} />

          <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700 transition-colors animate-slideIn">
            <ContentRenderer content={content} onEdit={handleEdit} />
          </div>
        </main>

        {/* Edit Modal */}
        {editingBlock && (
          <EditForm
            block={editingBlock.block}
            blockType={editingBlock.blockType}
            onSubmit={handleEditSubmit}
            onCancel={handleEditCancel}
            isLoading={isLoading}
          />
        )}

        {/* Keyboard shortcuts hint */}
        <div className="fixed bottom-4 left-4 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-card rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
          <p>⌘N: New • ESC: Close</p>
        </div>
      </div>
    );
  }

  // Homepage
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-black dark:via-slate-900 dark:to-black transition-colors">
      <ToastProvider />

      {/* Dark mode toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 z-50 p-2.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all shadow-lg hover:shadow-xl backdrop-blur-sm"
        aria-label="Toggle dark mode"
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
           Landing Page Generator
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Generate Beautiful
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Landing Pages
            </span>
            <br />
            With AI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Just describe your business in one sentence. Our AI will generate a complete landing page with Hero, Features, and Footer sections in seconds.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:border-blue-400/50 transition-all hover:bg-white/20 hover:shadow-lg transform hover:-translate-y-1">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-white font-semibold mb-2">Instant Generation</h3>
              <p className="text-gray-400 text-sm">Get a complete landing page in seconds</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:border-blue-400/50 transition-all hover:bg-white/20 hover:shadow-lg transform hover:-translate-y-1">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-white font-semibold mb-2">AI-Powered Content</h3>
              <p className="text-gray-400 text-sm">Powered by Google Gemini</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:border-blue-400/50 transition-all hover:bg-white/20 hover:shadow-lg transform hover:-translate-y-1">
              <div className="text-4xl mb-3">✏️</div>
              <h3 className="text-white font-semibold mb-2">Fully Editable</h3>
              <p className="text-gray-400 text-sm">Refine any section with one click</p>
            </div>
          </div>
        </div>

        {/* Input Form Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 lg:p-12 shadow-2xl hover:shadow-3xl hover:border-white/30 transition-all animate-scaleIn">
          <ErrorAlert error={error} onDismiss={handleDismissError} />
          <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>

        {/* Footer Text */}
        <div className="text-center mt-12 text-gray-400">
          <p className="text-sm">
            No credit card required • Free to use • Powered by{' '}
            <span className="text-blue-400 font-semibold">Google Gemini API</span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;