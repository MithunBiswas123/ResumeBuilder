"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools, FaStream,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt, FaCircle
} from "react-icons/fa";

export default function Phoenix({ resumeData }) {
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
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-1 bg-gradient-to-r from-orange-500 to-red-600"></div>
            <h2 className="text-base font-bold text-gray-800">Career Profile</h2>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm leading-relaxed">{personalInfo?.summary}</p>
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
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-1 bg-gradient-to-r from-orange-500 to-red-600"></div>
            <h2 className="text-base font-bold text-gray-800">Work Experience</h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-2 top-2 bottom-6 w-0.5 bg-orange-100"></div>
            
            <div className="space-y-3">
              {experience?.map((job, index) => (
                <div key={index} className="relative pl-8 page-break-inside-avoid">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <FaCircle className="text-white text-[8px]" />
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                      <h3 className="text-sm font-bold text-gray-800">
                        {job.position || job.title}
                      </h3>
                      <span className="text-xs py-0.5 px-2 bg-gradient-to-r from-orange-100 to-red-100 text-gray-700 rounded-full whitespace-nowrap">
                        {job.startDate} — {job.endDate || "Present"}
                      </span>
                    </div>
                    
                    <p className="text-orange-600 font-medium text-xs mt-0.5">
                      {job.company}
                      {job.location ? ` · ${job.location}` : ""}
                    </p>
                    
                    <p className="text-gray-600 mt-1 text-xs">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-1 bg-gradient-to-r from-orange-500 to-red-600"></div>
            <h2 className="text-base font-bold text-gray-800">Education</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-3">
            {education?.map((edu, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-orange-600 font-medium text-xs mt-0.5">{edu.school}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <FaGraduationCap className="mr-1 text-orange-400" size={10} />
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
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-1 bg-gradient-to-r from-orange-500 to-red-600"></div>
            <h2 className="text-base font-bold text-gray-800">Professional Skills</h2>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills?.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-xs text-gray-700">{skill}</span>
                    <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Expert
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                      style={{ 
                        width: '90%', 
                        animation: 'growWidth 1.5s ease-out forwards',
                        transformOrigin: 'left' 
                      }}
                    ></div>
                  </div>
                </div>
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
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-1 bg-gradient-to-r from-orange-500 to-red-600"></div>
            <h2 className="text-base font-bold text-gray-800">Featured Projects</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-3">
            {projects?.map((project, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group page-break-inside-avoid"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 bg-orange-50 text-orange-500 rounded-full hover:bg-orange-100 transition-colors"
                      aria-label="View Project"
                    >
                      <FaLink className="text-xs" />
                    </a>
                  )}
                </div>
                
                <p className="text-gray-600 mb-2 text-xs">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="inline-block px-1.5 py-0.5 text-[10px] bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 rounded-md border border-orange-100"
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
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-1 bg-gradient-to-r from-orange-500 to-red-600"></div>
            <h2 className="text-base font-bold text-gray-800">Achievements</h2>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements?.map((achievement, index) => (
                <div key={index} className="flex items-start gap-2 page-break-inside-avoid">
                  <div className="mt-0.5 text-orange-500 flex-shrink-0">
                    <FaTrophy size={12} />
                  </div>
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center gap-1">
                      <h3 className="text-xs font-bold text-gray-800">
                        {achievement.title}
                      </h3>
                      {achievement.date && (
                        <span className="text-[10px] py-0.5 px-1.5 bg-orange-50 text-orange-600 rounded">
                          {achievement.date}
                        </span>
                      )}
                    </div>
                    
                    {achievement.organization && (
                      <p className="text-orange-600 font-medium text-xs">
                        {achievement.organization}
                      </p>
                    )}
                    
                    {achievement.description && (
                      <p className="text-gray-600 text-xs">
                        {achievement.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-1 bg-gradient-to-r from-orange-500 to-red-600"></div>
            <h2 className="text-base font-bold text-gray-800">Certifications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certificates?.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-gray-800">{cert.name}</h3>
                    <span className="text-[10px] py-0.5 px-1.5 bg-orange-50 text-orange-600 whitespace-nowrap rounded">
                      {cert.date}
                    </span>
                  </div>
                  
                  <p className="text-orange-600 font-medium text-xs">{cert.issuer}</p>
                </div>
                
                {cert.url && (
                  <div className="mt-2 text-right">
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-2 py-0.5 rounded-full transition-all"
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
    <div className="bg-gray-50 min-h-full font-sans text-gray-700 relative">
      {/* Header with personal info */}
      <header className="py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-1">
              {personalInfo?.name || "Your Name"}
            </h1>
            
            {personalInfo?.title && (
              <h2 className="text-lg font-light mb-3 opacity-90">
                {personalInfo.title}
              </h2>
            )}
            
            {/* Contact Details */}
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 max-w-2xl mx-auto">
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center text-white/90 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md text-sm"
                >
                  <FaEnvelope className="mr-1" size={12} />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              
              {personalInfo?.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center text-white/90 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md text-sm"
                >
                  <FaPhone className="mr-1" size={12} />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              
              {personalInfo?.location && (
                <span className="flex items-center text-white/90 bg-white/10 px-2 py-1 rounded-md text-sm">
                  <FaMapMarkerAlt className="mr-1" size={12} />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              
              {personalInfo?.linkedin && (
                <a
                  href={ensureHttps(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white/90 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md text-sm"
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
                  className="flex items-center text-white/90 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md text-sm"
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
      <div className="fixed top-20 right-2 z-10 p-2 bg-white rounded-lg shadow-md border border-gray-100 w-40 print:hidden">
        <h3 className="text-xs font-bold text-gray-700 flex items-center mb-1.5 pb-1 border-b border-gray-100">
          <FaStream className="mr-1 text-orange-500" size={10} />
          Resume Sections
        </h3>
        <div className="space-y-1 max-h-[70vh] overflow-y-auto">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center w-full px-2 py-1.5 rounded-md transition-all text-xs ${
                sectionOrder.includes(section.id)
                  ? 'bg-orange-50 text-orange-300 cursor-default'
                  : 'bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600'
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className={`mr-1.5 ${sectionOrder.includes(section.id) ? 'text-orange-300' : 'text-orange-500'}`}>
                {section.icon}
              </span>
              <span>{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="ml-auto w-4 h-4 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button
              onClick={resetSections}
              className="w-full mt-2 px-2 py-1.5 bg-white hover:bg-red-50 text-red-600 rounded-md transition-all text-xs border border-red-100"
            >
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-4" ref={contentRef}>
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
          <div className="text-center py-6 border-2 border-dashed border-orange-200 rounded-lg bg-white print:hidden">
            <p className="text-orange-600 text-sm">
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
        <div className="hidden print:block text-right text-xs text-gray-400 pt-3 border-t border-gray-100 mt-4">
          <span className="print-page-number"></span>
        </div>
      </main>
      
      {/* Print styles */}
      <style jsx global>{`
        @keyframes growWidth {
          from { width: 0; }
          to { width: 90%; }
        }
        
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
          
          /* Make sure gradients print */
          .from-orange-500, .to-red-600, .from-orange-400, .to-red-500 {
            color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          /* Remove shadows for print */
          .shadow-sm, .shadow-md {
            box-shadow: none !important;
          }
          
          /* Border colors */
          .border-orange-100, .border-gray-100 {
            border-color: #e5e7eb !important;
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