import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import myimage from "../../Image/avatar-jessica.jpeg";
import { NavLink } from "react-router-dom";

import googleimage from '../../Image/icons8-google.svg';
import microsoftimage from '../../Image/icons8-microsoft.svg';
import youtubeimage from '../../Image/icons8-youtube.svg';
import appleimage from '../../Image/icons8-apple.svg';
import amazonimage from '../../Image/icons8-amazon.svg';
import samsungimage from '../../Image/icons8-samsung.svg';
import metaimage from '../../Image/icons8-meta.svg';
import nvidiaimage from '../../Image/icons8-nvidia.svg';
import intelimage from '../../Image/intel.svg';
import axios from 'axios';
function App() {
 const [auth, setAuth] = useState(false);
 const [messages, setMessages] = useState('');
 const [name, setName] = useState('');
 const [dropdownVisible, setDropdownVisible] = useState(false); 
 const [image, setImage] = useState();

 axios.defaults.withCredentials = true;

  
 useEffect(() => {
  axios.get('http://localhost:3000/getimage')
  .then(res => {
    setImage(res.data[res.data.length - 1].image); 
    console.log("Fetched data" ,res.data[0].image);
  })
  .catch(err => console.log(err))
 
}, [])
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth");

      if (response.data.Status === "Success") {
        setAuth(true)
        setName(response.data.name);
        
      } else {
        setAuth(false)
        setMessages(response.data.Error);
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  fetchData();
}, []);

const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};

const dropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


const handleLogout =  () => {
  axios.get("http://localhost:3000/api/logout")
  .then(res => {
    location.reload(true);
  }).catch(err => console.log(err));
}

  return (
    <div className="App">
      <header className="header">
        <NavLink to="/services">
        <div className="logo-home-243">Job<span>Hunt</span></div></NavLink>
        <nav>
          <ul>
            <li><NavLink to="/jobs">Jobs</NavLink></li>
            <li><NavLink to="/intern">Internship</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><a href="/Resume">Resume</a></li>
          </ul>
        </nav>
        {auth ? (
          <div className="profile-container" ref={dropdownRef}>
            <img 
              src={`http://localhost:3000/profileimages/${image}`} 
              className="profile-image" 
              alt="profile" 
              onClick={toggleDropdown}
            />
            {/* <img
              src={myimage}
              alt="Profile"
              className="profile-image"
              onClick={toggleDropdown}
            /> */}
            {dropdownVisible && (
              <div className="profile-dropdown-menu">
                <NavLink to="/profile" className="profile-dropdown-item profile-link1">View Profile</NavLink>
                <button className="profile-dropdown-item profile-button1" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          
          <div className="auth-buttons">
            <h3>{messages}</h3>
          <NavLink to="/login"><button>Login</button></NavLink>
          
        </div>
        )}
      </header>
      <main>
        <section className="hero">
          <div className="tagline"># No. 1 Job Website</div>
          <h1>Search, Apply & Get Your <span>Dream Jobs</span></h1>
          <br></br>
          <p>Discover the easiest way to find your ideal job with our comprehensive job search platform. Whether you're looking for your first role, a career change, or the next step in your professional journey, our website connects you with thousands of job opportunities across various industries. With user-friendly features, personalized job recommendations, and expert career advice, we're here to support you every step of the way to achieving your career goals.</p>
          
        </section>
        <section className="job-openings">
          <h2>Top <span>Companies</span></h2>
          <br></br>
          <div className="job-list">
            <div className="job-card">
              <img src={googleimage}></img>
              <p>Google is your gateway to information, helping you find answers, discover new ideas, and connect with the world quickly and efficiently. From search results to maps and more, Google makes accessing the information you need simple and intuitive.</p>
            </div>
            <div className="job-card">
            <img src={microsoftimage}></img>
            <p>Microsoft provides cutting-edge technology solutions to enhance productivity. From Windows and Office to cloud services and AI, Microsoft delivers powerful tools and platforms that empower individuals and organizations to achieve their goals.</p>
            </div>
            <div className="job-card">
            <img src={youtubeimage}></img>
            <p>YouTube is the go-to platform for discovering and sharing videos on any topic. Whether you’re interested in entertainment, education, or personal vlogs, YouTube offers a vast array of content that connects you with creators and viewers from around the globe.</p>

            </div>
            <div className="job-card">
            <img src={appleimage}></img>
            <p>Apple is renowned for its innovative technology and sleek design, offering a range of products from iPhones and Macs to wearables and services. Apple continues to set the standard for modern computing and connectivity.</p>
            </div>
            <div className="job-card">
            <img src={amazonimage}></img>
            <p>Amazon is the world's largest online retailer, offering everything from essentials to unique finds. With fast shipping, extensive product selections, and services like Amazon Prime, shopping with Amazon is designed to be simple, efficient, and enjoyable.</p>
            </div>
            <div className="job-card">
            <img src={samsungimage}></img>
            <p>Samsung is a global leader in technology, offering a wide range of products from smartphones and tablets to appliances and displays.Samsung continues to push the boundaries of technology, delivering advanced solutions that enhance daily life.</p>

            </div>
            <div className="job-card">
            <img src={metaimage}></img>
            <p>Meta is at the forefront of social connectivity and technologies. With a focus on virtual and augmented reality, Meta is the future of communication and entertainment, creating innovative experiences that connect people in new and exciting ways.</p>
            </div>
            <div className="job-card">
            <img src={nvidiaimage}></img>
            <p>NVIDIA is a pioneer in graphics processing technology, known for its powerful GPUs and AI solutions. From gaming and professional visualization to AI and deep learning,It’s cutting-edge technology drives performance and innovation across various industries.</p>
            </div>
          </div>
        </section>
        <NavLink to="/jobs">
          <button className='home-button-new-43'>Explore Jobs</button>
        </NavLink>
      </main>
    </div>
  );
}

export default App;
