"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools, FaStream,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt, FaChevronRight
} from "react-icons/fa";

export default function Crisp({ resumeData }) {
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
        <section className="mb-6 resume-section">
          <h2 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">About Me</h2>
          <div className="bg-white p-4 border border-slate-200">
            <p className="text-slate-600 leading-relaxed">{personalInfo?.summary}</p>
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
        <section className="mb-8 resume-section">
          <h2 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Work Experience</h2>
          
          <div className="space-y-5">
            {experience?.map((job, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="bg-white p-4 border border-slate-200">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <h3 className="text-lg font-medium text-slate-800">
                      {job.position || job.title}
                    </h3>
                    <span className="text-sm py-1 px-3 bg-slate-100 text-slate-600 rounded">
                      {job.startDate} — {job.endDate || "Present"}
                    </span>
                  </div>
                  
                  <p className="text-blue-600 font-medium">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                  
                  <p className="text-slate-600 mt-2">
                    {job.description}
                  </p>
                </div>
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
        <section className="mb-6 resume-section">
          <h2 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Education</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {education?.map((edu, index) => (
              <div key={index} className="bg-white p-4 border border-slate-200">
                <h3 className="text-lg font-medium text-slate-800">{edu.degree}</h3>
                <p className="text-blue-600 font-medium mt-1">{edu.school}</p>
                <p className="text-sm text-slate-500 mt-2 flex items-center">
                  <span className="mr-2">•</span>
                  {edu.startDate} — {edu.endDate || "Present"}
                </p>
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
        <section className="mb-6 resume-section">
          <h2 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Skills</h2>
          
          <div className="bg-white p-4 border border-slate-200">
            <div className="flex flex-wrap gap-2">
              {skills?.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 border border-slate-200 rounded"
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
        <section className="mb-6 resume-section">
          <h2 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {projects?.map((project, index) => (
              <div 
                key={index} 
                className="bg-white p-4 border border-slate-200 hover:border-blue-200 transition-colors page-break-inside-avoid"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-slate-800">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                      aria-label="View Project"
                    >
                      <FaLink className="text-sm" />
                    </a>
                  )}
                </div>
                
                <p className="text-slate-600 mb-3">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="inline-block px-2 py-1 text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded"
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
        <section className="mb-6 resume-section">
          <h2 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Achievements</h2>
          
          <div className="bg-white p-4 border border-slate-200">
            <ul className="space-y-3">
              {achievements?.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2 page-break-inside-avoid">
                  <FaChevronRight className="mt-1 text-blue-500 flex-shrink-0" />
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <h3 className="text-base font-medium text-slate-800">
                        {achievement.title}
                      </h3>
                      {achievement.date && (
                        <span className="text-xs py-0.5 px-2 bg-slate-100 text-slate-600 rounded">
                          {achievement.date}
                        </span>
                      )}
                    </div>
                    
                    {achievement.organization && (
                      <p className="text-blue-600 text-sm mt-0.5">
                        {achievement.organization}
                      </p>
                    )}
                    
                    {achievement.description && (
                      <p className="text-slate-600 mt-1 text-sm">
                        {achievement.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
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
        <section className="mb-6 resume-section">
          <h2 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Certifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates?.map((cert, index) => (
              <div key={index} className="bg-white p-4 border border-slate-200 flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-medium text-slate-800">{cert.name}</h3>
                    <span className="text-xs py-0.5 px-2 bg-slate-100 text-slate-600 whitespace-nowrap rounded">
                      {cert.date}
                    </span>
                  </div>
                  
                  <p className="text-blue-600 text-sm mt-1">{cert.issuer}</p>
                </div>
                
                {cert.url && (
                  <div className="mt-2 text-right">
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
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
    <div className="bg-slate-50 min-h-full font-sans text-slate-700 relative">
      {/* Header with personal info */}
      <header className="py-8 bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {personalInfo?.name || "Your Name"}
            </h1>
            
            {personalInfo?.title && (
              <h2 className="text-xl md:text-2xl font-light mb-6 opacity-90">
                {personalInfo.title}
              </h2>
            )}
            
            {/* Contact Details */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-2xl mx-auto">
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center text-white/90 hover:text-white px-3 py-1.5"
                >
                  <FaEnvelope className="mr-2" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              
              {personalInfo?.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center text-white/90 hover:text-white px-3 py-1.5"
                >
                  <FaPhone className="mr-2" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              
              {personalInfo?.location && (
                <span className="flex items-center text-white/90 px-3 py-1.5">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              
              {personalInfo?.linkedin && (
                <a
                  href={ensureHttps(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white/90 hover:text-white px-3 py-1.5"
                >
                  <FaLinkedin className="mr-2" />
                  <span>LinkedIn</span>
                </a>
              )}
              
              {personalInfo?.github && (
                <a
                  href={ensureHttps(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white/90 hover:text-white px-3 py-1.5"
                >
                  <FaGithub className="mr-2" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Section Selector - Right side panel */}
      <div className="fixed top-24 right-4 z-10 p-3 bg-white rounded-lg shadow border border-slate-200 w-48 print:hidden">
        <h3 className="text-sm font-bold text-slate-700 flex items-center mb-3 pb-2 border-b border-slate-100">
          <FaStream className="mr-2 text-blue-500" />
          Resume Sections
        </h3>
        <div className="space-y-1.5 max-h-[70vh] overflow-y-auto">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center w-full px-3 py-2 rounded-md transition-all text-sm ${
                sectionOrder.includes(section.id)
                  ? 'bg-slate-100 text-slate-400 cursor-default'
                  : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600'
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className={`mr-2 ${sectionOrder.includes(section.id) ? 'text-slate-400' : 'text-blue-500'}`}>
                {section.icon}
              </span>
              <span>{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="ml-auto w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 text-xs font-bold">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button
              onClick={resetSections}
              className="w-full mt-4 px-3 py-2 bg-white hover:bg-slate-50 text-slate-600 rounded-md transition-all text-sm border border-slate-200"
            >
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 py-8" ref={contentRef}>
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
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg bg-white print:hidden">
            <p className="text-slate-500">
              Select sections from the panel to build your resume
            </p>
          </div>
        )}
        
        {/* For print - show all sections in default order if nothing is selected */}
        {sectionOrder.length === 0 && (
          <div className="hidden print:block space-y-6">
            {availableSections.map(section => (
              <div key={section.id}>{section.content}</div>
            ))}
          </div>
        )}

        {/* Page numbers for print only */}
        <div className="hidden print:block text-right text-xs text-slate-400 pt-4 border-t border-slate-200 mt-8">
          <span className="print-page-number"></span>
        </div>
      </main>
      
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
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
            margin-bottom: 1.5rem;
          }
          
          .page-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          /* Page numbers */
          .print-page-number:after {
            content: counter(page);
          }
          
          /* Remove shadows for print */
          .shadow, .shadow-sm, .shadow-md {
            box-shadow: none !important;
          }
          
          /* Border colors */
          .border-slate-100, .border-slate-200, .border-blue-200 {
            border-color: #e5e7eb !important;
          }
          
          /* Blue header */
          .bg-blue-600 {
            background-color: #2563eb !important;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}