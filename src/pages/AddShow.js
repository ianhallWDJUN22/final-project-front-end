import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker";
import './AddShow.css'

// import {subDays, addDays} from "date-fns/subDays";

import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;



function AddShow(props) {
  const [newVenue, setNewVenue] = useState("");
  const [description, setDescription] = useState("");
  const [newArtist, setNewArtist ] = useState("");
  const [cost, setCost] = useState("");
  const [venue, setVenue] = useState("unlistedVenue")
  const [artist, setArtist] = useState("unlistedArtist");
  const [userArtists, setUserArtists] = useState([])
  const [userVenues, setUserVenues ] = useState([]);

  const navigate = useNavigate();
  
  const [showDate, setShowDate] = useState(new Date());

  useEffect(() => {
    axios.get(`${API_URL}/api/venues`)
    .then((venueResponse) => {
      console.log(venueResponse.data)
      setUserVenues(venueResponse.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [] )

  useEffect(() => {
    axios.get(`${API_URL}/api/artists`)
    .then((artistResponse) => {
      console.log(artistResponse.data)
      setUserArtists(artistResponse.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [] )

  const handleSubmit = (e) => {
    e.preventDefault();
 
    const requestBody = { 
      newVenue, 
      description, 
      showDate, 
      newArtist, 
      cost, 
      venue: venue === 'unlistedVenue' ? null : venue, 
      artist: artist === 'unlistedArtist' ? null : artist
    };

    const storedToken = localStorage.getItem('authToken');

    axios
      .post(
        `${API_URL}/api/shows`,
         requestBody,
          { headers: {Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log(response);

        navigate('/');

      })
      .catch((error) => console.log(error));
  };

  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 30)

  return (


    <div style={{
      marginRight: '5%',
      marginLeft: '5%',
      marginTop: '85px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justityContent: 'center',
      textAlign: 'center',
      overflow: 'scroll'
    }}>
      
      <div className="AddShow" style={{
        marginBottom: '50px'
      }}>
      <h3>Add Show</h3>
      </div>

      <div>
        <form onSubmit={handleSubmit}
       >

     
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justityContent: 'center',
        marginBottom: '50px'

      }}>
          <label><b>Description:</b></label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
            minWidth: '325px'
          }}
          />
          </div>


          <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justityContent: 'center',
        

      }}>
          <label><b>Choose from a list of baseNote venues:</b></label>
          <select 
           style={{
                  width: '95%',
                  textAlign: 'center',
                }}
          onChange={(e) => {
            console.log(e.target.value)
            setVenue(e.target.value)}}
          >
          

            {userVenues.map((individualVenue) => {
              return(
                <option
                name="venue"
                value={individualVenue._id}
                >{individualVenue.venueName}
                </option>
              )
            })};

            <option value="unlistedVenue" name="newVenue">
            - unlisted venue -
            </option>

          </select>
        </div>
          
       {venue === "unlistedVenue" && (
       <div style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            marginBottom: '50px'
          }}>
        <label><b>Or add a Venue:</b></label>
          <input
            type="text"
            name="newVenue"
            value={newVenue}
            onChange={(e) => setNewVenue(e.target.value)}
          /> 
          </div> 
          )
        }



          <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px'
      }}>
          <label><b>Choose from a list of baseNote artists:</b></label>
          <select
          style={{
                  width: '95%',
                  textAlign: 'center',
                  
                }}
           onChange={(e) => {
            console.log(e.target.value)
            setArtist(e.target.value)}}
          >

            {userArtists.map((individualArtist) => {
              return(
                <option 
                name="artist"
                value={individualArtist._id}
                >{individualArtist.artistName}
                
                </option>
              )
            })}

              <option value="unlistedArtist" name="newArtist">
                - unlisted artist -
                </option>

          </select>
        </div>

        {artist === "unlistedArtist" && (
       <div style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            marginBottom: '50px'
          }}>
        <label><b>Or add an Artist:</b></label>
          <input
            type="text"
            name="newArtist"
            value={newArtist}
            onChange={(e) => setNewArtist(e.target.value)}
          /> 
        </div> 
        )
      }

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            marginBottom: '40px',
            marginTop: '40px'
          }}>
          <label><b>Cost:</b></label>
          <input
            type="text"
            name="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>

        <div style={{
          margin: '10px',
          marginBottom: '40px'
        }}>
        <label><b>Pick a date and time:</b></label>
          <DatePicker
          selected={showDate}
          onChange={(date) => setShowDate(date)}
          minDate={new Date()}
          maxDate={maxDate}
          showTimeSelect
          timeInputLabel="Time:"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>

        <div>
          <button type="submit">Submit</button>
        </div>


      </form>


    </div>
    </div>
  );
}

export default AddShow;
