"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function TemplateSelector({ selectedTemplate, setSelectedTemplate }) {
  const [showTemplates, setShowTemplates] = useState(false);
  
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional with a touch of color',
      image: '/template-previews/modern.png'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional format ideal for corporate roles',
      image: '/template-previews/professional.png'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold design for creative industries',
      image: '/template-previews/creative.png'
    }
  ];
  
  // Find the currently selected template
  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];
  
  return (
    <div className="relative">
      <button 
        onClick={() => setShowTemplates(!showTemplates)}
        className="flex items-center bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium mr-3">{currentTemplate.name} Template</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {showTemplates && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
          {templates.map((template) => (
            <div 
              key={template.id}
              className={`flex p-3 hover:bg-blue-50 cursor-pointer ${selectedTemplate === template.id ? 'bg-blue-50' : ''}`}
              onClick={() => {
                setSelectedTemplate(template.id);
                setShowTemplates(false);
              }}
            >
              <div className="w-20 h-24 bg-gray-100 mr-3 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                {/* You can add template preview images later */}
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                  Preview
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}