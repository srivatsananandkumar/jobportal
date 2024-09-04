import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    profileImage: "https://bootdey.com/img/Content/avatar/avatar1.png",
    resume: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    is2FAEnabled: false,
    privacySettings: {
      showEmail: true,
      showPhone: false,
    },
  });

  const [activeTab, setActiveTab] = useState("account");

  const handleInputChange = (e) => {
    const { id, value, checked, type } = e.target;
    if (id in formData.privacySettings) {
      setFormData((prevData) => ({
        ...prevData,
        privacySettings: {
          ...prevData.privacySettings,
          [id]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
    console.log(formData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };

  const handleResumeDownload = () => {
    if (formData.resume) {
      const url = URL.createObjectURL(formData.resume);
      const link = document.createElement("a");
      link.href = url;
      link.download = formData.resume.name;
      link.click();
    }
  };

  const handleResumeDelete = () => {
    setFormData({ ...formData, resume: null });
  };

  const handleCreateResume = () => {
    alert("Redirecting to resume creation page...");
    // Logic to redirect to resume creation page can be added here
  };

  return (
    <div className="container-36">
      <h1 className="h3-36 ">Settings</h1>
      <div className="row-36">
        <div className="col-md-5-36">
          <div className="card1-36">
            <div className="card-header-36">
              <h5 className="card-title-36">Profile Settings</h5>
            </div>
            <div className="list-group-36" role="tablist">
              <a
                className={`list-group-item-36 ${activeTab === "account" ? "active-36" : ""}`}
                onClick={() => setActiveTab("account")}
                role="tab"
              >
                Account
              </a>
              <a
                className={`list-group-item-36 ${activeTab === "resume" ? "active-36" : ""}`}
                onClick={() => setActiveTab("resume")}
                role="tab"
              >
                Resume
              </a>
              <a
                className={`list-group-item-36 ${activeTab === "privacy" ? "active-36" : ""}`}
                onClick={() => setActiveTab("privacy")}
                role="tab"
              >
                Privacy and Safety
              </a>
              <a
                className={`list-group-item-36 ${activeTab === "security" ? "active-36" : ""}`}
                onClick={() => setActiveTab("security")}
                role="tab"
              >
                Security
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-7-36">
          <div className="tab-content-36">
            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="tab1-pane-36 fade-36 show-36 active-36" id="account-36" role="tabpanel">
                <div className="card2-36">
                  <div className="card-header2-36">
                    <h5 className="card-title1-36">Public Info</h5>
                  </div>
                  <div className="card-body1-36">
                    <form onSubmit={handleSubmit}>
                      <div className="row1-36">
                        <div className="col-md-8-36">
                          <div className="form-group-36">
                            <input
                              type="text"
                              className="form-control-36"
                              id="username"
                              placeholder="Username"
                              value={formData.username}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group-36 mb-3-36">
                            <textarea
                              rows="2"
                              className="form-control-36"
                              id="bio"
                              placeholder="Tell something about yourself"
                              value={formData.bio}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-4-36">
                          <div className="text-center1-36">
                            <img
                              alt="Profile"
                              src={formData.profileImage}
                              className="img1-responsive-36"
                              width="128"
                              height="128"
                            />
                            <div className="mt-2-36">
                              <input
                                type="file"
                                accept="image/*"
                                className="btn1-36 btn-primary-36"
                                
                                onChange={handleImageUpload}
                              />
                            </div>
                            <small>
                              For best results, use an image at least 128px by 128px in .jpg format
                            </small>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn1-36"
                      >
                        Save changes
                      </button>
                    </form>
                  </div>
                </div>

                <div className="card3-36 mt-4-36">
                  <div className="card-header2-36">
                    <div className="card-actions-36 float-right-36">
                      <div className="dropdown-36 show-36">
                        
                      </div>
                    </div>
                    <h5 className="card-title1-36">Private Info</h5>
                  </div>
                  <div className="card-body2-36">
                    <form onSubmit={handleSubmit}>
                      <div className="form-row-36">
                        <div className="form-group-36">
                          <input
                            type="text"
                            className="form-control-36"
                            id="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group-36 col-md-6-36 mb-3-36">
                          <input
                            type="text"
                            className="form-control-36"
                            id="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      

                      <div className="form-group-36 mb-3-36">
                        <input
                          type="email"
                          className="form-control-36"
                          id="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group-36 mb-3-36">
                        <input
                          type="text"
                          className="form-control-36"
                          id="address"
                          placeholder="Address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group-36 mb-3-36">
                        <input
                          type="text"
                          className="form-control-36"
                          id="address2"
                          placeholder="Address 2"
                          value={formData.address2}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      
                        <div className="form-group-36 col-md-6-36 mb-3-36">
                          <input
                            type="text"
                            className="form-control-36"
                            id="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group-36 col-md-4-36 mb-3-36">
                          <input
                            type="text"
                            className="form-control-36"
                            id="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group-36 col-md-2-36 mb-3-36">
                          <input
                            type="text"
                            className="form-control-36"
                            id="zip"
                            placeholder="ZIP"
                            value={formData.zip}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn2-36 btn-primary-36"
                        
                      >
                        Save changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Resume Tab */}
            {activeTab === "resume" && (
              <div className="tab-pane-36 fade-36 show-36 active-36" id="resume-36" role="tabpanel">
                <div className="card6-36">
                  <div className="card-header-36">
                    <h5 className="card-title4-36">Resume</h5>
                  </div>
                  <div className="card-body-36">
                    <p>Your resume is the first impression you mak on potential employers. Craft it carefully to secure your desired job or intenship.</p>
                    <form onSubmit={handleSubmit}>
                      <div className="form5-group-36">
                        <label htmlFor="resumeUpload" className="form-label-36">
                          Upload Resume
                        </label>
                        <input
                          type="file"
                          className="form-control-36"
                          id="resumeUpload"
                          onChange={handleResumeUpload}
                        />
                      </div>
                      <div className="form-group-36 mb-3-36">
                        {formData.resume ? (
                          <>
                          <div className="newbie-button-22-36">
                            <button
                              type="button"
                              className="btn143-yes-36"
                              onClick={handleResumeDownload}
                              
                            >
                              Download Resume
                            </button>
                            <button
                              type="button"
                              className="btn143-no-36 "
                              onClick={handleResumeDelete}
                              
                            >
                              Delete Resume
                            </button>
                            </div>
                          </>
                        ) : (
                          <div className="one-number-button-worth">
                          <button
                            type="button"
                            className="btn1-secondary-36"
                            onClick={handleCreateResume}
                          >
                            <FontAwesomeIcon icon={faPlus} className="icon33-iceage-36"/>
                            Create Resume
                          </button>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <div className="tab-pane-36 fade-36 show-36 active-36" id="privacy-36" role="tabpanel">
                <div className="card55-36">
                  <div className="card-header-36">
                    <h5 className="card-title-36 mb-0-36">Privacy and Safety</h5>
                  </div>
                  <div className="card22-body11-36">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group-36 form-check-36">
                        <input
                          type="checkbox"
                          className="form-check-input-36"
                          id="showEmail"
                          checked={formData.privacySettings.showEmail}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label-36" htmlFor="showEmail">
                          Show Email
                        </label>
                      </div>
                      <div className="form-group-36 form-check-36">
                        <input
                          type="checkbox"
                          className="form-check-input-36"
                          id="showPhone"
                          checked={formData.privacySettings.showPhone}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label-36" htmlFor="showPhone">
                          Show Phone Number
                        </label>
                      </div>
                      <div className="despicableme25-36">
                      <button
                        type="submit"
                        className="btn-primary-newwonder-36"
                        
                      >
                        Save changes
                      </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="tab-pane-36 fade-36 show-36 active-36" id="security-36" role="tabpanel">
                <div className="card77-36">
                  <div className="card12644-header-36">
                    <h5 className="card-title6666-36 ">Security</h5>
                  </div>
                  <div className="card88-body44-36">
                    <form onSubmit={handleSubmit}>
                      <div className="form99-group-36 mb-3-36">
                        <label htmlFor="currentPassword" className="form-hi-label-36">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="form44-control-36"
                          id="currentPassword"
                          // placeholder="Current Password"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form99-group-36 mb-3-36">
                        <label htmlFor="newPassword" className="form-hi-label-36">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="form44-control-36"
                          id="newPassword"
                          // placeholder="New Password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form99-group-36 mb-3-36">
                        <label htmlFor="confirmPassword" className="form-hi-label-36">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="form44-control-36"
                          id="confirmPassword"
                          // placeholder="Confirm New Password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form999-group-36 form-check-36">
                        <input
                          type="checkbox"
                          className="form-check-input-36"
                          id="is2FAEnabled"
                          checked={formData.is2FAEnabled}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label-36" htmlFor="is2FAEnabled">
                          Enable Two-Factor Authentication (2FA)
                        </label>
                      </div>
                      <div className="partha-300-new-36">
                      <button
                        type="submit"
                        className="btn-primary-wonderla-36"
                      >
                        Save changes
                      </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;