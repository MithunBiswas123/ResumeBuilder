import { useState, useCallback } from 'react';

// You'll need to install the Google Generative AI package
// npm install @google/generative-ai

// Import the Gemini API client
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function useResumeData() {
  // Initialize your API key - store this in environment variables for production
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      profileImage: null,
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    aiHighlights: null // Start with null, will be populated by the AI
  });

  // Function to generate AI suggestions using Gemini
  const generateAIHighlights = useCallback(async () => {
    if (!API_KEY) {
      console.error("Gemini API key not found");
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Create prompt based on resume content
      const prompt = `
        Based on the following resume details, provide three sections of feedback:
        1. A list of 5 key skills that stand out (comma separated)
        2. 3-4 specific suggestions for improving the resume (in bullet point format)
        3. A brief custom message evaluating the resume's strength for the job title mentioned

        Resume Details:
        Name: ${resumeData.personalInfo.name}
        Job Title: ${resumeData.personalInfo.title}
        Summary: ${resumeData.personalInfo.summary}
        Skills: ${resumeData.skills.join(', ')}
        Experience: ${resumeData.experience.map(exp => 
          `${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'}): ${exp.description}`
        ).join('\n')}
        Education: ${resumeData.education.map(edu => 
          `${edu.degree} from ${edu.school} (${edu.startDate} - ${edu.endDate || 'Present'})`
        ).join('\n')}
        Projects: ${resumeData.projects.map(proj => 
          `${proj.title}: ${proj.description}`
        ).join('\n')}

        Format your response as a valid JSON object with these exact fields:
        {
          "keySkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
          "suggestions": ["suggestion1", "suggestion2", "suggestion3", "suggestion4"],
          "customMessage": "Your evaluation message here."
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const textResponse = response.text();
      
      // Parse the JSON response from Gemini
      let parsedResponse;
      try {
        // Find and extract JSON from the response
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResponse = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("No valid JSON found in response");
        }
      } catch (parseError) {
        console.error("Failed to parse Gemini response:", parseError);
        // Fallback to default values
        parsedResponse = {
          keySkills: ["Leadership", "Problem Solving", "Communication", "Teamwork", "Adaptability"],
          suggestions: [
            "Add more quantifiable achievements to your experience",
            "Include your GitHub profile link",
            "Add specific metrics to demonstrate impact"
          ],
          customMessage: "Your resume shows potential but could benefit from more specific accomplishments."
        };
      }

      // Update the resumeData with AI-generated highlights
      setResumeData(prev => ({
        ...prev,
        aiHighlights: parsedResponse
      }));

      return parsedResponse;
    } catch (error) {
      console.error("Error generating AI highlights:", error);
      // Fallback to default values
      const fallbackHighlights = {
        keySkills: ["Leadership", "Problem Solving", "Communication", "Teamwork", "Adaptability"],
        suggestions: [
          "Add more quantifiable achievements to your experience",
          "Include your GitHub profile link",
          "Add specific metrics to demonstrate impact"
        ],
        customMessage: "Your resume shows potential but could benefit from more specific accomplishments."
      };

      // Update with fallback values
      setResumeData(prev => ({
        ...prev,
        aiHighlights: fallbackHighlights
      }));

      return fallbackHighlights;
    }
  }, [API_KEY, resumeData.personalInfo, resumeData.skills, resumeData.experience, resumeData.education, resumeData.projects]);

  return {
    resumeData,
    setResumeData,
    generateAIHighlights,
    
    // Helper function to check if we have enough resume data to generate suggestions
    canGenerateHighlights: () => {
      return (
        resumeData.personalInfo.name && 
        resumeData.personalInfo.title && 
        (resumeData.skills.length > 0 || resumeData.experience.length > 0)
      );
    }
  };
}