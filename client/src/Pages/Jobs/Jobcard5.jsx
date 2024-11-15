import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import amazonimage from '../../Image/icons8-amazon.svg';
import { useNavigate } from 'react-router-dom';
import './Jobcard1.css';
import axios from 'axios';

const Jobcard5 = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [applyModal, setApplyModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [contact, setContact] = useState('');
  const [optionalContact, setOptionalContact] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setSavedJobs(jobs);
  }, []);

  const handleSaveClick = () => {
    const job = {
      id: Date.now(),
      company: 'Amazon',
      image: amazonimage,
      role: 'Data Science',
      location: 'Delhi / NCR, Bangalore/Bengaluru, Hyderabad/Secunderabad, Chennai, Pune, Kolkata, Ahmedabad, Mumbai',
      contact: {
        mobile: '+91 8889888989',
        email: 'amazon@gmail.com',
        lan: '083 083 083',
      },
      type: 'Full-Time',
    };

    const updatedSavedJobs = [...savedJobs, job];
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));

    setModalMessage('Job Saved!');
    setModalIsOpen(true);
  };

  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:3000/upload', formData)
      .then(() => console.log('File uploaded successfully'))
      .catch((error) => console.log(error));
  };

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

  const toggleApplyModal = () => {
    setApplyModal(!applyModal);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/sj');
  };

  return (
    <div>
      <div className="new-container-43">
        <div className="detail-43">
          <button
            onClick={() => navigate('/jobs')}
            className="close-detail-43"
            style={{ background: 'none', border: 'none' }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="detail-header-43">
            <img src={amazonimage} alt="Amazon Logo" />
            <h2>Amazon</h2>
            <p>Data Science</p>
          </div>
          <hr className="divider-43" />
          <div className="detail-desc-43">
            <div className="about-43">
              <h4>About Company</h4>
              <p>
                Amazon is a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.
              </p>
            </div>
            <hr className="divider-43" />
            <div className="qualification-43">
              <h4>Qualification</h4>
              <ul>
                <li><span>UG:</span> BCA in Any Specialization, B.Sc in Any Specialization, B.Tech/B.E. in Any Specialization</li>
                <li><span>PG:</span> MS/M.Sc(Science) in Any Specialization, MCA in Any Specialization</li>
                <li><span>Doctorate:</span> Doctorate Not Required</li>
              </ul>
            </div>
          </div>
          <hr className="divider-43" />
          <div className="detail-btn-43">
            <button className="btn-apply-43" onClick={toggleApplyModal}>
              Apply Now
            </button>
            <button className="btn-save-43" onClick={handleSaveClick}>
              Save Job
            </button>
          </div>
        </div>

        <div className="content-job-43">
          <h1>Job Description</h1>
          <p>Good knowledge in Java, C, C++ is mandatory...</p>
          <p><span>Location:</span> Delhi / NCR, Bangalore/Bengaluru...</p>
          <p className="new-contact-google-43">Contact us:</p>
          <p><span>Mobile:</span> +91 8889888989</p>
          <p><span>Email:</span> amazon@gmail.com</p>
          <p><span>Lan:</span> 083 083 083</p>
        </div>
      </div>

      {modalIsOpen && (
        <div className="modal">
          <h2>{modalMessage}</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      )}

      {applyModal && (
        <div className="modal-popup-43">
          <div className="overlay-pop-up-43" onClick={toggleApplyModal}></div>
          <div className="modal-content-popup-43">
            <h2>Job Application</h2>
            <button
              onClick={toggleApplyModal}
              className="close-detail-43"
              style={{ background: 'none', border: 'none' }}
            >
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
              <button type="submit" className="btn-apply-43">
                Apply Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobcard5;
