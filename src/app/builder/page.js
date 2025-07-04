

"use client";

import { useState, useRef, useEffect, Suspense } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useSearchParams } from 'next/navigation';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import AISuggestionPanel from '@/components/AISuggestionPanel';

function BuilderContent() {
  const searchParams = useSearchParams();
  
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      profileImage: null
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });
  
  // Get template from URL or use default
  const [selectedTemplate, setSelectedTemplate] = useState(
    searchParams.get('template') || 'modern'
  );
  
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [activeSection, setActiveSection] = useState('summary');
  
  // Add PDF download functionality
  const resumeRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `${resumeData.personalInfo.name || 'Resume'} - Resume`,
  });
  
  const handleImageUpload = (imageUrl) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        profileImage: imageUrl
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-0 py-8">
        <h1 className="text-3xl font-bold mb-6">Resume Builder</h1>
        
        <div className="flex justify-start items-center mb-6 gap-6 flex-wrap">
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
          
          {/* Add PDF download button */}
          {/* <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button> */}
          
          <button
            onClick={() => setShowAISuggestions(!showAISuggestions)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {showAISuggestions ? 'Hide AI Suggestions' : 'Show AI Suggestions'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ResumeForm 
            resumeData={resumeData}
            setResumeData={setResumeData}
            onImageUpload={handleImageUpload}
            setActiveSection={setActiveSection}
          />
          
          <div className="sticky top-8">
            <div ref={resumeRef}>
              <ResumePreview 
                resumeData={resumeData}
                selectedTemplate={selectedTemplate}
              />
            </div>
          </div>
        </div>
        
        {showAISuggestions && (
          <div className="fixed right-0 top-0 h-screen w-3/8 bg-white shadow-2xl p-6 overflow-y-auto z-50">
            <AISuggestionPanel 
              resumeData={resumeData}
              setResumeData={setResumeData}
              activeSection={activeSection}
              onClose={() => setShowAISuggestions(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Builder() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuilderContent />
    </Suspense>
  );
}