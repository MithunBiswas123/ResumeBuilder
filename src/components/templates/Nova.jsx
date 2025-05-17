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
            <h2>Skills</h2>
          </div>
          <div className="nova-section-content">
            <div className="nova-skills-grid">
              {skills?.map((skill, index) => (
                <div key={index} className="nova-skill">
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
                      <span>View</span>
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
                      View
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
                <span>{personalInfo.email}</span>
              </a>
            )}
            
            {personalInfo?.phone && (
              <a href={`tel:${personalInfo.phone}`} className="nova-contact-item">
                <span>{personalInfo.phone}</span>
              </a>
            )}
            
            {personalInfo?.location && (
              <div className="nova-contact-item">
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
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Section Selector */}
      <div className="nova-section-selector print:hidden">
        <div className="nova-selector-header">
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
              <div key={sectionId}>
                {section.content}
              </div>
            );
          })
        ) : (
          <div className="nova-empty-content print:hidden">
            <p>Select sections from the panel to build your resume</p>
          </div>
        )}
        
        {/* For print - show all sections in default order if nothing is selected */}
        {sectionOrder.length === 0 && (
          <div className="hidden print:block">
            {availableSections.map(section => (
              <div key={section.id}>{section.content}</div>
            ))}
          </div>
        )}

        {/* Page numbers for print only */}
        <div className="hidden print:block text-right text-xs text-gray-400 pt-2 border-t border-gray-200 mt-4">
          <span className="print-page-number"></span>
        </div>
      </main>
      
      {/* Nova styles */}
      <style jsx global>{`
        /* Global styles */
        .nova-container {
          --text-primary: #333333;
          --text-secondary: #555555;
          --text-light: #777777;
          --bg-card: #ffffff;
          --border-color: #dddddd;
          
          font-family: Arial, Helvetica, sans-serif;
          color: var(--text-primary);
          background-color: #ffffff;
          padding: 0;
          position: relative;
          line-height: 1.5;
        }
        
        /* Header styles */
        .nova-header {
          padding: 1rem 0.5rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .nova-header-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .nova-header h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: #000;
        }

        .nova-title {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.75rem;
          color: var(--text-secondary);
        }

        .nova-contact-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem 1.5rem;
          font-size: 0.875rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .nova-contact-item {
          color: var(--text-secondary);
          text-decoration: none;
        }

        .nova-contact-item:hover {
          text-decoration: underline;
        }
        
        /* Section selector styles */
        .nova-section-selector {
          position: fixed;
          top: 4.5rem;
          right: 1rem;
          width: 15rem;
          background-color: var(--bg-card);
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          border: 1px solid var(--border-color);
          z-index: 10;
        }
        
        .nova-selector-header {
          display: flex;
          align-items: center;
          background-color: #f5f5f5;
          color: #333;
          padding: 0.75rem;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .nova-selector-content {
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          max-height: 50vh;
          overflow-y: auto;
        }
        
        .nova-selector-button {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #eee;
          background-color: #ffffff;
          color: var(--text-secondary);
          cursor: pointer;
          text-align: left;
          width: 100%;
          position: relative;
          font-size: 0.875rem;
        }
        
        .nova-selector-button:not(:disabled):hover {
          background-color: #f5f5f5;
        }
        
        .nova-selector-button.nova-selected {
          background-color: #f0f0f0;
          color: #999;
          cursor: not-allowed;
        }
        
        .nova-selector-badge {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.1rem;
          height: 1.1rem;
          background-color: #eee;
          color: #777;
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: 600;
        }
        
        .nova-reset-button {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background-color: #f5f5f5;
          color: #666;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          font-size: 0.875rem;
        }
        
        .nova-reset-button:hover {
          background-color: #eee;
        }
        
        /* Main content styles */
        .nova-main {
          max-width: 800px;
          margin: 0 auto 1rem;
          padding: 0 1rem;
        }
        
        .nova-empty-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-card);
          border: 1px solid #eee;
          border-radius: 4px;
          padding: 2rem 1rem;
          color: var(--text-secondary);
          text-align: center;
        }
        
        /* Section styles */
        .nova-section {
          background-color: var(--bg-card);
          margin-bottom: 1.5rem;
        }
        
        .nova-section-header {
          padding: 0 0 0.25rem 0;
          margin-bottom: 0.5rem;
          border-bottom: 1px solid #000;
        }
        
        .nova-section-header h2 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
          text-transform: uppercase;
          color: #000;
        }
        
        .nova-section-content {
          padding: 0;
        }
        
        /* Item styles (for experience, education, etc.) */
        .nova-item {
          position: relative;
          padding-bottom: 1rem;
          margin-bottom: 1rem;
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
          margin-bottom: 0.35rem;
        }
        
        .nova-item-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }
        
        .nova-date {
          font-size: 0.8rem;
          color: var(--text-light);
          white-space: nowrap;
        }
        
        .nova-company, .nova-school, .nova-organization {
          font-size: 0.9rem;
          margin-bottom: 0.4rem;
          font-weight: 500;
          display: flex;
          align-items: center;
        }
        
        .nova-company-name {
          margin-right: 0.5rem;
        }
        
        .nova-location {
          font-size: 0.8rem;
          color: var(--text-light);
          position: relative;
          padding-left: 0.6rem;
        }
        
        .nova-location:before {
          content: "•";
          position: absolute;
          left: 0.2rem;
          top: 0;
        }
        
        .nova-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0;
        }
        
        /* Skills styles */
        .nova-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 0.5rem;
        }
        
        .nova-skill {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        /* Projects and links styles */
        .nova-link, .nova-cert-link {
          font-size: 0.8rem;
          color: #555;
          text-decoration: none;
        }
        
        .nova-link:hover, .nova-cert-link:hover {
          text-decoration: underline;
        }
        
        .nova-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        
        .nova-tech-tag {
          font-size: 0.8rem;
          color: var(--text-secondary);
          white-space: nowrap;
        }
        
        .nova-tech-tag:not(:last-child):after {
          content: ",";
        }
        
        /* Certificates styles */
        .nova-certificates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .nova-certificate {
          padding-bottom: 0.75rem;
        }
        
        .nova-certificate-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.4rem;
        }
        
        .nova-certificate-header h3 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }
        
        .nova-issuer {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
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
            padding: 0 0 0.5rem 0;
            margin-bottom: 1rem;
          }
          
          .nova-main {
            padding: 0;
          }
          
          .nova-section {
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
            margin: 0 auto 1rem;
            max-width: 800px;
          }
          
          .nova-selector-content {
            max-height: none;
          }
          
          .nova-contact-container {
            gap: 0.5rem;
          }
          
          .nova-certificates-grid, .nova-skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}