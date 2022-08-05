// src/pages/LoginPage.js

import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"

const API_URL = process.env.REACT_APP_API_URL;


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

        authenticateUser()
      
        navigate('/');                             
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
      

    }}>
      <h1 style={{
        color: 'rgb(50, 42, 150)'
      }}>Venue Login |</h1>
      <Link style={{
          textDecoration: 'none',
          color: 'rgb(128, 128, 128, 0.8)'
        }} to={"/login/artist"} >
        <h1  className="unselected">| Artist Login</h1>
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
      <form onSubmit={handleLoginSubmit}>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px'
      }}>
        <label><b>Email:</b></label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          style={{
            textAlign: 'center'
          }}
        />
        </div>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px'
      }}>
        <label><b>Password:</b></label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          style={{
            textAlign: 'center'
          }}
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
        }} type="submit">Login</button>
      </div>
      
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <label>Don't have an account yet?</label>
      <Link style={{
        color: 'gold'
      }} to={"/signup/venue"}> Sign Up</Link>
      </div>
      </>
  )
}

export default LoginPage;
