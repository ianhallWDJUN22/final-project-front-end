// src/pages/SignupPage.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./VenueSignupPage.css"

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
    <>
    <div style={{
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      marginTop: '60px',
      marginBottom: '40px'

    }} className="SignupPage">
      <h1>Venue Signup</h1>
      <h1>></h1>
      <Link style={{
          textDecoration: 'none',
          color: 'rgb(128, 128, 128, 0.5)'
        }} to={"/signup/artist"} >
        <h1  className="unselected">Artist Signup</h1>
      </Link>
     
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '5%'
      }}>

      <form onSubmit={handleSignupSubmit}>
      <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
      }}>
        <label>Email:</label>
        <input style={{
          textAlign: 'center'
        }}
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          placeholder="example@venue.com"
        />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px'
      }}>
        <label>Password:</label>
        <input style={{
          textAlign: 'center'
        }}
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          placeholder="******"
        />
      </div>

        {/* <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px'
      }}>
          <label>User Name:</label>
          <input style={{
          textAlign: 'center'
        }}
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
        </div> */}

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
      }}>
          <label>Venue Name:</label>
          <input style={{
          textAlign: 'center'
        }}
            type="text"
            name="venueName"
            value={venueName}
            onChange={handleVenueName}  
          />
        </div>

        <div style={{
          marginTop: '20px',
           marginBottom: '20px'
        }}>
          <button type="submit">Sign Up</button>
        </div>

      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have account?</p>
      <Link to={"/login/venue"}> Login</Link>
    </div>
    </>
  )
}

export default VenueSignupPage;
