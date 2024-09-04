import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faHouse, faBookmark, faNewspaper, faCog, faBars, faSearch,
  faMapMarkerAlt, faHourglassHalf, faUsers, faClock,
  faChartLine, faSignOutAlt,
  faSuitcaseMedical,faSuitcase
} from '@fortawesome/free-solid-svg-icons';
import './Internships.css';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import myimage from "../../Image/avatar-jessica.jpeg";

const Internships = () => {

  const [cardData, setCardData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobType, setJobType] = useState("");
  const [noJobsFound, setNoJobsFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/intern'); 
        setCardData(response.data); 
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let data = cardData;

    if (searchQuery) {
      data = data.filter(f => 
        f.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.divisions.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (jobType) {
      data = data.filter(f => f.type === jobType);
    }

    setFilteredData(data);
    setNoJobsFound(data.length === 0);
  }, [searchQuery, cardData, jobType]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  return (
    <div className="body-25">
      <div className="sidebar-25">
        <h1 className="logo-25">JobHunt</h1>
        <div className="menus-25">
          <NavLink to="/home"><FontAwesomeIcon icon={faHouse} className="fa-icon-25" />Home</NavLink>
          <NavLink to="/dashboard"><FontAwesomeIcon icon={faNewspaper} className="fa-icon-25" />Dashboard</NavLink>
          <NavLink to="/jobs"><FontAwesomeIcon icon={faSuitcase} className="fa-icon-25" />Job</NavLink>
          <NavLink to="/sj"><FontAwesomeIcon icon={faBookmark} className="fa-icon-25" />Saved Jobs</NavLink>
          <NavLink to="#"><FontAwesomeIcon icon={faNewspaper} className="fa-icon-25" />Resume</NavLink>
          {/* <NavLink to="/setting"><FontAwesomeIcon icon={faCog} className="fa-icon-25" />Setting</NavLink> */}
          <NavLink to="/" className="logout-jobs-25"><FontAwesomeIcon icon={faSignOutAlt} className="fa-icon-25"/><span className="text"> Logout</span></NavLink>
        </div>
        <NavLink to="/profile">
          <div className="profile-25">
            <img className="profile-img-25" src={myimage} alt="Profile" />
            <div className="profile-name-25">
              <h4>Jessica Halle</h4>
              <p>Data Science</p>
            </div>
          </div>
        </NavLink>
      </div>

      <div className="main-25">
        <div className="main-header-25">
          <FontAwesomeIcon icon={faBars} className="menu-bar-25" />
          <div className="search-25">
            <input 
              type="text" 
              className="text-new-25" 
              placeholder="Search Internship here..." 
              value={searchQuery} 
              onChange={handleSearch} 
            />
            <button className="btn-search-25">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        <div className="sort-25">
          <div className="sort-list-25">
            <select onChange={handleJobTypeChange} value={jobType}>
              <option value="">Job Type</option>
              <option value="Full-time">Full Time</option>
              <option value="Part-time">Part Time</option>
            </select>
          </div>
        </div>

        <div className="wrapper-25">
          {noJobsFound ? (
            <p>No internships found matching your criteria.</p>
          ) : (
            filteredData.map((card, index) => (
              <NavLink to={card.link} key={index}>
                <div className={`card-25 ${card.bgColor}`}>
                  <div className="card-left-25 yellow-bg-25">
                     <img src={card.image} alt={card.company} />
                  </div>
                  <div className="card-center-25">
                    <h3>{card.company}</h3>
                    <p className="card-detail-25">{card.position}</p>
                    <p className="card-loc-25">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      {card.location}
                    </p>
                    <div className="card-sub-25">
                      <p><FontAwesomeIcon icon={faClock} className="icon-container-25" /> {card.time}</p>
                      <p><FontAwesomeIcon icon={faHourglassHalf} /> {card.type}</p>
                      <p><FontAwesomeIcon icon={faUsers} /> {card.applicants} Applicants</p>
                    </div>
                  </div>
                  <div className="card-right-25">
                    <div className="card-tag-25">
                      <h5>Divisions</h5>
                      <a href="#">{card.divisions}</a>
                    </div>
                    <div className="card-salary-25">
                      <p><b>{card.salary}</b> <span>/ month</span></p>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Internships;
