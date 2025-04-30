// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import {
//   FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, 
//   FaCamera, FaLink, FaBriefcase, FaGraduationCap, FaTools,
//   FaLaptopCode, FaTrophy, FaCertificate, FaUserAlt,
//   FaRegFileAlt, FaRegFile
// } from "react-icons/fa";

// const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='7' r='5' fill='%23475569'/%3E%3Cpath d='M12 13c-3.86 0-7 3.14-7 7h14c0-3.86-3.14-7-7-7z' fill='%23475569'/%3E%3C/svg%3E";

// export default function ModernTwoPage({ resumeData }) {
//   const { personalInfo, experience, education, skills, projects, achievements, certificates } =
//     resumeData || {};

//   const [profileImage, setProfileImage] = useState(personalInfo?.photoUrl || defaultImage);
//   const [sectionOrder, setSectionOrder] = useState([]);
//   const [activePage, setActivePage] = useState(1);
//   const contentRef = useRef(null);
//   const page1Ref = useRef(null);
//   const page2Ref = useRef(null);
  
//   const ensureHttps = (url) => {
//     if (!url) return "";
//     return url.startsWith("http") ? url : `https://${url}`;
//   };
  
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.substr(0, 5) === "image") {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  
//   useEffect(() => {
//     if (personalInfo?.photoUrl) {
//       setProfileImage(personalInfo.photoUrl);
//     }
//   }, [personalInfo?.photoUrl]);
  
//   const allSections = [
//     { 
//       id: 'summary', 
//       label: 'Summary',
//       icon: <FaUserAlt />,
//       available: !!personalInfo?.summary,
//       content: (
//         <section className="mb-0.5 resume-section">
//           <h2 className="text-[10px] uppercase font-bold text-slate-700 border-b border-slate-200 mb-0.5">Professional Summary</h2>
//           <p className="text-[9px] text-slate-600 leading-tight">{personalInfo?.summary}</p>
//         </section>
//       ),
//       preferredPage: 1
//     },
//     { 
//       id: 'experience', 
//       label: 'Experience',
//       icon: <FaBriefcase />,
//       available: experience?.length > 0,
//       content: (
//         <section className="mb-0.5 resume-section">
//           <h2 className="text-[10px] uppercase font-bold text-slate-700 border-b border-slate-200 mb-0.5">Work Experience</h2>
          
//           <div className="space-y-0.5">
//             {experience?.map((job, index) => (
//               <div key={index} className="page-break-inside-avoid">
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-[10px] font-semibold text-slate-800">
//                     {job.position || job.title}
//                   </h3>
//                   <span className="text-[8px] text-slate-500 whitespace-nowrap">
//                     {job.startDate} — {job.endDate || "Present"}
//                   </span>
//                 </div>
                
//                 <p className="text-[8px] text-teal-600 font-medium -mt-0.5">
//                   {job.company}
//                   {job.location ? ` · ${job.location}` : ""}
//                 </p>
                
//                 <p className="text-[8px] text-slate-600 -mt-0.5 leading-tight">
//                   {job.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>
//       ),
//       preferredPage: 1
//     },
//     { 
//       id: 'education', 
//       label: 'Education',
//       icon: <FaGraduationCap />,
//       available: education?.length > 0,
//       content: (
//         <section className="mb-0.5 resume-section">
//           <h2 className="text-[10px] uppercase font-bold text-slate-700 border-b border-slate-200 mb-0.5">Education</h2>
          
//           <div className="space-y-0.5">
//             {education?.map((edu, index) => (
//               <div key={index} className="page-break-inside-avoid">
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-[10px] font-semibold text-slate-800">{edu.degree}</h3>
//                   <span className="text-[8px] text-slate-500 whitespace-nowrap">
//                     {edu.startDate} — {edu.endDate || "Present"}
//                   </span>
//                 </div>
//                 <p className="text-[8px] text-teal-600 -mt-1">{edu.school}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       ),
//       preferredPage: 1
//     },
//     { 
//       id: 'skills', 
//       label: 'Skills',
//       icon: <FaTools />,
//       available: skills?.length > 0,
//       content: (
//         <section className="mb-0.5 resume-section">
//           <h2 className="text-[10px] uppercase font-bold text-slate-700 border-b border-slate-200 mb-0.5">Skills</h2>
          
//           <div className="flex flex-wrap gap-0.5">
//             {skills?.map((skill, index) => (
//               <span 
//                 key={index} 
//                 className="px-0.5 py-0 text-[8px] bg-slate-100 text-slate-700 rounded"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </section>
//       ),
//       preferredPage: 1
//     },
//     { 
//       id: 'projects', 
//       label: 'Projects',
//       icon: <FaLaptopCode />,
//       available: projects?.length > 0,
//       content: (
//         <section className="mb-0.5 resume-section">
//           <h2 className="text-[10px] uppercase font-bold text-slate-700 border-b border-slate-200 mb-0.5">Projects</h2>
          
//           <div className="space-y-0.5">
//             {projects?.map((project, index) => (
//               <div 
//                 key={index} 
//                 className="page-break-inside-avoid"
//               >
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-[10px] font-semibold text-slate-800">
//                     {project.title}
//                   </h3>
//                   {project.link && (
//                     <a
//                       href={ensureHttps(project.link)}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-teal-600"
//                       aria-label="View Project"
//                     >
//                       <FaLink className="text-[8px]" />
//                     </a>
//                   )}
//                 </div>
                
//                 <p className="text-[8px] text-slate-600 -mt-0.5 leading-tight">
//                   {project.description}
//                 </p>
                
//                 {project.technologies && (
//                   <div className="flex flex-wrap gap-0.5 -mt-0.5">
//                     {project.technologies.map((tech, i) => (
//                       <span 
//                         key={i} 
//                         className="px-0.5 py-0 text-[8px] bg-slate-100 text-teal-600 rounded"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
//       ),
//       preferredPage: 2
//     },
//     { 
//       id: 'achievements', 
//       label: 'Achievements',
//       icon: <FaTrophy />,
//       available: achievements?.length > 0,
//       content: (
//         <section className="mb-0.5 resume-section">
//           <h2 className="text-[10px] uppercase font-bold text-slate-700 border-b border-slate-200 mb-0.5">Achievements</h2>
          
//           <div className="space-y-0.5">
//             {achievements?.map((achievement, index) => (
//               <div key={index} className="page-break-inside-avoid">
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-[10px] font-semibold text-slate-800">
//                     {achievement.title}
//                   </h3>
//                   {achievement.date && (
//                     <span className="text-[8px] text-slate-500 whitespace-nowrap">
//                       {achievement.date}
//                     </span>
//                   )}
//                 </div>
                
//                 {achievement.organization && (
//                   <p className="text-[8px] text-teal-600 -mt-1">
//                     {achievement.organization}
//                   </p>
//                 )}
                
//                 {achievement.description && (
//                   <p className="text-[8px] text-slate-600 -mt-0.5 leading-tight">
//                     {achievement.description}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
//       ),
//       preferredPage: 2
//     },
//     { 
//       id: 'certificates', 
//       label: 'Certificates',
//       icon: <FaCertificate />,
//       available: certificates?.length > 0,
//       content: (
//         <section className="mb-0.5 resume-section">
//           <h2 className="text-[10px] uppercase font-bold text-slate-700 border-b border-slate-200 mb-0.5">Certifications</h2>
          
//           <div className="space-y-0.5">
//             {certificates?.map((cert, index) => (
//               <div key={index} className="page-break-inside-avoid">
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-[10px] font-semibold text-slate-800">{cert.name}</h3>
//                   <span className="text-[8px] text-slate-500">{cert.date}</span>
//                 </div>
//                 <p className="text-[8px] text-teal-600 -mt-1">{cert.issuer}</p>
                
//                 {cert.url && (
//                   <a
//                     href={ensureHttps(cert.url)}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-[8px] text-teal-600 -mt-0.5 inline-block"
//                   >
//                     View
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
//       ),
//       preferredPage: 2
//     },
//   ];

//   const availableSections = allSections.filter(section => section.available);

//   const handleSectionClick = (sectionId) => {
//     if (sectionOrder.includes(sectionId)) return;
//     setSectionOrder(prev => [...prev, sectionId]);
//   };

//   const resetSections = () => {
//     setSectionOrder([]);
//   };

//   const getOrderedSectionsForPage = (page) => {
//     // If no sections are ordered, show all sections in their preferred pages
//     if (sectionOrder.length === 0) {
//       return availableSections.filter(section => section.preferredPage === page);
//     }
    
//     // Otherwise, show sections based on order and preferred page
//     return sectionOrder
//       .map(id => allSections.find(s => s.id === id))
//       .filter(section => section?.available && section?.preferredPage === page);
//   };

//   return (
//     <div className="font-sans text-slate-700 relative bg-gray-50">
//       {/* Minimal Header */}
//       <header className="bg-slate-800 text-white py-0.5 mb-0.5 relative">
//         <div className="max-w-4xl mx-auto px-2">
//           <div className="flex items-center gap-1">
//             {/* Profile Image with Upload */}
//             <div className="relative">
//               <div className="w-8 h-8 rounded-full overflow-hidden border border-white flex-shrink-0">
//                 <img 
//                   src={profileImage} 
//                   alt={personalInfo?.name || "Profile"} 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <label className="absolute bottom-0 right-0 bg-white p-0.5 rounded-full shadow-sm cursor-pointer print:hidden">
//                 <FaCamera className="w-1 h-1 text-slate-600" />
//                 <input
//                   type="file"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//               </label>
//             </div>
            
//             {/* Name and Title */}
//             <div className="min-w-0">
//               <h1 className="text-xs font-bold truncate leading-tight">
//                 {personalInfo?.name || "Your Name"}
//               </h1>
              
//               {personalInfo?.title && (
//                 <h2 className="text-[9px] font-light text-white/80 truncate leading-tight -mt-0.5">
//                   {personalInfo.title}
//                 </h2>
//               )}
//             </div>
            
//             {/* Contact Details */}
//             <div className="ml-auto flex flex-wrap justify-end gap-x-1.5 gap-y-0 text-[8px]">
//               {personalInfo?.email && (
//                 <a
//                   href={`mailto:${personalInfo.email}`}
//                   className="flex items-center text-white/80 hover:text-white"
//                 >
//                   <FaEnvelope className="mr-0.5 text-[6px]" />
//                   <span>{personalInfo.email}</span>
//                 </a>
//               )}
              
//               {personalInfo?.phone && (
//                 <a
//                   href={`tel:${personalInfo.phone}`}
//                   className="flex items-center text-white/80 hover:text-white"
//                 >
//                   <FaPhone className="mr-0.5 text-[6px]" />
//                   <span>{personalInfo.phone}</span>
//                 </a>
//               )}
              
//               {personalInfo?.location && (
//                 <span className="flex items-center text-white/80">
//                   <FaMapMarkerAlt className="mr-0.5 text-[6px]" />
//                   <span>{personalInfo.location}</span>
//                 </span>
//               )}
              
//               {personalInfo?.linkedin && (
//                 <a
//                   href={ensureHttps(personalInfo.linkedin)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center text-white/80 hover:text-white"
//                 >
//                   <FaLinkedin className="mr-0.5 text-[6px]" />
//                   <span>LinkedIn</span>
//                 </a>
//               )}
              
//               {personalInfo?.github && (
//                 <a
//                   href={ensureHttps(personalInfo.github)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center text-white/80 hover:text-white"
//                 >
//                   <FaGithub className="mr-0.5 text-[6px]" />
//                   <span>GitHub</span>
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Section Selector Panel - Minimal */}
//       <div className="fixed top-0 right-0 z-10 p-1 bg-white/90 rounded-lg shadow border border-gray-200 backdrop-blur-sm w-28 print:hidden">
//         <h3 className="text-[9px] font-medium text-gray-500 mb-0.5 text-center">
//           Add Sections
//         </h3>
//         <div className="space-y-0 max-h-[60vh] overflow-y-auto">
//           {availableSections.map((section) => (
//             <button
//               key={section.id}
//               onClick={() => handleSectionClick(section.id)}
//               className={`flex items-center w-full px-1 py-0.5 rounded-sm transition-all text-[8px] ${
//                 sectionOrder.includes(section.id)
//                   ? 'bg-gray-200 text-gray-400 cursor-default'
//                   : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
//               }`}
//               disabled={sectionOrder.includes(section.id)}
//             >
//               <span className="mr-0.5 text-[7px]">{section.icon}</span>
//               <span>{section.label}</span>
//               {section.preferredPage && (
//                 <span className="ml-auto text-[6px] text-slate-400">
//                   P{section.preferredPage}
//                 </span>
//               )}
//               {sectionOrder.includes(section.id) && (
//                 <span className="ml-0.5 w-2 h-2 flex items-center justify-center rounded-full bg-teal-400 text-white text-[6px]">
//                   {sectionOrder.indexOf(section.id) + 1}
//                 </span>
//               )}
//             </button>
//           ))}
          
//           {sectionOrder.length > 0 && (
//             <button
//               onClick={resetSections}
//               className="w-full mt-0.5 px-1 py-0.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm text-[8px] font-medium"
//             >
//               Reset
//             </button>
//           )}
//         </div>
        
//         {/* Page toggle buttons - minimal */}
//         <div className="flex justify-between items-center mt-0.5 border-t border-gray-200 pt-0.5 print:hidden">
//           <button 
//             onClick={() => setActivePage(1)}
//             className={`text-[8px] px-1 py-0.5 rounded-sm ${activePage === 1 ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-500'}`}
//           >
//             <div className="flex items-center">
//               <FaRegFile className="mr-0.5" size={6} />
//               P1
//             </div>
//           </button>
//           <button 
//             onClick={() => setActivePage(2)}
//             className={`text-[8px] px-1 py-0.5 rounded-sm ${activePage === 2 ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-500'}`}
//           >
//             <div className="flex items-center">
//               <FaRegFileAlt className="mr-0.5" size={6} />
//               P2
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Main Content - Two Pages with minimal padding */}
//       <div className="max-w-4xl mx-auto px-1 mb-1" ref={contentRef}>
//         {/* Page 1 */}
//         <div 
//           ref={page1Ref}
//           className={`bg-white p-1 mb-1 border border-gray-200 ${activePage === 2 ? 'hidden print:block' : ''}`}
//         >
//           <div className="page-content space-y-0.5">
//             {/* If no sections are selected, show placeholder */}
//             {sectionOrder.length === 0 && getOrderedSectionsForPage(1).length === 0 ? (
//               <div className="text-center py-1 border border-dashed border-gray-300 rounded print:hidden">
//                 <p className="text-[8px] text-gray-400">
//                   Select sections for page 1
//                 </p>
//               </div>
//             ) : (
//               // If sections are selected, show them
//               <>
//                 {/* For customized order */}
//                 {sectionOrder.length > 0 && 
//                   sectionOrder.map(sectionId => {
//                     const section = allSections.find(s => s.id === sectionId);
//                     if (!section || !section.available || section.preferredPage !== 1) return null;
//                     return (
//                       <div key={sectionId} className="animate-fadeIn">
//                         {section.content}
//                       </div>
//                     );
//                   })
//                 }
                
//                 {/* For default order (print mode or when no sections are selected) */}
//                 {sectionOrder.length === 0 && 
//                   getOrderedSectionsForPage(1).map(section => (
//                     <div key={section.id} className="print-block">
//                       {section.content}
//                     </div>
//                   ))
//                 }
//               </>
//             )}
//           </div>
          
//           {/* Page 1 footer */}
//           <div className="pt-0.5 mt-0.5 border-t border-gray-200 text-right">
//             <span className="text-[6px] text-gray-400">Page 1 of 2</span>
//           </div>
//         </div>

//         {/* Page 2 */}
//         <div 
//           ref={page2Ref}
//           className={`bg-white p-1 border border-gray-200 ${activePage === 1 ? 'hidden print:block' : ''}`}
//         >
//           <div className="page-content space-y-0.5">
//             {/* If no sections are selected, show placeholder */}
//             {sectionOrder.length === 0 && getOrderedSectionsForPage(2).length === 0 ? (
//               <div className="text-center py-1 border border-dashed border-gray-300 rounded print:hidden">
//                 <p className="text-[8px] text-gray-400">
//                   Select sections for page 2
//                 </p>
//               </div>
//             ) : (
//               // If sections are selected, show them
//               <>
//                 {/* For customized order */}
//                 {sectionOrder.length > 0 && 
//                   sectionOrder.map(sectionId => {
//                     const section = allSections.find(s => s.id === sectionId);
//                     if (!section || !section.available || section.preferredPage !== 2) return null;
//                     return (
//                       <div key={sectionId} className="animate-fadeIn">
//                         {section.content}
//                       </div>
//                     );
//                   })
//                 }
                
//                 {/* For default order (print mode or when no sections are selected) */}
//                 {sectionOrder.length === 0 && 
//                   getOrderedSectionsForPage(2).map(section => (
//                     <div key={section.id} className="print-block">
//                       {section.content}
//                     </div>
//                   ))
//                 }
//               </>
//             )}
//           </div>
          
//           {/* Page 2 footer */}
//           <div className="pt-0.5 mt-0.5 border-t border-gray-200 text-right">
//             <span className="text-[6px] text-gray-400">Page 2 of 2</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Print styles */}
//       <style jsx global>{`
//         @media print {
//           @page {
//             margin: 0.1in;
//             size: letter portrait;
//           }
          
//           html, body {
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//             font-size: 100%;
//           }
          
//           /* Force each page to start on a new page when printing */
//           .page-content {
//             page-break-after: always;
//           }
          
//           /* Prevent elements from breaking across pages */
//           .page-break-inside-avoid {
//             break-inside: avoid;
//             page-break-inside: avoid;
//           }
          
//           /* Always display all pages when printing */
//           .print-block {
//             display: block !important;
//           }
          
//           /* Background colors for print */
//           .bg-slate-800 {
//             background-color: #1e293b !important;
//             color: white !important;
//           }
          
//           /* Ensure text colors print properly */
//           .text-teal-600 {
//             color: #0d9488 !important;
//           }
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(2px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.1s ease-out forwards;
//         }
//       `}</style>
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