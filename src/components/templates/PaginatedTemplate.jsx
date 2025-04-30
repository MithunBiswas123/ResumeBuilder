"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin,
  FaTrophy, FaCertificate, FaBriefcase, FaGraduationCap,
  FaCode, FaLink, FaCalendarAlt, FaCircle
} from "react-icons/fa";
import "./paginatedTemplate.css";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

// Page dimensions (A4 size in pixels at 96 DPI)
const PAGE_WIDTH = 794;  // ~ 210mm
const PAGE_HEIGHT = 1123; // ~ 297mm
const PAGE_PADDING = 48;  // 12mm margin

export default function PaginatedTemplate({ resumeData }) {
  const [pages, setPages] = useState([]);
  const contentRef = useRef(null);
  const measureRef = useRef(null);
  
  const {
    personalInfo,
    experience,
    education,
    skills,
    skillCategories,
    projects,
    achievements,
    certificates,
  } = resumeData || {};

  // Create sections in order of appearance
  const createSections = () => {
    const sections = [];
    
    // Header is always on first page
    sections.push({
      id: "header",
      title: null,
      content: { ...personalInfo },
      type: "header",
      priority: 1,
      keepTogether: true
    });
    
    if (personalInfo?.summary) {
      sections.push({
        id: "summary",
        title: "Professional Summary",
        content: personalInfo.summary,
        type: "summary",
        priority: 2
      });
    }
    
    // Handle both skill formats (categories or flat array)
    if (skillCategories?.length > 0) {
      sections.push({
        id: "skills",
        title: "Skills",
        content: skillCategories,
        type: "skillCategories",
        priority: 3
      });
    } else if (skills?.length > 0) {
      sections.push({
        id: "skills",
        title: "Skills",
        content: skills,
        type: "skills",
        priority: 3
      });
    }
    
    // Experience section
    if (experience?.length > 0) {
      // Each experience entry is its own section
      experience.forEach((exp, index) => {
        sections.push({
          id: `experience-${index}`,
          title: index === 0 ? "Professional Experience" : null,
          content: exp,
          type: "experience",
          priority: 4,
          isFirst: index === 0,
          isLast: index === experience.length - 1
        });
      });
    }
    
    // Projects section
    if (projects?.length > 0) {
      // Each project entry is its own section
      projects.forEach((proj, index) => {
        sections.push({
          id: `project-${index}`,
          title: index === 0 ? "Projects" : null,
          content: proj,
          type: "project",
          priority: 5,
          isFirst: index === 0,
          isLast: index === projects.length - 1
        });
      });
    }
    
    // Education section
    if (education?.length > 0) {
      // Each education entry is its own section
      education.forEach((edu, index) => {
        sections.push({
          id: `education-${index}`,
          title: index === 0 ? "Education" : null,
          content: edu,
          type: "education",
          priority: 6,
          isFirst: index === 0,
          isLast: index === education.length - 1
        });
      });
    }
    
    // Achievements section
    if (achievements?.length > 0) {
      // Each achievement entry is its own section
      achievements.forEach((achv, index) => {
        sections.push({
          id: `achievement-${index}`,
          title: index === 0 ? "Achievements" : null,
          content: achv,
          type: "achievement",
          priority: 7,
          isFirst: index === 0,
          isLast: index === achievements.length - 1
        });
      });
    }
    
    // Certificates section
    if (certificates?.length > 0) {
      // Each certificate entry is its own section
      certificates.forEach((cert, index) => {
        sections.push({
          id: `certificate-${index}`,
          title: index === 0 ? "Certifications" : null,
          content: cert,
          type: "certificate",
          priority: 8,
          isFirst: index === 0,
          isLast: index === certificates.length - 1
        });
      });
    }
    
    return sections;
  };
  
  // Calculate pagination once all components are rendered
  useEffect(() => {
    if (!measureRef.current) return;
    
    // Force a repaint to ensure all elements are properly rendered
    setTimeout(() => {
      const sections = createSections();
      const paginatedContent = paginateSections(sections);
      setPages(paginatedContent);
    }, 100);
  }, [resumeData]);

  const measureSections = (sections) => {
    const heights = {};
    
    // Render each section in the hidden measurement container
    const measureContainer = measureRef.current;
    measureContainer.innerHTML = '';
    
    sections.forEach(section => {
      const sectionEl = document.createElement('div');
      sectionEl.className = `measure-section ${section.type}`;
      
      // Add section HTML
      sectionEl.innerHTML = renderSectionHTML(section);
      
      // Add to measurement container
      measureContainer.appendChild(sectionEl);
      
      // Measure height
      heights[section.id] = sectionEl.offsetHeight;
    });
    
    return heights;
  };

  // Create HTML for a section based on its type
  const renderSectionHTML = (section) => {
    switch (section.type) {
      case 'header':
        return `
          <div class="resume-header">
            <h1>${section.content.name || ''}</h1>
            <p class="title">${section.content.title || ''}</p>
            <div class="contact-info">
              ${section.content.email ? `<div><span>Email:</span> ${section.content.email}</div>` : ''}
              ${section.content.phone ? `<div><span>Phone:</span> ${section.content.phone}</div>` : ''}
              ${section.content.location ? `<div><span>Location:</span> ${section.content.location}</div>` : ''}
              ${section.content.linkedin ? `<div><span>LinkedIn:</span> ${section.content.linkedin}</div>` : ''}
              ${section.content.github ? `<div><span>GitHub:</span> ${section.content.github}</div>` : ''}
            </div>
          </div>
        `;
      
      case 'summary':
        return `
          ${section.title ? `<h2>${section.title}</h2>` : ''}
          <div class="summary-content">
            <p>${section.content}</p>
          </div>
        `;
      
      case 'skillCategories':
        // Skill categories
        return `
          ${section.title ? `<h2>${section.title}</h2>` : ''}
          <div class="skills-content">
            ${section.content.map(category => `
              <div class="skill-category">
                <h3>${category.name || 'Skills'}</h3>
                <div class="skill-list">
                  ${category.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        `;
      
      case 'skills':
        // Flat skills list
        return `
          ${section.title ? `<h2>${section.title}</h2>` : ''}
          <div class="skills-content">
            <div class="skill-list">
              ${section.content.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
          </div>
        `;
      
      case 'experience':
        return `
          ${section.isFirst && section.title ? `<h2>${section.title}</h2>` : ''}
          <div class="experience-item">
            <div class="job-header">
              <h3>${section.content.position || ''}</h3>
              <div class="date-range">${section.content.startDate || ''} - ${section.content.endDate || 'Present'}</div>
            </div>
            <div class="company">${section.content.company || ''} ${section.content.location ? `- ${section.content.location}` : ''}</div>
            <p class="description">${section.content.description || ''}</p>
          </div>
        `;
      
      case 'education':
        return `
          ${section.isFirst && section.title ? `<h2>${section.title}</h2>` : ''}
          <div class="education-item">
            <div class="edu-header">
              <h3>${section.content.degree || ''}</h3>
              <div class="date-range">${section.content.startDate || ''} - ${section.content.endDate || 'Present'}</div>
            </div>
            <div class="school">${section.content.school || ''} ${section.content.location ? `- ${section.content.location}` : ''}</div>
            <p class="description">${section.content.description || ''}</p>
          </div>
        `;
      
      case 'project':
        return `
          ${section.isFirst && section.title ? `<h2>${section.title}</h2>` : ''}
          <div class="project-item">
            <h3>${section.content.title || ''}</h3>
            ${section.content.technologies?.length > 0 ? 
              `<div class="technologies">
                ${section.content.technologies.map(tech => `<span class="tech">${tech}</span>`).join('')}
              </div>` : ''}
            <p class="description">${section.content.description || ''}</p>
            ${section.content.link ? `<div class="project-link">Link: ${section.content.link}</div>` : ''}
          </div>
        `;
      
      case 'achievement':
        return `
          ${section.isFirst && section.title ? `<h2>${section.title}</h2>` : ''}
          <div class="achievement-item">
            <div class="achievement-header">
              <h3>${section.content.title || ''}</h3>
              <div class="date">${section.content.date || ''}</div>
            </div>
            <div class="organization">${section.content.organization || ''}</div>
            <p class="description">${section.content.description || ''}</p>
          </div>
        `;
      
      case 'certificate':
        return `
          ${section.isFirst && section.title ? `<h2>${section.title}</h2>` : ''}
          <div class="certificate-item">
            <div class="cert-header">
              <h3>${section.content.name || ''}</h3>
              <div class="date">${section.content.date || ''}${section.content.expiration ? ` - ${section.content.expiration}` : ''}</div>
            </div>
            <div class="issuer">${section.content.issuer || ''}</div>
            ${section.content.credentialID ? `<div class="credential-id">Credential ID: ${section.content.credentialID}</div>` : ''}
            <p class="description">${section.content.description || ''}</p>
            ${section.content.url ? `<div class="certificate-link">URL: ${section.content.url}</div>` : ''}
          </div>
        `;
      
      default:
        return '';
    }
  };
  
  const paginateSections = (sections) => {
    // Measure sections first
    const sectionHeights = measureSections(sections);
    
    const pages = [];
    let currentPage = [];
    let currentHeight = 0;
    const availableHeight = PAGE_HEIGHT - (PAGE_PADDING * 2);
    
    // Sort sections by priority
    const sortedSections = [...sections].sort((a, b) => a.priority - b.priority);
    
    // Distribute sections across pages
    sortedSections.forEach(section => {
      const sectionHeight = sectionHeights[section.id] || 0;
      
      // If adding this section would exceed page height and it's not the first item on the page
      if (currentHeight + sectionHeight > availableHeight && currentPage.length > 0) {
        // Add current page to pages array and start a new page
        pages.push([...currentPage]);
        currentPage = [];
        currentHeight = 0;
      }
      
      // Add section to current page
      currentPage.push(section);
      currentHeight += sectionHeight;
    });
    
    // Add the last page if it has content
    if (currentPage.length > 0) {
      pages.push([...currentPage]);
    }
    
    return pages;
  };
  
  // Render a React component for a section
  const renderSection = (section) => {
    switch (section.type) {
      case 'header':
        return (
          <div key={section.id} className="resume-header">
            {section.content.profileImage && (
              <div className="profile-image">
                <img src={section.content.profileImage} alt={section.content.name || "Profile"} />
              </div>
            )}
            <h1>{section.content.name || ''}</h1>
            {section.content.title && <p className="title">{section.content.title}</p>}
            <div className="contact-info">
              {section.content.email && <div><span>Email:</span> {section.content.email}</div>}
              {section.content.phone && <div><span>Phone:</span> {section.content.phone}</div>}
              {section.content.location && <div><span>Location:</span> {section.content.location}</div>}
              {section.content.linkedin && (
                <div><span>LinkedIn:</span> <a href={ensureHttps(section.content.linkedin)} target="_blank" rel="noopener noreferrer">{section.content.linkedin}</a></div>
              )}
              {section.content.github && (
                <div><span>GitHub:</span> <a href={ensureHttps(section.content.github)} target="_blank" rel="noopener noreferrer">{section.content.github}</a></div>
              )}
            </div>
          </div>
        );
      
      case 'summary':
        return (
          <div key={section.id} className="summary-section">
            {section.title && <h2>{section.title}</h2>}
            <div className="summary-content">
              <p>{section.content}</p>
            </div>
          </div>
        );
      
      case 'skillCategories':
        return (
          <div key={section.id} className="skills-section">
            {section.title && <h2>{section.title}</h2>}
            <div className="skills-content">
              {section.content.map((category, categoryIndex) => (
                <div key={`cat-${categoryIndex}`} className="skill-category">
                  <h3>{category.name || 'Skills'}</h3>
                  <div className="skill-list">
                    {category.skills.map((skill, skillIndex) => (
                      <span key={`skill-${categoryIndex}-${skillIndex}`} className="skill">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'skills':
        return (
          <div key={section.id} className="skills-section">
            {section.title && <h2>{section.title}</h2>}
            <div className="skills-content">
              <div className="skill-list">
                {section.content.map((skill, index) => (
                  <span key={`skill-${index}`} className="skill">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'experience':
        return (
          <div key={section.id} className="experience-section">
            {section.isFirst && section.title && <h2>{section.title}</h2>}
            <div className="experience-item">
              <div className="job-header">
                <h3>{section.content.position || ''}</h3>
                <div className="date-range">{section.content.startDate || ''} - {section.content.endDate || 'Present'}</div>
              </div>
              <div className="company">{section.content.company || ''} {section.content.location ? `- ${section.content.location}` : ''}</div>
              <p className="description">{section.content.description || ''}</p>
            </div>
          </div>
        );
      
      case 'education':
        return (
          <div key={section.id} className="education-section">
            {section.isFirst && section.title && <h2>{section.title}</h2>}
            <div className="education-item">
              <div className="edu-header">
                <h3>{section.content.degree || ''}</h3>
                <div className="date-range">{section.content.startDate || ''} - {section.content.endDate || 'Present'}</div>
              </div>
              <div className="school">{section.content.school || ''} {section.content.location ? `- ${section.content.location}` : ''}</div>
              <p className="description">{section.content.description || ''}</p>
            </div>
          </div>
        );
      
      case 'project':
        return (
          <div key={section.id} className="project-section">
            {section.isFirst && section.title && <h2>{section.title}</h2>}
            <div className="project-item">
              <h3>{section.content.title || ''}</h3>
              {section.content.technologies?.length > 0 && (
                <div className="technologies">
                  {section.content.technologies.map((tech, index) => (
                    <span key={`tech-${index}`} className="tech">{tech}</span>
                  ))}
                </div>
              )}
              <p className="description">{section.content.description || ''}</p>
              {section.content.link && (
                <div className="project-link">
                  <a href={ensureHttps(section.content.link)} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'achievement':
        return (
          <div key={section.id} className="achievement-section">
            {section.isFirst && section.title && <h2>{section.title}</h2>}
            <div className="achievement-item">
              <div className="achievement-header">
                <h3>{section.content.title || ''}</h3>
                {section.content.date && <div className="date">{section.content.date}</div>}
              </div>
              {section.content.organization && <div className="organization">{section.content.organization}</div>}
              {section.content.description && <p className="description">{section.content.description}</p>}
            </div>
          </div>
        );
      
      case 'certificate':
        return (
          <div key={section.id} className="certificate-section">
            {section.isFirst && section.title && <h2>{section.title}</h2>}
            <div className="certificate-item">
              <div className="cert-header">
                <h3>{section.content.name || ''}</h3>
                <div className="date">
                  {section.content.date || ''}
                  {section.content.expiration && ` - ${section.content.expiration}`}
                </div>
              </div>
              {section.content.issuer && <div className="issuer">{section.content.issuer}</div>}
              {section.content.credentialID && <div className="credential-id">Credential ID: {section.content.credentialID}</div>}
              {section.content.description && <p className="description">{section.content.description}</p>}
              {section.content.url && (
                <div className="certificate-link">
                  <a href={ensureHttps(section.content.url)} target="_blank" rel="noopener noreferrer">
                    View Certificate
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="paginated-resume" ref={contentRef}>
      {/* Hidden element for measuring section heights */}
      <div 
        ref={measureRef}
        className="measurement-container"
        style={{ 
          position: 'absolute', 
          visibility: 'hidden', 
          width: `${PAGE_WIDTH - (PAGE_PADDING * 2)}px`,
          left: '-9999px'
        }}
      ></div>
      
      {/* Render paginated content */}
      {pages.map((page, pageIndex) => (
        <div 
          key={`page-${pageIndex}`}
          className="resume-page"
          style={{
            width: `${PAGE_WIDTH}px`,
            minHeight: `${PAGE_HEIGHT}px`,
            padding: `${PAGE_PADDING}px`,
            marginBottom: '30px' // Space between pages on screen
          }}
        >
          {/* Page header for continuation pages */}
          {pageIndex > 0 && (
            <div className="page-continuation">
              <p>{personalInfo?.name || 'Resume'} (Page {pageIndex + 1})</p>
            </div>
          )}
          
          {/* Page content */}
          {page.map(section => renderSection(section))}
        </div>
      ))}
    </div>
  );
}