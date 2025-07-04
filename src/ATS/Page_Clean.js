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
  const [keywordMatches, setKeywordMatches] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [formatIssues, setFormatIssues] = useState([]);
  const [contentIssues, setContentIssues] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [jobDesc, setJobDesc] = useState(jobDescription || '');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [matchedKeywordsData, setMatchedKeywordsData] = useState([]);
  const [missingKeywordsData, setMissingKeywordsData] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);
  const analysisAreaRef = useRef(null);

  useEffect(() => {
    if (jobDescription) {
      setJobDesc(jobDescription);
    }
  }, [jobDescription]);

  useEffect(() => {
    if (resumeData && jobDesc && !isAnalyzing && !analysisComplete) {
      handleAnalyze();
    }
  }, [resumeData, jobDesc]);

  const handleAnalyze = async () => {
    if (!resumeData || !jobDesc.trim()) {
      setFileError("Please provide both resume data and job description.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setShowResults(false);
    setFileError(null);

    try {
      // Analyze the resume
      const results = performAtsAnalysis(resumeData, jobDesc, currentTemplate);
      
      // Update state with results
      setScore(results.score);
      setSectionScores(results.sectionScores);
      setFeedback(results.feedback);
      setKeywordMatches(results.keywordMatches);
      setMissingKeywords(results.missingKeywords);
      setFormatIssues(results.formatIssues);
      setContentIssues(results.contentIssues);
      setAnalysisResults(results);
      setMatchedKeywordsData(results.keywordMatches);
      setMissingKeywordsData(results.missingKeywords);
      setAllKeywords(results.allKeywords || []);
      
      // Show results
      setShowResults(true);
      setAnalysisComplete(true);
      
      // Scroll to results
      setTimeout(() => {
        if (analysisAreaRef.current) {
          analysisAreaRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error("Analysis error:", error);
      setFileError("An error occurred during analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFileError(null);
    setIsAnalyzing(true);

    try {
      const text = await extractTextFromFile(file);
      setJobDesc(text);
      setUploadedFile(file);
      
      // The useEffect will trigger analysis once jobDesc is updated
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
      allKeywords: []
    };

    // 1. Extract and analyze keywords
    const extractedKeywords = extractKeywords(jobDesc);
    analysis.allKeywords = extractedKeywords;

    // 2. Check keyword matches in resume
    const keywordMatches = checkKeywordMatches(resume, extractedKeywords);
    analysis.keywordMatches = keywordMatches.matched;
    analysis.missingKeywords = keywordMatches.missing;

    // 3. Calculate keyword score (40% of total)
    const keywordScore = (keywordMatches.matched.length / extractedKeywords.length) * 100;
    analysis.sectionScores.keywords = Math.round(keywordScore);

    // 4. Check content quality (30% of total)
    const contentScore = analyzeContentQuality(resume);
    analysis.sectionScores.content = contentScore;

    // 5. Check format and structure (20% of total)
    const formatScore = analyzeFormat(resume);
    analysis.sectionScores.format = formatScore;

    // 6. Template appropriateness (10% of total)
    const templateScore = analyzeTemplate(template);
    analysis.sectionScores.template = templateScore;

    // 7. Calculate overall score with weights
    const overallScore = calculateOverallScore(analysis.sectionScores);
    analysis.score = overallScore;

    // 8. Generate feedback
    analysis.feedback = generateFeedback(analysis);

    return analysis;
  };

  // Extract keywords from job description
  const extractKeywords = (jobDesc) => {
    const text = jobDesc.toLowerCase();
    
    // Remove common stopwords and punctuation
    const stopwords = new Set([
      'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with', 'you', 'your', 'our', 'we', 'us', 'they', 'them', 'their', 'this', 'these', 'those', 'or', 'but', 'not', 'have', 'had', 'do', 'does', 'did', 'can', 'could', 'should', 'would', 'may', 'might', 'must', 'shall', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'any', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'down', 'during', 'each', 'few', 'further', 'here', 'how', 'if', 'into', 'more', 'most', 'no', 'nor', 'now', 'once', 'only', 'other', 'out', 'over', 'own', 'same', 'so', 'some', 'such', 'than', 'then', 'there', 'through', 'under', 'until', 'up', 'very', 'what', 'when', 'where', 'which', 'while', 'who', 'why', 'work', 'working', 'job', 'role', 'position', 'candidate', 'experience', 'years', 'team', 'company', 'organization', 'business', 'industry', 'professional', 'skilled', 'ability', 'strong', 'excellent', 'good', 'prefer', 'required', 'minimum', 'plus', 'including', 'such', 'well', 'also', 'must', 'include', 'looking', 'seeking', 'join', 'opportunity', 'growth', 'career', 'development', 'environment', 'culture', 'values', 'mission', 'vision', 'help', 'support', 'build', 'create', 'develop', 'manage', 'lead', 'collaborate', 'communicate', 'ensure', 'provide', 'deliver', 'achieve', 'success', 'successful', 'effective', 'efficient', 'quality', 'high', 'best', 'top', 'key', 'important', 'critical', 'essential', 'necessary', 'ideal', 'perfect', 'right', 'fit', 'match', 'qualified', 'eligible', 'suitable', 'appropriate', 'relevant', 'related', 'similar', 'equivalent', 'comparable'
    ]);
    
    // Split into words and filter
    const words = text.toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopwords.has(word));
    
    // Split into 2-3 word phrases
    const phrases = [];
    for (let i = 0; i < words.length - 1; i++) {
      // 2-word phrases
      phrases.push(words[i] + ' ' + words[i + 1]);
      
      // 3-word phrases
      if (i < words.length - 2) {
        phrases.push(words[i] + ' ' + words[i + 1] + ' ' + words[i + 2]);
      }
    }
    
    // Count frequency
    const wordFrequency = {};
    const phraseFrequency = {};
    
    words.forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    
    phrases.forEach(phrase => {
      phraseFrequency[phrase] = (phraseFrequency[phrase] || 0) + 1;
    });
    
    // Get top phrases (frequency > 1)
    const topPhrases = Object.keys(phraseFrequency)
      .filter(phrase => phraseFrequency[phrase] > 1)
      .sort((a, b) => phraseFrequency[b] - phraseFrequency[a])
      .slice(0, 15);
    
    // Get top single words (frequency > 1)
    const topWords = Object.keys(wordFrequency)
      .filter(word => wordFrequency[word] > 1)
      .sort((a, b) => wordFrequency[b] - wordFrequency[a])
      .slice(0, 20);
    
    // Add common technical terms that might appear once but are important
    const techTerms = words.filter(word => {
      return word.length > 3 && (
        word.includes('develop') || word.includes('engineer') || word.includes('program') ||
        word.includes('design') || word.includes('analys') || word.includes('manage') ||
        word.includes('lead') || word.includes('architect') || word.includes('system') ||
        word.includes('data') || word.includes('cloud') || word.includes('api') ||
        word.includes('database') || word.includes('sql') || word.includes('python') ||
        word.includes('java') || word.includes('react') || word.includes('node') ||
        word.includes('aws') || word.includes('azure') || word.includes('docker') ||
        word.includes('kubernetes') || word.includes('git') || word.includes('ci') ||
        word.includes('test') || word.includes('deploy') || word.includes('scrum') ||
        word.includes('agile') || word.includes('devops') || word.includes('security') ||
        word.includes('performance') || word.includes('optimization') || word.includes('scale')
      );
    });
    
    const techTermsNotInTopLists = techTerms.filter(term => 
      !topWords.includes(term) && !topPhrases.some(phrase => phrase.includes(term))
    );
    
    // Combine all key terms
    const allKeyTerms = [...new Set([...topPhrases, ...topWords, ...techTermsNotInTopLists])];
    
    return allKeyTerms.slice(0, 40); // Return top 40 terms
  };

  // Check keyword matches in resume
  const checkKeywordMatches = (resume, keywords) => {
    const resumeText = JSON.stringify(resume).toLowerCase();
    const matched = [];
    const missing = [];
    
    keywords.forEach(keyword => {
      if (resumeText.includes(keyword.toLowerCase())) {
        matched.push(keyword);
      } else {
        missing.push(keyword);
      }
    });
    
    return { matched, missing };
  };

  // Analyze content quality
  const analyzeContentQuality = (resume) => {
    let score = 0;
    
    // Check for email format
    if (resume.personalInfo?.email && isValidEmail(resume.personalInfo.email)) {
      score += 5;
    }
    
    // Check for phone number
    if (resume.personalInfo?.phone) {
      score += 5;
    }
    
    // Check for professional summary
    if (resume.personalInfo?.summary && resume.personalInfo.summary.length > 50) {
      score += 20;
    }
    
    // Check for experience section
    if (resume.experience && resume.experience.length > 0) {
      score += 25;
      
      // Check for detailed experience descriptions
      const hasDetailedExp = resume.experience.some(exp => 
        exp.description && exp.description.length > 100
      );
      if (hasDetailedExp) score += 15;
    }
    
    // Check for education
    if (resume.education && resume.education.length > 0) {
      score += 15;
    }
    
    // Check for skills
    if (resume.skills && resume.skills.length > 0) {
      score += 15;
    }
    
    return Math.min(score, 100);
  };

  // Analyze format and structure
  const analyzeFormat = (resume) => {
    let score = 0;
    
    // Check for complete contact information
    if (resume.personalInfo?.name) score += 20;
    if (resume.personalInfo?.email) score += 15;
    if (resume.personalInfo?.phone) score += 15;
    if (resume.personalInfo?.location) score += 10;
    
    // Check for proper section organization
    if (resume.experience && resume.experience.length > 0) score += 20;
    if (resume.education && resume.education.length > 0) score += 10;
    if (resume.skills && resume.skills.length > 0) score += 10;
    
    return Math.min(score, 100);
  };

  // Analyze template appropriateness
  const analyzeTemplate = (template) => {
    // For now, give a base score
    // In a real implementation, you'd analyze template appropriateness
    // based on industry, role level, etc.
    return 85;
  };

  // Calculate overall score with weights
  const calculateOverallScore = (sectionScores) => {
    const weights = {
      keywords: 0.40,
      content: 0.30,
      format: 0.20,
      template: 0.10
    };
    
    let totalScore = 0;
    for (const [section, weight] of Object.entries(weights)) {
      totalScore += sectionScores[section] * weight;
    }
    
    return Math.round(totalScore);
  };

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Generate feedback based on analysis
  const generateFeedback = (analysis) => {
    const feedback = [];
    
    // Score-based feedback
    if (analysis.score >= 80) {
      feedback.push({
        type: 'success',
        message: 'Excellent! Your resume is well-optimized for ATS systems.'
      });
    } else if (analysis.score >= 60) {
      feedback.push({
        type: 'warning',
        message: 'Good job! Your resume has room for improvement to better match the job requirements.'
      });
    } else {
      feedback.push({
        type: 'error',
        message: 'Your resume needs significant improvements to pass ATS screening.'
      });
    }
    
    // Keyword feedback
    if (analysis.sectionScores.keywords < 40) {
      feedback.push({
        type: 'error',
        message: 'Add more relevant keywords from the job description to your resume.'
      });
    }
    
    // Content feedback
    if (analysis.sectionScores.content < 70) {
      feedback.push({
        type: 'warning',
        message: 'Improve your resume content by adding more detailed experience descriptions and achievements.'
      });
    }
    
    // Format feedback
    if (analysis.sectionScores.format < 70) {
      feedback.push({
        type: 'warning',
        message: 'Ensure all contact information is complete and properly formatted.'
      });
    }
    
    return feedback;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <FaSearch className="inline mr-2 text-blue-600" />
          ATS Resume Checker
        </h1>
        <p className="text-gray-600">
          Optimize your resume for Applicant Tracking Systems
        </p>
      </div>

      {/* Job Description Input */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            <FaFileAlt className="inline mr-2 text-blue-600" />
            Job Description
          </h2>
          <div className="flex items-center space-x-2">
            <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg border border-blue-200 transition-colors flex items-center space-x-2">
              <FaUpload size={16} />
              <span>Upload File</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* File Upload Status */}
        {uploadedFile && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaFileAlt className="text-green-600" />
                <span className="text-green-800 font-medium">
                  {uploadedFile.name}
                </span>
              </div>
              <button
                onClick={handleRemoveFile}
                className="text-red-600 hover:text-red-800"
              >
                <FaTimesCircle />
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {fileError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <FaExclamationTriangle className="text-red-600" />
              <span className="text-red-800">{fileError}</span>
            </div>
          </div>
        )}

        {/* Job Description Textarea */}
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste the job description here or upload a file above..."
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          style={{ minHeight: '200px' }}
        />

        {/* Analyze Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !jobDesc.trim()}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all ${
              isAnalyzing || !jobDesc.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <FaMagic />
                <span>Analyze Resume</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && analysisResults && (
        <div ref={analysisAreaRef} className="space-y-6">
          {/* Overall Score */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ATS Compatibility Score
              </h3>
              <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
                {score}%
              </div>
              <div className={`text-xl font-semibold ${getScoreColor(score)}`}>
                {getScoreLabel(score)}
              </div>
            </div>
          </div>

          {/* Section Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <FaSearch className="text-blue-600 text-2xl mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Keywords</h4>
                <div className={`text-2xl font-bold ${getScoreColor(sectionScores.keywords)}`}>
                  {sectionScores.keywords}%
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <FaFileAlt className="text-green-600 text-2xl mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Content</h4>
                <div className={`text-2xl font-bold ${getScoreColor(sectionScores.content)}`}>
                  {sectionScores.content}%
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <FaChartBar className="text-purple-600 text-2xl mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Format</h4>
                <div className={`text-2xl font-bold ${getScoreColor(sectionScores.format)}`}>
                  {sectionScores.format}%
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="text-center">
                <FaLightbulb className="text-yellow-600 text-2xl mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Template</h4>
                <div className={`text-2xl font-bold ${getScoreColor(sectionScores.template)}`}>
                  {sectionScores.template}%
                </div>
              </div>
            </div>
          </div>

          {/* Feedback */}
          {feedback.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <FaLightbulb className="inline mr-2 text-yellow-600" />
                Feedback & Recommendations
              </h3>
              <div className="space-y-3">
                {feedback.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      item.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : item.type === 'warning'
                        ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {item.type === 'success' && <FaCheckCircle className="text-green-600 mt-0.5" />}
                      {item.type === 'warning' && <FaExclamationTriangle className="text-yellow-600 mt-0.5" />}
                      {item.type === 'error' && <FaTimesCircle className="text-red-600 mt-0.5" />}
                      <span>{item.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keywords Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Matched Keywords */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <FaCheckCircle className="inline mr-2 text-green-600" />
                Matched Keywords ({matchedKeywordsData.length})
              </h3>
              <div className="max-h-60 overflow-y-auto">
                {matchedKeywordsData.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {matchedKeywordsData.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No keywords matched. Consider adding more relevant terms.</p>
                )}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <FaExclamationTriangle className="inline mr-2 text-red-600" />
                Missing Keywords ({missingKeywordsData.length})
              </h3>
              <div className="max-h-60 overflow-y-auto">
                {missingKeywordsData.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {missingKeywordsData.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Great! All important keywords are present.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
