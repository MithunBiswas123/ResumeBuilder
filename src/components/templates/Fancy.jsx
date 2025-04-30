


"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaCamera, FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='7' r='5' fill='%23475569'/%3E%3Cpath d='M12 13c-3.86 0-7 3.14-7 7h14c0-3.86-3.14-7-7-7z' fill='%23475569'/%3E%3C/svg%3E";

export default function Fancy({ resumeData }) {
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
  
  const allSections = [
    { 
      id: 'summary', 
      label: 'Summary',
      icon: <FaUserAlt />,
      available: !!personalInfo?.summary,
      content: (
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-gray-800 mb-1.5">PROFILE</h2>
          <div className="bg-white px-3 py-2">
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-gray-800 mb-2">EXPERIENCE</h2>
          
          <div className="space-y-3">
            {experience?.map((job, index) => (
              <div key={index} className="bg-white px-3 py-2 page-break-inside-avoid">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <h3 className="text-xs font-bold text-gray-800">
                    {job.position || job.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {job.startDate} — {job.endDate || "Present"}
                  </span>
                </div>
                
                <p className="text-xs text-blue-600 font-medium">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
                
                <p className="text-xs text-gray-600 mt-1">
                  {job.description}
                </p>
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-gray-800 mb-2">EDUCATION</h2>
          
          <div className="space-y-2">
            {education?.map((edu, index) => (
              <div key={index} className="bg-white px-3 py-2">
                <h3 className="text-xs font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-xs text-emerald-600">{edu.school}</p>
                <p className="text-xs text-gray-500">
                  {edu.startDate} — {edu.endDate || "Present"}
                </p>
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-gray-800 mb-2">SKILLS</h2>
          
          <div className="bg-white px-3 py-2">
            <div className="flex flex-wrap gap-1.5">
              {skills?.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 text-xs bg-amber-50 text-amber-700 rounded"
                >
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-gray-800 mb-2">PROJECTS</h2>
          
          <div className="space-y-3">
            {projects?.map((project, index) => (
              <div 
                key={index} 
                className="bg-white px-3 py-2 page-break-inside-avoid"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xs font-bold text-gray-800">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={ensureHttps(project.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-600"
                      aria-label="View Project"
                    >
                      <FaLink className="text-xs" />
                    </a>
                  )}
                </div>
                
                <p className="text-xs text-gray-600 my-1">
                  {project.description}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 text-xs bg-red-50 text-red-600 rounded"
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-gray-800 mb-2">ACHIEVEMENTS</h2>
          
          <div className="space-y-2">
            {achievements?.map((achievement, index) => (
              <div key={index} className="bg-white px-3 py-2">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <h3 className="text-xs font-bold text-gray-800">
                    {achievement.title}
                  </h3>
                  {achievement.date && (
                    <span className="text-xs text-gray-500">
                      {achievement.date}
                    </span>
                  )}
                </div>
                
                {achievement.organization && (
                  <p className="text-xs text-purple-600">
                    {achievement.organization}
                  </p>
                )}
                
                {achievement.description && (
                  <p className="text-xs text-gray-600 mt-1">
                    {achievement.description}
                  </p>
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
        <section className="mb-4 resume-section">
          <h2 className="text-base font-bold text-gray-800 mb-2">CERTIFICATES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {certificates?.map((cert, index) => (
              <div key={index} className="bg-white px-3 py-2">
                <h3 className="text-xs font-bold text-gray-800">{cert.name}</h3>
                <p className="text-xs text-cyan-600">{cert.issuer}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{cert.date}</span>
                  
                  {cert.url && (
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-500 underline"
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

  const availableSections = allSections.filter(section => section.available);

  const handleSectionClick = (sectionId) => {
    if (sectionOrder.includes(sectionId)) return;
    setSectionOrder(prev => [...prev, sectionId]);
  };

  const resetSections = () => {
    setSectionOrder([]);
  };

  return (
    <div className="bg-gray-50 min-h-full font-sans text-gray-700 relative">
      {/* Header with personal info */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            {/* Profile Image with Upload */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src={profileImage} 
                  alt={personalInfo?.name || "Profile"} 
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100 transition-colors print:hidden">
                <FaCamera className="w-3 h-3 text-indigo-600" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            
            {/* Name and Details */}
            <div className="text-center md:text-left">
              <h1 className="text-lg md:text-xl font-bold">
                {personalInfo?.name || "Your Name"}
              </h1>
              
              {personalInfo?.title && (
                <h2 className="text-sm md:text-base font-light mb-1 text-white/90">
                  {personalInfo.title}
                </h2>
              )}
              
              {/* Contact Details - Compact Row */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 text-xs">
                {personalInfo?.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center text-white/90 hover:text-white"
                  >
                    <FaEnvelope className="mr-1 text-xs" />
                    <span>{personalInfo.email}</span>
                  </a>
                )}
                
                {personalInfo?.phone && (
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="flex items-center text-white/90 hover:text-white"
                  >
                    <FaPhone className="mr-1 text-xs" />
                    <span>{personalInfo.phone}</span>
                  </a>
                )}
                
                {personalInfo?.location && (
                  <span className="flex items-center text-white/90">
                    <FaMapMarkerAlt className="mr-1 text-xs" />
                    <span>{personalInfo.location}</span>
                  </span>
                )}
                
                {personalInfo?.linkedin && (
                  <a
                    href={ensureHttps(personalInfo.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white/90 hover:text-white"
                  >
                    <FaLinkedin className="mr-1 text-xs" />
                    <span>LinkedIn</span>
                  </a>
                )}
                
                {personalInfo?.github && (
                  <a
                    href={ensureHttps(personalInfo.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white/90 hover:text-white"
                  >
                    <FaGithub className="mr-1 text-xs" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Section Selector - Right side floating panel */}
      <div className="fixed top-20 right-4 z-10 p-2 bg-white/95 rounded-lg shadow-lg border border-gray-200 backdrop-blur-sm w-44 print:hidden">
        <h3 className="text-xs font-medium text-gray-500 mb-1 text-center">
          Add Sections
        </h3>
        <div className="space-y-0.5 max-h-[70vh] overflow-y-auto">
          {availableSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex items-center w-full px-2 py-1 rounded-md transition-all text-xs ${
                sectionOrder.includes(section.id)
                  ? 'bg-gray-200 text-gray-400 cursor-default'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className="mr-1.5 text-xs">{section.icon}</span>
              <span>{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="ml-auto w-4 h-4 flex items-center justify-center rounded-full bg-indigo-400 text-white text-xs">
                  {sectionOrder.indexOf(section.id) + 1}
                </span>
              )}
            </button>
          ))}
          
          {sectionOrder.length > 0 && (
            <button
              onClick={resetSections}
              className="w-full mt-1 px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-all text-xs font-medium"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-3 md:px-4 py-4" ref={contentRef}>
        {/* Display sections in the order they were clicked */}
        {sectionOrder.length > 0 ? (
          sectionOrder.map(sectionId => {
            const section = allSections.find(s => s.id === sectionId);
            if (!section || !section.available) return null;
            return (
              <div key={sectionId} className="animate-fadeIn">
                {section.content}
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg print:hidden">
            <p className="text-xs text-gray-400">
              Select sections from the panel to add content
            </p>
          </div>
        )}
        
        {/* For print - show all sections in default order if nothing is selected */}
        {sectionOrder.length === 0 && (
          <div className="hidden print:block">
            {availableSections.map(section => (
              <div key={section.id}>{section.content}</div>
            ))}
          </div>
        )}

        {/* Page numbers for print only */}
        <div className="hidden print:block text-right text-xs text-gray-400 pt-2">
          <span className="print-page-number"></span>
        </div>
      </main>
      
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.3in;
            size: letter portrait;
          }
          
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-size: 85%;
          }
          
          .resume-section {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .page-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          /* Page numbers */
          .print-page-number:after {
            content: counter(page);
          }
          
          /* Background colors for print */
          .bg-indigo-50, .bg-red-50, .bg-green-50, .bg-amber-50 {
            background-color: #ffffff !important;
          }
          
          .from-indigo-600 {
            background-color: #4f46e5 !important;
          }
          
          .to-purple-600 {
            background-color: #9333ea !important;
          }
          
          /* Text colors for print */
          .text-indigo-600, .text-blue-600, .text-green-600,
          .text-red-600, .text-amber-600, .text-cyan-600, 
          .text-purple-600, .text-emerald-600 {
            color: #1f2937 !important;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}