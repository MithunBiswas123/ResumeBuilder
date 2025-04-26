"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate,
  FaCalendarAlt,
  FaBriefcase,
  FaLaptopCode,
  FaGraduationCap,
  FaAward,
  FaTools
} from "react-icons/fa";

export default function SimpleElegance({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};

  // Helper function to ensure URLs are properly formatted
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="bg-white w-full h-full font-sans text-gray-800">
      {/* Simple elegant header */}
      <header className="bg-gray-50 px-8 py-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image - with simple border */}
            {personalInfo?.profileImage && (
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                <img 
                  src={personalInfo.profileImage} 
                  alt={personalInfo?.name || "Profile"} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Name and title */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-light text-gray-900">
                {personalInfo?.name || "Your Name"}
              </h1>
              {personalInfo?.title && (
                <p className="text-lg text-gray-600 mt-1">
                  {personalInfo.title}
                </p>
              )}
              
              {/* Contact info - simplified layout */}
              <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                {personalInfo?.email && (
                  <a href={`mailto:${personalInfo.email}`} className="text-gray-600 hover:text-blue-600 flex items-center gap-2 text-sm">
                    <FaEnvelope />
                    <span>{personalInfo.email}</span>
                  </a>
                )}
                {personalInfo?.phone && (
                  <a href={`tel:${personalInfo.phone}`} className="text-gray-600 hover:text-blue-600 flex items-center gap-2 text-sm">
                    <FaPhone />
                    <span>{personalInfo.phone}</span>
                  </a>
                )}
                {personalInfo?.location && (
                  <div className="text-gray-600 flex items-center gap-2 text-sm">
                    <FaMapMarkerAlt />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo?.linkedin && (
                  <a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-blue-600 flex items-center gap-2 text-sm">
                    <FaLinkedin />
                    <span>LinkedIn</span>
                  </a>
                )}
                {personalInfo?.github && (
                  <a href={ensureHttps(personalInfo.github)} target="_blank" rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 flex items-center gap-2 text-sm">
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Summary */}
        {personalInfo?.summary && (
          <section className="mb-8">
            <div className="bg-gray-50 p-5 rounded-lg border-l-2 border-blue-400">
              <p className="text-gray-700">
                {personalInfo.summary}
              </p>
            </div>
          </section>
        )}

        {/* Two column layout for content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - wider */}
          <div className="md:w-2/3">
            {/* Experience */}
            {experience?.length > 0 && (
              <section className="mb-10">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <FaBriefcase className="text-blue-500" />
                  <span>Experience</span>
                </h2>
                
                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div key={index} className={`pb-6 ${index !== experience.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {job.position || job.title}
                          </h3>
                          <p className="text-blue-600">
                            {job.company}
                            {job.location ? ` · ${job.location}` : ""}
                          </p>
                        </div>
                        <p className="text-gray-500 text-sm whitespace-nowrap flex items-center gap-1 mt-1 md:mt-0">
                          <FaCalendarAlt size={12} />
                          <span>{job.startDate} — {job.endDate || "Present"}</span>
                        </p>
                      </div>
                      <p className="text-gray-600 mt-2 text-sm">{job.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}



             {/* Skills */}
             <section className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <FaTools className="text-blue-500" />
                <span>Skills</span>
              </h2>
              
              {resumeData.skillCategories?.length > 0 ? (
                <div className="space-y-4">
                  {resumeData.skillCategories.map(
                    (category, index) =>
                      category.skills.length > 0 && (
                        <div key={index} className="mb-2">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">
                            {category.name || "General Skills"}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                  )}
                </div>
              ) : (
                resumeData.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )
              )}
            </section>
            
            
            {/* Projects */}
            {projects?.length > 0 && (
              <section className="mb-10">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <FaLaptopCode className="text-blue-500" />
                  <span>Projects</span>
                </h2>
                
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <h3 className="font-medium text-gray-900">
                          {project.title}
                        </h3>
                        {project.link && (
                          <a
                            href={ensureHttps(project.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            View Project
                          </a>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mt-2">{project.description}</p>

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="px-2 py-1 bg-white text-gray-700 text-xs rounded border border-gray-200">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {/* Right column - narrower */}
          <div className="md:w-1/3">
            {/* Education */}
            {education?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <FaGraduationCap className="text-blue-500" />
                  <span>Education</span>
                </h2>
                
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="pb-4">
                      <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                      <p className="text-blue-600 text-sm">{edu.school}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        {edu.startDate} — {edu.endDate || "Present"}
                      </p>
                      {edu.description && (
                        <p className="text-gray-600 text-sm mt-1">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
           
            {/* Certifications */}
            {certificates?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <FaCertificate className="text-blue-500" />
                  <span>Certifications</span>
                </h2>
                
                <div className="space-y-3">
                  {certificates.map((cert, index) => (
                    <div key={index} className="mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {cert.name}
                      </h3>
                      <p className="text-gray-600 text-xs">
                        {cert.issuer}
                        {cert.date && <span className="ml-1">· {cert.date}</span>}
                      </p>
                      {cert.url && (
                        <a
                          href={ensureHttps(cert.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-xs inline-block mt-1"
                        >
                          View Certificate
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Achievements */}
            {achievements?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <FaAward className="text-blue-500" />
                  <span>Achievements</span>
                </h2>
                
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {achievement.title}
                      </h3>
                      {achievement.organization && (
                        <p className="text-blue-600 text-xs">
                          {achievement.organization}
                        </p>
                      )}
                      {achievement.date && (
                        <p className="text-gray-500 text-xs">
                          {achievement.date}
                        </p>
                      )}
                      {achievement.description && (
                        <p className="text-gray-600 text-xs mt-1">
                          {achievement.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      
      {/* Simple footer */}
      <footer className="bg-gray-50 py-4 border-t border-gray-100 text-center text-gray-500 text-xs">
        {personalInfo?.name || "Resume"} • {new Date().getFullYear()}
      </footer>
    </div>
  );
}