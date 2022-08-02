// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";


function VenueSignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [venueName, setVenueName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);


  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUserName(e.target.value);
  const handleVenueName = (e) => setVenueName(e.target.value);
  
  const handleSignupSubmit = (e) => {
    
    e.preventDefault();
  
    const requestBody = { email, password, username, venueName };
 
    axios.post(`${API_URL}/auth/signup/venue`, requestBody)
      .then((response) => {
        navigate('/login/venue');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (
    <div className="SignupPage">
      <h1>Venue Signup</h1>
      <h3>Not a venue?</h3>
      <Link to={"/signup/artist"} >Click here to register as an artist!</Link>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>User Name:</label>
        <input 
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />

        <label>Venue Name:</label>
        <input
          type="text"
          name="venueName"
          value={venueName}
          onChange={handleVenueName}  
        />


        <button type="submit">Sign Up</button>

      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have account?</p>
      <Link to={"/login/venue"}> Login</Link>
    </div>
  )
}

export default VenueSignupPage;
