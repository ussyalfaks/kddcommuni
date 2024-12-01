import React from 'react';

export function Loader() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
    </div>
  );
}