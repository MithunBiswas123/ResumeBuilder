import React, { useRef, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate,
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Creative({ resumeData }) {
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
    <div className="bg-white min-h-full font-sans text-gray-800 print:text-sm relative">
      {/* Elegant header with better print contrast */}
      <header className="bg-gray-800 text-white py-10 px-8 relative print:py-8">
        {/* Decorative element for visual interest */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 print:opacity-5">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
            <polygon points="0,0 100,0 100,100" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold tracking-tight print:text-3xl">
            {personalInfo?.name || "Your Name"}
          </h1>
          
          {personalInfo?.title && (
            <p className="text-xl mt-2 tracking-wide text-gray-300 print:text-gray-200">
              {personalInfo.title}
            </p>
          )}
          
          {/* Contact information row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-5">
            {personalInfo?.email && (
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="flex items-center text-gray-200 print:text-white"
              >
                <FaEnvelope className="mr-2 text-gray-300 print:text-white" />
                {personalInfo.email}
              </a>
            )}

            {personalInfo?.phone && (
              <a 
                href={`tel:${personalInfo.phone}`} 
                className="flex items-center text-gray-200 print:text-white"
              >
                <FaPhone className="mr-2 text-gray-300 print:text-white" />
                {personalInfo.phone}
              </a>
            )}

            {personalInfo?.location && (
              <div className="flex items-center text-gray-200 print:text-white">
                <FaMapMarkerAlt className="mr-2 text-gray-300 print:text-white" />
                {personalInfo.location}
              </div>
            )}

            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-200 print:text-white"
              >
                <FaLinkedin className="mr-2 text-gray-300 print:text-white" />
                LinkedIn
              </a>
            )}
            
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-200 print:text-white"
              >
                <FaGithub className="mr-2 text-gray-300 print:text-white" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content area with improved spacing and typography */}
      <div className="max-w-5xl mx-auto p-8 print:p-6" ref={contentRef}>
        {/* Summary */}
        {personalInfo?.summary && (
          <div className="resume-section mb-8 print:mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 print:text-lg">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed print:leading-snug">
              {personalInfo.summary}
            </p>
          </div>
        )}
        
        {/* Skills */}
        {skills?.length > 0 && (
          <div className="resume-section mb-8 page-break-inside-avoid print:mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 print:text-lg">
              Skills
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm border border-gray-200 print:bg-gray-50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Experience */}
        {experience?.length > 0 && (
          <div className="resume-section mb-8 page-break-inside-avoid print:mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 print:text-lg">
              Experience
            </h2>
            
            <div className="space-y-6 print:space-y-5">
              {experience.map((job, index) => (
                <div key={index} className="mb-6 print:mb-5">
                  <div className="flex flex-col md:flex-row md:justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg print:text-base">
                      {job.position || job.title}
                    </h3>
                    <span className="text-gray-600 text-sm font-medium print:text-xs">
                      {job.startDate} — {job.endDate || "Present"}
                    </span>
                  </div>
                  
                  <p className="text-gray-900 font-semibold mb-2 print:mb-1">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                  
                  <p className="text-gray-700 text-sm leading-relaxed print:text-xs print:leading-snug">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Projects - Redesigned for better printing */}
        {projects?.length > 0 && (
          <div className="resume-section mb-8 page-break-inside-avoid print:mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 print:text-lg">
              Projects
            </h2>
            
            <div className="space-y-6 print:space-y-5">
              {projects.map((project, index) => (
                <div key={index} className="mb-5 print:mb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-gray-900 print:text-base">
                      {project.title}
                    </h3>
                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900 text-sm print:text-xs"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  
                  {project.technologies && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="bg-gray-50 text-gray-700 text-xs px-2 py-0.5 rounded border border-gray-200 print:text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-gray-700 text-sm print:text-xs">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Two column layout for Education and Certifications - Better balanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 print:gap-6 print:mb-6">
          {/* Education */}
          {education?.length > 0 && (
            <div className="resume-section page-break-inside-avoid">
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 print:text-lg">
                Education
              </h2>
              
              <div className="space-y-4 print:space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="mb-4 print:mb-3">
                    <h3 className="font-bold text-gray-900 print:text-base">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-700 font-semibold print:text-sm">
                      {edu.school}
                    </p>
                    <p className="text-gray-600 text-sm mb-1 print:text-xs">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                    {edu.description && (
                      <p className="text-gray-700 text-sm print:text-xs">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Certifications */}
          {certificates?.length > 0 && (
            <div className="resume-section page-break-inside-avoid">
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 print:text-lg">
                Certifications
              </h2>
              
              <div className="space-y-4 print:space-y-3">
                {certificates.map((cert, index) => (
                  <div key={index} className="mb-3 print:mb-2">
                    <h3 className="font-bold text-gray-900 print:text-base">
                      {cert.name}
                    </h3>
                    <p className="text-gray-700 font-semibold print:text-sm">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-600 text-sm mb-1 print:text-xs">
                      {cert.date}
                      {cert.expiration && ` · Valid until ${cert.expiration}`}
                    </p>
                    
                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900 text-sm flex items-center print:text-xs"
                      >
                        <FaCertificate className="mr-1" />
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Achievements */}
        {achievements?.length > 0 && (
          <div className="resume-section mb-8 page-break-inside-avoid print:mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-300 print:text-lg">
              Achievements
            </h2>
            
            <div className="space-y-4 print:space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="mb-3 print:mb-2 border-l-4 border-gray-200 pl-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 print:text-base">
                      {achievement.title}
                    </h3>
                    {achievement.date && (
                      <span className="text-gray-600 text-sm print:text-xs">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                  
                  {achievement.organization && (
                    <p className="text-gray-700 font-semibold print:text-sm">
                      {achievement.organization}
                    </p>
                  )}
                  
                  {achievement.description && (
                    <p className="text-gray-700 mt-1 text-sm print:text-xs">
                      {achievement.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>

      <footer className="bg-gray-100 border-t border-gray-200 py-3 text-center text-gray-500 text-xs print:bg-transparent print:border-t print:border-gray-300">
        <p>References available upon request</p>
      </footer>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0.4in;
            size: letter portrait;
          }
          
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-size: 12pt;
          }
          
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
          
          .resume-section {
            break-inside: avoid;
          }
          
          /* Ensure background colors print properly */
          .bg-gray-800 {
            background-color: #1f2937 !important;
          }
          
          /* Improve contrast for printing */
          .text-gray-700 {
            color: #374151 !important;
          }
          
          /* Better spacing for print */
          p, h2, h3 {
            margin-bottom: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
}