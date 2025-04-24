"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaCertificate,
  FaTrophy,
  FaUser,
} from "react-icons/fa";

export default function Stylish({ resumeData }) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    achievements,
    certificates,
  } = resumeData || {};

  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="bg-white w-full h-full font-sans text-gray-800 p-6 md:p-8">
      {/* Header with image and gradient accent */}
      <header className="mb-6">
        <div className="flex flex-wrap items-center mb-4">
          {/* Profile Image */}
          {personalInfo?.profileImage ? (
            <div className="mr-4 mb-3 md:mb-0">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-indigo-100 shadow-sm"
              />
            </div>
          ) : (
            <div className="mr-4 mb-3 md:mb-0 h-16 w-16 rounded-full bg-gradient-to-br from-indigo-50 to-blue-100 ring-2 ring-indigo-100 shadow-sm flex items-center justify-center">
              <FaUser className="text-indigo-400 text-xl" />
            </div>
          )}
          
          {/* Name and Title */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
              {personalInfo?.name || "Your Name"}
            </h1>
            <p className="text-indigo-600 text-sm font-medium">
              {personalInfo?.title || "Professional Title"}
            </p>
          </div>
        </div>
        
        {/* Accent Line */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mb-4"></div>
        
        {/* Contact row - Smaller icons with hover effects */}
        <div className="flex flex-wrap gap-5 text-sm">
          {personalInfo?.email && (
            <a href={`mailto:${personalInfo.email}`} 
               className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
              <span className="bg-indigo-50 p-1 rounded-full mr-1.5">
                <FaEnvelope className="h-2.5 w-2.5 text-indigo-500" />
              </span>
              <span>{personalInfo.email}</span>
            </a>
          )}
          
          {personalInfo?.phone && (
            <a href={`tel:${personalInfo.phone}`} 
               className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
              <span className="bg-indigo-50 p-1 rounded-full mr-1.5">
                <FaPhone className="h-2.5 w-2.5 text-indigo-500" />
              </span>
              <span>{personalInfo.phone}</span>
            </a>
          )}
          
          {personalInfo?.location && (
            <span className="flex items-center text-gray-600">
              <span className="bg-indigo-50 p-1 rounded-full mr-1.5">
                <FaMapMarkerAlt className="h-2.5 w-2.5 text-indigo-500" />
              </span>
              <span>{personalInfo.location}</span>
            </span>
          )}
          
          {personalInfo?.linkedin && (
            <a href={ensureHttps(personalInfo.linkedin)}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
              <span className="bg-indigo-50 p-1 rounded-full mr-1.5">
                <FaLinkedin className="h-2.5 w-2.5 text-indigo-500" />
              </span>
              <span>LinkedIn</span>
            </a>
          )}
          
          {personalInfo?.github && (
            <a href={ensureHttps(personalInfo.github)}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
              <span className="bg-indigo-50 p-1 rounded-full mr-1.5">
                <FaGithub className="h-2.5 w-2.5 text-indigo-500" />
              </span>
              <span>GitHub</span>
            </a>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="space-y-5">
        {/* Summary */}
        {personalInfo?.summary && (
          <section className="bg-gradient-to-r from-indigo-50 to-blue-50 p-3 rounded-md">
            <h2 className="text-base font-medium text-indigo-700 mb-2 flex items-center">
              <FaUser className="h-3 w-3 mr-1.5" />
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section>
            <h2 className="text-base font-medium text-indigo-700 mb-3 flex items-center border-b border-indigo-100 pb-1">
              <FaBriefcase className="h-3 w-3 mr-1.5" />
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm">
                    <h3 className="font-medium">{job.position || job.title}</h3>
                    <span className="text-gray-500 text-xs">
                      {job.startDate} — {job.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-indigo-600 font-medium">{job.company}
                    {job.location && <span className="text-gray-600 font-normal"> • {job.location}</span>}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two columns for skills and education on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Skills */}
          {skills?.length > 0 && (
            <section>
              <h2 className="text-base font-medium text-indigo-700 mb-3 flex items-center border-b border-indigo-100 pb-1">
                <FaCode className="h-3 w-3 mr-1.5" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section>
              <h2 className="text-base font-medium text-indigo-700 mb-3 flex items-center border-b border-indigo-100 pb-1">
                <FaGraduationCap className="h-3 w-3 mr-1.5" />
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-medium">{edu.degree}</h3>
                    <p className="text-sm text-indigo-600">{edu.school}</p>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                    {edu.description && (
                      <p className="text-xs text-gray-600 mt-1">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects?.length > 0 && (
          <section>
            <h2 className="text-base font-medium text-indigo-700 mb-3 flex items-center border-b border-indigo-100 pb-1">
              <FaCode className="h-3 w-3 mr-1.5" />
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={index} className="border-l-2 border-indigo-200 pl-3 hover:border-indigo-400 transition-colors">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">{project.title}</h3>
                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        View
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1 my-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs text-indigo-500">
                          {tech}{idx < project.technologies.length - 1 ? " • " : ""}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-600">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates and Achievements in a two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Achievements */}
          {achievements?.length > 0 && (
            <section>
              <h2 className="text-base font-medium text-indigo-700 mb-3 flex items-center border-b border-indigo-100 pb-1">
                <FaTrophy className="h-3 w-3 mr-1.5" />
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-r from-indigo-50 to-blue-50 p-2 rounded-md">
                    <div className="flex justify-between text-sm">
                      <h3 className="font-medium">{achievement.title}</h3>
                      {achievement.date && <span className="text-gray-500 text-xs">{achievement.date}</span>}
                    </div>
                    {achievement.organization && (
                      <p className="text-sm text-indigo-600">{achievement.organization}</p>
                    )}
                    {achievement.description && (
                      <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {certificates?.length > 0 && (
            <section>
              <h2 className="text-base font-medium text-indigo-700 mb-3 flex items-center border-b border-indigo-100 pb-1">
                <FaCertificate className="h-3 w-3 mr-1.5" />
                Certifications
              </h2>
              <div className="space-y-3">
                {certificates.map((cert, index) => (
                  <div key={index} className="bg-gradient-to-r from-indigo-50 to-blue-50 p-2 rounded-md">
                    <div className="flex justify-between text-sm">
                      <h3 className="font-medium">{cert.name}</h3>
                      <span className="text-gray-500 text-xs">
                        {cert.date}
                        {cert.expiration && ` • Valid until ${cert.expiration}`}
                      </span>
                    </div>
                    <p className="text-sm text-indigo-600">
                      {cert.issuer}
                      {cert.credentialID && (
                        <span className="text-xs text-gray-500 ml-1">
                          (ID: {cert.credentialID})
                        </span>
                      )}
                    </p>
                    {cert.description && (
                      <p className="text-xs text-gray-600 mt-1">{cert.description}</p>
                    )}
                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-800 inline-flex items-center mt-1"
                      >
                        <FaCertificate className="h-2 w-2 mr-1" />
                        View Certificate
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