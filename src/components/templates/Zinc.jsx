"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt, 
  FaChevronRight, FaLayerGroup
} from "react-icons/fa";

export default function Zinc({ resumeData }) {
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
        <section className="mb-8 resume-section">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
              <FaUserAlt className="text-zinc-600 text-sm" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 ml-3">Professional Summary</h2>
          </div>
          <div className="pl-11">
            <p className="text-zinc-700">{personalInfo?.summary}</p>
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
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
              <FaBriefcase className="text-zinc-600 text-sm" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 ml-3">Experience</h2>
          </div>
          
          <div className="pl-11 space-y-5">
            {experience?.map((job, index) => (
              <div key={index} className="page-break-inside-avoid relative">
                {/* Timeline connector */}
                {index < experience.length - 1 && (
                  <div className="absolute left-0 top-8 bottom-0 w-px border-l border-dashed border-zinc-300"></div>
                )}
                
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-zinc-300 absolute -left-7 top-1.5"></div>
                  <div className="mb-2 flex flex-col md:flex-row md:items-baseline md:justify-between">
                    <h3 className="font-medium text-zinc-900">
                      {job.position || job.title}
                    </h3>
                    <span className="text-sm text-zinc-500 whitespace-nowrap">
                      {job.startDate} — {job.endDate || "Present"}
                    </span>
                  </div>
                  
                  <p className="text-zinc-700 font-medium text-sm mb-1">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                  
                  <p className="text-zinc-600 text-sm">
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
        <section className="mb-8 resume-section">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
              <FaGraduationCap className="text-zinc-600 text-sm" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 ml-3">Education</h2>
          </div>
          
          <div className="pl-11 space-y-4">
            {education?.map((edu, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < education.length - 1 && (
                  <div className="absolute left-0 top-7 bottom-0 w-px border-l border-dashed border-zinc-300"></div>
                )}
                
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-zinc-300 absolute -left-7 top-1.5"></div>
                  <div className="mb-1 flex flex-col md:flex-row md:items-baseline md:justify-between">
                    <h3 className="font-medium text-zinc-900">{edu.degree}</h3>
                    <span className="text-sm text-zinc-500 whitespace-nowrap">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-zinc-700 text-sm">{edu.school}</p>
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
        <section className="mb-8 resume-section">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
              <FaTools className="text-zinc-600 text-sm" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 ml-3">Skills</h2>
          </div>
          
          <div className="pl-11">
            <div className="flex flex-wrap gap-2">
              {skills?.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-md text-sm"
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
        <section className="mb-8 resume-section">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
              <FaLaptopCode className="text-zinc-600 text-sm" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 ml-3">Projects</h2>
          </div>
          
          <div className="pl-11 space-y-3 grid md:grid-cols-2 gap-3">
            {projects?.map((project, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-medium text-zinc-900">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 text-sm hover:text-zinc-700 flex items-center"
                    >
                      <FaLink className="mr-1" size={12} />
                      View
                    </a>
                  )}
                </div>
                
                <p className="text-zinc-600 text-sm mb-2">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="inline-block px-2 py-0.5 text-xs bg-zinc-50 text-zinc-600 border border-zinc-200 rounded"
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
        <section className="mb-8 resume-section">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
              <FaTrophy className="text-zinc-600 text-sm" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 ml-3">Achievements</h2>
          </div>
          
          <div className="pl-11 space-y-3 grid md:grid-cols-2 gap-3">
            {achievements?.map((achievement, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="mb-1 flex items-start justify-between">
                  <h3 className="font-medium text-zinc-900">
                    {achievement.title}
                  </h3>
                  {achievement.date && (
                    <span className="text-xs text-zinc-500 whitespace-nowrap">
                      {achievement.date}
                    </span>
                  )}
                </div>
                
                {achievement.organization && (
                  <p className="text-zinc-700 text-sm mb-1">
                    {achievement.organization}
                  </p>
                )}
                
                {achievement.description && (
                  <p className="text-zinc-600 text-sm">
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
        <section className="mb-8 resume-section">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
              <FaCertificate className="text-zinc-600 text-sm" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 ml-3">Certifications</h2>
          </div>
          
          <div className="pl-11 grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates?.map((cert, index) => (
              <div key={index} className="border border-zinc-200 rounded-md p-3 hover:shadow-sm transition-shadow">
                <h3 className="font-medium text-zinc-800 text-sm">{cert.name}</h3>
                <p className="text-zinc-600 text-xs mt-1">{cert.issuer}</p>
                
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-zinc-100">
                  <span className="text-xs text-zinc-500">{cert.date}</span>
                  {cert.url && (
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center"
                    >
                      <FaLink size={10} className="mr-1" />
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

  const availableSections = allSections.filter(section => section.available);

  const handleSectionClick = (sectionId) => {
    if (sectionOrder.includes(sectionId)) return;
    setSectionOrder(prev => [...prev, sectionId]);
  };

  const resetSections = () => {
    setSectionOrder([]);
  };

  return (
    <div className="bg-zinc-50 min-h-full font-sans text-zinc-800 relative">
      {/* Header with personal info */}
      <header className="bg-zinc-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            {personalInfo?.name || "Your Name"}
          </h1>
            
          {personalInfo?.title && (
            <h2 className="text-base md:text-lg text-zinc-300 text-center mt-1">
              {personalInfo.title}
            </h2>
          )}
            
          {/* Accent bar */}
          <div className="w-12 h-0.5 bg-zinc-400 mx-auto my-4"></div>
            
          {/* Contact Details */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-300 mt-3">
            {personalInfo?.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-white inline-flex items-center"
              >
                <FaEnvelope className="mr-2" size={14} />
                {personalInfo.email}
              </a>
            )}
              
            {personalInfo?.phone && (
              <a
                href={`tel:${personalInfo.phone}`}
                className="hover:text-white inline-flex items-center"
              >
                <FaPhone className="mr-2" size={14} />
                {personalInfo.phone}
              </a>
            )}
              
            {personalInfo?.location && (
              <span className="inline-flex items-center">
                <FaMapMarkerAlt className="mr-2" size={14} />
                {personalInfo.location}
              </span>
            )}
              
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center"
              >
                <FaLinkedin className="mr-2" size={14} />
                LinkedIn
              </a>
            )}
              
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center"
              >
                <FaGithub className="mr-2" size={14} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Section Selector - Side panel */}
      <div className="fixed top-24 right-4 z-10 p-3 bg-white rounded-lg shadow-md border border-zinc-200 w-48 print:hidden">
        <h3 className="text-sm font-medium text-zinc-700 mb-2 pb-2 border-b border-zinc-100 flex items-center">
          <FaLayerGroup className="mr-2 text-zinc-500" />
          Resume Sections
        </h3>
        <div className="space-y-1 max-h-[70vh] overflow-y-auto">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center w-full px-3 py-2 rounded-md transition-all text-sm ${
                sectionOrder.includes(section.id)
                  ? 'bg-zinc-100 text-zinc-400 cursor-default'
                  : 'bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900'
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className={`mr-2 ${sectionOrder.includes(section.id) ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {section.icon}
              </span>
              <span>{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="ml-auto w-5 h-5 flex items-center justify-center rounded-full bg-zinc-200 text-zinc-500 text-xs">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button
              onClick={resetSections}
              className="w-full mt-3 px-3 py-2 bg-white hover:bg-zinc-50 text-zinc-600 rounded-md transition-all text-sm border border-zinc-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-8 py-8" ref={contentRef}>
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
          <div className="text-center py-12 border-2 border-dashed border-zinc-200 rounded-lg print:hidden">
            <p className="text-zinc-500">
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
        <div className="hidden print:block text-right text-xs text-zinc-400 pt-4 border-t border-zinc-200 mt-8">
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
          .shadow-sm, .shadow-md {
            box-shadow: none !important;
          }
          
          /* Border colors */
          .border-zinc-100, .border-zinc-200, .border-zinc-300 {
            border-color: #d4d4d8 !important;
          }
          
          /* Background colors */
          .bg-zinc-50 { background-color: #ffffff !important; }
          .bg-zinc-100 { background-color: #f4f4f5 !important; }
          .bg-zinc-800 { background-color: #27272a !important; }
          
          /* Make sure dark background prints well */
          .text-white, .text-zinc-300 { 
            color: #ffffff !important; 
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}