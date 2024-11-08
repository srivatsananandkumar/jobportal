import React, { useState,useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { NavLink } from "react-router-dom";

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
    // profileImage: "https://bootdey.com/img/Content/avatar/avatar1.png",
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

  const [file, setFile] = useState();
  const [image, setImage] = useState();

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
    // console.log(formData);
  };

  const handleImageUpload = (e) => {
    const formsData = new FormData()
    formsData.append('file', file)
    axios.post('http://localhost:3000/imageupload', formsData)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  };

  useEffect(() => {
    axios.get('http://localhost:3000/getimage')
    .then(res => {
      setImage(res.data[res.data.length - 1].image); 
      console.log("Fetched data" ,res.data[0].image);
    })
    .catch(err => console.log(err))
   
  }, [])

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

  useEffect(() => {
    console.log('Image state:', image);
    console.log('Constructed Image URL:', `http://localhost:3000/profileimages/${image}`);
  }, [image]);

  const avatar = "data:image/png;base64,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";

  return (
    <div className="container-36">
      <header className="header-profile-243">
        <div className="logo-profile-243">Job<span>Hunt</span></div>
        <div className="heading-profile-243-main">Settings</div>
        <nav>
          <ul>
            
          <NavLink to="/profile"> <li className="gotoprofile-profile-243">Go to profile</li></NavLink> 
          </ul>
        </nav></header>
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
                            <img src={`http://localhost:3000/profileimages/${image}` || avatar} className="img1-responsive-36" alt="profile" />
                            <div className="mt-2-36">
                              <input
                                type="file"
                                accept="image/*"
                                className="btn1-36 btn-primary-36"
                                
                                onChange={e => setFile(e.target.files[0])}
                              />
                            </div>
                            <button onClick={handleImageUpload} className="upload-button-profile-243">Upload</button>
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