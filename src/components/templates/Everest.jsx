





"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaCamera, FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='7' r='5' fill='%23475569'/%3E%3Cpath d='M12 13c-3.86 0-7 3.14-7 7h14c0-3.86-3.14-7-7-7z' fill='%23475569'/%3E%3C/svg%3E";

export default function TwoColumn({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements, certificates } =
    resumeData || {};

  const [profileImage, setProfileImage] = useState(personalInfo?.photoUrl || defaultImage);
  const [sectionOrder, setSectionOrder] = useState([]);
  const contentRef = useRef(null);
  
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  useEffect(() => {
    if (personalInfo?.photoUrl) {
      setProfileImage(personalInfo.photoUrl);
    }
  }, [personalInfo?.photoUrl]);
  
  // Define sections for left column
  const leftSections = [
    { 
      id: 'contact',
      label: 'Contact',
      icon: <FaUserAlt />,
      available: true, // Always show contact info
      content: (
        <section className="mb-3 resume-section">
          <h2 className="text-[9px] uppercase font-bold text-gray-100 mb-1 bg-slate-700 py-0.5 px-2">Contact</h2>
          <div className="space-y-1 text-[8px]">
            {personalInfo?.email && (
              <div className="flex items-start">
                <span className="text-slate-600 mr-1.5"><FaEnvelope size={8} /></span>
                <a href={`mailto:${personalInfo.email}`} className="text-slate-800">
                  {personalInfo.email}
                </a>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-start">
                <span className="text-slate-600 mr-1.5"><FaPhone size={8} /></span>
                <a href={`tel:${personalInfo.phone}`} className="text-slate-800">
                  {personalInfo.phone}
                </a>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-start">
                <span className="text-slate-600 mr-1.5"><FaMapMarkerAlt size={8} /></span>
                <span className="text-slate-800">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-start">
                <span className="text-slate-600 mr-1.5"><FaLinkedin size={8} /></span>
                <a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="text-slate-800">
                  LinkedIn
                </a>
              </div>
            )}
            {personalInfo?.github && (
              <div className="flex items-start">
                <span className="text-slate-600 mr-1.5"><FaGithub size={8} /></span>
                <a href={ensureHttps(personalInfo.github)} target="_blank" rel="noopener noreferrer" className="text-slate-800">
                  GitHub
                </a>
              </div>
            )}
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
        <section className="mb-3 resume-section">
          <h2 className="text-[9px] uppercase font-bold text-gray-100 mb-1 bg-slate-700 py-0.5 px-2">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {skills?.map((skill, index) => (
              <span 
                key={index} 
                className="px-1.5 py-0 text-[8px] bg-slate-100 text-slate-700 rounded"
              >
                {skill}
              </span>
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
        <section className="mb-3 resume-section">
          <h2 className="text-[9px] uppercase font-bold text-gray-100 mb-1 bg-slate-700 py-0.5 px-2">Education</h2>
          
          <div className="space-y-2">
            {education?.map((edu, index) => (
              <div key={index}>
                <h3 className="text-[9px] font-bold text-slate-800">{edu.degree}</h3>
                <p className="text-[8px] text-slate-700">{edu.school}</p>
                <p className="text-[8px] text-slate-500">
                  {edu.startDate} — {edu.endDate || "Present"}
                </p>
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
        <section className="mb-3 resume-section">
          <h2 className="text-[9px] uppercase font-bold text-gray-100 mb-1 bg-slate-700 py-0.5 px-2">Certifications</h2>
          
          <div className="space-y-1.5">
            {certificates?.map((cert, index) => (
              <div key={index}>
                <h3 className="text-[9px] font-bold text-slate-800">{cert.name}</h3>
                <p className="text-[8px] text-slate-600">{cert.issuer}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[7px] text-slate-500">{cert.date}</span>
                  
                  {cert.url && (
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[8px] text-slate-600 underline"
                    >
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
  
  // Define sections for right column
  const rightSections = [
    { 
      id: 'summary', 
      label: 'Summary',
      icon: <FaUserAlt />,
      available: !!personalInfo?.summary,
      content: (
        <section className="mb-3 resume-section">
          <h2 className="text-[10px] uppercase font-bold text-slate-800 border-b border-slate-300 pb-0.5 mb-1">Professional Summary</h2>
          <p className="text-[9px] text-slate-700 leading-tight">{personalInfo?.summary}</p>
        </section>
      )
    },
    { 
      id: 'experience', 
      label: 'Experience',
      icon: <FaBriefcase />,
      available: experience?.length > 0,
      content: (
        <section className="mb-3 resume-section">
          <h2 className="text-[10px] uppercase font-bold text-slate-800 border-b border-slate-300 pb-0.5 mb-1">Professional Experience</h2>
          
          <div className="space-y-2">
            {experience?.map((job, index) => (
              <div key={index} className="page-break-inside-avoid">
                <div className="flex justify-between items-start">
                  <h3 className="text-[10px] font-bold text-slate-800">
                    {job.position || job.title}
                  </h3>
                  <span className="text-[8px] text-slate-500 whitespace-nowrap">
                    {job.startDate} — {job.endDate || "Present"}
                  </span>
                </div>
                
                <p className="text-[9px] text-slate-600 font-medium -mt-0.5">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
                
                <p className="text-[8px] text-slate-700 mt-0.5 leading-tight">
                  {job.description}
                </p>
              </div>
            ))}
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
        <section className="mb-3 resume-section">
          <h2 className="text-[10px] uppercase font-bold text-slate-800 border-b border-slate-300 pb-0.5 mb-1">Projects</h2>
          
          <div className="space-y-2">
            {projects?.map((project, index) => (
              <div 
                key={index} 
                className="page-break-inside-avoid"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-[10px] font-bold text-slate-800">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600"
                      aria-label="View Project"
                    >
                      <FaLink size={8} />
                    </a>
                  )}
                </div>
                
                <p className="text-[8px] text-slate-700 mt-0.5 leading-tight">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-1 py-0 text-[7px] bg-slate-100 text-slate-600 rounded"
                      >
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
        <section className="mb-3 resume-section">
          <h2 className="text-[10px] uppercase font-bold text-slate-800 border-b border-slate-300 pb-0.5 mb-1">Achievements</h2>
          
          <div className="space-y-2">
            {achievements?.map((achievement, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <h3 className="text-[9px] font-bold text-slate-800">
                    {achievement.title}
                  </h3>
                  {achievement.date && (
                    <span className="text-[8px] text-slate-500">
                      {achievement.date}
                    </span>
                  )}
                </div>
                
                {achievement.organization && (
                  <p className="text-[8px] text-slate-600 -mt-0.5">
                    {achievement.organization}
                  </p>
                )}
                
                {achievement.description && (
                  <p className="text-[8px] text-slate-700 mt-0.5 leading-tight">
                    {achievement.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    }
  ];

  // Combine all sections for the section selector
  const allSections = [
    ...leftSections.filter(s => s.id !== 'contact'),  // Contact is always shown
    ...rightSections
  ];

  const availableSections = allSections.filter(section => section.available);

  const handleSectionClick = (sectionId) => {
    if (sectionOrder.includes(sectionId)) return;
    setSectionOrder(prev => [...prev, sectionId]);
  };

  const resetSections = () => {
    setSectionOrder([]);
  };

  // Filter sections by column
  const getLeftColumnSections = () => {
    // Always include contact section
    const contact = leftSections.find(s => s.id === 'contact');
    
    // Only include other left sections that are in the order
    const orderedLeftSections = sectionOrder
      .map(id => leftSections.find(s => s.id === id))
      .filter(s => s && s.id !== 'contact' && s.available);
    
    return [contact, ...orderedLeftSections].filter(Boolean);
  };
  
  const getRightColumnSections = () => {
    return sectionOrder
      .map(id => rightSections.find(s => s.id === id))
      .filter(s => s && s.available);
  };

  return (
    <div className="bg-white min-h-full font-sans text-slate-800 relative">
      {/* Header with name and title */}
      <header className="bg-slate-800 px-3 py-2">
        <div className="flex items-center">
          {/* Profile Image with Upload */}
          <div className="relative mr-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
              <img 
                src={profileImage} 
                alt={personalInfo?.name || "Profile"} 
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 bg-white p-0.5 rounded-full shadow cursor-pointer hover:bg-gray-100 print:hidden">
              <FaCamera className="w-5 h-5 text-slate-600" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
          
          {/* Name and Title */}
          <div>
            <h1 className="text-base font-bold text-white leading-tight">
              {personalInfo?.name || "Your Name"}
            </h1>
            {personalInfo?.title && (
              <h2 className="text-xs font-light text-white/80">
                {personalInfo.title}
              </h2>
            )}
          </div>
        </div>
      </header>

      {/* Section Selector - Right side floating panel */}
      <div className="fixed top-16 right-2 z-10 p-1.5 bg-white/95 rounded-lg shadow-lg border border-gray-200 backdrop-blur-sm w-36 print:hidden">
        <h3 className="text-[10px] font-medium text-gray-500 mb-1 text-center">
          Add Sections
        </h3>
        <div className="space-y-0.5 max-h-[70vh] overflow-y-auto">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center w-full px-1.5 py-1 rounded-md transition-all text-[9px] ${
                sectionOrder.includes(section.id)
                  ? 'bg-gray-200 text-gray-400 cursor-default'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className="mr-1 text-[8px]">{section.icon}</span>
              <span>{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="ml-auto w-3 h-3 flex items-center justify-center rounded-full bg-slate-600 text-white text-[7px]">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button
              onClick={resetSections}
              className="w-full mt-1 px-1.5 py-0.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-all text-[9px] font-medium"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Two-Column Main Content */}
      <div className="flex" ref={contentRef}>
        {/* Left Column - Sidebar */}
        <div className="w-1/3 bg-gray-50 p-2 min-h-screen border-r border-slate-200">
          {/* Get left column sections */}
          {getLeftColumnSections().length > 0 ? (
            getLeftColumnSections().map((section, index) => (
              <div key={index} className="animate-fadeIn">
                {section.content}
              </div>
            ))
          ) : (
            // Fallback for empty left column
            <div className="hidden print:block">
              {leftSections
                .filter(section => section.available)
                .map((section, index) => (
                  <div key={index}>{section.content}</div>
                ))}
            </div>
          )}
        </div>

        {/* Right Column - Main Content */}
        <div className="w-2/3 p-3">
          {/* Get right column sections */}
          {getRightColumnSections().length > 0 ? (
            getRightColumnSections().map((section, index) => (
              <div key={index} className="animate-fadeIn">
                {section.content}
              </div>
            ))
          ) : (
            <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg print:hidden">
              <p className="text-xs text-gray-400">
                Select sections from the panel to add content
              </p>
            </div>
          )}

          {/* For print - show all right sections in default order if nothing is selected */}
          {getRightColumnSections().length === 0 && (
            <div className="hidden print:block">
              {rightSections
                .filter(section => section.available)
                .map((section, index) => (
                  <div key={index}>{section.content}</div>
                ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.2in;
            size: letter portrait;
          }
          
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .resume-section {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .page-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          /* Background colors for print */
          .bg-slate-800 {
            background-color: #1e293b !important;
            color: white !important;
          }
          
          .bg-gray-50 {
            background-color: #f9fafb !important;
          }
          
          /* Keep column structure for print */
          .flex {
            display: flex !important;
          }
          
          .w-1/3 {
            width: 33.333333% !important;
          }
          
          .w-2/3 {
            width: 66.666667% !important;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}