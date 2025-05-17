

"use client";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTrophy,
  FaCertificate,
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Modern({ resumeData }) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    achievements,
    certificates,
  } = resumeData;

  return (
    <div className="w-full h-full bg-white text-white flex flex-col">
      {/* Header with solid color instead of gradient */}
      <header className="bg-purple-800 text-white px-8 py-6">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold tracking-tight text-white">
      {personalInfo.name || "Your Name"}
    </h1>
    <h2 className="text-xl mt-1 font-light tracking-wide text-white!important">
      {personalInfo.title || "Professional Title"}
    </h2>

          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            {personalInfo.email && (
              <div className="flex items-center group">
                <div className="p-2 rounded-full bg-purple-600 group-hover:bg-purple-500 transition-colors">
                  <FaEnvelope className="text-white" />
                </div>
                <span className="ml-2">{personalInfo.email}</span>
              </div>
            )}
            
         
            
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-purple-200 group"
              >
                <div className="p-2 rounded-full bg-purple-600 group-hover:bg-purple-500 transition-colors">
                  <FaLinkedin className="text-white" />
                </div>
                <span className="ml-2">LinkedIn</span>
              </a>
            )}

            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-purple-200 group"
              >
                <div className="p-2 rounded-full bg-purple-600 group-hover:bg-purple-500 transition-colors">
                  <FaGithub className="text-white" />
                </div>
                <span className="ml-2">GitHub</span>
              </a>
            )}

            {personalInfo.phone && (
              <div className="flex items-center group">
                <div className="p-2 rounded-full bg-purple-600 group-hover:bg-purple-500 transition-colors">
                  <FaPhone className="text-white" />
                </div>
                <span className="ml-2">{personalInfo.phone}</span>
              </div>
            )}

            {personalInfo.location && (
              <div className="flex items-center group">
                <div className="p-2 rounded-full bg-purple-600 group-hover:bg-purple-500 transition-colors">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <span className="ml-2">{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content with two-column layout */}
      <div className="flex flex-col md:flex-row p-8 gap-8 flex-grow max-w-6xl mx-auto w-full">
        {/* Left column - 65% width */}
        <div className="md:w-2/3">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-5">
              <h2 className="text-base font-bold text-purple-700 mb-4 relative pl-3 uppercase after:content-[''] after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-purple-700">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed text-[15px]">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="mb-5">
              <h2 className="text-lg font-bold text-purple-700 mb-4 relative pl-3 uppercase after:content-[''] after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-purple-700">
                EXPERIENCE
              </h2>

              {experience.map((exp, index) => (
                <div key={index} className="mb-5 pb-1 border-b border-gray-200 last:border-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <span className="text-purple-600 text-sm font-medium bg-purple-50 px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <h4 className="text-gray-700 font-medium mt-1 mb-2">
                    {exp.company}{exp.location && `, ${exp.location}`}
                  </h4>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-5">
              <h2 className="text-lg font-bold text-purple-700 mb-4 relative pl-3 uppercase after:content-[''] after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-purple-700">
                EDUCATION
              </h2>

              {education.map((edu, index) => (
                <div key={index} className="mb-5 pb-5 border-b border-gray-200 last:border-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <span className="text-purple-600 text-sm font-medium bg-purple-50 px-3 py-1 rounded-full">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </span>
                  </div>
                  <h4 className="text-gray-700 font-medium mt-1">
                    {edu.school}{edu.location && `, ${edu.location}`}
                  </h4>
                  {edu.description && (
                    <p className="text-gray-600 mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-5">
              <h2 className="text-lg font-bold text-purple-700 mb-4 relative pl-3 uppercase after:content-[''] after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-purple-700">
                PROJECTS
              </h2>

              {projects.map((project, index) => (
                <div key={index} className="mb-5 pb-5 border-b border-gray-200 last:border-0">
                  <h3 className="font-bold text-gray-800">{project.title}</h3>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 my-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-600 mt-2">{project.description}</p>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-purple-600 hover:text-purple-800 font-medium"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right column - 35% width */}
        <div className="md:w-1/3">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-5 bg-purple-50 p-1 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-purple-700 mb-4 uppercase border-b-2 border-purple-200 pb-2">
                SKILLS
              </h2>

              {/* Check if skills are categorized or flat */}
              {skills[0] && typeof skills[0] === "object" && "category" in skills[0] ? (
                // Categorized skills
                <div className="space-y-4">
                  {skills.map((skillCategory, categoryIndex) => (
                    <div key={categoryIndex} className="mb-3">
                      <h3 className="text-sm font-bold text-purple-800 mb-2 uppercase">
                        {skillCategory.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillCategory.items.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-white text-purple-700 border border-purple-200 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Flat skills list
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white text-purple-700 border border-purple-200 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Certificates */}
          {certificates?.length > 0 && (
            <section className="mb-5 bg-purple-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-purple-700 mb-4 uppercase border-b-2 border-purple-200 pb-2 flex items-center">
                <FaCertificate className="mr-2 text-purple-600" />
                Certifications
              </h2>

              <div className="space-y-4">
                {certificates.map((cert, index) => (
                  <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                    <h3 className="text-md font-semibold text-gray-800">
                      {cert.name}
                    </h3>

                    <p className="text-purple-700 font-medium text-sm mt-1">
                      {cert.issuer}
                      {cert.credentialID && (
                        <span className="text-gray-500 text-xs ml-2">
                          ID: {cert.credentialID}
                        </span>
                      )}
                    </p>

                    <p className="text-gray-600 text-xs mt-1">
                      {cert.date}
                      {cert.expiration && ` • Valid until ${cert.expiration}`}
                    </p>

                    {cert.description && (
                      <p className="text-gray-700 text-sm mt-2">
                        {cert.description}
                      </p>
                    )}

                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-600 hover:text-purple-800 text-sm mt-2 font-medium"
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

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <section className="mb-5 bg-purple-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-purple-700 mb-4 uppercase border-b-2 border-purple-200 pb-2 flex items-center">
                <FaTrophy className="mr-2 text-purple-600" />
                ACHIEVEMENTS
              </h2>

              {achievements.map((achievement, index) => (
                <div key={index} className="mb-4 bg-white p-4 rounded-md shadow-sm">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800">{achievement.title}</h3>
                  </div>
                  {achievement.organization && (
                    <h4 className="text-purple-700 font-medium text-sm mt-1">
                      {achievement.organization}
                    </h4>
                  )}
                  {achievement.date && (
                    <p className="text-gray-500 text-xs mt-1">
                      {achievement.date}
                    </p>
                  )}
                  {achievement.description && (
                    <p className="text-gray-600 text-sm mt-2">{achievement.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}