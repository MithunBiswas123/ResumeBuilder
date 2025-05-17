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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-slate-800 mb-2 border-b border-slate-200 pb-1">About Me</h2>
          <div className="bg-white p-3 border border-slate-200">
            <p className="text-slate-600 text-sm leading-relaxed">{personalInfo?.summary}</p>
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-slate-800 mb-2 border-b border-slate-200 pb-1">Work Experience</h2>
          
          <div className="space-y-3">
            {experience?.map((job, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="bg-white p-3 border border-slate-200">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-1">
                    <h3 className="text-sm font-medium text-slate-800">
                      {job.position || job.title}
                    </h3>
                    <span className="text-xs py-0.5 px-2 bg-slate-100 text-slate-600 rounded">
                      {job.startDate} — {job.endDate || "Present"}
                    </span>
                  </div>
                  
                  <p className="text-blue-600 font-medium text-xs">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                  
                  <p className="text-slate-600 mt-1 text-xs">
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-slate-800 mb-2 border-b border-slate-200 pb-1">Education</h2>
          
          <div className="grid md:grid-cols-2 gap-3">
            {education?.map((edu, index) => (
              <div key={index} className="bg-white p-3 border border-slate-200">
                <h3 className="text-sm font-medium text-slate-800">{edu.degree}</h3>
                <p className="text-blue-600 font-medium text-xs mt-0.5">{edu.school}</p>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <span className="mr-1">•</span>
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-slate-800 mb-2 border-b border-slate-200 pb-1">Skills</h2>
          
          <div className="bg-white p-3 border border-slate-200">
            <div className="flex flex-wrap gap-1.5">
              {skills?.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs bg-slate-100 text-slate-700 border border-slate-200 rounded"
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-slate-800 mb-2 border-b border-slate-200 pb-1">Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-3">
            {projects?.map((project, index) => (
              <div 
                key={index} 
                className="bg-white p-3 border border-slate-200 hover:border-blue-200 transition-colors page-break-inside-avoid"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-medium text-slate-800">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-0.5 text-blue-500 hover:text-blue-700 transition-colors"
                      aria-label="View Project"
                    >
                      <FaLink className="text-xs" />
                    </a>
                  )}
                </div>
                
                <p className="text-slate-600 mb-2 text-xs">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="inline-block px-1.5 py-0.5 text-xs bg-slate-50 text-slate-600 border border-slate-100 rounded"
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-slate-800 mb-2 border-b border-slate-200 pb-1">Achievements</h2>
          
          <div className="bg-white p-3 border border-slate-200">
            <ul className="space-y-2">
              {achievements?.map((achievement, index) => (
                <li key={index} className="flex items-start gap-1.5 page-break-inside-avoid">
                  <FaChevronRight className="mt-0.5 text-blue-500 flex-shrink-0 text-xs" />
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center gap-1">
                      <h3 className="text-xs font-medium text-slate-800">
                        {achievement.title}
                      </h3>
                      {achievement.date && (
                        <span className="text-xs py-0.5 px-1.5 bg-slate-100 text-slate-600 rounded">
                          {achievement.date}
                        </span>
                      )}
                    </div>
                    
                    {achievement.organization && (
                      <p className="text-blue-600 text-xs">
                        {achievement.organization}
                      </p>
                    )}
                    
                    {achievement.description && (
                      <p className="text-slate-600 text-xs">
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-slate-800 mb-2 border-b border-slate-200 pb-1">Certifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certificates?.map((cert, index) => (
              <div key={index} className="bg-white p-3 border border-slate-200 flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-medium text-slate-800">{cert.name}</h3>
                    <span className="text-xs py-0.5 px-1.5 bg-slate-100 text-slate-600 whitespace-nowrap rounded">
                      {cert.date}
                    </span>
                  </div>
                  
                  <p className="text-blue-600 text-xs">{cert.issuer}</p>
                </div>
                
                {cert.url && (
                  <div className="mt-1 text-right">
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FaLink size={8} /> View
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
      <header className="py-5 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              {personalInfo?.name || "Your Name"}
            </h1>
            
            {personalInfo?.title && (
              <h2 className="text-lg md:text-xl font-light mb-3 opacity-90">
                {personalInfo.title}
              </h2>
            )}
            
            {/* Contact Details */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-2xl mx-auto">
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center text-white/90 hover:text-white px-2 py-1 text-sm"
                >
                  <FaEnvelope className="mr-1" size={12} />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              
              {personalInfo?.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center text-white/90 hover:text-white px-2 py-1 text-sm"
                >
                  <FaPhone className="mr-1" size={12} />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              
              {personalInfo?.location && (
                <span className="flex items-center text-white/90 px-2 py-1 text-sm">
                  <FaMapMarkerAlt className="mr-1" size={12} />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              
              {personalInfo?.linkedin && (
                <a
                  href={ensureHttps(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white/90 hover:text-white px-2 py-1 text-sm"
                >
                  <FaLinkedin className="mr-1" size={12} />
                  <span>LinkedIn</span>
                </a>
              )}
              
              {personalInfo?.github && (
                <a
                  href={ensureHttps(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white/90 hover:text-white px-2 py-1 text-sm"
                >
                  <FaGithub className="mr-1" size={12} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Section Selector - Right side panel */}
      <div className="fixed top-20 right-2 z-10 p-2 bg-white rounded-lg shadow border border-slate-200 w-40 print:hidden">
        <h3 className="text-xs font-bold text-slate-700 flex items-center mb-2 pb-1 border-b border-slate-100">
          <FaStream className="mr-1 text-blue-500" size={10} />
          Resume Sections
        </h3>
        <div className="space-y-1 max-h-[60vh] overflow-y-auto">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center w-full px-2 py-1.5 rounded-md transition-all text-xs ${
                sectionOrder.includes(section.id)
                  ? 'bg-slate-100 text-slate-400 cursor-default'
                  : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600'
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className={`mr-1.5 ${sectionOrder.includes(section.id) ? 'text-slate-400' : 'text-blue-500'}`}>
                {section.icon}
              </span>
              <span>{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="ml-auto w-4 h-4 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 text-xs font-bold">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button
              onClick={resetSections}
              className="w-full mt-2 px-2 py-1.5 bg-white hover:bg-slate-50 text-slate-600 rounded-md transition-all text-xs border border-slate-200"
            >
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-5" ref={contentRef}>
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
          <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-lg bg-white print:hidden">
            <p className="text-slate-500 text-sm">
              Select sections from the panel to build your resume
            </p>
          </div>
        )}
        
        {/* For print - show all sections in default order if nothing is selected */}
        {sectionOrder.length === 0 && (
          <div className="hidden print:block space-y-4">
            {availableSections.map(section => (
              <div key={section.id}>{section.content}</div>
            ))}
          </div>
        )}

        {/* Page numbers for print only */}
        <div className="hidden print:block text-right text-xs text-slate-400 pt-3 border-t border-slate-200 mt-4">
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
            font-size: 92%;
          }
          
          .resume-section {
            break-inside: avoid;
            page-break-inside: avoid;
            margin-bottom: 1rem;
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
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}