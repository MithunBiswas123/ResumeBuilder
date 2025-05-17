"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

export default function Clean({ resumeData }) {
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
          <h2 className="text-base uppercase font-bold text-gray-800 mb-3">Profile</h2>
          <p className="text-gray-600">{personalInfo?.summary}</p>
        </section>
      )
    },
    { 
      id: 'experience', 
      label: 'Experience',
      icon: <FaBriefcase />,
      available: experience?.length > 0,
      content: (
        <section className="mb-6 resume-section">
          <h2 className="text-base uppercase font-bold text-gray-800 mb-3">Experience</h2>
          
          <div className="space-y-4">
            {experience?.map((job, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-1">
                  <h3 className="font-medium text-gray-800">
                    {job.position || job.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {job.startDate} — {job.endDate || "Present"}
                  </span>
                </div>
                
                <p className="text-sm text-gray-700">
                  {job.company}
                  {job.location ? `, ${job.location}` : ""}
                </p>
                
                <p className="text-sm text-gray-600 mt-2">
                  {job.description}
                </p>
                {index < experience.length - 1 && <hr className="mt-4 border-gray-200" />}
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
          <h2 className="text-base uppercase font-bold text-gray-800 mb-3">Education</h2>
          
          <div className="space-y-4">
            {education?.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-1">
                  <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">
                    {edu.startDate} — {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{edu.school}</p>
                {index < education.length - 1 && <hr className="mt-4 border-gray-200" />}
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
          <h2 className="text-base uppercase font-bold text-gray-800 mb-3">Skills</h2>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {skills?.map((skill, index) => (
              <div key={index} className="text-gray-600">
                • {skill}
                {index < skills.length - 1 && index % 3 === 2 && <br />}
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
          <h2 className="text-base uppercase font-bold text-gray-800 mb-3">Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-3">
            {projects?.map((project, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-800">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 text-sm hover:text-gray-700"
                      aria-label="View Project"
                    >
                      [link]
                    </a>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                  </div>
                )}
                {index < projects.length - 1 && <hr className="mt-4 border-gray-200" />}
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
          <h2 className="text-base uppercase font-bold text-gray-800 mb-3">Achievements</h2>
          
          <div className="grid md:grid-cols-2 gap-3">
            {achievements?.map((achievement, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-1">
                  <h3 className="font-medium text-gray-800">
                    {achievement.title}
                  </h3>
                  {achievement.date && (
                    <span className="text-sm text-gray-500">
                      {achievement.date}
                    </span>
                  )}
                </div>
                
                {achievement.organization && (
                  <p className="text-sm text-gray-700">
                    {achievement.organization}
                  </p>
                )}
                
                {achievement.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {achievement.description}
                  </p>
                )}
                {index < achievements.length - 1 && <hr className="mt-4 border-gray-200" />}
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
          <h2 className="text-base uppercase font-bold text-gray-800 mb-3">Certifications</h2>
          
          <div className="grid md:grid-cols-2 gap-3">
            {certificates?.map((cert, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-1">
                  <h3 className="font-medium text-gray-800">{cert.name}</h3>
                  <span className="text-sm text-gray-500">{cert.date}</span>
                </div>
                
                <p className="text-sm text-gray-700">{cert.issuer}</p>
                
                {cert.url && (
                  <a
                    href={ensureHttps(cert.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    View Certificate
                  </a>
                )}
                {index < certificates.length - 1 && <hr className="mt-4 border-gray-200" />}
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
    <div className="bg-white min-h-full font-sans text-gray-800 relative">
      {/* Header with personal info */}
      <header className="pt-8 pb-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              {personalInfo?.name || "Your Name"}
            </h1>
            
            {personalInfo?.title && (
              <h2 className="text-lg text-gray-600 mb-3">
                {personalInfo.title}
              </h2>
            )}
            
            {/* Contact Details */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-gray-800"
                >
                  <span className="inline-flex items-center">
                    <FaEnvelope className="mr-1" size={12} />
                    {personalInfo.email}
                  </span>
                </a>
              )}
              
              {personalInfo?.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="hover:text-gray-800"
                >
                  <span className="inline-flex items-center">
                    <FaPhone className="mr-1" size={12} />
                    {personalInfo.phone}
                  </span>
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
                  className="hover:text-gray-800"
                >
                  <span className="inline-flex items-center">
                    <FaLinkedin className="mr-1" size={12} />
                    LinkedIn
                  </span>
                </a>
              )}
              
              {personalInfo?.github && (
                <a
                  href={ensureHttps(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-800"
                >
                  <span className="inline-flex items-center">
                    <FaGithub className="mr-1" size={12} />
                    GitHub
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <hr className="border-gray-200 max-w-4xl mx-auto" />

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

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-6" ref={contentRef}>
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
          <div className="text-center py-10 border border-dashed border-gray-200 rounded print:hidden">
            <p className="text-gray-500">
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
          .shadow-sm, .shadow {
            box-shadow: none !important;
          }
          
          /* Border colors */
          .border-gray-100, .border-gray-200 {
            border-color: #e5e7eb !important;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}