import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import './Icard1.css';
import metaimage from "../../Image/icons8-meta.svg";

Modal.setAppElement('#root');

const Icard2 = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [applyModal, setApplyModal] = useState(false); // For application modal
  const [modalMessage, setModalMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [contact, setContact] = useState('');
  const [optionalContact, setOptionalContact] = useState('');
  const navigate = useNavigate();

  // Load saved jobs from local storage
  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setSavedJobs(jobs);
  }, []);

  // Save job function
  const handleSaveClick = () => {
    const job = {
      id: Date.now(),
      company: 'Meta',
      image: metaimage,
      role: 'Data Science',
      location: 'Delhi / NCR, Bangalore/Bengaluru, Hyderabad/Secunderabad, Chennai, Pune, Kolkata, Ahmedabad, Mumbai',
      contact: {
        mobile: '+91 7779777979',
        email: 'meta@gmail.com',
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

  // File upload function
  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:3000/upload', formData)
      .then((res) => {
        console.log('File uploaded successfully');
      })
      .catch((er) => console.log(er));
  };

  // Form submission function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !file || !contact) {
      alert('Please fill out all required fields.');
      return;
    }
    upload();
    alert('Job Applied Successfully!');
    console.log('Job Applied.');

    setApplyModal(false);
    navigate('/jobs');
  };

  // Toggle apply modal
  const toggleApplyModal = () => {
    setApplyModal(!applyModal);
  };

  // Close save modal and navigate to SavedJobs
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
            <img src={metaimage} alt="Meta" />
            <h2>Meta</h2>
            <p>Data Science</p>
          </div>
          <hr className="divider-25" />
          <div className="detail-desc-25">
            <div className="about-25">
              <h4>About Company</h4>
              <p>Meta Inc. is a global leader in software, services, devices, and solutions. The company is known for its Windows operating system, Office suite, Azure cloud computing, and innovative technologies like AI and gaming.</p>
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
            <button className="btn-apply-25" onClick={toggleApplyModal}>Apply Now</button>
            <button className="btn-save-25" onClick={handleSaveClick}>Save Now</button>
          </div>
        </div>

        <div className="content-job-25">
          <h1>Internship description</h1>
          <p>Good knowledge in Java, C, C++ is mandatory. Strong knowledge in OOPs concepts, J2EE, HTML, CSS, SQL. Logical and analytical thinking towards any programming language...</p><br />
          <p><span>Location:</span> DC / New York, North Carolina/Salem, Chicago</p>
          <br /><br />
          <p className='new-contact-google-25'>Contact us:</p>
          <p><span>Mobile:</span> +91 7779777979</p>
          <p><span>Email:</span> meta@gmail.com</p>
          <p><span>Lan:</span> 083 083 083</p>
        </div>
      </div>

      {/* Modal for saving job */}
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

      {/* Modal for job application */}
      {applyModal && (
        <div className="modal-popup-25">
          <div className="overlay-pop-up-25" onClick={toggleApplyModal}></div>
          <div className="modal-content-popup-25">
            <h2>Job Application</h2>
            <button onClick={toggleApplyModal} className="close-detail-25" style={{ background: 'none', border: 'none' }}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Resume</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              <input
                type="text"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Contact (optional)"
                value={optionalContact}
                onChange={(e) => setOptionalContact(e.target.value)}
              />
              <button type="submit" className="btn-apply-25">Apply Now</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Icard2;
