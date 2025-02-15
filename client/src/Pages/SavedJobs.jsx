import React, { useEffect, useState } from 'react';
import './SavedJobs.css';
import JobCard from './jc1.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faSort, faHouse, faNewspaper, faChartLine, faBookmark, faEnvelope, faCog, faSignOutAlt, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import myimage from '../Image/avatar-jessica.jpeg';
import axios from 'axios';

Modal.setAppElement('#root');

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('date');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedType, setSelectedType] = useState('all');

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
    const jobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setSavedJobs(jobs);
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedJobs((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((jobId) => jobId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteAction = () => {
    openModal();
  };

  const clearSelectedJobs = () => {
    const updatedJobs = savedJobs.filter((job) => !selectedJobs.includes(job.id));
    setSavedJobs(updatedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
    setSelectedJobs([]);
    closeModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOrder(event.target.value);
  };

  const filterJobs = (jobs) => {
    return jobs.filter((job) =>
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType === 'all' || job.type === selectedType)
    );
  };

  const sortJobs = (jobs) => {
    return jobs.sort((a, b) => {
      if (sortOrder === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === 'company') {
        return a.company.localeCompare(b.company);
      }
      return 0;
    });
  };

  const filteredJobs = sortJobs(filterJobs(savedJobs));

  const handleJobClick = (id) => {
    handleCheckboxChange(id);  // Toggle selection when clicking the job container
  };

  return (
    <div className="saved-jobs-container-sj">
      <div className="sidebar-sj">
        <NavLink to="/services">
          <h1 className="logo-sj">Job<span>Hunt</span></h1>
        </NavLink>
        <div className="menus-sj">
          <NavLink to="/home"><FontAwesomeIcon icon={faHouse} className="fa-icon-sj" />Home</NavLink>
          <NavLink to="/dashboard"><FontAwesomeIcon icon={faNewspaper} className="fa-icon-sj" />Dashboard</NavLink>
          <NavLink to="/intern"><FontAwesomeIcon icon={faChartLine} className="fa-icon-sj" />Internship</NavLink>
          <NavLink to="/jobs"><FontAwesomeIcon icon={faSuitcase} className="fa-icon-sj" />Jobs</NavLink>
          <NavLink to="/Resume"><FontAwesomeIcon icon={faNewspaper} className="fa-icon-sj" />Resume</NavLink>
          
        </div>

        <NavLink to="/profile">
          <div className="profile-sj">
          <img 
              src={`http://localhost:3000/profileimages/${image}`} 
              className="profile-img-43" 
              alt="profile" 
            />
            <div className="profile-name-sj">
              <h4>Jessica Halle</h4>
              <p>Data Science</p>
            </div>
          </div>
        </NavLink>
      </div>

      <div className="main-sj">
        <div className="main-header-sj">
          <h1 className="saved-jobs-header-sj">SAVED OPPORTUNITIES</h1>
          <div className="search-sort-container-sj">
            
            <select onChange={handleSort} className="sort-select-sj">
              <option value="date">Sort by Date</option>
              <option value="company">Sort by Company</option>
            </select>
            <button onClick={handleDeleteAction} className="delete-selected-btn-sj">
              <FontAwesomeIcon icon={faTrash} /> Delete Selected
            </button>
          </div>
        </div>

        <div className="filter-container-sj">
          <div className="filter-grid-sj">
            <button onClick={() => setSelectedType('all')} className={`filter-btn-sj ${selectedType === 'all' ? 'active' : ''}`}>All</button>
            <button onClick={() => setSelectedType('Full-Time')} className={`filter-btn-sj ${selectedType === 'job' ? 'active' : ''}`}>Jobs</button>
            <button onClick={() => setSelectedType('Internship')} className={`filter-btn-sj ${selectedType === 'Internship' ? 'active' : ''}`}>Internships</button>
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="wrapper-sj">
            {filteredJobs.map((job) => (
              <div key={job.id} className="card-sj" onClick={() => handleJobClick(job.id)}>
                <input
                  type="checkbox"
                  checked={selectedJobs.includes(job.id)}
                  onChange={() => handleCheckboxChange(job.id)}
                  className="job-checkbox-sj"
                />
                <JobCard job={job} />
              </div>
            ))}
          </div>
        ) : (
          <p className="no-jobs-msg-sj">No saved jobs found.</p>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Confirmation"
          className="modal-sj"
          overlayClassName="overlay-sj"
        >
          <h2>Are you sure you want to delete the selected jobs?</h2>
          <div className="modal-btn-container-sj">
            <button onClick={clearSelectedJobs} className="modal-clear-btn-sj">Yes, Confirm</button>
            <button onClick={closeModal} className="modal-cancel-btn-sj">Cancel</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SavedJobs;
