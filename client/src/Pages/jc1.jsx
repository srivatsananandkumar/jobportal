import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faHourglassHalf, faUsers } from '@fortawesome/free-solid-svg-icons';
import './jc1.css'; // Add styles for JobCard here

const JobCard = ({ job }) => {
  return (
    <div className="card-225">
      <div className="card-left-225">
        <img src={job.image} alt={job.company} />
      </div>
      <div className="card-center-225">
        <h3>{job.company}</h3>
        <p className="card-detail-225">{job.role}</p>
        <p className="card-loc-225">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          {job.location}
        </p>
        <div className="card-sub-225">
{/*           <p><FontAwesomeIcon icon={faClock} className="icon-container-225" /> {job.time}</p>
 */}          <p><FontAwesomeIcon icon={faHourglassHalf} /> {job.type}</p>
          <p><FontAwesomeIcon icon={faUsers} /> {job.applicants} Applicants</p>
        </div>
      </div>
      <div className="card-right-225">
        <div className="card-tag-225">
          <h5>Divisions</h5>
          <a href="#">{job.divisions}</a>
        </div>
        <div className="card-salary-225">
          <p><b>{job.salary}</b> <span>/ month</span></p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
