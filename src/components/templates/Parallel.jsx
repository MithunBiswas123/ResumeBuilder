"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

export default function Parallel({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};

  const [sectionOrder, setSectionOrder] = useState([]);
  const contentRef = useRef(null);
  
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };
  
  const leftColumnSections = [
    { 
      id: 'summary', 
      label: 'Summary',
      icon: <FaUserAlt />,
      available: !!personalInfo?.summary,
      content: (
        <section className="mb-6 resume-section">
          <h2 className="text-base font-bold mb-2">PROFILE</h2>
          <p className="text-sm text-gray-700">{personalInfo?.summary}</p>
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
          <h2 className="text-base font-bold mb-2">EDUCATION</h2>
          
          <div className="space-y-3">
            {education?.map((edu, index) => (
              <div key={index} className="pb-3">
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-sm text-gray-700">{edu.school}</p>
                <p className="text-xs text-gray-500">
                  {edu.startDate} — {edu.endDate || "Present"}
                </p>
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
        <section className="mb-6 resume-section">
          <h2 className="text-base font-bold mb-2">CERTIFICATIONS</h2>
          
          <div className="space-y-3">
            {certificates?.map((cert, index) => (
              <div key={index} className="pb-2">
                <h3 className="font-semibold text-gray-800 text-sm">{cert.name}</h3>
                <p className="text-xs text-gray-700">{cert.issuer}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{cert.date}</span>
                  {cert.url && (
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-gray-800"
                    >
                      <FaLink size={10} className="inline mr-1" />
                      Verify
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )
    },
   
  ];
  
  const rightColumnSections = [
    { 
      id: 'experience', 
      label: 'Experience',
      icon: <FaBriefcase />,
      available: experience?.length > 0,
      content: (
        <section className="mb-6 resume-section">
          <h2 className="text-base font-bold mb-3">WORK EXPERIENCE</h2>
          
          <div className="space-y-4">
            {experience?.map((job, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800">
                    {job.position || job.title}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {job.startDate} — {job.endDate || "Present"}
                  </span>
                </div>
                
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
                
                <p className="text-sm text-gray-600">
                  {job.description}
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
      <h2 className="text-base font-bold mb-2">SKILLS</h2>
      
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill, index) => (
          <div 
            key={index} 
            className="text-sm text-gray-700 px-3 py-1 border border-gray-200 rounded-md bg-gray-50"
          >
            {skill}
          </div>
        ))}
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
          <h2 className="text-base font-bold mb-3">PROJECTS</h2>
          
          <div className="space-y-4">
            {projects?.map((project, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 text-xs hover:text-gray-700"
                      aria-label="View Project"
                    >
                      <FaLink size={10} className="inline mr-1" />
                      Link
                    </a>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-1">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded"
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
          <h2 className="text-base font-bold mb-3">ACHIEVEMENTS</h2>
          
          <div className="space-y-4">
            {achievements?.map((achievement, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800">
                    {achievement.title}
                  </h3>
                  {achievement.date && (
                    <span className="text-xs text-gray-500">
                      {achievement.date}
                    </span>
                  )}
                </div>
                
                {achievement.organization && (
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {achievement.organization}
                  </p>
                )}
                
                {achievement.description && (
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    },
    
  ];

  // Combine sections for the selector
  const allSections = [...leftColumnSections, ...rightColumnSections];
  const availableSections = allSections.filter(section => section.available);

  const handleSectionClick = (sectionId) => {
    if (sectionOrder.includes(sectionId)) return;
    setSectionOrder(prev => [...prev, sectionId]);
  };

  const resetSections = () => {
    setSectionOrder([]);
  };

  // Separate selected sections by column
  const getSelectedSectionsForColumn = (columnSections) => {
    return sectionOrder
      .map(id => columnSections.find(section => section.id === id))
      .filter(Boolean);
  };

  // Get sections for column display or default when nothing selected
  const getLeftColumnContent = () => {
    const selectedLeftSections = getSelectedSectionsForColumn(leftColumnSections);
    
    if (sectionOrder.length === 0) {
      return (
        <div className="hidden print:block space-y-4">
          {leftColumnSections.filter(section => section.available).map(section => (
            <div key={section.id}>{section.content}</div>
          ))}
        </div>
      );
    }
    
    return selectedLeftSections.map(section => (
      <div key={section.id} className="animate-fadeIn">
        {section.content}
      </div>
    ));
  };
  
  const getRightColumnContent = () => {
    const selectedRightSections = getSelectedSectionsForColumn(rightColumnSections);
    
    if (sectionOrder.length === 0) {
      return (
        <div className="hidden print:block space-y-4">
          {rightColumnSections.filter(section => section.available).map(section => (
            <div key={section.id}>{section.content}</div>
          ))}
        </div>
      );
    }
    
    return selectedRightSections.map(section => (
      <div key={section.id} className="animate-fadeIn">
        {section.content}
      </div>
    ));
  };

  return (
    <div className="font-sans text-gray-800 bg-white min-h-full relative">
      {/* Header with personal info */}
      <header className="py-5 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            {personalInfo?.name || "Your Name"}
          </h1>
            
          {personalInfo?.title && (
            <h2 className="text-base text-gray-600 mt-1">
              {personalInfo.title}
            </h2>
          )}
            
          {/* Contact Details */}
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600 mt-3">
            {personalInfo?.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-gray-800 inline-flex items-center"
              >
                <FaEnvelope className="mr-1" size={12} />
                {personalInfo.email}
              </a>
            )}
              
            {personalInfo?.phone && (
              <a
                href={`tel:${personalInfo.phone}`}
                className="hover:text-gray-800 inline-flex items-center"
              >
                <FaPhone className="mr-1" size={12} />
                {personalInfo.phone}
              </a>
            )}
              
            {personalInfo?.location && (
              <span className="inline-flex items-center">
                <FaMapMarkerAlt className="mr-1" size={12} />
                {personalInfo.location}
              </span>
            )}
              
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-800 inline-flex items-center"
              >
                <FaLinkedin className="mr-1" size={12} />
                LinkedIn
              </a>
            )}
              
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-800 inline-flex items-center"
              >
                <FaGithub className="mr-1" size={12} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Section Selector - Right side panel */}
      <div className="fixed top-24 right-4 z-10 p-3 bg-white rounded-lg shadow-sm border border-gray-200 w-48 print:hidden">
        <h3 className="text-sm font-medium text-gray-700 mb-2 pb-2 border-b border-gray-100">
          Add Sections
        </h3>
        <div className="space-y-1 max-h-[70vh] overflow-y-auto">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center w-full px-3 py-2 rounded transition-all text-sm ${
                sectionOrder.includes(section.id)
                  ? 'bg-gray-100 text-gray-400 cursor-default'
                  : 'bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800'
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className={`mr-2 ${sectionOrder.includes(section.id) ? 'text-gray-400' : 'text-gray-500'}`}>
                {section.icon}
              </span>
              <span>{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="ml-auto w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-xs">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button
              onClick={resetSections}
              className="w-full mt-3 px-3 py-2 bg-white hover:bg-gray-50 text-gray-600 rounded transition-all text-sm border border-gray-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area - Two Column Layout */}
      <main className="max-w-5xl mx-auto px-8 py-6" ref={contentRef}>
        {sectionOrder.length > 0 || (sectionOrder.length === 0 && !contentRef.current?.className.includes('print')) ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="md:w-1/3">
              {getLeftColumnContent()}
              
              {/* Show message if no sections selected */}
              {sectionOrder.length === 0 && (
                <div className="text-center py-6 border border-dashed border-gray-200 rounded print:hidden h-40 flex items-center justify-center">
                  <p className="text-xs text-gray-400">
                    Select sections to build your resume
                  </p>
                </div>
              )}
            </div>
            
            {/* Right Column */}
            <div className="md:w-2/3">
              {getRightColumnContent()}
              
              {/* Show message if no sections selected */}
              {sectionOrder.length === 0 && (
                <div className="text-center py-6 border border-dashed border-gray-200 rounded print:hidden h-60 flex items-center justify-center">
                  <p className="text-xs text-gray-400">
                    Select sections to build your resume
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-gray-200 rounded print:hidden">
            <p className="text-gray-500">
              Select sections from the panel to build your resume
            </p>
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
            margin-bottom: 0.75rem;
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
          .shadow-sm, .shadow {
            box-shadow: none !important;
          }
          
          /* Border colors */
          .border-gray-100, .border-gray-200 {
            border-color: #e5e7eb !important;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}