import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import appleimage from '../../Image/icons8-apple.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Jobcard1.css';

const Jobcard4 = () => {
  const [modal, setModal] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      company: 'Apple',
      image: appleimage,
      role: 'Data Science',
      location: 'Delhi / NCR, Bangalore/Bengaluru, Hyderabad/Secunderabad, Chennai, Pune, Kolkata, Ahmedabad, Mumbai',
      contact: {
        mobile: '+91 8889888989',
        email: 'apple@gmail.com',
        lan: '083 083 083',
      },
      type: 'Full-Time',
      date: new Date(),
    };

    const updatedSavedJobs = [...savedJobs, job];
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));

    setModalMessage('Job Saved!');
    setModalIsOpen(true);
  };

  const upload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3000/upload', formData);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !file || !contact) {
      alert('Please fill out all required fields.');
      return;
    }

    await upload();
    alert('Job Application Submitted Successfully!');
    console.log('Job Applied.');
    setModal(false);
    navigate('/jobs');
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/sj');
  };

  return (
    <div>
      <div className='new-container-43'>
        <div className='detail-43'>
          <button onClick={() => navigate('/jobs')} className='close-detail-43' style={{ background: 'none', border: 'none' }}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="deatil-header-43">
            <img src={appleimage} alt="Apple Logo" />
            <h2>Apple</h2>
            <p>Data Science</p>
          </div>
          <hr className="divider-43" />
          <div className="detail-desc-43">
            <div className="about-43">
              <h4>About Company</h4>
              <p>
                Apple Inc. is a multinational technology company renowned for designing and manufacturing consumer electronics,
                software, and online services, including the iPhone, Mac computers, and the App Store.
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
          <hr className='divider-43' />
          <div className='detail-btn-43'>
            <button className='btn-apply-43' onClick={toggleModal}>Apply Now</button>
            <button className='btn-save-43' onClick={handleSaveClick}>Save Job</button>
          </div>
        </div>

        {modalIsOpen && (
          <div className='modal'>
            <h2>{modalMessage}</h2>
            <button onClick={closeModal}>Close</button>
          </div>
        )}

        {modal && (
          <div className='modal-popup-43'>
            <div className='overlay-pop-up-43' onClick={toggleModal}></div>
            <div className='modal-content-popup-43'>
              <h2>Job Application</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Resume</label>
                <input
                  type='file'
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
                <input
                  type='text'
                  placeholder='Contact'
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
                <input
                  type='text'
                  placeholder='Contact (optional)'
                  value={optionalContact}
                  onChange={(e) => setOptionalContact(e.target.value)}
                />
                <button type='submit' className='btn-apply-43'>Apply Now</button>
              </form>
            </div>
          </div>
        )}

        <div className='content-job-43'>
          <h1>Job Description</h1>
          <p>
            Good knowledge in Java, C, C++ is mandatory. Strong knowledge in OOPs concepts, J2EE, HTML, CSS, SQL. Logical and
            analytical thinking towards any programming language.
          </p>
          <p>
            <span>Location:</span> Delhi / NCR, Bangalore/Bengaluru, Hyderabad/Secunderabad, Chennai, Pune, Kolkata, Ahmedabad, Mumbai
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jobcard4;
