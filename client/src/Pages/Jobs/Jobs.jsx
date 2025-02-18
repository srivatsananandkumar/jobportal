import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHouse, faBookmark, faNewspaper, faCog, faBars, faSearch, faMapMarkerAlt, faCalendarDay, faHourglassHalf, faUsers, faClock, faTimes, faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Jobs.css';
import myimage from "../../Image/avatar-jessica.jpeg";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from 'axios'; 

const Jobs = () => {
  const [cardData, setCardData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobType, setJobType] = useState("");
  const [noJobsFound, setNoJobsFound] = useState(false);

  const [file, setFile] = useState();
  const [image, setImage] = useState();

 
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
        const response = await axios.get('http://localhost:3000/job'); 
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

  const handleLogout =  () => {
    axios.get("http://localhost:3000/api/logout")
    .then(res => {
      location.reload(true);
    }).catch(err => console.log(err));
  }
  return (
    <div>
      <div className="body-43">
        <div className="sidebar-43">
          <NavLink to="/services">
          <h1 className="logo-jobs-43">Job<span>Hunt</span></h1></NavLink>
          <div className="menus-43">
            <NavLink to="/home"><FontAwesomeIcon icon={faHouse} className="fa-icon-43" />Home</NavLink>
            <NavLink to="/dashboard"><FontAwesomeIcon icon={faNewspaper} className="fa-icon-43" />Dashboard</NavLink>
            <NavLink to="/intern"><FontAwesomeIcon icon={faChartLine} className="fa-icon-43" />Internship</NavLink>
            <NavLink to="/sj"><FontAwesomeIcon icon={faBookmark} className="fa-icon-43" />Saved Opportunities</NavLink>
            <NavLink to="/Resume"><FontAwesomeIcon icon={faNewspaper} className="fa-icon-43" />Resume</NavLink>
            {/* <NavLink to="/setting"><FontAwesomeIcon icon={faCog} className="fa-icon-43" />Setting</NavLink> */}
            {/* <NavLink to="/home" className="logout-jobs-43"><FontAwesomeIcon icon={faSignOutAlt}  onClick={handleLogout}className="fa-icon-43"/><span className="text"> Logout</span></NavLink> */}
          </div>


   
            {/* <img 
              src={`http://localhost:3000/profileimages/${image}`} 
              className="profile-img-43" 
              alt="profile" 
            /> */}
       

          <NavLink to="/profile"><div className="profile-43">
          <img 
              src={`http://localhost:3000/profileimages/${image}`} 
              className="profile-img-43" 
              alt="profile" 
            />
            <div className="profile-name-43">
              <h4>Jessica Halle</h4>
              <p>Data Science</p>
            </div>
          </div>
          </NavLink>
        </div>
      </div>

      <div className="main-43">
        <div className="main-header-43">
          <FontAwesomeIcon icon={faBars} className="menu-bar-43" />
          <div className="search-43">
            <input type="text" className="text-new-43" placeholder=" Search job here..." value= {searchQuery} onChange={handleSearch} />
            <button className="btn-search-43"><FontAwesomeIcon icon={faSearch} /></button>
          </div>
        </div>

        {/* <div className="filter-wrapper-43">
          <p>Recommendation</p>
          <div className="filter-43">
            <button className="btn-filter-43">Data Science</button>
            <button className="btn-filter-43">Data Engineer</button>
            <button className="btn-filter-43">Data Analyst</button>
            <button className="btn-filter-43">Data Visualization</button>
            <button className="btn-filter-43">CRM Analyst</button>
          </div>
        </div> */}

        <div className="sort-43">
          
          <div className="sort-list-43">
            <select onChange={handleJobTypeChange} value={jobType}>
              <option value="">Job Type</option>
              <option value="Full-time">Full Time</option>
              <option value="Part-time">Part Time</option>
              
            </select>
          </div>
        </div>

        <div className="wrapper-43">
        {noJobsFound ? (
    <p>No jobs found</p>
  ) : (
          filteredData.map((card, index) => (
            <NavLink to={card.link} key={index}>
              <div className="card-43">
                <div className="card-left-43 yellow-bg-43">
                  <img src={card.image} alt={card.company} />
                </div>
                <div className="card-center-43">
                  <h3>{card.company}</h3>
                  <p className="card-detail-43">{card.position}</p>
                  <p className="card-loc-43">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-container-43"/>
                    {card.location}
                  </p>
                  <div className="card-sub-43">
                    <p><FontAwesomeIcon icon={faClock} className="icon-container-43" /> <span>{card.time}</span></p>
                    <p><FontAwesomeIcon icon={faHourglassHalf} className="icon-container-43"/> <span>{card.type}</span></p>
                    <p><FontAwesomeIcon icon={faUsers} className="icon-container-43"/> <span>{card.applicants} Applicants</span></p>
                  </div>
                </div>
                <div className="card-right-43">
                  <div className="card-tag-43">
                    <h5>Divisions</h5>
                    <a href="#">{card.divisions}</a>
                  </div>
                  <div className="card-salary-43">
                    <p><b>{card.salary}</b> <span>/ year</span></p>
                  </div>
                </div>
              </div>
            </NavLink>
          ))
        )}
        </div>
      </div>
    </div>
  )
}

export default Jobs;
