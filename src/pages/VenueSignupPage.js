// src/pages/SignupPage.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


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
      marginTop: '85px',
      marginBottom: '40px'
      

    }} className="SignupPage">
      <h1 style={{
        color: 'rgb(50, 42, 150)'
      }}>Venue Signup |</h1>
      <Link style={{
          textDecoration: 'none',
          color: 'rgb(128, 128, 128, 0.5)'
        }} to={"/signup/artist"} >
        <h1  className="unselected">| Artist Signup</h1>
      </Link>
     
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '5%',
        backgroundColor: 'rgb(136, 37, 114, 0.3)',
        padding: '15px',
        borderRadius: '5px',
        paddingTop: '20px',
      }}>

      <form onSubmit={handleSignupSubmit}>
      <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
      }}>
        <label><b>Email:</b></label>
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
        <label><b>Password:</b></label>
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

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px'
      }}>
          <label><b>User Name:</b></label>
          <input style={{
          textAlign: 'center'
        }}
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
        </div>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
      }}>
          <label><b>Venue Name:</b></label>
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
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px'
      }}>
        <button style={{
          borderRadius: '5px',
          backgroundColor: 'rgb(250, 250, 250, 0.8)',
          marginLeft: '20%',
          marginRight: '20%',
          marginTop: '20px'
        }} type="submit">Sign Up</button>
      </div>

      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <label>Already have an account?</label>
      <Link style={{
        color: 'gold',
      }} to={"/login/venue"}> Login</Link>
    </div>
    </>
  )
}

export default VenueSignupPage;
