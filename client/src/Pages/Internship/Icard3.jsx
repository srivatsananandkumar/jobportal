import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './Icard1.css';
import samsungimage from "../../Image/icons8-samsung.svg";

Modal.setAppElement('#root');

const Icard3 = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setSavedJobs(jobs);
  }, []);

  const handleSave = () => {
    const job = {
      id: Date.now(), // Unique ID for each job
      company: 'Samsung',
      image: samsungimage,

      role: 'Product Data Analyst',
      location: 'Delhi / NCR, Bangalore/Bengaluru, Hyderabad/Secunderabad, Chennai, Pune, Kolkata, Ahmedabad, Mumbai',
      contact: {
        mobile: '+91 8889888989',
        email: 'samsung@gmail.com',
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

  const handleApply = () => {
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
            <img src={samsungimage} alt="Samsung" />
            <h2>Samsung</h2>
            <p>Product Data Analyst</p>
          </div>
          <hr className="divider-25" />
          <div className="detail-desc-25">
            <div className="about-25">
              <h4>About Company</h4>
              <p>Samsung is a global leader in technology, offering a wide range of products including electronics, appliances, and more. Known for its innovative technology and design.</p>
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
              <button className="btn-apply-25" onClick={handleApply}>Apply Now</button>
            </NavLink>
            <NavLink to="/Intern">
              <button className="btn-save-25" onClick={handleSave}>Save Now</button>
            </NavLink>
          </div>
        </div>

        <div className="content-job-25">
          <h1>Internship description</h1>
          <p>Good knowledge in Java, C, C++ is mandatory. Strong knowledge in OOPs concepts, J2EE, HTML, CSS, SQL. Logical and analytical thinking towards any programming language. Should have designed at least one project module using object-oriented analysis and design techniques. Sound knowledge of modern software architecture and development techniques. Should be a self-initiator and interested in learning new technologies. Good analytical and logical skills. Excelling problem-solving skills with an out-of-the-box approach.</p>
          <br />
          <p><span>Location:</span> Delhi / NCR, Bangalore/Bengaluru, Hyderabad/Secunderabad, Chennai, Pune, Kolkata, Ahmedabad, Mumbai</p>
          <br /><br />
          <p className='new-contact-google-25'>Contact us:</p>
          <p><span>Mobile:</span> +91 8889888989</p>
          <p><span>Email:</span> samsung@gmail.com</p>
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

export default Icard3;