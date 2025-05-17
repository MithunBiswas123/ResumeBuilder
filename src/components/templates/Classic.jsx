


import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate ,
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Classic({ resumeData }) {
  const { personalInfo, experience, education, skills, projects ,achievements,certificates } =
    resumeData || {};

  return (
    <div className="bg-white w-full h-full p-10 font-serif text-gray-800">
      {/* Elegant header with decorative elements */}
      <header className="text-center mb-4 relative">
        <div className="border-b-2 border-t-2 border-gray-300 py-4 px-4">
          <h1 className="text-3xl md:text-4xl font-normal text-gray-800 tracking-widest uppercase">
            {personalInfo?.name || "Your Name"}
          </h1>
          
          {personalInfo?.title && (
            <p className="text-lg text-gray-600 mt-2 tracking-wider">
              {personalInfo.title}
            </p>
          )}
        </div>
        
        {/* Contact information row */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-6 text-sm">
          {personalInfo?.email && (
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <FaEnvelope className="mr-2 text-gray-500" />
              {personalInfo.email}
            </a>
          )}

          {personalInfo?.phone && (
            <a 
              href={`tel:${personalInfo.phone}`} 
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <FaPhone className="mr-2 text-gray-500" />
              {personalInfo.phone}
            </a>
          )}

          {personalInfo?.location && (
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
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


        </div>
      </header>

      <div className="max-w-5xl mx-auto">
        {/* Summary */}
        {personalInfo?.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 tracking-wide uppercase border-b border-gray-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main column - Experience & Projects */}
          <div className="md:col-span-2">
            {/* Experience */}
            {experience?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide uppercase border-b border-gray-300 pb-1">
                  Professional Experience
                </h2>

                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex flex-col md:flex-row md:justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {job.position || job.title}
                        </h3>
                        <p className="text-gray-600 italic">
                          {job.startDate} — {job.endDate || "Present"}
                        </p>
                      </div>

                      <p className="font-medium text-gray-700 mb-2">
                        {job.company}
                        {job.location ? `, ${job.location}` : ""}
                      </p>

                      <p className="text-gray-700 text-sm">{job.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}


                {/* Achievements */}
                {achievements?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide uppercase border-b border-gray-300 pb-1">
                  Achievements
                </h2>

                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex flex-col md:flex-row md:justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {achievement.title}
                        </h3>
                        {achievement.date && (
                          <p className="text-gray-600 italic">
                            {achievement.date}
                          </p>
                        )}
                      </div>

                      {achievement.organization && (
                        <p className="font-medium text-gray-700 mb-2">
                          {achievement.organization}
                        </p>
                      )}

                      {achievement.description && (
                        <p className="text-gray-700 text-sm">{achievement.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}



            {/* Projects */}
            {projects?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide uppercase border-b border-gray-300 pb-1">
                  Projects
                </h2>

                <div className="space-y-5">
                  {projects.map((project, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {project.title}
                        </h3>

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

                      {project.technologies && (
                        <p className="text-gray-600 text-sm mb-2 italic">
                          {project.technologies.join(" • ")}
                        </p>
                      )}

                      <p className="text-gray-700 text-sm">{project.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Side column - Skills & Education */}
          <div className="md:col-span-1">
            {/* Skills */}
            {skills?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide uppercase border-b border-gray-300 pb-1">
                  Skills
                </h2>

                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Education */}
            {education?.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide uppercase border-b border-gray-300 pb-1">
                  Education
                </h2>

                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-gray-700">{edu.school}</p>
                      <p className="text-gray-600 text-sm mb-1 italic">
                        {edu.startDate} — {edu.endDate || "Present"}
                      </p>

                      {edu.description && (
                        <p className="text-gray-700 text-sm">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}


            {/* Certificates */}

            {certificates?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide uppercase border-b border-gray-300 pb-1">
                  Certifications
                </h2>

                <div className="space-y-4">
                  {certificates.map((cert, index) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold text-gray-900">
                        {cert.name}
                      </h3>
                      <p className="text-gray-700">
                        {cert.issuer}
                        {cert.credentialID && (
                          <span className="text-gray-500 text-xs ml-2">
                            #{cert.credentialID}
                          </span>
                        )}
                      </p>
                      <p className="text-gray-600 text-sm mb-1 italic">
                        {cert.date}
                        {cert.expiration && ` — Valid until ${cert.expiration}`}
                      </p>

                      {cert.url && (
                        <a
                          href={ensureHttps(cert.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-500 text-sm hover:text-gray-800 mt-1"
                        >
                          <FaCertificate className="mr-1 text-gray-500" />
                          <span>View Certificate</span>
                        </a>
                      )}

                      {cert.description && (
                        <p className="text-gray-700 text-sm mt-1">
                          {cert.description}
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

      <footer className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-xs">
        <p>References available upon request</p>
      </footer>
    </div>
  );
}