
// Resume5.js
import React, { useState } from 'react';
import './Resume5.css'; // Update CSS file import accordingly
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Resume5 = () => {
  const [formData, setFormData] = useState({
    company1:"",
    role1:"",
    duration1:"",
    company2:"",
    role2:"",
    duration2:"",
     
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
     const response = await axios.post("http://localhost:3000/newapi/resume5", { ...formData,id: resumeId });

     if (response.status === 200) {
      navigate(`/template/${templateId}`, { state: { resumeId } });
    } else {
      console.error('Unexpected response status:', response.status);
    }
  } catch (err) {
    console.error('Error:', err.message);
    // Optionally show an error message to the user
  }
 };

 const handle = () => {
   navigate('/resume4');
 };

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };


  return (
    <div className='main-resume5-243'>
      <header className="header43-resume5">
        <h1 className="website-name43-resume5">JobSpark</h1>
        <button className="signup-button-header43-resume5" onClick={handle}>Back</button>
      </header>
      <div className="hole43-resume5">
        <div className="container43-resume5">
          <div className="form-container43-resume5">
            <form action="#" className="form43-resume5">
              <div className="login-text43-resume5">Create your resume</div>

              {/* Company 1 Input */}
              <div className="input-container">
                <label htmlFor="company1">Company 1: </label>
                <input
                  type="text"
                  name="company1"
                  id="company1"
                  placeholder="Enter Company 1 Details"
                  className="input1-43-resume5"
                  value={formData.company1}
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                <label htmlFor="role1">Role 1: </label><br></br>
                <input
                  type="text"
                  name="role1"
                  id="role1"
                  placeholder="Enter Role 1"
                  className="input2-43-resume5"
                  value={formData.role1}
                  onChange={handleChange}
                  
                />
              </div>
              <div className="input-container">
                <label htmlFor="duration1">Duration 1: </label>
                <input
                  type="text"
                  id="duration1"
                  name="duration1"
                  placeholder="Enter Duration 1"
                  className="input3-43-resume5"
                  value={formData.duration1}
                  onChange={handleChange}
                />
              </div>

              {/* Company 2 Input */}
              <div className="input-container">
                <label htmlFor="company2">Company 2: </label>
                <input
                  type="text"
                  id="company2"
                  name="company2"
                  placeholder="Enter Company 2 Details"
                  className="input4-43-resume5"
                  value={formData.company2}
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                <label htmlFor="role2">Role 2: </label><br></br>
                <input
                  type="text"
                  id="role2"
                  name="role2"
                  placeholder="Enter Role 2"
                  className="input5-43-resume5"
                  value={formData.role2}
                  onChange={handleChange}
                  
                />
              </div>
              <div className="input-container">
                <label htmlFor="duration2">Duration 2: </label>
                <input
                  type="text"
                  id="duration2"
                  name="duration2"
                  placeholder="Enter Duration 2"
                  className="input6-43-resume5"
                  value={formData.duration2}
                  onChange={handleChange}
                />
              </div>

              <button onClick={handleSubmit} className="button43-resume5">
                Generate Resume
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

export default Resume5;