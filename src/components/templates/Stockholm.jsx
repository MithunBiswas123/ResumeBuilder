import React, { useRef, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate,
  FaCalendarAlt,
  FaLink,
  FaAward,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaProjectDiagram,
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Stockholm({ resumeData }) {
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
          
          if (index === 0) {
            section.style.pageBreakBefore = 'auto';
            currentHeight = sectionHeight;
            return;
          }
          
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
      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-teal-600 to-teal-400 text-white p-8 pt-10 pb-12 print:p-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500 rounded-full -mb-32 -mr-16 opacity-20"></div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-teal-300 rounded-full -mt-20 -ml-20 opacity-10"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight print:text-3xl">
                {personalInfo?.name || "Your Name"}
              </h1>
              
              {personalInfo?.title && (
                <h2 className="text-lg md:text-xl tracking-wide text-teal-100 mt-1 print:text-base">
                  {personalInfo.title}
                </h2>
              )}
            </div>
            
            {/* Contact information in header */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 items-center text-sm md:text-right">
              {personalInfo?.email && (
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="flex items-center text-white hover:text-teal-100"
                >
                  <FaEnvelope className="mr-2 text-teal-200" aria-hidden="true" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              
              {personalInfo?.phone && (
                <a 
                  href={`tel:${personalInfo.phone}`} 
                  className="flex items-center text-white hover:text-teal-100"
                >
                  <FaPhone className="mr-2 text-teal-200" aria-hidden="true" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              
              {personalInfo?.location && (
                <div className="flex items-center text-white">
                  <FaMapMarkerAlt className="mr-2 text-teal-200" aria-hidden="true" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Social links bar */}
      <div className="bg-teal-50 border-b border-teal-100 py-2 px-8 print:py-1 print:px-6 print:bg-transparent print:border-teal-200">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-6">
          {personalInfo?.linkedin && (
            <a
              href={ensureHttps(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-teal-700 hover:text-teal-900"
            >
              <FaLinkedin className="mr-2 text-teal-600" />
              <span className="print:text-xs">LinkedIn</span>
            </a>
          )}
          
          {personalInfo?.github && (
            <a
              href={ensureHttps(personalInfo.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-teal-700 hover:text-teal-900"
            >
              <FaGithub className="mr-2 text-teal-600" />
              <span className="print:text-xs">GitHub</span>
            </a>
          )}
          
          {/* Add space for additional social links */}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="max-w-6xl mx-auto p-8 print:p-6" ref={contentRef}>
        {/* Summary section */}
        {personalInfo?.summary && (
          <div className="resume-section mb-8 print:mb-6">
            <div className="flex items-center mb-4">
              <div className="mr-3 bg-teal-500 rounded-full p-2 text-white">
                <FaStar className="text-sm" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-teal-500 pb-1 print:text-lg">
                Professional Summary
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed print:text-sm">
              {personalInfo.summary}
            </p>
          </div>
        )}
        
        {/* Skills section with visual indicators */}
        {skills?.length > 0 && (
          <div className="resume-section mb-8 print:mb-6 page-break-inside-avoid">
            <div className="flex items-center mb-4">
              <div className="mr-3 bg-teal-500 rounded-full p-2 text-white">
                <FaCode className="text-sm" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-teal-500 pb-1 print:text-lg">
                Skills
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 print:grid-cols-3">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-gray-50 border border-gray-100 rounded-lg p-2 print:bg-transparent print:border-gray-200"
                >
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                  <span className="text-gray-800 text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Experience section with timeline style */}
        {experience?.length > 0 && (
          <div className="resume-section mb-8 print:mb-6 page-break-inside-avoid">
            <div className="flex items-center mb-4">
              <div className="mr-3 bg-teal-500 rounded-full p-2 text-white">
                <FaBriefcase className="text-sm" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-teal-500 pb-1 print:text-lg">
                Experience
              </h2>
            </div>
            
            <div className="space-y-6 print:space-y-4">
              {experience.map((job, index) => (
                <div key={index} className="relative">
                  {/* Timeline connector for all but last item */}
                  {index < experience.length - 1 && (
                    <div className="absolute top-8 bottom-0 left-3 w-0.5 bg-gray-200 hidden md:block"></div>
                  )}
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-7 flex-shrink-0 flex items-start justify-center mt-1">
                      <div className="w-6 h-6 rounded-full bg-teal-500 hidden md:flex items-center justify-center text-white">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex-1 bg-white rounded-lg border border-gray-100 p-4 shadow-sm print:shadow-none print:border-gray-200 print:p-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                        <h3 className="font-bold text-gray-900 text-lg print:text-base">
                          {job.position || job.title}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1 sm:mt-0">
                          <FaCalendarAlt className="mr-1 text-teal-600" />
                          <span>{job.startDate} — {job.endDate || "Present"}</span>
                        </div>
                      </div>
                      
                      <p className="text-teal-800 font-medium text-sm mb-2">
                        {job.company}
                        {job.location ? ` • ${job.location}` : ""}
                      </p>
                      
                      <p className="text-gray-600 text-sm print:text-xs">
                        {job.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Projects section with cards */}
        {projects?.length > 0 && (
          <div className="resume-section mb-8 print:mb-6 page-break-inside-avoid">
            <div className="flex items-center mb-4">
              <div className="mr-3 bg-teal-500 rounded-full p-2 text-white">
                <FaProjectDiagram className="text-sm" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-teal-500 pb-1 print:text-lg">
                Projects
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-gray-300"
                >
                  <div className="border-l-4 border-teal-500 pl-3 pt-3 pr-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 text-lg print:text-base">
                        {project.title}
                      </h3>
                      {project.link && (
                        <a
                          href={ensureHttps(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-800"
                          aria-label="Visit project"
                        >
                          <FaLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 pt-2">
                    {project.technologies && (
                      <div className="mb-2 flex flex-wrap gap-1">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded border border-teal-100 print:bg-transparent"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-gray-600 text-sm print:text-xs">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Two column layout for education and certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-6 mb-8">
          {/* Education column */}
          {education?.length > 0 && (
            <div className="resume-section page-break-inside-avoid">
              <div className="flex items-center mb-4">
                <div className="mr-3 bg-teal-500 rounded-full p-2 text-white">
                  <FaGraduationCap className="text-sm" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-teal-500 pb-1 print:text-lg">
                  Education
                </h2>
              </div>
              
              <div className="space-y-4 print:space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm print:shadow-none print:border-gray-200 print:p-3">
                    <h3 className="font-bold text-gray-900 print:text-base">
                      {edu.degree}
                    </h3>
                    <p className="text-teal-700 font-medium text-sm">
                      {edu.school}
                    </p>
                    <p className="text-gray-500 text-xs mb-1">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                    {edu.description && (
                      <p className="text-gray-600 text-sm print:text-xs mt-1">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Certifications column */}
          {certificates?.length > 0 && (
            <div className="resume-section page-break-inside-avoid">
              <div className="flex items-center mb-4">
                <div className="mr-3 bg-teal-500 rounded-full p-2 text-white">
                  <FaCertificate className="text-sm" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 border-b-2 border-teal-500 pb-1 print:text-lg">
                  Certifications
                </h2>
              </div>
              
              <div className="space-y-3 print:space-y-2">
                {certificates.map((cert, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm print:shadow-none print:border-gray-200 print:p-3">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900 print:text-base">
                        {cert.name}
                      </h3>
                      <span className="text-gray-500 text-xs">
                        {cert.date}
                      </span>
                    </div>
                    
                    <p className="text-teal-700 text-sm">
                      {cert.issuer}
                    </p>
                    
                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-800 text-xs flex items-center mt-2"
                      >
                        <FaLink className="mr-1" size={10} />
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Achievements section */}
        {achievements?.length > 0 && (
          <div className="resume-section mb-6 page-break-inside-avoid">
            <div className="flex items-center mb-4">
              <div className="mr-3 bg-teal-500 rounded-full p-2 text-white">
                <FaAward className="text-sm" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-teal-500 pb-1 print:text-lg">
                Achievements
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-teal-50 to-transparent border-l-4 border-teal-400 pl-4 p-3 rounded-r-lg print:bg-transparent print:border-l print:border-teal-400"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 print:text-base">
                      {achievement.title}
                    </h3>
                    {achievement.date && (
                      <span className="text-gray-500 text-xs">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                  
                  {achievement.organization && (
                    <p className="text-teal-700 text-sm font-medium print:text-xs">
                      {achievement.organization}
                    </p>
                  )}
                  
                  {achievement.description && (
                    <p className="text-gray-600 text-sm mt-1 print:text-xs">
                      {achievement.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 py-4 text-center text-gray-500 text-xs print:hidden">
        <p>Created with Resume Builder • References available upon request</p>
      </footer>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
            size: letter portrait;
          }
          
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-size: 11pt;
          }
          
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
          
          .resume-section {
            break-inside: avoid;
          }
          
          /* Color adjustments for printing */
          .from-teal-600 {
            background-color: #0d9488 !important;
          }
          
          .to-teal-400 {
            background-color: #2dd4bf !important;
          }
          
          .border-teal-500 {
            border-color: #14b8a6 !important;
          }
          
          .bg-teal-500 {
            background-color: #14b8a6 !important;
          }
          
          .text-teal-700 {
            color: #0f766e !important;
          }
          
          .text-gray-600 {
            color: #4b5563 !important;
          }
          
          /* Print-specific adjustments */
          h1, h2, h3 {
            color: #111827 !important;
          }
          
          .shadow-sm, .shadow-md, .hover\:shadow-md {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}