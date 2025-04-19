"use client";

export default function Professional({ resumeData }) {
  const { personalInfo, experience, education, skills, projects } = resumeData || {};
  
  return (
    <div className="bg-white w-full h-full p-10 font-serif text-gray-800">
      {/* Header */}
      <header className="text-center border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider">
          {personalInfo?.name || 'Your Name'}
        </h1>
        {personalInfo?.title && <p className="text-xl mt-1">{personalInfo.title}</p>}
        
        <div className="flex justify-center gap-4 mt-3 text-sm">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
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
      
      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Skills</h2>
          <p>{skills.join(' • ')}</p>
        </section>
      )}
      
      {/* Projects */}
      {projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}