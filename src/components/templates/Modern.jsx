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
    <div className="w-full h-full bg-white text-gray-800 flex flex-col">
      {/* Header with accent color */}
      <header className="bg-blue-600 text-white px-8 py-6">
        <h1 className="text-3xl font-bold">
          {personalInfo.name || "Your Name"}
        </h1>
        <h2 className="text-xl mt-1">
          {personalInfo.title || "Professional Title"}
        </h2>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo?.linkedin && (
            <a
              href={ensureHttps(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-gray-200"
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
              className="flex items-center text-white hover:text-gray-200"
            >
              <FaGithub className="mr-2" />
              <span>GitHub</span>
            </a>
          )}

          {personalInfo.phone && (
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              {personalInfo.phone}
            </div>
          )}

          {personalInfo.location && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              {personalInfo.location}
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-col p-8 flex-grow">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
              PROFESSIONAL SUMMARY
            </h2>
            <p>{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
              EXPERIENCE
            </h2>

            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                </div>
                <h4 className="text-gray-700 italic mb-1">
                  {exp.company}, {exp.location}
                </h4>
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
              EDUCATION
            </h2>

            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <span className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
                <h4 className="text-gray-700 italic">
                  {edu.school}, {edu.location}
                </h4>
                {edu.description && (
                  <p className="text-sm mt-1">{edu.description}</p>
                )}
              </div>
            ))}
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
        {achievements && achievements.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
              ACHIEVEMENTS
            </h2>

            {achievements.map((achievement, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{achievement.title}</h3>
                  {achievement.date && (
                    <span className="text-gray-600 text-sm">
                      {achievement.date}
                    </span>
                  )}
                </div>
                {achievement.organization && (
                  <h4 className="text-gray-700 italic mb-1">
                    {achievement.organization}
                  </h4>
                )}
                {achievement.description && (
                  <p className="text-sm">{achievement.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        <div className="flex flex-wrap gap-6">
          {/* Skills */}
          {/* Skills with visible categories */}
          {skills && skills.length > 0 && (
            <section className="mb-6 flex-1 min-w-[200px]">
              <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
                SKILLS
              </h2>

              {/* Check if skills are categorized or flat */}
              {skills[0] &&
              typeof skills[0] === "object" &&
              "category" in skills[0] ? (
                // Categorized skills
                <div className="space-y-3">
                  {skills.map((skillCategory, categoryIndex) => (
                    <div key={categoryIndex} className="mb-2">
                      <h3 className="text-sm font-bold text-gray-700 bg-gray-100 inline-block px-2 py-0.5 rounded mb-2">
                        {skillCategory.category}
                      </h3>
                      <div className="flex flex-wrap gap-2 ml-1">
                        {skillCategory.items.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Flat skills list (original implementation)
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-6 flex-1 min-w-[200px]">
              <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
                PROJECTS
              </h2>

              {projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-bold">{project.title}</h3>
                  {project.technologies && (
                    <p className="text-sm text-blue-600 mb-1">
                      {project.technologies.join(" • ")}
                    </p>
                  )}
                  <p className="text-sm">{project.description}</p>
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
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
