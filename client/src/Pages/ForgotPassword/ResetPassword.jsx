import React, { useState } from "react";
// import "./SignInPage.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [values, setValues] = useState({
    password: ''
  });

  const navigate = useNavigate();
  
  const {id, token2} = useParams();

 axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/reset-password/${id}/${token2}`, values);

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
            <h1>Reset Your Password</h1>
            <p>You are one step away</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                value={values.password}
                onChange={e => setValues({ ...values, password: e.target.value })}
                placeholder="Enter your password"
              />
            </div>
            
            <div className="button-container1">
              <button type="submit" className="sign-in-button1">
                Update
              </button>
              
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
