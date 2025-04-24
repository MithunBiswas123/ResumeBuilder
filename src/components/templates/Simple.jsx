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

export default function Simple({ resumeData }) {
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
      {/* Header - Simple with smaller text */}
      <header className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {personalInfo?.name || "Your Name"}
        </h1>
        <p className="text-gray-600 text-sm">
          {personalInfo?.title || "Professional Title"}
        </p>
        
        {/* Contact row - Smaller icons */}
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          {personalInfo?.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center text-gray-600 hover:text-blue-600">
              <FaEnvelope className="h-3 w-3 mr-1" />
              <span>{personalInfo.email}</span>
            </a>
          )}
          
          {personalInfo?.phone && (
            <a href={`tel:${personalInfo.phone}`} className="flex items-center text-gray-600 hover:text-blue-600">
              <FaPhone className="h-3 w-3 mr-1" />
              <span>{personalInfo.phone}</span>
            </a>
          )}
          
          {personalInfo?.location && (
            <span className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="h-3 w-3 mr-1" />
              <span>{personalInfo.location}</span>
            </span>
          )}
          
          {personalInfo?.linkedin && (
            <a 
              href={ensureHttps(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <FaLinkedin className="h-3 w-3 mr-1" />
              <span>LinkedIn</span>
            </a>
          )}
          
          {personalInfo?.github && (
            <a 
              href={ensureHttps(personalInfo.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <FaGithub className="h-3 w-3 mr-1" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="space-y-5">
        {/* Summary */}
        {personalInfo?.summary && (
          <section>
            <h2 className="text-base font-medium text-gray-900 mb-2 flex items-center">
              <FaUser className="h-3 w-3 mr-1 text-gray-500" />
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section>
            <h2 className="text-base font-medium text-gray-900 mb-2 flex items-center">
              <FaBriefcase className="h-3 w-3 mr-1 text-gray-500" />
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm">
                    <h3 className="font-medium">{job.position || job.title}</h3>
                    <span className="text-gray-600">
                      {job.startDate} — {job.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{job.company}
                    {job.location && <span className="text-gray-600"> • {job.location}</span>}
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
              <h2 className="text-base font-medium text-gray-900 mb-2 flex items-center">
                <FaCode className="h-3 w-3 mr-1 text-gray-500" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
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
              <h2 className="text-base font-medium text-gray-900 mb-2 flex items-center">
                <FaGraduationCap className="h-3 w-3 mr-1 text-gray-500" />
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-medium">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">{edu.school}</p>
                    <p className="text-xs text-gray-600">
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
            <h2 className="text-base font-medium text-gray-900 mb-2 flex items-center">
              <FaCode className="h-3 w-3 mr-1 text-gray-500" />
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-3">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">{project.title}</h3>
                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1 my-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs text-gray-500">
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

        {/* Achievements */}
        {achievements?.length > 0 && (
          <section>
            <h2 className="text-base font-medium text-gray-900 mb-2 flex items-center">
              <FaTrophy className="h-3 w-3 mr-1 text-gray-500" />
              Achievements
            </h2>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm">
                    <h3 className="font-medium">{achievement.title}</h3>
                    {achievement.date && <span className="text-gray-600">{achievement.date}</span>}
                  </div>
                  {achievement.organization && (
                    <p className="text-sm text-gray-700">{achievement.organization}</p>
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
            <h2 className="text-base font-medium text-gray-900 mb-2 flex items-center">
              <FaCertificate className="h-3 w-3 mr-1 text-gray-500" />
              Certifications
            </h2>
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm">
                    <h3 className="font-medium">{cert.name}</h3>
                    <span className="text-gray-600">
                      {cert.date}
                      {cert.expiration && ` • Valid until ${cert.expiration}`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
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
                      className="text-xs text-blue-600 hover:underline inline-flex items-center mt-1"
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
  );
}