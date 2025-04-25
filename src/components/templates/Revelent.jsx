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
  FaHashtag
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Minimalist({ resumeData }) {
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
    <div className="bg-white w-full h-full font-sans text-gray-800 p-8 max-w-[1000px] mx-auto">
      {/* Header - Horizontal layout with name and contact info */}
      <header className="border-b-4 border-emerald-600 pb-4 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {personalInfo?.name || "Your Name"}
            </h1>
            {personalInfo?.title && (
              <p className="text-emerald-700 font-medium mt-1">
                {personalInfo.title}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-4 md:mt-0 text-sm">
            {personalInfo?.email && (
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-emerald-700" size={14} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center">
                <FaPhone className="mr-2 text-emerald-700" size={14} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-emerald-700" size={14} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-emerald-700 transition-colors"
              >
                <FaLinkedin className="mr-2 text-emerald-700" size={14} />
                <span>LinkedIn</span>
              </a>
            )}
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 hover:text-emerald-700 transition-colors"
              >
                <FaGithub className="mr-2 text-emerald-700" size={14} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2 col span for main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          {personalInfo?.summary && (
            <section>
              <h2 className="text-lg font-semibold text-emerald-700 mb-2 flex items-center">
                <div className="w-8 h-0.5 bg-emerald-600 mr-2"></div>
                Summary
              </h2>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
                <div className="w-8 h-0.5 bg-emerald-600 mr-2"></div>
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((job, index) => (
                  <div key={index} className="pl-3 border-l-2 border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <h3 className="font-bold">{job.position || job.title}</h3>
                      <div className="text-sm text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-1" size={12} />
                        <span>{job.startDate} - {job.endDate || "Present"}</span>
                      </div>
                    </div>
                    <p className="font-medium text-emerald-700 text-sm">
                      {job.company}
                      {job.location && <span className="text-gray-600"> • {job.location}</span>}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
                <div className="w-8 h-0.5 bg-emerald-600 mr-2"></div>
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="pl-3 border-l-2 border-gray-200">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{project.title}</h3>
                      {project.link && (
                        <a
                          href={ensureHttps(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:text-emerald-800 text-sm flex items-center ml-2"
                        >
                          <FaLink className="mr-1" size={12} />
                          <span>Link</span>
                        </a>
                      )}
                    </div>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <p className="text-xs text-emerald-700 mt-1 flex items-center">
                        <FaHashtag size={10} className="mr-1" />
                        {project.technologies.join(" · ")}
                      </p>
                    )}
                    
                    <p className="text-sm text-gray-600 mt-1">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - 1 col span for sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          {skills?.length > 0 && (
            <section className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
                <div className="w-5 h-0.5 bg-emerald-600 mr-2"></div>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-block px-2 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
                <div className="w-5 h-0.5 bg-emerald-600 mr-2"></div>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-emerald-700 text-sm">{edu.school}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaCalendarAlt className="mr-1" size={10} />
                      <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                    </p>
                    {edu.description && (
                      <p className="text-xs text-gray-600 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certificates?.length > 0 && (
            <section className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
                <div className="w-5 h-0.5 bg-emerald-600 mr-2"></div>
                Certifications
              </h2>
              <div className="space-y-2">
                {certificates.map((cert, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0 pb-2 last:pb-0">
                    <h3 className="font-medium text-sm">{cert.name}</h3>
                    <p className="text-xs text-gray-600">{cert.issuer} | {cert.date}</p>
                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-700 hover:text-emerald-800 flex items-center mt-1"
                      >
                        <FaCertificate className="mr-1" size={10} />
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
            <section className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
                <div className="w-5 h-0.5 bg-emerald-600 mr-2"></div>
                Achievements
              </h2>
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0 pb-2 last:pb-0">
                    <h3 className="font-medium text-sm">{achievement.title}</h3>
                    {achievement.organization && (
                      <p className="text-xs text-emerald-700">{achievement.organization}</p>
                    )}
                    {achievement.date && (
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    )}
                    {achievement.description && (
                      <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
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