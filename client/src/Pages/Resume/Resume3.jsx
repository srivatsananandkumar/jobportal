
// Resume3.js
import React, { useState } from 'react';
import './Resume3.css'; // Update CSS file import accordingly
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Resume3 = () => {
  const [formData, setFormData] = useState({
     degree1:"",
     sYear1:"",
     eYear1:"",
     university1:"",
     degree2:"",
     sYear2:"",
     eYear2:"",
     university2:"",
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
     const response = await axios.post("http://localhost:3000/newapi/resume3", { ...formData,id: resumeId });

     if (response.status === 200) {
      navigate(`/resume4?template=${templateId}`, { state: { resumeId } });
    } else {
      console.error('Unexpected response status:', response.status);
    }
  } catch (err) {
    console.error('Error:', err.message);
    // Optionally show an error message to the user
  }
 };

 const handle = () => {
   navigate('/resume2');
 };

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };


  return (
    <div className='main-resume3-243'>
      <header className="header43-resume3">
        <h1 className="website-name43-resume3">jobHunt</h1>
        <button className="signup-button-header43-resume3" onClick={handle}>Back</button>
      </header>
      <div className="hole43-resume3">
        <div className="container43-resume3">
          <div className="form-container43-resume3">
            <form action="#" className="form43-resume3">
              <div className="login-text43-resume3">Create your resume</div>

              <label className='resume3-label-243'>Education1</label>
              <input
                type="text"
                name="degree1"
                placeholder="Degree"
                className="input1-43-resume3"
                value={formData.degree1}
                onChange={handleChange}
              />

              <input
                type="text"
                name="sYear1"
                placeholder="Starting Year"
                className="input1-43-resume3"
                value={formData.sYear1}
                onChange={handleChange}
              />

              <input
                type="text"
                name="eYear1"
                placeholder="Endinging Year"
                className="input1-43-resume3"
                value={formData.eYear1}
                onChange={handleChange}
              />

              <input
                type="text"
                name="university1"
                placeholder="University"
                className="input1-43-resume3"
                value={formData.university1}
                onChange={handleChange}
              />

              <label className='resume3-label-243'>Education2</label>
              <input
                type="text"
                 name="degree2"
                placeholder="Degree"
                className="input1-43-resume3"
                value={formData.degree2}
                onChange={handleChange}
              />

              <input
                type="text"
                name="sYear2"
                placeholder="Starting Year"
                className="input1-43-resume3"
                value={formData.sYear2}
                onChange={handleChange}
              />

              <input
                type="text"
                name="eYear2"
                placeholder="Endinging Year"
                className="input1-43-resume3"
                value={formData.eYear2}
                onChange={handleChange}
              />

              <input
                type="text"
                name="university2"
                placeholder="University"
                className="input1-43-resume3"
                value={formData.university2}
                onChange={handleChange}
              />

              

              <button onClick={handleSubmit} className="button43-resume3">
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

export default Resume3;