import React, { useState } from "react";
import "./SignInPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignInPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
 axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/logindetail", values);

      if (response.data.Status === "Success") {
        navigate("/home"); // Correctly use `navigate` to redirect
      } else {
        alert(response.data.message || "Error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.response.data.message);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:3000/auth/google"; // Redirect to Google OAuth
  };

  return (
    <div className="sin-body">
      <div className="sign-in-page">
        <div className="sign-in-container">
          <div className="sign-in-header">
            <h1>Welcome Back</h1>
            <p>Sign-in to continue</p>
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
            <div className="form-group">
              <label htmlFor="password">Password:</label>
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
                Sign In
              </button>
              <NavLink to="/Signup">
                <button type="button" className="forgot-password-button">
                  Create Account
                </button>
              </NavLink>
            </div>
            <button
              type="button"
              className="sign-in-button1 google-signin-button"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
