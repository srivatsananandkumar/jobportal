import React from 'react'
import { NavLink } from "react-router-dom";
import './Landing.css'
const Landing = () => {
  return (
    <div className='landing-body-43'>
        <div className="landing-content-43">
            <p>"Your next opportunity is just a click away. Join us today to connect with the career of your dreams."</p>
        </div>
     <div className="new-button-loginpage-43">
      <NavLink to="/login"><button>SignIn</button></NavLink>
      <NavLink to="/signup"><button>Signup</button></NavLink>
      </div>
    </div>
  )
}

export default Landing
