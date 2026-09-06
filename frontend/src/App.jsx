import { useState } from 'react';
import axios from 'axios';
import { InputForm } from './components/InputForm';
import { ContentRenderer } from './components/ContentRenderer';
import { ErrorAlert } from './components/ErrorAlert';
import { EditForm } from './components/EditForm';

// Set API base URL based on environment
const API_BASE_URL = 
  process.env.NODE_ENV === 'production'
    ? 'https://content-block-generator-backend.onrender.com/' 
    : 'http://localhost:5001';

function App() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);

  const handleGenerate = async (businessDescription) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/generate`, {
        businessDescription,
      });

      if (response.data.success) {
        setContent(response.data.content);
      } else {
        setError(response.data.error || 'Failed to generate content');
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.message ||
        'An error occurred while generating content';
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
      const response = await axios.post(`${API_BASE_URL}/api/edit`, {
        currentContent: content,
        blockType,
        editInstruction: instruction,
      });

      if (response.data.success) {
        setContent(response.data.content);
        setEditingBlock(null);
      } else {
        setError(response.data.error || 'Failed to edit content');
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.message ||
        'An error occurred while editing content';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Landing Page Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Generate a beautiful landing page from a simple business description
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {!content ? (
          // Input Section
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <ErrorAlert error={error} onDismiss={handleDismissError} />
            <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>
        ) : (
          // Display Generated Content
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Landing Page
              </h2>
              <button
                onClick={() => {
                  setContent(null);
                  setError(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Generate Another
              </button>
            </div>

            <ErrorAlert error={error} onDismiss={handleDismissError} />

            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <ContentRenderer content={content} onEdit={handleEdit} />
            </div>
          </div>
        )}
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
    </div>
  );
}

export default App;