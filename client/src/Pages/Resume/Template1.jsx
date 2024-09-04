import React, { useRef, useState, useEffect } from 'react';
import './Template1.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useLocation  } from 'react-router-dom';
import { SketchPicker } from 'react-color';

const Template1 = () => {

  const [resume, setResume] = useState(null);
  const pdfRef = useRef();
  const [showButtons, setShowButtons] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const location = useLocation();
 const resumeId = location.state ? location.state.resumeId : null;

  // useEffect(() => {
  //   const fetchResume = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/newapi/template/${resumeId}`);
  //       setResume(response.data);
  //     } catch (err) {
  //       console.error('Error fetching resume data:', err);
  //     }
  //   };

  //   if (resumeId) {
  //     fetchResume();
  //   }
  // }, [resumeId]);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        if (!resumeId) {
          console.error('Resume ID is not defined');
          return;
        }
        
        console.log(`Fetching resume data with ID: ${resumeId}`);
        const response = await axios.get(`http://localhost:3000/newapi/template/${resumeId}`);
        console.log('API Response:', response.data);
        
        if (response.data) {
          setResume(response.data);
        } else {
          console.error('No data returned from API');
        }
      } catch (err) {
        console.error('Error fetching resume data:', err);
      }
    };
  
    fetchResume();
  }, [resumeId]);
  

  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('Resume.pdf');
    });
  };

  // const handleButtonClick = (color) => {
  //   setSelectedColor(color);
  // };

  if (!resume) {
    return <div>Loading...</div>;
  }

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleTextColorChange = (color) => {
    setTextColor(color.hex);
  };

  return (
    <div className="body-template1-43">
      <div className="container-template1-43" ref={pdfRef} style={{ backgroundColor: selectedColor, color: textColor }}>
        <div className="header-template-43">
          <h1>{resume.firstname} {resume.lastname}</h1>
          <h3>{resume.title}</h3>
        </div>
        <hr />
        <div className="main-template1-43">
          <div className="left-template1-43">
            <h2>Personal Information</h2>
            <p><strong>First Name: </strong>{resume.firstname}</p>
            <p><strong>Last Name: </strong>{resume.lastname}</p>
            <p><strong>Email: </strong>{resume.email}</p>
            <p><strong>LinkedIn: </strong>{resume.linkedin}</p>
            <p><strong>GitHub: </strong>{resume.github}</p>

            <h2>Skills</h2>
            <ul>
              <li>{resume.skill1}</li>
              <li>{resume.skill2}</li>
              <li>{resume.skill3}</li>
              <li>{resume.skill4}</li>
              <li>{resume.skill5}</li> 
            </ul>

            <h2>Education</h2>
            <p>{resume.degree1}</p>
            <p>{resume.sYear1}</p>
            <p>{resume.eYear1}</p>
            <p>{resume.university1}</p>
            <p>{resume.degree2}</p>
            <p>{resume.sYear2}</p>
            <p>{resume.eYear2}</p>
            <p>{resume.university2}</p>
          </div>
          <div className="right-template1-43">
            <h2>Profile</h2>
            <p>{resume.about1}</p>
            <p>{resume.about2}</p>
            <h2>Work Experience</h2>
            <h3><strong>Company: </strong>{resume.company1}</h3>
            <p><strong>Role:</strong> {resume.role1}</p>
            <p><strong>Duration:</strong> {resume.duration1} years</p><br></br>
            <h3><strong>Company: </strong>{resume.company2}</h3>
            <p><strong>Role:</strong> {resume.role2}</p>
            <p><strong>Duration:</strong> {resume.duration2} years</p>
          </div>
        </div>
      </div>
      <button onClick={downloadPdf} className="button-download">Download</button>
      <button className="button-right" onClick={() => setShowButtons(!showButtons)}>Colour</button>
      {showButtons && (
        <div className="hover-buttons">
          {/* <button className="hover-button-1" onClick={() => handleButtonClick('rgb(255, 255, 90)')}></button>
          <button className="hover-button-2" onClick={() => handleButtonClick('rgb(255, 145, 0)')}></button>
          <button className="hover-button-3" onClick={() => handleButtonClick('#3498db')}></button>
          <button className="hover-button-4" onClick={() => handleButtonClick('rgb(252, 58, 58)')}></button>
          <button className="hover-button-5" onClick={() => handleButtonClick('rgb(4, 226, 4)')}></button>
          <button className="hover-button-6" onClick={() => handleButtonClick('rgb(255, 0, 255)')}></button>
          <button className="hover-button-1" onClick={() => handleButtonClick('rgb(255, 255, 90)')}></button>
          <button className="hover-button-2" onClick={() => handleButtonClick('rgb(255, 145, 0)')}></button>
          <button className="hover-button-3" onClick={() => handleButtonClick('#3498db')}></button>
          <button className="hover-button-4" onClick={() => handleButtonClick('rgb(252, 58, 58)')}></button>
          <button className="hover-button-5" onClick={() => handleButtonClick('rgb(4, 226, 4)')}></button>
          <button className="hover-button-6" onClick={() => handleButtonClick('rgb(255, 0, 255)')}></button> */}
          
          {/* <SketchPicker color={selectedColor} onChange={handleColorChange} /> */}

          <div className="color-picker-template1">
            <h3 className="color-picker-template1-h3">Background Color</h3>
            <div className="color-picker-wrapper">
              <SketchPicker color={selectedColor} onChange={handleColorChange} />
            </div>
          </div>
          <div className="color-picker-template1">
            <h3>Text Color</h3>
            <div className="color-picker-wrapper">
              <SketchPicker color={textColor} onChange={handleTextColorChange} />
            </div>
          </div>
          </div>
        
      
      )}
    </div>
  );
};

export default Template1;
