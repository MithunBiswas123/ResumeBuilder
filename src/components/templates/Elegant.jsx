"use client";
import React from "react";
import { FaLinkedin, FaGithub, } from "react-icons/fa"; // Add this import

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

  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="bg-white w-full h-full font-serif text-gray-800 flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-50 border-b border-gray-200 p-8">
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
                <span>{personalInfo.email}</span>
              </div>
            )}

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

            {personalInfo?.phone && (
              <div className="mr-6 mb-2 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>{personalInfo.phone}</span>
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
        {/* Summary Section */}
        {personalInfo?.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* AI Insights Section */}
        {aiHighlights && (
          <section className="mb-8 bg-gray-50 p-6 border border-gray-200 rounded">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              AI Insights
            </h2>

            {aiHighlights.keySkills && (
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {aiHighlights.keySkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {aiHighlights.suggestions && (
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  Suggestions
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {aiHighlights.suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            {aiHighlights.customMessage && (
              <div className="italic text-gray-600 text-sm border-t border-gray-200 pt-2 mt-2">
                {aiHighlights.customMessage}
              </div>
            )}
          </section>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
              Professional Experience
            </h2>
            {experience.map((job, index) => (
              <div key={index} className="mb-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <h3 className="text-base font-medium text-gray-800">
                    {job.title || job.position}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {job.startDate} - {job.endDate || "Present"}
                  </span>
                </div>
                <p className="text-base text-blue-700 mb-2">
                  {job.company}
                  {job.location ? `, ${job.location}` : ""}
                </p>
                <p className="text-gray-700">{job.description}</p>
              </div>
            ))}
          </section>
        )}


            {/* Achievements Section */}
            {achievements?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
              Achievements
            </h2>
            {achievements.map((achievement, index) => (
              <div key={index} className="mb-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <h3 className="text-base font-medium text-gray-800">
                    {achievement.title}
                  </h3>
                  {achievement.date && (
                    <span className="text-sm text-gray-600">
                      {achievement.date}
                    </span>
                  )}
                </div>
                {achievement.organization && (
                  <p className="text-base text-blue-700 mb-2">
                    {achievement.organization}
                  </p>
                )}
                {achievement.description && (
                  <p className="text-gray-700">{achievement.description}</p>
                )}
              </div>
            ))}
          </section>
        )}



        {/* Skills Section */}
        {skills?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

         {/* Certificates Section */}
         {certificates?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
              Certifications
            </h2>
            {certificates.map((cert, index) => (
              <div key={index} className="mb-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <h3 className="text-base font-medium text-gray-800">
                    {cert.name}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {cert.date}
                    {cert.expiration && ` • Valid until ${cert.expiration}`}
                  </span>
                </div>
                <p className="text-base text-blue-700 mb-1">
                  {cert.issuer}
                  {cert.credentialID && (
                    <span className="text-sm text-gray-500 ml-2">
                      ID: {cert.credentialID}
                    </span>
                  )}
                </p>
                
                {cert.description && (
                  <p className="text-gray-700 text-sm mb-1">{cert.description}</p>
                )}
                
                {cert.url && (
                  <a
                    href={ensureHttps(cert.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-blue-700"
                  >
                    <FaCertificate className="mr-1 text-gray-500" />
                    <span>View Certificate</span>
                  </a>
                )}
                  </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                  <h3 className="text-base font-medium text-gray-800">
                    {edu.degree}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-base text-blue-700">
                  {edu.school}
                  {edu.location ? `, ${edu.location}` : ""}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Projects Section */}
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
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
