"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";

export default function ResumeForm({
  resumeData,
  setResumeData,
  setActiveSection,
}) {
  const [currentTab, setCurrentTab] = useState("personal");

  // Personal info change handler
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });

    if (name === "summary") {
      setActiveSection("summary");
    }
  };

  // Image upload handler
  const handleImageUpload = (imageData) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        profileImage: imageData,
      },
    });
  };

  // Experience handlers
  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const updateExperience = (index, field, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };

    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });

    setActiveSection("experience");
  };

  // Education handlers
  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          degree: "",
          school: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });

    setActiveSection("education");
  };

  // For example in your page component:
  const initialResumeData = {
    // ... other fields
    skillCategories: [
      { name: "", skills: [] },
      { name: "", skills: [] },
    ],
    skills: [], // Keep for backward compatibility
  };

  // Add these handlers to ResumeForm
  const addSkillCategory = () => {
    setResumeData({
      ...resumeData,
      skillCategories: [
        ...(resumeData.skillCategories || []),
        { name: "", skills: [] },
      ],
    });
  };

  const updateCategoryName = (index, name) => {
    const updatedCategories = [...(resumeData.skillCategories || [])];
    updatedCategories[index] = {
      ...updatedCategories[index],
      name,
    };

    setResumeData({
      ...resumeData,
      skillCategories: updatedCategories,
      // Also update the flat skills array for backward compatibility
      skills: getAllSkills(updatedCategories),
    });

    setActiveSection("skills");
  };

  const updateCategorySkills = (index, skillsString) => {
    // Store the raw input string for display in the textarea
    const rawInput = skillsString;

    // For processing skills, we'll use a smarter approach:
    // 1. Split by commas first (primary separator)
    // 2. For each comma-separated part, check if it contains multiple words
    // 3. If a part has no commas but has enters (newlines), treat each line as a skill

    let skills = [];

    // Split by commas first
    const commaParts = rawInput.split(",");

    commaParts.forEach((part) => {
      // Trim the part to remove leading/trailing spaces
      const trimmedPart = part.trim();

      if (trimmedPart.length === 0) return;

      // If it contains newlines, split by newlines
      if (trimmedPart.includes("\n")) {
        const lineParts = trimmedPart.split("\n");
        lineParts.forEach((line) => {
          const trimmedLine = line.trim();
          if (trimmedLine.length > 0) {
            skills.push(trimmedLine);
          }
        });
      } else {
        // It's a single skill (possibly with spaces)
        skills.push(trimmedPart);
      }
    });

    // Filter out any empty skills
    skills = skills.filter((skill) => skill.trim() !== "");

    const updatedCategories = [...(resumeData.skillCategories || [])];
    updatedCategories[index] = {
      ...updatedCategories[index],
      skills,
      rawInput, // Store the raw input for preserving format in the textarea
    };

    setResumeData({
      ...resumeData,
      skillCategories: updatedCategories,
      skills: getAllSkills(updatedCategories),
    });

    setActiveSection("skills");
  };

  const deleteCategory = (index) => {
    const updatedCategories = [...(resumeData.skillCategories || [])];
    updatedCategories.splice(index, 1);

    setResumeData({
      ...resumeData,
      skillCategories: updatedCategories,
      // Also update the flat skills array for backward compatibility
      skills: getAllSkills(updatedCategories),
    });
  };

  // Helper function to get all skills from all categories
  const getAllSkills = (categories) => {
    return categories.reduce((allSkills, category) => {
      return [...allSkills, ...category.skills];
    }, []);
  };

  // Project handlers
  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { title: "", description: "", technologies: [] },
      ],
    });
  };

  const updateProject = (index, field, value) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };

    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });

    setActiveSection("projects");
  };

  const updateProjectTechnologies = (index, value) => {
    const technologies = value
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech !== "");
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      technologies: technologies,
    };

    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  // Delete handlers for each section
  const deleteExperience = (index) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const deleteEducation = (index) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const deleteProject = (index) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  // Add this to your ResumeForm component with the other state handlers

  // Achievement handlers
   const addAchievement = () => {
     setResumeData({
       ...resumeData,
       achievements: [
         ...(resumeData.achievements || []),
         { title: "", organization: "", date: "", description: "" }
       ]
     });
   };

   const updateAchievement = (index, field, value) => {
     const updatedAchievements = [...(resumeData.achievements || [])];
     updatedAchievements[index] = {
       ...updatedAchievements[index],
       [field]: value
     };

     setResumeData({
       ...resumeData,
       achievements: updatedAchievements
     });

     setActiveSection("achievements");
   };

  {
    /* Achievements Tab */
    {/* Achievements Tab */}
{currentTab === "achievements" && (
  <div>
    {(resumeData.achievements || []).map((achievement, index) => (
      <div key={index} className="mb-6 p-4 border rounded-md relative">
        <button
          onClick={() => deleteAchievement(index)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          title="Delete achievement"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="font-medium mb-3">Achievement #{index + 1}</h3>

        {/* Achievement form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Title/Award */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Title/Award
            </label>
            <input
              type="text"
              value={achievement.title || ""}
              onChange={(e) =>
                updateAchievement(index, "title", e.target.value)
              }
              className="w-full p-2 border rounded-md"
              placeholder="e.g., Employee of the Year, Certification"
            />
          </div>
          {/* Organization */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Organization
            </label>
            <input
              type="text"
              value={achievement.organization || ""}
              onChange={(e) =>
                updateAchievement(index, "organization", e.target.value)
              }
              className="w-full p-2 border rounded-md"
              placeholder="e.g., Google, Microsoft, University"
            />
          </div>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="text"
            value={achievement.date || ""}
            onChange={(e) =>
              updateAchievement(index, "date", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            placeholder="e.g., May 2023, 2020-2022"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            value={achievement.description || ""}
            onChange={(e) =>
              updateAchievement(index, "description", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            rows="3"
            placeholder="Details about your achievement and its significance"
          ></textarea>
        </div>
      </div>
    ))}

    <button
      onClick={addAchievement}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
    >
      Add Achievement
    </button>
  </div>
)}
  }
  

  // Add this near your other handlers (before the return statement)
  // const addAchievement = () => {
  //   setResumeData({
  //     ...resumeData,
  //     achievements: [
  //       ...(resumeData.achievements || []),
  //       { title: "", organization: "", date: "", description: "" },
  //     ],
  //   });
  // };

  // const updateAchievement = (index, field, value) => {
  //   const updatedAchievements = [...(resumeData.achievements || [])];
  //   updatedAchievements[index] = {
  //     ...updatedAchievements[index],
  //     [field]: value,
  //   };

  //   setResumeData({
  //     ...resumeData,
  //     achievements: updatedAchievements,
  //   });

  //   setActiveSection("achievements");
  // };

  const deleteAchievement = (index) => {
    const updatedAchievements = [...(resumeData.achievements || [])];
    updatedAchievements.splice(index, 1);
    setResumeData({
      ...resumeData,
      achievements: updatedAchievements,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Tab navigation */}
      <div className="flex flex-wrap border-b mb-6">
        <button
          className={`px-4 py-2 ${
            currentTab === "personal"
              ? "border-b-2 border-blue-600 text-blue-600"
              : ""
          }`}
          onClick={() => setCurrentTab("personal")}
        >
          Personal
        </button>
        <button
          className={`px-4 py-2 ${
            currentTab === "experience"
              ? "border-b-2 border-blue-600 text-blue-600"
              : ""
          }`}
          onClick={() => setCurrentTab("experience")}
        >
          Experience
        </button>
        <button
          className={`px-4 py-2 ${
            currentTab === "education"
              ? "border-b-2 border-blue-600 text-blue-600"
              : ""
          }`}
          onClick={() => setCurrentTab("education")}
        >
          Education
        </button>
        <button
          className={`px-4 py-2 ${
            currentTab === "skills"
              ? "border-b-2 border-blue-600 text-blue-600"
              : ""
          }`}
          onClick={() => setCurrentTab("skills")}
        >
          Skills
        </button>
        <button
          className={`px-4 py-2 ${
            currentTab === "projects"
              ? "border-b-2 border-blue-600 text-blue-600"
              : ""
          }`}
          onClick={() => setCurrentTab("projects")}
        >
          Projects
        </button>

        {/* Add this button in the tab navigation area */}
        <button
          className={`px-4 py-2 ${
            currentTab === "achievements"
              ? "border-b-2 border-blue-600 text-blue-600"
              : ""
          }`}
          onClick={() => setCurrentTab("achievements")}
        >
          Achievements
        </button>

        
      </div>

      {/* Personal Info Tab */}
      {currentTab === "personal" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={resumeData.personalInfo.name || ""}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={resumeData.personalInfo.title || ""}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={resumeData.personalInfo.email || ""}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={resumeData.personalInfo.phone || ""}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Linkedin</label>
              <input
                type="linkedin"
                name="linkedin"
                value={resumeData.personalInfo.linkedin || ""}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Github</label>
              <input
                type="github"
                name="github"
                value={resumeData.personalInfo.github || ""}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={resumeData.personalInfo.location || ""}
              onChange={handlePersonalInfoChange}
              className="w-full p-2 border rounded-md"
              placeholder="City, Country"
            />
          </div>

          {/* Updated ImageUploader component */}
          <div className="mb-4">
            <ImageUploader
              onImageUpload={handleImageUpload}
              currentImage={resumeData.personalInfo.profileImage}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Professional Summary
            </label>
            <textarea
              name="summary"
              value={resumeData.personalInfo.summary || ""}
              onChange={handlePersonalInfoChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Brief overview of your professional background and strengths"
            ></textarea>
          </div>
        </div>
      )}

      {/* Experience Tab */}
      {currentTab === "experience" && (
        <div>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-6 p-4 border rounded-md relative">
              <button
                onClick={() => deleteExperience(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Delete experience"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3 className="font-medium mb-3">Experience #{index + 1}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={exp.position || ""}
                    onChange={(e) =>
                      updateExperience(index, "position", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={exp.company || ""}
                    onChange={(e) =>
                      updateExperience(index, "company", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location || ""}
                    onChange={(e) =>
                      updateExperience(index, "location", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={exp.startDate || ""}
                    onChange={(e) =>
                      updateExperience(index, "startDate", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={exp.endDate || ""}
                    onChange={(e) =>
                      updateExperience(index, "endDate", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    placeholder="DD/MM/YYYY or Present"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                  rows="3"
                  placeholder="Key responsibilities and achievements"
                ></textarea>
              </div>
            </div>
          ))}

          <button
            onClick={addExperience}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Add Experience
          </button>
        </div>
      )}

      {/* Education Tab */}
      {currentTab === "education" && (
        <div>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-6 p-4 border rounded-md relative">
              <button
                onClick={() => deleteEducation(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Delete education"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3 className="font-medium mb-3">Education #{index + 1}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree || ""}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    School
                  </label>
                  <input
                    type="text"
                    value={edu.school || ""}
                    onChange={(e) =>
                      updateEducation(index, "school", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={edu.location || ""}
                    onChange={(e) =>
                      updateEducation(index, "location", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={edu.startDate || ""}
                    onChange={(e) =>
                      updateEducation(index, "startDate", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={edu.endDate || ""}
                    onChange={(e) =>
                      updateEducation(index, "endDate", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    placeholder="DD?MM/YYYY or Present"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={edu.description || ""}
                  onChange={(e) =>
                    updateEducation(index, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                  rows="3"
                  placeholder="Achievements, GPA, relevant coursework, etc."
                ></textarea>
              </div>
            </div>
          ))}

          <button
            onClick={addEducation}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Add Education
          </button>
        </div>
      )}

      {/* Skills Tab */}

      {currentTab === "skills" && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Skills by Category
          </label>

          {/* Skills categories */}
          <div className="space-y-6">
            {resumeData.skillCategories?.map((category, catIndex) => (
              <div key={catIndex} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) =>
                        updateCategoryName(catIndex, e.target.value)
                      }
                      className="font-medium text-gray-800 border-b border-dashed border-gray-300 focus:border-blue-500 focus:outline-none"
                      placeholder="Category name"
                    />
                  </div>
                  <button
                    onClick={() => deleteCategory(catIndex)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove category"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Skills input for this category */}
                <textarea
                  value={category.rawInput || category.skills.join(", ")}
                  onChange={(e) =>
                    updateCategorySkills(catIndex, e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                  rows="3"
                  placeholder="Type skills and press comma, space, or Enter to separate"
                  style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
                ></textarea>

                <p className="text-xs text-gray-500 mt-1">
                  Type naturally with commas to separate skills. Press Enter for
                  new lines.
                  <br />
                  Example: "JavaScript, HTML, CSS" or "JavaScript" on each line
                </p>

                {/* Display skills for this category */}
                {category.skills.length > 0 && (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add category button */}
          <button
            onClick={addSkillCategory}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Skill Category
          </button>

          {/* Preview of all skills */}
          {resumeData.skillCategories?.length > 0 && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium mb-3">
                Your skills by category:
              </h3>
              {resumeData.skillCategories.map((category, index) => (
                <div key={index} className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-700">
                    {category.name || "Unnamed Category"}
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1 ml-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Projects Tab */}
      {currentTab === "projects" && (
        <div>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-6 p-4 border rounded-md relative">
              <button
                onClick={() => deleteProject(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Delete project"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3 className="font-medium mb-3">Project #{index + 1}</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={project.title || ""}
                  onChange={(e) =>
                    updateProject(index, "title", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                  rows="3"
                  placeholder="Describe your project, technologies used, and outcomes"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Technologies
                </label>
                <input
                  type="text"
                  value={
                    project.technologies ? project.technologies.join(", ") : ""
                  }
                  onChange={(e) =>
                    updateProjectTechnologies(index, e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter technologies separated by commas (e.g. React, Node.js, MongoDB)"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Project Link
                </label>
                <input
                  type="text"
                  value={project.link || ""}
                  onChange={(e) => updateProject(index, "link", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          ))}

          <button
            onClick={addProject}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Add Project
          </button>
        </div>
      )}

      {/* Achievements Tab */}
{currentTab === "achievements" && (
  <div>
    {(resumeData.achievements || []).map((achievement, index) => (
      <div key={index} className="mb-6 p-4 border rounded-md relative">
        <button
          onClick={() => deleteAchievement(index)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          title="Delete achievement"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="font-medium mb-3">Achievement #{index + 1}</h3>

        {/* Achievement form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Title/Award */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Title/Award
            </label>
            <input
              type="text"
              value={achievement.title || ""}
              onChange={(e) =>
                updateAchievement(index, "title", e.target.value)
              }
              className="w-full p-2 border rounded-md"
              placeholder="e.g., Employee of the Year, Certification"
            />
          </div>
          {/* Organization */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Organization
            </label>
            <input
              type="text"
              value={achievement.organization || ""}
              onChange={(e) =>
                updateAchievement(index, "organization", e.target.value)
              }
              className="w-full p-2 border rounded-md"
              placeholder="e.g., Google, Microsoft, University"
            />
          </div>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="text"
            value={achievement.date || ""}
            onChange={(e) =>
              updateAchievement(index, "date", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            placeholder="e.g., May 2023, 2020-2022"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            value={achievement.description || ""}
            onChange={(e) =>
              updateAchievement(index, "description", e.target.value)
            }
            className="w-full p-2 border rounded-md"
            rows="3"
            placeholder="Details about your achievement and its significance"
          ></textarea>
        </div>
      </div>
    ))}

    <button
      onClick={addAchievement}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
    >
      Add Achievement
    </button>
  </div>
)}


    </div>
  );
}
