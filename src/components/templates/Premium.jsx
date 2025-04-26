"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate,
  FaStar,
  FaCalendarAlt,
  FaUserGraduate,
  FaBriefcase,
  FaCode,
  FaTrophy,
  FaTools
} from "react-icons/fa";

export default function PinkModern({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};

  // Helper function to ensure URLs are properly formatted
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="bg-white w-full h-full font-sans text-gray-800">
      {/* Pink header with profile image */}
      <header className="bg-gradient-to-r from-pink-400 to-pink-500 p-4 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-300 rounded-full -mr-20 -mt-10 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300 rounded-full -ml-10 -mb-10 opacity-20"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 relative z-10">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            {personalInfo?.profileImage ? (
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo?.name || "Profile"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-pink-200 flex items-center justify-center">
                <span className="text-pink-600 text-2xl font-bold">
                  {personalInfo?.name ? personalInfo.name.charAt(0) : "P"}
                </span>
              </div>
            )}
          </div>
          
          {/* Name and title */}
          <div>
            <h1 className="text-3xl font-bold">
              {personalInfo?.name || "Your Name"}
            </h1>
            {personalInfo?.title && (
              <p className="text-lg text-pink-100 mt-1">{personalInfo.title}</p>
            )}
            {/* Contact details */}
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              {personalInfo?.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center text-pink-100 hover:text-white">
                  <FaEnvelope className="mr-2" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo?.phone && (
                <a href={`tel:${personalInfo.phone}`} className="flex items-center text-pink-100 hover:text-white">
                  <FaPhone className="mr-2" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              {personalInfo?.location && (
                <div className="flex items-center text-pink-100">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Social links bar */}
      <div className="bg-gray-100 py-0 px-8 flex justify-center gap-6 border-b border-gray-200">
        {personalInfo?.linkedin && (
          <a
            href={ensureHttps(personalInfo.linkedin)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-pink-600"
          >
            <FaLinkedin className="mr-2" />
            <span>LinkedIn</span>
          </a>
        )}
        {personalInfo?.github && (
          <a
            href={ensureHttps(personalInfo.github)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-pink-600"
          >
            <FaGithub className="mr-2" />
            <span>GitHub</span>
          </a>
        )}
      </div>

      {/* Main content */}
      <div className="p-2">
        {/* Summary */}
        {personalInfo?.summary && (
          <section className="mb-2 bg-pink-50 p-2 rounded-lg border-l-4 border-pink-400">
            <h2 className="flex items-center text-lg font-semibold text-pink-700 mb-3">
              <FaStar className="mr-2" />
              Profile
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Two column layout */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left column */}
          <div className="md:w-2/3">
            {/* Experience */}
            {experience?.length > 0 && (
              <section className="mb-0">
                <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                  <FaBriefcase className="mr-2 text-pink-600" />
                  <span>Professional Experience</span>
                </h2>

                <div className="space-y-2">
                  {experience.map((job, index) => (
                    <div 
                      key={index} 
                      className="p-0 rounded-lg hover:bg-pink-50 transition-colors border border-gray-100"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {job.position || job.title}
                          </h3>
                          <p className="text-pink-600">
                            {job.company}
                            {job.location ? ` • ${job.location}` : ""}
                          </p>
                        </div>
                        <p className="flex items-center text-gray-500 whitespace-nowrap text-sm">
                          <FaCalendarAlt className="mr-2 text-pink-400" />
                          {job.startDate} — {job.endDate || "Present"}
                        </p>
                      </div>
                      <p className="text-gray-600 mt-2">{job.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

             {/* Skills section */}
             {resumeData.skillCategories?.length > 0 && (
              <section className="mb-8 bg-gray-50 p-4 rounded-lg">
                <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                  <FaTools className="mr-2 text-pink-600" />
                  <span>Skills</span>
                </h2>

                <div className="space-y-4">
                  {resumeData.skillCategories.map(
                    (category, index) =>
                      category.skills.length > 0 && (
                        <div key={index} className="mb-3">
                          <h3 className="font-medium text-gray-900 mb-2 text-sm bg-pink-100 inline-block px-2 py-1 rounded">
                            {category.name || "General Skills"}
                          </h3>

                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-white border border-pink-200 text-gray-700 text-sm rounded-full"
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
              <section className="mb-8">
                <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                  <FaCode className="mr-2 text-pink-600" />
                  <span>Projects</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-pink-200 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">
                          {project.title}
                        </h3>

                        {project.link && (
                          <a
                            href={ensureHttps(project.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 text-sm hover:text-pink-800"
                          >
                            View →
                          </a>
                        )}
                      </div>

                      {project.technologies && (
                        <div className="mb-2 flex flex-wrap gap-1">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-pink-100 text-pink-700 rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-gray-600 text-sm">{project.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            
          </div>

          {/* Right column */}
          <div className="md:w-1/3">
           

            {/* Fallback for older resumes without categories */}
            {(!resumeData.skillCategories ||
              resumeData.skillCategories.length === 0) &&
              resumeData.skills?.length > 0 && (
                <section className="mb-8 bg-gray-50 p-4 rounded-lg">
                  <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                    <FaTools className="mr-2 text-pink-600" />
                    <span>Skills</span>
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white border border-pink-200 text-gray-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

            {/* Education section */}
            {education?.length > 0 && (
              <section className="mb-8">
                <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                  <FaUserGraduate className="mr-2 text-pink-600" />
                  <span>Education</span>
                </h2>

                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="bg-gradient-to-r from-white to-pink-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                      <p className="text-pink-600">{edu.school}</p>
                      <p className="text-gray-500 text-sm flex items-center mt-1">
                        <FaCalendarAlt className="mr-2 text-pink-400" size={12} />
                        {edu.startDate} — {edu.endDate || "Present"}
                      </p>

                      {edu.description && (
                        <p className="text-gray-600 text-sm mt-2">
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
                <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                  <FaCertificate className="mr-2 text-pink-600" />
                  <span>Certifications</span>
                </h2>

                <div className="space-y-4">
                  {certificates.map((cert, index) => (
                    <div key={index} className="mb-3 border-l-2 border-pink-300 pl-4">
                      <h3 className="font-medium text-gray-800">
                        {cert.name}
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {cert.issuer}
                        {cert.credentialID && <span className="text-pink-500 text-xs ml-2">#{cert.credentialID}</span>}
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
                          className="text-pink-500 text-sm hover:text-pink-700 flex items-center mt-1"
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
              <section className="mb-8">
                <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                  <FaTrophy className="mr-2 text-pink-600" />
                  <span>Achievements</span>
                </h2>

                {achievements.map((achievement, index) => (
                  <div key={index} className="mb-4 bg-gradient-to-r from-white to-pink-50 p-4 rounded-lg border-l-4 border-pink-300">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {achievement.title}
                        </h3>
                        {achievement.organization && (
                          <p className="text-pink-600 text-sm">
                            {achievement.organization}
                          </p>
                        )}
                      </div>
                      {achievement.date && (
                        <p className="text-gray-500 whitespace-nowrap text-sm">
                          {achievement.date}
                        </p>
                      )}
                    </div>
                    {achievement.description && (
                      <p className="text-gray-600 mt-2 text-sm">{achievement.description}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}