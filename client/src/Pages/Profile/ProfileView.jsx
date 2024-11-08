import React, { useState,useEffect }  from 'react';
import './ProfileView.css';
import { NavLink } from "react-router-dom";
import axios from "axios";

const ProfileView = ({userId}) => {

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
  return (
    <div className="main-profile-view-body">
    <div className="profile-container-profile-view">
      {/* Header Section */}
      <div className="header-profile-view">
        <div className="profile-img-container-profile-view">
        <img src={`http://localhost:3000/profileimages/${image}`} className="img1-responsive-36" alt="profile" />
        </div>
        <div className="profile-info-profile-view">
          <h1 className="profile-name-profile-view">John Doe</h1>
          
          <p className="profile-location-profile-view">New York, USA</p>
          <div className="social-links-profile-view">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://portfolio.com" target="_blank" rel="noreferrer">Portfolio</a>
          </div>
          <div className="profile-actions-profile-view">
           <NavLink to= "/profileedit"> <button className="btn-profile-view">Edit Profile</button></NavLink>
            <button className="btn-profile-view">Download Resume</button>
            <NavLink to= "/chat"> <button className="btn-profile-view">Message</button></NavLink>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-profile-view">
        <h2>About Me</h2>
        <p>Experienced software engineer specializing in frontend development with React. Passionate about building performant, user-friendly applications and exploring new technologies.</p>
        <div className="skills-profile-view">
          <span>React</span>
          <span>JavaScript</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>Node.js</span>
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="experience-profile-view">
        <h2>Work Experience</h2>
        <div className="experience-item-profile-view">
          <h3>Google</h3>
          <p>Software Engineer - June 2020 - Present</p>
          <p>Responsible for building scalable web applications and improving user experience across multiple platforms.</p>
        </div>
        <div className="experience-item-profile-view">
          <h3>Microsoft</h3>
          <p>Frontend Developer - January 2018 - May 2020</p>
          <p>Worked on the development of responsive and accessible web applications for enterprise clients.</p>
        </div>
      </div>

      {/* Education Section */}
      <div className="education-profile-view">
        <h2>Education</h2>
        <div className="education-item-profile-view">
          <h3>Harvard University</h3>
          <p>BSc in Computer Science - 2014 - 2018</p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="projects-profile-view">
        <h2>Projects</h2>
        <div className="project-item-profile-view">
          <h3>Job Portal Platform</h3>
          <p>Developed a full-stack job portal platform using MERN stack, featuring real-time job postings and advanced filtering options.</p>
          <a href="https://project-link.com" target="_blank" rel="noreferrer">View Project</a>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="certifications-profile-view">
        <h2>Certifications</h2>
        <div className="certification-item-profile-view">
          <h3>Certified AWS Solutions Architect</h3>
          <p>Amazon Web Services - 2021</p>
        </div>
      </div>

    </div>
    </div>
  );
};

export default ProfileView;
