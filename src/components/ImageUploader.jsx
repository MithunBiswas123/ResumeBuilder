"use client";

import { useState, useRef } from 'react';

export default function ImageUploader({ onImageUpload, currentImage }) {
  const [previewUrl, setPreviewUrl] = useState(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    // Convert the file to a base64 string
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPreviewUrl(base64String);
      onImageUpload(base64String);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onImageUpload(null);
    fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profile Photo
        </label>
        
        <div className="flex items-center">
          {previewUrl ? (
            <div className="relative group">
              <img 
                src={previewUrl} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div 
              onClick={triggerFileInput}
              className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer border border-dashed border-gray-400 hover:bg-gray-50"
            >
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          )}
          
          <div className="ml-4">
            <button
              type="button"
              onClick={triggerFileInput}
              className="text-sm text-blue-600 hover:text-blue-700"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : previewUrl ? "Change Photo" : "Upload Photo"}
            </button>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF, max 1MB</p>
          </div>
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}