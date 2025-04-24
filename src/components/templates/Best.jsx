"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate ,
} from "react-icons/fa";

export default function Best({ resumeData }) {
  const { personalInfo, experience, education, skills, projects ,achievements,certificates } =
    resumeData || {};

  // Helper function to ensure URLs are properly formatted
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="bg-white w-full h-full p-8 font-sans text-gray-800">
      {/* Header with minimal styling */}
      <header className="mb-8 border-l-4 border-gray-800 pl-6">
        <h1 className="text-4xl font-light tracking-tight">
          {personalInfo?.name || "Your Name"}
        </h1>

        {personalInfo?.title && (
          <p className="text-xl text-gray-600 mt-1">{personalInfo.title}</p>
        )}
      </header>

      {/* Two column layout */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left sidebar */}
        <div className="md:w-1/3">
          {/* Contact section */}
          <section className="mb-8">
            <h2 className="text-sm uppercase tracking-widest mb-4 text-gray-500 font-medium">
              Contact
            </h2>

            <div className="space-y-3">
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <FaEnvelope className="mr-3 text-gray-400" />
                  <span>{personalInfo.email}</span>
                </a>
              )}

              {personalInfo?.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <FaPhone className="mr-3 text-gray-400" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}

              {personalInfo?.location && (
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-3 text-gray-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}

            

              {/* LinkedIn link with proper icon */}
              {personalInfo?.linkedin && (
                <a
                  href={ensureHttps(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <FaLinkedin className="mr-3 text-gray-400" />
                  <span>LinkedIn</span>
                </a>
              )}

              {/* GitHub link with proper icon */}
              {personalInfo?.github && (
                <a
                  href={ensureHttps(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <FaGithub className="mr-3 text-gray-400" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </section>

          {/* Education section */}
          {education?.length > 0 && (
            <section>
              <h2 className="text-sm uppercase tracking-widest mb-4 text-gray-500 font-medium">
                Education
              </h2>

              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.school}</p>
                    <p className="text-gray-500 text-sm">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>

                    {edu.description && (
                      <p className="text-gray-600 text-sm mt-1">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

         {/* Certificates Section */}
         {certificates?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm uppercase tracking-widest mb-4 text-gray-500 font-medium">
                Certificates
              </h2>

              <div className="space-y-4">
                {certificates.map((cert, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-medium text-gray-800">
                      {cert.name}
                    </h3>
                    <p className="text-gray-700">
                      {cert.issuer}
                      {cert.credentialID && <span className="text-gray-500 text-xs ml-2">#{cert.credentialID}</span>}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {cert.date}
                      {cert.expiration && ` — ${cert.expiration}`}
                    </p>

                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-sm hover:text-gray-800 flex items-center mt-1"
                      >
                        <FaCertificate className="mr-1 text-gray-400" />
                        <span>View Certificate</span>
                      </a>
                    )}

                    {cert.description && (
                      <p className="text-gray-600 text-sm mt-1">
                        {cert.description}
                      </p>
                    )}
                  </div>
                ))}
                 </div>
            </section>
          )}


        </div>

        {/* Main content area */}
        <div className="md:w-2/3">
          {/* Summary */}
          {personalInfo?.summary && (
            <section className="mb-8">
              <h2 className="text-sm uppercase tracking-widest mb-4 text-gray-500 font-medium">
                Profile
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm uppercase tracking-widest mb-4 text-gray-500 font-medium">
                Experience
              </h2>

              {experience.map((job, index) => (
                <div key={index} className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {job.position || job.title}
                      </h3>
                      <p className="text-gray-700 mb-2">
                        {job.company}
                        {job.location ? `, ${job.location}` : ""}
                      </p>
                    </div>
                    <p className="text-gray-500 whitespace-nowrap">
                      {job.startDate} — {job.endDate || "Present"}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-2">{job.description}</p>
                </div>
              ))}
            </section>
          )}


           {/* Achievements */}
           {achievements?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm uppercase tracking-widest mb-4 text-gray-500 font-medium">
                Achievements
              </h2>

              {achievements.map((achievement, index) => (
                <div key={index} className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {achievement.title}
                      </h3>
                      {achievement.organization && (
                        <p className="text-gray-700 mb-2">
                          {achievement.organization}
                        </p>
                      )}
                    </div>
                    {achievement.date && (
                      <p className="text-gray-500 whitespace-nowrap">
                        {achievement.date}
                      </p>
                    )}
                  </div>
                  {achievement.description && (
                    <p className="text-gray-600 mt-2">{achievement.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm uppercase tracking-widest mb-4 text-gray-500 font-medium">
                Projects
              </h2>

              {projects.map((project, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {project.title}
                    </h3>

                    {/* {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-sm hover:text-gray-800"
                      >
                        View →
                      </a>
                    )} */}
                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-sm hover:text-gray-800"
                      >
                        View →
                      </a>
                    )}
                  </div>

                  {project.technologies && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs text-gray-500">
                          {tech}
                          {idx < project.technologies.length - 1 ? " • " : ""}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-600">{project.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills section with categories */}
          {resumeData.skillCategories?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide uppercase border-b border-gray-300 pb-1">
                Skills
              </h2>

              <div className="space-y-4 ">
                {resumeData.skillCategories.map(
                  (category, index) =>
                    category.skills.length > 0 && (
                      <div key={index} className="mb-3 flex flex-row">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {category.name || "General Skills"}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
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

          {/* Fallback for older resumes without categories */}
          {(!resumeData.skillCategories ||
            resumeData.skillCategories.length === 0) &&
            resumeData.skills?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide uppercase border-b border-gray-300 pb-1">
                  Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
        </div>
      </div>
    </div>
  );
}
