import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './Icard1.css';
import intelimage from "../../Image/intel.svg";

Modal.setAppElement('#root');

const Icard4 = () => {
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
      id: Date.now(), // Unique ID for each job
      company: 'Intel',
      image: intelimage,

      role: 'Data Science',
      location: 'Delhi / NCR, Bangalore/Bengaluru, Hyderabad/Secunderabad, Chennai, Pune, Kolkata, Ahmedabad, Mumbai',
      contact: {
        mobile: '+91 8889888989',
        email: 'intel@gmail.com',
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
    navigate('/sj'); // Navigate to SavedJobs page after closing the modal
  };

  return (
    <div>
      <div className='new-container-25'>
        <div className="detail-25">
          <NavLink to="/Intern">
            <FontAwesomeIcon icon={faTimes} className="close-detail-25" />
          </NavLink>
          <div className="detail-header-25">
            <img src={intelimage} alt="Intel Logo" />
            <h2>Intel</h2>
            <p>Data Science</p>
          </div>
          <hr className="divider-25" />
          <div className="detail-desc-25">
            <div className="about-25">
              <h4>About Company</h4>
              <p>Intel Corporation is a multinational technology company renowned for designing and manufacturing consumer electronics, software, and online services.</p>
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
          <p>In the role of Data Engineer at Intel, you will be responsible for designing and implementing robust data pipelines and systems that support Intel's vast array of computing technologies. Intel, a pioneer in semiconductor manufacturing and technology solutions, offers a stimulating work environment where data engineering plays a crucial role in advancing next-generation technologies and driving innovation across various sectors.</p>
          <br />
          <p className='new-contact-google-25'>Contact us:</p>
          <p><span>Mobile:</span> +91 8889888989</p>
          <p><span>Email:</span> intel@gmail.com</p>
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

export default Icard4;