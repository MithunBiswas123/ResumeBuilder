

"use client";
import { FaLinkedin, FaGithub } from "react-icons/fa"; // Add this import

export default function Creative({ resumeData }) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    achievements,
    certificates,
    aiHighlights,
  } = resumeData || {};

  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="bg-white w-full h-full font-sans text-gray-800 flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-purple-700 text-black p-8 text-wrap">
        {/* Profile */}
        <div className="text-start mb-8">
          {personalInfo?.profileImage && (
            <div className="mb-4 flex justify-center">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
            </div>
          )}
          <h1 className="text-2xl font-bold">
            {personalInfo?.name || "Your Name"}
          </h1>
          {personalInfo?.title && <p className="mt-1">{personalInfo.title}</p>}
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b border-purple-500 pb-2 mb-3">
            Contact
          </h2>
          <div className="space-y-2">
            {personalInfo?.email && <p>{personalInfo.email}</p>}
            {personalInfo?.phone && <p>{personalInfo.phone}</p>}
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
            {personalInfo?.location && <p>{personalInfo.location}</p>}
          </div>
        </div>

        {/* Education - Simplified for sidebar */}
        {education?.length > 0 && (
          <div>
            <h2 className="text-lg font-bold border-b border-purple-500 pb-2 mb-3">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm">{edu.school}</p>
                <p className="text-sm">
                  {edu.startDate} - {edu.endDate || "Present"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* AI Highlights Section */}
        {aiHighlights && (
          <section className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-lg border border-purple-100">
            <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
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

            {/* Key Skills Match */}
            {aiHighlights.keySkills && (
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {aiHighlights.keySkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white text-purple-700 text-sm rounded-full border border-purple-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Improvement Suggestions */}
            {aiHighlights.suggestions && (
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Suggestions
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {aiHighlights.suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Custom AI Message */}
            {aiHighlights.customMessage && (
              <div className="italic text-gray-700 mt-3 border-t border-purple-100 pt-3">
                {aiHighlights.customMessage}
              </div>
            )}
          </section>
        )}

        {/* Summary */}
        {personalInfo?.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-3">
              About Me
            </h2>
            <p>{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Experience
            </h2>
            {experience.map((job, index) => (
              <div key={index} className="mb-5">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-semibold">
                    {job.position || job.title}
                  </h3>
                  <span className="text-gray-600 text-sm">
                    {job.startDate} - {job.endDate || "Present"}
                  </span>
                </div>
                <p className="text-purple-600 font-medium">{job.company}</p>
                <p className="mt-2">{job.description}</p>
              </div>
            ))}
          </section>
        )}


           {/* Achievements Section */}
           {achievements?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Achievements
            </h2>
            {achievements.map((achievement, index) => (
              <div key={index} className="mb-5">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-semibold">
                    {achievement.title}
                  </h3>
                  {achievement.date && (
                    <span className="text-gray-600 text-sm">
                      {achievement.date}
                    </span>
                  )}
                </div>
                {achievement.organization && (
                  <p className="text-purple-600 font-medium">{achievement.organization}</p>
                )}
                {achievement.description && (
                  <p className="mt-2">{achievement.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills - Moved from sidebar to main content */}
        {skills?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}


         {/* Certificates Section - Add after skills and before projects */}
         {certificates?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Certifications</h2>
            
            {certificates.map((cert, index) => (
              <div 
                key={index} 
                className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-semibold text-purple-800">
                    {cert.name}
                  </h3>
                  <span className="text-gray-600 text-sm">
                    {cert.date}
                    {cert.expiration && ` — Valid until ${cert.expiration}`}
                  </span>
                </div>
                
                <p className="text-purple-600 font-medium">
                  {cert.issuer}
                  {cert.credentialID && (
                    <span className="text-gray-500 text-sm ml-2">
                      ID: {cert.credentialID}
                    </span>
                  )}
                </p>
                
                {cert.description && (
                  <p className="mt-2 text-gray-700">{cert.description}</p>
                )}
                
                {cert.url && (
                  <div className="mt-3">
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-purple-600 hover:text-purple-800 text-sm"
                    >
                         <FaCertificate className="mr-1" />
                      <span>View Certificate</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div
                key={index}
                className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-semibold text-purple-800">
                    {project.title}
                  </h3>
                  {project.date && (
                    <span className="text-gray-500 text-sm">
                      {project.date}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-gray-700">{project.description}</p>

                {/* Technologies/Skills used */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Project links */}
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
  );
}
