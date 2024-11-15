import React, { useState,useEffect }  from 'react';
import './ProfileView.css';
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom'

const ProfileView = () => {

  // const { userId } = useParams(); 
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

  const [image, setImage] = useState();

  const handleImageUpload = (e) => {
    const formsData = new FormData()
    formsData.append('file', file)
    axios.post('http://localhost:3000/imageupload', formsData)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  };

  useEffect(() => {
    axios.get('http://localhost:3000/getimage')
    .then(res => {
      setImage(res.data[res.data.length - 1].image); 
      console.log("Fetched data" ,res.data[0].image);
    })
    .catch(err => console.log(err))
   
  }, [])

  useEffect(() => {
    // if (!userId) {
    //   console.error("User ID is missing. Cannot fetch profile data.");
    //   return;
    // }
    axios.get("http://localhost:3000/prof/profileData")
      .then(res => {
        const profileData = res.data;
        setFormData({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
          linkedin: profileData.linkedin,
          github: profileData.github,
          education: profileData.education,
          experience: profileData.experience,
          projects: profileData.projects,
          skills: profileData.skills,
        });
      })
      .catch(err => console.log(err));
  }, []);
  

  return (
    <div className="main-profile-view-body">
      <div className="profile-container-profile-view">
        {/* Header Section */}
        <div className="header-profile-view">
          <div className="profile-img-container-profile-view">
            <img 
              src={`http://localhost:3000/profileimages/${image}`} 
              className="img1-responsive-36" 
              alt="profile" 
            />
          </div>
          <div className="profile-info-profile-view">
            <h1 className="profile-name-profile-view">
              {formData.firstName} {formData.lastName}
            </h1>
            <p className="profile-location-profile-view">{formData.address}</p>
            <div className="social-links-profile-view">
  {formData.linkedin && (
    <a href={formData.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
  )}
  {formData.github && (
    <a href={formData.github} target="_blank" rel="noreferrer">GitHub</a>
  )}
</div>

            <div className="profile-actions-profile-view">
              <NavLink to="/profileedit"><button className="btn-profile-view">Edit Profile</button></NavLink>
              <button className="btn-profile-view">Download Resume</button>
              <NavLink to="/chat"><button className="btn-profile-view">Message</button></NavLink>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="about-profile-view">
          <h2>About Me</h2>
          <p>{formData.about}</p>
          <div className="skills-profile-view">
            {formData.skills.map((skill, index) => <span key={index}>{skill}</span>)}
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="experience-profile-view">
          <h2>Work Experience</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="experience-item-profile-view">
              <h3>{exp.company}</h3>
              <p>{exp.position} - {exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="education-profile-view">
          <h2>Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="education-item-profile-view">
              <h3>{edu.institution}</h3>
              <p>{edu.degree} - {edu.year}</p>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="projects-profile-view">
          <h2>Projects</h2>
          {formData.projects.map((project, index) => (
            <div key={index} className="project-item-profile-view">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noreferrer">View Project</a>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="certifications-profile-view">
          <h2>Certifications</h2>
          {formData.certifications && formData.certifications.map((cert, index) => (
            <div key={index} className="certification-item-profile-view">
              <h3>{cert.name}</h3>
              <p>{cert.issuer} - {cert.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;