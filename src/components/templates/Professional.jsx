"use client";

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
  FaTools,
  FaCode,
  FaUser,
  FaExternalLinkAlt
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

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

  return (
    <div className="bg-white w-full h-full px-8 py-10 font-serif text-gray-800">
      {/* Header with improved styling */}
      <header className="text-center border-b-2 border-gray-300 pb-5 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-wider">
          {personalInfo?.name || "Your Name"}
        </h1>
        {personalInfo?.title && (
          <p className="text-xl text-gray-600 mt-2">{personalInfo.title}</p>
        )}

        {/* Contact info with consistent styling */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
          {personalInfo?.email && (
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-600" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center">
              <FaPhone className="mr-2 text-gray-600" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo?.linkedin && (
            <a
              href={ensureHttps(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <FaLinkedin className="mr-2 text-gray-600" />
              <span>LinkedIn</span>
            </a>
          )}
          {personalInfo?.github && (
            <a
              href={ensureHttps(personalInfo.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <FaGithub className="mr-2 text-gray-600" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-7">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-1 mb-4 flex items-center">
            <FaUser className="mr-2 text-gray-600 text-lg" />
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience - Enhanced with icons and improved layout */}
      {experience?.length > 0 && (
        <section className="mb-7">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-1 mb-4 flex items-center">
            <FaBriefcase className="mr-2 text-gray-600 text-lg" />
            Experience
          </h2>
          {experience.map((job, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{job.position || job.title}</h3>
                <span className="text-gray-600 italic text-sm">
                  {job.startDate} - {job.endDate || "Present"}
                </span>
              </div>
              <p className="font-semibold text-gray-700">
                {job.company}
                {job.location && <span> • {job.location}</span>}
              </p>
              <p className="mt-2 text-gray-700 leading-relaxed">{job.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education - Enhanced with icons */}
      {education?.length > 0 && (
        <section className="mb-7">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-1 mb-4 flex items-center">
            <FaGraduationCap className="mr-2 text-gray-600 text-lg" />
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{edu.degree}</h3>
                <span className="text-gray-600 italic text-sm">
                  {edu.startDate} - {edu.endDate || "Present"}
                </span>
              </div>
              <p className="font-semibold text-gray-700">
                {edu.school}
                {edu.location && <span> • {edu.location}</span>}
              </p>
              {edu.description && <p className="mt-2 text-gray-700 leading-relaxed">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Two column layout for smaller sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills - Improved presentation with badges */}
        {skills?.length > 0 && (
          <section className="mb-7">
            <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-1 mb-4 flex items-center">
              <FaTools className="mr-2 text-gray-600 text-lg" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm border border-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Achievements - New Section with icons */}
        {achievements?.length > 0 && (
          <section className="mb-7">
            <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-1 mb-4 flex items-center">
              <FaTrophy className="mr-2 text-gray-600 text-lg" />
              Achievements
            </h2>
            {achievements.map((achievement, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{achievement.title}</h3>
                  {achievement.date && (
                    <span className="text-gray-600 italic text-sm">{achievement.date}</span>
                  )}
                </div>
                {achievement.organization && (
                  <p className="font-semibold text-gray-700">{achievement.organization}</p>
                )}
                {achievement.description && (
                  <p className="mt-1 text-gray-700 text-sm leading-relaxed">{achievement.description}</p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Projects - Enhanced layout with cards */}
      {projects?.length > 0 && (
        <section className="mb-7">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-1 mb-4 flex items-center">
            <FaCode className="mr-2 text-gray-600 text-lg" />
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
                    >
                      <span className="mr-1">View</span>
                      <FaExternalLinkAlt size={12} />
                    </a>
                  )}
                </div>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certificates - Unified styling with other sections */}
      {certificates?.length > 0 && (
        <section className="mb-7">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-1 mb-4 flex items-center">
            <FaCertificate className="mr-2 text-gray-600 text-lg" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert, index) => (
              <div key={index} className="border-l-2 border-gray-300 pl-4 py-1">
                <h3 className="text-lg font-bold text-gray-800">
                  {cert.name}
                </h3>

                <p className="font-medium text-gray-700">
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
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                    {cert.description}
                  </p>
                )}

                {cert.url && (
                  <a
                    href={ensureHttps(cert.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm mt-2"
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
  );
}