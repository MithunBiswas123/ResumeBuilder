"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate,
  FaCalendarAlt,
  FaExternalLinkAlt
} from "react-icons/fa";

export default function Elegant({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};

  // Helper function to ensure URLs are properly formatted
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="bg-white w-full h-full p-6 font-serif text-gray-800 max-w-[900px] mx-auto">
      {/* Simplified header */}
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-playfair tracking-wide text-gray-900">
          {personalInfo?.name || "Your Name"}
        </h1>

        {personalInfo?.title && (
          <p className="text-lg text-indigo-700 mt-1 font-raleway font-light">
            {personalInfo.title}
          </p>
        )}
      </header>

      {/* Two column layout with reduced gap */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar */}
        <div className="md:w-2/5 font-raleway">
          {/* Contact section - simplified */}
          <section className="mb-6">
            <h2 className="font-playfair text-base mb-3 text-indigo-800 border-b border-gray-200 pb-1">
              Contact
            </h2>

            <div className="space-y-2 text-sm">
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center text-gray-600 hover:text-indigo-700"
                >
                  <FaEnvelope className="text-indigo-700 mr-2" size={12} />
                  <span>{personalInfo.email}</span>
                </a>
              )}

              {personalInfo?.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center text-gray-600 hover:text-indigo-700"
                >
                  <FaPhone className="text-indigo-700 mr-2" size={12} />
                  <span>{personalInfo.phone}</span>
                </a>
              )}

              {personalInfo?.location && (
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="text-indigo-700 mr-2" size={12} />
                  <span>{personalInfo.location}</span>
                </div>
              )}

              {personalInfo?.linkedin && (
                <a
                  href={ensureHttps(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-indigo-700"
                >
                  <FaLinkedin className="text-indigo-700 mr-2" size={12} />
                  <span>LinkedIn</span>
                </a>
              )}

              {personalInfo?.github && (
                <a
                  href={ensureHttps(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-indigo-700"
                >
                  <FaGithub className="text-indigo-700 mr-2" size={12} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </section>

          {/* Education section - simplified */}
          {education?.length > 0 && (
            <section className="mb-6">
              <h2 className="font-playfair text-base mb-3 text-indigo-800 border-b border-gray-200 pb-1">
                Education
              </h2>

              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="pl-3 border-l-2 border-indigo-100">
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-indigo-700 text-sm">{edu.school}</p>
                    <p className="text-gray-500 text-xs flex items-center">
                      <FaCalendarAlt className="mr-1" size={10} />
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

         {/* Certificates Section - simplified */}
         {certificates?.length > 0 && (
            <section className="mb-6">
              <h2 className="font-playfair text-base mb-3 text-indigo-800 border-b border-gray-200 pb-1">
                Certifications
              </h2>

              <div className="space-y-3">
                {certificates.map((cert, index) => (
                  <div key={index} className="border-l-2 border-indigo-200 pl-3">
                    <h3 className="font-medium text-gray-900 text-sm">
                      {cert.name}
                    </h3>
                    <p className="text-gray-700 text-xs">
                      {cert.issuer}
                      {cert.date && <span className="text-gray-500 ml-2">{cert.date}</span>}
                    </p>

                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 text-xs hover:text-indigo-800 flex items-center mt-1"
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


          {/* Achievements - simplified */}
          {achievements?.length > 0 && (
            <section className="mb-6">
              <h2 className="font-playfair text-base mb-3 text-indigo-800 border-b border-gray-200 pb-1">
                Achievements
              </h2>

              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="border-l-2 border-indigo-100 pl-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-900">
                        {achievement.title}
                      </h3>
                      {achievement.date && (
                        <span className="text-gray-500 text-xs">
                          {achievement.date}
                        </span>
                      )}
                    </div>
                    
                    {achievement.organization && (
                      <p className="text-indigo-600 text-xs">
                        {achievement.organization}
                      </p>
                    )}
                    
                    {achievement.description && (
                      <p className="text-gray-600 text-xs mt-1">
                        {achievement.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Skills - simplified */}
          {(!resumeData.skillCategories ||
            resumeData.skillCategories.length === 0) &&
            resumeData.skills?.length > 0 && (
              <section className="mb-6">
                <h2 className="font-playfair text-base mb-3 text-indigo-800 border-b border-gray-200 pb-1">
                  Skills
                </h2>

                <div className="flex flex-wrap gap-1">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-50 text-indigo-800 text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
        </div>

        {/* Main content area */}
        <div className="md:w-3/5 font-raleway">
          {/* Summary - simplified */}
          {personalInfo?.summary && (
            <section className="mb-6">
              <h2 className="font-playfair text-base mb-3 text-indigo-800 border-b border-gray-200 pb-1">
                Summary
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience - simplified */}
          {experience?.length > 0 && (
            <section className="mb-6">
              <h2 className="font-playfair text-base mb-3 text-indigo-800 border-b border-gray-200 pb-1">
                Experience
              </h2>

              {experience.map((job, index) => (
                <div key={index} className="mb-5 pb-3 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {job.position || job.title}
                      </h3>
                      <p className="text-indigo-600 text-xs font-medium">
                        {job.company}
                        {job.location ? ` | ${job.location}` : ""}
                      </p>
                    </div>
                    <p className="text-gray-500 text-xs whitespace-nowrap">
                      {job.startDate} — {job.endDate || "Present"}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-2 text-xs">
                    {job.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Projects - simplified */}
          {projects?.length > 0 && (
            <section className="mb-6">
              <h2 className="font-playfair text-base mb-3 text-indigo-800 border-b border-gray-200 pb-1">
                Projects
              </h2>

              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="border-l-2 border-indigo-100 pl-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-900">
                        {project.title}
                      </h3>

                      {project.link && (
                        <a
                          href={ensureHttps(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <FaExternalLinkAlt size={12} />
                        </a>
                      )}
                    </div>

                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 my-1">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="text-xs text-indigo-700">
                            {tech}{idx < project.technologies.length - 1 ? "," : ""}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-gray-600 text-xs">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          

          {/* Skills Categories - simplified */}
          {resumeData.skillCategories?.length > 0 && (
            <section className="mb-6">
              <h2 className="font-playfair text-base mb-3 text-indigo-800 border-b border-gray-200 pb-1">
                Skills
              </h2>

              <div className="space-y-3">
                {resumeData.skillCategories.map(
                  (category, index) =>
                    category.skills.length > 0 && (
                      <div key={index} className="mb-2">
                        <h3 className="font-medium text-gray-900 text-xs">
                          {category.name || "General Skills"}:
                        </h3>

                        <div className="flex flex-wrap gap-1 mt-1">
                          {category.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-indigo-50 text-indigo-800 text-xs rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}