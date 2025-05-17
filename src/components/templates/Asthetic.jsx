"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

export default function Asthetic({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};

  const [sectionOrder, setSectionOrder] = useState([]);
  const contentRef = useRef(null);
  
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };
  
  const allSections = [
    { 
      id: 'summary', 
      label: 'Summary',
      icon: <FaUserAlt />,
      available: !!personalInfo?.summary,
      content: (
        <section className="mb-3 resume-section">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-teal-800 mb-3 border-b border-teal-100 pb-1">About Me</h2>
          <div className="bg-white rounded shadow-sm p-4 border-l-4 border-teal-600">
            <p className="text-sm text-gray-700 leading-relaxed">{personalInfo?.summary}</p>
          </div>
        </section>
      )
    },
    { 
      id: 'experience', 
      label: 'Experience',
      icon: <FaBriefcase />,
      available: experience?.length > 0,
      content: (
        <section className="mb-3 resume-section">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-teal-800 mb-3 border-b border-teal-100 pb-1">Professional Experience</h2>
          
          <div className="space-y-4">
            {experience?.map((job, index) => (
              <div key={index} className="bg-white rounded shadow-sm p-4 page-break-inside-avoid">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <h3 className="text-base font-bold text-gray-900">
                    {job.position || job.title}
                  </h3>
                  <span className="text-xs font-medium bg-teal-100 text-teal-800 px-2 py-0.5 rounded-sm mt-1 md:mt-0">
                    {job.startDate} — {job.endDate || "Present"}
                  </span>
                </div>
                
                <p className="text-sm text-teal-700 font-medium mt-1">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
                
                <p className="text-sm text-gray-600 mt-2">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )
    },
    { 
      id: 'education', 
      label: 'Education',
      icon: <FaGraduationCap />,
      available: education?.length > 0,
      content: (
        <section className="mb-3 resume-section">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-teal-800 mb-3 border-b border-teal-100 pb-1">Education</h2>
          
          <div className="space-y-3">
            {education?.map((edu, index) => (
              <div key={index} className="bg-white rounded shadow-sm p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-teal-700 mt-1">{edu.school}</p>
                  </div>
                  <span className="text-xs font-medium bg-teal-100 text-teal-800 px-2 py-0.5 rounded-sm">
                    {edu.startDate} — {edu.endDate || "Present"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )
    },
    { 
      id: 'skills', 
      label: 'Skills',
      icon: <FaTools />,
      available: skills?.length > 0,
      content: (
        <section className="mb-3 resume-section">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-teal-800 mb-3 border-b border-teal-100 pb-1">Skills & Expertise</h2>
          
          <div className="bg-white rounded shadow-sm p-4">
            <div className="flex flex-wrap gap-2">
              {skills?.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full border border-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )
    },
    { 
      id: 'projects', 
      label: 'Projects',
      icon: <FaLaptopCode />,
      available: projects?.length > 0,
      content: (
        <section className="mb-3 resume-section">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-teal-800 mb-3 border-b border-teal-100 pb-1">Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-3">
            {projects?.map((project, index) => (
              <div 
                key={index} 
                className="bg-white rounded shadow-sm p-4 page-break-inside-avoid"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-bold text-gray-900">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-800 transition-colors"
                      aria-label="View Project"
                    >
                      <FaLink className="text-sm" />
                    </a>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 my-2">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    },
    { 
      id: 'achievements', 
      label: 'Achievements',
      icon: <FaTrophy />,
      available: achievements?.length > 0,
      content: (
        <section className="mb-3 resume-section">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-teal-800 mb-3 border-b border-teal-100 pb-1">Achievements</h2>
          
          <div className="space-y-3">
            {achievements?.map((achievement, index) => (
              <div key={index} className="bg-white rounded shadow-sm p-4">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <h3 className="text-base font-bold text-gray-900">
                    {achievement.title}
                  </h3>
                  {achievement.date && (
                    <span className="text-xs font-medium bg-teal-100 text-teal-800 px-2 py-0.5 rounded-sm mt-1 md:mt-0">
                      {achievement.date}
                    </span>
                  )}
                </div>
                
                {achievement.organization && (
                  <p className="text-sm text-teal-700 mt-1">
                    {achievement.organization}
                  </p>
                )}
                
                {achievement.description && (
                  <p className="text-sm text-gray-600 mt-2">
                    {achievement.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    },
    { 
      id: 'certificates', 
      label: 'Certificates',
      icon: <FaCertificate />,
      available: certificates?.length > 0,
      content: (
        <section className="mb-3 resume-section">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-teal-800 mb-3 border-b border-teal-100 pb-1">Certifications</h2>
          
          <div className="grid md:grid-cols-2 gap-3">
            {certificates?.map((cert, index) => (
              <div key={index} className="bg-white rounded shadow-sm p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-teal-700 mt-1">{cert.issuer}</p>
                  </div>
                  <span className="text-xs font-medium bg-teal-100 text-teal-800 px-2 py-0.5 rounded-sm whitespace-nowrap">
                    {cert.date}
                  </span>
                </div>
                
                {cert.url && (
                  <div className="mt-2 text-right">
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-teal-600 hover:text-teal-800 transition-colors underline inline-flex items-center gap-1"
                    >
                      <FaLink size={10} /> View Certificate
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    },
  ];

  const availableSections = allSections.filter(section => section.available);

  const handleSectionClick = (sectionId) => {
    if (sectionOrder.includes(sectionId)) return;
    setSectionOrder(prev => [...prev, sectionId]);
  };

  const resetSections = () => {
    setSectionOrder([]);
  };

  return (
    <div className="bg-gray-50 min-h-full font-sans text-gray-700 relative">
      {/* Header with personal info - Simplified without image */}
      <header className="bg-gradient-to-r from-teal-700 to-teal-900 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Name and Details - Now centered */}
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide mb-2">
              {personalInfo?.name || "Your Name"}
            </h1>
            
            {personalInfo?.title && (
              <h2 className="text-base md:text-lg font-light opacity-90 mb-4">
                {personalInfo.title}
              </h2>
            )}
            
            {/* Contact Details */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-5 text-sm">
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center text-teal-100 hover:text-white transition-colors"
                >
                  <FaEnvelope className="mr-1.5" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              
              {personalInfo?.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center text-teal-100 hover:text-white transition-colors"
                >
                  <FaPhone className="mr-1.5" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              
              {personalInfo?.location && (
                <span className="flex items-center text-teal-100">
                  <FaMapMarkerAlt className="mr-1.5" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              
              {personalInfo?.linkedin && (
                <a
                  href={ensureHttps(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-teal-100 hover:text-white transition-colors"
                >
                  <FaLinkedin className="mr-1.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              
              {personalInfo?.github && (
                <a
                  href={ensureHttps(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-teal-100 hover:text-white transition-colors"
                >
                  <FaGithub className="mr-1.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Section Selector - Right side floating panel */}
      <div className="fixed top-24 right-4 z-10 p-3 bg-white/90 rounded-lg shadow-lg border border-gray-200 backdrop-blur-sm w-48 print:hidden">
        <h3 className="text-sm font-medium text-teal-800 mb-2 text-center border-b pb-1 border-teal-100">
          Add Resume Sections
        </h3>
        <div className="space-y-1 max-h-[70vh] overflow-y-auto">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center w-full px-3 py-1.5 rounded-md transition-all text-sm ${
                sectionOrder.includes(section.id)
                  ? 'bg-gray-100 text-gray-400 cursor-default'
                  : 'bg-teal-50 hover:bg-teal-100 text-teal-800'
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className="mr-2">{section.icon}</span>
              <span>{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="ml-auto w-5 h-5 flex items-center justify-center rounded-full bg-teal-600 text-white text-xs">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button
              onClick={resetSections}
              className="w-full mt-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md transition-all text-sm border border-gray-200"
            >
              Reset Selection
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-4" ref={contentRef}>
        {/* Display sections in the order they were clicked */}
        {sectionOrder.length > 0 ? (
          sectionOrder.map(sectionId => {
            const section = allSections.find(s => s.id === sectionId);
            if (!section || !section.available) return null;
            return (
              <div key={sectionId} className="animate-fadeIn">
                {section.content}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg print:hidden">
            <p className="text-sm text-gray-500">
              Please select resume sections from the panel on the right
            </p>
          </div>
        )}
        
        {/* For print - show all sections in default order if nothing is selected */}
        {sectionOrder.length === 0 && (
          <div className="hidden print:block space-y-5">
            {availableSections.map(section => (
              <div key={section.id}>{section.content}</div>
            ))}
          </div>
        )}

        {/* Page numbers for print only */}
        <div className="hidden print:block text-right text-xs text-gray-400 pt-3">
          <span className="print-page-number"></span>
        </div>
      </main>
      
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.4in;
            size: letter portrait;
          }
          
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-size: 95%;
          }
          
          .resume-section {
            break-inside: avoid;
            page-break-inside: avoid;
            margin-bottom: 0.3in;
          }
          
          .page-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          /* Page numbers */
          .print-page-number:after {
            content: counter(page);
          }
          
          /* Background colors for print */
          .bg-teal-50, .bg-teal-100, .bg-gray-50, .bg-gray-100 {
            background-color: #ffffff !important;
          }
          
          .from-teal-700 {
            background-color: #0f766e !important;
          }
          
          .to-teal-900 {
            background-color: #134e4a !important;
          }
          
          /* Text colors for print */
          .text-teal-600, .text-teal-700, .text-teal-800 {
            color: #1e293b !important;
          }
          
          /* Shadow removal */
          .shadow-sm, .shadow-md, .shadow-lg {
            box-shadow: none !important;
          }
          
          /* Border colors */
          .border-teal-600, .border-teal-100 {
            border-color: #94a3b8 !important;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out forwards;
        }
      `}</style>
    </div>
  );
}