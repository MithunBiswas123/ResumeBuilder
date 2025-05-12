"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

export default function TwoColumn({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};

  const [sectionOrder, setSectionOrder] = useState([]);
  const contentRef = useRef(null);
  
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };
  
  // Define sections for left column - DARK THEME
  const leftSections = [
    { 
      id: 'contact',
      label: 'Contact',
      icon: <FaUserAlt />,
      available: true, // Always show contact info
      content: (
        <section className="resume-section">
          <h2 className="text-sm uppercase font-bold text-white bg-gray-800 px-2">Contact</h2>
          <div className="space-y-1">
            {personalInfo?.email && (
              <div className="flex items-start">
                <span className="text-white mr-1.5"><FaEnvelope size={12} /></span>
                <a href={`mailto:${personalInfo.email}`} className="text-gray-200 text-sm">
                  {personalInfo.email}
                </a>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-start">
                <span className="text-white mr-1.5"><FaPhone size={12} /></span>
                <a href={`tel:${personalInfo.phone}`} className="text-gray-200 text-sm">
                  {personalInfo.phone}
                </a>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-start">
                <span className="text-white mr-1.5"><FaMapMarkerAlt size={12} /></span>
                <span className="text-gray-200 text-sm">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-start">
                <span className="text-white mr-1.5"><FaLinkedin size={12} /></span>
                <a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="text-gray-200 text-sm">
                  LinkedIn
                </a>
              </div>
            )}
            {personalInfo?.github && (
              <div className="flex items-start">
                <span className="text-white mr-1.5"><FaGithub size={12} /></span>
                <a href={ensureHttps(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="text-gray-200 text-sm">
                  GitHub
                </a>
              </div>
            )}
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
        <section className="resume-section">
          <h2 className="text-sm uppercase font-bold text-white bg-gray-800 px-2">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {skills?.map((skill, index) => (
              <span 
                key={index} 
                className="px-1.5 text-sm bg-gray-800 text-gray-200 rounded"
              >
                {skill}
              </span>
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
        <section className="resume-section">
          <h2 className="text-sm uppercase font-bold text-white bg-gray-800 px-2">Education</h2>
          
          <div className="space-y-2">
            {education?.map((edu, index) => (
              <div key={index}>
                <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                <p className="text-sm text-gray-100">{edu.school}</p>
                <p className="text-sm text-gray-300">
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
        <section className="resume-section">
          <h2 className="text-sm uppercase font-bold text-white bg-gray-800 px-2">Certifications</h2>
          
          <div className="space-y-1.5">
            {certificates?.map((cert, index) => (
              <div key={index}>
                <h3 className="text-sm font-bold text-white">{cert.name}</h3>
                <p className="text-sm text-gray-200">{cert.issuer}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-300">{cert.date}</span>
                  
                  {cert.url && (
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white underline"
                    >
                      View
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
  
  // Define sections for right column (LIGHT THEME)
  const rightSections = [
    { 
      id: 'summary', 
      label: 'Summary',
      icon: <FaUserAlt />,
      available: !!personalInfo?.summary,
      content: (
        <section className="resume-section">
          <h2 className="text-base uppercase font-bold text-gray-800 border-b border-gray-300 pb-1">Professional Summary</h2>
          <p className="text-sm text-gray-700">{personalInfo?.summary}</p>
        </section>
      )
    },
    { 
      id: 'experience', 
      label: 'Experience',
      icon: <FaBriefcase />,
      available: experience?.length > 0,
      content: (
        <section className="resume-section">
          <h2 className="text-base uppercase font-bold text-gray-800 border-b border-gray-300 pb-1">Professional Experience</h2>
          
          <div className="space-y-2">
            {experience?.map((job, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-bold text-gray-800">
                    {job.position || job.title}
                  </h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {job.startDate} — {job.endDate || "Present"}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 font-medium">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
                
                <p className="text-sm text-gray-700">
                  {job.description}
                </p>
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
        <section className="resume-section">
          <h2 className="text-base uppercase font-bold text-gray-800 border-b border-gray-300 pb-1">Projects</h2>
          
          <div className="space-y-2">
            {projects?.map((project, index) => (
              <div 
                key={index} 
                className="page-break-inside-avoid"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-bold text-gray-800">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600"
                      aria-label="View Project"
                    >
                      <FaLink size={12} />
                    </a>
                  )}
                </div>
                
                <p className="text-sm text-gray-700">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-1 text-xs bg-gray-100 text-gray-700 rounded"
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
        <section className="resume-section">
          <h2 className="text-base uppercase font-bold text-gray-800 border-b border-gray-300 pb-1">Achievements</h2>
          
          <div className="space-y-2">
            {achievements?.map((achievement, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-gray-800">
                    {achievement.title}
                  </h3>
                  {achievement.date && (
                    <span className="text-sm text-gray-500">
                      {achievement.date}
                    </span>
                  )}
                </div>
                
                {achievement.organization && (
                  <p className="text-sm text-gray-600">
                    {achievement.organization}
                  </p>
                )}
                
                {achievement.description && (
                  <p className="text-sm text-gray-700">
                    {achievement.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    }
  ];

  // Combine all sections for the section selector
  const allSections = [
    ...leftSections.filter(s => s.id !== 'contact'),  // Contact is always shown
    ...rightSections
  ];

  const availableSections = allSections.filter(section => section.available);

  const handleSectionClick = (sectionId) => {
    if (sectionOrder.includes(sectionId)) return;
    setSectionOrder(prev => [...prev, sectionId]);
  };

  const resetSections = () => {
    setSectionOrder([]);
  };

  // Filter sections by column
  const getLeftColumnSections = () => {
    // Always include contact section
    const contact = leftSections.find(s => s.id === 'contact');
    
    // Only include other left sections that are in the order
    const orderedLeftSections = sectionOrder
      .map(id => leftSections.find(s => s.id === id))
      .filter(s => s && s.id !== 'contact' && s.available);
    
    return [contact, ...orderedLeftSections].filter(Boolean);
  };
  
  const getRightColumnSections = () => {
    return sectionOrder
      .map(id => rightSections.find(s => s.id === id))
      .filter(s => s && s.available);
  };

  return (
    <div className="bg-white min-h-full font-sans text-gray-800 relative">
      {/* Simple white header */}
      <header className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {personalInfo?.name || "Your Name"}
          </h1>
          {personalInfo?.title && (
            <h2 className="text-lg font-medium text-gray-600">
              {personalInfo.title}
            </h2>
          )}
        </div>
      </header>

      {/* Section Selector - Right side floating panel */}
      <div className="fixed top-20 right-2 z-10 p-2 bg-white rounded-md shadow-md border border-gray-200 w-36 print:hidden">
        <h3 className="text-xs font-medium text-gray-500 text-center border-b border-gray-100 pb-1 mb-1">
          Add Sections
        </h3>
        <div className="space-y-0.5 max-h-[70vh] overflow-y-auto">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center w-full px-2 py-1 rounded text-xs ${
                sectionOrder.includes(section.id)
                  ? 'bg-gray-100 text-gray-400 cursor-default'
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className="mr-1 text-xs">{section.icon}</span>
              <span>{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="ml-auto w-4 h-4 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button
              onClick={resetSections}
              className="w-full mt-1 px-2 py-0.5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded text-xs font-medium"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Two-Column Main Content - BLACK LEFT, WHITE RIGHT */}
      <div className="flex" ref={contentRef}>
        {/* Left Column - BLACK */}
        <div className="w-1/3 bg-zinc-900 p-3 min-h-screen">
          <div className="space-y-3">
            {/* Get left column sections */}
            {getLeftColumnSections().length > 0 ? (
              getLeftColumnSections().map((section, index) => (
                <div key={index} className="animate-fadeIn">
                  {section.content}
                </div>
              ))
            ) : (
              // Fallback for empty left column
              <div className="hidden print:block">
                {leftSections
                  .filter(section => section.available)
                  .map((section, index) => (
                    <div key={index}>{section.content}</div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - WHITE */}
        <div className="w-2/3 p-4 bg-white">
          <div className="space-y-4">
            {/* Get right column sections */}
            {getRightColumnSections().length > 0 ? (
              getRightColumnSections().map((section, index) => (
                <div key={index} className="animate-fadeIn">
                  {section.content}
                </div>
              ))
            ) : (
              <div className="text-center py-4 border border-dashed border-gray-300 rounded print:hidden">
                <p className="text-sm text-gray-400">
                  Select sections from the panel
                </p>
              </div>
            )}

            {/* For print - show all right sections in default order if nothing is selected */}
            {getRightColumnSections().length === 0 && (
              <div className="hidden print:block space-y-4">
                {rightSections
                  .filter(section => section.available)
                  .map((section, index) => (
                    <div key={index}>{section.content}</div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.25in;
            size: letter portrait;
          }
          
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-size: 110%;
          }
          
          .resume-section {
            break-inside: avoid;
            page-break-inside: avoid;
            margin-bottom: 0.15in;
          }
          
          .page-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          /* Background colors for print */
          .bg-black, .bg-gray-800 {
            background-color: #000000 !important;
          }
          
          .text-white {
            color: #ffffff !important;
          }
          
          .text-gray-200, .text-gray-300 {
            color: #e5e7eb !important;
          }
          
          /* Keep column structure for print */
          .flex {
            display: flex !important;
          }
          
          .w-1/3 {
            width: 33.333333% !important;
          }
          
          .w-2/3 {
            width: 66.666667% !important;
          }
          
          /* Add some minimal spacing between sections */
          .space-y-3 > * + * {
            margin-top: 0.12in !important;
          }
          
          .space-y-4 > * + * {
            margin-top: 0.15in !important;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}