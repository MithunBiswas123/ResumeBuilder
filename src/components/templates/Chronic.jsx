import React, { useRef, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate,
  FaStar,
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Modern({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};
    
  const contentRef = useRef(null);
  
  // Handle pagination when printing
  useEffect(() => {
    const addPageBreaks = () => {
      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll('.resume-section');
        let currentHeight = 0;
        const maxHeight = 1100; // approx A4 height in px minus margins
        
        sections.forEach((section, index) => {
          const sectionHeight = section.offsetHeight;
          
          // Reset for first page
          if (index === 0) {
            section.style.pageBreakBefore = 'auto';
            currentHeight = sectionHeight;
            return;
          }
          
          // Add page break if section would overflow
          if (currentHeight + sectionHeight > maxHeight) {
            section.style.pageBreakBefore = 'always';
            currentHeight = sectionHeight;
          } else {
            section.style.pageBreakBefore = 'auto';
            currentHeight += sectionHeight;
          }
        });
      }
    };
    
    window.addEventListener('beforeprint', addPageBreaks);
    return () => window.removeEventListener('beforeprint', addPageBreaks);
  }, [resumeData]);

  return (
    <div className="bg-white min-h-full font-sans text-gray-800 print:text-sm">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12">
        {/* Left sidebar */}
        <div className="md:col-span-4 print:col-span-4 bg-gray-100 p-8 min-h-full">
          {/* Name and title */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 border-b-2 border-emerald-600 pb-2 inline-block">
              {personalInfo?.name || "Your Name"}
            </h1>
            
            {personalInfo?.title && (
              <p className="text-lg text-gray-600 mt-2">
                {personalInfo.title}
              </p>
            )}
          </div>
          
          {/* Contact information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-emerald-700">Contact</h2>
            <div className="space-y-2">
              {personalInfo?.email && (
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="flex items-center text-gray-600 hover:text-emerald-700"
                >
                  <FaEnvelope className="mr-3 text-emerald-600" />
                  <span className="text-sm">{personalInfo.email}</span>
                </a>
              )}

              {personalInfo?.phone && (
                <a 
                  href={`tel:${personalInfo.phone}`} 
                  className="flex items-center text-gray-600 hover:text-emerald-700"
                >
                  <FaPhone className="mr-3 text-emerald-600" />
                  <span className="text-sm">{personalInfo.phone}</span>
                </a>
              )}

              {personalInfo?.location && (
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-3 text-emerald-600" />
                  <span className="text-sm">{personalInfo.location}</span>
                </div>
              )}

              {personalInfo?.linkedin && (
                <a
                  href={ensureHttps(personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-emerald-700"
                >
                  <FaLinkedin className="mr-3 text-emerald-600" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
              
              {personalInfo?.github && (
                <a
                  href={ensureHttps(personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-emerald-700"
                >
                  <FaGithub className="mr-3 text-emerald-600" />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
            </div>
          </div>
          
          {/* Skills */}
          {skills?.length > 0 && (
            <div className="resume-section mb-8 page-break-inside-avoid">
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-white shadow-sm rounded px-3 py-1 text-sm text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Education - in sidebar */}
          {education?.length > 0 && (
            <div className="resume-section page-break-inside-avoid">
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold text-gray-800">
                      {edu.degree}
                    </h3>
                    <p className="text-emerald-600 font-medium text-sm">{edu.school}</p>
                    <p className="text-gray-500 text-xs mb-1 italic">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                    {edu.description && (
                      <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Certificates - in sidebar */}
          {certificates?.length > 0 && (
            <div className="resume-section mt-8 page-break-inside-avoid">
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">Certifications</h2>
              <div className="space-y-3">
                {certificates.map((cert, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-bold text-gray-800 text-sm">
                      {cert.name}
                    </h3>
                    <p className="text-emerald-600 text-xs">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs">
                      {cert.date}
                    </p>
                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-800 text-xs flex items-center mt-1"
                      >
                        <FaCertificate className="mr-1" size={10} />
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="md:col-span-8 print:col-span-8 p-8" ref={contentRef}>
          {/* Summary */}
          {personalInfo?.summary && (
            <div className="resume-section mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
                Profile
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <div className="resume-section mb-8 page-break-inside-avoid">
              <h2 className="text-xl font-bold text-gray-800 mb-5 border-b border-gray-200 pb-2">
                Experience
              </h2>

              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="mb-5">
                    <div className="flex flex-col mb-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {job.position || job.title}
                        </h3>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-emerald-700 font-medium">
                          {job.company}
                          {job.location ? ` · ${job.location}` : ""}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {job.startDate} — {job.endDate || "Present"}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <div className="resume-section mb-8 page-break-inside-avoid">
              <h2 className="text-xl font-bold text-gray-800 mb-5 border-b border-gray-200 pb-2">
                Projects
              </h2>

              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-gray-900">
                        {project.title}
                      </h3>
                      {project.link && (
                        <a
                          href={ensureHttps(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-800 text-sm"
                        >
                          View Project →
                        </a>
                      )}
                    </div>

                    {project.technologies && (
                      <div className="mb-2 flex flex-wrap gap-1">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-gray-700">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements?.length > 0 && (
            <div className="resume-section mb-8 page-break-inside-avoid">
              <h2 className="text-xl font-bold text-gray-800 mb-5 border-b border-gray-200 pb-2">
                Achievements
              </h2>

              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="mb-3 flex">
                    <div className="mr-3 mt-1">
                      <FaStar className="text-emerald-500" />
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-900">
                          {achievement.title}
                        </h3>
                        {achievement.date && (
                          <p className="text-gray-500 text-sm">
                            {achievement.date}
                          </p>
                        )}
                      </div>

                      {achievement.organization && (
                        <p className="text-emerald-700 text-sm">
                          {achievement.organization}
                        </p>
                      )}

                      {achievement.description && (
                        <p className="text-gray-700 mt-1">{achievement.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0.25in;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
          
          .resume-section {
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}