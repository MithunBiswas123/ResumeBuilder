// "use client";

// import React from "react";
// import {
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaLinkedin,
//   FaGithub,
//   FaCertificate,
//   FaGraduationCap,
//   FaBriefcase,
//   FaLaptopCode,
//   FaTrophy,
//   FaTools
// } from "react-icons/fa";

// export default function Modern({ resumeData }) {
//   const { personalInfo, experience, education, skills, projects, achievements, certificates } =
//     resumeData || {};

//   // Helper function to ensure URLs are properly formatted
//   const ensureHttps = (url) => {
//     if (!url) return "";
//     return url.startsWith("http") ? url : `https://${url}`;
//   };

//   return (
//     <div className="bg-white w-full h-full p-5 font-sans text-gray-800 max-w-[900px] mx-auto">
//       {/* Header with profile image */}
//       <header className="mb-5 flex flex-col md:flex-row items-center md:items-start gap-4">
//         {/* Profile Image */}
//         <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-500 flex-shrink-0">
//           {personalInfo?.profileImage ? (
//             <img 
//               src={personalInfo.profileImage} 
//               alt={personalInfo?.name || "Profile"} 
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full bg-green-100 flex items-center justify-center">
//               <span className="text-green-700 text-xl font-bold">
//                 {personalInfo?.name ? personalInfo.name.charAt(0) : "R"}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Name and Title */}
//         <div className="text-center md:text-left md:flex-grow">
//           <h1 className="text-2xl font-bold text-gray-900">
//             {personalInfo?.name || "Your Name"}
//           </h1>
          
//           {personalInfo?.title && (
//             <p className="text-base text-green-600 mt-1">
//               {personalInfo.title}
//             </p>
//           )}

//           {/* Contact details in header for better space usage */}
//           <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-xs">
//             {personalInfo?.email && (
//               <a
//                 href={`mailto:${personalInfo.email}`}
//                 className="flex items-center text-gray-600 hover:text-green-700"
//               >
//                 <FaEnvelope className="text-green-600 mr-1" size={12} />
//                 <span>{personalInfo.email}</span>
//               </a>
//             )}

//             {personalInfo?.phone && (
//               <a
//                 href={`tel:${personalInfo.phone}`}
//                 className="flex items-center text-gray-600 hover:text-green-700"
//               >
//                 <FaPhone className="text-green-600 mr-1" size={12} />
//                 <span>{personalInfo.phone}</span>
//               </a>
//             )}

//             {personalInfo?.location && (
//               <div className="flex items-center text-gray-600">
//                 <FaMapMarkerAlt className="text-green-600 mr-1" size={12} />
//                 <span>{personalInfo.location}</span>
//               </div>
//             )}
//           </div>

//           {/* Social links */}
//           <div className="mt-2 flex justify-center md:justify-start gap-2">
//             {personalInfo?.linkedin && (
//               <a
//                 href={ensureHttps(personalInfo.linkedin)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-gray-100 hover:bg-green-100 text-gray-700 p-1.5 rounded-full transition-colors"
//                 title="LinkedIn Profile"
//               >
//                 <FaLinkedin size={14} />
//               </a>
//             )}

//             {personalInfo?.github && (
//               <a
//                 href={ensureHttps(personalInfo.github)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-gray-100 hover:bg-green-100 text-gray-700 p-1.5 rounded-full transition-colors"
//                 title="GitHub Profile"
//               >
//                 <FaGithub size={14} />
//               </a>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Divider with unique design */}
//       <div className="relative h-1 mb-6">
//         <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-lime-400"></div>
//         <div className="absolute right-0 w-16 h-1 bg-yellow-400"></div>
//       </div>

//       {/* Summary - highlighted box */}
//       {personalInfo?.summary && (
//         <section className="mb-6 bg-gray-50 p-3 border-l-4 border-green-500 rounded-r-md">
//           <p className="text-gray-700 leading-relaxed text-xs">
//             {personalInfo.summary}
//           </p>
//         </section>
//       )}

//       {/* Two column layout */}
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Left column */}
//         <div className="md:w-1/3">
//           {/* Experience Section */}
//           {experience?.length > 0 && (
//             <section className="mb-6">
//               <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
//                 <FaBriefcase className="text-green-600 mr-2" size={14} />
//                 <span>Experience</span>
//               </h2>

//               <div className="space-y-4">
//                 {experience.map((job, index) => (
//                   <div key={index} className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-green-600 before:rounded-full">
//                     <h3 className="font-medium text-gray-900 text-xs">
//                       {job.position || job.title}
//                     </h3>
//                     <p className="text-green-700 text-xs font-medium">
//                       {job.company}
//                       {job.location ? ` • ${job.location}` : ""}
//                     </p>
//                     <p className="text-gray-500 text-xs mt-0.5">
//                       {job.startDate} — {job.endDate || "Present"}
//                     </p>
//                     <p className="text-gray-600 mt-1 text-xs">
//                       {job.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* Education section */}
//           {education?.length > 0 && (
//             <section className="mb-6">
//               <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
//                 <FaGraduationCap className="text-green-600 mr-2" size={14} />
//                 <span>Education</span>
//               </h2>

//               <div className="space-y-3">
//                 {education.map((edu, index) => (
//                   <div key={index} className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-green-600 before:rounded-full">
//                     <h3 className="font-medium text-gray-900 text-xs">{edu.degree}</h3>
//                     <p className="text-green-700 text-xs">{edu.school}</p>
//                     <p className="text-gray-500 text-xs">
//                       {edu.startDate} — {edu.endDate || "Present"}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* Certificates Section */}
//           {certificates?.length > 0 && (
//             <section className="mb-6">
//               <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
//                 <FaCertificate className="text-green-600 mr-2" size={14} />
//                 <span>Certifications</span>
//               </h2>

//               <div className="space-y-3">
//                 {certificates.map((cert, index) => (
//                   <div key={index} className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-green-600 before:rounded-full">
//                     <h3 className="font-medium text-gray-900 text-xs">
//                       {cert.name}
//                     </h3>
//                     <p className="text-gray-700 text-xs">
//                       {cert.issuer}
//                       <span className="text-gray-500 ml-1">({cert.date})</span>
//                     </p>

//                     {cert.url && (
//                       <a
//                         href={ensureHttps(cert.url)}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-green-600 text-xs hover:text-green-800 flex items-center mt-0.5"
//                       >
//                         <FaCertificate className="mr-1" size={9} />
//                         <span>View Certificate</span>
//                       </a>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}
//         </div>

//         {/* Right column */}
//         <div className="md:w-2/3">
//           {/* Skills with visual styling */}
//           {(!resumeData.skillCategories ||
//             resumeData.skillCategories.length === 0) &&
//             resumeData.skills?.length > 0 && (
//               <section className="mb-6">
//                 <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
//                   <FaTools className="text-green-600 mr-2" size={14} />
//                   <span>Skills</span>
//                 </h2>

//                 <div className="flex flex-wrap gap-1.5">
//                   {resumeData.skills.map((skill, index) => (
//                     <span
//                       key={index}
//                       className="px-2 py-1 bg-gradient-to-r from-green-50 to-lime-50 text-green-800 text-xs rounded-full border border-green-100"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </section>
//             )}

//           {/* Skills Categories */}
//           {resumeData.skillCategories?.length > 0 && (
//             <section className="mb-6">
//               <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
//                 <FaTools className="text-green-600 mr-2" size={14} />
//                 <span>Skills</span>
//               </h2>

//               <div className="space-y-3">
//                 {resumeData.skillCategories.map(
//                   (category, index) =>
//                     category.skills.length > 0 && (
//                       <div key={index} className="mb-2">
//                         <h3 className="font-medium text-gray-700 text-xs mb-1 bg-green-50 py-0.5 px-2 inline-block rounded">
//                           {category.name || "General Skills"}
//                         </h3>

//                         <div className="flex flex-wrap gap-1.5 ml-1">
//                           {category.skills.map((skill, idx) => (
//                             <span
//                               key={idx}
//                               className="px-2 py-0.5 bg-gradient-to-r from-green-50 to-lime-50 text-green-800 text-xs rounded-full border border-green-100"
//                             >
//                               {skill}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )
//                 )}
//               </div>
//             </section>
//           )}

//           {/* Projects */}
//           {projects?.length > 0 && (
//             <section className="mb-6">
//               <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
//                 <FaLaptopCode className="text-green-600 mr-2" size={14} />
//                 <span>Projects</span>
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {projects.map((project, index) => (
//                   <div key={index} className="bg-gray-50 rounded-lg p-2.5 hover:shadow-sm transition-shadow">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-xs font-medium text-gray-900">
//                         {project.title}
//                       </h3>
//                     </div>

//                     {project.technologies && (
//                       <div className="flex flex-wrap gap-1 my-1.5">
//                         {project.technologies.map((tech, idx) => (
//                           <span key={idx} className="text-xs bg-white px-1.5 py-0.5 rounded text-green-700 border border-green-100">
//                             {tech}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     <p className="text-gray-600 text-xs">
//                       {project.description}
//                     </p>

//                     {project.link && (
//                       <a
//                         href={ensureHttps(project.link)}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="mt-1.5 text-green-600 hover:text-green-800 text-xs inline-block"
//                       >
//                         View Project →
//                       </a>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* Achievements */}
//           {achievements?.length > 0 && (
//             <section className="mb-6">
//               <h2 className="flex items-center text-sm font-bold mb-3 text-gray-900">
//                 <FaTrophy className="text-green-600 mr-2" size={14} />
//                 <span>Achievements</span>
//               </h2>

//               <div className="space-y-2.5">
//                 {achievements.map((achievement, index) => (
//                   <div key={index} className="bg-gradient-to-r from-green-50 to-lime-50 p-2.5 rounded-lg">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-xs font-medium text-gray-900">
//                         {achievement.title}
//                       </h3>
//                       {achievement.date && (
//                         <span className="text-gray-500 text-xs bg-white px-1.5 py-0.5 rounded">
//                           {achievement.date}
//                         </span>
//                       )}
//                     </div>
                    
//                     {achievement.organization && (
//                       <p className="text-green-700 text-xs mt-0.5">
//                         {achievement.organization}
//                       </p>
//                     )}
                    
//                     {achievement.description && (
//                       <p className="text-gray-600 text-xs mt-1.5">
//                         {achievement.description}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaCamera, FaLink, FaBriefcase, FaGraduationCap, FaTools,
  FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt
} from "react-icons/fa";

const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='7' r='5' fill='%23475569'/%3E%3Cpath d='M12 13c-3.86 0-7 3.14-7 7h14c0-3.86-3.14-7-7-7z' fill='%23475569'/%3E%3C/svg%3E";

export default function Modern({ resumeData }) {
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
          <div className="flex items-center mb-1.5">
            <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center text-white mr-1.5">
              <FaUserAlt className="text-xs" />
            </div>
            <h2 className="text-base font-semibold text-teal-700">PROFILE</h2>
          </div>
          <div className="bg-white px-3 py-2 border-l-2 border-teal-400">
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
          <div className="flex items-center mb-1.5">
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white mr-1.5">
              <FaBriefcase className="text-xs" />
            </div>
            <h2 className="text-base font-semibold text-blue-700">EXPERIENCE</h2>
          </div>
          
          <div className="space-y-3">
            {experience?.map((job, index) => (
              <div key={index} className="bg-white px-3 py-2 border-l-2 border-blue-400 page-break-inside-avoid">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <h3 className="text-xs font-bold text-gray-800">
                    {job.position || job.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {job.startDate} — {job.endDate || "Present"}
                  </span>
                </div>
                
                <p className="text-xs text-blue-600 font-medium mt-1">
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
          <div className="flex items-center mb-1.5">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white mr-1.5">
              <FaGraduationCap className="text-xs" />
            </div>
            <h2 className="text-base font-semibold text-green-700">EDUCATION</h2>
          </div>
          
          <div className="space-y-2">
            {education?.map((edu, index) => (
              <div key={index} className="bg-white px-3 py-2 border-l-2 border-green-400">
                <h3 className="text-xs font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-xs text-green-600">{edu.school}</p>
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
          <div className="flex items-center mb-1.5">
            <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-1.5">
              <FaTools className="text-xs" />
            </div>
            <h2 className="text-base font-semibold text-yellow-700">SKILLS</h2>
          </div>
          
          <div className="bg-white px-3 py-2 border-l-2 border-yellow-400">
            <div className="flex flex-wrap gap-1.5">
              {skills?.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 text-xs bg-yellow-50 text-yellow-700 rounded"
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
          <div className="flex items-center mb-1.5">
            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white mr-1.5">
              <FaLaptopCode className="text-xs" />
            </div>
            <h2 className="text-base font-semibold text-red-700">PROJECTS</h2>
          </div>
          
          <div className="space-y-3">
            {projects?.map((project, index) => (
              <div 
                key={index} 
                className="bg-white px-3 py-2 border-l-2 border-red-400 page-break-inside-avoid"
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
          <div className="flex items-center mb-1.5">
            <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center text-white mr-1.5">
              <FaTrophy className="text-xs" />
            </div>
            <h2 className="text-base font-semibold text-purple-700">ACHIEVEMENTS</h2>
          </div>
          
          <div className="space-y-2">
            {achievements?.map((achievement, index) => (
              <div key={index} className="bg-white px-3 py-2 border-l-2 border-purple-400">
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
                  <p className="text-xs text-purple-600 mt-1">
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
          <div className="flex items-center mb-1.5">
            <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center text-white mr-1.5">
              <FaCertificate className="text-xs" />
            </div>
            <h2 className="text-base font-semibold text-cyan-700">CERTIFICATES</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {certificates?.map((cert, index) => (
              <div key={index} className="bg-white px-3 py-2 border-l-2 border-cyan-400">
                <h3 className="text-xs font-bold text-gray-800">{cert.name}</h3>
                <p className="text-xs text-cyan-600">{cert.issuer}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {cert.date}
                  </span>
                  
                  {cert.url && (
                    <a
                      href={ensureHttps(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-500 hover:text-cyan-700 underline"
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
    <div className="bg-gray-100 min-h-full font-sans text-gray-700 relative">
      {/* Header with personal info */}
      <header className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-4">
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
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm cursor-pointer hover:bg-gray-100 transition-colors print:hidden">
                <FaCamera className="w-3 h-3 text-slate-700" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            
            {/* Name and Details */}
            <div className="text-center md:text-left flex-1">
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
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
              disabled={sectionOrder.includes(section.id)}
            >
              <span className="mr-1.5 text-xs">{section.icon}</span>
              <span>{section.label}</span>
              {sectionOrder.includes(section.id) && (
                <span className="ml-auto w-4 h-4 flex items-center justify-center rounded-full bg-slate-400 text-white text-xs">
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
            <p className="text-xs text-gray-500">
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
          .bg-slate-50, .bg-blue-50, .bg-green-50, .bg-yellow-50,
          .bg-red-50, .bg-purple-50, .bg-cyan-50, .bg-teal-50 {
            background-color: #ffffff !important;
          }
          
          .from-slate-800 {
            background-color: #1e293b !important;
          }
          
          .to-slate-900 {
            background-color: #0f172a !important;
          }
          
          /* Border colors for print */
          .border-blue-400, .border-green-400, .border-yellow-400,
          .border-red-400, .border-purple-400, .border-cyan-400, .border-teal-400 {
            border-color: #9ca3af !important;
          }
          
          /* Text colors for print */
          .text-blue-600, .text-green-600, .text-yellow-700,
          .text-red-600, .text-purple-600, .text-cyan-600, .text-teal-700 {
            color: #1f2937 !important;
          }
          
          /* Panel background for print */
          .bg-white\/95 {
            display: none !important;
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