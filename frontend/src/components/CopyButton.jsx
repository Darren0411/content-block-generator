import { useState } from 'react';
import toast from 'react-hot-toast';

export function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      {copied ? '✓ Copied!' : `📋 ${label}`}
    </button>
  );
}