import React, { useRef, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate,
  FaLink,
  FaGraduationCap,
  FaAward,
  FaBriefcase,
  FaCode,
  FaLightbulb
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Berlin({ resumeData }) {
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
      {/* Simple header */}
      <header className="bg-indigo-600 text-white py-8">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name and title */}
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {personalInfo?.name || "Your Name"}
              </h1>
              
              {personalInfo?.title && (
                <h2 className="text-xl text-indigo-100">
                  {personalInfo.title}
                </h2>
              )}
            </div>
            
            {/* Contact info */}
            <div className="space-y-2 text-sm">
              {personalInfo?.email && (
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="flex items-center hover:text-indigo-200"
                >
                  <FaEnvelope className="mr-2" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              
              {personalInfo?.phone && (
                <a 
                  href={`tel:${personalInfo.phone}`} 
                  className="flex items-center hover:text-indigo-200"
                >
                  <FaPhone className="mr-2" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              
              {personalInfo?.location && (
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              
              <div className="flex gap-4 pt-2">
                {personalInfo?.linkedin && (
                  <a
                    href={ensureHttps(personalInfo.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-200"
                  >
                    <FaLinkedin size={18} />
                  </a>
                )}
                
                {personalInfo?.github && (
                  <a
                    href={ensureHttps(personalInfo.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-200"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Summary section */}
      {personalInfo?.summary && (
        <div className="bg-indigo-50 py-4 border-b border-indigo-100">
          <div className="max-w-5xl mx-auto px-8">
            <div className="resume-section">
              <p className="leading-relaxed">{personalInfo.summary}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className="max-w-5xl mx-auto px-8 py-8" ref={contentRef}>
        {/* Skills section */}
        {skills?.length > 0 && (
          <div className="resume-section mb-8">
            <h2 className="text-xl font-bold text-indigo-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <FaCode className="mr-2" /> Skills
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="bg-gray-100 px-3 py-2 rounded text-gray-700">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Experience section */}
        {experience?.length > 0 && (
          <div className="resume-section mb-8 page-break-inside-avoid">
            <h2 className="text-xl font-bold text-indigo-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <FaBriefcase className="mr-2" /> Experience
            </h2>
            
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index} className="border-l-4 border-indigo-200 pl-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {job.position || job.title}
                      </h3>
                      <p className="text-indigo-600 font-medium">
                        {job.company}
                        {job.location ? ` · ${job.location}` : ""}
                      </p>
                    </div>
                    <div className="md:text-right">
                      <span className="inline-block bg-gray-100 px-2 py-1 text-sm text-gray-700">
                        {job.startDate} — {job.endDate || "Present"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Projects section */}
        {projects?.length > 0 && (
          <div className="resume-section mb-8 page-break-inside-avoid">
            <h2 className="text-xl font-bold text-indigo-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <FaLightbulb className="mr-2" /> Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">
                      {project.title}
                    </h3>
                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <FaLink size={14} />
                      </a>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {project.description}
                  </p>
                  
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Two column layout for education and certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Education column */}
          {education?.length > 0 && (
            <div className="resume-section page-break-inside-avoid">
              <h2 className="text-xl font-bold text-indigo-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
                <FaGraduationCap className="mr-2" /> Education
              </h2>
              
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-indigo-200 pl-4">
                    <h3 className="font-bold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-indigo-600 font-medium">
                      {edu.school}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Certifications column */}
          {certificates?.length > 0 && (
            <div className="resume-section page-break-inside-avoid">
              <h2 className="text-xl font-bold text-indigo-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
                <FaCertificate className="mr-2" /> Certifications
              </h2>
              
              <div className="space-y-4">
                {certificates.map((cert, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3 text-indigo-500">
                      <FaCertificate size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        {cert.name}
                      </h3>
                      <p className="text-indigo-600">
                        {cert.issuer}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-gray-500 text-sm">
                          {cert.date}
                        </span>
                        
                        {cert.url && (
                          <a
                            href={ensureHttps(cert.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-xs flex items-center"
                          >
                            <FaLink className="mr-1" size={10} />
                            View Certificate
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Achievements */}
        {achievements?.length > 0 && (
          <div className="resume-section page-break-inside-avoid">
            <h2 className="text-xl font-bold text-indigo-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <FaAward className="mr-2" /> Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="bg-indigo-50 p-4 rounded"
                >
                  <h3 className="font-bold text-gray-900 mb-1">
                    {achievement.title}
                  </h3>
                  
                  <div className="flex justify-between items-center mb-2 text-sm">
                    {achievement.organization && (
                      <p className="text-indigo-600 font-medium">
                        {achievement.organization}
                      </p>
                    )}
                    {achievement.date && (
                      <span className="text-gray-500">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                  
                  {achievement.description && (
                    <p className="text-gray-600 text-sm">
                      {achievement.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <style jsx global>{`
        /* Print optimizations */
        @media print {
          @page {
            margin: 0.5in;
            size: letter portrait;
          }
          
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
          
          .resume-section {
            break-inside: avoid;
          }
          
          /* Background colors for print */
          .bg-indigo-600 {
            background-color: #4f46e5 !important;
          }
          
          .bg-indigo-50 {
            background-color: #eef2ff !important;
          }
          
          /* Text colors for print */
          .text-indigo-700 {
            color: #4338ca !important;
          }
          
          .text-indigo-600 {
            color: #4f46e5 !important;
          }
          
          .text-indigo-100 {
            color: #e0e7ff !important;
          }
          
          .text-gray-600 {
            color: #4b5563 !important;
          }
          
          /* Border colors for print */
          .border-indigo-200 {
            border-color: #c7d2fe !important;
          }
          
          /* Adjust spacing for print */
          .mb-8 {
            margin-bottom: 1.5rem !important;
          }
          
          .p-4 {
            padding: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
}