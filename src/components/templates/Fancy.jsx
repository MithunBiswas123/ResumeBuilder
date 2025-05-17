"use client";

import React, { useState, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='7' r='5' fill='%23475569'/%3E%3Cpath d='M12 13c-3.86 0-7 3.14-7 7h14c0-3.86-3.14-7-7-7z' fill='%23475569'/%3E%3C/svg%3E";

const themeColor = "indigo";
const themeShade = "600";

export default function Fancy({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } = resumeData || {};
 
  const [sectionOrder, setSectionOrder] = useState([]);
  const contentRef = useRef(null);
  
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };
  
  const allSections = [
    { 
      id: 'summary', 
      label: 'Summary',
      icon: <FaUserAlt />,
      available: !!personalInfo?.summary,
      content: (
        <section className="mb-2.5 resume-section">
          <h2 className={`text-sm font-bold text-${themeColor}-${themeShade} mb-1`}>PROFILE</h2>
          <div className="bg-white px-2 py-1.5">
            <p className="text-xs text-gray-600 leading-relaxed">{personalInfo?.summary}</p>
          </div>
        </section>
      )
    },
    { 
      id: 'experience', 
      label: 'Experience',
      icon: <FaBriefcase />,
      available: experience?.length > 0,
      content: (
        <section className="mb-2.5 resume-section">
          <h2 className={`text-sm font-bold text-${themeColor}-${themeShade} mb-1`}>EXPERIENCE</h2>
          <div className="space-y-2">
            {experience?.map((job, index) => (
              <div key={index} className="bg-white px-2 py-1.5 page-break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-gray-800">{job.position || job.title}</h3>
                  <span className="text-xs text-gray-500">{job.startDate} — {job.endDate || "Present"}</span>
                </div>
                <p className={`text-xs text-${themeColor}-${themeShade} font-medium`}>
                  {job.company}{job.location ? ` · ${job.location}` : ""}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">{job.description}</p>
              </div>
            ))}
          </div>
        </section>
      )
    },
    { 
      id: 'education', 
      label: 'Education',
      icon: <FaGraduationCap />,
      available: education?.length > 0,
      content: (
        <section className="mb-2.5 resume-section">
          <h2 className={`text-sm font-bold text-${themeColor}-${themeShade} mb-1`}>EDUCATION</h2>
          <div className="space-y-1.5">
            {education?.map((edu, index) => (
              <div key={index} className="bg-white px-2 py-1.5">
                <h3 className="text-xs font-bold text-gray-800">{edu.degree}</h3>
                <p className={`text-xs text-${themeColor}-${themeShade}`}>{edu.school}</p>
                <p className="text-xs text-gray-500">{edu.startDate} — {edu.endDate || "Present"}</p>
              </div>
            ))}
          </div>
        </section>
      )
    },
    { 
      id: 'skills', 
      label: 'Skills',
      icon: <FaTools />,
      available: skills?.length > 0,
      content: (
        <section className="mb-2.5 resume-section">
          <h2 className={`text-sm font-bold text-${themeColor}-${themeShade} mb-1`}>SKILLS</h2>
          <div className="bg-white px-2 py-1.5">
            <div className="flex flex-wrap gap-1">
              {skills?.map((skill, index) => (
                <span key={index} className={`px-1.5 py-0.5 text-xs border border-${themeColor}-${themeShade} text-${themeColor}-${themeShade} rounded`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )
    },
    { 
      id: 'projects', 
      label: 'Projects',
      icon: <FaLaptopCode />,
      available: projects?.length > 0,
      content: (
        <section className="mb-2.5 resume-section">
          <h2 className={`text-sm font-bold text-${themeColor}-${themeShade} mb-1`}>PROJECTS</h2>
          <div className="space-y-2">
            {projects?.map((project, index) => (
              <div key={index} className="bg-white px-2 py-1.5 page-break-inside-avoid">
                <div className="flex justify-between items-start">
                  <h3 className="text-xs font-bold text-gray-800">{project.title}</h3>
                  {project.link && (
                    <a href={ensureHttps(project.link)} target="_blank" rel="noopener noreferrer"
                      className={`text-${themeColor}-${themeShade} hover:text-${themeColor}-800`} aria-label="View Project">
                      <FaLink className="text-xs" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-gray-600 my-0.5">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className={`px-1.5 py-0.5 text-xs border border-${themeColor}-${themeShade} text-${themeColor}-${themeShade} rounded`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    },
    { 
      id: 'achievements', 
      label: 'Achievements',
      icon: <FaTrophy />,
      available: achievements?.length > 0,
      content: (
        <section className="mb-2.5 resume-section">
          <h2 className={`text-sm font-bold text-${themeColor}-${themeShade} mb-1`}>ACHIEVEMENTS</h2>
          <div className="space-y-1.5">
            {achievements?.map((achievement, index) => (
              <div key={index} className="bg-white px-2 py-1.5">
                <div className="flex justify-between">
                  <h3 className="text-xs font-bold text-gray-800">{achievement.title}</h3>
                  {achievement.date && (<span className="text-xs text-gray-500">{achievement.date}</span>)}
                </div>
                {achievement.organization && (
                  <p className={`text-xs text-${themeColor}-${themeShade}`}>{achievement.organization}</p>
                )}
                {achievement.description && (
                  <p className="text-xs text-gray-600 mt-0.5">{achievement.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    },
    { 
      id: 'certificates', 
      label: 'Certificates',
      icon: <FaCertificate />,
      available: certificates?.length > 0,
      content: (
        <section className="mb-2.5 resume-section">
          <h2 className={`text-sm font-bold text-${themeColor}-${themeShade} mb-1`}>CERTIFICATES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {certificates?.map((cert, index) => (
              <div key={index} className="bg-white px-2 py-1.5">
                <h3 className="text-xs font-bold text-gray-800">{cert.name}</h3>
                <p className={`text-xs text-${themeColor}-${themeShade}`}>{cert.issuer}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{cert.date}</span>
                  {cert.url && (
                    <a href={ensureHttps(cert.url)} target="_blank" rel="noopener noreferrer" 
                      className={`text-xs text-${themeColor}-${themeShade} underline`}>
                      View
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )
    },
  ];

  const availableSections = allSections.filter(section => section.available);
  const handleSectionClick = (sectionId) => {
    if (sectionOrder.includes(sectionId)) return;
    setSectionOrder(prev => [...prev, sectionId]);
  };
  const resetSections = () => setSectionOrder([]);

  return (
    <div className="bg-gray-50 min-h-full font-sans text-gray-700 relative">
      {/* Header - more compact */}
      <header className={`bg-${themeColor}-${themeShade} text-white py-2`}>
        <div className="max-w-4xl mx-auto px-3">
          {/* Profile Section with smaller image */}
          <div className="text-center mb-2">
            {/* {profileImage ? (
              <img src={profileImage} alt={personalInfo?.name || "Profile"}
                className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-white object-cover shadow-sm" />
            ) : (
              <div className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-white bg-gray-200 flex items-center justify-center shadow-sm">
                <FaUserAlt className={`text-${themeColor}-${themeShade} text-xl`} />
              </div>
            )} */}
            
            {/* Name and Details */}
            <div className="text-center">
              <h1 className="text-lg md:text-xl font-bold">{personalInfo?.name || "Your Name"}</h1>
              {personalInfo?.title && (
                <h2 className="text-xs md:text-sm font-light mb-1 text-white/90">{personalInfo.title}</h2>
              )}
            </div>
          </div>
          
          {/* Contact Details - more compact */}
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {personalInfo?.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center text-white/90 hover:text-white">
                <FaEnvelope className="mr-1 text-xs" /><span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo?.phone && (
              <a href={`tel:${personalInfo.phone}`} className="flex items-center text-white/90 hover:text-white">
                <FaPhone className="mr-1 text-xs" /><span>{personalInfo.phone}</span>
              </a>
            )}
            {personalInfo?.location && (
              <span className="flex items-center text-white/90">
                <FaMapMarkerAlt className="mr-1 text-xs" /><span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo?.linkedin && (
              <a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer"
                className="flex items-center text-white/90 hover:text-white">
                <FaLinkedin className="mr-1 text-xs" /><span>LinkedIn</span>
              </a>
            )}
            {personalInfo?.github && (
              <a href={ensureHttps(personalInfo.github)} target="_blank" rel="noopener noreferrer"
                className="flex items-center text-white/90 hover:text-white">
                <FaGithub className="mr-1 text-xs" /><span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Section Selector - more compact */}
      <div className="fixed top-3 right-3 z-10 p-1.5 bg-white/95 rounded-lg shadow-md border border-gray-200 backdrop-blur-sm w-36 print:hidden">
        <h3 className="text-[10px] font-medium text-gray-500 mb-1 text-center">Add Sections</h3>
        <div className="space-y-0.5 max-h-[60vh] overflow-y-auto">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center w-full px-1.5 py-0.5 rounded-md transition-all text-[10px] ${
                sectionOrder.includes(section.id)
                  ? 'bg-gray-100 text-gray-400 cursor-default'
                  : `border border-${themeColor}-${themeShade} text-${themeColor}-${themeShade} hover:bg-${themeColor}-50`
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className="mr-1 text-[10px]">{section.icon}</span>
              <span>{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className={`ml-auto w-3 h-3 flex items-center justify-center rounded-full bg-${themeColor}-${themeShade} text-white text-[8px]`}>
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          {sectionOrder.length > 0 && (
            <button onClick={resetSections}
              className={`w-full mt-0.5 px-1.5 py-0.5 border border-${themeColor}-${themeShade} text-${themeColor}-${themeShade} rounded-md transition-all text-[10px] font-medium hover:bg-${themeColor}-50`}>
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area - more compact */}
      <main className="max-w-4xl mx-auto px-3 py-3" ref={contentRef}>
        {sectionOrder.length > 0 ? (
          sectionOrder.map(sectionId => {
            const section = allSections.find(s => s.id === sectionId);
            if (!section || !section.available) return null;
            return <div key={sectionId} className="animate-fadeIn">{section.content}</div>;
          })
        ) : (
          <div className="text-center py-4 border border-dashed border-gray-300 rounded-lg print:hidden">
            <p className="text-xs text-gray-400">Select sections from the panel to add content</p>
          </div>
        )}
        
        {/* For print - show all sections in default order if nothing is selected */}
        {sectionOrder.length === 0 && (
          <div className="hidden print:block space-y-2">
            {availableSections.map(section => <div key={section.id}>{section.content}</div>)}
          </div>
        )}

        {/* Page numbers for print only */}
        <div className="hidden print:block text-right text-xs text-gray-400 pt-1">
          <span className="print-page-number"></span>
        </div>
      </main>
      
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.25in;
            size: letter portrait;
          }
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-size: 80%;
          }
          .resume-section {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .page-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .print-page-number:after {
            content: counter(page);
          }
          .bg-${themeColor}-${themeShade}, .bg-${themeColor}-50 {
            background-color: #4338ca !important;
          }
          .text-${themeColor}-${themeShade}, .text-${themeColor}-800 {
            color: #1f2937 !important;
          }
          .border-${themeColor}-${themeShade} {
            border-color: #4338ca !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}