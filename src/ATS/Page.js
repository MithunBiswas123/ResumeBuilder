"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle, 
  FaFileAlt, 
  FaSearch, 
  FaMagic, 
  FaLightbulb, 
  FaChartBar,
  FaUpload,
  FaFilePdf,
  FaFileWord
} from 'react-icons/fa';

export default function AtsChecker({ resumeData, jobDescription, currentTemplate }) {
  const [score, setScore] = useState(null);
  const [sectionScores, setSectionScores] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [jobDesc, setJobDesc] = useState(jobDescription || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const analyzeTimeoutRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  
  // Trigger analysis whenever job description changes (with debounce)
  useEffect(() => {
    if (jobDesc) {
      setIsAnalyzing(true);
      
      // Clear previous timeout
      if (analyzeTimeoutRef.current) {
        clearTimeout(analyzeTimeoutRef.current);
      }
      
      // Set new timeout for analysis
      analyzeTimeoutRef.current = setTimeout(() => {
        const results = performAtsAnalysis(resumeData, jobDesc, currentTemplate);
        setScore(results.score);
        setSectionScores(results.sectionScores);
        setFeedback(results.feedback);
        setIsAnalyzing(false);
      }, 800);
    }
    
    return () => {
      if (analyzeTimeoutRef.current) {
        clearTimeout(analyzeTimeoutRef.current);
      }
    };
  }, [jobDesc, resumeData, currentTemplate]);
  
  // File upload handlers
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFileError(null);
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File is too large. Please upload a file smaller than 5MB.");
      return;
    }
    
    // Check file type
    if (!file.type.includes('pdf') && 
        !file.type.includes('word') && 
        !file.type.includes('text') &&
        !file.name.endsWith('.doc') &&
        !file.name.endsWith('.docx')) {
      setFileError("Please upload a PDF, DOC, DOCX, or TXT file.");
      return;
    }
    
    setUploadedFile(file);
    setIsAnalyzing(true);
    
    try {
      // Extract text from the file
      const text = await extractTextFromFile(file);
      setJobDesc(text);
      
      // The useEffect will trigger the analysis once jobDesc is updated
    } catch (error) {
      console.error("Error extracting text from file:", error);
      setFileError("Could not read the file. Please try again or paste the text manually.");
      setIsAnalyzing(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    // Don't clear the job description as the user might want to keep it
  };

  const extractTextFromFile = async (file) => {
    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      // For text files, use the FileReader API
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      });
    } 
    
    // For PDFs and DOCs, we would need external libraries
    // For now, return a placeholder message with instructions
    return `[Text extracted from ${file.name}]\n\nTo fully implement PDF and DOCX extraction, you need to install:\n- pdf.js for PDFs\n- mammoth.js for Word documents\n\nFor now, please paste the job description text manually.`;
  };
  
  // Main analysis function
  const performAtsAnalysis = (resume, jobDesc, template) => {
    const analysis = {
      score: 0,
      sectionScores: {
        format: 0,
        content: 0,
        keywords: 0,
        template: 0
      },
      feedback: [],
      keywordMatches: [],
      missingKeywords: [],
      formatIssues: [],
      contentIssues: [],
      templateIssues: []
    };
    
    // Extract resume text for analysis
    const resumeText = extractResumeText(resume).toLowerCase();
    const jobText = jobDesc.toLowerCase();
    
    // STEP 1: Basic format check (25% of score)
    checkResumeFormat(resume, analysis);
    
    // STEP 2: Keyword analysis (35% of score)
    if (jobDesc && jobDesc.length > 50) {
      analyzeKeywords(resumeText, jobText, analysis);
    }
    
    // STEP 3: Content quality check (25% of score)
    checkContentQuality(resume, analysis);
    
    // STEP 4: Template compatibility check (15% of score)
    checkTemplateCompatibility(template, analysis);
    
    // Calculate final score (0-100)
    calculateScore(analysis);
    
    return analysis;
  };
  
  // Extract plaintext content from resume data
  const extractResumeText = (resume) => {
    const { personalInfo, experience, education, skills, skillCategories, projects, achievements, certificates } = resume || {};
    
    let text = '';
    
    // Personal info
    if (personalInfo) {
      text += `${personalInfo.name || ''} ${personalInfo.title || ''} ${personalInfo.summary || ''} `;
    }
    
    // Skills - handle both formats
    if (Array.isArray(skills)) {
      text += skills.join(' ') + ' ';
    }
    
    if (Array.isArray(skillCategories)) {
      skillCategories.forEach(category => {
        if (Array.isArray(category.skills)) {
          text += category.skills.join(' ') + ' ';
        }
      });
    }
    
    // Experience
    if (Array.isArray(experience)) {
      experience.forEach(job => {
        text += `${job.position || job.title || ''} ${job.company || ''} ${job.description || ''} `;
      });
    }
    
    // Education
    if (Array.isArray(education)) {
      education.forEach(edu => {
        text += `${edu.degree || ''} ${edu.school || ''} ${edu.description || ''} `;
      });
    }
    
    // Projects
    if (Array.isArray(projects)) {
      projects.forEach(project => {
        text += `${project.title || ''} ${project.description || ''} `;
        if (project.technologies) {
          text += project.technologies.join(' ') + ' ';
        }
      });
    }
    
    // Achievements
    if (Array.isArray(achievements)) {
      achievements.forEach(achievement => {
        text += `${achievement.title || ''} ${achievement.organization || ''} ${achievement.description || ''} `;
      });
    }
    
    // Certificates
    if (Array.isArray(certificates)) {
      certificates.forEach(cert => {
        text += `${cert.name || ''} ${cert.issuer || ''} `;
      });
    }
    
    return text;
  };
  
  // Format check function
  const checkResumeFormat = (resume, analysis) => {
    const { personalInfo, experience, education, skills, skillCategories } = resume || {};
    let formatScore = 100;
    
    // Check if contact information exists and is properly formatted
    if (!personalInfo || !personalInfo.email) {
      analysis.feedback.push({
        type: 'error',
        section: 'format',
        message: 'Missing email address',
        impact: 'high',
        fix: 'Add a professional email address to your contact information.'
      });
      analysis.formatIssues.push('email');
      formatScore -= 15;
    } else if (personalInfo.email && !isValidEmail(personalInfo.email)) {
      analysis.feedback.push({
        type: 'error',
        section: 'format',
        message: 'Invalid email format',
        impact: 'high',
        fix: 'Ensure your email address follows standard format (example@domain.com).'
      });
      analysis.formatIssues.push('email-format');
      formatScore -= 10;
    }
    
    if (!personalInfo || !personalInfo.phone) {
      analysis.feedback.push({
        type: 'warning',
        section: 'format',
        message: 'Missing phone number',
        impact: 'medium',
        fix: 'Add your phone number to improve contactability.'
      });
      analysis.formatIssues.push('phone');
      formatScore -= 8;
    }
    
    // Check if name is present
    if (!personalInfo?.name) {
      analysis.feedback.push({
        type: 'error',
        section: 'format',
        message: 'Missing full name',
        impact: 'high',
        fix: 'Add your full name at the top of your resume.'
      });
      analysis.formatIssues.push('name');
      formatScore -= 15;
    }
    
    // Check for professional summary/objective
    if (!personalInfo?.summary) {
      analysis.feedback.push({
        type: 'warning',
        section: 'format',
        message: 'Missing professional summary',
        impact: 'medium',
        fix: 'Add a concise professional summary highlighting your expertise and career goals.'
      });
      analysis.formatIssues.push('summary');
      formatScore -= 8;
    } else if (personalInfo.summary && personalInfo.summary.length < 50) {
      analysis.feedback.push({
        type: 'warning',
        section: 'format',
        message: 'Professional summary is too brief',
        impact: 'low',
        fix: 'Expand your professional summary to 3-5 sentences highlighting key qualifications.'
      });
      analysis.formatIssues.push('short-summary');
      formatScore -= 5;
    }
    
    // Check if there's no experience
    if (!experience || experience.length === 0) {
      analysis.feedback.push({
        type: 'error',
        section: 'format',
        message: 'No work experience listed',
        impact: 'high',
        fix: 'Add your relevant work experience with details about your roles and achievements.'
      });
      analysis.formatIssues.push('experience');
      formatScore -= 15;
    } else if (experience.length > 0) {
      // Check experience format
      let missingJobTitles = 0;
      let missingCompanies = 0;
      let missingDates = 0;
      let missingDescriptions = 0;
      
      experience.forEach(job => {
        if (!job.position && !job.title) missingJobTitles++;
        if (!job.company) missingCompanies++;
        if (!job.startDate) missingDates++;
        if (!job.description || job.description.length < 30) missingDescriptions++;
      });
      
      if (missingJobTitles > 0) {
        analysis.feedback.push({
          type: 'error',
          section: 'format',
          message: `Missing job ${missingJobTitles === 1 ? 'title' : 'titles'} in work experience`,
          impact: 'medium',
          fix: 'Add a clear job title for each position.'
        });
        analysis.formatIssues.push('job-titles');
        formatScore -= 8;
      }
      
      if (missingCompanies > 0) {
        analysis.feedback.push({
          type: 'error',
          section: 'format',
          message: `Missing company ${missingCompanies === 1 ? 'name' : 'names'} in work experience`,
          impact: 'medium',
          fix: 'Include the company name for each position.'
        });
        analysis.formatIssues.push('company-names');
        formatScore -= 8;
      }
      
      if (missingDates > 0) {
        analysis.feedback.push({
          type: 'warning',
          section: 'format',
          message: `Missing employment dates in ${missingDates} ${missingDates === 1 ? 'position' : 'positions'}`,
          impact: 'medium',
          fix: 'Include start and end dates for each position (MM/YYYY format is recommended).'
        });
        analysis.formatIssues.push('dates');
        formatScore -= 6;
      }
      
      if (missingDescriptions > 0) {
        analysis.feedback.push({
          type: 'warning',
          section: 'format',
          message: `${missingDescriptions} ${missingDescriptions === 1 ? 'position is' : 'positions are'} missing detailed descriptions`,
          impact: 'high',
          fix: 'Add detailed descriptions with accomplishments and responsibilities for each position.'
        });
        analysis.formatIssues.push('job-descriptions');
        formatScore -= 10;
      }
    }
    
    // Check for skills section
    const hasSkills = (Array.isArray(skills) && skills.length > 0) || 
                    (Array.isArray(skillCategories) && skillCategories.length > 0);
    
    if (!hasSkills) {
      analysis.feedback.push({
        type: 'error',
        section: 'format',
        message: 'Missing skills section',
        impact: 'high',
        fix: 'Add a dedicated skills section with relevant technical and soft skills.'
      });
      analysis.formatIssues.push('skills');
      formatScore -= 12;
    }
    
    // Check for education
    if (!education || education.length === 0) {
      analysis.feedback.push({
        type: 'warning',
        section: 'format',
        message: 'Missing education information',
        impact: 'medium',
        fix: 'Include your educational background with degrees, institutions, and graduation dates.'
      });
      analysis.formatIssues.push('education');
      formatScore -= 8;
    }
    
    // Ensure format score is between 0-100
    formatScore = Math.max(0, Math.min(100, formatScore));
    analysis.sectionScores.format = formatScore;
  };
  
  // Keyword analysis function
  const analyzeKeywords = (resumeText, jobText, analysis) => {
    // Extract key terms from job description using a more sophisticated approach
    const keywords = extractKeyTerms(jobText);
    
    // Skip further analysis if no meaningful keywords extracted
    if (keywords.length === 0) {
      analysis.feedback.push({
        type: 'info',
        section: 'keywords',
        message: 'Unable to extract meaningful keywords from job description',
        impact: 'low',
        fix: 'Try pasting a more detailed job description.'
      });
      analysis.sectionScores.keywords = 50; // Neutral score
      return;
    }
    
    // Check for keyword matches
    const matches = [];
    const missing = [];
    const partialMatches = [];
    
    keywords.forEach(keyword => {
      if (resumeText.includes(keyword.toLowerCase())) {
        matches.push(keyword);
      } else {
        // Check for partial matches (for multi-word keywords)
        if (keyword.includes(' ') && keyword.split(' ').some(word => 
          word.length > 3 && resumeText.includes(word.toLowerCase())
        )) {
          partialMatches.push(keyword);
        } else {
          missing.push(keyword);
        }
      }
    });
    
    // Calculate match percentage
    const matchRate = (matches.length + (partialMatches.length * 0.5)) / keywords.length;
    let keywordScore = Math.round(matchRate * 100);
    
    // Add results to analysis
    analysis.keywordMatches = matches;
    analysis.partialMatches = partialMatches;
    analysis.missingKeywords = missing;
    
    // Add feedback based on match rate
    if (matchRate < 0.3) {
      analysis.feedback.push({
        type: 'error',
        section: 'keywords',
        message: 'Very low keyword match rate with job description',
        impact: 'high',
        fix: `Include more relevant keywords from the job description in your resume.`
      });
      
      // Suggest top missing keywords
      if (missing.length > 0) {
        const topMissing = missing.slice(0, 5).join(', ');
        analysis.feedback.push({
          type: 'warning',
          section: 'keywords',
          message: `Key terms missing from your resume`,
          impact: 'high',
          fix: `Consider adding these relevant terms: ${topMissing}`
        });
      }
    } else if (matchRate < 0.5) {
      analysis.feedback.push({
        type: 'warning',
        section: 'keywords',
        message: 'Low keyword match rate with job description',
        impact: 'medium',
        fix: `Try to include more of the following keywords: ${missing.slice(0, 3).join(', ')}`
      });
    } else if (matchRate < 0.7) {
      analysis.feedback.push({
        type: 'info',
        section: 'keywords',
        message: 'Moderate keyword match with job description',
        impact: 'medium',
        fix: `Consider adding more of these keywords: ${missing.slice(0, 2).join(', ')}`
      });
    } else {
      analysis.feedback.push({
        type: 'success',
        section: 'keywords',
        message: 'Strong keyword matching with job description',
        impact: 'positive',
        fix: `Your resume contains many of the key terms from the job description.`
      });
    }
    
    // Suggest word placement
    if (matches.length > 0 && matches.length < keywords.length) {
      analysis.feedback.push({
        type: 'info',
        section: 'keywords',
        message: 'Strategic keyword placement',
        impact: 'medium',
        fix: `Place important keywords near the top of your resume and in section headings when possible.`
      });
    }
    
    analysis.sectionScores.keywords = keywordScore;
  };
  
  // Check content quality
  const checkContentQuality = (resume, analysis) => {
    const { personalInfo, experience, skills } = resume || {};
    let contentScore = 100;
    
    // Check summary quality if it exists
    if (personalInfo?.summary) {
      const summary = personalInfo.summary.toLowerCase();
      
      // Check for generic phrases in summary
      const genericPhrases = ['team player', 'hard worker', 'detail-oriented', 'self-starter', 'go-getter', 'think outside the box'];
      const foundGeneric = genericPhrases.filter(phrase => summary.includes(phrase));
      
      if (foundGeneric.length > 0) {
        analysis.feedback.push({
          type: 'warning',
          section: 'content',
          message: 'Generic phrases detected in summary',
          impact: 'medium',
          fix: `Replace clichés like "${foundGeneric.join('", "')}" with specific achievements and skills.`
        });
        analysis.contentIssues.push('generic-summary');
        contentScore -= 8 * Math.min(foundGeneric.length, 3);
      }
    }
    
    // Check experience descriptions for action verbs and metrics
    if (Array.isArray(experience) && experience.length > 0) {
      let weakDescriptionCount = 0;
      let missingMetricsCount = 0;
      
      const actionVerbs = ['achieved', 'implemented', 'created', 'increased', 'reduced', 'managed', 'developed', 'led', 'coordinated', 'designed'];
      
      experience.forEach(job => {
        if (job.description) {
          const desc = job.description.toLowerCase();
          const hasActionVerb = actionVerbs.some(verb => desc.includes(verb));
          const hasMetrics = /\d+%|\d+ percent|increased by|\$\d+|reduced|improved|generated/.test(desc);
          
          if (!hasActionVerb) {
            weakDescriptionCount++;
          }
          
          if (!hasMetrics) {
            missingMetricsCount++;
          }
        }
      });
      
      if (weakDescriptionCount > 0) {
        analysis.feedback.push({
          type: 'warning',
          section: 'content',
          message: `${weakDescriptionCount} job ${weakDescriptionCount === 1 ? 'description lacks' : 'descriptions lack'} strong action verbs`,
          impact: 'medium',
          fix: 'Begin bullet points with strong action verbs like "Achieved," "Implemented," or "Developed."'
        });
        analysis.contentIssues.push('weak-verbs');
        contentScore -= Math.min(weakDescriptionCount * 5, 15);
      }
      
      if (missingMetricsCount > Math.floor(experience.length / 2)) {
        analysis.feedback.push({
          type: 'warning',
          section: 'content',
          message: 'Job descriptions lack measurable achievements',
          impact: 'high',
          fix: 'Quantify your achievements with metrics, percentages, or specific numbers.'
        });
        analysis.contentIssues.push('no-metrics');
        contentScore -= 12;
      }
      
      // Check for too short descriptions
      const shortDescriptions = experience.filter(job => 
        job.description && job.description.length < 80
      ).length;
      
      if (shortDescriptions > 0) {
        analysis.feedback.push({
          type: 'warning',
          section: 'content',
          message: `${shortDescriptions} job ${shortDescriptions === 1 ? 'description is' : 'descriptions are'} too brief`,
          impact: 'medium',
          fix: 'Expand job descriptions to detail your responsibilities and achievements.'
        });
        analysis.contentIssues.push('brief-descriptions');
        contentScore -= Math.min(shortDescriptions * 5, 15);
      }
    }
    
    // Check skills formatting and relevance
    if (Array.isArray(skills) && skills.length > 0) {
      // Check for very generic skills
      const genericSkills = ['Microsoft Office', 'communication', 'teamwork', 'organization'];
      const foundGenericSkills = skills.filter(skill => 
        genericSkills.includes(skill.toLowerCase())
      );
      
      if (foundGenericSkills.length > 2) {
        analysis.feedback.push({
          type: 'info',
          section: 'content',
          message: 'Too many generic skills listed',
          impact: 'low',
          fix: 'Replace generic skills with more specific, technical, or specialized skills relevant to your field.'
        });
        analysis.contentIssues.push('generic-skills');
        contentScore -= 5;
      }
      
      // Check for excessive skills
      if (skills.length > 20) {
        analysis.feedback.push({
          type: 'info',
          section: 'content',
          message: 'Excessive number of skills listed',
          impact: 'low',
          fix: 'Focus on your top 12-15 most relevant skills rather than listing too many.'
        });
        analysis.contentIssues.push('too-many-skills');
        contentScore -= 5;
      }
    }
    
    // Ensure content score is between 0-100
    contentScore = Math.max(0, Math.min(100, contentScore));
    analysis.sectionScores.content = contentScore;
  };
  
  // Check template ATS compatibility
  const checkTemplateCompatibility = (templateName, analysis) => {
    // Default good score
    let templateScore = 85;
    
    // Check for known problematic templates or features
    const problematicTemplates = ['creative', 'iconic', 'stylish'];
    const moderateTemplates = ['modern', 'fancy', 'executive'];
    const bestTemplates = ['professional', 'clean', 'simple', 'classic', 'traditional', 'chronological'];
    
    if (problematicTemplates.includes(templateName?.toLowerCase())) {
      analysis.feedback.push({
        type: 'warning',
        section: 'template',
        message: 'Template may have ATS compatibility issues',
        impact: 'high',
        fix: 'Consider switching to a more ATS-friendly template like "Professional" or "Simple".'
      });
      analysis.templateIssues.push('problematic-template');
      templateScore = 60;
    } else if (moderateTemplates.includes(templateName?.toLowerCase())) {
      analysis.feedback.push({
        type: 'info',
        section: 'template',
        message: 'Template has moderate ATS compatibility',
        impact: 'medium',
        fix: 'This template should work with most ATS systems, but consider a simpler layout if applying to companies with strict ATS filters.'
      });
      analysis.templateIssues.push('moderate-template');
      templateScore = 75;
    } else if (bestTemplates.includes(templateName?.toLowerCase())) {
      analysis.feedback.push({
        type: 'success',
        section: 'template',
        message: 'Excellent template choice for ATS compatibility',
        impact: 'positive',
        fix: 'This template is well-structured for ATS systems.'
      });
      templateScore = 95;
    }
    
    analysis.sectionScores.template = templateScore;
  };
  
  // Extract key terms from job description
  const extractKeyTerms = (jobText) => {
    if (!jobText) return [];
    
    // Split text into words
    const words = jobText.toLowerCase()
      .replace(/[^\w\s]/g, ' ')  // Replace punctuation with spaces
      .split(/\s+/)              // Split on whitespace
      .filter(word => word.length > 2); // Filter out short words
    
    // Count word frequency
    const wordFrequency = {};
    words.forEach(word => {
      // Skip common words
      if (commonWords.includes(word)) return;
      
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    
    // Extract n-grams (phrases of 2-3 words)
    const phrases = extractPhrases(jobText.toLowerCase(), 2, 3);
    const phraseFrequency = {};
    
    phrases.forEach(phrase => {
      // Skip phrases with common words only
      if (phrase.split(' ').every(word => commonWords.includes(word))) return;
      
      phraseFrequency[phrase] = (phraseFrequency[phrase] || 0) + 1;
    });
    
    // Combine single words and phrases, prioritizing:
    // 1. Repeated phrases
    // 2. Repeated technical words
    // 3. Job-specific terminology
    
    // Get top phrases (mentioned more than once)
    const topPhrases = Object.keys(phraseFrequency)
      .filter(phrase => phraseFrequency[phrase] > 1)
      .sort((a, b) => phraseFrequency[b] - phraseFrequency[a])
      .slice(0, 10);
    
    // Get top single words
    const topWords = Object.keys(wordFrequency)
      .filter(word => {
        // Filter out words that are already part of our top phrases
        return !topPhrases.some(phrase => phrase.includes(word)) &&
              wordFrequency[word] > 1;
      })
      .sort((a, b) => wordFrequency[b] - wordFrequency[a])
      .slice(0, 15);
    
    // Look for technical skills
    const technicalTerms = extractTechnicalTerms(jobText.toLowerCase());
    const techTermsNotInTopLists = technicalTerms.filter(term => 
      !topPhrases.includes(term) && !topWords.includes(term)
    ).slice(0, 5);
    
    // Combine all unique terms
    const allKeyTerms = [...new Set([...topPhrases, ...topWords, ...techTermsNotInTopLists])];
    
    return allKeyTerms.slice(0, 20); // Limit to top 20 keywords
  };
  
  // Extract phrases from text
  const extractPhrases = (text, minWords, maxWords) => {
    const words = text.replace(/[^\w\s]/g, ' ').split(/\s+/);
    const phrases = [];
    
    for (let i = 0; i < words.length; i++) {
      for (let j = minWords; j <= maxWords; j++) {
        if (i + j <= words.length) {
          const phrase = words.slice(i, i + j).join(' ');
          if (phrase.length > 5) { // Avoid very short phrases
            phrases.push(phrase);
          }
        }
      }
    }
    
    return phrases;
  };
  
  // Extract technical terms
  const extractTechnicalTerms = (text) => {
    // Check for matches in our technical terms dictionary
    return technicalTerms.filter(term => text.includes(term.toLowerCase()));
  };
  
  // Calculate final score
  const calculateScore = (analysis) => {
    // Section weights
    const weights = {
      format: 0.25,
      keywords: 0.35,
      content: 0.25,
      template: 0.15
    };
    
    // Calculate weighted average
    let totalScore = 0;
    Object.keys(weights).forEach(section => {
      totalScore += analysis.sectionScores[section] * weights[section];
    });
    
    // Round to nearest whole number
    analysis.score = Math.round(totalScore);
  };
  
  // Helper function to check email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // List of common words to filter out
  const commonWords = [
    'and', 'the', 'for', 'with', 'this', 'that', 'have', 'has', 'had',
    'not', 'are', 'from', 'were', 'will', 'would', 'could', 'should',
    'what', 'when', 'where', 'how', 'why', 'who', 'your', 'their',
    'about', 'into', 'over', 'after', 'before', 'between', 'during',
    'these', 'those', 'them', 'then', 'than', 'some', 'such', 'very',
    'just', 'more', 'most', 'other', 'some', 'such', 'only', 'same',
    'time', 'well', 'also', 'now', 'day', 'get', 'may', 'new', 'one',
    'two', 'our', 'out', 'any', 'been', 'both', 'each', 'more', 'must',
    'off', 'too', 'use', 'way', 'even', 'said', 'see', 'can', 'work'
  ];
  
  // List of common technical terms/skills to check for
  const technicalTerms = [
    'javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'typescript',
    'react', 'angular', 'vue', 'node.js', 'django', 'flask', 'spring', 'express', 
    'mongodb', 'mysql', 'postgresql', 'sql', 'nosql', 'graphql', 'rest api',
    'aws', 'azure', 'google cloud', 'docker', 'kubernetes', 'jenkins', 'ci/cd',
    'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'agile', 'scrum',
    'html', 'css', 'sass', 'less', 'bootstrap', 'tailwind',
    'machine learning', 'deep learning', 'artificial intelligence', 'data science',
    'tensorflow', 'pytorch', 'keras', 'pandas', 'numpy', 'scikit-learn',
    'excel', 'tableau', 'power bi', 'sap', 'salesforce', 'wordpress',
    'photoshop', 'illustrator', 'indesign', 'figma', 'sketch', 'adobe xd',
    'seo', 'sem', 'google analytics', 'social media marketing', 'content marketing',
    'project management', 'product management', 'scrum master', 'product owner',
    'linux', 'unix', 'windows', 'macos', 'android', 'ios',
    'cyber security', 'network security', 'penetration testing', 'ethical hacking',
    'accounting', 'financial analysis', 'budgeting', 'forecasting', 'quickbooks',
    'customer service', 'sales', 'negotiation', 'cold calling', 'b2b', 'b2c',
    'human resources', 'recruitment', 'talent acquisition', 'employee relations',
    'marketing', 'brand management', 'public relations', 'event planning'
  ];
  
  // Render score circle with appropriate color
  const renderScoreCircle = () => {
    let color = '#4299e1'; // Default blue
    
    if (score > 80) color = '#48bb78'; // Green for good score
    else if (score > 60) color = '#ecc94b'; // Yellow for medium score
    else color = '#f56565'; // Red for poor score
    
    return (
      <div className="score-circle" style={{ backgroundColor: color }}>
        <div className="score-number">{score}</div>
        <div className="score-label">ATS Score</div>
      </div>
    );
  };
  
  // Render section score bars
  const renderSectionScores = () => {
    return (
      <div className="section-scores">
        <h3>Section Scores</h3>
        <div className="score-bars">
          {Object.keys(sectionScores).map(section => {
            const sectionScore = sectionScores[section];
            let barColor = '#4299e1'; // Default blue
            
            if (sectionScore > 80) barColor = '#48bb78'; // Green for good score
            else if (sectionScore > 60) barColor = '#ecc94b'; // Yellow for medium score
            else barColor = '#f56565'; // Red for poor score
            
            return (
              <div key={section} className="score-bar-container">
                <div className="score-bar-label">
                  <span className="section-name">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </span>
                  <span className="section-score">{sectionScore}</span>
                </div>
                <div className="score-bar-background">
                  <div 
                    className="score-bar-fill" 
                    style={{ 
                      width: `${sectionScore}%`,
                      backgroundColor: barColor
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render feedback items by section
  const renderFeedbackBySection = (section) => {
    const sectionFeedback = feedback.filter(item => item.section === section);
    
    if (sectionFeedback.length === 0) {
      return (
        <div className="no-feedback">
          <FaCheckCircle className="icon success" />
          <p>No issues found in this area.</p>
        </div>
      );
    }
    
    return (
      <ul className="feedback-list">
        {sectionFeedback.map((item, index) => (
          <li key={index} className={`feedback-item ${item.type}`}>
            {item.type === 'error' && <FaTimesCircle className="icon error" />}
            {item.type === 'warning' && <FaExclamationTriangle className="icon warning" />}
            {item.type === 'success' && <FaCheckCircle className="icon success" />}
            {item.type === 'info' && <FaLightbulb className="icon info" />}
            <div className="feedback-content">
              <p className="feedback-message">
                <span className="impact-tag" data-impact={item.impact}>{item.impact}</span> {item.message}
              </p>
              <p className="feedback-fix">{item.fix}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="ats-checker">
      <div className="ats-header">
        <h2><FaSearch /> ATS Resume Analyzer</h2>
        <p>Check how your resume performs with Applicant Tracking Systems</p>
      </div>
      
      {/* Job Description Input */}
      <div className="job-description-section">
        <h3>Paste Job Description</h3>
        <p className="input-hint">For accurate results, paste the job description to analyze keyword matching</p>
        <textarea 
          className="job-description-input"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste the job description here to analyze keyword matching..."
          rows={6}
        />
        
        {/* File Upload Section */}
        <div className="file-upload-section">
          <p className="upload-hint">Or upload a job description file</p>
          <label className="file-upload-label">
            <input
              type="file"
              className="file-input"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
            />
            <FaUpload className="upload-icon" />
            <span>Upload PDF, DOC or TXT</span>
          </label>
          
          {uploadedFile && (
            <div className="uploaded-file">
              {uploadedFile.type.includes('pdf') && <FaFilePdf className="file-type-icon pdf" />}
              {uploadedFile.type.includes('word') && <FaFileWord className="file-type-icon word" />}
              {uploadedFile.type.includes('text') && <FaFileAlt className="file-type-icon text" />}
              <span className="file-name">{uploadedFile.name}</span>
              <button 
                className="remove-file" 
                onClick={handleRemoveFile}
                aria-label="Remove file"
              >
                &times;
              </button>
            </div>
          )}
          
          {fileError && (
            <div className="file-error">
              <span>{fileError}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Status indicator */}
      {isAnalyzing && (
        <div className="analyzing-indicator">
          <div className="analyzing-spinner"></div>
          <span>Analyzing resume...</span>
        </div>
      )}
      
      {/* Results Section */}
      {score !== null && !isAnalyzing && (
        <div className="analysis-results">
          <div className="results-header">
            <div className="score-section">
              {renderScoreCircle()}
            </div>
            <div className="score-summary">
              <h3>ATS Compatibility Score</h3>
              <p>
                {score >= 80 ? 'Excellent! Your resume is well-optimized for ATS systems.' : 
                 score >= 60 ? 'Good. Your resume will pass most ATS systems with some improvements.' :
                 'Needs improvement. Your resume may be filtered out by many ATS systems.'}
              </p>
              {renderSectionScores()}
            </div>
          </div>
          
          {/* Feedback Tabs */}
          <div className="feedback-tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartBar className="tab-icon" /> Overview
            </button>
            <button 
              className={`tab ${activeTab === 'keywords' ? 'active' : ''}`}
              onClick={() => setActiveTab('keywords')}
            >
              Keywords
            </button>
            <button 
              className={`tab ${activeTab === 'format' ? 'active' : ''}`}
              onClick={() => setActiveTab('format')}
            >
              Format
            </button>
            <button 
              className={`tab ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              Content
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <h4>Resume Analysis Summary</h4>
                <div className="overview-summary">
                  <p className="summary-text">
                    {score >= 80 ? 
                      'Your resume is well-optimized for ATS systems. It has good formatting, relevant keywords, and quality content.' : 
                     score >= 60 ? 
                      'Your resume will likely pass ATS systems but has room for improvement in some areas.' :
                      'Your resume needs significant improvement to reliably pass ATS systems. Focus on the areas highlighted below.'}
                  </p>
                  
                  <div className="priority-issues">
                    <h5>Priority Improvements:</h5>
                    <ul>
                      {feedback
                        .filter(item => item.impact === 'high')
                        .slice(0, 3)
                        .map((item, index) => (
                          <li key={index} className="priority-item">
                            <span className="priority-bullet"></span>
                            <span>{item.message}</span>
                          </li>
                        ))}
                      {feedback.filter(item => item.impact === 'high').length === 0 && (
                        <li className="no-priority-issues">
                          <FaCheckCircle className="icon success" />
                          <span>No critical issues found!</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                {renderFeedbackBySection(activeTab)}
              </div>
            )}
            
            {activeTab === 'keywords' && (
              <div className="keywords-tab">
                <h4>Keyword Analysis</h4>
                {jobDesc ? (
                  <>
                    <div className="keyword-feedback">
                      {renderFeedbackBySection('keywords')}
                    </div>
                    
                    {/* Keyword matches */}
                    {score !== null && (
                      <div className="keyword-matches">
                        <div className="matched-keywords">
                          <h5>Matched Keywords</h5>
                          <div className="keyword-tags">
                            {feedback.length > 0 && performAtsAnalysis(resumeData, jobDesc, currentTemplate).keywordMatches.map((word, index) => (
                              <span key={index} className="keyword-tag matched">{word}</span>
                            ))}
                            {feedback.length > 0 && performAtsAnalysis(resumeData, jobDesc, currentTemplate).keywordMatches.length === 0 && (
                              <p className="no-matches">No keyword matches found</p>
                            )}
                          </div>
                        </div>
                        <div className="missing-keywords">
                          <h5>Missing Important Keywords</h5>
                          <div className="keyword-tags">
                            {feedback.length > 0 && (
                              performAtsAnalysis(resumeData, jobDesc, currentTemplate).missingKeywords.slice(0, 10).map((word, index) => (
                                <span key={index} className="keyword-tag missing">{word}</span>
                              ))
                            )}
                            {feedback.length > 0 && performAtsAnalysis(resumeData, jobDesc, currentTemplate).missingKeywords.length === 0 && (
                              <p className="no-matches">No missing keywords - great job!</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="empty-state">Paste a job description to analyze keyword matching.</p>
                )}
              </div>
            )}
            
            {activeTab === 'format' && (
              <div className="format-tab">
                <h4>ATS Format Analysis</h4>
                {renderFeedbackBySection('format')}
              </div>
            )}
            
            {activeTab === 'content' && (
              <div className="content-tab">
                <h4>Content Quality Analysis</h4>
                {renderFeedbackBySection('content')}
              </div>
            )}
          </div>
          
          <div className="improvement-tips">
            <h4><FaMagic /> Improvement Tips</h4>
            <ul className="tips-list">
              <li>Use exact keywords from the job description where appropriate</li>
              <li>Ensure consistent date formats (MM/YYYY recommended)</li>
              <li>Use standard section headings (Experience, Education, Skills)</li>
              <li>Avoid complex formatting, tables, or graphics</li>
              <li>Include a phone number and professional email address</li>
              <li>Quantify achievements with numbers when possible</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* No job description message */}
      {!isAnalyzing && !score && (
        <div className="empty-analysis">
          <div className="empty-icon">
            <FaFileAlt />
          </div>
          <h3>Ready to analyze your resume</h3>
          <p>Paste a job description above or upload a file to see how well your resume matches the requirements.</p>
        </div>
      )}
      
      {/* Styles */}
      <style jsx>{`
        .ats-checker {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          color: #333;
        }
        
        .ats-header {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 18px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .ats-header h2 {
          font-size: 26px;
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2d3748;
        }
        
        .ats-header h2 :global(svg) {
          margin-right: 12px;
          color: #4299e1;
        }
        
        .ats-header p {
          color: #718096;
          margin: 0;
          font-size: 15px;
        }
        
        /* Job Description Section */
        .job-description-section {
          margin-bottom: 25px;
        }
        
        .job-description-section h3 {
          font-size: 18px;
          margin: 0 0 8px;
          color: #2d3748;
        }
        
        .input-hint {
          color: #718096;
          font-size: 14px;
          margin-bottom: 10px;
        }
        
          .job-description-input {
            width: 100%;
            padding: 12px;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            font-size: 15px;
            resize: vertical;
            margin-bottom: 15px;
            font-family: inherit;
            transition: all 0.2s;
          }
          
          .job-description-input:focus {
            outline: none;
            border-color: #4299e1;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
          }
       
        
        /* File Upload Styles */
        .file-upload-section {
          margin-top: 15px;
          margin-bottom: 20px;
        }

        .upload-hint {
          font-size: 14px;
          color: #718096;
          margin-bottom: 8px;
        }

        .file-upload-label {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 15px;
          background-color: #f7fafc;
          border: 1px dashed #cbd5e0;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          color: #4a5568;
        }

        .file-upload-label:hover {
          background-color: #edf2f7;
          border-color: #a0aec0;
        }

        .file-input {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }

        .upload-icon {
          margin-right: 8px;
          font-size: 16px;
          color: #4299e1;
        }

        .uploaded-file {
          display: flex;
          align-items: center;
          margin-top: 10px;
          padding: 8px 12px;
          background-color: #edf8ff;
          border-radius: 4px;
          font-size: 14px;
        }

        .file-type-icon {
          margin-right: 8px;
          font-size: 16px;
        }

        .file-type-icon.pdf {
          color: #e53e3e;
        }

        .file-type-icon.word {
          color: #2b6cb0;
        }

        .file-type-icon.text {
          color: #718096;
        }

        .file-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #4a5568;
        }

        .remove-file {
          background: none;
          border: none;
          font-size: 18px;
          line-height: 1;
          color: #a0aec0;
          cursor: pointer;
          padding: 0 0 0 8px;
        }

        .remove-file:hover {
          color: #e53e3e;
        }

        .file-error {
          margin-top: 8px;
          color: #e53e3e;
          font-size: 14px;
        }
        
        /* Analyzing indicator */
        .analyzing-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #4a5568;
        }
        
        .analyzing-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(66, 153, 225, 0.3);
          border-radius: 50%;
          border-top-color: #4299e1;
          animation: spin 1s linear infinite;
          margin-right: 10px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Empty state */
        .empty-analysis {
          text-align: center;
          padding: 40px 20px;
          color: #718096;
        }
        
        .empty-icon {
          font-size: 40px;
          margin-bottom: 16px;
          color: #e2e8f0;
        }
        
        .empty-analysis h3 {
          font-size: 20px;
          margin: 0 0 10px;
          color: #4a5568;
        }
        
        .empty-analysis p {
          margin: 0;
          color: #718096;
        }
        
        /* Results Section */
        .analysis-results {
          background-color: #f8fafc;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .results-header {
          display: flex;
          align-items: flex-start;
          margin-bottom: 30px;
        }
        
        .score-section {
          margin-right: 24px;
        }
        
        .score-circle {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .score-number {
          font-size: 32px;
          font-weight: bold;
          line-height: 1;
        }
        
        .score-label {
          font-size: 12px;
          opacity: 0.9;
          margin-top: 4px;
        }
        
        .score-summary {
          flex: 1;
        }
        
        .score-summary h3 {
          font-size: 20px;
          margin: 0 0 8px;
          color: #2d3748;
        }
        
        .score-summary p {
          color: #4a5568;
          margin: 0 0 16px;
        }
        
        /* Section scores */
        .section-scores h3 {
          font-size: 16px;
          margin: 16px 0 10px;
          color: #4a5568;
        }
        
        .score-bars {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .score-bar-container {
          width: 100%;
        }
        
        .score-bar-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
          font-size: 14px;
        }
        
        .section-name {
          color: #4a5568;
        }
        
        .section-score {
          font-weight: 500;
          color: #2d3748;
        }
        
        .score-bar-background {
          height: 8px;
          background-color: #edf2f7;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .score-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease-out;
        }
        
        /* Overview section */
        .overview-summary {
          background-color: white;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid #e2e8f0;
        }
        
        .summary-text {
          margin: 0 0 16px;
          color: #4a5568;
          line-height: 1.5;
        }
        
        .priority-issues h5 {
          font-size: 15px;
          margin: 0 0 10px;
          color: #2d3748;
        }
        
        .priority-issues ul {
          padding: 0;
          margin: 0;
          list-style-type: none;
        }
        
        .priority-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 8px;
          padding-left: 5px;
        }
        
        .priority-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #f56565;
          border-radius: 50%;
          margin-right: 10px;
          margin-top: 7px;
          flex-shrink: 0;
        }
        
        .no-priority-issues {
          display: flex;
          align-items: center;
          color: #48bb78;
        }
        
        .no-priority-issues :global(svg) {
          margin-right: 8px;
        }
        
        /* Feedback Tabs */
        .feedback-tabs {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 20px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        
        .feedback-tabs::-webkit-scrollbar {
          display: none;
        }
        
        .tab {
          padding: 10px 20px;
          background: none;
          border: none;
          font-size: 16px;
          color: #718096;
          cursor: pointer;
          font-weight: 500;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          display: flex;
          align-items: center;
        }
        
        .tab-icon {
          margin-right: 6px;
          font-size: 14px;
        }
        
        .tab:hover {
          color: #4299e1;
        }
        
        .tab.active {
          color: #4299e1;
          border-bottom-color: #4299e1;
        }
        
        .tab-content {
          margin-bottom: 25px;
        }
        
        .tab-content h4 {
          font-size: 18px;
          margin: 0 0 15px;
          color: #2d3748;
        }
        
        /* Feedback List */
        .feedback-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .feedback-item {
          display: flex;
          padding: 12px 0;
          border-bottom: 1px solid #edf2f7;
        }
        
        .feedback-item:last-child {
          border-bottom: none;
        }
        
        .feedback-item.error .icon {
          color: #f56565;
        }
        
        .feedback-item.warning .icon {
          color: #ecc94b;
        }
        
        .feedback-item.success .icon {
          color: #48bb78;
        }
        
        .feedback-item.info .icon {
          color: #4299e1;
        }
        
        .icon {
          font-size: 18px;
          margin-right: 12px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        
        .feedback-content {
          flex: 1;
        }
        
        .feedback-message {
          font-weight: 500;
          color: #2d3748;
          margin: 0 0 4px;
          line-height: 1.4;
        }
        
        .feedback-fix {
          color: #718096;
          font-size: 14px;
          margin: 0;
          line-height: 1.4;
        }
        
        .impact-tag {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
          margin-right: 6px;
          text-transform: uppercase;
        }
        
        .impact-tag[data-impact="high"] {
          background-color: rgba(245, 101, 101, 0.1);
          color: #c53030;
        }
        
        .impact-tag[data-impact="medium"] {
          background-color: rgba(236, 201, 75, 0.1);
          color: #b7791f;
        }
        
        .impact-tag[data-impact="low"] {
          background-color: rgba(66, 153, 225, 0.1);
          color: #2b6cb0;
        }
        
        .impact-tag[data-impact="positive"] {
          background-color: rgba(72, 187, 120, 0.1);
          color: #2f855a;
        }
        
        /* Keywords Section */
        .keyword-matches {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .matched-keywords, .missing-keywords {
          flex: 1;
          min-width: 250px;
        }
        
        .matched-keywords h5, .missing-keywords h5 {
          font-size: 16px;
          margin: 0 0 10px"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle, 
  FaFileAlt, 
  FaSearch, 
  FaMagic, 
  FaLightbulb, 
  FaChartBar,
  FaUpload,
  FaFilePdf,
  FaFileWord
} from 'react-icons/fa';

export default function AtsChecker({ resumeData, jobDescription, currentTemplate }) {
  const [score, setScore] = useState(null);
  const [sectionScores, setSectionScores] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [jobDesc, setJobDesc] = useState(jobDescription || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const analyzeTimeoutRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  
  // Trigger analysis whenever job description changes (with debounce)
  useEffect(() => {
    if (jobDesc) {
      setIsAnalyzing(true);
      
      // Clear previous timeout
      if (analyzeTimeoutRef.current) {
        clearTimeout(analyzeTimeoutRef.current);
      }
      
      // Set new timeout for analysis
      analyzeTimeoutRef.current = setTimeout(() => {
        const results = performAtsAnalysis(resumeData, jobDesc, currentTemplate);
        setScore(results.score);
        setSectionScores(results.sectionScores);
        setFeedback(results.feedback);
        setIsAnalyzing(false);
      }, 800);
    }
    
    return () => {
      if (analyzeTimeoutRef.current) {
        clearTimeout(analyzeTimeoutRef.current);
      }
    };
  }, [jobDesc, resumeData, currentTemplate]);
  
  // File upload handlers
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFileError(null);
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File is too large. Please upload a file smaller than 5MB.");
      return;
    }
    
    // Check file type
    if (!file.type.includes('pdf') && 
        !file.type.includes('word') && 
        !file.type.includes('text') &&
        !file.name.endsWith('.doc') &&
        !file.name.endsWith('.docx')) {
      setFileError("Please upload a PDF, DOC, DOCX, or TXT file.");
      return;
    }
    
    setUploadedFile(file);
    setIsAnalyzing(true);
    
    try {
      // Extract text from the file
      const text = await extractTextFromFile(file);
      setJobDesc(text);
      
      // The useEffect will trigger the analysis once jobDesc is updated
    } catch (error) {
      console.error("Error extracting text from file:", error);
      setFileError("Could not read the file. Please try again or paste the text manually.");
      setIsAnalyzing(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    // Don't clear the job description as the user might want to keep it
  };

  const extractTextFromFile = async (file) => {
    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      // For text files, use the FileReader API
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      });
    } 
    
    // For PDFs and DOCs, we would need external libraries
    // For now, return a placeholder message with instructions
    return `[Text extracted from ${file.name}]\n\nTo fully implement PDF and DOCX extraction, you need to install:\n- pdf.js for PDFs\n- mammoth.js for Word documents\n\nFor now, please paste the job description text manually.`;
  };
  
  // Main analysis function
  const performAtsAnalysis = (resume, jobDesc, template) => {
    const analysis = {
      score: 0,
      sectionScores: {
        format: 0,
        content: 0,
        keywords: 0,
        template: 0
      },
      feedback: [],
      keywordMatches: [],
      missingKeywords: [],
      formatIssues: [],
      contentIssues: [],
      templateIssues: []
    };
    
    // Extract resume text for analysis
    const resumeText = extractResumeText(resume).toLowerCase();
    const jobText = jobDesc.toLowerCase();
    
    // STEP 1: Basic format check (25% of score)
    checkResumeFormat(resume, analysis);
    
    // STEP 2: Keyword analysis (35% of score)
    if (jobDesc && jobDesc.length > 50) {
      analyzeKeywords(resumeText, jobText, analysis);
    }
    
    // STEP 3: Content quality check (25% of score)
    checkContentQuality(resume, analysis);
    
    // STEP 4: Template compatibility check (15% of score)
    checkTemplateCompatibility(template, analysis);
    
    // Calculate final score (0-100)
    calculateScore(analysis);
    
    return analysis;
  };
  
  // Extract plaintext content from resume data
  const extractResumeText = (resume) => {
    const { personalInfo, experience, education, skills, skillCategories, projects, achievements, certificates } = resume || {};
    
    let text = '';
    
    // Personal info
    if (personalInfo) {
      text += `${personalInfo.name || ''} ${personalInfo.title || ''} ${personalInfo.summary || ''} `;
    }
    
    // Skills - handle both formats
    if (Array.isArray(skills)) {
      text += skills.join(' ') + ' ';
    }
    
    if (Array.isArray(skillCategories)) {
      skillCategories.forEach(category => {
        if (Array.isArray(category.skills)) {
          text += category.skills.join(' ') + ' ';
        }
      });
    }
    
    // Experience
    if (Array.isArray(experience)) {
      experience.forEach(job => {
        text += `${job.position || job.title || ''} ${job.company || ''} ${job.description || ''} `;
      });
    }
    
    // Education
    if (Array.isArray(education)) {
      education.forEach(edu => {
        text += `${edu.degree || ''} ${edu.school || ''} ${edu.description || ''} `;
      });
    }
    
    // Projects
    if (Array.isArray(projects)) {
      projects.forEach(project => {
        text += `${project.title || ''} ${project.description || ''} `;
        if (project.technologies) {
          text += project.technologies.join(' ') + ' ';
        }
      });
    }
    
    // Achievements
    if (Array.isArray(achievements)) {
      achievements.forEach(achievement => {
        text += `${achievement.title || ''} ${achievement.organization || ''} ${achievement.description || ''} `;
      });
    }
    
    // Certificates
    if (Array.isArray(certificates)) {
      certificates.forEach(cert => {
        text += `${cert.name || ''} ${cert.issuer || ''} `;
      });
    }
    
    return text;
  };
  
  // Format check function
  const checkResumeFormat = (resume, analysis) => {
    const { personalInfo, experience, education, skills, skillCategories } = resume || {};
    let formatScore = 100;
    
    // Check if contact information exists and is properly formatted
    if (!personalInfo || !personalInfo.email) {
      analysis.feedback.push({
        type: 'error',
        section: 'format',
        message: 'Missing email address',
        impact: 'high',
        fix: 'Add a professional email address to your contact information.'
      });
      analysis.formatIssues.push('email');
      formatScore -= 15;
    } else if (personalInfo.email && !isValidEmail(personalInfo.email)) {
      analysis.feedback.push({
        type: 'error',
        section: 'format',
        message: 'Invalid email format',
        impact: 'high',
        fix: 'Ensure your email address follows standard format (example@domain.com).'
      });
      analysis.formatIssues.push('email-format');
      formatScore -= 10;
    }
    
    if (!personalInfo || !personalInfo.phone) {
      analysis.feedback.push({
        type: 'warning',
        section: 'format',
        message: 'Missing phone number',
        impact: 'medium',
        fix: 'Add your phone number to improve contactability.'
      });
      analysis.formatIssues.push('phone');
      formatScore -= 8;
    }
    
    // Check if name is present
    if (!personalInfo?.name) {
      analysis.feedback.push({
        type: 'error',
        section: 'format',
        message: 'Missing full name',
        impact: 'high',
        fix: 'Add your full name at the top of your resume.'
      });
      analysis.formatIssues.push('name');
      formatScore -= 15;
    }
    
    // Check for professional summary/objective
    if (!personalInfo?.summary) {
      analysis.feedback.push({
        type: 'warning',
        section: 'format',
        message: 'Missing professional summary',
        impact: 'medium',
        fix: 'Add a concise professional summary highlighting your expertise and career goals.'
      });
      analysis.formatIssues.push('summary');
      formatScore -= 8;
    } else if (personalInfo.summary && personalInfo.summary.length < 50) {
      analysis.feedback.push({
        type: 'warning',
        section: 'format',
        message: 'Professional summary is too brief',
        impact: 'low',
        fix: 'Expand your professional summary to 3-5 sentences highlighting key qualifications.'
      });
      analysis.formatIssues.push('short-summary');
      formatScore -= 5;
    }
    
    // Check if there's no experience
    if (!experience || experience.length === 0) {
      analysis.feedback.push({
        type: 'error',
        section: 'format',
        message: 'No work experience listed',
        impact: 'high',
        fix: 'Add your relevant work experience with details about your roles and achievements.'
      });
      analysis.formatIssues.push('experience');
      formatScore -= 15;
    } else if (experience.length > 0) {
      // Check experience format
      let missingJobTitles = 0;
      let missingCompanies = 0;
      let missingDates = 0;
      let missingDescriptions = 0;
      
      experience.forEach(job => {
        if (!job.position && !job.title) missingJobTitles++;
        if (!job.company) missingCompanies++;
        if (!job.startDate) missingDates++;
        if (!job.description || job.description.length < 30) missingDescriptions++;
      });
      
      if (missingJobTitles > 0) {
        analysis.feedback.push({
          type: 'error',
          section: 'format',
          message: `Missing job ${missingJobTitles === 1 ? 'title' : 'titles'} in work experience`,
          impact: 'medium',
          fix: 'Add a clear job title for each position.'
        });
        analysis.formatIssues.push('job-titles');
        formatScore -= 8;
      }
      
      if (missingCompanies > 0) {
        analysis.feedback.push({
          type: 'error',
          section: 'format',
          message: `Missing company ${missingCompanies === 1 ? 'name' : 'names'} in work experience`,
          impact: 'medium',
          fix: 'Include the company name for each position.'
        });
        analysis.formatIssues.push('company-names');
        formatScore -= 8;
      }
      
      if (missingDates > 0) {
        analysis.feedback.push({
          type: 'warning',
          section: 'format',
          message: `Missing employment dates in ${missingDates} ${missingDates === 1 ? 'position' : 'positions'}`,
          impact: 'medium',
          fix: 'Include start and end dates for each position (MM/YYYY format is recommended).'
        });
        analysis.formatIssues.push('dates');
        formatScore -= 6;
      }
      
      if (missingDescriptions > 0) {
        analysis.feedback.push({
          type: 'warning',
          section: 'format',
          message: `${missingDescriptions} ${missingDescriptions === 1 ? 'position is' : 'positions are'} missing detailed descriptions`,
          impact: 'high',
          fix: 'Add detailed descriptions with accomplishments and responsibilities for each position.'
        });
        analysis.formatIssues.push('job-descriptions');
        formatScore -= 10;
      }
    }
    
    // Check for skills section
    const hasSkills = (Array.isArray(skills) && skills.length > 0) || 
                    (Array.isArray(skillCategories) && skillCategories.length > 0);
    
    if (!hasSkills) {
      analysis.feedback.push({
        type: 'error',
        section: 'format',
        message: 'Missing skills section',
        impact: 'high',
        fix: 'Add a dedicated skills section with relevant technical and soft skills.'
      });
      analysis.formatIssues.push('skills');
      formatScore -= 12;
    }
    
    // Check for education
    if (!education || education.length === 0) {
      analysis.feedback.push({
        type: 'warning',
        section: 'format',
        message: 'Missing education information',
        impact: 'medium',
        fix: 'Include your educational background with degrees, institutions, and graduation dates.'
      });
      analysis.formatIssues.push('education');
      formatScore -= 8;
    }
    
    // Ensure format score is between 0-100
    formatScore = Math.max(0, Math.min(100, formatScore));
    analysis.sectionScores.format = formatScore;
  };
  
  // Keyword analysis function
  const analyzeKeywords = (resumeText, jobText, analysis) => {
    // Extract key terms from job description using a more sophisticated approach
    const keywords = extractKeyTerms(jobText);
    
    // Skip further analysis if no meaningful keywords extracted
    if (keywords.length === 0) {
      analysis.feedback.push({
        type: 'info',
        section: 'keywords',
        message: 'Unable to extract meaningful keywords from job description',
        impact: 'low',
        fix: 'Try pasting a more detailed job description.'
      });
      analysis.sectionScores.keywords = 50; // Neutral score
      return;
    }
    
    // Check for keyword matches
    const matches = [];
    const missing = [];
    const partialMatches = [];
    
    keywords.forEach(keyword => {
      if (resumeText.includes(keyword.toLowerCase())) {
        matches.push(keyword);
      } else {
        // Check for partial matches (for multi-word keywords)
        if (keyword.includes(' ') && keyword.split(' ').some(word => 
          word.length > 3 && resumeText.includes(word.toLowerCase())
        )) {
          partialMatches.push(keyword);
        } else {
          missing.push(keyword);
        }
      }
    });
    
    // Calculate match percentage
    const matchRate = (matches.length + (partialMatches.length * 0.5)) / keywords.length;
    let keywordScore = Math.round(matchRate * 100);
    
    // Add results to analysis
    analysis.keywordMatches = matches;
    analysis.partialMatches = partialMatches;
    analysis.missingKeywords = missing;
    
    // Add feedback based on match rate
    if (matchRate < 0.3) {
      analysis.feedback.push({
        type: 'error',
        section: 'keywords',
        message: 'Very low keyword match rate with job description',
        impact: 'high',
        fix: `Include more relevant keywords from the job description in your resume.`
      });
      
      // Suggest top missing keywords
      if (missing.length > 0) {
        const topMissing = missing.slice(0, 5).join(', ');
        analysis.feedback.push({
          type: 'warning',
          section: 'keywords',
          message: `Key terms missing from your resume`,
          impact: 'high',
          fix: `Consider adding these relevant terms: ${topMissing}`
        });
      }
    } else if (matchRate < 0.5) {
      analysis.feedback.push({
        type: 'warning',
        section: 'keywords',
        message: 'Low keyword match rate with job description',
        impact: 'medium',
        fix: `Try to include more of the following keywords: ${missing.slice(0, 3).join(', ')}`
      });
    } else if (matchRate < 0.7) {
      analysis.feedback.push({
        type: 'info',
        section: 'keywords',
        message: 'Moderate keyword match with job description',
        impact: 'medium',
        fix: `Consider adding more of these keywords: ${missing.slice(0, 2).join(', ')}`
      });
    } else {
      analysis.feedback.push({
        type: 'success',
        section: 'keywords',
        message: 'Strong keyword matching with job description',
        impact: 'positive',
        fix: `Your resume contains many of the key terms from the job description.`
      });
    }
    
    // Suggest word placement
    if (matches.length > 0 && matches.length < keywords.length) {
      analysis.feedback.push({
        type: 'info',
        section: 'keywords',
        message: 'Strategic keyword placement',
        impact: 'medium',
        fix: `Place important keywords near the top of your resume and in section headings when possible.`
      });
    }
    
    analysis.sectionScores.keywords = keywordScore;
  };
  
  // Check content quality
  const checkContentQuality = (resume, analysis) => {
    const { personalInfo, experience, skills } = resume || {};
    let contentScore = 100;
    
    // Check summary quality if it exists
    if (personalInfo?.summary) {
      const summary = personalInfo.summary.toLowerCase();
      
      // Check for generic phrases in summary
      const genericPhrases = ['team player', 'hard worker', 'detail-oriented', 'self-starter', 'go-getter', 'think outside the box'];
      const foundGeneric = genericPhrases.filter(phrase => summary.includes(phrase));
      
      if (foundGeneric.length > 0) {
        analysis.feedback.push({
          type: 'warning',
          section: 'content',
          message: 'Generic phrases detected in summary',
          impact: 'medium',
          fix: `Replace clichés like "${foundGeneric.join('", "')}" with specific achievements and skills.`
        });
        analysis.contentIssues.push('generic-summary');
        contentScore -= 8 * Math.min(foundGeneric.length, 3);
      }
    }
    
    // Check experience descriptions for action verbs and metrics
    if (Array.isArray(experience) && experience.length > 0) {
      let weakDescriptionCount = 0;
      let missingMetricsCount = 0;
      
      const actionVerbs = ['achieved', 'implemented', 'created', 'increased', 'reduced', 'managed', 'developed', 'led', 'coordinated', 'designed'];
      
      experience.forEach(job => {
        if (job.description) {
          const desc = job.description.toLowerCase();
          const hasActionVerb = actionVerbs.some(verb => desc.includes(verb));
          const hasMetrics = /\d+%|\d+ percent|increased by|\$\d+|reduced|improved|generated/.test(desc);
          
          if (!hasActionVerb) {
            weakDescriptionCount++;
          }
          
          if (!hasMetrics) {
            missingMetricsCount++;
          }
        }
      });
      
      if (weakDescriptionCount > 0) {
        analysis.feedback.push({
          type: 'warning',
          section: 'content',
          message: `${weakDescriptionCount} job ${weakDescriptionCount === 1 ? 'description lacks' : 'descriptions lack'} strong action verbs`,
          impact: 'medium',
          fix: 'Begin bullet points with strong action verbs like "Achieved," "Implemented," or "Developed."'
        });
        analysis.contentIssues.push('weak-verbs');
        contentScore -= Math.min(weakDescriptionCount * 5, 15);
      }
      
      if (missingMetricsCount > Math.floor(experience.length / 2)) {
        analysis.feedback.push({
          type: 'warning',
          section: 'content',
          message: 'Job descriptions lack measurable achievements',
          impact: 'high',
          fix: 'Quantify your achievements with metrics, percentages, or specific numbers.'
        });
        analysis.contentIssues.push('no-metrics');
        contentScore -= 12;
      }
      
      // Check for too short descriptions
      const shortDescriptions = experience.filter(job => 
        job.description && job.description.length < 80
      ).length;
      
      if (shortDescriptions > 0) {
        analysis.feedback.push({
          type: 'warning',
          section: 'content',
          message: `${shortDescriptions} job ${shortDescriptions === 1 ? 'description is' : 'descriptions are'} too brief`,
          impact: 'medium',
          fix: 'Expand job descriptions to detail your responsibilities and achievements.'
        });
        analysis.contentIssues.push('brief-descriptions');
        contentScore -= Math.min(shortDescriptions * 5, 15);
      }
    }
    
    // Check skills formatting and relevance
    if (Array.isArray(skills) && skills.length > 0) {
      // Check for very generic skills
      const genericSkills = ['Microsoft Office', 'communication', 'teamwork', 'organization'];
      const foundGenericSkills = skills.filter(skill => 
        genericSkills.includes(skill.toLowerCase())
      );
      
      if (foundGenericSkills.length > 2) {
        analysis.feedback.push({
          type: 'info',
          section: 'content',
          message: 'Too many generic skills listed',
          impact: 'low',
          fix: 'Replace generic skills with more specific, technical, or specialized skills relevant to your field.'
        });
        analysis.contentIssues.push('generic-skills');
        contentScore -= 5;
      }
      
      // Check for excessive skills
      if (skills.length > 20) {
        analysis.feedback.push({
          type: 'info',
          section: 'content',
          message: 'Excessive number of skills listed',
          impact: 'low',
          fix: 'Focus on your top 12-15 most relevant skills rather than listing too many.'
        });
        analysis.contentIssues.push('too-many-skills');
        contentScore -= 5;
      }
    }
    
    // Ensure content score is between 0-100
    contentScore = Math.max(0, Math.min(100, contentScore));
    analysis.sectionScores.content = contentScore;
  };
  
  // Check template ATS compatibility
  const checkTemplateCompatibility = (templateName, analysis) => {
    // Default good score
    let templateScore = 85;
    
    // Check for known problematic templates or features
    const problematicTemplates = ['creative', 'iconic', 'stylish'];
    const moderateTemplates = ['modern', 'fancy', 'executive'];
    const bestTemplates = ['professional', 'clean', 'simple', 'classic', 'traditional', 'chronological'];
    
    if (problematicTemplates.includes(templateName?.toLowerCase())) {
      analysis.feedback.push({
        type: 'warning',
        section: 'template',
        message: 'Template may have ATS compatibility issues',
        impact: 'high',
        fix: 'Consider switching to a more ATS-friendly template like "Professional" or "Simple".'
      });
      analysis.templateIssues.push('problematic-template');
      templateScore = 60;
    } else if (moderateTemplates.includes(templateName?.toLowerCase())) {
      analysis.feedback.push({
        type: 'info',
        section: 'template',
        message: 'Template has moderate ATS compatibility',
        impact: 'medium',
        fix: 'This template should work with most ATS systems, but consider a simpler layout if applying to companies with strict ATS filters.'
      });
      analysis.templateIssues.push('moderate-template');
      templateScore = 75;
    } else if (bestTemplates.includes(templateName?.toLowerCase())) {
      analysis.feedback.push({
        type: 'success',
        section: 'template',
        message: 'Excellent template choice for ATS compatibility',
        impact: 'positive',
        fix: 'This template is well-structured for ATS systems.'
      });
      templateScore = 95;
    }
    
    analysis.sectionScores.template = templateScore;
  };
  
  // Extract key terms from job description
  const extractKeyTerms = (jobText) => {
    if (!jobText) return [];
    
    // Split text into words
    const words = jobText.toLowerCase()
      .replace(/[^\w\s]/g, ' ')  // Replace punctuation with spaces
      .split(/\s+/)              // Split on whitespace
      .filter(word => word.length > 2); // Filter out short words
    
    // Count word frequency
    const wordFrequency = {};
    words.forEach(word => {
      // Skip common words
      if (commonWords.includes(word)) return;
      
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    
    // Extract n-grams (phrases of 2-3 words)
    const phrases = extractPhrases(jobText.toLowerCase(), 2, 3);
    const phraseFrequency = {};
    
    phrases.forEach(phrase => {
      // Skip phrases with common words only
      if (phrase.split(' ').every(word => commonWords.includes(word))) return;
      
      phraseFrequency[phrase] = (phraseFrequency[phrase] || 0) + 1;
    });
    
    // Combine single words and phrases, prioritizing:
    // 1. Repeated phrases
    // 2. Repeated technical words
    // 3. Job-specific terminology
    
    // Get top phrases (mentioned more than once)
    const topPhrases = Object.keys(phraseFrequency)
      .filter(phrase => phraseFrequency[phrase] > 1)
      .sort((a, b) => phraseFrequency[b] - phraseFrequency[a])
      .slice(0, 10);
    
    // Get top single words
    const topWords = Object.keys(wordFrequency)
      .filter(word => {
        // Filter out words that are already part of our top phrases
        return !topPhrases.some(phrase => phrase.includes(word)) &&
              wordFrequency[word] > 1;
      })
      .sort((a, b) => wordFrequency[b] - wordFrequency[a])
      .slice(0, 15);
    
    // Look for technical skills
    const technicalTerms = extractTechnicalTerms(jobText.toLowerCase());
    const techTermsNotInTopLists = technicalTerms.filter(term => 
      !topPhrases.includes(term) && !topWords.includes(term)
    ).slice(0, 5);
    
    // Combine all unique terms
    const allKeyTerms = [...new Set([...topPhrases, ...topWords, ...techTermsNotInTopLists])];
    
    return allKeyTerms.slice(0, 20); // Limit to top 20 keywords
  };
  
  // Extract phrases from text
  const extractPhrases = (text, minWords, maxWords) => {
    const words = text.replace(/[^\w\s]/g, ' ').split(/\s+/);
    const phrases = [];
    
    for (let i = 0; i < words.length; i++) {
      for (let j = minWords; j <= maxWords; j++) {
        if (i + j <= words.length) {
          const phrase = words.slice(i, i + j).join(' ');
          if (phrase.length > 5) { // Avoid very short phrases
            phrases.push(phrase);
          }
        }
      }
    }
    
    return phrases;
  };
  
  // Extract technical terms
  const extractTechnicalTerms = (text) => {
    // Check for matches in our technical terms dictionary
    return technicalTerms.filter(term => text.includes(term.toLowerCase()));
  };
  
  // Calculate final score
  const calculateScore = (analysis) => {
    // Section weights
    const weights = {
      format: 0.25,
      keywords: 0.35,
      content: 0.25,
      template: 0.15
    };
    
    // Calculate weighted average
    let totalScore = 0;
    Object.keys(weights).forEach(section => {
      totalScore += analysis.sectionScores[section] * weights[section];
    });
    
    // Round to nearest whole number
    analysis.score = Math.round(totalScore);
  };
  
  // Helper function to check email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // List of common words to filter out
  const commonWords = [
    'and', 'the', 'for', 'with', 'this', 'that', 'have', 'has', 'had',
    'not', 'are', 'from', 'were', 'will', 'would', 'could', 'should',
    'what', 'when', 'where', 'how', 'why', 'who', 'your', 'their',
    'about', 'into', 'over', 'after', 'before', 'between', 'during',
    'these', 'those', 'them', 'then', 'than', 'some', 'such', 'very',
    'just', 'more', 'most', 'other', 'some', 'such', 'only', 'same',
    'time', 'well', 'also', 'now', 'day', 'get', 'may', 'new', 'one',
    'two', 'our', 'out', 'any', 'been', 'both', 'each', 'more', 'must',
    'off', 'too', 'use', 'way', 'even', 'said', 'see', 'can', 'work'
  ];
  
  // List of common technical terms/skills to check for
  const technicalTerms = [
    'javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'typescript',
    'react', 'angular', 'vue', 'node.js', 'django', 'flask', 'spring', 'express', 
    'mongodb', 'mysql', 'postgresql', 'sql', 'nosql', 'graphql', 'rest api',
    'aws', 'azure', 'google cloud', 'docker', 'kubernetes', 'jenkins', 'ci/cd',
    'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'agile', 'scrum',
    'html', 'css', 'sass', 'less', 'bootstrap', 'tailwind',
    'machine learning', 'deep learning', 'artificial intelligence', 'data science',
    'tensorflow', 'pytorch', 'keras', 'pandas', 'numpy', 'scikit-learn',
    'excel', 'tableau', 'power bi', 'sap', 'salesforce', 'wordpress',
    'photoshop', 'illustrator', 'indesign', 'figma', 'sketch', 'adobe xd',
    'seo', 'sem', 'google analytics', 'social media marketing', 'content marketing',
    'project management', 'product management', 'scrum master', 'product owner',
    'linux', 'unix', 'windows', 'macos', 'android', 'ios',
    'cyber security', 'network security', 'penetration testing', 'ethical hacking',
    'accounting', 'financial analysis', 'budgeting', 'forecasting', 'quickbooks',
    'customer service', 'sales', 'negotiation', 'cold calling', 'b2b', 'b2c',
    'human resources', 'recruitment', 'talent acquisition', 'employee relations',
    'marketing', 'brand management', 'public relations', 'event planning'
  ];
  
  // Render score circle with appropriate color
  const renderScoreCircle = () => {
    let color = '#4299e1'; // Default blue
    
    if (score > 80) color = '#48bb78'; // Green for good score
    else if (score > 60) color = '#ecc94b'; // Yellow for medium score
    else color = '#f56565'; // Red for poor score
    
    return (
      <div className="score-circle" style={{ backgroundColor: color }}>
        <div className="score-number">{score}</div>
        <div className="score-label">ATS Score</div>
      </div>
    );
  };
  
  // Render section score bars
  const renderSectionScores = () => {
    return (
      <div className="section-scores">
        <h3>Section Scores</h3>
        <div className="score-bars">
          {Object.keys(sectionScores).map(section => {
            const sectionScore = sectionScores[section];
            let barColor = '#4299e1'; // Default blue
            
            if (sectionScore > 80) barColor = '#48bb78'; // Green for good score
            else if (sectionScore > 60) barColor = '#ecc94b'; // Yellow for medium score
            else barColor = '#f56565'; // Red for poor score
            
            return (
              <div key={section} className="score-bar-container">
                <div className="score-bar-label">
                  <span className="section-name">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </span>
                  <span className="section-score">{sectionScore}</span>
                </div>
                <div className="score-bar-background">
                  <div 
                    className="score-bar-fill" 
                    style={{ 
                      width: `${sectionScore}%`,
                      backgroundColor: barColor
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render feedback items by section
  const renderFeedbackBySection = (section) => {
    const sectionFeedback = feedback.filter(item => item.section === section);
    
    if (sectionFeedback.length === 0) {
      return (
        <div className="no-feedback">
          <FaCheckCircle className="icon success" />
          <p>No issues found in this area.</p>
        </div>
      );
    }
    
    return (
      <ul className="feedback-list">
        {sectionFeedback.map((item, index) => (
          <li key={index} className={`feedback-item ${item.type}`}>
            {item.type === 'error' && <FaTimesCircle className="icon error" />}
            {item.type === 'warning' && <FaExclamationTriangle className="icon warning" />}
            {item.type === 'success' && <FaCheckCircle className="icon success" />}
            {item.type === 'info' && <FaLightbulb className="icon info" />}
            <div className="feedback-content">
              <p className="feedback-message">
                <span className="impact-tag" data-impact={item.impact}>{item.impact}</span> {item.message}
              </p>
              <p className="feedback-fix">{item.fix}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="ats-checker">
      <div className="ats-header">
        <h2><FaSearch /> ATS Resume Analyzer</h2>
        <p>Check how your resume performs with Applicant Tracking Systems</p>
      </div>
      
      {/* Job Description Input */}
      <div className="job-description-section">
        <h3>Paste Job Description</h3>
        <p className="input-hint">For accurate results, paste the job description to analyze keyword matching</p>
        <textarea 
          className="job-description-input"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste the job description here to analyze keyword matching..."
          rows={6}
        />
        
        {/* File Upload Section */}
        <div className="file-upload-section">
          <p className="upload-hint">Or upload a job description file</p>
          <label className="file-upload-label">
            <input
              type="file"
              className="file-input"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
            />
            <FaUpload className="upload-icon" />
            <span>Upload PDF, DOC or TXT</span>
          </label>
          
          {uploadedFile && (
            <div className="uploaded-file">
              {uploadedFile.type.includes('pdf') && <FaFilePdf className="file-type-icon pdf" />}
              {uploadedFile.type.includes('word') && <FaFileWord className="file-type-icon word" />}
              {uploadedFile.type.includes('text') && <FaFileAlt className="file-type-icon text" />}
              <span className="file-name">{uploadedFile.name}</span>
              <button 
                className="remove-file" 
                onClick={handleRemoveFile}
                aria-label="Remove file"
              >
                &times;
              </button>
            </div>
          )}
          
          {fileError && (
            <div className="file-error">
              <span>{fileError}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Status indicator */}
      {isAnalyzing && (
        <div className="analyzing-indicator">
          <div className="analyzing-spinner"></div>
          <span>Analyzing resume...</span>
        </div>
      )}
      
      {/* Results Section */}
      {score !== null && !isAnalyzing && (
        <div className="analysis-results">
          <div className="results-header">
            <div className="score-section">
              {renderScoreCircle()}
            </div>
            <div className="score-summary">
              <h3>ATS Compatibility Score</h3>
              <p>
                {score >= 80 ? 'Excellent! Your resume is well-optimized for ATS systems.' : 
                 score >= 60 ? 'Good. Your resume will pass most ATS systems with some improvements.' :
                 'Needs improvement. Your resume may be filtered out by many ATS systems.'}
              </p>
              {renderSectionScores()}
            </div>
          </div>
          
          {/* Feedback Tabs */}
          <div className="feedback-tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartBar className="tab-icon" /> Overview
            </button>
            <button 
              className={`tab ${activeTab === 'keywords' ? 'active' : ''}`}
              onClick={() => setActiveTab('keywords')}
            >
              Keywords
            </button>
            <button 
              className={`tab ${activeTab === 'format' ? 'active' : ''}`}
              onClick={() => setActiveTab('format')}
            >
              Format
            </button>
            <button 
              className={`tab ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              Content
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <h4>Resume Analysis Summary</h4>
                <div className="overview-summary">
                  <p className="summary-text">
                    {score >= 80 ? 
                      'Your resume is well-optimized for ATS systems. It has good formatting, relevant keywords, and quality content.' : 
                     score >= 60 ? 
                      'Your resume will likely pass ATS systems but has room for improvement in some areas.' :
                      'Your resume needs significant improvement to reliably pass ATS systems. Focus on the areas highlighted below.'}
                  </p>
                  
                  <div className="priority-issues">
                    <h5>Priority Improvements:</h5>
                    <ul>
                      {feedback
                        .filter(item => item.impact === 'high')
                        .slice(0, 3)
                        .map((item, index) => (
                          <li key={index} className="priority-item">
                            <span className="priority-bullet"></span>
                            <span>{item.message}</span>
                          </li>
                        ))}
                      {feedback.filter(item => item.impact === 'high').length === 0 && (
                        <li className="no-priority-issues">
                          <FaCheckCircle className="icon success" />
                          <span>No critical issues found!</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                {renderFeedbackBySection(activeTab)}
              </div>
            )}
            
            {activeTab === 'keywords' && (
              <div className="keywords-tab">
                <h4>Keyword Analysis</h4>
                {jobDesc ? (
                  <>
                    <div className="keyword-feedback">
                      {renderFeedbackBySection('keywords')}
                    </div>
                    
                    {/* Keyword matches */}
                    {score !== null && (
                      <div className="keyword-matches">
                        <div className="matched-keywords">
                          <h5>Matched Keywords</h5>
                          <div className="keyword-tags">
                            {feedback.length > 0 && performAtsAnalysis(resumeData, jobDesc, currentTemplate).keywordMatches.map((word, index) => (
                              <span key={index} className="keyword-tag matched">{word}</span>
                            ))}
                            {feedback.length > 0 && performAtsAnalysis(resumeData, jobDesc, currentTemplate).keywordMatches.length === 0 && (
                              <p className="no-matches">No keyword matches found</p>
                            )}
                          </div>
                        </div>
                        <div className="missing-keywords">
                          <h5>Missing Important Keywords</h5>
                          <div className="keyword-tags">
                            {feedback.length > 0 && (
                              performAtsAnalysis(resumeData, jobDesc, currentTemplate).missingKeywords.slice(0, 10).map((word, index) => (
                                <span key={index} className="keyword-tag missing">{word}</span>
                              ))
                            )}
                            {feedback.length > 0 && performAtsAnalysis(resumeData, jobDesc, currentTemplate).missingKeywords.length === 0 && (
                              <p className="no-matches">No missing keywords - great job!</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="empty-state">Paste a job description to analyze keyword matching.</p>
                )}
              </div>
            )}
            
            {activeTab === 'format' && (
              <div className="format-tab">
                <h4>ATS Format Analysis</h4>
                {renderFeedbackBySection('format')}
              </div>
            )}
            
            {activeTab === 'content' && (
              <div className="content-tab">
                <h4>Content Quality Analysis</h4>
                {renderFeedbackBySection('content')}
              </div>
            )}
          </div>
          
          <div className="improvement-tips">
            <h4><FaMagic /> Improvement Tips</h4>
            <ul className="tips-list">
              <li>Use exact keywords from the job description where appropriate</li>
              <li>Ensure consistent date formats (MM/YYYY recommended)</li>
              <li>Use standard section headings (Experience, Education, Skills)</li>
              <li>Avoid complex formatting, tables, or graphics</li>
              <li>Include a phone number and professional email address</li>
              <li>Quantify achievements with numbers when possible</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* No job description message */}
      {!isAnalyzing && !score && (
        <div className="empty-analysis">
          <div className="empty-icon">
            <FaFileAlt />
          </div>
          <h3>Ready to analyze your resume</h3>
          <p>Paste a job description above or upload a file to see how well your resume matches the requirements.</p>
        </div>
      )}
      
      {/* Styles */}
      <style jsx>{`
        .ats-checker {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          color: #333;
        }
        
        .ats-header {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 18px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .ats-header h2 {
          font-size: 26px;
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2d3748;
        }
        
        .ats-header h2 :global(svg) {
          margin-right: 12px;
          color: #4299e1;
        }
        
        .ats-header p {
          color: #718096;
          margin: 0;
          font-size: 15px;
        }
        
        /* Job Description Section */
        .job-description-section {
          margin-bottom: 25px;
        }
        
        .job-description-section h3 {
          font-size: 18px;
          margin: 0 0 8px;
          color: #2d3748;
        }
        
        .input-hint {
          color: #718096;
          font-size: 14px;
          margin-bottom: 10px;
        }
        
        .job-description-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 15px;
          resize: vertical;
          margin-bottom: 15px;
          font-family: inherit;
          transition: all 0.2s;
        }

         `}</style>
        
