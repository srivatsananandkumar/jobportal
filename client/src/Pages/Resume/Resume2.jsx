
//Resume2.js
import React, {useState} from 'react'
import './Resume2.css'; // Update CSS file import accordingly
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Resume2 = () => {
  const [formData, setFormData] = useState({
     skill1:"",
     skill2:"",
     skill3:"",
     skill4:"",
     skill5:"",
  });

  const location = useLocation();
  const location2 = useLocation();

  const templateId = new URLSearchParams(location2.search).get('template');

  const resumeId = location.state ? location.state.resumeId : null;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeId) {
      console.error('resumeId is missing');
      // Optionally, navigate back to the first step
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/newapi/resume2",{ ...formData,id: resumeId });

      
      if (response.status === 200) {
        navigate(`/resume3?template=${templateId}`, { state: { resumeId } });
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (err) {
      console.error('Error:', err.message);
      // Optionally show an error message to the user
    }
  };

  const handle = () => {
    navigate('/resume1');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='main-resume2-243'>
      <header class="header43-resume2">
        <h1 class="website-name43-resume2">JobHunt</h1>
        <button class="signup-button-header43-resume2" onClick={handle}>Back</button>
      </header>
      <div class="hole43-resume2">
        <div class="container43-resume2">
          <div class="form-container43-resume2">
            <form action="#" class="form43-resume2">
              <div class="login-text43-resume2">Create your resume</div>
              
              <label>Skills</label>
              <input 
              type="text"
              name="skill1"
              placeholder="Enter Skills" 
              className="input1-43-resume2"
              value={formData.skill1}
              onChange={handleChange} />
              
              <input 
              type="text"
              name="skill2"
              placeholder="Enter Skills" 
              className="input2-43-resume2"
              value={formData.skill2}
              onChange={handleChange} />
              
              <input 
              type="text"
              name="skill3"
              placeholder="Enter Skills" 
              className="input3-43-resume2"
              value={formData.skill3}
              onChange={handleChange} />
              
              <input 
              type="text"
              name="skill4"
              placeholder="Enter Skills" 
              className="input4-43-resume2"
              value={formData.skill4}
              onChange={handleChange}/>
              
              <input 
              type="text"
              name="skill5"
              placeholder="Enter Skills" 
              className="input5-43-resume2"
              value={formData.skill5}
              onChange={handleChange}/>
              
              <button onClick={handleSubmit} class="button43-resume2">Next</button>
            </form>
          </div>
          <div class="login-image43-resume1">
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
  )
}

export default Resume2