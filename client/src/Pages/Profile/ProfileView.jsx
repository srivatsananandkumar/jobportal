import React from 'react';
import './ProfileView.css';

function ProfileView() {
  return (
    <div className="profile-container-profile-view">
      <div className="profile-card-profile-view">
        <div className="photo-section-profile-view">
          <div className="progress-circle-profile-view">
            <div className="photo-button-profile-view">
              <button>Add photo</button>
            </div>
            <span className="progress-percentage-profile-view">48%</span>
          </div>
        </div>
        <div className="profile-info-profile-view">
          <h2>Tharun <span className="edit-icon-profile-view">✏️</span></h2>
          <p>B.Tech/B.E.<br />Sri Krishna College of Technology, Coimbatore</p>
          <div className="details-profile-view">
            <div className="detail-item-profile-view">
              <span>📍 Pollachi</span>
              <span>📞 9080681436 ✔️</span>
            </div>
            <div className="detail-item-profile-view">
              <span>♂️ Male</span>
              <span>📧 tharunsitharunsi1@gmail.com ✔️</span>
            </div>
            <div className="detail-item-profile-view">
              <span>🎂 6th January 2005</span>
            </div>
          </div>
        </div>
      </div>
      <div className="details-section-profile-view">
        <ul>
          <li>🎓 Add details <span className="increase-profile-view">↑ 8%</span></li>
          <li>🎓 Add details <span className="increase-profile-view">↑ 7%</span></li>
          <li>🏅 Add competitive exam <span className="increase-profile-view">↑ 6%</span></li>
        </ul>
        <button className="add-details-button-profile-view">Add 10 missing details</button>
      </div>
    </div>
  );
}

export default ProfileView;
