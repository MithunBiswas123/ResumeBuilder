"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaCalendar,
  FaCertificate ,
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Spectrum({ resumeData }) {
  const {
    personalInfo,
    experience,
    education,
    skillCategories,
    skills,
    projects,
    achievements,
    certificates,
  } = resumeData || {};

  // Generate a color based on name (for consistent color per user)
  const getAccentColor = () => {
    if (!personalInfo?.name) return "rgb(79, 70, 229)"; // Default indigo

    // Simple hash function to generate color from name
    let hash = 0;
    for (let i = 0; i < personalInfo.name.length; i++) {
      hash = personalInfo.name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate hue from 0-360 degrees
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 45%)`;
  };

  const accentColor = getAccentColor();

  return (
    <div className="bg-white w-full h-full font-sans text-gray-800 flex flex-col">
      {/* Header with colored accent */}
      <header
        style={{ borderTop: `5px solid ${accentColor}` }}
        className="pt-8 px-10"
      >
        <div className="flex justify-between items-start flex-wrap">
          <div className="mb-4">
            <h1 className="text-4xl font-bold tracking-tight">
              {personalInfo?.name || "Your Name"}
            </h1>
            {personalInfo?.title && (
              <p className="text-xl text-gray-600 mt-1">{personalInfo.title}</p>
            )}
          </div>

          {/* Contact information in a compact grid */}
          <div className="flex flex-col gap-1 text-sm">
            {personalInfo?.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 hover:text-gray-600"
              >
                <FaEnvelope style={{ color: accentColor }} />
                {personalInfo.email}
              </a>
            )}

            {personalInfo?.phone && (
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-2 hover:text-gray-600"
              >
                <FaPhone style={{ color: accentColor }} />
                {personalInfo.phone}
              </a>
            )}

            {personalInfo?.location && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt style={{ color: accentColor }} />
                {personalInfo.location}
              </div>
            )}

            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gray-600"
              >
                <FaLinkedin style={{ color: accentColor }} />
                LinkedIn
              </a>
            )}

            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gray-600"
              >
                <FaGithub style={{ color: accentColor }} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Summary line with accent background */}
      {personalInfo?.summary && (
        <div
          style={{ backgroundColor: accentColor }}
          className="mt-6 py-4 px-10 text-white"
        >
          <p className="italic">{personalInfo.summary}</p>
        </div>
      )}

      {/* Main content with staggered sections */}
      <div className="flex-grow px-10 mt-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Experience and Projects */}
          <div className="flex-grow md:w-7/12">
            {/* Experience */}
            {experience?.length > 0 && (
              <section className="mb-8">
                <h2
                  style={{ color: accentColor }}
                  className="text-lg font-bold uppercase mb-4 border-b pb-1"
                >
                  Professional Experience
                </h2>

                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <div
                        style={{ backgroundColor: accentColor }}
                        className="absolute left-0 top-1.5 w-3 h-3 rounded-full -ml-6"
                      ></div>

                      <div className="mb-1">
                        <h3 className="font-bold text-lg">
                          {job.position || job.title}
                        </h3>
                        <p className="text-gray-700 font-medium">
                          {job.company}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <FaCalendar className="text-xs" />
                          <span>
                            {job.startDate} — {job.endDate || "Present"}
                          </span>
                          {job.location && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{job.location}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 whitespace-pre-line">
                        {job.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
              <section className="mb-8">
                <h2
                  style={{ color: accentColor }}
                  className="text-lg font-bold uppercase mb-4 border-b pb-1"
                >
                  Projects
                </h2>

                <div className="space-y-6">
                  {projects.map((project, index) => (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <div
                        style={{ backgroundColor: accentColor }}
                        className="absolute left-0 top-1.5 w-3 h-3 rounded-full -ml-6"
                      ></div>

                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-lg">{project.title}</h3>

                        {project.link && (
                          <a
                            href={ensureHttps(project.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: accentColor }}
                            className="text-sm hover:underline"
                          >
                            View Project
                          </a>
                        )}
                      </div>

                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 my-1">
                            {project.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                style={{
                                  backgroundColor: `${accentColor}15` /* 15% opacity */,
                                }}
                                className="px-2 py-0.5 text-xs rounded text-gray-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                      <p className="text-gray-600">{project.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* certificate */}
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

            {/* Achievements Section */}
            {achievements?.length > 0 && (
              <section className="mb-8">
                <h2
                  style={{ color: accentColor }}
                  className="text-lg font-bold uppercase mb-4 border-b pb-1"
                >
                  Achievements
                </h2>

                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <div
                        style={{ backgroundColor: accentColor }}
                        className="absolute left-0 top-1.5 w-3 h-3 rounded-full -ml-6"
                      ></div>

                      <div className="mb-1">
                        <h3 className="font-bold text-lg">
                          {achievement.title}
                        </h3>
                        {achievement.organization && (
                          <p className="text-gray-700 font-medium">
                            {achievement.organization}
                          </p>
                        )}
                        {achievement.date && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <FaCalendar className="text-xs" />
                            <span>{achievement.date}</span>
                          </div>
                        )}
                      </div>

                      {achievement.description && (
                        <p className="text-gray-600 whitespace-pre-line">
                          {achievement.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right column - Education and Skills */}
          <div className="md:w-5/12">
            {/* Education */}
            {education?.length > 0 && (
              <section className="mb-8">
                <h2
                  style={{ color: accentColor }}
                  className="text-lg font-bold uppercase mb-4 border-b pb-1"
                >
                  Education
                </h2>

                <div className="space-y-5">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.school}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FaCalendar className="text-xs" />
                        <span>
                          {edu.startDate} — {edu.endDate || "Present"}
                        </span>
                      </div>
                      {edu.location && (
                        <p className="text-sm text-gray-600">{edu.location}</p>
                      )}
                      {edu.description && (
                        <p className="text-gray-600 mt-1">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills with categories */}
            {skillCategories && skillCategories.length > 0 ? (
              <section className="mb-8">
                <h2
                  style={{ color: accentColor }}
                  className="text-lg font-bold uppercase mb-4 border-b pb-1"
                >
                  Skills
                </h2>

                <div className="space-y-4">
                  {skillCategories.map(
                    (category, index) =>
                      category.skills.length > 0 && (
                        <div key={index}>
                          <h3 className="font-medium mb-2">
                            {category.name || "Skills"}
                          </h3>

                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                style={{
                                  backgroundColor: `${accentColor}15` /* 15% opacity */,
                                }}
                                className="px-3 py-1 rounded text-gray-800 text-sm"
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
            ) : skills && skills.length > 0 ? (
              <section className="mb-8">
                <h2
                  style={{ color: accentColor }}
                  className="text-lg font-bold uppercase mb-4 border-b pb-1"
                >
                  Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: `${accentColor}15` /* 15% opacity */,
                      }}
                      className="px-3 py-1 rounded text-gray-800 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
