import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Template.css';
import img1 from '../../Image/template1.png'
import img2 from '../../Image/template2.png'
// import img1 from "../../Image/avatar-jessica.jpeg";
const Template = () => {
  const navigate = useNavigate();
  const handleClick = (templateId) => {
    navigate(`/resume1?template=${templateId}`);
};
  

const handle=()=>{
  navigate('/home')
}
  return (
    <div className='main-template-243'>
      <header className="header43-template">
        <h1 className="website-name43-template">jobHunt</h1>
        <button className="signup-button-header43-template" onClick={handle}>Back</button>
      </header>
      <h1 className='heading-template-243'>Build Your resume</h1>
      <div className='main-grid-template-243'>
      <div className='c1-template43' >
        <img src={img1} onClick= {() => handleClick('template1')} className='grid-img1-template43' alt='Image1' />
        <p className='grid1-template43'>Basic</p>
      </div>

      <div className='c2-template43'>
        <img src={img2} onClick= {() => handleClick('template2')} className='grid-img2-template43' alt='Image2' />
        <p className='grid2-template43'>Classic</p>
      </div>

      <div className='c3-template43'>
        <img src={img2} onClick= {() => handleClick('template1')} className='grid-img3-template43' alt='Image2' />
        <p className='grid3-template43'>Classic</p>
      </div>
      </div>
    </div>
  ); 
}

export default Template;