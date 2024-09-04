import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './Icard1.css';
import tcsimage from "../../Image/tcs.svg";

Modal.setAppElement('#root');

const Icard5 = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setSavedJobs(jobs);
  }, []);

  const handClick = () => {
    const job = {
      id: Date.now(),
      company: 'TCS',
      image: tcsimage,

      role: 'Business Analysis',
      location: 'Delhi / NCR, Bangalore/Bengaluru, Hyderabad/Secunderabad, Chennai, Pune, Kolkata, Ahmedabad, Mumbai',
      contact: {
        mobile: '+91 8889888989',
        email: 'tata@gmail.com',
        lan: '083 083 083'
      },
      type: 'Internship'
    };

    const updatedSavedJobs = [...savedJobs, job];
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));

    setModalMessage('Internship Saved!!');
    setModalIsOpen(true);
  };

  const handleClick = () => {
    alert('Internship Applied!!');
    console.log('Internship Applied.');
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/sj');
  };

  return (
    <div>
      <div className='new-container-25'>
        <div className="detail-25">
          <NavLink to="/Intern">
            <FontAwesomeIcon icon={faTimes} className="close-detail-25" />
          </NavLink>
          <div className="detail-header-25">
            <img src={tcsimage} alt="TCS" />
            <h2>TCS</h2>
            <p>Business Analysis</p>
          </div>
          <hr className="divider-25" />
          <div className="detail-desc-25">
            <div className="about-25">
              <h4>About Company</h4>
              <p>Tata Consultancy Services (TCS) is a leading global IT services, consulting, and business solutions organization headquartered in Mumbai, India. As a part of the Tata Group, TCS is renowned for its expertise in providing technology and consulting services across a wide range of industries...</p>
            </div>
            <hr className="divider-25" />
            <div className="qualification-25">
              <h4>Qualification</h4>
              <ul>
                <li><span>UG:</span> BCA in Any Specialization, B.Sc in Any Specialization, B.Tech/B.E. in Any Specialization</li>
                <li><span>PG:</span> MS/M.Sc(Science) in Any Specialization, MCA in Any Specialization</li>
                <li><span>Doctorate:</span> Doctorate Not Required</li>
              </ul>
              <br /><br />
            </div>
          </div>
          <hr className="divider-25" />
          <div className="detail-btn-25">
            <NavLink to="/Intern">
              <button className="btn-apply-25" onClick={handleClick}>Apply Now</button>
            </NavLink>
            <NavLink to="/Intern">
              <button className="btn-save-25" onClick={handClick}>Save Now</button>
            </NavLink>
          </div>
        </div>

        <div className="content-job-25">
          <h1>Internship description</h1>
          <p>At Tata Consultancy Services (TCS), the Business Intelligence Analyst role involves analyzing complex business data to provide strategic insights that drive business growth...</p><br />
          <p><span>Location:</span> Delhi / NCR, Bangalore/Bengaluru, Hyderabad/Secunderabad, Chennai, Pune, Kolkata, Ahmedabad, Mumbai</p>
          <br /><br />
          <p className='new-contact-google-25'>Contact us:</p>
          <p><span>Mobile:</span> +91 8889888989</p>
          <p><span>Email:</span> tata@gmail.com</p>
          <p><span>Lan:</span> 083 083 083</p>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Save Confirmation"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{modalMessage}</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Icard5;