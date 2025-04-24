// "use client";

// import React from "react";
// import {
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaGithub,
//   FaLinkedin,
//   FaTrophy,
//   FaCertificate,
//   FaBriefcase,
//   FaGraduationCap,
//   FaStar,
//   FaCode,
//   FaUser,
//   FaLink,
//   FaCalendarAlt
// } from "react-icons/fa";

// const ensureHttps = (url) => {
//   if (!url) return "";
//   return url.startsWith("http") ? url : `https://${url}`;
// };

// export default function Minimal({ resumeData }) {
//   const {
//     personalInfo,
//     experience,
//     education,
//     skills,
//     projects,
//     achievements,
//     certificates,
//   } = resumeData || {};

//   return (
//     <div className="bg-white w-full h-full font-sans text-gray-800 flex flex-col md:flex-row">
//       {/* Left Sidebar */}
//       <div className="w-full md:w-1/3 bg-gray-900 text-white p-6 md:p-8">
//         {/* Profile Section */}
//         <div className="text-center mb-8">
//           {personalInfo?.profileImage ? (
//             <img
//               src={personalInfo.profileImage}
//               alt={personalInfo.name}
//               className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700 object-cover"
//             />
//           ) : (
//             <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-800 flex items-center justify-center border-4 border-gray-700">
//               <FaUser className="text-gray-400 text-4xl" />
//             </div>
//           )}
          
//           <h1 className="text-2xl font-bold">
//             {personalInfo?.name || "Your Name"}
//           </h1>
          
//           {personalInfo?.title && (
//             <p className="text-gray-400 mt-2 text-lg font-light">
//               {personalInfo.title}
//             </p>
//           )}
//         </div>

//         {/* Contact Information */}
//         <div className="mb-8">
//           <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold">
//             Contact
//           </h2>
          
//           <div className="space-y-3 text-sm">
//             {personalInfo?.email && (
//               <div className="flex items-center">
//                 <FaEnvelope className="mr-3 text-gray-400" />
//                 <span className="text-gray-300">{personalInfo.email}</span>
//               </div>
//             )}
            
//             {personalInfo?.phone && (
//               <div className="flex items-center">
//                 <FaPhone className="mr-3 text-gray-400" />
//                 <span className="text-gray-300">{personalInfo.phone}</span>
//               </div>
//             )}
            
//             {personalInfo?.location && (
//               <div className="flex items-center">
//                 <FaMapMarkerAlt className="mr-3 text-gray-400" />
//                 <span className="text-gray-300">{personalInfo.location}</span>
//               </div>
//             )}
            
//             {personalInfo?.linkedin && (
//               <a
//                 href={ensureHttps(personalInfo.linkedin)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center text-gray-300 hover:text-white transition-colors"
//               >
//                 <FaLinkedin className="mr-3 text-gray-400" />
//                 <span>LinkedIn</span>
//               </a>
//             )}
            
//             {personalInfo?.github && (
//               <a
//                 href={ensureHttps(personalInfo.github)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center text-gray-300 hover:text-white transition-colors"
//               >
//                 <FaGithub className="mr-3 text-gray-400" />
//                 <span>GitHub</span>
//               </a>
//             )}
//           </div>
//         </div>

     

//         {/* Education Section */}
//         {education?.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold">
//               Education
//             </h2>
            
//             <div className="space-y-4">
//               {education.map((edu, index) => (
//                 <div key={index}>
//                   <h3 className="text-white font-medium">{edu.degree}</h3>
//                   <p className="text-gray-400 text-sm">{edu.school}</p>
//                   <div className="flex items-center text-gray-500 text-xs mt-1">
//                     <FaCalendarAlt className="mr-1" />
//                     <span>{edu.startDate} - {edu.endDate || "Present"}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Experience Section */}
//         {experience?.length > 0 && (
//           <section className="mb-8">
//             <div className="flex items-center mb-4">
//               <div className="h-8 w-1 bg-gray-900 mr-4"></div>
//               <h2 className="text-lg font-bold text-gray-800">EXPERIENCE</h2>
//             </div>
            
//             <div className="space-y-6">
//               {experience.map((job, index) => (
//                 <div key={index} className="relative pl-8 border-l border-gray-200">
//                   <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-gray-900 -translate-x-1.5"></div>
                  
//                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
//                     <h3 className="font-bold text-gray-800">
//                       {job.position || job.title}
//                     </h3>
//                     <span className="text-gray-500 text-sm mt-1 sm:mt-0">
//                       {job.startDate} - {job.endDate || "Present"}
//                     </span>
//                   </div>
                  
//                   <p className="text-gray-600 text-sm mt-1">
//                     {job.company}
//                     {job.location && <span> • {job.location}</span>}
//                   </p>
                  
//                   <p className="mt-2 text-gray-600 text-sm">
//                     {job.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Certifications Section */}
//         {certificates?.length > 0 && (
//           <div>
//             <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold">
//               Certifications
//             </h2>
            
//             <div className="space-y-3">
//               {certificates.map((cert, index) => (
//                 <div key={index}>
//                   <h3 className="text-white font-medium text-sm">{cert.name}</h3>
//                   <p className="text-gray-400 text-xs">{cert.issuer}</p>
//                   <p className="text-gray-500 text-xs">{cert.date}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto">
//         {/* About Me / Summary */}
//         {personalInfo?.summary && (
//           <section className="mb-8">
//             <div className="flex items-center mb-4">
//               <div className="h-8 w-1 bg-gray-900 mr-4"></div>
//               <h2 className="text-lg font-bold text-gray-800">ABOUT ME</h2>
//             </div>
//             <p className="text-gray-600 leading-relaxed">
//               {personalInfo.summary}
//             </p>
//           </section>
//         )}

//            {/* Skills Section */}
//            {skills?.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold">
//               Skills
//             </h2>
            
//             <div className="flex flex-wrap gap-2">
//               {skills.map((skill, index) => (
//                 <span 
//                   key={index} 
//                   className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

        

//         {/* Projects Section */}
//         {projects?.length > 0 && (
//           <section className="mb-8">
//             <div className="flex items-center mb-4">
//               <div className="h-8 w-1 bg-gray-900 mr-4"></div>
//               <h2 className="text-lg font-bold text-gray-800">PROJECTS</h2>
//             </div>
            
//             <div className="grid grid-cols-1 gap-6">
//               {projects.map((project, index) => (
//                 <div 
//                   key={index} 
//                   className="p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
//                 >
//                   <div className="flex justify-between items-start">
//                     <h3 className="font-bold text-gray-800">{project.title}</h3>
                    
//                     {project.link && (
//                       <a
//                         href={ensureHttps(project.link)}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-gray-500 hover:text-gray-800 transition-colors"
//                       >
//                         <FaLink />
//                       </a>
//                     )}
//                   </div>
                  
//                   {project.technologies && (
//                     <div className="flex flex-wrap gap-1 my-2">
//                       {project.technologies.map((tech, idx) => (
//                         <span 
//                           key={idx} 
//                           className="text-xs text-gray-600"
//                         >
//                           {tech}{idx < project.technologies.length - 1 ? " • " : ""}
//                         </span>
//                       ))}
//                     </div>
//                   )}
                  
//                   <p className="text-sm text-gray-600">
//                     {project.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Achievements Section */}
//         {achievements?.length > 0 && (
//           <section className="mb-8">
//             <div className="flex items-center mb-4">
//               <div className="h-8 w-1 bg-gray-900 mr-4"></div>
//               <h2 className="text-lg font-bold text-gray-800">ACHIEVEMENTS</h2>
//             </div>
            
//             <div className="space-y-4">
//               {achievements.map((achievement, index) => (
//                 <div key={index} className="border-l-4 border-gray-200 pl-4 py-1 hover:border-gray-400 transition-colors">
//                   <div className="flex flex-col sm:flex-row sm:justify-between">
//                     <h3 className="font-bold text-gray-800">{achievement.title}</h3>
//                     {achievement.date && (
//                       <span className="text-gray-500 text-sm">
//                         {achievement.date}
//                       </span>
//                     )}
//                   </div>
                  
//                   {achievement.organization && (
//                     <p className="text-gray-600 text-sm">
//                       {achievement.organization}
//                     </p>
//                   )}
                  
//                   {achievement.description && (
//                     <p className="mt-1 text-gray-600 text-sm">
//                       {achievement.description}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTrophy,
  FaCertificate,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaCode,
  FaUser,
  FaLink,
  FaCalendarAlt
} from "react-icons/fa";

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Iconic({ resumeData }) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    achievements,
    certificates,
  } = resumeData || {};

  return (
    <div className="bg-white w-full h-full font-sans text-gray-800 flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 bg-gray-900 text-white p-6 md:p-8">
        {/* Profile Section */}
        <div className="text-center mb-8">
          {personalInfo?.profileImage ? (
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700 object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-800 flex items-center justify-center border-4 border-gray-700">
              <FaUser className="text-gray-400 text-4xl" />
            </div>
          )}
          
          <h1 className="text-2xl font-bold">
            {personalInfo?.name || "Your Name"}
          </h1>
          
          {personalInfo?.title && (
            <p className="text-gray-400 mt-2 text-lg font-light">
              {personalInfo.title}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold">
            Contact
          </h2>
          
          <div className="space-y-3 text-sm">
            {personalInfo?.email && (
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-gray-400" />
                <span className="text-gray-300">{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo?.phone && (
              <div className="flex items-center">
                <FaPhone className="mr-3 text-gray-400" />
                <span className="text-gray-300">{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo?.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-gray-400" />
                <span className="text-gray-300">{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo?.linkedin && (
              <a
                href={ensureHttps(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <FaLinkedin className="mr-3 text-gray-400" />
                <span>LinkedIn</span>
              </a>
            )}
            
            {personalInfo?.github && (
              <a
                href={ensureHttps(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <FaGithub className="mr-3 text-gray-400" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

      

        {/* Education Section */}
        {education?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold">
              Education
            </h2>
            
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium">{edu.degree}</h3>
                  <p className="text-gray-400 text-sm">{edu.school}</p>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <FaCalendarAlt className="mr-1" />
                    <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


          {/* Skills Section - Now in sidebar with appropriate styling */}
          {skills?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold">
              Skills
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {certificates?.length > 0 && (
          <div>
            <h2 className="text-sm uppercase tracking-widest mb-4 border-b border-gray-700 pb-2 font-bold">
              Certifications
            </h2>
            
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium text-sm">{cert.name}</h3>
                  <p className="text-gray-400 text-xs">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 p-6 md:p-8 overflow-y-auto">
        {/* About Me / Summary */}
        {personalInfo?.summary && (
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-1 bg-gray-900 mr-4"></div>
              <h2 className="text-lg font-bold text-gray-800">ABOUT ME</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience Section - Moved to main content area */}
        {experience?.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-1 bg-gray-900 mr-4"></div>
              <h2 className="text-lg font-bold text-gray-800">EXPERIENCE</h2>
            </div>
            
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index} className="relative pl-8 border-l border-gray-200">
                  <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-gray-900 -translate-x-1.5"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <h3 className="font-bold text-gray-800">
                      {job.position || job.title}
                    </h3>
                    <span className="text-gray-500 text-sm mt-1 sm:mt-0">
                      {job.startDate} - {job.endDate || "Present"}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-1">
                    {job.company}
                    {job.location && <span> • {job.location}</span>}
                  </p>
                  
                  <p className="mt-2 text-gray-600 text-sm">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-1 bg-gray-900 mr-4"></div>
              <h2 className="text-lg font-bold text-gray-800">PROJECTS</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800">{project.title}</h3>
                    
                    {project.link && (
                      <a
                        href={ensureHttps(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-800 transition-colors"
                      >
                        <FaLink />
                      </a>
                    )}
                  </div>
                  
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1 my-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs text-gray-600"
                        >
                          {tech}{idx < project.technologies.length - 1 ? " • " : ""}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements Section */}
        {achievements?.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-1 bg-gray-900 mr-4"></div>
              <h2 className="text-lg font-bold text-gray-800">ACHIEVEMENTS</h2>
            </div>
            
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="border-l-4 border-gray-200 pl-4 py-1 hover:border-gray-400 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="font-bold text-gray-800">{achievement.title}</h3>
                    {achievement.date && (
                      <span className="text-gray-500 text-sm">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                  
                  {achievement.organization && (
                    <p className="text-gray-600 text-sm">
                      {achievement.organization}
                    </p>
                  )}
                  
                  {achievement.description && (
                    <p className="mt-1 text-gray-600 text-sm">
                      {achievement.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}