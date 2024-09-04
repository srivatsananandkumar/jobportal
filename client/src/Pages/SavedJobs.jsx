import React, { useEffect, useState } from 'react';
import './SavedJobs.css'; // Add your own styles for this page
import JobCard from './jc1.jsx'; // Import the JobCard component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faSort, faHouse, faNewspaper, faChartLine, faBookmark, faEnvelope, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

Modal.setAppElement('#root');

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('date');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedType, setSelectedType] = useState('all');

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

  return (
    <div className="saved-jobs-container-sj">
      <div className="menus-sj">
        <h1 className="logo-sj">JobHunt</h1>
        <NavLink to="/"><FontAwesomeIcon icon={faHouse} className="fa-icon-sj" />Home</NavLink>
        <NavLink to="/dashboard"><FontAwesomeIcon icon={faNewspaper} className="fa-icon-sj" />Dashboard</NavLink>
        <NavLink to="#"><FontAwesomeIcon icon={faChartLine} className="fa-icon-sj" />Performance</NavLink>
        <NavLink to="#"><FontAwesomeIcon icon={faBookmark} className="fa-icon-sj" />Saved Jobs</NavLink>
        <NavLink to="#"><FontAwesomeIcon icon={faEnvelope} className="fa-icon-sj" />Message</NavLink>
        <NavLink to="/setting"><FontAwesomeIcon icon={faCog} className="fa-icon-sj" />Setting</NavLink>
        <a href="/signup" className="logout-jobs-sj"><FontAwesomeIcon icon={faSignOutAlt} className="fa-icon-sj"/><span className="text"> Logout</span></a>
      </div>
      
      <div className="content-sj">
        <div className="header-sj">
          <h1 className="saved-jobs-header-sj">Saved Jobs & Internships</h1>
          <div className="search-sort-container-sj">
            <input
              type="text"
              placeholder="Search by role..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input-sj"
            />
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
            <button onClick={() => setSelectedType('job')} className={`filter-btn-sj ${selectedType === 'job' ? 'active' : ''}`}>Jobs</button>
            <button onClick={() => setSelectedType('Internship')} className={`filter-btn-sj ${selectedType === 'Internship' ? 'active' : ''}`}>Internships</button>
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="cards-wrapper-sj">
            {filteredJobs.map((job) => (
              <div key={job.id} className="job-card-sj">
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
          <p className="no-jobs-msg-sj">Not saved </p>
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
