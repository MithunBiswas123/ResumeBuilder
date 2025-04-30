"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate,
  FaGraduationCap,
  FaBriefcase,
  FaLaptopCode,
  FaTrophy,
  FaTools
} from "react-icons/fa";

export default function Modern({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};

  // Helper function to ensure URLs are properly formatted
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="bg-white w-full h-full p-5 font-sans text-gray-800 max-w-[900px] mx-auto">
      {/* Header with profile image */}
      <header className="mb-5 flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* Profile Image */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-500 flex-shrink-0">
          {personalInfo?.profileImage ? (
            <img 
              src={personalInfo.profileImage} 
              alt={personalInfo?.name || "Profile"} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-green-100 flex items-center justify-center">
              <span className="text-green-700 text-xl font-bold">
                {personalInfo?.name ? personalInfo.name.charAt(0) : "R"}
              </span>
            </div>
          )}
        </div>

        {/* Name and Title */}
        <div className="text-center md:text-left md:flex-grow">
          <h1 className="text-2xl font-bold text-gray-900">
            {personalInfo?.name || "Your Name"}
          </h1>
          
          {personalInfo?.title && (
            <p className="text-base text-green-600 mt-1">
              {personalInfo.title}
            </p>
          )}

          {/* Contact details in header for better space usage */}
          <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-xs">
            {personalInfo?.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center text-gray-600 hover:text-green-700"
              >
                <FaEnvelope className="text-green-600 mr-1" size={12} />
                <span>{personalInfo.email}</span>
              </a>
            )}

            {personalInfo?.phone && (
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center text-gray-600 hover:text-green-700"
              >
                <FaPhone className="text-green-600 mr-1" size={12} />
                <span>{personalInfo.phone}</span>
              </a>
            )}

            {personalInfo?.location && (
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="text-green-600 mr-1" size={12} />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>

          {/* Social links */}
          <div className="mt-2 flex justify-center md:justify-start gap-2">
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-green-100 text-gray-700 p-1.5 rounded-full transition-colors"
                title="LinkedIn Profile"
              >
                <FaLinkedin size={14} />
              </a>
            )}

            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-green-100 text-gray-700 p-1.5 rounded-full transition-colors"
                title="GitHub Profile"
              >
                <FaGithub size={14} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Divider with unique design */}
      <div className="relative h-1 mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-lime-400"></div>
        <div className="absolute right-0 w-16 h-1 bg-yellow-400"></div>
      </div>

      {/* Summary - highlighted box */}
      {personalInfo?.summary && (
        <section className="mb-6 bg-gray-50 p-3 border-l-4 border-green-500 rounded-r-md">
          <p className="text-gray-700 leading-relaxed text-xs">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Two column layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column */}
        <div className="md:w-1/3">
          {/* Experience Section */}
          {experience?.length > 0 && (
            <section className="mb-6">
              <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
                <FaBriefcase className="text-green-600 mr-2" size={14} />
                <span>Experience</span>
              </h2>

              <div className="space-y-4">
                {experience.map((job, index) => (
                  <div key={index} className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-green-600 before:rounded-full">
                    <h3 className="font-medium text-gray-900 text-xs">
                      {job.position || job.title}
                    </h3>
                    <p className="text-green-700 text-xs font-medium">
                      {job.company}
                      {job.location ? ` • ${job.location}` : ""}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {job.startDate} — {job.endDate || "Present"}
                    </p>
                    <p className="text-gray-600 mt-1 text-xs">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education section */}
          {education?.length > 0 && (
            <section className="mb-6">
              <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
                <FaGraduationCap className="text-green-600 mr-2" size={14} />
                <span>Education</span>
              </h2>

              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-green-600 before:rounded-full">
                    <h3 className="font-medium text-gray-900 text-xs">{edu.degree}</h3>
                    <p className="text-green-700 text-xs">{edu.school}</p>
                    <p className="text-gray-500 text-xs">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certificates Section */}
          {certificates?.length > 0 && (
            <section className="mb-6">
              <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
                <FaCertificate className="text-green-600 mr-2" size={14} />
                <span>Certifications</span>
              </h2>

              <div className="space-y-3">
                {certificates.map((cert, index) => (
                  <div key={index} className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-green-600 before:rounded-full">
                    <h3 className="font-medium text-gray-900 text-xs">
                      {cert.name}
                    </h3>
                    <p className="text-gray-700 text-xs">
                      {cert.issuer}
                      <span className="text-gray-500 ml-1">({cert.date})</span>
                    </p>

                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 text-xs hover:text-green-800 flex items-center mt-0.5"
                      >
                        <FaCertificate className="mr-1" size={9} />
                        <span>View Certificate</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="md:w-2/3">
          {/* Skills with visual styling */}
          {(!resumeData.skillCategories ||
            resumeData.skillCategories.length === 0) &&
            resumeData.skills?.length > 0 && (
              <section className="mb-6">
                <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
                  <FaTools className="text-green-600 mr-2" size={14} />
                  <span>Skills</span>
                </h2>

                <div className="flex flex-wrap gap-1.5">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gradient-to-r from-green-50 to-lime-50 text-green-800 text-xs rounded-full border border-green-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

          {/* Skills Categories */}
          {resumeData.skillCategories?.length > 0 && (
            <section className="mb-6">
              <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
                <FaTools className="text-green-600 mr-2" size={14} />
                <span>Skills</span>
              </h2>

              <div className="space-y-3">
                {resumeData.skillCategories.map(
                  (category, index) =>
                    category.skills.length > 0 && (
                      <div key={index} className="mb-2">
                        <h3 className="font-medium text-gray-700 text-xs mb-1 bg-green-50 py-0.5 px-2 inline-block rounded">
                          {category.name || "General Skills"}
                        </h3>

                        <div className="flex flex-wrap gap-1.5 ml-1">
                          {category.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-gradient-to-r from-green-50 to-lime-50 text-green-800 text-xs rounded-full border border-green-100"
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

          {/* Projects */}
          {projects?.length > 0 && (
            <section className="mb-6">
              <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
                <FaLaptopCode className="text-green-600 mr-2" size={14} />
                <span>Projects</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projects.map((project, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-2.5 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-medium text-gray-900">
                        {project.title}
                      </h3>
                    </div>

                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 my-1.5">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="text-xs bg-white px-1.5 py-0.5 rounded text-green-700 border border-green-100">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-gray-600 text-xs">
                      {project.description}
                    </p>

                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 text-green-600 hover:text-green-800 text-xs inline-block"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {achievements?.length > 0 && (
            <section className="mb-6">
              <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
                <FaTrophy className="text-green-600 mr-2" size={14} />
                <span>Achievements</span>
              </h2>

              <div className="space-y-2.5">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-lime-50 p-2.5 rounded-lg">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-medium text-gray-900">
                        {achievement.title}
                      </h3>
                      {achievement.date && (
                        <span className="text-gray-500 text-xs bg-white px-1.5 py-0.5 rounded">
                          {achievement.date}
                        </span>
                      )}
                    </div>
                    
                    {achievement.organization && (
                      <p className="text-green-700 text-xs mt-0.5">
                        {achievement.organization}
                      </p>
                    )}
                    
                    {achievement.description && (
                      <p className="text-gray-600 text-xs mt-1.5">
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
    </div>
  );
}