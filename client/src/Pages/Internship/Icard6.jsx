import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import './Icard1.css';
import googleimage from "../../Image/icons8-google.svg";

Modal.setAppElement('#root');

const Icard6 = () => {
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

  const handleSave = () => {
    const job = {
      id: Date.now(),
      company: 'Google',
      image: googleimage,
      role: 'Business Analyst',
      location: 'Mountain View, CA, USA',
      contact: {
        mobile: '+1 650-253-0000',
        email: 'google.jobs@google.com',
        lan: 'N/A',
      },
      type: 'Internship',
    };

    const updatedSavedJobs = [...savedJobs, job];
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));

    setModalMessage('Internship Saved!!');
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
    alert('Internship Applied Successfully!');
    console.log('Internship Applied.');

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
      <div className="new-container-25">
        <div className="detail-25">
          <NavLink to="/Intern">
            <FontAwesomeIcon icon={faTimes} className="close-detail-25" />
          </NavLink>
          <div className="detail-header-25">
            <img src={googleimage} alt="Google" />
            <h2>Google</h2>
            <p>Business Analyst</p>
          </div>
          <hr className="divider-25" />
          <div className="detail-desc-25">
            <div className="about-25">
              <h4>About Company</h4>
              <p>Google is a leading global technology company specializing in internet-related services and products...</p>
            </div>
            <hr className="divider-25" />
            <div className="qualification-25">
              <h4>Qualification</h4>
              <ul>
                <li><span>UG:</span> BCA in Any Specialization, B.Sc in Any Specialization, B.Tech/B.E. in Any Specialization</li>
                <li><span>PG:</span> MS/M.Sc(Science) in Any Specialization, MCA in Any Specialization</li>
                <li><span>Doctorate:</span> Doctorate Not Required</li>
              </ul>
            </div>
          </div>
          <hr className="divider-25" />
          <div className="detail-btn-25">
            <button className="btn-apply-25" onClick={toggleApplyModal}>Apply Now</button>
            <button className="btn-save-25" onClick={handleSave}>Save Now</button>
          </div>
        </div>

        <div className="content-job-25">
          <h1>Internship description</h1>
          <p>As a Business Analyst at Google, you will work closely with cross-functional teams to analyze and improve business processes...</p>
          <br />
          <p className="new-contact-google-25">Contact us:</p>
          <p><span>Mobile:</span> +1 650-253-0000</p>
          <p><span>Email:</span> google.jobs@google.com</p>
          <p><span>Lan:</span> N/A</p>
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

      {applyModal && (
        <div className="modal-popup-25">
          <div className="overlay-pop-up-25" onClick={toggleApplyModal}></div>
          <div className="modal-content-popup-25">
            <h2>Job Application</h2>
            <button
              onClick={toggleApplyModal}
              className="close-detail-25"
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
              <button type="submit" className="btn-apply-25">Apply Now</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Icard6;
