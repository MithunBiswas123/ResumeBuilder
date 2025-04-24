"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTrophy,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaCertificate ,
} from "react-icons/fa";

export default function Professional({ resumeData }) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    achievements,
    certificates,
  } = resumeData || {};

  // Helper function to ensure URLs are properly formatted
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="bg-white w-full h-full font-sans text-gray-800">
      {/* Header with profile image and contact info */}
      <header className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl mx-auto">
          {/* Profile Image */}
          <div className="md:mr-8 mb-6 md:mb-0">
            {personalInfo?.profileImage ? (
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-36 h-36 rounded-full bg-blue-100 border-4 border-white shadow-lg flex items-center justify-center text-blue-300 text-4xl">
                {personalInfo?.name?.charAt(0) || "P"}
              </div>
            )}
          </div>

          {/* Name, Title, and Contact */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {personalInfo?.name || "Your Name"}
            </h1>

            <p className="text-xl text-blue-700 mt-1 mb-4">
              {personalInfo?.title || "Professional Title"}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <FaEnvelope className="mr-2 text-blue-500" />
                  {personalInfo.email}
                </a>
              )}

              {personalInfo?.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <FaPhone className="mr-2 text-blue-500" />
                  {personalInfo.phone}
                </a>
              )}

              {personalInfo?.location && (
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  {personalInfo.location}
                </div>
              )}

              {personalInfo?.linkedin && (
                <a
                  href={ensureHttps(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-700"
                >
                  <FaLinkedin className="mr-2 text-blue-500" />
                  <span>LinkedIn</span>
                </a>
              )}

              {personalInfo?.github && (
                <a
                  href={ensureHttps(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-700"
                >
                  <FaGithub className="mr-2 text-blue-500" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-6xl mx-auto">
        {/* Summary */}
        {personalInfo?.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-200 pb-2 flex items-center">
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Column - Experience, Achievements, Projects */}
          <div className="md:col-span-2">
            {/* Experience */}
            {experience?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2 flex items-center">
                  <FaBriefcase className="mr-3 text-blue-500" />
                  Experience
                </h2>

                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-6 border-l-2 border-blue-100"
                    >
                      <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>

                      <div className="flex flex-col md:flex-row md:justify-between mb-1">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {job.position || job.title}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {job.startDate} — {job.endDate || "Present"}
                        </p>
                      </div>

                      <p className="text-blue-600 font-medium mb-2">
                        {job.company}
                        {job.location ? `, ${job.location}` : ""}
                      </p>

                      <p className="text-gray-700">{job.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements */}
            {achievements?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2 flex items-center">
                  <FaTrophy className="mr-3 text-blue-500" />
                  Achievements
                </h2>

                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex flex-col md:flex-row md:justify-between mb-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {achievement.title}
                        </h3>
                        {achievement.date && (
                          <p className="text-gray-600">{achievement.date}</p>
                        )}
                      </div>

                      {achievement.organization && (
                        <p className="text-blue-600 font-medium mb-1">
                          {achievement.organization}
                        </p>
                      )}

                      {achievement.description && (
                        <p className="text-gray-700">
                          {achievement.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2 flex items-center">
                  <FaCode className="mr-3 text-blue-500" />
                  Projects
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-5 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {project.title}
                        </h3>

                        {project.link && (
                          <a
                            href={ensureHttps(project.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                          >
                            View Project →
                          </a>
                        )}
                      </div>

                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <div className="mb-3 flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                      <p className="text-gray-700">{project.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Side Column - Education and Skills */}
          <div className="md:col-span-1">
            {/* Education */}
            {education?.length > 0 && (
              <section className="mb-8 bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2 flex items-center">
                  <FaGraduationCap className="mr-3 text-blue-500" />
                  Education
                </h2>

                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {edu.degree}
                      </h3>

                      <p className="text-blue-700 font-medium">{edu.school}</p>

                      <p className="text-gray-600 text-sm">
                        {edu.startDate} — {edu.endDate || "Present"}
                      </p>

                      {edu.location && (
                        <p className="text-gray-600 text-sm italic">
                          {edu.location}
                        </p>
                      )}

                      {edu.description && (
                        <p className="text-gray-700 text-sm mt-1">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* certificates */}

            {certificates?.length > 0 && (
              <section className="mb-8 bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2 flex items-center">
                  <FaCertificate className="mr-3 text-blue-500" />
                  Certifications
                </h2>

                <div className="space-y-4">
                  {certificates.map((cert, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {cert.name}
                      </h3>

                      <p className="text-blue-700 font-medium">
                        {cert.issuer}
                        {cert.credentialID && (
                          <span className="text-gray-500 text-sm ml-2">
                            ID: {cert.credentialID}
                          </span>
                        )}
                      </p>

                      <p className="text-gray-600 text-sm">
                        {cert.date}
                        {cert.expiration && ` • Valid until ${cert.expiration}`}
                      </p>

                      {cert.description && (
                        <p className="text-gray-700 text-sm mt-1">
                          {cert.description}
                        </p>
                      )}

                      {cert.url && (
                        <a
                          href={ensureHttps(cert.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mt-2"
                        >
                          <FaCertificate className="mr-1" />
                          <span>View Certificate</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
              <section className="mb-8 bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-white text-gray-800 rounded shadow-sm text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
