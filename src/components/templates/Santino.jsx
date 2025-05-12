"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

export default function Santino({ resumeData }) {
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
        <section className="min-section">
          <h2 className="min-heading">Summary</h2>
          <p className="min-text">{personalInfo?.summary}</p>
        </section>
      )
    },
    { 
      id: 'experience', 
      label: 'Experience',
      icon: <FaBriefcase />,
      available: experience?.length > 0,
      content: (
        <section className="min-section">
          <h2 className="min-heading">Experience</h2>
          <div className="min-items">
            {experience?.map((job, index) => (
              <div key={index} className="min-item page-break-inside-avoid">
                <div className="min-item-header">
                  <h3 className="min-item-title">{job.position || job.title}</h3>
                  <span className="min-date">{job.startDate} — {job.endDate || "Present"}</span>
                </div>
                <div className="min-subtitle">
                  {job.company}
                  {job.location && <span className="min-location"> • {job.location}</span>}
                </div>
                <p className="min-text">{job.description}</p>
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
        <section className="min-section">
          <h2 className="min-heading">Education</h2>
          <div className="min-items">
            {education?.map((edu, index) => (
              <div key={index} className="min-item page-break-inside-avoid">
                <div className="min-item-header">
                  <h3 className="min-item-title">{edu.degree}</h3>
                  <span className="min-date">{edu.startDate} — {edu.endDate || "Present"}</span>
                </div>
                <div className="min-subtitle">{edu.school}</div>
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
        <section className="min-section">
          <h2 className="min-heading">Skills</h2>
          <div className="min-skills">
            {skills?.map((skill, index) => (
              <div key={index} className="min-skill">• {skill}</div>
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
        <section className="min-section">
          <h2 className="min-heading">Projects</h2>
          <div className="min-items">
            {projects?.map((project, index) => (
              <div key={index} className="min-item page-break-inside-avoid">
                <div className="min-item-header">
                  <h3 className="min-item-title">
                    {project.title}
                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-link"
                      >
                        <FaLink size={12} />
                      </a>
                    )}
                  </h3>
                </div>
                <p className="min-text">{project.description}</p>
                {project.technologies?.length > 0 && (
                  <div className="min-tags">
                    <span className="min-tag-label">Technologies:</span>
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="min-tag">{tech}</span>
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
        <section className="min-section">
          <h2 className="min-heading">Achievements</h2>
          <div className="min-items">
            {achievements?.map((achievement, index) => (
              <div key={index} className="min-item page-break-inside-avoid">
                <div className="min-item-header">
                  <h3 className="min-item-title">{achievement.title}</h3>
                  {achievement.date && <span className="min-date">{achievement.date}</span>}
                </div>
                {achievement.organization && (
                  <div className="min-subtitle">{achievement.organization}</div>
                )}
                {achievement.description && (
                  <p className="min-text">{achievement.description}</p>
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
        <section className="min-section">
          <h2 className="min-heading">Certifications</h2>
          <div className="min-items">
            {certificates?.map((cert, index) => (
              <div key={index} className="min-item page-break-inside-avoid">
                <div className="min-item-header">
                  <h3 className="min-item-title">{cert.name}</h3>
                  <span className="min-date">{cert.date}</span>
                </div>
                <div className="min-subtitle">{cert.issuer}</div>
                {cert.url && (
                  <a
                    href={ensureHttps(cert.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-view-link"
                  >
                    <FaLink size={11} className="min-icon" />
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
    <div className="min-container">
      {/* Header with personal info */}
      <header className="min-header">
        <h1>{personalInfo?.name || "Your Name"}</h1>
        {personalInfo?.title && <h2 className="min-subtitle">{personalInfo.title}</h2>}
        
        {/* Contact Details */}
        <div className="min-contacts">
          {personalInfo?.email && (
            <a href={`mailto:${personalInfo.email}`} className="min-contact">
              <FaEnvelope className="min-icon" />
              {personalInfo.email}
            </a>
          )}
          
          {personalInfo?.phone && (
            <a href={`tel:${personalInfo.phone}`} className="min-contact">
              <FaPhone className="min-icon" />
              {personalInfo.phone}
            </a>
          )}
          
          {personalInfo?.location && (
            <span className="min-contact">
              <FaMapMarkerAlt className="min-icon" />
              {personalInfo.location}
            </span>
          )}
          
          {personalInfo?.linkedin && (
            <a
              href={ensureHttps(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="min-contact"
            >
              <FaLinkedin className="min-icon" />
              LinkedIn
            </a>
          )}
          
          {personalInfo?.github && (
            <a
              href={ensureHttps(personalInfo.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="min-contact"
            >
              <FaGithub className="min-icon" />
              GitHub
            </a>
          )}
        </div>
      </header>

      {/* Section Selector */}
      <div className="min-selector print:hidden">
        <div className="min-selector-header">Select sections to add:</div>
        <div className="min-buttons">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              disabled={sectionOrder.includes(section.id)}
              className={`min-button ${sectionOrder.includes(section.id) ? 'min-button-selected' : ''}`}
            >
              <span className="min-button-icon">{section.icon}</span>
              <span className="min-button-text">{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="min-button-badge">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button onClick={resetSections} className="min-reset">
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="min-content" ref={contentRef}>
        {sectionOrder.length > 0 ? (
          sectionOrder.map(sectionId => {
            const section = allSections.find(s => s.id === sectionId);
            if (!section || !section.available) return null;
            return (
              <div key={sectionId} className="min-fade-in">
                {section.content}
              </div>
            );
          })
        ) : (
          <div className="min-empty print:hidden">
            <p>Select sections above to build your resume</p>
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
      </main>

      {/* Minimal CSS */}
      <style jsx global>{`
        .min-container {
          max-width: 8.5in;
          margin: 0 auto;
          background: white;
          color: #333;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          line-height: 1.5;
          padding: 2rem;
        }
        
        .min-header {
          text-align: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #f0f0f0;
        }
        
        .min-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          line-height: 1.1;
        }
        
        .min-header h2 {
          font-size: 1.1rem;
          font-weight: 500;
          color: #555;
          margin: 0 0 1rem;
        }
        
        .min-contacts {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          font-size: 0.9rem;
        }
        
        .min-contact {
          display: inline-flex;
          align-items: center;
          color: #555;
          text-decoration: none;
        }
        
        .min-contact:hover {
          color: #000;
          text-decoration: underline;
        }
        
        .min-icon {
          margin-right: 0.4rem;
          font-size: 0.9rem;
          color: #555;
        }
        
        .min-selector {
          margin-bottom: 2rem;
          padding: 1rem;
          background: #f9f9f9;
          border: 1px solid #eaeaea;
          border-radius: 4px;
        }
        
        .min-selector-header {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.75rem;
          color: #555;
        }
        
        .min-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .min-button {
          display: inline-flex;
          align-items: center;
          padding: 0.4rem 0.75rem;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 0.875rem;
          color: #333;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        
        .min-button:hover:not(:disabled) {
          background: #f0f0f0;
          border-color: #d0d0d0;
        }
        
        .min-button-selected {
          background: #f0f0f0;
          color: #999;
          cursor: default;
        }
        
        .min-button-icon {
          margin-right: 0.5rem;
          font-size: 0.875rem;
          color: #666;
        }
        
        .min-button-badge {
          margin-left: 0.5rem;
          width: 1.2rem;
          height: 1.2rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #eaeaea;
          border-radius: 50%;
          font-size: 0.75rem;
        }
        
        .min-reset {
          padding: 0.4rem 0.75rem;
          background: white;
          border: 1px solid #ffcccb;
          color: #d9534f;
          border-radius: 4px;
          font-size: 0.875rem;
          cursor: pointer;
        }
        
        .min-reset:hover {
          background: #fff5f5;
        }
        
        .min-empty {
          padding: 2rem;
          text-align: center;
          border: 1px dashed #ddd;
          border-radius: 4px;
          color: #999;
        }
        
        .min-section {
          margin-bottom: 1.5rem;
        }
        
        .min-heading {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #eaeaea;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .min-items {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        
        .min-item {
          break-inside: avoid;
        }
        
        .min-item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.25rem;
        }
        
        .min-item-title {
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
        }
        
        .min-date {
          font-size: 0.85rem;
          color: #666;
          white-space: nowrap;
        }
        
        .min-subtitle {
          font-size: 0.95rem;
          color: #444;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        .min-location {
          color: #666;
          font-weight: normal;
        }
        
        .min-text {
          font-size: 0.9rem;
          color: #444;
          margin: 0;
        }
        
        .min-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.5rem;
        }
        
        .min-skill {
          font-size: 0.9rem;
          color: #444;
        }
        
        .min-link {
          margin-left: 0.5rem;
          color: #666;
          text-decoration: none;
        }
        
        .min-link:hover {
          color: #000;
        }
        
        .min-tags {
          margin-top: 0.5rem;
          font-size: 0.85rem;
        }
        
        .min-tag-label {
          font-weight: 500;
          color: #555;
          margin-right: 0.5rem;
        }
        
        .min-tag {
          margin-right: 0.75rem;
          color: #666;
        }
        
        .min-view-link {
          display: inline-flex;
          align-items: center;
          font-size: 0.85rem;
          color: #555;
          text-decoration: none;
          margin-top: 0.5rem;
        }
        
        .min-view-link:hover {
          text-decoration: underline;
          color: #000;
        }
        
        .min-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media print {
          .min-container {
            padding: 0;
            max-width: none;
            width: 100%;
          }
          
          .min-header {
            padding-bottom: 1rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid #eaeaea;
          }
          
          .min-section {
            margin-bottom: 1rem;
          }
          
          .min-heading {
            font-size: 1rem;
            margin-bottom: 0.75rem;
          }
          
          .min-item-title {
            font-size: 1rem;
          }
          
          .min-subtitle {
            font-size: 0.9rem;
          }
          
          .min-text {
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 600px) {
          .min-container {
            padding: 1rem;
          }
          
          .min-header h1 {
            font-size: 1.5rem;
          }
          
          .min-contacts {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}