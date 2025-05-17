"use client";

import React, { useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

export default function Nexus({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};
  
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
        <section className="mb-6 resume-section">
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
        <section className="mb-6 resume-section">
          <div className="dot-header">
            <div className="dot-circle"></div>
            <h2>Education</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
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
        <section className="mb-6 resume-section">
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
        <section className="mb-6 resume-section">
          <div className="dot-header">
            <div className="dot-circle"></div>
            <h2>Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
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
        <section className="mb-6 resume-section">
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
        <section className="mb-6 resume-section">
          <div className="dot-header">
            <div className="dot-circle"></div>
            <h2>Certifications</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
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
  
   // Auto distribute sections between columns but place certificates on right side
  const distributeSections = () => {
    const left = [];
    const right = [];
    
    availableSections.forEach((section, index) => {
      // Always place certificates on the right side
      if (section.id === 'certificates') {
        right.push(section.id);
      } 
      // Distribute other sections as before
      else if (index % 2 === 0) {
        left.push(section.id);
      } else {
        right.push(section.id);
      }
    });
    
    return {
      leftSections: left,
      rightSections: right
    };
  };
  
  const { leftSections, rightSections } = distributeSections();

  return (
    <div className="bg-white min-h-full font-sans text-gray-800 relative">
      {/* Header with personal info and contact details */}
      <header className="resume-header">
        <div className="header-container">
          <div className="personal-info">
            <h1 className="name">{personalInfo?.name || "Your Name"}</h1>
            {personalInfo?.title && <h2 className="title">{personalInfo.title}</h2>}
          </div>
          
          <div className="contact-info">
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
      </header>

      {/* Main Two Column Content Area */}
      <div className="two-column-layout" ref={contentRef}>
        {/* Left Column */}
        <div className="column left-column">
          {leftSections.map(sectionId => {
            const section = allSections.find(s => s.id === sectionId);
            if (!section) return null;
            return <div key={sectionId}>{section.content}</div>;
          })}
        </div>
        
        {/* Right Column */}
        <div className="column right-column">
          {rightSections.map(sectionId => {
            const section = allSections.find(s => s.id === sectionId);
            if (!section) return null;
            return <div key={sectionId}>{section.content}</div>;
          })}
        </div>
      </div>
      
      {/* Page numbers for print only */}
      <div className="hidden print:block text-right text-xs text-gray-400 pt-2 border-t border-gray-200 mt-4">
        <span className="print-page-number"></span>
      </div>
      
      {/* Styles */}
      <style jsx global>{`
        /* Overall Layout */
        body {
          margin: 0;
          padding: 0;
        }
        
        /* Header */
        .resume-header {
          background-color: #F3F4F6;
          padding: 1.5rem;
          border-bottom: 1px solid #E5E7EB;
        }
        
        .header-container {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        
        .personal-info {
          flex-shrink: 0;
        }
        
        .name {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.25rem;
          line-height: 1.2;
        }
        
        .title {
          font-size: 1.1rem;
          font-weight: 500;
          color: #4B5563;
          margin: 0;
        }
        
        .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1.5rem;
          justify-content: flex-end;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: #4B5563;
          transition: color 0.15s;
          text-decoration: none;
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
        
        /* Two Column Layout */
        .two-column-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
          padding: 1.5rem;
        }
        
        .column {
          min-height: 100px;
        }

        /* Section Styles */
        .dot-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
          position: relative;
        }
        
        .dot-header h2 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0 0.75rem;
        }
        
        .dot-header::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 1.5rem;
          right: 0;
          height: 1px;
          background-color: #E5E7EB;
          z-index: -1;
        }
        
        .dot-circle {
          width: 0.875rem;
          height: 0.875rem;
          border-radius: 9999px;
          background-color: #0D9488;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }
        
        .content-box {
          margin-left: 1.5rem;
        }
        
        /* Experience Timeline */
        .experience-timeline {
          margin-left: 0.25rem;
        }
        
        .timeline-item {
          display: flex;
          margin-bottom: 1.25rem;
        }
        
        .timeline-dot-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 1.25rem;
          margin-right: 0.75rem;
          flex-shrink: 0;
        }
        
        .timeline-dot {
          width: 0.625rem;
          height: 0.625rem;
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
          font-size: 0.8rem;
          color: #6B7280;
          white-space: nowrap;
        }
        
        /* Education */
        .education-item {
          position: relative;
          padding-left: 1rem;
          margin-bottom: 1rem;
        }
        
        .education-item:last-child {
          margin-bottom: 0;
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
          gap: 0.5rem 1.25rem;
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
          margin-bottom: 1rem;
        }
        
        .project-card:last-child {
          margin-bottom: 0;
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
        
        .achievement-item:last-child {
          margin-bottom: 0;
        }
        
        .achievement-content {
          padding-left: 0.75rem;
        }
        
        /* Certifications */
        .cert-item {
          position: relative;
          padding-left: 1rem;
          margin-bottom: 1rem;
        }
        
        .cert-item:last-child {
          margin-bottom: 0;
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
          
          .resume-header {
            padding: 0.75rem 0 1rem;
            background-color: #F3F4F6 !important;
          }
          
          .two-column-layout {
            gap: 1.5rem;
            padding: 1rem 0;
          }
          
          .name {
            font-size: 1.5rem;
          }
          
          .title {
            font-size: 1rem;
          }
          
          .contact-item {
            font-size: 0.8rem;
          }
          
          .dot-header h2 {
            font-size: 1rem;
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
        }
        
        /* Responsive */
        @media (max-width: 900px) {
          .two-column-layout {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .header-container {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .contact-info {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
}