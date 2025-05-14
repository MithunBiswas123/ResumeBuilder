


import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const TemplateCarousel = ({ isOpen, onClose, onTemplateSelect, selectedTemplate: externalSelectedTemplate }) => {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(externalSelectedTemplate || null);
  const [searchTerm, setSearchTerm] = useState('');  const [displayCount, setDisplayCount] = useState(4); // Initial number of templates to display - reduced to show fewer templates
  const [showAll, setShowAll] = useState(false); // Track whether to show all templates or just a few
  
  // Sync the internal state with external prop
  useEffect(() => {
    if (externalSelectedTemplate !== undefined) {
      setSelectedTemplate(externalSelectedTemplate);
    }
  }, [externalSelectedTemplate]);
  
  // Handle modal close with escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Array of template data with categories
  const templates = [
    { id: 'professional', name: 'Professional', image: '/templates-previews/professional.png', category: 'business' },
    { id: 'modern', name: 'Modern', image: '/templates-previews/modern.png', category: 'contemporary' },
    { id: 'creative', name: 'Creative', image: '/templates-previews/creative.png', category: 'design' },
    { id: 'elegant', name: 'Elegant', image: '/templates-previews/elegant.png', category: 'formal' },
    { id: 'classic', name: 'Classic', image: '/templates-previews/classic.png', category: 'traditional' },
    { id: 'corporate', name: 'Corporate', image: '/templates-previews/corporate.png', category: 'business' },
    { id: 'traditional', name: 'Traditional', image: '/templates-previews/classic.png', category: 'traditional' },
    { id: 'minimal', name: 'Minimal', image: '/templates-previews/classic.png', category: 'contemporary' },
    { id: 'executive', name: 'Executive', image: '/templates-previews/classic.png', category: 'business' },
    { id: 'fancy', name: 'Fancy', image: '/templates-previews/classic.png', category: 'design' },
    { id: 'tokyo', name: 'Tokyo', image: '/templates-previews/classic.png', category: 'international' },
    { id: 'berlin', name: 'Berlin', image: '/templates-previews/classic.png', category: 'international' },
    { id: 'stockholm', name: 'Stockholm', image: '/templates-previews/classic.png', category: 'international' },
    { id: 'milano', name: 'Milano', image: '/templates-previews/classic.png', category: 'international' },
    { id: 'pheonix', name: 'Phoenix', image: '/templates-previews/classic.png', category: 'contemporary' },
  ];
  
  // Filter templates based on search term
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Display limited templates initially, or all templates if showAll is true
  const displayedTemplates = showAll 
    ? filteredTemplates.slice(0, displayCount) 
    : filteredTemplates.slice(0, 4); // Only show 4 templates initially
    
  // Track animation state for smooth transitions
  const [animating, setAnimating] = useState(false);
  
  // Load more templates when scrolling near bottom (only when showAll is true)
  const handleScroll = useCallback((e) => {
    if (!showAll) return; // Don't load more if not showing all
    
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 100 && displayCount < filteredTemplates.length) {
      setDisplayCount(prev => Math.min(prev + 8, filteredTemplates.length));
    }
  }, [displayCount, filteredTemplates.length, showAll]);
    // Reset display count and showAll state when search term changes
  useEffect(() => {
    setDisplayCount(12);
    setShowAll(false);
  }, [searchTerm]);

  if (!isOpen) return null;
  
  return (    <div 
      className="fixed pt-[20rem] inset-0 z-[100] flex items-center justify-center  bg-opacity-80 overflow-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-gray-900 rounded-xl w-full max-w-7xl h-[90vh] my-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header with close button */}
        <div className="sticky top-23 bg-gray-900 p-5 border-b border-gray-800 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-white">Choose Your Resume Template</h2>
          <div className="flex items-center gap-4">
            {/* Search input */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 outline-none focus:ring-2 focus:ring-red-500 w-56"
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button 
              onClick={onClose} 
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-105"
              aria-label="Close template carousel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Search input for mobile */}
        <div className="md:hidden p-4 bg-gray-900 border-b border-gray-800">
          <div className="relative">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 outline-none focus:ring-2 focus:ring-red-500 w-full"
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Templates grid with scroll handling */}
        <div className="flex-1 overflow-y-auto p-6" onScroll={handleScroll}>
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              </svg>
              <p className="text-xl">No templates found</p>
              <p className="mt-2">Try a different search term</p>
            </div>          ) : (
            <div className="templates-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedTemplates.map((template) => (                <div 
                  key={template.id}
                  style={{ '--index': displayedTemplates.indexOf(template) }}
                  className={`
                    template-item bg-gray-800 border border-gray-700 rounded-lg overflow-hidden cursor-pointer transition-all duration-300
                    ${selectedTemplate === template.id 
                      ? 'ring-4 ring-red-600 border-transparent transform scale-[1.02]' 
                      : 'hover:border-gray-600 hover:transform hover:scale-[1.01]'
                    }
                  `}onClick={() => {
                    setSelectedTemplate(template.id);
                    if (onTemplateSelect) {
                      onTemplateSelect(template.id);
                    }
                    // Redirect to the builder page with the selected template
                    router.push(`/builder?template=${template.id}`);
                  }}
                >                  <div className="relative h-64 bg-gray-900">
                    <Image
                      src={template.image} 
                      alt={template.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="p-2"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Category tag */}
                    <span className="absolute top-2 left-2 px-2 py-1 bg-gray-800 bg-opacity-90 text-xs font-medium text-gray-300 rounded-full">
                      {template.category}
                    </span>
                    
                    {/* Selection overlay */}
                    {selectedTemplate === template.id && (
                      <div className="absolute inset-0 bg-red-600 bg-opacity-20 flex items-center justify-center">
                        <div className="bg-white bg-opacity-90 rounded-full p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg text-white">{template.name}</h3>
                    {selectedTemplate === template.id && (
                      <div className="flex justify-between items-center mt-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-200">
                          Selected
                        </span>
                          <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onTemplateSelect) {
                              onTemplateSelect(template.id);
                            }
                            onClose();
                          }}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
                        >
                          Select Template
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}            {/* Show More button when not showing all templates */}
          {!showAll && filteredTemplates.length > 4 && (
            <div className="flex justify-center mt-8 pb-4">
              <button
                onClick={() => {
                  setAnimating(true);
                  // Delayed state change for smooth animation
                  setTimeout(() => {
                    setShowAll(true);
                    setAnimating(false);
                  }, 300);
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 flex items-center gap-2 transform hover:scale-105 transition-all duration-300"
              >
                Show All Templates
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${animating ? 'rotate-180' : ''}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          )}
          
          {/* Loading indicator for infinite scroll (only shown when showing all templates) */}
          {showAll && displayCount < filteredTemplates.length && (
            <div className="flex justify-center mt-8 pb-4">
              <div className="animate-pulse flex space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer actions */}
        <div className="sticky bottom-0 bg-gray-900 p-6 border-t border-gray-800 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>            <button
            onClick={() => {
              if (selectedTemplate) {
                if (onTemplateSelect) {
                  onTemplateSelect(selectedTemplate);
                }
                // Navigate to the builder page with the selected template
                router.push(`/builder?template=${selectedTemplate}`);
              }
            }}            className={`
              group px-6 py-3 rounded-md text-white font-medium transition-all duration-300 relative overflow-hidden
              ${selectedTemplate 
                ? 'bg-red-600 hover:bg-red-700 hover:shadow-lg' 
                : 'bg-gray-700 cursor-not-allowed'
              }
            `}
            disabled={!selectedTemplate}
          >            <span className="relative z-10">Continue with Selected Template</span>
            {/* Animated hover effect */}
            {selectedTemplate && (
              <span className="absolute bottom-0 right-full w-full h-full transition-all duration-500 bg-red-700 group-hover:right-0"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCarousel;
