// src/components/Loading.jsx
import React, { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';

const Loading = () => {
  const [showWakeMessage, setShowWakeMessage] = useState(false);

  useEffect(() => {
    // Render's free tier can take 30-50s to wake from a cold start.
    // A plain spinner for that long looks broken, so after a few
    // seconds we tell the person what's actually happening.
    const timer = setTimeout(() => setShowWakeMessage(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-10">
      <div className="flex items-center">
        <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
        <span className="ml-2 text-gray-500">Loading...</span>
      </div>
      {showWakeMessage && (
        <p className="mt-3 text-sm text-gray-400 text-center max-w-xs">
          Waking up the server — this can take up to a minute on the first load.
        </p>
      )}
    </div>
  );
};

export default Loading;
