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
  FaUser
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Duotone({ resumeData }) {
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
      {/* Left Sidebar - Light Pink */}
      <div className="w-full md:w-1/3 bg-pink-50 p-6 md:p-8">
        {/* Profile Section with Image */}
        <div className="text-center mb-8">
          {personalInfo?.profileImage ? (
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white object-cover shadow-md"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-pink-200 flex items-center justify-center border-4 border-white shadow-md">
              <FaUser className="text-pink-400 text-4xl" />
            </div>
          )}
          
          <h1 className="text-2xl font-bold text-gray-800">
            {personalInfo?.name || "Your Name"}
          </h1>
          
          {personalInfo?.title && (
            <p className="text-pink-600 mt-1 font-medium">
              {personalInfo.title}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-wider mb-4 border-b border-pink-200 pb-2 font-bold text-gray-700">
            Contact
          </h2>
          
          <div className="space-y-3 text-sm">
            {personalInfo?.email && (
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-pink-500" />
                <span className="text-gray-700">{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo?.phone && (
              <div className="flex items-center">
                <FaPhone className="mr-3 text-pink-500" />
                <span className="text-gray-700">{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo?.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-pink-500" />
                <span className="text-gray-700">{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-pink-600 transition-colors"
              >
                <FaLinkedin className="mr-3 text-pink-500" />
                <span>LinkedIn</span>
              </a>
            )}
            
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-pink-600 transition-colors"
              >
                <FaGithub className="mr-3 text-pink-500" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Education Section */}
        {education?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-wider mb-4 border-b border-pink-200 pb-2 font-bold text-gray-700">
              Education
            </h2>
            
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-pink-200 pl-3 py-1">
                  <h3 className="text-gray-800 font-medium">{edu.degree}</h3>
                  <p className="text-pink-600 text-sm">{edu.school}</p>
                  <div className="flex items-center text-gray-600 text-xs mt-1">
                    <FaCalendarAlt className="mr-1" size={10} />
                    <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        

        {/* Certifications Section */}
        {certificates?.length > 0 && (
          <div>
            <h2 className="text-sm uppercase tracking-wider mb-4 border-b border-pink-200 pb-2 font-bold text-gray-700">
              Certifications
            </h2>
            
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div key={index} className="border-l-2 border-pink-200 pl-3 py-1">
                  <h3 className="text-gray-800 font-medium text-sm">{cert.name}</h3>
                  <p className="text-gray-600 text-xs">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs">{cert.date}</p>
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
            <h2 className="text-xl font-bold mb-3 pb-2 border-b border-gray-200 text-gray-800">
              ABOUT ME
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-wider mb-4 border-b border-pink-200 pb-2 font-bold text-gray-700">
              Skills
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-white text-gray-700 text-xs rounded-full border border-pink-200 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 text-gray-800">
              EXPERIENCE
            </h2>
            
            <div className="space-y-5">
              {experience.map((job, index) => (
                <div key={index} className="relative pl-6 border-l border-pink-200">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-pink-400 -translate-x-1.5"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="font-bold text-gray-800">
                      {job.position || job.title}
                    </h3>
                    <span className="text-gray-500 text-sm mt-1 sm:mt-0">
                      {job.startDate} - {job.endDate || "Present"}
                    </span>
                  </div>
                  
                  <p className="font-medium text-pink-600 text-sm mt-1">
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
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 text-gray-800">
              PROJECTS
            </h2>
            
            <div className="space-y-5">
              {projects.map((project, index) => (
                <div key={index} className="relative pl-6 border-l border-pink-200">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-pink-400 -translate-x-1.5"></div>
                  
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800">{project.title}</h3>
                    
                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-700 transition-colors"
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
                          className="text-xs text-gray-600 bg-pink-50 px-2 py-0.5 rounded"
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

        {/* Achievements Section */}
        {achievements?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 text-gray-800">
              ACHIEVEMENTS
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 border border-gray-100 rounded-md hover:border-pink-200 transition-colors shadow-sm">
                  <h3 className="font-bold text-gray-800">{achievement.title}</h3>
                  {achievement.organization && (
                    <p className="text-pink-600 text-sm">
                      {achievement.organization}
                    </p>
                  )}
                  {achievement.date && (
                    <p className="text-gray-500 text-xs mt-1">
                      {achievement.date}
                    </p>
                  )}
                  {achievement.description && (
                    <p className="mt-1 text-gray-600 text-sm">
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
  );
}