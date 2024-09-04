import React, {useState} from 'react';
import './Resume1.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Resume1 = () => {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    title: "",
    email: "",
    linkedin: "",
    github: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const templateId = new URLSearchParams(location.search).get('template')
  const [resumeId, setResumeId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/newapi/resume1", formData);

      if (response.status === 201) {
        const data = response.data;
        navigate(`/resume2?template=${templateId}`, { state: { resumeId: data._id } });
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (err) {
      console.error('Error:', err.message);
      // Optionally show an error message to the user
    }
  };

  const handle = () => {
    navigate('/resume');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='main-resume1-243'>
      <header className="header43-resume1">
        <h1 className="website-name43-resume1">JobHunt</h1>
        <button className="signup-button-header43-resume1" onClick={handle}>Back</button>
      </header>
      <div className="hole43-resume1">
        <div className="container43-resume1">
          <div className="form-container43-resume1">
            <form action="#" className="form43-resume1">
              <div className="login-text43-resume1">Create your resume</div>

              <label>First Name</label>
              <input 
                type="text"
                name="firstname"
                placeholder="Enter First Name"    
                className="input1-43-resume1"
                value={formData.firstname}
                onChange={handleChange}
              />

              <label>Last Name </label>
              <input 
                type="text"
                name="lastname"
                placeholder="Enter Last Name" 
                className="input2-43-resume1"
                value={formData.lastname}
                onChange={handleChange}
              />
              
              <label>Title</label>
              <input 
                type="text"
                name="title"
                placeholder="Enter title" 
                className="input6-43-resume1"
                value={formData.title}
                onChange={handleChange}
              />

              <label>Email</label>
              <input 
                type="text"
                name="email"
                placeholder="Enter email" 
                className="input3-43-resume1"
                value={formData.email}
                onChange={handleChange}
              />

              <label>LinkedIn</label>
              <input 
                type="text"
                name="linkedin"
                placeholder="Enter Linkedin" 
                className="input4-43-resume1"
                value={formData.linkedin}
                onChange={handleChange}
              />

              <label>GitHub</label>
              <input 
                type="text"
                name="github"
                placeholder="Enter GitHub" 
                className="input5-43-resume1"
                value={formData.github}
                onChange={handleChange}
              />
              
              <button onClick={handleSubmit} className="button43-resume1">Next</button>
            </form>
          </div>
          <div className="login-image43-resume1">
            <h2>Build Your Resume Easily</h2>
            <p>Create a professional-looking resume with our easy-to-use builder.</p>
            <ul>
              <li>Choose from various resume templates</li>
              <li>Add your education, experience, and skills</li>
              <li>Customize the layout and design</li>
              <li>Download or print your resume</li>
            </ul>
  
            <h3>Why Choose Our Resume Builder?</h3>
            <ul>
              <li>Simple and intuitive interface</li>
              <li>Professional templates for different industries</li>
              <li>Real-time preview of your resume</li>
              <li>Option to save and edit your resume anytime</li>
              <li>Secure and confidential</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume1;
