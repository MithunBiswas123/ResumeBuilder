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
  FaRegDotCircle
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Elegant({ resumeData }) {
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
    <div className="bg-gray-50 w-full h-full font-serif text-gray-800 p-8 md:p-10 max-w-[1000px] mx-auto">
      {/* Header with elegant styling */}
      <header className="text-center mb-8 pb-6 border-b-2 border-gray-200">
        <h1 className="text-4xl font-light tracking-wide text-gray-800 mb-2">
          {personalInfo?.name || "Your Name"}
        </h1>
        
        {personalInfo?.title && (
          <p className="text-gray-600 text-lg font-light italic mb-4">
            {personalInfo.title}
          </p>
        )}

        {/* Elegant contact info layout */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm mt-4">
          {personalInfo?.email && (
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-purple-600" size={14} />
              <span className="text-gray-700">{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo?.phone && (
            <div className="flex items-center">
              <FaPhone className="mr-2 text-purple-600" size={14} />
              <span className="text-gray-700">{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo?.location && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-purple-600" size={14} />
              <span className="text-gray-700">{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo?.linkedin && (
            <a
              href={ensureHttps(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
            >
              <FaLinkedin className="mr-2 text-purple-600" size={14} />
              <span>LinkedIn</span>
            </a>
          )}
          
          {personalInfo?.github && (
            <a
              href={ensureHttps(personalInfo.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
            >
              <FaGithub className="mr-2 text-purple-600" size={14} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="md:col-span-8 space-y-6">
          {/* Summary */}
          {personalInfo?.summary && (
            <section>
              <h2 className="text-2xl font-normal text-purple-700 mb-3 pb-1 border-b border-purple-200 flex items-center">
                Profile
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </section>
          )}
          {/* Education - Now with the same styling as Experience */}
{education?.length > 0 && (
  <section>
    <h2 className="text-2xl font-normal text-purple-700 mb-4 pb-1 border-b border-purple-200 flex items-center">
      Education
    </h2>
    <div className="space-y-5">
      {education.map((edu, index) => (
        <div key={index} className="relative pl-6">
          <div className="absolute top-1 left-0 w-3 h-3 rounded-full border-2 border-purple-400 bg-white"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <h3 className="font-semibold text-lg text-gray-800">
              {edu.degree}
            </h3>
            <div className="text-sm text-gray-600 italic mt-1 sm:mt-0">
              {edu.startDate} — {edu.endDate || "Present"}
            </div>
          </div>
          
          <p className="font-medium text-purple-700 text-sm mb-2">
            {edu.school}
            {edu.location && <span className="text-gray-600"> • {edu.location}</span>}
          </p>
          
          {edu.description && (
            <p className="text-gray-700 leading-relaxed">
              {edu.description}
            </p>
          )}
        </div>
      ))}
    </div>
  </section>
)}
          
          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h2 className="text-2xl font-normal text-purple-700 mb-4 pb-1 border-b border-purple-200 flex items-center">
                Experience
              </h2>
              <div className="space-y-5">
                {experience.map((job, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute top-1 left-0 w-3 h-3 rounded-full border-2 border-purple-400 bg-white"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {job.position || job.title}
                      </h3>
                      <div className="text-sm text-gray-600 italic mt-1 sm:mt-0">
                        {job.startDate} — {job.endDate || "Present"}
                      </div>
                    </div>
                    
                    <p className="font-medium text-purple-700 text-sm mb-2">
                      {job.company}
                      {job.location && <span className="text-gray-600"> • {job.location}</span>}
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h2 className="text-2xl font-normal text-purple-700 mb-4 pb-1 border-b border-purple-200 flex items-center">
                Projects
              </h2>
              <div className="space-y-5">
                {projects.map((project, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute top-1 left-0 w-3 h-3 rounded-full border-2 border-purple-400 bg-white"></div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {project.title}
                      </h3>
                      {project.link && (
                        <a
                          href={ensureHttps(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 text-sm italic flex items-center"
                        >
                          <FaLink className="mr-1" size={12} />
                          <span>View</span>
                        </a>
                      )}
                    </div>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <p className="text-sm text-purple-600 mb-1">
                        {project.technologies.join(" • ")}
                      </p>
                    )}
                    
                    <p className="text-gray-700 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="md:col-span-4 space-y-6">
          {/* Skills */}
          {skills?.length > 0 && (
            <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-normal text-purple-700 mb-3 pb-2 border-b border-purple-100">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-purple-50 text-gray-700 text-sm rounded-md border border-purple-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
          
          {/* Education
          {education?.length > 0 && (
            <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-normal text-purple-700 mb-3 pb-2 border-b border-purple-100">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-800">
                      {edu.degree}
                    </h3>
                    <p className="text-purple-600 font-medium">
                      {edu.school}
                    </p>
                    <p className="text-gray-600 text-sm italic">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                    {edu.description && (
                      <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )} */}
          
          {/* Certifications */}
          {certificates?.length > 0 && (
            <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-normal text-purple-700 mb-3 pb-2 border-b border-purple-100">
                Certifications
              </h2>
              <div className="space-y-3">
                {certificates.map((cert, index) => (
                  <div key={index} className="pb-2 last:pb-0">
                    <h3 className="font-semibold text-gray-800">
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      <span className="italic">{cert.issuer}</span> • {cert.date}
                    </p>
                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-800 flex items-center mt-1"
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
          
          {/* Achievements */}
          {achievements?.length > 0 && (
            <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-normal text-purple-700 mb-3 pb-2 border-b border-purple-100">
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="pb-2 last:pb-0">
                    <h3 className="font-semibold text-gray-800">
                      {achievement.title}
                    </h3>
                    {achievement.organization && (
                      <p className="text-purple-600 text-sm">
                        {achievement.organization}
                      </p>
                    )}
                    {achievement.date && (
                      <p className="text-gray-600 text-sm italic">
                        {achievement.date}
                      </p>
                    )}
                    {achievement.description && (
                      <p className="text-gray-700 text-sm mt-1 leading-relaxed">
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
      
      {/* Footer with elegant styling */}
      <footer className="mt-10 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
        <p className="italic">References available upon request</p>
      </footer>
    </div>
  );
}