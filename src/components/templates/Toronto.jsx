"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate,
  FaLightbulb,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaTrophy,
  FaChevronRight
} from "react-icons/fa";

export default function Modern({ resumeData }) {
  const { 
    personalInfo, 
    experience, 
    education, 
    skills, 
    projects, 
    achievements, 
    certificates 
  } = resumeData || {};

  // Helper function to ensure URLs are properly formatted
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="bg-gray-900 w-full h-full text-gray-100 font-sans p-0">
      {/* Header with accent color and asymmetric design - REDUCED SIZES */}
      <header className="relative bg-gradient-to-r from-teal-900 to-teal-700 py-8 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500 opacity-20 transform -skew-x-12"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-white">
            {personalInfo?.name || "Your Name"}
          </h1>
          
          {personalInfo?.title && (
            <p className="text-lg text-teal-100 mt-2 font-light">
              {personalInfo.title}
            </p>
          )}
          
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {personalInfo?.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center text-teal-100 hover:text-white transition-colors group">
                <span className="bg-teal-700 p-1.5 rounded-full group-hover:bg-teal-600 transition-colors">
                  <FaEnvelope className="text-xs" />
                </span>
                <span className="ml-1.5">{personalInfo.email}</span>
              </a>
            )}
            
            {personalInfo?.phone && (
              <a href={`tel:${personalInfo.phone}`} className="flex items-center text-teal-100 hover:text-white transition-colors group">
                <span className="bg-teal-700 p-1.5 rounded-full group-hover:bg-teal-600 transition-colors">
                  <FaPhone className="text-xs" />
                </span>
                <span className="ml-1.5">{personalInfo.phone}</span>
              </a>
            )}
            
            {personalInfo?.location && (
              <div className="flex items-center text-teal-100">
                <span className="bg-teal-700 p-1.5 rounded-full">
                  <FaMapMarkerAlt className="text-xs" />
                </span>
                <span className="ml-1.5">{personalInfo.location}</span>
              </div>
            )}

            {personalInfo?.linkedin && (
              <a 
                href={ensureHttps(personalInfo.linkedin)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-teal-100 hover:text-white transition-colors group"
              >
                <span className="bg-teal-700 p-1.5 rounded-full group-hover:bg-teal-600 transition-colors">
                  <FaLinkedin className="text-xs" />
                </span>
                <span className="ml-1.5">LinkedIn</span>
              </a>
            )}
            
            {personalInfo?.github && (
              <a 
                href={ensureHttps(personalInfo.github)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-teal-100 hover:text-white transition-colors group"
              >
                <span className="bg-teal-700 p-1.5 rounded-full group-hover:bg-teal-600 transition-colors">
                  <FaGithub className="text-xs" />
                </span>
                <span className="ml-1.5">GitHub</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main content with overlapping sections - REDUCED SIZES */}
      <main className="px-6 py-8 max-w-6xl mx-auto">
        {/* Summary */}
        {personalInfo?.summary && (
          <section className="mb-8 relative">
            <div className="absolute left-0 top-0 w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center text-sm">
              <FaLightbulb className="text-sm" />
            </div>
            <div className="ml-12">
              <h2 className="text-xl font-bold text-white mb-3">About Me</h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                {personalInfo.summary}
              </p>
            </div>
          </section>
        )}

        {/* Experience - with timeline design */}
        {experience?.length > 0 && (
          <section className="mb-8 relative">
            <div className="absolute left-0 top-0 w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center text-sm">
              <FaBriefcase className="text-sm" />
            </div>
            <div className="ml-12">
              <h2 className="text-xl font-bold text-white mb-4">Experience</h2>
              
              <div className="relative border-l-2 border-teal-800 pl-6">
                {experience.map((job, index) => (
                  <div key={index} className="mb-6 relative">
                    <div className="absolute -left-8 w-4 h-4 bg-teal-600 rounded-full border-3 border-gray-900"></div>
                    <div className="bg-gray-800 p-4 rounded-lg transform hover:-translate-y-1 transition-transform">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <div>
                          <h3 className="text-base font-bold text-white">
                            {job.position || job.title}
                          </h3>
                          <p className="text-teal-400 text-xs font-medium">
                            {job.company}
                            {job.location ? ` · ${job.location}` : ""}
                          </p>
                        </div>
                        <p className="text-gray-400 whitespace-nowrap bg-gray-700 px-2 py-0.5 rounded text-xs">
                          {job.startDate} — {job.endDate || "Present"}
                        </p>
                      </div>
                      <p className="text-gray-300 mt-2 text-xs">{job.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Two column layout for projects and achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Projects */}
          {projects?.length > 0 && (
            <section className="mb-8 relative">
              <div className="absolute left-0 top-0 w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center text-sm">
                <FaCode className="text-sm" />
              </div>
              <div className="ml-12">
                <h2 className="text-xl font-bold text-white mb-4">Projects</h2>
                
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-gray-800 p-3 rounded-lg border-l-3 border-teal-500">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-bold text-white">
                          {project.title}
                        </h3>
                        
                        {project.link && (
                          <a
                            href={ensureHttps(project.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-400 hover:text-teal-300 flex items-center text-xs"
                          >
                            View <FaChevronRight className="ml-0.5 text-xs" />
                          </a>
                        )}
                      </div>
                      
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 bg-gray-700 text-teal-300 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-gray-400 text-xs">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Achievements */}
          {achievements?.length > 0 && (
            <section className="mb-8 relative">
              <div className="absolute left-0 top-0 w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center text-sm">
                <FaTrophy className="text-sm" />
              </div>
              <div className="ml-12">
                <h2 className="text-xl font-bold text-white mb-4">Achievements</h2>
                
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="bg-gray-800 p-3 rounded-lg border-l-3 border-teal-500">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                        <h3 className="text-base font-bold text-white">
                          {achievement.title}
                        </h3>
                        {achievement.date && (
                          <span className="text-gray-400 text-xs bg-gray-700 px-2 py-0.5 rounded">
                            {achievement.date}
                          </span>
                        )}
                      </div>
                      
                      {achievement.organization && (
                        <p className="text-teal-400 text-xs font-medium">
                          {achievement.organization}
                        </p>
                      )}
                      
                      {achievement.description && (
                        <p className="text-gray-400 mt-1 text-xs">{achievement.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Three column bottom section for skills, certificates, and education */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Skills */}
          {skills?.length > 0 && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center">
                <span className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center text-xs mr-2">
                  <FaCode className="text-xs" />
                </span>
                Skills
              </h2>
              
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-gray-700 text-teal-300 text-xs rounded-full hover:bg-gray-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {certificates?.length > 0 && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center">
                <span className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center text-xs mr-2">
                  <FaCertificate className="text-xs" />
                </span>
                Certifications
              </h2>
              
              <div className="space-y-3">
                {certificates.map((cert, index) => (
                  <div key={index} className="border-b border-gray-700 pb-2 last:border-0">
                    <h3 className="font-bold text-white text-xs">
                      {cert.name}
                    </h3>
                    
                    <p className="text-teal-400 text-xs">
                      {cert.issuer}
                      {cert.credentialID && (
                        <span className="text-gray-500 text-xs ml-1">
                          #{cert.credentialID}
                        </span>
                      )}
                    </p>
                    
                    <p className="text-gray-400 text-xs">
                      {cert.date}
                      {cert.expiration && ` — ${cert.expiration}`}
                    </p>
                    
                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-400 hover:text-teal-300 text-xs flex items-center mt-1"
                      >
                        <FaCertificate className="mr-1 text-xs" />
                        <span>View</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center">
                <span className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center text-xs mr-2">
                  <FaGraduationCap className="text-xs" />
                </span>
                Education
              </h2>
              
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="border-b border-gray-700 pb-2 last:border-0">
                    <h3 className="font-bold text-white text-xs">{edu.degree}</h3>
                    <p className="text-teal-400 text-xs">{edu.school}</p>
                    <p className="text-gray-400 text-xs">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                    
                    {edu.description && (
                      <p className="text-gray-400 text-xs mt-1">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}