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

    <>

    <div style={{
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      marginTop: '85px',
      marginBottom: '40px'

    }} className="SignupPage">
      
      <Link style={{
          textDecoration: 'none',
          color: 'rgb(128, 128, 128, 0.5)'
        }} to={"/signup/venue"} >
        <h1  className="unselected">Venue Signup |</h1>
      </Link>
      
      <h1 style={{
        color: 'rgb(50, 42, 150)'
      }}>| Artist Signup</h1>
     
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

      <form style={{
        
      }} onSubmit={handleSignupSubmit}>
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
          placeholder="example@artist.com"
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
          <label><b>Artist Name:</b></label>
          <input style={{
          textAlign: 'center'
        }}
            type="text"
            name="venueName"
            value={artistName}
            onChange={handleArtistName}  
          />
        </div>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
        justifyContent: 'center'
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
        color: 'gold'
      }} to={"/login/artist"}> Login</Link>
    </div>
    </>


    // <div className="SignupPage">
    //   <h1>Artist Signup</h1>
    //   <h3>Not an artist?</h3>
    //   <Link to={"/signup/venue"} >Click here to register as a venue!</Link>

    //   <form className ="venueSignup" onSubmit={handleSignupSubmit}>
    //     <label>Email:</label>
    //     <input 
    //       type="email"
    //       name="email"
    //       value={email}
    //       onChange={handleEmail}
    //     />

    //     <label>Password:</label>
    //     <input 
    //       type="password"
    //       name="password"
    //       value={password}
    //       onChange={handlePassword}
    //     />

    //     <label>User Name:</label>
    //     <input 
    //       type="text"
    //       name="name"
    //       value={username}
    //       onChange={handleUsername}
    //     />

    //     <label>Artist Name:</label>
    //     <input
    //       type="text"
    //       name="venueName"
    //       value={artistName}
    //       onChange={handleArtistName}  
    //     />

    //     <button type="submit">Sign Up</button>
    //   </form>

    //   { errorMessage && <p className="error-message">{errorMessage}</p> }

    //   <p>Already have account?</p>
    //   <Link to={"/login/artist"}> Login</Link>
    // </div>
  )
}

export default ArtistSignupPage;