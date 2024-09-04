
// Resume4.js
import React, { useState } from 'react';
import './Resume4.css'; // Update CSS file import accordingly
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Resume4 = () => {
  const [formData, setFormData] = useState({
    about1:"",
    about2:"",
     
 });

 const location2 = useLocation();

  const templateId = new URLSearchParams(location2.search).get('template');

 const location = useLocation();
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
     const response = await axios.post("http://localhost:3000/newapi/resume4", { ...formData,id: resumeId });

    
     if (response.status === 200) {
      navigate(`/resume5?template=${templateId}`, { state: { resumeId } });
    } else {
      console.error('Unexpected response status:', response.status);
    }
  } catch (err) {
    console.error('Error:', err.message);
    // Optionally show an error message to the user
  }
 };

 const handle = () => {
   navigate('/resume3');
 };

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

  return (
    <div className='main-resume4-243'>
      <header className="header43-resume4">
        <h1 className="website-name43-resume4">jobSpark</h1>
        <button className="signup-button-header43-resume4" onClick={handle}>Back</button>
      </header>
      <div className="hole43-resume4">
        <div className="container43-resume4">
          <div className="form-container43-resume4">
            <form action="#" className="form43-resume4">
              <div className="login-text43-resume4">Create your resume</div>

              <label>How would you describe yourself?</label>
              <textarea
                placeholder="Say about yourself"
                className="input1-43-resume4"
                name="about1"
                value={formData.about1}
                onChange={handleChange}
              />

              <textarea
                placeholder="Say about yourself"
                className="input1-43-resume4"
                name="about2"
                value={formData.about2}
                onChange={handleChange}
              />

              <button onClick={handleSubmit} className="button43-resume4">
                Next
              </button>
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
  );
};

export default Resume4;