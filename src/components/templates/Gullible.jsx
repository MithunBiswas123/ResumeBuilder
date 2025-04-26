"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaAward,
  FaStar,
  FaCode,
  FaLink,
  FaCalendarAlt,
  FaChevronRight
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Horizon({ resumeData }) {
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
      {/* Header with name and title */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 right-0 h-40 bg-teal-600"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)"
          }}
        />
        <div 
          className="absolute top-0 left-0 right-0 h-40 bg-teal-500 opacity-80"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 90%)"
          }}
        />
        
        {/* Header content */}
        <div className="relative z-10 px-8 pt-10 pb-10">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            {personalInfo?.name || "Your Name"}
          </h1>
          
          {personalInfo?.title && (
            <p className="text-teal-100 text-xl mt-1 tracking-wider">
              {personalInfo.title}
            </p>
          )}
        </div>
      </div>

      {/* Two column layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left column (Sidebar) */}
        <div className="md:w-1/3 bg-gray-50 p-6">
          {/* Contact Info Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-teal-600 border-b border-teal-100 pb-2">
              Contact
            </h2>
            
            <div className="space-y-3">
              {personalInfo?.email && (
                <div className="flex items-center">
                  <FaEnvelope className="mr-3 text-teal-600" size={14} />
                  <span className="text-gray-700">{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo?.phone && (
                <div className="flex items-center">
                  <FaPhone className="mr-3 text-teal-600" size={14} />
                  <span className="text-gray-700">{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo?.location && (
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-teal-600" size={14} />
                  <span className="text-gray-700">{personalInfo.location}</span>
                </div>
              )}
              
              {personalInfo?.linkedin && (
                <a
                  href={ensureHttps(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-teal-600 transition-colors"
                >
                  <FaLinkedin className="mr-3 text-teal-600" size={14} />
                  <span>LinkedIn</span>
                </a>
              )}
              
              {personalInfo?.github && (
                <a
                  href={ensureHttps(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-teal-600 transition-colors"
                >
                  <FaGithub className="mr-3 text-teal-600" size={14} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </section>
          
          {/* Skills Section */}
          {skills?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-teal-600 border-b border-teal-100 pb-2">
                Skills
              </h2>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="px-3 py-1 bg-white border border-teal-100 text-gray-800 rounded-md shadow-sm text-sm mb-2"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Education Section */}
          {education?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-teal-600 border-b border-teal-100 pb-2">
                Education
              </h2>
              
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-teal-600 text-sm">{edu.school}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      <FaCalendarAlt className="inline mr-1" size={12} />
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                    {edu.description && (
                      <p className="text-gray-600 mt-2 text-sm">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Certificates Section */}
          {certificates?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4 text-teal-600 border-b border-teal-100 pb-2">
                Certifications
              </h2>
              
              <div className="space-y-3">
                {certificates.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-800 flex items-center">
                      <FaAward className="text-teal-500 mr-2" size={14} />
                      {cert.name}
                    </h3>
                    <p className="text-gray-700 text-sm ml-6">
                      {cert.issuer} • {cert.date}
                    </p>
                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-800 text-sm flex items-center ml-6 mt-1"
                      >
                        <span>View Certificate</span>
                        <FaChevronRight className="ml-1" size={10} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right column (Main content) */}
        <div className="md:w-2/3 p-6">
          {/* Profile/Summary Section */}
          {personalInfo?.summary && (
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-teal-600 border-b border-teal-100 pb-2">
                Profile
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </section>
          )}
          
          {/* Experience Section */}
          {experience?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-teal-600 border-b border-teal-100 pb-2">
                Experience
              </h2>
              
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-teal-600 before:rounded-full">
                    <div className="flex flex-col md:flex-row md:justify-between mb-1">
                      <h3 className="font-bold text-gray-900">
                        {job.position || job.title}
                      </h3>
                      <span className="text-teal-600 text-sm font-medium">
                        {job.startDate} — {job.endDate || "Present"}
                      </span>
                    </div>
                    
                    <p className="font-medium text-gray-700">
                      {job.company}
                      {job.location && <span className="text-gray-600"> • {job.location}</span>}
                    </p>
                    
                    <p className="text-gray-600 mt-2 text-sm">
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
              <h2 className="text-lg font-bold mb-4 text-teal-600 border-b border-teal-100 pb-2">
                Projects
              </h2>
              
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div 
                    key={index} 
                    className="p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{project.title}</h3>
                      {project.link && (
                        <a
                          href={ensureHttps(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-800 transition-colors"
                        >
                          <FaLink size={14} />
                        </a>
                      )}
                    </div>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.technologies.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded"
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
            <section>
              <h2 className="text-lg font-bold mb-4 text-teal-600 border-b border-teal-100 pb-2">
                Achievements
              </h2>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <h3 className="font-bold text-gray-800 flex items-center">
                      <FaStar className="text-teal-500 mr-2" size={14} />
                      {achievement.title}
                    </h3>
                    {achievement.organization && (
                      <p className="text-gray-700 text-sm ml-6">{achievement.organization}</p>
                    )}
                    {achievement.date && (
                      <p className="text-gray-500 text-xs ml-6 mt-1">{achievement.date}</p>
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