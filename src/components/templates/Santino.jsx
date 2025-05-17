"use client";

import React, { useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

export default function TwoColumn({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};

  const contentRef = useRef(null);
  
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };
  
  // Sidebar sections
  const sidebarSections = [
    { 
      id: 'skills', 
      available: skills?.length > 0,
      content: (
        <section className="tc-sidebar-section">
          <h2 className="tc-sidebar-heading">Skills</h2>
          <div className="tc-skills-list">
            {skills?.map((skill, index) => (
              <div key={index} className="tc-skill-item">
                <div className="tc-skill-bullet"></div>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )
    },
    { 
      id: 'certificates', 
      available: certificates?.length > 0,
      content: (
        <section className="tc-sidebar-section">
          <h2 className="tc-sidebar-heading">Certifications</h2>
          <div className="tc-certificates-list">
            {certificates?.map((cert, index) => (
              <div key={index} className="tc-cert-item page-break-inside-avoid">
                <h3 className="tc-cert-title">{cert.name}</h3>
                <div className="tc-cert-issuer">{cert.issuer}</div>
                <div className="tc-cert-date">{cert.date}</div>
                {cert.url && (
                  <a
                    href={ensureHttps(cert.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tc-cert-link"
                  >
                    <FaLink size={10} className="tc-icon" />
                    <span>View</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    }
  ];
  
  // Main content sections
  const mainSections = [
    { 
      id: 'summary', 
      available: !!personalInfo?.summary,
      content: (
        <section className="tc-main-section">
          <h2 className="tc-main-heading">Professional Summary</h2>
          <p className="tc-summary-text">{personalInfo?.summary}</p>
        </section>
      )
    },
    { 
      id: 'experience', 
      available: experience?.length > 0,
      content: (
        <section className="tc-main-section">
          <h2 className="tc-main-heading">Experience</h2>
          <div className="tc-items-list">
            {experience?.map((job, index) => (
              <div key={index} className="tc-exp-item page-break-inside-avoid">
                <div className="tc-exp-header">
                  <h3 className="tc-exp-title">{job.position || job.title}</h3>
                  <span className="tc-exp-date">{job.startDate} — {job.endDate || "Present"}</span>
                </div>
                <div className="tc-exp-company">
                  {job.company}
                  {job.location && <span className="tc-exp-location"> • {job.location}</span>}
                </div>
                <p className="tc-exp-description">{job.description}</p>
              </div>
            ))}
          </div>
        </section>
      )
    },
    { 
      id: 'education', 
      available: education?.length > 0,
      content: (
        <section className="tc-main-section">
          <h2 className="tc-main-heading">Education</h2>
          <div className="tc-items-list">
            {education?.map((edu, index) => (
              <div key={index} className="tc-edu-item page-break-inside-avoid">
                <div className="tc-edu-header">
                  <h3 className="tc-edu-title">{edu.degree}</h3>
                  <span className="tc-edu-date">{edu.startDate} — {edu.endDate || "Present"}</span>
                </div>
                <div className="tc-edu-school">{edu.school}</div>
              </div>
            ))}
          </div>
        </section>
      )
    },
    { 
      id: 'projects', 
      available: projects?.length > 0,
      content: (
        <section className="tc-main-section">
          <h2 className="tc-main-heading">Projects</h2>
          <div className="tc-items-list">
            {projects?.map((project, index) => (
              <div key={index} className="tc-project-item page-break-inside-avoid">
                <div className="tc-project-header">
                  <h3 className="tc-project-title">
                    {project.title}
                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tc-project-link"
                      >
                        <FaLink size={11} />
                      </a>
                    )}
                  </h3>
                </div>
                <p className="tc-project-description">{project.description}</p>
                {project.technologies?.length > 0 && (
                  <div className="tc-tech-tags">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tc-tech-tag">{tech}</span>
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
      available: achievements?.length > 0,
      content: (
        <section className="tc-main-section">
          <h2 className="tc-main-heading">Achievements</h2>
          <div className="tc-items-list">
            {achievements?.map((achievement, index) => (
              <div key={index} className="tc-achievement-item page-break-inside-avoid">
                <div className="tc-achievement-header">
                  <h3 className="tc-achievement-title">{achievement.title}</h3>
                  {achievement.date && <span className="tc-achievement-date">{achievement.date}</span>}
                </div>
                {achievement.organization && (
                  <div className="tc-achievement-org">{achievement.organization}</div>
                )}
                {achievement.description && (
                  <p className="tc-achievement-description">{achievement.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    }
  ];

  return (
    <div className="tc-container">
      {/* Two-column layout */}
      <div className="tc-resume">
        {/* Left sidebar */}
        <aside className="tc-sidebar">
          {/* Header with personal info */}
          <div className="tc-personal-info">
            <h1 className="tc-name">{personalInfo?.name || "Your Name"}</h1>
            {personalInfo?.title && <h2 className="tc-title">{personalInfo.title}</h2>}
          </div>
          
          {/* Contact Details */}
          <div className="tc-contacts">
            {personalInfo?.email && (
              <a href={`mailto:${personalInfo.email}`} className="tc-contact-item">
                <FaEnvelope className="tc-contact-icon" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            
            {personalInfo?.phone && (
              <a href={`tel:${personalInfo.phone}`} className="tc-contact-item">
                <FaPhone className="tc-contact-icon" />
                <span>{personalInfo.phone}</span>
              </a>
            )}
            
            {personalInfo?.location && (
              <div className="tc-contact-item">
                <FaMapMarkerAlt className="tc-contact-icon" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="tc-contact-item"
              >
                <FaLinkedin className="tc-contact-icon" />
                <span>LinkedIn</span>
              </a>
            )}
            
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="tc-contact-item"
              >
                <FaGithub className="tc-contact-icon" />
                <span>GitHub</span>
              </a>
            )}
          </div>
          
          {/* Sidebar Content */}
          <div className="tc-sidebar-content">
            {sidebarSections.filter(section => section.available).map(section => (
              <div key={section.id}>{section.content}</div>
            ))}
          </div>
        </aside>

        {/* Main content area */}
        <main className="tc-main" ref={contentRef}>
          {mainSections.filter(section => section.available).map(section => (
            <div key={section.id}>{section.content}</div>
          ))}
        </main>
      </div>

      {/* Two-Column CSS */}
      <style jsx global>{`
        /* Base Styles */
        .tc-container {
          max-width: 1100px;
          margin: 0 auto;
          color: #2d3748;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          line-height: 1.5;
          background: #fff;
        }
        
        /* Two-column layout */
        .tc-resume {
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: 11in;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        
        /* Sidebar styles */
        .tc-sidebar {
          background: #2d3748;
          color: white;
          padding: 2rem 1.5rem;
        }
        
        .tc-personal-info {
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .tc-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
        }
        
        .tc-title {
          font-size: 1rem;
          font-weight: 400;
          color: #e2e8f0;
          margin: 0;
        }
        
        .tc-contacts {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .tc-contact-item {
          display: flex;
          align-items: center;
          color: #e2e8f0;
          font-size: 0.85rem;
          text-decoration: none;
          transition: color 0.15s;
        }
        
        .tc-contact-item:hover {
          color: white;
        }
        
        .tc-contact-icon {
          width: 1rem;
          height: 1rem;
          margin-right: 0.75rem;
          color: #a0aec0;
        }
        
        /* Sidebar section styles */
        .tc-sidebar-section {
          margin-bottom: 2rem;
        }
        
        .tc-sidebar-heading {
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 1rem;
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .tc-sidebar-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 2.5rem;
          height: 2px;
          background-color: #4299e1;
        }
        
        /* Skills styles */
        .tc-skills-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .tc-skill-item {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
        }
        
        .tc-skill-bullet {
          width: 0.35rem;
          height: 0.35rem;
          background-color: #4299e1;
          border-radius: 50%;
          margin-right: 0.5rem;
          flex-shrink: 0;
        }
        
        /* Certificate styles */
        .tc-certificates-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .tc-cert-item {
          font-size: 0.85rem;
        }
        
        .tc-cert-title {
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 0.25rem;
        }
        
        .tc-cert-issuer {
          color: #e2e8f0;
          margin-bottom: 0.25rem;
        }
        
        .tc-cert-date {
          color: #a0aec0;
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
        }
        
        .tc-cert-link {
          display: inline-flex;
          align-items: center;
          color: #4299e1;
          text-decoration: none;
          font-size: 0.8rem;
          gap: 0.25rem;
        }
        
        .tc-cert-link:hover {
          text-decoration: underline;
        }
        
        /* Main content area styles */
        .tc-main {
          padding: 2rem;
        }
        
        /* Main section styles */
        .tc-main-section {
          margin-bottom: 2rem;
        }
        
        .tc-main-heading {
          font-size: 1.25rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 1.25rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #edf2f7;
        }
        
        .tc-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        /* Experience styles */
        .tc-exp-header, .tc-edu-header, .tc-project-header, .tc-achievement-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.25rem;
        }
        
        .tc-exp-title, .tc-edu-title, .tc-project-title, .tc-achievement-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }
        
        .tc-exp-date, .tc-edu-date, .tc-achievement-date {
          font-size: 0.85rem;
          color: #718096;
          white-space: nowrap;
        }
        
        .tc-exp-company, .tc-edu-school, .tc-achievement-org {
          font-size: 0.95rem;
          color: #4a5568;
          margin-bottom: 0.5rem;
        }
        
        .tc-exp-location {
          color: #718096;
          font-weight: 400;
        }
        
        .tc-exp-description, .tc-project-description, .tc-achievement-description, .tc-summary-text {
          font-size: 0.9rem;
          color: #4a5568;
          line-height: 1.6;
          margin: 0;
        }
        
        /* Project styles */
        .tc-project-link {
          margin-left: 0.5rem;
          color: #4299e1;
          transition: color 0.15s;
        }
        
        .tc-project-link:hover {
          color: #2b6cb0;
        }
        
        .tc-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }
        
        .tc-tech-tag {
          font-size: 0.75rem;
          background: #edf2f7;
          color: #4a5568;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }
        
        /* Print styles */
        @media print {
          @page {
            margin: 0.5in;
            size: letter portrait;
          }
          
          .tc-container {
            padding: 0;
            max-width: none;
          }
          
          .tc-resume {
            border: none;
            box-shadow: none;
            min-height: 0;
          }
          
          .tc-sidebar {
            padding: 0.75in 0.5in 0.75in 0.5in;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .tc-main {
            padding: 0.75in 0.5in 0.75in 0.5in;
          }
          
          .tc-main-section {
            margin-bottom: 1.25rem;
          }
          
          .tc-sidebar-section {
            margin-bottom: 1.25rem;
          }
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .tc-resume {
            grid-template-columns: 1fr;
          }
          
          .tc-sidebar {
            padding: 1.5rem;
          }
          
          .tc-main {
            padding: 1.5rem;
          }
          
          .tc-personal-info {
            text-align: center;
          }
          
          .tc-contacts {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}