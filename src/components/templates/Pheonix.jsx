"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaCertificate,
  FaLink,
  FaCalendarAlt
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function CherryBlossom({ resumeData }) {
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
    <div className="bg-white w-full h-full font-sans text-gray-800 max-w-[1000px] mx-auto relative">
      {/* Simple Cherry Blossom colored top section */}
      <div className="bg-gradient-to-b from-pink-100 to-white p-8 pt-10">
        {/* Header with Name and Title */}
        <header className="text-center pb-6 relative">
          <h1 className="text-4xl font-bold tracking-wide text-gray-900">
            {personalInfo?.name || "Your Name"}
          </h1>
          
          {personalInfo?.title && (
            <p className="text-pink-600 text-xl font-light mt-1">
              {personalInfo.title}
            </p>
          )}

          {/* Contact Information - Horizontal Layout */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm">
            {personalInfo?.email && (
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-pink-600" size={14} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo?.phone && (
              <div className="flex items-center">
                <FaPhone className="mr-2 text-pink-600" size={14} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo?.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-pink-600" size={14} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-pink-600 transition-colors"
              >
                <FaLinkedin className="mr-2 text-pink-600" size={14} />
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
                <FaGithub className="mr-2 text-pink-600" size={14} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </header>
      </div>

      <div className="p-8 pt-6">
        {/* Main Content in Single Column */}
        <div className="space-y-6">
          {/* Summary */}
          {personalInfo?.summary && (
            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                <div className="w-6 h-0.5 bg-pink-500 mr-3"></div>
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </section>
          )}
          
          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                <div className="w-6 h-0.5 bg-pink-500 mr-3"></div>
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((job, index) => (
                  <div key={index} className="border-l-2 border-pink-100 pl-4 py-1 hover:border-pink-300 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <h3 className="font-bold text-gray-900">
                        {job.position || job.title}
                      </h3>
                      <span className="text-gray-500 text-sm mt-1 sm:mt-0">
                        {job.startDate} - {job.endDate || "Present"}
                      </span>
                    </div>
                    
                    <p className="font-medium text-pink-700 text-sm mt-1">
                      {job.company}
                      {job.location && <span className="text-gray-600"> • {job.location}</span>}
                    </p>
                    
                    <p className="text-gray-700 text-sm mt-2">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education */}
          {education?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                <div className="w-6 h-0.5 bg-pink-500 mr-3"></div>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-pink-100 pl-4 py-1 hover:border-pink-300 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <span className="text-gray-500 text-sm">
                        {edu.startDate} - {edu.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-pink-600 text-sm">{edu.school}</p>
                    {edu.description && (
                      <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Skills Section */}
          {skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                <div className="w-6 h-0.5 bg-pink-500 mr-3"></div>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-pink-50 text-gray-800 text-sm rounded border border-pink-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                <div className="w-6 h-0.5 bg-pink-500 mr-3"></div>
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="border-l-2 border-pink-100 pl-4 py-1 hover:border-pink-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900">{project.title}</h3>
                      {project.link && (
                        <a
                          href={ensureHttps(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-800 text-sm flex items-center"
                        >
                          <FaLink className="mr-1" size={12} />
                          <span>View</span>
                        </a>
                      )}
                    </div>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <p className="text-sm text-pink-600 mt-1">
                        {project.technologies.join(" • ")}
                      </p>
                    )}
                    
                    <p className="text-gray-700 text-sm mt-1">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Two Column Layout for Achievements and Certificates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Achievements */}
            {achievements?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                  <div className="w-6 h-0.5 bg-pink-500 mr-3"></div>
                  Achievements
                </h2>
                <div className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="border-l-2 border-pink-100 pl-4 py-1 hover:border-pink-300 transition-colors">
                      <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                      {achievement.organization && (
                        <p className="text-sm text-pink-600">{achievement.organization}</p>
                      )}
                      {achievement.date && (
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certificates?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                  <div className="w-6 h-0.5 bg-pink-500 mr-3"></div>
                  Certifications
                </h2>
                <div className="space-y-2">
                  {certificates.map((cert, index) => (
                    <div key={index} className="border-l-2 border-pink-100 pl-4 py-1 hover:border-pink-300 transition-colors">
                      <h3 className="font-bold text-gray-900">{cert.name}</h3>
                      <p className="text-sm text-gray-600">
                        {cert.issuer} • {cert.date}
                      </p>
                      {cert.url && (
                        <a
                          href={ensureHttps(cert.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-pink-600 hover:text-pink-800 flex items-center mt-1"
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
    </div>
  );
}