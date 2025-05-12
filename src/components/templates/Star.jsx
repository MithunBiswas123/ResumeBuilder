"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

export default function Star({ resumeData }) {
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
          <h2 className="section-heading">PROFILE</h2>
          <p>{personalInfo?.summary}</p>
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
          <h2 className="section-heading">EXPERIENCE</h2>
          
          <div className="space-y-3">
            {experience?.map((job, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold">
                    {job.position || job.title}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {job.startDate} — {job.endDate || "Present"}
                  </span>
                </div>
                
                <p className="text-sm font-medium mb-1">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
                
                <p className="text-sm">
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
        <section className="mb-4 resume-section">
          <h2 className="section-heading">EDUCATION</h2>
          
          <div className="space-y-3">
            {education?.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} — {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm">{edu.school}</p>
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
          <h2 className="section-heading">SKILLS</h2>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {skills?.map((skill, index) => (
              <span key={index} className="text-sm">
                • {skill}
              </span>
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
        <section className="mb-4 resume-section">
          <h2 className="section-heading">PROJECTS</h2>
          
          <div className="space-y-3">
            {projects?.map((project, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 text-sm hover:underline"
                    >
                      <FaLink size={10} className="inline mr-1" />
                      Link
                    </a>
                  )}
                </div>
                
                <p className="text-sm mb-1">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                  </p>
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
          <h2 className="section-heading">ACHIEVEMENTS</h2>
          
          <div className="space-y-3">
            {achievements?.map((achievement, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold">
                    {achievement.title}
                  </h3>
                  {achievement.date && (
                    <span className="text-sm text-gray-600">
                      {achievement.date}
                    </span>
                  )}
                </div>
                
                {achievement.organization && (
                  <p className="text-sm font-medium mb-1">
                    {achievement.organization}
                  </p>
                )}
                
                {achievement.description && (
                  <p className="text-sm">
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
        <section className="mb-4 resume-section">
          <h2 className="section-heading">CERTIFICATIONS</h2>
          
          <div className="space-y-2">
            {certificates?.map((cert, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <span className="text-sm text-gray-600">{cert.date}</span>
                </div>
                <p className="text-sm mb-1">{cert.issuer}</p>
                
                {cert.url && (
                  <a
                    href={ensureHttps(cert.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    <FaLink size={10} className="inline mr-1" />
                    View Certificate
                  </a>
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
    <div className="bg-white min-h-full font-sans text-gray-800 relative p-6 md:p-8">
      {/* Header with personal info */}
      <header className="mb-6 text-center border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold mb-1">
          {personalInfo?.name || "Your Name"}
        </h1>
        
        {personalInfo?.title && (
          <h2 className="text-lg text-gray-600 mb-3">
            {personalInfo.title}
          </h2>
        )}
        
        {/* Contact Details */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
          {personalInfo?.email && (
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              <FaEnvelope className="inline mr-1" size={12} />
              {personalInfo.email}
            </a>
          )}
          
          {personalInfo?.phone && (
            <a href={`tel:${personalInfo.phone}`} className="contact-link">
              <FaPhone className="inline mr-1" size={12} />
              {personalInfo.phone}
            </a>
          )}
          
          {personalInfo?.location && (
            <span className="contact-item">
              <FaMapMarkerAlt className="inline mr-1" size={12} />
              {personalInfo.location}
            </span>
          )}
          
          {personalInfo?.linkedin && (
            <a
              href={ensureHttps(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <FaLinkedin className="inline mr-1" size={12} />
              LinkedIn
            </a>
          )}
          
          {personalInfo?.github && (
            <a
              href={ensureHttps(personalInfo.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <FaGithub className="inline mr-1" size={12} />
              GitHub
            </a>
          )}
        </div>
      </header>

      {/* Section Selector - Top panel */}
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-6 print:hidden">
        <h3 className="text-sm font-medium mb-2">Add sections to your resume:</h3>
        <div className="flex flex-wrap gap-2">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`inline-flex items-center px-3 py-1.5 text-sm rounded ${
                sectionOrder.includes(section.id)
                  ? 'bg-gray-200 text-gray-400 cursor-default'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className={`mr-1.5 ${sectionOrder.includes(section.id) ? 'text-gray-400' : 'text-gray-500'}`}>
                {section.icon}
              </span>
              {section.label}
              {sectionOrder.includes(section.id) && (
                <span className="ml-1.5 w-4 h-4 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 text-xs">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button
              onClick={resetSections}
              className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-200 rounded bg-white text-gray-700 hover:bg-gray-100"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto" ref={contentRef}>
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
          <div className="text-center py-8 border border-dashed border-gray-200 rounded print:hidden">
            <p className="text-gray-500">
              Select sections from above to build your resume
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
        <div className="hidden print:block text-right text-xs text-gray-400 pt-4 border-t border-gray-200 mt-8">
          <span className="print-page-number"></span>
        </div>
      </main>
      
      {/* Simple styles */}
      <style jsx global>{`
        .section-heading {
          font-size: 0.9rem;
          font-weight: 600;
          color: #4B5563;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #E5E7EB;
          padding-bottom: 0.25rem;
          margin-bottom: 0.75rem;
        }
        
        .contact-link {
          color: #4B5563;
          transition: color 0.15s;
        }
        
        .contact-link:hover {
          color: #111827;
          text-decoration: underline;
        }
        
        .contact-item {
          color: #4B5563;
        }
        
        /* Print Styles */
        @media print {
          @page {
            margin: 0.5in;
            size: letter portrait;
          }
          
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body {
            padding: 0 !important;
          }
          
          .resume-section {
            margin-bottom: 1rem;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .page-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          /* Page numbers */
          .print-page-number:after {
            content: counter(page);
          }
        }
        
        /* Animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}