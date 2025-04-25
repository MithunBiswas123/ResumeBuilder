"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaAward,
  FaCertificate,
  FaBriefcase,
  FaGraduationCap,
  FaLink,
  FaCalendarAlt,
  FaStar
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Contrast({ resumeData }) {
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
    <div className="bg-white w-full h-full font-sans text-gray-800 flex flex-col md:flex-row">
      {/* Left Sidebar - Black Background */}
      <div className="w-full md:w-1/3 bg-gray-900 text-white p-6 md:p-8">
        {/* Name and Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {personalInfo?.name || "Your Name"}
          </h1>
          {personalInfo?.title && (
            <p className="text-gray-400 mt-1 text-lg">
              {personalInfo.title}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold text-gray-300">
            Contact
          </h2>
          
          <div className="space-y-3 text-sm">
            {personalInfo?.email && (
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-gray-400" />
                <span className="text-gray-300">{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo?.phone && (
              <div className="flex items-center">
                <FaPhone className="mr-3 text-gray-400" />
                <span className="text-gray-300">{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo?.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-gray-400" />
                <span className="text-gray-300">{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <FaLinkedin className="mr-3 text-gray-400" />
                <span>LinkedIn</span>
              </a>
            )}
            
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <FaGithub className="mr-3 text-gray-400" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Education Section */}
        {education?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold text-gray-300">
              Education
            </h2>
            
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium">{edu.degree}</h3>
                  <p className="text-gray-400 text-sm">{edu.school}</p>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <FaCalendarAlt className="mr-1" />
                    <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {certificates?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold text-gray-300">
              Certifications
            </h2>
            
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium text-sm">{cert.name}</h3>
                  <p className="text-gray-400 text-xs">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Section */}
        {achievements?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold text-gray-300">
              Achievements
            </h2>
            
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium">{achievement.title}</h3>
                  {achievement.organization && (
                    <p className="text-gray-400 text-sm">{achievement.organization}</p>
                  )}
                  {achievement.date && (
                    <p className="text-gray-500 text-xs">{achievement.date}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content - White Background */}
      <div className="w-full md:w-2/3 p-6 md:p-8">
        {/* About Me / Summary */}
        {personalInfo?.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3 pb-2 border-b-2 border-gray-200 text-black">
              ABOUT ME
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Skills Section - Now on right side */}
        {skills?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-gray-200 text-black">
              SKILLS
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-gray-200 text-black">
              EXPERIENCE
            </h2>
            
            <div className="space-y-5">
              {experience.map((job, index) => (
                <div key={index} className="pl-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="font-bold text-gray-900">
                      {job.position || job.title}
                    </h3>
                    <span className="text-gray-500 text-sm mt-1 sm:mt-0">
                      {job.startDate} - {job.endDate || "Present"}
                    </span>
                  </div>
                  
                  <p className="font-medium text-gray-700 text-sm mt-1">
                    {job.company}
                    {job.location && <span className="text-gray-600"> • {job.location}</span>}
                  </p>
                  
                  <p className="mt-2 text-gray-600 text-sm">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-gray-200 text-black">
              PROJECTS
            </h2>
            
            <div className="space-y-5">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900">{project.title}</h3>
                    
                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-black transition-colors"
                      >
                        <FaLink />
                      </a>
                    )}
                  </div>
                  
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 my-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-sm">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}