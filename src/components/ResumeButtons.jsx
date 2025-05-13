
// "use client";

// import React from "react";

// function ResumeButtons() {
//   return (
//     <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
//       <button
//         onClick={() => window.dispatchEvent(new CustomEvent('showAllTemplates'))}
//         className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-md font-medium bg-white hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
//       >
//         Show All Templates
//         <svg 
//           xmlns="http://www.w3.org/2000/svg" 
//           width="16" 
//           height="16" 
//           viewBox="0 0 24 24" 
//           fill="none" 
//           stroke="currentColor" 
//           strokeWidth="2" 
//           strokeLinecap="round" 
//           strokeLinejoin="round"
//         >
//           <polyline points="6 9 12 15 18 9"></polyline>
//         </svg>
//       </button>
      
//       <button
//         onClick={() => window.dispatchEvent(new CustomEvent('continueWithTemplate'))}
//         className="w-full md:w-auto px-6 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
//       >
//         Continue with Selected Template
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M5 12h14M12 5l7 7-7 7"></path>
//         </svg>
//       </button>
//     </div>
//   );
// }

// export default ResumeButtons;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


function ResumeButtons() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const router = useRouter();

  // Listen for template selection events from ResumeCarousel
  useEffect(() => {
    const handleTemplateSelected = (e) => {
      setSelectedTemplate(e.detail.templateIndex);
    };
    
    window.addEventListener('templateSelected', handleTemplateSelected);
    return () => window.removeEventListener('templateSelected', handleTemplateSelected);
  }, []);

  const handleShowAllTemplates = () => {
    setShowAllTemplates(true);
  };

  const handleContinue = () => {
    if (selectedTemplate !== null) {
      // Navigate to the next step with the selected template
      router.push(`/resumebuilder/editor?template=${selectedTemplate}`);
    } else {
      alert("Please select a template first");
    }
  };

  const handleSelectTemplate = (index) => {
    setSelectedTemplate(index);
    setShowAllTemplates(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
        <button
          onClick={handleShowAllTemplates}
          className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-md font-medium bg-white hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
        >
          Show All Templates
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        
        <button
          onClick={handleContinue}
          disabled={selectedTemplate === null}
          className={`w-full md:w-auto px-6 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
            selectedTemplate !== null
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue with Selected Template
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      {/* Template gallery modal */}
      {showAllTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">All Resume Templates</h2>
              <button 
                onClick={() => setShowAllTemplates(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {resumeTemplates.map((template, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-lg overflow-hidden border ${
                    selectedTemplate === index 
                      ? "ring-2 ring-red-600 border-red-600" 
                      : "hover:border-gray-400"
                  }`}
                  onClick={() => handleSelectTemplate(index)}
                >
                  <div className="relative aspect-[3/4] w-full">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="object-cover w-full h-full"
                    />
                    
                    {/* Selection indicator */}
                    {selectedTemplate === index && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 bg-white border-t">
                    <p className={`font-medium ${selectedTemplate === index ? 'text-red-600' : ''}`}>
                      {template.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {template.description || "Professional resume template"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleContinue()}
                disabled={selectedTemplate === null}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedTemplate !== null
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continue with Selected Template
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResumeButtons;