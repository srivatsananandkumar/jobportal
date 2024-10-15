import React, { useState } from "react";
// import "./SignInPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: ''
  });

  const navigate = useNavigate();
 axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/forgot-password", values);

      if (response.data.Status === "Success") {
        navigate("/login"); 
      } 
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="sin-body">
      <div className="sign-in-page">
        <div className="sign-in-container">
          <div className="sign-in-header">
            <h1>Forgot Your Password</h1>
            <p>Don't Worry!!!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={values.email}
                onChange={e => setValues({ ...values, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="button-container1">
              <button type="submit" className="sign-in-button1">
                Send
              </button>
              
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
