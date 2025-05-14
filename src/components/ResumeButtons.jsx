
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

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TemplateCarousel from "./TemplateCarousel";

function ResumeButtons() {
  const [showTemplateCarousel, setShowTemplateCarousel] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const router = useRouter();

  const handleShowTemplates = () => {
    setShowTemplateCarousel(true);
  };

  const handleCloseTemplateCarousel = () => {
    setShowTemplateCarousel(false);
  };

  const handleTemplateSelected = (templateId) => {
    setSelectedTemplate(templateId);
    // Close the carousel after selection
    setShowTemplateCarousel(false);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      router.push(`/builder?template=${selectedTemplate}`);
    } else {
      alert("Please select a template first");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
        <button
          onClick={handleShowTemplates}
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
          disabled={!selectedTemplate}
          className={`w-full md:w-auto px-6 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
            selectedTemplate
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue with Selected Template
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
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>     
      <TemplateCarousel 
        isOpen={showTemplateCarousel} 
        onClose={handleCloseTemplateCarousel}
        onTemplateSelect={handleTemplateSelected}
        selectedTemplate={selectedTemplate}
      />
    </>
  );
}

export default ResumeButtons;