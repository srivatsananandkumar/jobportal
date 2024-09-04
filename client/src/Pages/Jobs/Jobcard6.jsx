import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faHouse,faBookmark,faNewspaper,faCog,faBars,faSearch,faMapMarkerAlt,faCalendarDay,faHourglassHalf,faUsers,faClock,faTimes,
} from '@fortawesome/free-solid-svg-icons';
// import myimage from '../Image/avatar-jessica.jpeg';
// import googleimage from '../Image/icons8-google.svg';
// import microsoftimage from '../Image/icons8-microsoft.svg';
// import youtubeimage from '../Image/icons8-youtube.svg';
// import appleimage from '../Image/icons8-apple.svg';
// import amazonimage from '../Image/icons8-amazon.svg';
import { useNavigate } from 'react-router-dom';
import './Jobcard1.css';
import axios from 'axios';

const Jobcard6 = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [contact, setContact] = useState('');
  const [optionalContact, setOptionalContact] = useState('');

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

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div className='new-container-43'>
        <div className='detail-43'>
          <button onClick={() => navigate('/jobs')} className='close-detail-43' style={{ background: 'none', border: 'none' }}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className='detail-header-43'>
            <img src="data:image/png;base64,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" alt='Google Logo'></img>
            <h2>Delloite</h2>
            <p>Auditor</p>
          </div>
          <hr className='divider-43' />
          <div className='detail-desc-43'>
            <div className='about-43'>
              <h4>About Company</h4>
              <p>Deloitte is a global professional services firm known for its expertise in audit, consulting, tax, and advisory services. Deloitte is recognized for its commitment to driving business transformation through cutting-edge strategies and technologies.</p>
              {/* <a href="#">Read more</a> */}
            </div>
            <hr className='divider-43' />
            <div className='qualification-43'>
              <h4>Qualification</h4>
              <ul>
                <li>
                  <span>UG:</span> BCA in Any Specialization, B.Sc in Any Specialization, B.Tech/B.E. in Any Specialization
                </li>
                <li>
                  <span>PG:</span> MS/M.Sc(Science) in Any Specialization, MCA in Any Specialization
                </li>
                <li>
                  <span>Doctorate:</span> Doctorate Not Required
                </li>
              </ul>
              <br></br>
              <br></br>
            </div>
          </div>
          <hr className='divider-43' />
          <div className='detail-btn-43'>
            <button className='btn-apply-43' onClick={toggleModal}>
              Apply Now
            </button>
            <button className='btn-save-43'>Save job</button>
          </div>
        </div>
        {modal && (
          <div className='modal-popup-43'>
            <div className='overlay-pop-up-43' onClick={toggleModal}></div>
            <div className='modal-content-popup-43'>
              <p>JOB APPLICATION
              <button onClick={toggleModal} className='close-detail-43-2' style={{ background: 'none', border: 'none' }}>
            <FontAwesomeIcon icon={faTimes} /></button></p>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></input>
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
                <label>Resume</label>
                <input
                  type='file'
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                ></input>
                <input
                  type='text'
                  placeholder='Contact'
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                ></input>
                <input
                  type='text'
                  placeholder='Contact (opt)'
                  value={optionalContact}
                  onChange={(e) => setOptionalContact(e.target.value)}
                ></input>
                <button type='submit' className='btn-apply-43'>
                  Apply Now
                </button>
              </form>
            </div>
          </div>
        )}

        <div className='content-job-43'>
          <h1> Job description</h1>

          <p>
            Good knowledge in Java ,C,C++ is mandatory. Strong knowledge in OOPs concepts, J2EE, HTML, CSS, SQL. Logical and
            analytical thinking towards any programming language. Should have designed at least one project module using object
            oriented analysis and design techniques Sound knowledge of modern software architecture and
            <br></br> development techniques. Should be a self initiator and interested in learning new technologies. Good
            analytical and logical skills. Excelling problem solving skills with an out of the box approach.
          </p>
          <br></br>

          <p>
            <span>Location:</span> Delhi / NCR,Bangalore/Bengaluru,Hyderabad/
            <br></br>Secunderabad,
            <br></br>Chennai,Pune,Kolkata,Ahmedabad,Mumbai
          </p>
          <br></br>
          <br></br>
          <p className='new-contact-google-43'>Contact us</p>

          <p>
            <span>Mobile:</span> +91 8889888989
          </p>
          <p>
            <span>Email:</span> google@gmail.com
          </p>
          <p>
            <span>Lan:</span> 083 083 083
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jobcard6;
