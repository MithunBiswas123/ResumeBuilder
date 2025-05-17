"use client";
import React from "react";
import { FaLinkedin, FaGithub, FaCertificate, FaExternalLinkAlt } from "react-icons/fa";

export default function Elegant({ resumeData }) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    achievements,
    aiHighlights,
    certificates,
  } = resumeData || {};

  // Enhanced URL handling with validation
  const ensureHttps = (url) => {
    if (!url) return "";
    
    // If URL already has http/https, return as is
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    
    // Handle LinkedIn special case - ensure it's a full URL
    if (url.includes("linkedin.com") || url.includes("in/")) {
      if (!url.includes("linkedin.com")) {
        // If only the username is provided
        return `https://linkedin.com/in/${url.replace(/^\/+|\/+$/g, '')}`;
      }
      return `https://${url.replace(/^\/+|\/+$/g, '')}`;
    }
    
    // Handle GitHub special case
    if (url.includes("github.com") || !url.includes(".")) {
      if (!url.includes("github.com")) {
        // If only the username is provided
        return `https://github.com/${url.replace(/^\/+|\/+$/g, '')}`;
      }
      return `https://${url.replace(/^\/+|\/+$/g, '')}`;
    }
    
    // Default case - add https
    return `https://${url.replace(/^\/+|\/+$/g, '')}`;
  };

  return (
    <div className="bg-white w-full h-full font-serif text-gray-800 flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-normal text-gray-800">
                {personalInfo?.name || "Your Name"}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {personalInfo?.title || "Professional Title"}
              </p>
            </div>

            {personalInfo?.profileImage && (
              <div className="hidden md:block">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap text-sm text-gray-600">
            {personalInfo?.email && (
              <div className="mr-6 mb-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-700 transition-colors">
                  {personalInfo.email}
                </a>
              </div>
            )}

            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-700 mr-6 mb-2 transition-colors"
              >
                <FaLinkedin className="w-4 h-4 mr-2 text-gray-500" />
                <span>LinkedIn</span>
              </a>
            )}

            {/* GitHub link with proper icon */}
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-700 mr-6 mb-2 transition-colors"
              >
                <FaGithub className="w-4 h-4 mr-2 text-gray-500" />
                <span>GitHub</span>
              </a>
            )}

            {personalInfo?.phone && (
              <div className="mr-6 mb-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <a href={`tel:${personalInfo.phone}`} className="hover:text-blue-700 transition-colors">
                  {personalInfo.phone}
                </a>
              </div>
            )}

            {personalInfo?.location && (
              <div className="mr-6 mb-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-grow p-8 max-w-4xl mx-auto w-full">
        {/* Summary Section - added mb-3 class */}
        {personalInfo?.summary && (
          <section className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Rest of the sections - no changes needed */}
        {/* ... */}
        
        {/* Project links - fixed here */}
        {projects?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <h3 className="text-base font-medium text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    {project.description}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-200 rounded-md text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Improved project link with icon and transition */}
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-blue-700 mt-2 text-sm transition-colors"
                    >
                      <FaExternalLinkAlt className="mr-1 text-xs" />
                      <span>View Project</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Certificate links - fixed here */}
        {certificates?.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
              Certifications
            </h2>
            {certificates.map((cert, index) => (
              <div key={index} className="mb-5">
                {/* Certificate content... */}
                
                {cert.url && (
                  <a
                    href={ensureHttps(cert.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-blue-700 transition-colors"
                  >
                    <FaCertificate className="mr-1 text-gray-500" />
                    <span>View Certificate</span>
                  </a>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}