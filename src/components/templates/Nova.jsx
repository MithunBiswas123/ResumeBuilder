"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt,
  FaChevronRight, FaRegLightbulb, FaPlusCircle
} from "react-icons/fa";

export default function Nova({ resumeData }) {
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
        <section className="nova-section">
          <div className="nova-section-header">
            <span className="nova-section-icon"><FaUserAlt /></span>
            <h2>Professional Summary</h2>
          </div>
          <div className="nova-section-content">
            <p>{personalInfo?.summary}</p>
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
        <section className="nova-section">
          <div className="nova-section-header">
            <span className="nova-section-icon"><FaBriefcase /></span>
            <h2>Work Experience</h2>
          </div>
          <div className="nova-section-content">
            {experience?.map((job, index) => (
              <div key={index} className="nova-item page-break-inside-avoid">
                <div className="nova-item-header">
                  <h3>{job.position || job.title}</h3>
                  <span className="nova-date">{job.startDate} — {job.endDate || "Present"}</span>
                </div>
                
                <div className="nova-company">
                  <span className="nova-company-name">{job.company}</span>
                  {job.location && <span className="nova-location">{job.location}</span>}
                </div>
                
                <p className="nova-description">
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
        <section className="nova-section">
          <div className="nova-section-header">
            <span className="nova-section-icon"><FaGraduationCap /></span>
            <h2>Education</h2>
          </div>
          <div className="nova-section-content">
            {education?.map((edu, index) => (
              <div key={index} className="nova-item page-break-inside-avoid">
                <div className="nova-item-header">
                  <h3>{edu.degree}</h3>
                  <span className="nova-date">{edu.startDate} — {edu.endDate || "Present"}</span>
                </div>
                <div className="nova-school">
                  {edu.school}
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
        <section className="nova-section">
          <div className="nova-section-header">
            <span className="nova-section-icon"><FaTools /></span>
            <h2>Skills</h2>
          </div>
          <div className="nova-section-content">
            <div className="nova-skills-grid">
              {skills?.map((skill, index) => (
                <div key={index} className="nova-skill">
                  <FaChevronRight className="nova-skill-icon" />
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
        <section className="nova-section">
          <div className="nova-section-header">
            <span className="nova-section-icon"><FaLaptopCode /></span>
            <h2>Projects</h2>
          </div>
          <div className="nova-section-content">
            {projects?.map((project, index) => (
              <div key={index} className="nova-item page-break-inside-avoid">
                <div className="nova-item-header">
                  <h3>{project.title}</h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nova-link"
                    >
                      <FaLink size={12} />
                      <span>View Project</span>
                    </a>
                  )}
                </div>
                
                <p className="nova-description">
                  {project.description}
                </p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="nova-tech-tags">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="nova-tech-tag">{tech}</span>
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
        <section className="nova-section">
          <div className="nova-section-header">
            <span className="nova-section-icon"><FaTrophy /></span>
            <h2>Achievements</h2>
          </div>
          <div className="nova-section-content">
            {achievements?.map((achievement, index) => (
              <div key={index} className="nova-item page-break-inside-avoid">
                <div className="nova-item-header">
                  <h3>{achievement.title}</h3>
                  {achievement.date && (
                    <span className="nova-date">{achievement.date}</span>
                  )}
                </div>
                
                {achievement.organization && (
                  <div className="nova-organization">
                    {achievement.organization}
                  </div>
                )}
                
                {achievement.description && (
                  <p className="nova-description">
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
        <section className="nova-section">
          <div className="nova-section-header">
            <span className="nova-section-icon"><FaCertificate /></span>
            <h2>Certifications</h2>
          </div>
          <div className="nova-section-content">
            <div className="nova-certificates-grid">
              {certificates?.map((cert, index) => (
                <div key={index} className="nova-certificate">
                  <div className="nova-certificate-header">
                    <h3>{cert.name}</h3>
                    <span className="nova-date">{cert.date}</span>
                  </div>
                  <div className="nova-issuer">{cert.issuer}</div>
                  
                  {cert.url && (
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nova-cert-link"
                    >
                      <FaLink size={10} />
                      <span>View Certificate</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
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
    <div className="nova-container">
      {/* Header with personal info */}
      <header className="nova-header">
        <div className="nova-header-content">
          <h1>{personalInfo?.name || "Your Name"}</h1>
          
          {personalInfo?.title && (
            <h2 className="nova-title">{personalInfo.title}</h2>
          )}
          
          {/* Contact Details */}
          <div className="nova-contact-container">
            {personalInfo?.email && (
              <a href={`mailto:${personalInfo.email}`} className="nova-contact-item">
                <span className="nova-contact-icon"><FaEnvelope /></span>
                <span>{personalInfo.email}</span>
              </a>
            )}
            
            {personalInfo?.phone && (
              <a href={`tel:${personalInfo.phone}`} className="nova-contact-item">
                <span className="nova-contact-icon"><FaPhone /></span>
                <span>{personalInfo.phone}</span>
              </a>
            )}
            
            {personalInfo?.location && (
              <div className="nova-contact-item">
                <span className="nova-contact-icon"><FaMapMarkerAlt /></span>
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="nova-contact-item"
              >
                <span className="nova-contact-icon"><FaLinkedin /></span>
                <span>LinkedIn</span>
              </a>
            )}
            
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="nova-contact-item"
              >
                <span className="nova-contact-icon"><FaGithub /></span>
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Section Selector */}
      <div className="nova-section-selector print:hidden">
        <div className="nova-selector-header">
          <FaRegLightbulb className="mr-2" />
          <span>Build Your Resume</span>
        </div>
        
        <div className="nova-selector-content">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`nova-selector-button ${
                sectionOrder.includes(section.id) ? 'nova-selected' : ''
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className="nova-selector-icon">
                {section.icon}
              </span>
              <span className="nova-selector-label">{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="nova-selector-badge">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button
              onClick={resetSections}
              className="nova-reset-button"
            >
              Reset All Sections
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="nova-main" ref={contentRef}>
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
          <div className="nova-empty-content print:hidden">
            <div className="nova-empty-icon">
              <FaPlusCircle />
            </div>
            <p>
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
        <div className="hidden print:block text-right text-xs text-gray-400 pt-4 border-t border-gray-200 mt-8">
          <span className="print-page-number"></span>
        </div>
      </main>
      
      {/* Nova styles */}
      <style jsx global>{`
        /* Global styles */
        .nova-container {
          --primary-color: #5046e5;
          --primary-light: #6366f1;
          --primary-dark: #4338ca;
          --accent-color: #8b5cf6;
          --text-primary: #1f2937;
          --text-secondary: #4b5563;
          --text-light: #6b7280;
          --bg-card: #ffffff;
          --border-color: #e5e7eb;
          
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          color: var(--text-primary);
          background-color: #f9fafb;
          min-height: 100vh;
          padding: 0;
          position: relative;
        }
        
        /* Header styles */
        .nova-header {
          background-image: linear-gradient(to right, var(--primary-color), var(--accent-color));
          padding: 2.5rem 1.5rem;
          color: white;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .nova-header-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .nova-header h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: -0.025em;
        }
        
        .nova-title {
          font-size: 1.25rem;
          font-weight: 500;
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }
        
        .nova-contact-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem 2rem;
          font-size: 0.875rem;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .nova-contact-item {
          display: flex;
          align-items: center;
          color: white;
          transition: transform 0.2s;
        }
        
        .nova-contact-item:hover {
          transform: translateY(-1px);
        }
        
        .nova-contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.75rem;
          height: 1.75rem;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          margin-right: 0.5rem;
        }
        
        /* Section selector styles */
        .nova-section-selector {
          position: fixed;
          top: 6rem;
          right: 2rem;
          width: 16rem;
          background-color: var(--bg-card);
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          border: 1px solid var(--border-color);
          z-index: 10;
        }
        
        .nova-selector-header {
          display: flex;
          align-items: center;
          background-image: linear-gradient(to right, var(--primary-color), var(--accent-color));
          color: white;
          padding: 1rem;
          font-weight: 600;
        }
        
        .nova-selector-content {
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 60vh;
          overflow-y: auto;
        }
        
        .nova-selector-button {
          display: flex;
          align-items: center;
          padding: 0.625rem 0.875rem;
          border-radius: 8px;
          border: none;
          background-color: #f9fafb;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          width: 100%;
          position: relative;
        }
        
        .nova-selector-button:not(:disabled):hover {
          background-color: #f3f4f6;
          color: var(--primary-color);
        }
        
        .nova-selector-button.nova-selected {
          background-color: #eff6ff;
          color: #93c5fd;
          cursor: not-allowed;
        }
        
        .nova-selector-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.25rem;
          height: 1.25rem;
          margin-right: 0.75rem;
          color: var(--primary-light);
        }
        
        .nova-selected .nova-selector-icon {
          color: #93c5fd;
        }
        
        .nova-selector-badge {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.25rem;
          height: 1.25rem;
          background-color: #dbeafe;
          color: #3b82f6;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .nova-reset-button {
          margin-top: 0.5rem;
          padding: 0.625rem;
          background-color: #fee2e2;
          color: #ef4444;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.15s;
        }
        
        .nova-reset-button:hover {
          background-color: #fecaca;
        }
        
        /* Main content styles */
        .nova-main {
          max-width: 800px;
          margin: 0 auto 3rem;
          padding: 0 1.5rem;
        }
        
        .nova-empty-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-card);
          border: 2px dashed #e5e7eb;
          border-radius: 12px;
          padding: 3rem 1rem;
          color: var(--text-secondary);
          text-align: center;
        }
        
        .nova-empty-icon {
          font-size: 2.5rem;
          color: #d1d5db;
          margin-bottom: 1rem;
        }
        
        /* Section styles */
        .nova-section {
          background-color: var(--bg-card);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        
        .nova-section-header {
          display: flex;
          align-items: center;
          padding: 1rem 1.25rem;
          background-image: linear-gradient(to right, var(--primary-color), var(--accent-color));
          color: white;
        }
        
        .nova-section-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          margin-right: 0.875rem;
        }
        
        .nova-section-header h2 {
          font-size: 1.125rem;
          font-weight: 600;
          letter-spacing: 0.025em;
        }
        
        .nova-section-content {
          padding: 1.25rem;
        }
        
        /* Item styles (for experience, education, etc.) */
        .nova-item {
          position: relative;
          padding-bottom: 1.25rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .nova-item:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: none;
        }
        
        .nova-item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.5rem;
        }
        
        .nova-item-header h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .nova-date {
          font-size: 0.875rem;
          color: var(--text-light);
          white-space: nowrap;
        }
        
        .nova-company, .nova-school, .nova-organization {
          font-size: 0.9375rem;
          margin-bottom: 0.5rem;
          color: var(--primary-color);
          font-weight: 500;
          display: flex;
          align-items: center;
        }
        
        .nova-company-name {
          margin-right: 0.5rem;
        }
        
        .nova-location {
          font-size: 0.875rem;
          color: var(--text-light);
          position: relative;
          padding-left: 0.75rem;
        }
        
        .nova-location:before {
          content: "";
          position: absolute;
          left: 0.25rem;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background-color: var(--text-light);
        }
        
        .nova-description {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        
        /* Skills styles */
        .nova-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 0.75rem;
        }
        
        .nova-skill {
          display: flex;
          align-items: center;
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }
        
        .nova-skill-icon {
          color: var(--primary-light);
          margin-right: 0.5rem;
          flex-shrink: 0;
          font-size: 0.75rem;
        }
        
        /* Projects and links styles */
        .nova-link, .nova-cert-link {
          display: inline-flex;
          align-items: center;
          font-size: 0.75rem;
          color: var(--primary-color);
          background-color: #eff6ff;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          transition: background-color 0.15s;
        }
        
        .nova-link svg, .nova-cert-link svg {
          margin-right: 0.375rem;
        }
        
        .nova-link:hover, .nova-cert-link:hover {
          background-color: #dbeafe;
        }
        
        .nova-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }
        
        .nova-tech-tag {
          font-size: 0.75rem;
          background-color: #f3f4f6;
          color: var(--text-secondary);
          padding: 0.25rem 0.625rem;
          border-radius: 999px;
          white-space: nowrap;
        }
        
        /* Certificates styles */
        .nova-certificates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem;
        }
        
        .nova-certificate {
          background-color: #f9fafb;
          border-radius: 8px;
          padding: 1rem;
          border: 1px solid var(--border-color);
        }
        
        .nova-certificate-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.5rem;
        }
        
        .nova-certificate-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .nova-issuer {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }
        
        .nova-cert-link {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
        }
        
        /* Animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        /* Print styles */
        @media print {
          @page {
            margin: 0.5in;
            size: letter portrait;
          }
          
          .nova-container {
            background-color: white;
            padding: 0;
          }
          
          .nova-header {
            background: #4f46e5 !important;
            border-radius: 0;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            box-shadow: none;
          }
          
          .nova-header-content {
            text-align: center;
          }
          
          .nova-main {
            padding: 0;
          }
          
          .nova-section {
            break-inside: avoid;
            page-break-inside: avoid;
            margin-bottom: 1rem;
            border-radius: 0;
            box-shadow: none;
            border: 1px solid #e5e7eb;
          }
          
          .nova-section-header {
            background: #4f46e5 !important;
          }
          
          .page-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          /* Page numbers */
          .print-page-number:after {
            content: counter(page);
          }
          
          /* Elements that don't need special print styles */
          .nova-certificates-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .nova-skills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .nova-section-selector {
            position: static;
            width: 100%;
            margin: 0 auto 1.5rem;
            max-width: 800px;
          }
          
          .nova-selector-content {
            max-height: none;
          }
          
          .nova-header {
            padding: 2rem 1rem;
          }
          
          .nova-contact-container {
            gap: 0.75rem;
          }
          
          .nova-certificates-grid, .nova-skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}