import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import myimage from "../../Image/tharun_image1-removebg-preview.png";
import myimage1 from "../../Image/srivatsan-profile.jpeg";
import myimage2 from "../../Image/sushanth-profile.jpeg";
import './Services.css';

const Services = () => {
  let message = "JobHunt provides opportunity for many to find their dream job and internship";
  
  return (
    <div>
      <section className='section-white-services-243'>
        <div className='container-services-243'>
          <div className='services-header'>
            <h2 className='section-title'>The Team Behind JobHunt</h2>
            <p className='section-subtitle'>{message}</p>
          </div>

          <div className="team-container-services-243">
            <div className="team-item-services-243">
              <img src={myimage} className='team-image-services-243' alt="Tharun" />
              <h3>Tharun S I</h3>
              <div className="team-info-services-243">
                <p>Developer of JobHunt</p>
              </div>
              <p>He contributed to the backend of JobHunt project, handling the routing process, developing jobs page, home page, forgot password page, dashboard, and resume builder.</p>

              <ul className='team-icon-services-243'>
                <li><a href="#" className='twitter-services-243'>
                  <FontAwesomeIcon icon={faTwitter} />
                </a></li>
                <li><a href="#" className='linkedin-services-243'>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a></li>
                <li><a href="#" className='instagram-services-243'>
                  <FontAwesomeIcon icon={faInstagram} />
                </a></li>
              </ul>
            </div>

            <div className="team-item-services-243">
              <img src={myimage1} className='team-image-services-243' alt="Tharun" />
              <h3>Srivatsan A</h3>
              <div className="team-info-services-243">
                <p>Developer of JobHunt</p>
              </div>
              <p>He contributed to the backend of JobHunt project, handling the routing process, developing jobs page, home page, forgot password page, dashboard, and resume builder.</p>

              <ul className='team-icon-services-243'>
                <li><a href="#" className='twitter-services-243'>
                  <FontAwesomeIcon icon={faTwitter} />
                </a></li>
                <li><a href="#" className='linkedin-services-243'>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a></li>
                <li><a href="#" className='instagram-services-243'>
                  <FontAwesomeIcon icon={faInstagram} />
                </a></li>
              </ul>
            </div>

            <div className="team-item-services-243">
              <img src={myimage2} className='team-image-services-243' alt="Tharun" />
              <h3>Sushanth S</h3>
              <div className="team-info-services-243">
                <p>Developer of JobHunt</p>
              </div>
              <p>He contributed to the backend of JobHunt project, handling the routing process, developing jobs page, home page, forgot password page, dashboard, and resume builder.</p>

              <ul className='team-icon-services-243'>
                <li><a href="#" className='twitter-services-243'>
                  <FontAwesomeIcon icon={faTwitter} />
                </a></li>
                <li><a href="#" className='linkedin-services-243'>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a></li>
                <li><a href="#" className='instagram-services-243'>
                  <FontAwesomeIcon icon={faInstagram} />
                </a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
