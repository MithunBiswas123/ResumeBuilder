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
  FaCertificate,
  FaUser,
  FaStar,
} from "react-icons/fa";

export default function Executive({ resumeData }) {
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
    <div className="bg-stone-50 w-full h-full font-sans">
      {/* Header - With image on left side */}
      <header className="bg-stone-900 text-white py-8 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap items-center">
          {/* Profile Image - Now on the left */}
          <div className="mr-8 mb-4 md:mb-0">
            {personalInfo?.profileImage ? (
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md bg-white"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-stone-800 border-4 border-white shadow-md flex items-center justify-center text-amber-400 text-4xl">
                <FaUser />
              </div>
            )}
          </div>
          
          {/* Name and Title - Now on the right of image */}
          <div className="flex-grow">
            <h1 className="text-4xl font-light tracking-wider mb-1">
              {personalInfo?.name?.toUpperCase() || "YOUR NAME"}
            </h1>
            <p className="text-amber-400 text-xl tracking-wide">
              {personalInfo?.title || "Professional Title"}
            </p>
          </div>
        </div>
      </header>

      {/* Contact Info Bar */}
      <div className="bg-stone-100 py-4 px-8 flex flex-wrap justify-center border-b border-stone-200">
        <div className="flex flex-wrap gap-6 justify-center md:justify-start max-w-7xl mx-auto">
          {personalInfo?.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center text-stone-700 hover:text-amber-600 transition-colors"
            >
              <FaEnvelope className="mr-2" />
              <span>{personalInfo.email}</span>
            </a>
          )}

          {personalInfo?.phone && (
            <a
              href={`tel:${personalInfo.phone}`}
              className="flex items-center text-stone-700 hover:text-amber-600 transition-colors"
            >
              <FaPhone className="mr-2" />
              <span>{personalInfo.phone}</span>
            </a>
          )}

          {personalInfo?.location && (
            <div className="flex items-center text-stone-700">
              <FaMapMarkerAlt className="mr-2" />
              <span>{personalInfo.location}</span>
            </div>
          )}

          {personalInfo?.linkedin && (
            <a
              href={ensureHttps(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-stone-700 hover:text-amber-600 transition-colors"
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
              className="flex items-center text-stone-700 hover:text-amber-600 transition-colors"
            >
              <FaGithub className="mr-2" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Summary - Top section, full width with elegant styling */}
        {personalInfo?.summary && (
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center mr-3">
                <FaUser className="text-amber-600" />
              </div>
              <h2 className="text-2xl text-stone-800 font-light tracking-wide">
                PROFESSIONAL SUMMARY
              </h2>
            </div>
            <div className="pl-14">
              <p className="text-stone-700 leading-relaxed border-l-2 border-amber-400 pl-5 py-1 italic">
                {personalInfo.summary}
              </p>
            </div>
          </section>
        )}

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column - Skills, Education, Certificates */}
          <div className="md:col-span-1">
            {/* Skills Section */}
            {skills?.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center mr-3">
                    <FaStar className="text-amber-600" />
                  </div>
                  <h2 className="text-2xl text-stone-800 font-light tracking-wide">
                    SKILLS
                  </h2>
                </div>
                <div className="pl-14">
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-stone-200 text-stone-800 rounded-md text-sm hover:bg-amber-100 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Education Section */}
            {education?.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center mr-3">
                    <FaGraduationCap className="text-amber-600" />
                  </div>
                  <h2 className="text-2xl text-stone-800 font-light tracking-wide">
                    EDUCATION
                  </h2>
                </div>
                <div className="pl-14 space-y-5">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-stone-300 pl-4 py-1">
                      <h3 className="text-lg font-medium text-stone-800">
                        {edu.degree}
                      </h3>
                      <p className="text-amber-700 font-medium">{edu.school}</p>
                      <p className="text-stone-600 text-sm">
                        {edu.startDate} — {edu.endDate || "Present"}
                      </p>
                      {edu.location && (
                        <p className="text-stone-600 text-sm italic">
                          {edu.location}
                        </p>
                      )}
                      {edu.description && (
                        <p className="text-stone-700 text-sm mt-1">
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
              <section className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center mr-3">
                    <FaCertificate className="text-amber-600" />
                  </div>
                  <h2 className="text-2xl text-stone-800 font-light tracking-wide">
                    CERTIFICATIONS
                  </h2>
                </div>
                <div className="pl-14 space-y-5">
                  {certificates.map((cert, index) => (
                    <div key={index} className="border-l-2 border-stone-300 pl-4 py-1">
                      <h3 className="text-lg font-medium text-stone-800">
                        {cert.name}
                      </h3>
                      <p className="text-amber-700 font-medium">
                        {cert.issuer}
                        {cert.credentialID && (
                          <span className="text-stone-500 text-sm ml-2">
                            ID: {cert.credentialID}
                          </span>
                        )}
                      </p>
                      <p className="text-stone-600 text-sm">
                        {cert.date}
                        {cert.expiration && ` • Valid until ${cert.expiration}`}
                      </p>
                      {cert.description && (
                        <p className="text-stone-700 text-sm mt-1">
                          {cert.description}
                        </p>
                      )}
                      {cert.url && (
                        <a
                          href={ensureHttps(cert.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-amber-700 hover:text-amber-800 text-sm mt-1"
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
          </div>

          {/* Right Column - Experience, Achievements, Projects */}
          <div className="md:col-span-2">
            {/* Experience Section */}
            {experience?.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center mr-3">
                    <FaBriefcase className="text-amber-600" />
                  </div>
                  <h2 className="text-2xl text-stone-800 font-light tracking-wide">
                    PROFESSIONAL EXPERIENCE
                  </h2>
                </div>
                <div className="pl-14 space-y-8">
                  {experience.map((job, index) => (
                    <div key={index} className="relative">
                      <div className="flex flex-col md:flex-row md:justify-between mb-2 border-b border-stone-200 pb-2">
                        <h3 className="text-xl font-semibold text-stone-800">
                          {job.position || job.title}
                        </h3>
                        <p className="text-amber-600 font-medium">
                          {job.startDate} — {job.endDate || "Present"}
                        </p>
                      </div>
                      <p className="text-amber-800 font-medium mb-2">
                        {job.company}
                        {job.location ? ` • ${job.location}` : ""}
                      </p>
                      <p className="text-stone-700">{job.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements Section */}
            {achievements?.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center mr-3">
                    <FaTrophy className="text-amber-600" />
                  </div>
                  <h2 className="text-2xl text-stone-800 font-light tracking-wide">
                    KEY ACHIEVEMENTS
                  </h2>
                </div>
                <div className="pl-14 space-y-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="relative">
                      <div className="flex flex-col md:flex-row md:justify-between mb-1">
                        <h3 className="text-lg font-semibold text-stone-800">
                          {achievement.title}
                        </h3>
                        {achievement.date && (
                          <p className="text-amber-600 text-sm">
                            {achievement.date}
                          </p>
                        )}
                      </div>
                      {achievement.organization && (
                        <p className="text-amber-800 font-medium mb-1">
                          {achievement.organization}
                        </p>
                      )}
                      {achievement.description && (
                        <p className="text-stone-700">
                          {achievement.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {projects?.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center mr-3">
                    <FaCode className="text-amber-600" />
                  </div>
                  <h2 className="text-2xl text-stone-800 font-light tracking-wide">
                    PROJECTS
                  </h2>
                </div>
                <div className="pl-14 space-y-6">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg border-l-4 border-amber-400 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-stone-800">
                          {project.title}
                        </h3>
                        {project.link && (
                          <a
                            href={ensureHttps(project.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-600 hover:text-amber-800"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <div className="mb-3 flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-stone-100 text-stone-700 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      <p className="text-stone-700">{project.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}