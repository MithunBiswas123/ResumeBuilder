"use client";

import React from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin,
  FaTrophy, FaCertificate, FaBriefcase, FaGraduationCap,
  FaLink
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function SinglePageTemplate({ resumeData }) {
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

  return (
    <div className="resume-container">
      {/* Header Section */}
      <header className="resume-header">
        {personalInfo?.profileImage && (
          <div className="profile-image">
            <img src={personalInfo.profileImage} alt={personalInfo?.name || "Profile"} />
          </div>
        )}
        <h1>{personalInfo?.name || "Your Name"}</h1>
        {personalInfo?.title && <p className="title">{personalInfo.title}</p>}
        
        <div className="contact-info">
          {personalInfo?.email && (
            <div className="contact-item">
              <FaEnvelope className="icon" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div className="contact-item">
              <FaPhone className="icon" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div className="contact-item">
              <FaMapMarkerAlt className="icon" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div className="contact-item">
              <FaLinkedin className="icon" />
              <a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo?.github && (
            <div className="contact-item">
              <FaGithub className="icon" />
              <a href={ensureHttps(personalInfo.github)} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="resume-content">
        {/* Summary Section */}
        {personalInfo?.summary && (
          <section className="summary-section">
            <h2>Professional Summary</h2>
            <div className="summary-content">
              <p>{personalInfo.summary}</p>
            </div>
          </section>
        )}
        
        {/* Skills Section */}
        {skillCategories?.length > 0 && (
          <section className="skills-section">
            <h2>Skills</h2>
            <div className="skills-content">
              {skillCategories.map((category, categoryIndex) => (
                <div key={`cat-${categoryIndex}`} className="skill-category">
                  <h3>{category.name || 'Skills'}</h3>
                  <div className="skill-list">
                    {category.skills.map((skill, skillIndex) => (
                      <span key={`skill-${categoryIndex}-${skillIndex}`} className="skill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Flat Skills List */}
        {!skillCategories?.length && skills?.length > 0 && (
          <section className="skills-section">
            <h2>Skills</h2>
            <div className="skills-content">
              <div className="skill-list">
                {skills.map((skill, index) => (
                  <span key={`skill-${index}`} className="skill">{skill}</span>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Experience Section */}
        {experience?.length > 0 && (
          <section className="experience-section">
            <h2>Professional Experience</h2>
            {experience.map((job, index) => (
              <div key={`experience-${index}`} className="experience-item">
                <div className="job-header">
                  <h3>{job.position || job.title || ''}</h3>
                  <div className="date-range">{job.startDate || ''} - {job.endDate || 'Present'}</div>
                </div>
                <div className="company">{job.company || ''} {job.location ? `- ${job.location}` : ''}</div>
                <p className="description">{job.description || ''}</p>
              </div>
            ))}
          </section>
        )}
        
        {/* Projects Section */}
        {projects?.length > 0 && (
          <section className="projects-section">
            <h2>Projects</h2>
            {projects.map((project, index) => (
              <div key={`project-${index}`} className="project-item">
                <h3>{project.title || ''}</h3>
                {project.technologies?.length > 0 && (
                  <div className="technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={`tech-${index}-${techIndex}`} className="tech">{tech}</span>
                    ))}
                  </div>
                )}
                <p className="description">{project.description || ''}</p>
                {project.link && (
                  <div className="project-link">
                    <FaLink className="icon-small" />
                    <a href={ensureHttps(project.link)} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
        
        {/* Education Section */}
        {education?.length > 0 && (
          <section className="education-section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={`education-${index}`} className="education-item">
                <div className="edu-header">
                  <h3>{edu.degree || ''}</h3>
                  <div className="date-range">{edu.startDate || ''} - {edu.endDate || 'Present'}</div>
                </div>
                <div className="school">{edu.school || ''} {edu.location ? `- ${edu.location}` : ''}</div>
                {edu.description && <p className="description">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}
        
        {/* Achievements Section */}
        {achievements?.length > 0 && (
          <section className="achievements-section">
            <h2>Achievements</h2>
            {achievements.map((achievement, index) => (
              <div key={`achievement-${index}`} className="achievement-item">
                <div className="achievement-header">
                  <h3>{achievement.title || ''}</h3>
                  {achievement.date && <div className="date">{achievement.date}</div>}
                </div>
                {achievement.organization && <div className="organization">{achievement.organization}</div>}
                {achievement.description && <p className="description">{achievement.description}</p>}
              </div>
            ))}
          </section>
        )}
        
        {/* Certificates Section */}
        {certificates?.length > 0 && (
          <section className="certificates-section">
            <h2>Certifications</h2>
            <div className="certificates-grid">
              {certificates.map((cert, index) => (
                <div key={`certificate-${index}`} className="certificate-item">
                  <div className="cert-header">
                    <h3>{cert.name || ''}</h3>
                    <div className="date">
                      {cert.date || ''}
                      {cert.expiration && ` - ${cert.expiration}`}
                    </div>
                  </div>
                  {cert.issuer && <div className="issuer">{cert.issuer}</div>}
                  {cert.credentialID && <div className="credential-id">ID: {cert.credentialID}</div>}
                  {cert.url && (
                    <div className="certificate-link">
                      <a href={ensureHttps(cert.url)} target="_blank" rel="noopener noreferrer">
                        <FaCertificate className="icon-small" /> View Certificate
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      
      {/* Inline CSS Styles */}
      <style jsx global>{`
        /* Reset and Base Styles */
        .resume-container {
          font-family: 'Arial', sans-serif;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          line-height: 1.4;
        }

        h1, h2, h3, h4, h5, h6 {
          margin: 0;
          font-weight: 600;
          color: #2d3748;
        }

        p {
          margin: 0 0 8px;
        }

        a {
          color: #3182ce;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        /* Header Styles */
        .resume-header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e2e8f0;
        }

        .resume-header h1 {
          font-size: 24px;
          margin-bottom: 5px;
          color: #1a202c;
        }

        .resume-header .title {
          font-size: 16px;
          color: #4a5568;
          margin-bottom: 12px;
        }

        .profile-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin: 0 auto 15px;
          overflow: hidden;
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .contact-info {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #4a5568;
        }

        .icon {
          margin-right: 6px;
          font-size: 14px;
          color: #4a5568;
        }

        .icon-small {
          font-size: 12px;
          margin-right: 4px;
        }

        /* Section Styles */
        section {
          margin-bottom: 20px;
        }

        section h2 {
          font-size: 18px;
          padding-bottom: 6px;
          margin-bottom: 10px;
          border-bottom: 1px solid #e2e8f0;
          color: #2d3748;
        }

        /* Summary Section */
        .summary-content {
          color: #4a5568;
          font-size: 15px;
        }

        /* Skills Section */
        .skills-content {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }

        .skill-category h3 {
          font-size: 15px;
          margin-bottom: 6px;
          color: #4a5568;
        }

        .skill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill {
          background-color: #f1f5f9;
          border-radius: 12px;
          padding: 4px 10px;
          font-size: 13px;
          color: #4a5568;
          display: inline-block;
        }

        /* Experience Section */
        .experience-item, .education-item, .project-item, .achievement-item {
          margin-bottom: 15px;
          page-break-inside: avoid;
        }

        .job-header, .edu-header, .achievement-header, .cert-header {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 3px;
        }

        .job-header h3, .edu-header h3, .project-item h3, .achievement-header h3, .cert-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #2d3748;
        }

        .date-range, .date {
          font-size: 14px;
          color: #718096;
        }

        .company, .school, .organization, .issuer {
          font-size: 14px;
          font-weight: 500;
          color: #4a5568;
          margin-bottom: 4px;
        }

        .description {
          font-size: 14px;
          color: #4a5568;
          margin-top: 4px;
        }

        /* Projects Section */
        .technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 5px;
          margin-bottom: 5px;
        }

        .tech {
          background-color: #e6f7ff;
          color: #0066cc;
          border-radius: 10px;
          padding: 2px 8px;
          font-size: 12px;
        }

        .project-link, .certificate-link {
          font-size: 13px;
          margin-top: 5px;
        }

        /* Certificates Section */
        .certificates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 15px;
        }

        .certificate-item {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
        }

        .credential-id {
          font-size: 12px;
          color: #718096;
          margin-top: 4px;
        }

        /* Print Styles */
        @media print {
          .resume-container {
            padding: 0;
            max-width: 100%;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          section {
            page-break-inside: avoid;
          }

          a {
            color: #2d3748;
            text-decoration: none;
          }
        }
      `}</style>
    </div>
  );
}