import React, { useRef, useEffect } from "react";
import {
  FaEnvelope, 
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCertificate,
  FaLink,
  FaHistory,
  FaUser,
  FaTools,
  FaLightbulb,
  FaGraduationCap,
  FaTrophy
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Milano({ resumeData }) {
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
      {/* Header with name and title */}
      <header className="bg-blue-700 px-8 pt-12 pb-20 relative overflow-hidden">
        {/* Geometric decorations */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full -mt-36 -mr-36 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-52 h-52 bg-blue-600 rounded-full -mb-36 -ml-20 opacity-20"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white tracking-tight print:text-3xl">
              {personalInfo?.name || "Your Name"}
            </h1>
            
            {personalInfo?.title && (
              <p className="text-xl mt-2 text-blue-100 font-light">
                {personalInfo.title}
              </p>
            )}
          </div>
        </div>
      </header>
      
      {/* Contact info bar */}
      <div className="bg-white shadow-lg px-8 py-4 -mt-10 mb-12 relative z-20 mx-8 rounded-lg border border-gray-100 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {personalInfo?.email && (
          <a 
            href={`mailto:${personalInfo.email}`} 
            className="flex items-center text-blue-700 hover:text-blue-900"
          >
            <FaEnvelope className="mr-2" />
            <span>{personalInfo.email}</span>
          </a>
        )}
        
        {personalInfo?.phone && (
          <a 
            href={`tel:${personalInfo.phone}`} 
            className="flex items-center text-blue-700 hover:text-blue-900"
          >
            <FaPhone className="mr-2" />
            <span>{personalInfo.phone}</span>
          </a>
        )}
        
        {personalInfo?.location && (
          <div className="flex items-center text-blue-700">
            <FaMapMarkerAlt className="mr-2" />
            <span>{personalInfo.location}</span>
          </div>
        )}
        
        {personalInfo?.linkedin && (
          <a
            href={ensureHttps(personalInfo.linkedin)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-700 hover:text-blue-900"
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
            className="flex items-center text-blue-700 hover:text-blue-900"
          >
            <FaGithub className="mr-2" />
            <span>GitHub</span>
          </a>
        )}
      </div>
      
      {/* Main content */}
      <div className="max-w-5xl mx-auto px-8 pb-8" ref={contentRef}>
        {/* Two column layout for top sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Summary in left column */}
          {personalInfo?.summary && (
            <div className="md:col-span-2 resume-section">
              <div className="flex items-center mb-5">
                <div className="bg-blue-700 p-2 rounded-md text-white mr-3">
                  <FaUser className="text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}
          
          {/* Skills in right column */}
          {skills?.length > 0 && (
            <div className="resume-section">
              <div className="flex items-center mb-5">
                <div className="bg-blue-700 p-2 rounded-md text-white mr-3">
                  <FaTools className="text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Experience with modern timeline design */}
        {experience?.length > 0 && (
          <div className="mb-10 resume-section">
            <div className="flex items-center mb-6">
              <div className="bg-blue-700 p-2 rounded-md text-white mr-3">
                <FaHistory className="text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
            </div>
            
            {/* Timeline container */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-10 w-0.5 bg-blue-200"></div>
              
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <div key={index} className="relative pl-12">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-6 h-6 bg-blue-700 rounded-full border-4 border-blue-50 z-10"></div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                      <h3 className="font-bold text-xl text-gray-900">
                        {job.position || job.title}
                      </h3>
                      <span className="text-blue-800 font-medium text-sm bg-blue-50 px-3 py-1 rounded-full">
                        {job.startDate} — {job.endDate || "Present"}
                      </span>
                    </div>
                    
                    <p className="text-blue-800 font-semibold mb-2">
                      {job.company}
                      {job.location ? ` · ${job.location}` : ""}
                    </p>
                    
                    <p className="text-gray-600">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Projects in modern cards */}
        {projects?.length > 0 && (
          <div className="mb-10 resume-section page-break-inside-avoid">
            <div className="flex items-center mb-6">
              <div className="bg-blue-700 p-2 rounded-md text-white mr-3">
                <FaLightbulb className="text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className="rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  {/* Project header with gradient */}
                  <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 text-white">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">
                        {project.title}
                      </h3>
                      {project.link && (
                        <a
                          href={ensureHttps(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 p-1 rounded transition"
                        >
                          <FaLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white">
                    {project.technologies && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-gray-600 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education and Certifications in a 2-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
          {/* Education column */}
          {education?.length > 0 && (
            <div className="resume-section page-break-inside-avoid">
              <div className="flex items-center mb-5">
                <div className="bg-blue-700 p-2 rounded-md text-white mr-3">
                  <FaGraduationCap className="text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Education</h2>
              </div>
              
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4 py-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {edu.degree}
                    </h3>
                    <p className="text-blue-800 font-medium">
                      {edu.school}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                    {edu.description && (
                      <p className="text-gray-600 mt-1 text-sm">
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
              <div className="flex items-center mb-5">
                <div className="bg-blue-700 p-2 rounded-md text-white mr-3">
                  <FaCertificate className="text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
              </div>
              
              <div className="space-y-4">
                {certificates.map((cert, index) => (
                  <div key={index} className="border-l-4 border-blue-400 pl-4 py-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {cert.name}
                      </h3>
                      <span className="text-gray-500 text-sm">
                        {cert.date}
                      </span>
                    </div>
                    <p className="text-blue-700 font-medium">
                      {cert.issuer}
                    </p>
                    {cert.url && (
                      <a
                        href={ensureHttps(cert.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-1"
                      >
                        <FaLink className="mr-1" size={12} />
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
          <div className="resume-section page-break-inside-avoid">
            <div className="flex items-center mb-5">
              <div className="bg-blue-700 p-2 rounded-md text-white mr-3">
                <FaTrophy className="text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {achievement.title}
                    </h3>
                    {achievement.date && (
                      <span className="text-gray-500 text-sm">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                  
                  {achievement.organization && (
                    <p className="text-blue-700 font-medium">
                      {achievement.organization}
                    </p>
                  )}
                  
                  {achievement.description && (
                    <p className="text-gray-600 mt-1">
                      {achievement.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-4 border-t border-gray-100 text-center text-gray-400 text-xs print:hidden">
        <p>Created with Resume Builder • Updated {new Date().toLocaleDateString()}</p>
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
          }
          
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
          
          .resume-section {
            break-inside: avoid;
          }
          
          /* Color overrides for printing */
          .bg-blue-700 {
            background-color: #1d4ed8 !important; 
          }
          
          .border-blue-600 {
            border-color: #2563eb !important;
          }
          
          .border-blue-400 {
            border-color: #60a5fa !important;
          }
          
          .border-blue-100 {
            border-color: #dbeafe !important;
          }
          
          .text-blue-700 {
            color: #1d4ed8 !important;
          }
          
          .text-blue-800 {
            color: #1e40af !important;
          }
          
          .text-gray-600 {
            color: #4b5563 !important;
          }
          
          /* Reset shadows for print */
          .shadow-md, .shadow-lg {
            box-shadow: none !important;
          }
          
          /* Adjust spacing for print */
          .mb-10 {
            margin-bottom: 1.5rem !important;
          }
          
          .px-8 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          /* Make sure the contact bar looks good when printed */
          .shadow-lg {
            box-shadow: none !important;
          }
          
          .-mt-10 {
            margin-top: -1.5rem !important;
          }
          
          .rounded-lg {
            border-radius: 0.375rem !important;
          }
          
          /* Fix background gradients for print */
          .bg-gradient-to-r {
            background-image: none !important;
          }
          
          .from-blue-700 {
            background-color: #1d4ed8 !important;
          }
          
          .to-blue-500 {
            background-color: #3b82f6 !important;
          }
          
          .from-blue-50 {
            background-color: #eff6ff !important;
          }
        }
      `}</style>
    </div>
  );
}