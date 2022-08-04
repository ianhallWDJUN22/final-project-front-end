import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


function ArtistSignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUserName(e.target.value);
  const handleArtistName = (e) => setArtistName(e.target.value);
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username, artistName };
 
    axios.post(`${API_URL}/auth/signup/artist`, requestBody)
      .then((response) => {
        navigate('/login/artist');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (
    <div className="SignupPage">
      <h1>Artist Signup</h1>
      <h3>Not an artist?</h3>
      <Link to={"/signup/venue"} >Click here to register as a venue!</Link>

      <form className ="venueSignup" onSubmit={handleSignupSubmit}>
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
          name="name"
          value={username}
          onChange={handleUsername}
        />

        <label>Artist Name:</label>
        <input
          type="text"
          name="venueName"
          value={artistName}
          onChange={handleArtistName}  
        />

        <button type="submit">Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have account?</p>
      <Link to={"/login/artist"}> Login</Link>
    </div>
  )
}

export default ArtistSignupPage;