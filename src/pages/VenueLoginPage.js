// src/pages/LoginPage.js

import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"

const API_URL = "http://localhost:5005";


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/auth/login/venue`, requestBody)
      .then((response) => {

        console.log('JWT token', response.data.authToken );

        storeToken(response.data.authToken)
      
        navigate('/');                             
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (
    <div className="LoginPage">
      <h1>Venue Login</h1>
      <h3>Need to log in as an artist?</h3>
      <Link to="/login/artist">Click Here</Link>

      <form onSubmit={handleLoginSubmit}>
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

        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Don't have an account yet?</p>
      <Link to={"/signup/venue"}> Sign Up</Link>
    </div>
  )
}

export default LoginPage;