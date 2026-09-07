import { useEffect } from 'react';

export function useKeyboard(key, callback, ctrlKey = true) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((ctrlKey && (e.metaKey || e.ctrlKey)) || !ctrlKey) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          e.preventDefault();
          callback();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [key, callback, ctrlKey]);
}