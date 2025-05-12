"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

export default function Sample({ resumeData }) {
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
        <div className="gr-card gr-card-summary">
          <div className="gr-card-header">
            <div className="gr-card-icon"><FaUserAlt /></div>
            <h2>Professional Summary</h2>
          </div>
          <div className="gr-card-content">
            <p className="gr-summary">{personalInfo?.summary}</p>
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
        <div className="gr-card gr-card-experience">
          <div className="gr-card-header">
            <div className="gr-card-icon"><FaBriefcase /></div>
            <h2>Work Experience</h2>
          </div>
          <div className="gr-card-content">
            {experience?.map((job, index) => (
              <div key={index} className="gr-exp-item page-break-inside-avoid">
                <div className="gr-exp-header">
                  <h3>{job.position || job.title}</h3>
                  <span className="gr-date">{job.startDate} — {job.endDate || "Present"}</span>
                </div>
                <div className="gr-exp-company">
                  {job.company}
                  {job.location && <span className="gr-exp-location"> • {job.location}</span>}
                </div>
                <p className="gr-description">{job.description}</p>
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
        <div className="gr-card gr-card-education">
          <div className="gr-card-header">
            <div className="gr-card-icon"><FaGraduationCap /></div>
            <h2>Education</h2>
          </div>
          <div className="gr-card-content">
            {education?.map((edu, index) => (
              <div key={index} className="gr-edu-item page-break-inside-avoid">
                <div className="gr-edu-header">
                  <h3>{edu.degree}</h3>
                  <span className="gr-date">{edu.startDate} — {edu.endDate || "Present"}</span>
                </div>
                <div className="gr-edu-school">{edu.school}</div>
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
        <div className="gr-card gr-card-skills">
          <div className="gr-card-header">
            <div className="gr-card-icon"><FaTools /></div>
            <h2>Skills</h2>
          </div>
          <div className="gr-card-content">
            <div className="gr-skills-grid">
              {skills?.map((skill, index) => (
                <div key={index} className="gr-skill-item">
                  <div className="gr-skill-dot"></div>
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
        <div className="gr-card gr-card-projects">
          <div className="gr-card-header">
            <div className="gr-card-icon"><FaLaptopCode /></div>
            <h2>Projects</h2>
          </div>
          <div className="gr-card-content">
            <div className="gr-projects-grid">
              {projects?.map((project, index) => (
                <div key={index} className="gr-project-item page-break-inside-avoid">
                  <div className="gr-project-header">
                    <h3>
                      {project.title}
                      {project.link && (
                        <a
                          href={ensureHttps(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gr-project-link"
                        >
                          <FaLink size={14} />
                        </a>
                      )}
                    </h3>
                  </div>
                  <p className="gr-description">{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <div className="gr-tech-tags">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="gr-tech-tag">{tech}</span>
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
        <div className="gr-card gr-card-achievements">
          <div className="gr-card-header">
            <div className="gr-card-icon"><FaTrophy /></div>
            <h2>Achievements</h2>
          </div>
          <div className="gr-card-content">
            {achievements?.map((achievement, index) => (
              <div key={index} className="gr-achievement-item page-break-inside-avoid">
                <div className="gr-achievement-header">
                  <h3>{achievement.title}</h3>
                  {achievement.date && <span className="gr-date">{achievement.date}</span>}
                </div>
                {achievement.organization && (
                  <div className="gr-achievement-org">{achievement.organization}</div>
                )}
                {achievement.description && (
                  <p className="gr-description">{achievement.description}</p>
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
        <div className="gr-card gr-card-certificates">
          <div className="gr-card-header">
            <div className="gr-card-icon"><FaCertificate /></div>
            <h2>Certifications</h2>
          </div>
          <div className="gr-card-content">
            <div className="gr-certificates-grid">
              {certificates?.map((cert, index) => (
                <div key={index} className="gr-cert-item page-break-inside-avoid">
                  <h3>{cert.name}</h3>
                  <div className="gr-cert-meta">
                    <span className="gr-cert-issuer">{cert.issuer}</span>
                    <span className="gr-cert-date">{cert.date}</span>
                  </div>
                  {cert.url && (
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gr-cert-link"
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
    <div className="gr-container">
      {/* Always visible section selector in right corner */}
      <div className="gr-fixed-selector print:hidden">
        <div className="gr-selector-header">
          <span>Add sections to resume</span>
          {sectionOrder.length > 0 && (
            <button onClick={resetSections} className="gr-reset-button">
              Reset
            </button>
          )}
        </div>
        <div className="gr-buttons">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              disabled={sectionOrder.includes(section.id)}
              className={`gr-button ${sectionOrder.includes(section.id) ? 'gr-button-selected' : ''}`}
            >
              <span className="gr-button-icon">{section.icon}</span>
              <span className="gr-button-text">{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="gr-button-badge">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Resume Layout */}
      <div className="gr-resume">
        {/* Header */}
        <header className="gr-header">
          <div className="gr-header-content">
            <h1 className="gr-name">{personalInfo?.name || "Your Name"}</h1>
            {personalInfo?.title && <h2 className="gr-title">{personalInfo.title}</h2>}
          </div>
          
          {/* Contact Details */}
          <div className="gr-contact-container">
            {personalInfo?.email && (
              <a href={`mailto:${personalInfo.email}`} className="gr-contact-item">
                <FaEnvelope className="gr-contact-icon" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            
            {personalInfo?.phone && (
              <a href={`tel:${personalInfo.phone}`} className="gr-contact-item">
                <FaPhone className="gr-contact-icon" />
                <span>{personalInfo.phone}</span>
              </a>
            )}
            
            {personalInfo?.location && (
              <div className="gr-contact-item">
                <FaMapMarkerAlt className="gr-contact-icon" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="gr-contact-item"
              >
                <FaLinkedin className="gr-contact-icon" />
                <span>LinkedIn</span>
              </a>
            )}
            
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="gr-contact-item"
              >
                <FaGithub className="gr-contact-icon" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="gr-main-content" ref={contentRef}>
          {sectionOrder.length > 0 ? (
            <>
              <div className="gr-cards-grid">
                {sectionOrder.map(sectionId => {
                  const section = allSections.find(s => s.id === sectionId);
                  if (!section || !section.available) return null;
                  return (
                    <div key={sectionId} className="gr-fade-in">
                      {section.content}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="gr-empty print:hidden">
                <div className="gr-empty-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p>Select sections from the panel on the right to build your resume</p>
              </div>
              
              {/* For print - show all sections in default order if nothing is selected */}
              <div className="hidden print:block">
                <div className="gr-cards-grid">
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

      {/* Gradient CSS */}
      <style jsx global>{`
        /* Base Styles */
        .gr-container {
          --gr-primary: #6366f1;
          --gr-primary-light: #a5b4fc;
          --gr-primary-dark: #4f46e5;
          --gr-accent: #ec4899;
          --gr-accent-light: #f9a8d4;
          --gr-text: #18181b;
          --gr-text-light: #52525b;
          --gr-text-lighter: #71717a;
          --gr-bg: #ffffff;
          --gr-bg-light: #fafafa;
          --gr-border: #e4e4e7;
          --gr-shadow: rgba(0, 0, 0, 0.05);
          
          max-width: 1000px;
          margin: 0 auto;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          color: var(--gr-text);
          line-height: 1.5;
          background: var(--gr-bg);
          padding: 2rem 1rem;
          position: relative;
        }
        
        /* Fixed Section Selector in Right Corner */
       .gr-fixed-selector {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 260px;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 999;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  overflow: auto;
}
        
        .gr-selector-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--gr-border);
          font-weight: 600;
          color: var(--gr-text-light);
          font-size: 0.9rem;
        }
        
        .gr-reset-button {
          background: none;
          border: none;
          color: #ef4444;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          transition: background 0.2s;
        }
        
        .gr-reset-button:hover {
          background: #fef2f2;
        }
        
        .gr-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          overflow-y: auto;
        }
        
        .gr-button {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: var(--gr-bg);
          border: 1px solid var(--gr-border);
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--gr-text-light);
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        
        .gr-button:hover:not(:disabled) {
          border-color: var(--gr-primary-light);
          background: var(--gr-bg-light);
        }
        
        .gr-button-selected {
          background: linear-gradient(135deg, var(--gr-primary), var(--gr-primary-dark));
          color: white;
          border: none;
          cursor: default;
        }
        
        .gr-button-icon {
          margin-right: 0.5rem;
          font-size: 0.875rem;
          color: var(--gr-primary);
        }
        
        .gr-button-selected .gr-button-icon {
          color: white;
        }
        
        .gr-button-badge {
          position: absolute;
          top: -0.375rem;
          right: -0.375rem;
          width: 1.25rem;
          height: 1.25rem;
          background: linear-gradient(135deg, var(--gr-accent), var(--gr-accent-light));
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(236, 72, 153, 0.3);
        }
        
        /* Header */
        .gr-header {
          position: relative;
          margin-bottom: 2.5rem;
          padding: 2rem 1.5rem;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--gr-primary-dark), var(--gr-primary));
          color: white;
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3), 0 4px 6px -4px rgba(99, 102, 241, 0.2);
        }
        
        .gr-header-content {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .gr-name {
          font-size: 2.25rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .gr-title {
          font-size: 1.25rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }
        
        .gr-contact-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1.5rem 2.5rem;
          padding-top: 0.5rem;
        }
        
        .gr-contact-item {
          display: flex;
          align-items: center;
          color: white;
          text-decoration: none;
          font-size: 0.95rem;
          transition: transform 0.15s;
        }
        
        .gr-contact-item:hover {
          transform: translateY(-2px);
        }
        
        .gr-contact-icon {
          margin-right: 0.75rem;
          opacity: 0.9;
        }
        
        /* Main Content */
        .gr-main-content {
          position: relative;
          margin-right: 280px; /* Make room for the fixed selector */
        }
        
        .gr-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
        }
          
/* Responsive adjustments - MODIFY THIS SECTION */
@media (max-width: 900px) {
  .gr-main-content {
    margin-right: 0;
  }
  
  .gr-fixed-selector {
    /* Keep it in the top right corner */
    top: 1rem;
    right: 1rem;
    bottom: auto;
    left: auto;
    width: 250px;
    border-radius: 12px;
    max-height: 50vh;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .gr-buttons {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 0.5rem;
  }
  
  .gr-button {
    width: 100%;
  }
}

        
        
        @media (min-width: 768px) {
          .gr-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        /* Card styling */
        .gr-card {
          background: var(--gr-bg);
          border-radius: 16px;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 15px -3px var(--gr-shadow), 0 4px 6px -4px var(--gr-shadow);
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
          z-index: 1;
          border: 1px solid var(--gr-border);
        }
        
        .gr-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px var(--gr-shadow), 0 8px 10px -6px var(--gr-shadow);
        }
        
        .gr-card-header {
          background: linear-gradient(135deg, var(--gr-primary), var(--gr-primary-dark));
          color: white;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          position: relative;
        }
        
        .gr-card-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gr-accent), var(--gr-primary-light));
        }
        
        /* Unique gradient for each card type */
        .gr-card-summary .gr-card-header {
          background: linear-gradient(135deg, #4f46e5, #6366f1);
        }
        
        .gr-card-experience .gr-card-header {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
        }
        
        .gr-card-education .gr-card-header {
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
        }
        
        .gr-card-skills .gr-card-header {
          background: linear-gradient(135deg, #0891b2, #06b6d4);
        }
        
        .gr-card-projects .gr-card-header {
          background: linear-gradient(135deg, #0d9488, #14b8a6);
        }
        
        .gr-card-achievements .gr-card-header {
          background: linear-gradient(135deg, #c026d3, #d946ef);
        }
        
        .gr-card-certificates .gr-card-header {
          background: linear-gradient(135deg, #db2777, #ec4899);
        }
        
        .gr-card-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .gr-card-icon {
          background: rgba(255, 255, 255, 0.2);
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.75rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .gr-card-content {
          padding: 1.5rem;
          flex: 1;
          background: white;
        }
        
        /* Experience items */
        .gr-exp-item, .gr-edu-item, .gr-achievement-item {
          position: relative;
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px dashed var(--gr-border);
        }
        
        .gr-exp-item:last-child, .gr-edu-item:last-child, .gr-achievement-item:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: none;
        }
        
        .gr-exp-header, .gr-edu-header, .gr-achievement-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          margin-bottom: 0.5rem;
        }
        
        .gr-exp-header h3, .gr-edu-header h3, .gr-achievement-header h3, .gr-project-header h3, .gr-cert-item h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--gr-text);
          margin: 0 0 0.25rem 0;
          background: linear-gradient(90deg, var(--gr-primary-dark), var(--gr-primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          /* Fallback for browsers that don't support background-clip */
          color: var(--gr-primary);
        }
        
        .gr-date {
          font-size: 0.85rem;
          color: var(--gr-text-lighter);
          white-space: nowrap;
          font-weight: 500;
        }
        
        .gr-exp-company, .gr-edu-school, .gr-achievement-org {
          font-size: 0.95rem;
          color: var(--gr-primary);
          margin-bottom: 0.75rem;
          font-weight: 500;
        }
        
        .gr-exp-location {
          color: var(--gr-text-lighter);
          font-weight: 400;
        }
        
        .gr-description, .gr-summary {
          font-size: 0.95rem;
          color: var(--gr-text);
          line-height: 1.6;
          margin: 0;
        }
        
        /* Skills */
        .gr-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
          gap: 0.75rem 1rem;
        }
        
        .gr-skill-item {
          display: flex;
          align-items: center;
          font-size: 0.95rem;
          position: relative;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          background: rgba(99, 102, 241, 0.06);
          transition: transform 0.15s, background 0.15s;
        }
        
        .gr-skill-item:hover {
          background: rgba(99, 102, 241, 0.1);
          transform: translateX(3px);
        }
        
        .gr-skill-dot {
          width: 0.35rem;
          height: 0.35rem;
          background: linear-gradient(135deg, var(--gr-primary), var(--gr-primary-dark));
          border-radius: 50%;
          margin-right: 0.75rem;
        }
        
        /* Projects */
        .gr-projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        
        .gr-project-item {
          padding: 1.25rem;
          background: rgba(99, 102, 241, 0.03);
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s;
        }
        
        .gr-project-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, var(--gr-primary), var(--gr-accent));
        }
        
        .gr-project-item:hover {
          transform: translateX(3px);
        }
        
        .gr-project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .gr-project-link {
          display: inline-flex;
          color: var(--gr-primary);
          margin-left: 0.5rem;
          vertical-align: middle;
          transition: transform 0.15s;
        }
        
        .gr-project-link:hover {
          transform: scale(1.2);
        }
        
        .gr-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }
        
        .gr-tech-tag {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.2));
          color: var(--gr-primary);
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          display: inline-block;
          transition: transform 0.15s;
        }
        
        .gr-tech-tag:hover {
          transform: translateY(-2px);
        }
        
        /* Certificates */
        .gr-certificates-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        
        .gr-cert-item {
          padding: 1.25rem;
          border-radius: 10px;
          background: rgba(236, 72, 153, 0.03);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
          position: relative;
          transition: transform 0.2s;
        }
        
        .gr-cert-item:hover {
          transform: translateY(-3px);
        }
        
        .gr-cert-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 40%;
          height: 3px;
          background: linear-gradient(to right, transparent, var(--gr-accent-light));
          border-radius: 0 0 10px 0;
        }
        
        .gr-cert-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        
        .gr-cert-issuer {
          font-size: 0.9rem;
          color: var(--gr-text-light);
        }
        
        .gr-cert-date {
          font-size: 0.85rem;
          color: var(--gr-text-lighter);
        }
        
        .gr-cert-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          color: var(--gr-accent);
          text-decoration: none;
          transition: all 0.15s;
          margin-top: 0.5rem;
        }
        
        .gr-cert-link:hover {
          gap: 0.5rem;
          color: var(--gr-primary);
        }
        
        /* Empty state */
        .gr-empty {
          padding: 3.5rem 2rem;
          text-align: center;
          border: 2px dashed var(--gr-border);
          border-radius: 16px;
          color: var(--gr-text-lighter);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.02), rgba(236, 72, 153, 0.02));
        }
        
        .gr-empty-icon {
          color: var(--gr-primary-light);
          margin-bottom: 1rem;
          width: 3rem;
          height: 3rem;
          opacity: 0.7;
        }
        
        /* Animation */
        .gr-fade-in {
          animation: grFadeIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        
        @keyframes grFadeIn {
          from { 
            opacity: 0; 
            transform: translateY(12px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        /* Print Styles */
        @media print {
          @page {
            margin: 0.5in;
            size: letter portrait;
          }
          
          .gr-container {
            padding: 0;
            max-width: none;
          }
          
          .gr-fixed-selector {
            display: none !important;
          }
          
          .gr-main-content {
            margin-right: 0;
          }
          
          .gr-header {
            margin-bottom: 1.5rem;
            padding: 1.5rem;
            box-shadow: none;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .gr-cards-grid {
            gap: 1.25rem;
          }
          
          .gr-card {
            box-shadow: none;
            border: 1px solid var(--gr-border);
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .gr-card-header {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .gr-card:hover {
            transform: none;
            box-shadow: none;
          }
          
          .gr-skill-item:hover {
            transform: none;
          }
          
          .gr-project-item:hover {
            transform: none;
          }
          
          .gr-cert-item:hover {
            transform: none;
          }
          
          /* Fix gradient text for printing */
          .gr-exp-header h3, .gr-edu-header h3, .gr-achievement-header h3, .gr-project-header h3, .gr-cert-item h3 {
            -webkit-text-fill-color: var(--gr-primary);
            color: var(--gr-primary) !important;
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
        @media (max-width: 900px) {
          .gr-main-content {
            margin-right: 0;
          }
          
          .gr-fixed-selector {
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            border-radius: 12px 12px 0 0;
            max-height: 40vh;
            box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .gr-buttons {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          
          .gr-button {
            width: auto;
          }
        }
        
        @media (max-width: 640px) {
          .gr-contact-container {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          
          .gr-cards-grid {
            grid-template-columns: 1fr;
          }
          
          .gr-exp-header, .gr-edu-header, .gr-achievement-header {
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .gr-skills-grid {
            grid-template-columns: 1fr;
          }
          
          .gr-card-header {
            padding: 0.75rem 1rem;
          }
          
          .gr-card-content {
            padding: 1.25rem;
          }
          
          .gr-header {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}