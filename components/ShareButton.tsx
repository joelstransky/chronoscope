'use client';

import { useState } from 'react';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      // Copy current URL to clipboard
      await navigator.clipboard.writeText(window.location.href);
      
      // Show feedback
      setCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      {copied ? '✓ Copied!' : 'Share Timeline'}
    </button>
  );
}