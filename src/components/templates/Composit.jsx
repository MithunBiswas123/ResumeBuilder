"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTrophy,
  FaCertificate,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaLink,
  FaCalendarAlt,
  FaCircle
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Composite({ resumeData }) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    achievements,
    certificates,
  } = resumeData || {};

  return (
    <div className="bg-white w-full h-full font-sans text-gray-800 p-6 md:p-10 max-w-[1000px] mx-auto">
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          {personalInfo?.name || "Your Name"}
        </h1>
        
        {personalInfo?.title && (
          <p className="text-center text-gray-600 text-lg mt-1">
            {personalInfo.title}
          </p>
        )}

        {/* Contact Information - Horizontal Layout */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm">
          {personalInfo?.email && (
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-blue-600" size={14} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo?.phone && (
            <div className="flex items-center">
              <FaPhone className="mr-2 text-blue-600" size={14} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo?.location && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-600" size={14} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo?.linkedin && (
            <a
              href={ensureHttps(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FaLinkedin className="mr-2 text-blue-600" size={14} />
              <span>LinkedIn</span>
            </a>
          )}
          
          {personalInfo?.github && (
            <a
              href={ensureHttps(personalInfo.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FaGithub className="mr-2 text-blue-600" size={14} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </header>
      
      <div className="border-t border-gray-200 pt-6">
        {/* Summary Section */}
        {personalInfo?.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-200 text-blue-700">
              Professional Summary
            </h2>
            <p className="text-gray-700">
              {personalInfo.summary}
            </p>
          </section>
        )}
        
        {/* Skills Section - Horizontal Layout */}
        {skills?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-200 text-blue-700">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
        
        {/* Experience Section */}
        {experience?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-200 text-blue-700">
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((job, index) => (
                <div key={index}>
                  <div className="flex flex-wrap justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">
                      {job.position || job.title}
                    </h3>
                    <div className="text-sm text-gray-600 flex items-center mt-1 md:mt-0">
                      <FaCalendarAlt className="mr-1" size={12} />
                      <span>{job.startDate} - {job.endDate || "Present"}</span>
                    </div>
                  </div>
                  
                  <p className="font-medium text-blue-600 text-sm">
                    {job.company}
                    {job.location && <span className="text-gray-600"> • {job.location}</span>}
                  </p>
                  
                  <p className="text-sm text-gray-700 mt-1">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects Section */}
        {projects?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-200 text-blue-700">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900">{project.title}</h3>
                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center ml-2"
                      >
                        <FaLink className="mr-1" size={12} />
                        <span>View Project</span>
                      </a>
                    )}
                  </div>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-x-3 mt-1">
                      {project.technologies.map((tech, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-600">
                          <FaCircle size={6} className="mr-1" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-700 mt-1">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education Section */}
        {education?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-200 text-blue-700">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex flex-wrap justify-between">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <div className="text-sm text-gray-600 flex items-center mt-1 md:mt-0">
                      <FaCalendarAlt className="mr-1" size={12} />
                      <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                    </div>
                  </div>
                  <p className="text-blue-600 text-sm">{edu.school}</p>
                  {edu.description && (
                    <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Two Column Section for Achievements and Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Achievements Section */}
          {achievements?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-200 text-blue-700">
                Achievements
              </h2>
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                    {achievement.organization && (
                      <p className="text-sm text-blue-600">{achievement.organization}</p>
                    )}
                    {achievement.date && (
                      <p className="text-xs text-gray-600">{achievement.date}</p>
                    )}
                    {achievement.description && (
                      <p className="text-sm text-gray-700 mt-1">{achievement.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {certificates?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-200 text-blue-700">
                Certifications
              </h2>
              <div className="space-y-2">
                {certificates.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-600">
                      {cert.issuer} | {cert.date}
                    </p>
                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-1"
                      >
                        <FaCertificate className="mr-1" size={12} />
                        <span>View Certificate</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}