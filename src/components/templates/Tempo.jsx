"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

export default function Tempo({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};

  const [sectionOrder, setSectionOrder] = useState([]);
  const contentRef = useRef(null);
  
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };
  
  // Define all available sections
  const allSections = [
    { 
      id: 'summary', 
      label: 'Summary',
      icon: <FaUserAlt />,
      available: !!personalInfo?.summary,
      content: (
        <div className="mc-card">
          <div className="mc-card-header">
            <div className="mc-card-icon"><FaUserAlt /></div>
            <h2>Professional Summary</h2>
          </div>
          <div className="mc-card-content">
            <p className="mc-summary">{personalInfo?.summary}</p>
          </div>
        </div>
      )
    },
    { 
      id: 'experience', 
      label: 'Experience',
      icon: <FaBriefcase />,
      available: experience?.length > 0,
      content: (
        <div className="mc-card">
          <div className="mc-card-header">
            <div className="mc-card-icon"><FaBriefcase /></div>
            <h2>Work Experience</h2>
          </div>
          <div className="mc-card-content">
            {experience?.map((job, index) => (
              <div key={index} className="mc-exp-item page-break-inside-avoid">
                <div className="mc-exp-header">
                  <h3>{job.position || job.title}</h3>
                  <span className="mc-date">{job.startDate} — {job.endDate || "Present"}</span>
                </div>
                <div className="mc-exp-company">
                  {job.company}
                  {job.location && <span className="mc-exp-location"> • {job.location}</span>}
                </div>
                <p className="mc-description">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    { 
      id: 'education', 
      label: 'Education',
      icon: <FaGraduationCap />,
      available: education?.length > 0,
      content: (
        <div className="mc-card">
          <div className="mc-card-header">
            <div className="mc-card-icon"><FaGraduationCap /></div>
            <h2>Education</h2>
          </div>
          <div className="mc-card-content">
            {education?.map((edu, index) => (
              <div key={index} className="mc-edu-item page-break-inside-avoid">
                <div className="mc-edu-header">
                  <h3>{edu.degree}</h3>
                  <span className="mc-date">{edu.startDate} — {edu.endDate || "Present"}</span>
                </div>
                <div className="mc-edu-school">{edu.school}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    { 
      id: 'skills', 
      label: 'Skills',
      icon: <FaTools />,
      available: skills?.length > 0,
      content: (
        <div className="mc-card">
          <div className="mc-card-header">
            <div className="mc-card-icon"><FaTools /></div>
            <h2>Skills</h2>
          </div>
          <div className="mc-card-content">
            <div className="mc-skills-grid">
              {skills?.map((skill, index) => (
                <div key={index} className="mc-skill-item">
                  <div className="mc-skill-dot"></div>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'projects', 
      label: 'Projects',
      icon: <FaLaptopCode />,
      available: projects?.length > 0,
      content: (
        <div className="mc-card">
          <div className="mc-card-header">
            <div className="mc-card-icon"><FaLaptopCode /></div>
            <h2>Projects</h2>
          </div>
          <div className="mc-card-content">
            <div className="mc-projects-grid">
              {projects?.map((project, index) => (
                <div key={index} className="mc-project-item page-break-inside-avoid">
                  <div className="mc-project-header">
                    <h3>
                      {project.title}
                      {project.link && (
                        <a
                          href={ensureHttps(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mc-project-link"
                        >
                          <FaLink size={14} />
                        </a>
                      )}
                    </h3>
                  </div>
                  <p className="mc-description">{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <div className="mc-tech-tags">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="mc-tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'achievements', 
      label: 'Achievements',
      icon: <FaTrophy />,
      available: achievements?.length > 0,
      content: (
        <div className="mc-card">
          <div className="mc-card-header">
            <div className="mc-card-icon"><FaTrophy /></div>
            <h2>Achievements</h2>
          </div>
          <div className="mc-card-content">
            {achievements?.map((achievement, index) => (
              <div key={index} className="mc-achievement-item page-break-inside-avoid">
                <div className="mc-achievement-header">
                  <h3>{achievement.title}</h3>
                  {achievement.date && <span className="mc-date">{achievement.date}</span>}
                </div>
                {achievement.organization && (
                  <div className="mc-achievement-org">{achievement.organization}</div>
                )}
                {achievement.description && (
                  <p className="mc-description">{achievement.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },
    { 
      id: 'certificates', 
      label: 'Certificates',
      icon: <FaCertificate />,
      available: certificates?.length > 0,
      content: (
        <div className="mc-card">
          <div className="mc-card-header">
            <div className="mc-card-icon"><FaCertificate /></div>
            <h2>Certifications</h2>
          </div>
          <div className="mc-card-content">
            <div className="mc-certificates-grid">
              {certificates?.map((cert, index) => (
                <div key={index} className="mc-cert-item page-break-inside-avoid">
                  <h3>{cert.name}</h3>
                  <div className="mc-cert-meta">
                    <span className="mc-cert-issuer">{cert.issuer}</span>
                    <span className="mc-cert-date">{cert.date}</span>
                  </div>
                  {cert.url && (
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mc-cert-link"
                    >
                      <FaLink size={12} />
                      <span>View Certificate</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
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
    <div className="mc-container">
      {/* Fixed Section Selector in the Top Right */}
      <div className="mc-fixed-selector print:hidden">
        <div className="mc-selector-header">Add sections to your resume:</div>
        <div className="mc-buttons">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              disabled={sectionOrder.includes(section.id)}
              className={`mc-button ${sectionOrder.includes(section.id) ? 'mc-button-selected' : ''}`}
            >
              <span className="mc-button-icon">{section.icon}</span>
              <span className="mc-button-text">{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="mc-button-badge">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button onClick={resetSections} className="mc-reset">
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Resume Layout */}
      <div className="mc-resume">
        {/* Header */}
        <header className="mc-header">
          <div className="mc-header-content">
            <h1 className="mc-name">{personalInfo?.name || "Your Name"}</h1>
            {personalInfo?.title && <h2 className="mc-title">{personalInfo.title}</h2>}
          </div>
          
          {/* Contact Details */}
          <div className="mc-contact-container">
            {personalInfo?.email && (
              <a href={`mailto:${personalInfo.email}`} className="mc-contact-item">
                <FaEnvelope className="mc-contact-icon" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            
            {personalInfo?.phone && (
              <a href={`tel:${personalInfo.phone}`} className="mc-contact-item">
                <FaPhone className="mc-contact-icon" />
                <span>{personalInfo.phone}</span>
              </a>
            )}
            
            {personalInfo?.location && (
              <div className="mc-contact-item">
                <FaMapMarkerAlt className="mc-contact-icon" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-contact-item"
              >
                <FaLinkedin className="mc-contact-icon" />
                <span>LinkedIn</span>
              </a>
            )}
            
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-contact-item"
              >
                <FaGithub className="mc-contact-icon" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="mc-main-content" ref={contentRef}>
          {sectionOrder.length > 0 ? (
            <>
              <div className="mc-cards-grid">
                {sectionOrder.map(sectionId => {
                  const section = allSections.find(s => s.id === sectionId);
                  if (!section || !section.available) return null;
                  return (
                    <div key={sectionId} className="mc-fade-in">
                      {section.content}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="mc-empty print:hidden">
                <div className="mc-empty-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p>Select sections from the panel on the right to build your resume</p>
              </div>
              
              {/* For print - show all sections in default order if nothing is selected */}
              <div className="hidden print:block">
                <div className="mc-cards-grid">
                  {allSections.filter(section => section.available).map(section => (
                    <div key={section.id}>{section.content}</div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {/* Page number for print */}
          <div className="hidden print:block text-right text-xs text-gray-400 pt-4 mt-8">
            <span className="print-page-number"></span>
          </div>
        </main>
      </div>

      {/* Modern Cards CSS */}
      <style jsx global>{`
        /* Base Styles */
        .mc-container {
          --mc-primary: #3b82f6;
          --mc-primary-light: #93c5fd;
          --mc-primary-dark: #1d4ed8;
          --mc-accent: #f97316;
          --mc-text: #1f2937;
          --mc-text-light: #4b5563;
          --mc-text-lighter: #6b7280;
          --mc-bg: #ffffff;
          --mc-bg-light: #f9fafb;
          --mc-border: #e5e7eb;
          --mc-shadow: rgba(0, 0, 0, 0.05);
          
          max-width: 1000px;
          margin: 0 auto;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          color: var(--mc-text);
          line-height: 1.5;
          background: var(--mc-bg);
          padding: 2rem 1rem;
          position: relative;
        }
        
        /* Fixed Section Selector in Top Right */
        .mc-fixed-selector {
          position: fixed;
          top: 1rem;
          right: 1rem;
          width: 260px;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          z-index: 999;
          max-height: calc(100vh - 2rem);
          display: flex;
          flex-direction: column;
          overflow: auto;
        }
        
        .mc-selector-header {
          font-weight: 600;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--mc-border);
          color: var(--mc-text-light);
          font-size: 0.9rem;
        }
        
        .mc-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          overflow-y: auto;
        }
        
        .mc-button {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: white;
          border: 1px solid var(--mc-border);
          border-radius: 8px;
          font-size: 0.875rem;
          color: var(--mc-text-light);
          cursor: pointer;
          transition: all 0.15s ease;
          position: relative;
        }
        
        .mc-button:hover:not(:disabled) {
          border-color: var(--mc-primary-light);
          box-shadow: 0 0 0 1px var(--mc-primary-light);
        }
        
        .mc-button-selected {
          background-color: #ebf5ff;
          color: #3b82f6;
          cursor: default;
        }
        
        .mc-button-icon {
          margin-right: 0.5rem;
          font-size: 0.875rem;
          color: var(--mc-primary);
        }
        
        .mc-button-badge {
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          width: 1.25rem;
          height: 1.25rem;
          background-color: var(--mc-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .mc-reset {
          padding: 0.5rem 0.75rem;
          background: #fee2e2;
          color: #dc2626;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background-color 0.15s;
        }
        
        .mc-reset:hover {
          background: #fecaca;
        }
        
        /* Main Content - Add margin to account for fixed sidebar */
        .mc-main-content {
          position: relative;
        }
        
        /* Header */
        .mc-header {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--mc-border);
        }
        
        .mc-header-content {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .mc-name {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--mc-primary);
          margin: 0 0 0.5rem;
        }
        
        .mc-title {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--mc-text-light);
          margin: 0;
        }
        
        .mc-contact-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1.25rem 2rem;
        }
        
        .mc-contact-item {
          display: flex;
          align-items: center;
          color: var(--mc-text-light);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.15s;
        }
        
        .mc-contact-item:hover {
          color: var(--mc-primary);
        }
        
        .mc-contact-icon {
          color: var(--mc-primary);
          margin-right: 0.5rem;
        }
        
        /* Cards grid */
        .mc-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        @media (min-width: 768px) {
          .mc-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        /* Card styling */
        .mc-card {
          background: var(--mc-bg);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px var(--mc-shadow), 0 1px 3px var(--mc-shadow);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .mc-card-header {
          background: var(--mc-primary);
          color: white;
          padding: 1rem;
          display: flex;
          align-items: center;
        }
        
        .mc-card-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .mc-card-icon {
          background: rgba(255, 255, 255, 0.2);
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.75rem;
        }
        
        .mc-card-content {
          padding: 1.25rem;
          flex: 1;
        }
        
        /* Experience items */
        .mc-exp-item, .mc-edu-item, .mc-achievement-item {
          padding-bottom: 1.25rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--mc-border);
        }
        
        .mc-exp-item:last-child, .mc-edu-item:last-child, .mc-achievement-item:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: none;
        }
        
        .mc-exp-header, .mc-edu-header, .mc-achievement-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          margin-bottom: 0.25rem;
        }
        
        .mc-exp-header h3, .mc-edu-header h3, .mc-achievement-header h3, .mc-project-header h3, .mc-cert-item h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--mc-text);
          margin: 0 0 0.25rem 0;
        }
        
        .mc-date {
          font-size: 0.85rem;
          color: var(--mc-text-lighter);
          white-space: nowrap;
        }
        
        .mc-exp-company, .mc-edu-school, .mc-achievement-org {
          font-size: 0.95rem;
          color: var(--mc-primary);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        .mc-exp-location {
          color: var(--mc-text-lighter);
          font-weight: 400;
        }
        
        .mc-description, .mc-summary {
          font-size: 0.9rem;
          color: var(--mc-text);
          line-height: 1.6;
          margin: 0;
        }
        
        /* Skills */
        .mc-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
          gap: 0.75rem;
        }
        
        .mc-skill-item {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
        }
        
        .mc-skill-dot {
          width: 0.35rem;
          height: 0.35rem;
          background: var(--mc-primary);
          border-radius: 50%;
          margin-right: 0.5rem;
        }
        
        /* Projects */
        .mc-projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        
        .mc-project-item {
          padding: 1rem;
          background: var(--mc-bg-light);
          border-radius: 8px;
          border-left: 3px solid var(--mc-primary);
        }
        
        .mc-project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .mc-project-link {
          display: inline-flex;
          color: var(--mc-primary);
          margin-left: 0.5rem;
          vertical-align: middle;
          transition: transform 0.15s;
        }
        
        .mc-project-link:hover {
          transform: scale(1.1);
        }
        
        .mc-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }
        
        .mc-tech-tag {
          background: rgba(59, 130, 246, 0.1);
          color: var(--mc-primary);
          font-size: 0.75rem;
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
        }
        
        /* Certificates */
        .mc-certificates-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .mc-cert-item {
          padding: 1rem;
          border-radius: 8px;
          background: var(--mc-bg-light);
        }
        
        .mc-cert-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        
        .mc-cert-issuer {
          font-size: 0.9rem;
          color: var(--mc-text-light);
        }
        
        .mc-cert-date {
          font-size: 0.85rem;
          color: var(--mc-text-lighter);
        }
        
        .mc-cert-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          color: var(--mc-primary);
          text-decoration: none;
        }
        
        .mc-cert-link:hover {
          text-decoration: underline;
        }
        
        /* Empty state */
        .mc-empty {
          padding: 3rem 2rem;
          text-align: center;
          border: 2px dashed var(--mc-border);
          border-radius: 12px;
          color: var(--mc-text-lighter);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .mc-empty-icon {
          color: var(--mc-text-lighter);
          margin-bottom: 1rem;
          width: 2.5rem;
          height: 2.5rem;
        }
        
        /* Animation */
        .mc-fade-in {
          animation: mcFadeIn 0.3s ease-out forwards;
        }
        
        @keyframes mcFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Print Styles */
        @media print {
          @page {
            margin: 0.5in;
            size: letter portrait;
          }
          
          .mc-container {
            padding: 0;
            max-width: none;
          }
          
          .mc-fixed-selector {
            display: none !important;
          }
          
          .mc-header {
            margin-bottom: 1rem;
            padding-bottom: 1rem;
          }
          
          .mc-cards-grid {
            gap: 0.75rem;
          }
          
          .mc-card {
            break-inside: avoid;
            page-break-inside: avoid;
            box-shadow: none;
            border: 1px solid var(--mc-border);
          }
          
          .mc-card-header {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background-color: #3b82f6 !important;
            color: white !important;
          }
          
          .mc-name {
            color: #3b82f6 !important;
          }
          
          .mc-contact-icon, .mc-exp-company, .mc-edu-school {
            color: #3b82f6 !important;
          }
          
          .mc-tech-tag {
            color: #3b82f6 !important;
          }
          
          .mc-skill-dot {
            background-color: #3b82f6 !important;
          }
          
          .mc-project-item {
            border-left-color: #3b82f6 !important;
          }
          
          /* Page numbers */
          .print-page-number:after {
            content: counter(page);
          }
          
          .page-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .mc-fixed-selector {
            width: 220px;
          }
        }
        
        @media (max-width: 640px) {
          .mc-fixed-selector {
            top: 0.5rem;
            right: 0.5rem;
            width: 200px;
            padding: 0.75rem;
            max-height: 60vh;
          }
          
          .mc-selector-header {
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
            padding-bottom: 0.4rem;
          }
          
          .mc-button {
            padding: 0.4rem 0.6rem;
            font-size: 0.8rem;
          }
          
          .mc-contact-container {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }
          
          .mc-cards-grid {
            grid-template-columns: 1fr;
          }
          
          .mc-exp-header, .mc-edu-header, .mc-achievement-header {
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .mc-skills-grid {
            grid-template-columns: 1fr;
          }
          
          .mc-card-header {
            padding: 0.75rem;
          }
          
          .mc-card-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}