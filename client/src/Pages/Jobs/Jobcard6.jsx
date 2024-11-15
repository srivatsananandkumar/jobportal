import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Jobcard1.css';
import axios from 'axios';
import deloitte from '../../Image/deloitte.svg';

const Jobcard6 = () => {
  const [modal, setModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [contact, setContact] = useState('');
  const [optionalContact, setOptionalContact] = useState('');

  const navigate = useNavigate();

  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:3000/upload', formData)
      .then(() => console.log('File uploaded successfully'))
      .catch((error) => console.log(error));
  };

  const handleSaveClick = () => {
    const job = {
      id: Date.now(),
      company: 'Deloitte',
      image: deloitte, // You can add an image URL here if needed
      role: 'Auditor',
      location: 'Delhi / NCR, Bangalore/Bengaluru, Hyderabad/Secunderabad, Chennai, Pune, Kolkata, Ahmedabad, Mumbai',
      contact: {
        mobile: '+91 8889888989',
        email: 'deloitte@gmail.com',
        lan: '083 083 083',
      },
      type: 'Full-Time',
    };

    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    savedJobs.push(job);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));

    setSaved(true);  // Set job as saved
    setModalMessage('Job Saved!');
    setModalIsOpen(true);
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
    
    setModal(false);
    navigate('/jobs');
  };

  const toggleApplyModal = () => {
    setModal(!modal);
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
            <img src={deloitte} alt="Deloitte Logo" />
            <h2>Deloitte</h2>
            <p>Auditor</p>
          </div>
          <hr className="divider-43" />
          <div className="detail-desc-43">
            <div className="about-43">
              <h4>About Company</h4>
              <p>
                Deloitte is a global professional services firm known for its expertise in audit, consulting, tax, and advisory services. Deloitte is recognized for its commitment to driving business transformation through cutting-edge strategies and technologies.
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
              {saved ? 'Job Saved' : 'Save Job'}
            </button>
          </div>
        </div>

        {modalIsOpen && (
          <div className="modal">
            <h2>{modalMessage}</h2>
            <button onClick={closeModal}>Close</button>
          </div>
        )}

        {modal && (
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
    </div>
  );
};

export default Jobcard6;
