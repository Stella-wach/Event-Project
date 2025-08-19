// src/components/Loading.jsx
import React from 'react';
import { LoaderCircle } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full w-full py-10">
      <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
      <span className="ml-2 text-gray-500">Loading...</span>
    </div>
  );
};

export default Loading;
