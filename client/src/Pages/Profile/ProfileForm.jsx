import React, { useState } from 'react';
import './ProfileForm.css';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    education: [''],
    experience: [''],
    projects: [''],
    skills: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (index, e) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData({ ...formData, skills: newSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleEducationChange = (index, e) => {
    const newEducation = [...formData.education];
    newEducation[index] = e.target.value;
    setFormData({ ...formData, education: newEducation });
  };

  const addEducation = () => {
    setFormData({ ...formData, education: [...formData.education, ''] });
  };

  const removeEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  const handleExperienceChange = (index, e) => {
    const newExperience = [...formData.experience];
    newExperience[index] = e.target.value;
    setFormData({ ...formData, experience: newExperience });
  };

  const addExperience = () => {
    setFormData({ ...formData, experience: [...formData.experience, ''] });
  };

  const removeExperience = (index) => {
    const newExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: newExperience });
  };

  const handleProjectChange = (index, e) => {
    const newProjects = [...formData.projects];
    newProjects[index] = e.target.value;
    setFormData({ ...formData, projects: newProjects });
  };

  const addProject = () => {
    setFormData({ ...formData, projects: [...formData.projects, ''] });
  };

  const removeProject = (index) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: newProjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/prof/profileData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Profile created successfully:', result);
      } else {
        console.error('Error creating profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="profile-form-container">
      <h2 className="form-title">Create Your Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="2"
          />
        </div>

        <div className="form-group">
          <label>LinkedIn:</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>GitHub:</label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Skills:</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="skill-input-group">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e)}
                placeholder={`Skill ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="remove-skill-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addSkill} className="add-skill-btn">
            Add Skill
          </button>
        </div>

        <div className="form-group">
          <label>Education:</label>
          {formData.education.map((edu, index) => (
            <div key={index} className="skill-input-group">
              <input
                type="text"
                value={edu}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder={`Education ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="remove-skill-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addEducation} className="add-skill-btn">
            Add Education
          </button>
        </div>

        <div className="form-group">
          <label>Experience:</label>
          {formData.experience.map((exp, index) => (
            <div key={index} className="skill-input-group">
              <input
                type="text"
                value={exp}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder={`Experience ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="remove-skill-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addExperience} className="add-skill-btn">
            Add Experience
          </button>
        </div>

        <div className="form-group">
          <label>Projects:</label>
          {formData.projects.map((project, index) => (
            <div key={index} className="skill-input-group">
              <input
                type="text"
                value={project}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder={`Project ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="remove-skill-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addProject} className="add-skill-btn">
            Add Project
          </button>
        </div>

        {/* <div className="form-group">
          <label>Education:</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Bachelor's in Computer Science"
          />
        </div>

        <div className="form-group">
          <label>Experience:</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Software Engineer at XYZ Company"
          />
        </div>

        <div className="form-group">
          <label>Projects:</label>
          <textarea
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            rows="3"
            placeholder="e.g., Portfolio Website, E-commerce App"
          />
        </div> */}

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default ProfileForm;
