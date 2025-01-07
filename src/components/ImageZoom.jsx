import React from 'react';

export function ImageZoom({ image, description, onClose }) {
  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-7xl w-full mx-auto">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl"
        >
          Close
        </button>
        <div 
          className="relative bg-[#f5f2e6] p-4"
          style={{
            boxShadow: '10px 6px 12px rgba(0, 0, 0, 0.9)',
          }}
          onClick={e => e.stopPropagation()}
        >
          <img
            src={image}
            alt={description}
            className="w-full h-auto object-contain max-h-[90vh]"
          />
        </div>
      </div>
    </div>
  );
} 