// "use client";

// import { useState, useEffect } from 'react';

// export default function AISuggestionPanel({ 
//   resumeData, 
//   setResumeData, 
//   activeSection,
//   onClose 
// }) {
//   // Rest of your component stays the same
  
//   const fetchSuggestions = async () => {
//     if (!selectedSection) return;
    
//     setIsLoading(true);
    
//     try {
//       const response = await fetch('/api/ai-suggestions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           section: selectedSection,
//           content: selectedSection === 'summary' 
//             ? resumeData.personalInfo.summary 
//             : resumeData[selectedSection]
//         }),
//       });
      
//       const data = await response.json();
      
//       // Add error handling for Gemini response format
//       if (!data.suggestions || !Array.isArray(data.suggestions)) {
//         throw new Error('Invalid response format from AI');
//       }
      
//       setSuggestions(data.suggestions);
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//       alert('Failed to generate suggestions. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Rest of your component stays the same
// }




"use client";

import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AISuggestionPanel({ resumeData, setResumeData, activeSection, onClose }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);

  useEffect(() => {
    // Generate suggestions when the component mounts or activeSection changes
    if (activeSection) {
      generateSuggestions(activeSection);
    }
  }, [activeSection]);

  // Existing generateSuggestions function
  // Add this implementation for your generateSuggestions function

const generateSuggestions = async (section) => {
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!API_KEY) {
    setError("Gemini API key not found. Please add it to your .env.local file.");
    return;
  }

  setIsLoading(true);
  setError(null);

  try {
    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Create a prompt based on the active section and resume data
    const prompt = createPromptForSection(section, resumeData);
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse suggestions
    const parsedSuggestions = parseResponseToSuggestions(text);
    setSuggestions(parsedSuggestions);
  } catch (err) {
    console.error("Error generating suggestions:", err);
    setError("Failed to generate suggestions. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

// Add this implementation for parseResponseToSuggestions
const parseResponseToSuggestions = (text) => {
  // Split the response by lines or numbers to get individual suggestions
  const lines = text.split('\n');
  const suggestions = lines
    .filter(line => line.trim() !== '')
    .map(line => line.replace(/^\d+[\.\)-]\s*/, '').trim())  // Remove leading numbers
    .filter(line => line.length > 15);  // Filter out very short lines
  
  return suggestions;
};

// Add this implementation for applySuggestion
const applySuggestion = (suggestion) => {
  // This function would apply the suggestion to the resume
  // For now, we'll just alert the user
  alert(`Suggestion applied: ${suggestion}`);
  
  // You can implement more specific logic based on the active section
  // For example, if the suggestion is for the summary, you could update the summary
};

  // Function to create prompt for section
  const createPromptForSection = (section, data) => {
    // ...existing code...
  };

  // New function to expand brief inputs into full content
  const generateExpandedContent = async () => {
    if (!searchInput.trim()) {
      setError("Please enter some text to expand");
      return;
    }

    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!API_KEY) {
      setError("Gemini API key not found. Please add it to your .env.local file.");
      return;
    }

    setIsGeneratingContent(true);
    setError(null);

    try {
      // Initialize the Gemini API client
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Create a prompt based on the active section and user input
      const prompt = createExpandPrompt(searchInput, activeSection);
      
      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Set the generated content
      setGeneratedContent(text);
    } catch (err) {
      console.error("Error generating content:", err);
      setError("Failed to generate expanded content. Please try again.");
    } finally {
      setIsGeneratingContent(false);
    }
  };

  // Create prompt for expanding content based on section
  const createExpandPrompt = (input, section) => {
    switch(section) {
      case 'summary':
        return `
          As a professional resume writer, expand this brief description into a compelling professional summary:
          "${input}"
          
          Write it in first person, keep it under 4 sentences, and highlight key strengths and value proposition.
          Focus on achievements and skills that would be relevant for a ${resumeData.personalInfo.title || 'professional'}.
        `;
      case 'experience':
        return `
          As a professional resume writer, expand this brief job description:
          "${input}"
          
          Transform it into 3-4 bullet points for a resume that showcase accomplishments, using strong action verbs
          and quantifiable results where possible. Format as bullet points starting with action verbs.
        `;
      case 'projects':
        return `
          As a professional resume writer, expand this brief project description:
          "${input}"
          
          Create a compelling project description that highlights the technology used, your role, 
          the challenges overcome, and the results achieved. Keep it under 3 sentences.
        `;
      default:
        return `
          As a professional resume writer, expand this brief description into compelling content 
          for a ${section} section of a resume:
          "${input}"
          
          Make it specific, achievement-focused, and professional. Use industry-standard formatting.
        `;
    }
  };

  // Apply the generated content to the resume
  const applyGeneratedContent = () => {
    if (!generatedContent) return;
    
    switch(activeSection) {
      case 'summary':
        setResumeData({
          ...resumeData,
          personalInfo: {
            ...resumeData.personalInfo,
            summary: generatedContent
          }
        });
        break;
        
      case 'experience':
        // This would need to be modified to add to a specific experience entry
        // For now, just alert the user
        alert("Content generated for experience section. You can copy and paste it into the specific job entry.");
        break;
        
      case 'skills':
        // Parse skills from generated content
        const skillsArray = generatedContent.split(',').map(skill => skill.trim());
        setResumeData({
          ...resumeData,
          skills: [...new Set([...resumeData.skills, ...skillsArray])]
        });
        break;
        
      default:
        alert(`Generated content for ${activeSection}. You can copy and paste it into the appropriate field.`);
    }
    
    // Clear the generated content after applying
    setGeneratedContent('');
    setSearchInput('');
  };

  // Existing applySuggestion function

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">AI Suggestions</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* New AI Content Generator Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-medium text-lg mb-2">Generate Content</h3>
        <p className="text-sm text-gray-600 mb-3">
          Enter a brief description and get AI-generated content for your resume
        </p>
        
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={`Enter brief details about ${activeSection}...`}
            className="flex-grow border rounded-md px-3 py-2"
            onKeyPress={(e) => {
              if (e.key === 'Enter') generateExpandedContent();
            }}
          />
          <button
            onClick={generateExpandedContent}
            disabled={isGeneratingContent || !searchInput.trim()}
            className={`px-4 py-2 rounded-md ${
              isGeneratingContent || !searchInput.trim() 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isGeneratingContent ? 'Generating...' : 'Generate'}
          </button>
        </div>
        
        {generatedContent && (
          <div className="mt-3">
            <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
              <h4 className="text-blue-800 font-medium mb-2">Generated Content:</h4>
              <p className="text-gray-800 whitespace-pre-line">{generatedContent}</p>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                onClick={applyGeneratedContent}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
              >
                Apply to Resume
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Existing AI Suggestions Section */}
      {isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Generating smart suggestions...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
          <p>{error}</p>
          <button 
            onClick={() => generateSuggestions(activeSection)}
            className="mt-2 text-sm underline"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
            <p className="text-purple-700 font-medium">
              Based on the Gemini AI analysis, here are suggestions for improving your {activeSection}:
            </p>
          </div>
          
          {suggestions.length > 0 ? (
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between">
                    <p>{suggestion}</p>
                    <button
                      onClick={() => applySuggestion(suggestion)}
                      className="text-purple-600 hover:text-purple-800 ml-2 flex-shrink-0"
                    >
                      <span className="text-sm">Apply</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No suggestions available. Try generating new ones.</p>
          )}
          
          <button
            onClick={() => generateSuggestions(activeSection)}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Generate New Suggestions
          </button>
        </div>
      )}
    </div>
  );
}