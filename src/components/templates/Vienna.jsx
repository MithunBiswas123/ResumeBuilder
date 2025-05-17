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
  FaBriefcase,
  FaGraduationCap,
  FaMedal,
  FaCode,
  FaLaptopCode
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Vienna({ resumeData }) {
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
    <div className="font-serif bg-amber-50 min-h-full text-gray-800 print:text-sm">
      {/* Elegant header with name and title */}
      <header className="bg-gradient-to-r from-amber-700 to-amber-600 pt-6 pb-3 px-8 text-amber-50">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-1">
            {personalInfo?.name || "Your Name"}
          </h1>
          
          {personalInfo?.title && (
            <p className="text-lg md:text-xl opacity-90 font-light">
              {personalInfo.title}
            </p>
          )}
          
          {/* Contact information in an elegant horizontal layout */}
          <div className="flex flex-wrap items-center mt-6 gap-4 md:gap-6 text-sm border-t border-amber-500/30 pt-4">
            {personalInfo?.email && (
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="flex items-center hover:text-white"
              >
                <FaEnvelope className="mr-2 text-amber-300" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            
            {personalInfo?.phone && (
              <a 
                href={`tel:${personalInfo.phone}`} 
                className="flex items-center hover:text-white"
              >
                <FaPhone className="mr-2 text-amber-300" />
                <span>{personalInfo.phone}</span>
              </a>
            )}
            
            {personalInfo?.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-amber-300" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-white"
              >
                <FaLinkedin className="mr-2 text-amber-300" />
                <span>LinkedIn</span>
              </a>
            )}
            
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-white"
              >
                <FaGithub className="mr-2 text-amber-300" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Summary with elegant border treatment */}
      <section className="max-w-5xl mx-auto px-8 py-6">
        {personalInfo?.summary && (
          <div className="resume-section border-l-4 border-amber-300 pl-4 italic text-gray-700">
            <p className="leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
      </section>
      
      {/* Main content with elegant gold accents */}
      <main className="max-w-5xl mx-auto px-8 pb-12" ref={contentRef}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="md:col-span-2">
            {/* Experience section with elegant timeline */}
            {experience?.length > 0 && (
              <div className="resume-section mb-3 page-break-inside-avoid">
                <h2 className="text-2xl font-light text-amber-800 border-b-2 border-amber-200 pb-2 mb-6 flex items-center">
                  <FaBriefcase className="mr-3 text-amber-600" />
                  Professional Experience
                </h2>
                
                <div className="relative">
                  {/* Timeline styling */}
                  <div className="hidden md:block absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-amber-300 to-amber-100"></div>
                  
                  {experience.map((job, index) => (
                    <div 
                      key={index} 
                      className={`relative pl-6 md:pl-8 pb-8 ${index === experience.length - 1 ? '' : 'mb-4 border-b border-amber-100'}`}
                    >
                      {/* Timeline dot */}
                      <div className="hidden md:block absolute left-[-5px] top-2 w-[10px] h-[10px] rounded-full border-2 border-amber-400 bg-amber-100"></div>
                      
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {job.position || job.title}
                        </h3>
                        <p className="text-amber-700 italic text-sm">
                          {job.startDate} — {job.endDate || "Present"}
                        </p>
                      </div>
                      
                      <p className="text-amber-800 font-medium mb-2">
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
            )}
            
            {/* Projects section with elegant cards */}
            {projects?.length > 0 && (
              <div className="resume-section mb-3 page-break-inside-avoid">
                <h2 className="text-2xl font-light text-amber-800 border-b-2 border-amber-200 pb-2 mb-6 flex items-center">
                  <FaLaptopCode className="mr-3 text-amber-600" />
                  Projects
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-sm border border-amber-100 shadow-sm overflow-hidden"
                    >
                      <div className="border-b border-amber-100 p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {project.title}
                          </h3>
                          {project.link && (
                            <a
                              href={ensureHttps(project.link)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-600 hover:text-amber-800"
                            >
                              <FaLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        {project.technologies && (
                          <div className="mb-3 flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <span 
                                key={i} 
                                className="bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded-sm border border-amber-200"
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
            
            {/* Achievements with elegant design */}
            {achievements?.length > 0 && (
              <div className="resume-section page-break-inside-avoid">
                <h2 className="text-2xl font-light text-amber-800 border-b-2 border-amber-200 pb-2 mb-6 flex items-center">
                  <FaMedal className="mr-3 text-amber-600" />
                  Notable Achievements
                </h2>
                
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-4 border-l-4 border-amber-300"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {achievement.title}
                        </h3>
                        {achievement.date && (
                          <span className="text-amber-700 italic text-sm">
                            {achievement.date}
                          </span>
                        )}
                      </div>
                      
                      {achievement.organization && (
                        <p className="text-amber-800 font-medium text-sm">
                          {achievement.organization}
                        </p>
                      )}
                      
                      {achievement.description && (
                        <p className="text-gray-600 mt-1 text-sm">
                          {achievement.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right column - sidebar */}
          <div>
            {/* Photo - optional elegant circular frame */}
            {personalInfo?.photoUrl && (
              <div className="mb-6 flex justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-200 shadow-sm">
                  <img 
                    src={personalInfo.photoUrl}
                    alt={personalInfo?.name || "Profile"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            
            {/* Skills with elegant visual style */}
            {skills?.length > 0 && (
              <div className="resume-section mb-8">
                <h2 className="text-xl font-light text-amber-800 border-b-2 border-amber-200 pb-2 mb-4 flex items-center">
                  <FaCode className="mr-2 text-amber-600" />
                  Skills
                </h2>
                
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-white border border-amber-200 text-amber-900 px-3 py-1 rounded-sm text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education with elegant styling */}
            {education?.length > 0 && (
              <div className="resume-section mb-8">
                <h2 className="text-xl font-light text-amber-800 border-b-2 border-amber-200 pb-2 mb-4 flex items-center">
                  <FaGraduationCap className="mr-2 text-amber-600" />
                  Education
                </h2>
                
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-amber-200 pl-3">
                      <h3 className="font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-amber-800">
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
            
            {/* Certifications with elegant styling */}
            {certificates?.length > 0 && (
              <div className="resume-section">
                <h2 className="text-xl font-light text-amber-800 border-b-2 border-amber-200 pb-2 mb-4 flex items-center">
                  <FaCertificate className="mr-2 text-amber-600" />
                  Certifications
                </h2>
                
                <div className="space-y-4">
                  {certificates.map((cert, index) => (
                    <div key={index} className="bg-white p-3 border border-amber-100 rounded-sm">
                      <h3 className="font-semibold text-gray-900">
                        {cert.name}
                      </h3>
                      <p className="text-amber-800 text-sm">
                        {cert.issuer}
                      </p>
                      <p className="text-gray-500 text-xs mb-1">
                        {cert.date}
                      </p>
                      
                      {cert.url && (
                        <a
                          href={ensureHttps(cert.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-800 text-xs flex items-center mt-1"
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
        </div>
      </main>
      
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
          
          /* Color adjustments for printing */
          .bg-amber-50 {
            background-color: #fffbeb !important;
          }
          
          .from-amber-700 {
            background-color: #b45309 !important;
          }
          
          .to-amber-600 {
            background-color: #d97706 !important;
          }
          
          .border-amber-300 {
            border-color: #fcd34d !important;
          }
          
          .border-amber-200 {
            border-color: #fde68a !important;
          }
          
          .text-amber-800 {
            color: #92400e !important;
          }
          
          .text-amber-700 {
            color: #b45309 !important;
          }
          
          .text-amber-600 {
            color: #d97706 !important;
          }
          
          .text-gray-600 {
            color: #4b5563 !important;
          }
          
          /* Remove shadows when printing */
          .shadow-sm {
            box-shadow: none !important;
          }
          
          /* Adjust margins for print */
          .mb-10 {
            margin-bottom: 1.5rem !important;
          }
          
          .px-8 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}