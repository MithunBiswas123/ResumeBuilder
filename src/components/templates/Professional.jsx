


"use client";

import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTrophy } from 'react-icons/fa';

const ensureHttps = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default function Professional({ resumeData }) {
  const { personalInfo, experience, education, skills, projects, achievements } = resumeData || {};
  
  return (
    <div className="bg-white w-full h-full p-10 font-serif text-gray-800">
      {/* Header */}
      <header className="text-center border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider">
          {personalInfo?.name || 'Your Name'}
        </h1>
        {personalInfo?.title && <p className="text-xl mt-1">{personalInfo.title}</p>}
        
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {personalInfo?.email && (
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo?.linkedin && (
            <a
              href={ensureHttps(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-900"
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
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <FaGithub className="mr-3 text-gray-400" />
              <span>GitHub</span>
            </a>
          )}
          
          {personalInfo?.phone && (
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              {personalInfo.phone}
            </div>
          )}
          
          {personalInfo?.location && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              {personalInfo.location}
            </div>
          )}
        </div>
      </header>
      
      {/* Profile Image */}
      {personalInfo?.profileImage && (
        <div className="flex justify-center mb-6">
          <img 
            src={personalInfo.profileImage} 
            alt={personalInfo.name} 
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
          />
        </div>
      )}
      
      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Summary</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Experience</h2>
          {experience.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold">{job.position || job.title}</h3>
                <span className="italic">{job.startDate} - {job.endDate || 'Present'}</span>
              </div>
              <p className="font-semibold">{job.company}</p>
              <p className="mt-2">{job.description}</p>
            </div>
          ))}
        </section>
      )}
      
      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold">{edu.degree}</h3>
                <span className="italic">{edu.startDate} - {edu.endDate || 'Present'}</span>
              </div>
              <p className="font-semibold">{edu.school}</p>
              {edu.description && <p className="mt-2">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}
      
      {/* Achievements - New Section */}
      {achievements?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Achievements</h2>
          {achievements.map((achievement, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-bold">{achievement.title}</h3>
                {achievement.date && <span className="italic">{achievement.date}</span>}
              </div>
              {achievement.organization && (
                <p className="font-semibold">{achievement.organization}</p>
              )}
              {achievement.description && (
                <p className="mt-2">{achievement.description}</p>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Skills</h2>
          <p>{skills.join(' • ')}</p>
        </section>
      )}
      
      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6 flex-1 min-w-[200px]">
          <h2 className="text-lg font-bold text-blue-600 border-b border-blue-200 pb-1 mb-3">
            PROJECTS
          </h2>

          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold">{project.title}</h3>
              {project.technologies && (
                <p className="text-sm text-blue-600 mb-1">
                  {project.technologies.join(" • ")}
                </p>
              )}
              <p className="text-sm">{project.description}</p>
              {project.link && (
                <a
                  href={ensureHttps(project.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 text-sm hover:text-gray-800"
                >
                  View →
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}