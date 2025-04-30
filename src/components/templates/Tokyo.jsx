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
  FaGraduationCap,
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Horizon({ resumeData }) {
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
    <div className="bg-slate-50 min-h-full font-sans text-slate-800 print:text-sm">
      {/* Responsive grid layout - stacks on mobile, side-by-side on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12">
        {/* Sidebar - Full width on mobile, 3 columns on larger screens */}
        <div className="md:col-span-3 print:col-span-3 bg-gradient-to-br from-purple-900 to-purple-700 text-white p-6 print:p-4 min-h-0 md:min-h-screen print:min-h-full relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600 rounded-full -mr-20 -mt-20 opacity-20 hidden md:block print:block"></div>
          
          <div className="relative z-10">
            {/* Profile image - centered and responsive */}
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-purple-300 rounded-full mb-6 overflow-hidden border-4 border-purple-400">
              {personalInfo?.photoUrl ? (
                <img 
                  src={personalInfo.photoUrl} 
                  alt={personalInfo?.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 text-white text-4xl font-bold">
                  {personalInfo?.name ? personalInfo.name.charAt(0) : "?"}
                </div>
              )}
            </div>
            
            {/* Name and title - responsive text sizes */}
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-xl md:text-2xl font-bold mb-1 tracking-wide print:text-xl">
                {personalInfo?.name || "Your Name"}
              </h1>
              {personalInfo?.title && (
                <p className="text-sm md:text-base text-purple-200 font-light print:text-sm">
                  {personalInfo.title}
                </p>
              )}
            </div>
            
            {/* Contact details - organized for mobile and desktop */}
            <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-sm">
              <h2 className="uppercase tracking-widest text-xs font-bold text-purple-300 border-b border-purple-600 pb-1 mb-2 md:mb-3">
                Contact
              </h2>
              
              <div className="flex flex-col space-y-2">
                {personalInfo?.email && (
                  <a 
                    href={`mailto:${personalInfo.email}`} 
                    className="flex items-center text-purple-100 hover:text-white"
                  >
                    <FaEnvelope className="mr-3 text-purple-300 flex-shrink-0" />
                    <span className="text-sm truncate">{personalInfo.email}</span>
                  </a>
                )}
                
                {personalInfo?.phone && (
                  <a 
                    href={`tel:${personalInfo.phone}`} 
                    className="flex items-center text-purple-100 hover:text-white"
                  >
                    <FaPhone className="mr-3 text-purple-300 flex-shrink-0" />
                    <span className="text-sm">{personalInfo.phone}</span>
                  </a>
                )}
                
                {personalInfo?.location && (
                  <div className="flex items-center text-purple-100">
                    <FaMapMarkerAlt className="mr-3 text-purple-300 flex-shrink-0" />
                    <span className="text-sm">{personalInfo.location}</span>
                  </div>
                )}
              </div>
              
              {/* Social links */}
              {(personalInfo?.linkedin || personalInfo?.github) && (
                <div className="pt-2 border-t border-purple-600 flex flex-col space-y-2">
                  {personalInfo?.linkedin && (
                    <a
                      href={ensureHttps(personalInfo.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-purple-100 hover:text-white"
                    >
                      <FaLinkedin className="mr-3 text-purple-300 flex-shrink-0" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                  
                  {personalInfo?.github && (
                    <a
                      href={ensureHttps(personalInfo.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-purple-100 hover:text-white"
                    >
                      <FaGithub className="mr-3 text-purple-300 flex-shrink-0" />
                      <span className="text-sm">GitHub</span>
                    </a>
                  )}
                </div>
              )}
            </div>
            
            {/* Skills - responsive flex layout */}
            {skills?.length > 0 && (
              <div className="mb-6 md:mb-8">
                <h2 className="uppercase tracking-widest text-xs font-bold text-purple-300 border-b border-purple-600 pb-1 mb-3 md:mb-4">
                  Skills
                </h2>
                
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-purple-800 bg-opacity-40 text-purple-100 px-2 py-1 rounded text-xs print:bg-purple-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education on sidebar */}
            {education?.length > 0 && (
              <div className="resume-section">
                <h2 className="uppercase tracking-widest text-xs font-bold text-purple-300 border-b border-purple-600 pb-1 mb-3 md:mb-4">
                  Education
                </h2>
                
                <div className="space-y-3">
                  {education.map((edu, index) => (
                    <div key={index} className="mb-3 flex items-start">
                      <FaGraduationCap className="mt-1 mr-3 text-purple-300 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-white text-sm">
                          {edu.degree}
                        </h3>
                        <p className="text-purple-200 text-xs">
                          {edu.school}
                        </p>
                        <p className="text-purple-300 text-xs opacity-80">
                          {edu.startDate} — {edu.endDate || "Present"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Main content area - Full width on mobile, 9 columns on larger screens */}
        <div className="md:col-span-9 print:col-span-9 p-6 md:p-8 print:p-6" ref={contentRef}>
          {/* Summary with accent border */}
          {personalInfo?.summary && (
            <div className="resume-section mb-6 md:mb-8 print:mb-6">
              <div className="relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-600 rounded-full"></div>
                <div className="pl-4 md:pl-6">
                  <h2 className="text-lg font-bold text-purple-900 mb-2 md:mb-3 uppercase tracking-wider print:text-base">
                    About Me
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-sm print:text-xs">
                    {personalInfo.summary}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Experience - responsive layout */}
          {experience?.length > 0 && (
            <div className="resume-section mb-6 md:mb-8 page-break-inside-avoid print:mb-6">
              <div className="relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-600 rounded-full"></div>
                <div className="pl-4 md:pl-6">
                  <h2 className="text-lg font-bold text-purple-900 mb-4 md:mb-5 uppercase tracking-wider print:text-base">
                    Experience
                  </h2>
                  
                  <div className="space-y-4 md:space-y-6 print:space-y-4">
                    {experience.map((job, index) => (
                      <div key={index} className="relative">
                        <div className="flex flex-col mb-2">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div>
                              <h3 className="font-bold text-slate-900 text-base sm:text-base print:text-sm">
                                {job.position || job.title}
                              </h3>
                              <p className="text-purple-700 font-medium text-sm print:text-xs">
                                {job.company}
                                {job.location ? ` • ${job.location}` : ""}
                              </p>
                            </div>
                            <div className="flex items-center text-slate-500 text-xs bg-slate-100 px-3 py-1 rounded-full mt-1 sm:mt-0 print:bg-transparent self-start">
                              <FaCalendarAlt className="mr-1 flex-shrink-0" />
                              <span>{job.startDate} — {job.endDate || "Present"}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm print:text-xs">
                          {job.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Projects - responsive grid */}
          {projects?.length > 0 && (
            <div className="resume-section mb-6 md:mb-8 page-break-inside-avoid print:mb-6">
              <div className="relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-600 rounded-full"></div>
                <div className="pl-4 md:pl-6">
                  <h2 className="text-lg font-bold text-purple-900 mb-4 md:mb-5 uppercase tracking-wider print:text-base">
                    Projects
                  </h2>
                  
                  {/* Responsive grid - 1 column on small screens, 2 on larger */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 print:gap-3 print:grid-cols-2">
                    {projects.map((project, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm p-3 md:p-4 border border-slate-100 print:border print:border-slate-200">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-slate-900 text-sm print:text-sm">
                            {project.title}
                          </h3>
                          {project.link && (
                            <a
                              href={ensureHttps(project.link)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:text-purple-800 print:text-purple-800"
                            >
                              <FaLink size={14} className="flex-shrink-0" />
                            </a>
                          )}
                        </div>
                        
                        {project.technologies && (
                          <div className="mb-2 flex flex-wrap gap-1">
                            {project.technologies.map((tech, i) => (
                              <span 
                                key={i} 
                                className="bg-purple-50 text-purple-800 text-xs px-2 py-0.5 rounded print:bg-transparent print:text-slate-700 print:border print:border-slate-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-slate-600 text-xs">
                          {project.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Certifications and achievements - responsive layout */}
          <div className="grid grid-cols-1 gap-6 mb-6 md:gap-8 md:mb-8 print:gap-6 print:mb-6">
            {/* Certifications */}
            {certificates?.length > 0 && (
              <div className="resume-section page-break-inside-avoid">
                <div className="relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-purple-600 rounded-full"></div>
                  <div className="pl-4 md:pl-6">
                    <h2 className="text-lg font-bold text-purple-900 mb-2 md:mb-3 uppercase tracking-wider print:text-base">
                      Certifications
                    </h2>
                    
                    <div className="space-y-2 print:space-y-1">
                      {certificates.map((cert, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mr-3 text-purple-600 mt-1">
                            <FaCertificate size={16} className="flex-shrink-0" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <h3 className="font-bold text-slate-800 text-sm print:text-xs">
                                {cert.name}
                              </h3>
                              <span className="text-slate-500 text-xs mt-0.5 sm:mt-0">
                                {cert.date}
                              </span>
                            </div>
                            <p className="text-purple-700 text-xs print:text-[10px]">
                              {cert.issuer}
                            </p>
                            
                            {cert.url && (
                              <a
                                href={ensureHttps(cert.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-800 text-xs flex items-center mt-1"
                              >
                                <FaLink className="mr-1" size={10} />
                                View Certificate
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Achievements - responsive design */}
            {achievements?.length > 0 && (
              <div className="resume-section page-break-inside-avoid">
                <div className="relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-purple-600 rounded-full"></div>
                  <div className="pl-4 md:pl-6">
                    <h2 className="text-lg font-bold text-purple-900 mb-2 md:mb-3 uppercase tracking-wider print:text-base">
                      Achievements
                    </h2>
                    
                    <div className="space-y-2 md:space-y-3 print:space-y-2">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="bg-gradient-to-r from-purple-50 to-transparent p-2 md:p-3 rounded-r-lg print:bg-transparent print:border-l print:border-l-purple-200">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <h3 className="font-bold text-slate-800 text-sm print:text-xs">
                              {achievement.title}
                            </h3>
                            {achievement.date && (
                              <span className="text-slate-500 text-xs mt-0.5 sm:mt-0">
                                {achievement.date}
                              </span>
                            )}
                          </div>
                          
                          {achievement.organization && (
                            <p className="text-purple-700 text-xs print:text-[10px]">
                              {achievement.organization}
                            </p>
                          )}
                          
                          {achievement.description && (
                            <p className="text-slate-600 text-xs mt-1 print:text-[10px]">
                              {achievement.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.4in;
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
          .from-purple-900 {
            background-color: #581c87 !important;
          }
          
          .to-purple-700 {
            background-color: #7e22ce !important;
          }
          
          .bg-purple-600 {
            background-color: #9333ea !important;
          }
          
          .text-purple-700 {
            color: #7e22ce !important;
          }
          
          .text-slate-600 {
            color: #475569 !important;
          }
          
          /* Fix min-height issue for printing */
          .min-h-screen {
            min-height: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}