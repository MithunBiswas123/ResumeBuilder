"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt, 
  FaCircle, FaInfoCircle
} from "react-icons/fa";

export default function Nexus({ resumeData }) {
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
        <section className="mb-10 resume-section">
          <div className="dot-header">
            <div className="dot-circle"></div>
            <h2>Profile</h2>
          </div>
          <div className="content-box">
            <p className="text-gray-600">{personalInfo?.summary}</p>
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
        <section className="mb-10 resume-section">
          <div className="dot-header">
            <div className="dot-circle"></div>
            <h2>Experience</h2>
          </div>
          
          <div className="experience-timeline">
            {experience?.map((job, index) => (
              <div key={index} className="timeline-item page-break-inside-avoid">
                <div className="timeline-dot-container">
                  <div className="timeline-dot"></div>
                  {index < experience.length - 1 && <div className="timeline-line"></div>}
                </div>
                
                <div className="timeline-content">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-gray-800">
                      {job.position || job.title}
                    </h3>
                    <span className="date-span">
                      {job.startDate} — {job.endDate || "Present"}
                    </span>
                  </div>
                  
                  <p className="text-teal-700 font-medium mb-2">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                  
                  <p className="text-gray-600 text-sm">
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
        <section className="mb-10 resume-section">
          <div className="dot-header">
            <div className="dot-circle"></div>
            <h2>Education</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education?.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="dot-indicator"></div>
                <div className="education-content">
                  <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                  <p className="text-teal-700 font-medium">{edu.school}</p>
                  <span className="text-sm text-gray-500">
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
        <section className="mb-10 resume-section">
          <div className="dot-header">
            <div className="dot-circle"></div>
            <h2>Skills</h2>
          </div>
          
          <div className="content-box">
            <div className="skill-grid">
              {skills?.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-dot"></span>
                  <span>{skill}</span>
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
        <section className="mb-10 resume-section">
          <div className="dot-header">
            <div className="dot-circle"></div>
            <h2>Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects?.map((project, index) => (
              <div key={index} className="project-card page-break-inside-avoid">
                <div className="project-title">
                  <h3 className="font-medium text-gray-800">{project.title}</h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FaLink size={12} />
                    </a>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-2">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
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
        <section className="mb-10 resume-section">
          <div className="dot-header">
            <div className="dot-circle"></div>
            <h2>Achievements</h2>
          </div>
          
          <div className="space-y-4">
            {achievements?.map((achievement, index) => (
              <div key={index} className="achievement-item page-break-inside-avoid">
                <div className="dot-indicator achievement-dot"></div>
                <div className="achievement-content">
                  <div className="flex justify-between">
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
                    <p className="text-teal-700 font-medium text-sm">
                      {achievement.organization}
                    </p>
                  )}
                  
                  {achievement.description && (
                    <p className="text-gray-600 text-sm">
                      {achievement.description}
                    </p>
                  )}
                </div>
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
        <section className="mb-10 resume-section">
          <div className="dot-header">
            <div className="dot-circle"></div>
            <h2>Certifications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates?.map((cert, index) => (
              <div key={index} className="cert-item">
                <div className="cert-header">
                  <h3 className="font-medium text-gray-800">{cert.name}</h3>
                  <span className="text-sm text-gray-500">{cert.date}</span>
                </div>
                <p className="text-teal-700 font-medium text-sm mb-2">{cert.issuer}</p>
                
                {cert.url && (
                  <a
                    href={ensureHttps(cert.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link"
                  >
                    <FaLink size={11} className="mr-1" /> 
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
    <div className="bg-white min-h-full font-sans text-gray-800 relative">
      {/* Left sidebar with name and contacts */}
      <div className="resume-layout">
        <aside className="sidebar">
          <div className="name-container">
            <h1 className="name">
              {personalInfo?.name || "Your Name"}
            </h1>
            
            {personalInfo?.title && (
              <h2 className="job-title">{personalInfo.title}</h2>
            )}
          </div>
          
          <div className="contact-section">
            <div className="contact-heading">
              <div className="dot-circle"></div>
              <h3>Contact</h3>
            </div>
            
            <div className="contact-list">
              {personalInfo?.email && (
                <a href={`mailto:${personalInfo.email}`} className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              
              {personalInfo?.phone && (
                <a href={`tel:${personalInfo.phone}`} className="contact-item">
                  <FaPhone className="contact-icon" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              
              {personalInfo?.location && (
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              
              {personalInfo?.linkedin && (
                <a
                  href={ensureHttps(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                >
                  <FaLinkedin className="contact-icon" />
                  <span>LinkedIn</span>
                </a>
              )}
              
              {personalInfo?.github && (
                <a
                  href={ensureHttps(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                >
                  <FaGithub className="contact-icon" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main className="main-content" ref={contentRef}>
          {/* Section Selector - Right side panel */}
          <div className="section-selector print:hidden">
            <div className="selector-heading">
              <FaInfoCircle className="mr-2 text-teal-500" />
              <span>Add Sections</span>
            </div>
            
            <div className="selector-options">
              {availableSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`selector-button ${
                    sectionOrder.includes(section.id)
                      ? 'selected-button'
                      : ''
                  }`}
                  disabled={sectionOrder.includes(section.id)}
                >
                  <span className={`button-icon ${sectionOrder.includes(section.id) ? 'text-gray-400' : 'text-teal-500'}`}>
                    {section.icon}
                  </span>
                  <span>{section.label}</span>
                  {sectionOrder.includes(section.id) && (
                    <span className="order-indicator">
                      {sectionOrder.indexOf(section.id) + 1}
                    </span>
                  )}
                </button>
              ))}
              
              {sectionOrder.length > 0 && (
                <button onClick={resetSections} className="reset-button">
                  Reset All
                </button>
              )}
            </div>
          </div>

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
            <div className="empty-content print:hidden">
              <p className="text-gray-500">
                Select sections from the panel to build your resume
              </p>
            </div>
          )}
          
          {/* For print - show all sections in default order if nothing is selected */}
          {sectionOrder.length === 0 && (
            <div className="hidden print:block space-y-8">
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
      </div>
      
      {/* Styles specific to this template */}
      <style jsx global>{`
        /* Overall Layout */
        .resume-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          min-height: 100vh;
        }
        
        /* Sidebar */
        .sidebar {
          background-color: #F3F4F6;
          padding: 2rem 1.5rem;
          border-right: 1px solid #E5E7EB;
        }
        
        .name-container {
          margin-bottom: 2rem;
        }
        
        .name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.015em;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }
        
        .job-title {
          font-size: 1rem;
          font-weight: 500;
          color: #4B5563;
        }
        
        .contact-section {
          margin-top: 1.5rem;
        }
        
        .contact-heading {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .contact-heading h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin-left: 8px;
        }
        
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: #4B5563;
          transition: color 0.15s;
        }
        
        .contact-item:hover {
          color: #111827;
        }
        
        .contact-icon {
          width: 14px;
          height: 14px;
          margin-right: 8px;
          flex-shrink: 0;
          color: #0D9488;
        }
        
        /* Main Content */
        .main-content {
          padding: 2rem 2.5rem;
          position: relative;
        }
        
        /* Section Selector */
        .section-selector {
          position: fixed;
          top: 1.5rem;
          right: 1rem;
          width: 15rem;
          background-color: white;
          border: 1px solid #E5E7EB;
          border-radius: 0.5rem;
          padding: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          z-index: 10;
        }
        
        .selector-heading {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #F3F4F6;
        }
        
        .selector-options {
          max-height: 70vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .selector-button {
          display: flex;
          align-items: center;
          width: 100%;
          text-align: left;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: #4B5563;
          border-radius: 0.375rem;
          transition: all 0.15s;
          background-color: transparent;
          border: none;
        }
        
        .selector-button:not(:disabled):hover {
          background-color: #F3F4F6;
          color: #111827;
        }
        
        .selected-button {
          background-color: #F3F4F6;
          color: #9CA3AF;
          cursor: default;
        }
        
        .button-icon {
          margin-right: 0.5rem;
          width: 1rem;
        }
        
        .order-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.25rem;
          height: 1.25rem;
          margin-left: auto;
          border-radius: 9999px;
          background-color: #E5E7EB;
          color: #6B7280;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .reset-button {
          width: 100%;
          margin-top: 0.75rem;
          padding: 0.5rem 0;
          font-size: 0.875rem;
          color: #EF4444;
          border: 1px solid #FEE2E2;
          background-color: white;
          border-radius: 0.375rem;
          transition: all 0.15s;
        }
        
        .reset-button:hover {
          background-color: #FEF2F2;
        }
        
        .empty-content {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 16rem;
          border: 2px dashed #E5E7EB;
          border-radius: 0.5rem;
          background-color: #F9FAFB;
        }
        
        /* Dot Headers */
        .dot-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          position: relative;
        }
        
        .dot-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-left: 1rem;
        }
        
        .dot-header::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 2rem;
          right: 0;
          height: 1px;
          background-color: #E5E7EB;
          z-index: -1;
        }
        
        .dot-circle {
          width: 1rem;
          height: 1rem;
          border-radius: 9999px;
          background-color: #0D9488;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }
        
        .content-box {
          margin-left: 2rem;
        }
        
        /* Experience Timeline */
        .experience-timeline {
          margin-left: 0.25rem;
        }
        
        .timeline-item {
          display: flex;
          margin-bottom: 1.5rem;
        }
        
        .timeline-dot-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 1.5rem;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .timeline-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 9999px;
          background-color: #0D9488;
          margin-top: 0.5rem;
        }
        
        .timeline-line {
          width: 2px;
          flex-grow: 1;
          background-color: #E5E7EB;
          margin-top: 4px;
        }
        
        .timeline-content {
          flex-grow: 1;
          padding-bottom: 0.5rem;
        }
        
        .date-span {
          font-size: 0.875rem;
          color: #6B7280;
          white-space: nowrap;
        }
        
        /* Education */
        .education-item {
          position: relative;
          padding-left: 1rem;
          margin-bottom: 1rem;
        }
        
        .dot-indicator {
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          background-color: #0D9488;
        }
        
        .achievement-dot {
          top: 0.6rem;
        }
        
        .education-content {
          padding-left: 0.75rem;
        }
        
        /* Skills */
        .skill-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1.5rem;
        }
        
        .skill-item {
          display: flex;
          align-items: center;
          width: fit-content;
        }
        
        .skill-dot {
          width: 0.375rem;
          height: 0.375rem;
          border-radius: 9999px;
          background-color: #0D9488;
          margin-right: 0.5rem;
          flex-shrink: 0;
        }
        
        /* Projects */
        .project-card {
          position: relative;
          padding-left: 1rem;
        }
        
        .project-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          background-color: #0D9488;
        }
        
        .project-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .project-link {
          color: #6B7280;
          transition: color 0.15s;
          padding: 0.25rem;
        }
        
        .project-link:hover {
          color: #0D9488;
        }
        
        .tech-tag {
          font-size: 0.75rem;
          padding: 0.125rem 0.375rem;
          background-color: #F3F4F6;
          color: #4B5563;
          border-radius: 0.25rem;
          white-space: nowrap;
        }
        
        /* Achievements */
        .achievement-item {
          position: relative;
          padding-left: 1rem;
          margin-bottom: 1rem;
        }
        
        .achievement-content {
          padding-left: 0.75rem;
        }
        
        /* Certifications */
        .cert-item {
          position: relative;
          padding-left: 1rem;
        }
        
        .cert-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          background-color: #0D9488;
        }
        
        .cert-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.25rem;
        }
        
        .cert-link {
          display: inline-flex;
          align-items: center;
          font-size: 0.75rem;
          color: #0D9488;
          margin-top: 0.25rem;
        }
        
        .cert-link:hover {
          text-decoration: underline;
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
          
          .resume-layout {
            display: grid;
            grid-template-columns: 180px 1fr;
            min-height: auto;
          }
          
          .sidebar {
            padding: 1.5rem 1rem;
          }
          
          .main-content {
            padding: 1.5rem 2rem;
          }
          
          .name {
            font-size: 1.25rem;
          }
          
          .job-title {
            font-size: 0.9rem;
          }
          
          .contact-item {
            font-size: 0.8rem;
          }
          
          .dot-header h2 {
            font-size: 1.1rem;
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
          
          /* Colors for print */
          .dot-circle,
          .timeline-dot,
          .dot-indicator,
          .skill-dot,
          .project-card::before,
          .cert-item::before {
            background-color: #0D9488 !important;
          }
          
          .contact-icon {
            color: #0D9488 !important;
          }
          
          .sidebar {
            background-color: #F3F4F6 !important;
          }
        }
        
        /* Animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .resume-layout {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            border-right: none;
            border-bottom: 1px solid #E5E7EB;
            padding: 1.5rem;
          }
          
          .contact-list {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          .section-selector {
            position: static;
            width: 100%;
            margin-bottom: 2rem;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}