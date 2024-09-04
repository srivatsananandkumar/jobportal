import React, { useRef, useState, useEffect } from 'react';
import './Template2.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import {useLocation  } from 'react-router-dom';
import { SketchPicker } from 'react-color';

const Template2 = () => {

    const [resume, setResume] = useState(null);
    const [showButtons, setShowButtons] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [textColor, setTextColor] = useState('#fff');
    const location = useLocation();
   const resumeId = location.state ? location.state.resumeId : null;

   
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
  

    const pdfRef = useRef();
    const downloadPdf = () => {
      const input = pdfRef.current;
      html2canvas(input).then((canvas) => { 
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4', true); 
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
  

//   const handleButtonClick = (color) => {
//     setSelectedColor(color);
//   };

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
    <div>
        
    <div className="body-template2-43">
        <div className ="container-template2-43" ref={pdfRef}  >
          <div className="left-template2-43"  style={{ backgroundColor: selectedColor, color: textColor  }}>
            <div className="profileText-template2-43 " >
                <h2>{resume.firstname} {resume.lastname}<br></br><span>{resume.title}</span></h2>
            </div>

            <div className="info-template2-43">
                <h3 className="title-template2-43">Contact Info</h3>

                <ul>
                    <li>
                        <span className="icon-template-43"></span>
                        <span className="text-template-43">Name:{resume.firstname} {resume.lastname}</span>
                    </li>

                    <li>
                        <span className="icon-template-43"></span>
                        
                    </li>

                    <li>
                        <span className="icon-template-43"></span>
                        <span className="text-template-43">Email: {resume.email}</span>
                    </li>

                    <li>
                        <span className="icon-template-43"></span>
                        <span className="text-template-43">Linkedin: {resume.linkedin}</span>
                    </li>

                    <li>
                        <span className="icon-template-43"></span>
                        <span className="text-template-43">GitHub: {resume.linkedin}</span>
                    </li>

                </ul>
            </div>

            <div className="info-template2-43 education-template2-43">
                <h3 className="title-template2-43">Education</h3>
                <ul>
                    <li><h4>{resume.degree1}</h4></li>
                    <li><h4>{resume.sYear1}</h4></li>
                    <li><h4>{resume.eYear1}</h4></li>
                    <li><h4>{resume.university1}</h4></li>
                    <li><h4>{resume.degree2}</h4></li>
                    <li><h4>{resume.sYear2}</h4></li>
                    <li><h4>{resume.eYear2}</h4></li>
                    <li><h4>{resume.university2}</h4></li>
 
                </ul>
            </div>

            {/* <div class="info-template2-43 language-template2-43">
                <h3 class="title-template2-43">Languages</h3>
                <ul>
                    <li>
                        <span class="text-template2-43">English</span>
                       
                    </li>

                    <li>
                        <span class="text-template2-43">Hindi</span>
                        
                    </li>
                </ul>
            </div> */}
          </div>
          <div className="right-template2-43">
            <div className="about-template2-43">
                <h2 className="title2-template2-43" style={{ color: selectedColor }}>Profile</h2>
                <p>{resume.about1}</p>
            <p>{resume.about2}</p>
            </div>

            <div className="about-template2-43">
            <h2 className="title2-template2-43" style={{ color: selectedColor }}>Experience</h2>
            <div className="box-template2-43">
                <div className="year-company-template2-43">
                    
                    <h5>{resume.company1}</h5>
                    <h5>{resume.duration1}  years</h5>
                </div>
                
                <div className="text-template2-43">
                    <h4>{resume.role1}</h4>
                    
                </div>
            </div>

            <div className="box-template2-43">
                <div className="year-company-template2-43">
                    
                    <h5>{resume.company2}</h5>
                    <h5>{resume.duration2} years</h5>
                </div>
                
                <div className="text-template2-43">
                    <h4>{resume.role2}</h4>
                    
                </div>
            </div>
            </div>

            <div className="about-tmplate2-43 skills-template2-43">
                <h2 className="title2-template2-43" style={{ color: selectedColor }}>Professional skills</h2>
                <div className="box-template2-43">
                    <h4>{resume.skill1}</h4>
                </div>

                <div className="box-template2-43">
                    <h4>{resume.skill2}</h4>
                </div>

                <div className="box-template2-43">
                    <h4>{resume.skill3}</h4>
                </div>

                <div className="box-template2-43">
                    <h4>{resume.skill4}</h4>
                </div>

                <div className="box-template2-43">
                    <h4>{resume.skill5}</h4>
                </div>

                
            </div>

            
          </div>
        </div>
        <button onClick={downloadPdf} class= "button-download">Download</button>
  
        <button className="button-right-template" onClick={() => setShowButtons(!showButtons)}>Colour</button>
      {showButtons && (
        <div className="hover-buttons-template">
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
    </div>
  )
}

export default Template2