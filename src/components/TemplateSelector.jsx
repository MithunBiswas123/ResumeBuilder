"use client";

import { useState } from 'react';

export default function TemplateSelector({ selectedTemplate, setSelectedTemplate }) {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional with a touch of color',

      color: '#3b82f6' // blue-500
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional format ideal for corporate roles',
    
      color: '#1e3a8a' // blue-900
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold design for creative industries',
    
      color: '#ec4899' // pink-500
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Sophisticated design with serif fonts for executive roles',
     
      color: '#713f12' // yellow-900
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Timeless design with a traditional layout',

     
      color: '#1e3a8a' // blue-900
    },
    {
      id: 'paginated',
      name: 'Multi-Page',
      description: 'Automatically creates multiple pages when content exceeds one page',
      color: '#10b981' // emerald-500
    },
    {
      id: 'best',
      name: 'Best',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'traditional',
      name: 'Traditional',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'formal',
      name: 'Formal',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'toronto',
      name: 'Toronto',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'functional',
      name: 'Functional',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'simple',
      name: 'Simple',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'stylish',
      name: 'Stylish',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'iconic',
      name: 'Iconic',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'revelent',
      name: 'Revelent',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'composit',
      name: 'Composit',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'chronological',
      name: 'Chronological',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'federal',
      name: 'Federal',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'pheonix',
      name: 'Pheonix',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'cool',
      name: 'Cool',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    
    {
      id: 'gullible',
      name: 'Gullible',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'deligant',
      name: 'Deligant',
      description: 'Best design for all industries',

     
      color: '#0000' // black
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'everest',
      name: 'Everest',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'chronic',
      name: 'Chronic',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'chronicles',
      name: 'Chronicles',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'tokyo',
      name: 'Tokyo',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'stockholm',
      name: 'Stockholm',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'milano',
      name: 'Milano',
  
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'vienna',
      name: 'Vienna',
  
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'kyoto',
      name: 'Kyoto',
  
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'berlin',
      name: 'Berlin',
  
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'fancy',
      name: 'Fancy',
  
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'mountfuji',
      name: 'Mount Fuji',
     
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'asthetic',
      name: 'Asthetic',
    
     
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'phoen',
      name: 'Phoen',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'philips',
      name: 'Philips',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'crisp',
      name: 'Crisp',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'crisp',
      name: 'Crisp',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'clean',
      name: 'Clean',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'parallel',
      name: 'Parallel',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'zinc',
      name: 'Zinc',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'nexus',
      name: 'Nexus',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'star',
      name: 'Star',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'nova',
      name: 'Nova',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'santino',
      name: 'Santino',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'twocolumn',
      name: 'Two Column',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'timeline',
      name: 'Timmeline',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'tempo',
      name: 'Tempo',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    {
      id: 'sample',
      name: 'Sample',
      description: 'Best design for all industries',
      color: '#0000' // black
    },
    

  ];

  // Get current template
  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];

  return (
    <div className="w-64">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Template
      </label>
      
      {/* Preview of current template */}
      <div className="mb-3 border rounded-md overflow-hidden shadow-sm">
        <div 
          style={{ 
            backgroundColor: currentTemplate.color,
            height: '8px'
          }} 
        />
        <div className="p-3">
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: currentTemplate.color }}
            />
            <strong className="text-sm">{currentTemplate.name}</strong>
          </div>
          <p className="text-xs text-gray-500 mt-1">{currentTemplate.description}</p>
        </div>
      </div>
      
      <select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
}