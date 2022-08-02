import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker";

// import {subDays, addDays} from "date-fns/subDays";

import axios from "axios";
const API_URL = "http://localhost:5005";



function AddShow(props) {
  const [newVenue, setNewVenue] = useState("");
  const [description, setDescription] = useState("");
  const [newArtist, setNewArtist ] = useState("");
  const [cost, setCost] = useState("");
  const [venue, setVenue] = useState("")
  const [artist, setArtist] = useState("");
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
 
    const requestBody = { newVenue, description, showDate, newArtist, cost, venue, artist };

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


    <div className="AddShow">
      <h3>Add Show</h3>

      <form onSubmit={handleSubmit}>

      <DatePicker
      selected={showDate}
      onChange={(date) => setShowDate(date)}
      minDate={new Date()}
      maxDate={maxDate}
      showTimeSelect
      timeInputLabel="Time:"
      dateFormat="MMMM d, yyyy h:mm aa"
    />

       {venue === "unlistedVenue" && (
       <>
       <label>Add a Venue:</label>
        <input
          type="text"
          name="newVenue"
          value={newVenue}
          onChange={(e) => setNewVenue(e.target.value)}
        /> 
        </> 
        )
      }
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select onChange={(e) => {
          console.log(e.target.value)
          setVenue(e.target.value)}}>
        {userVenues.map((individualVenue) => {
            return(
              <option
              name="venue"
              value={individualVenue._id}
              >
              {individualVenue.venueName}</option>
            )
        })}
        <option 
        value="unlistedVenue"
        name="newVenue"
        >
        unlisted venue
        </option>
        </select>

        <select>
        {userArtists.map((individualArtist) => {
            return(
              <option
              name="artist"
              value={individualArtist._id}
              onChange={(e) => setArtist(e.target.value)}>
              {individualArtist.artistName}</option>
            )
        })}
        </select>

        <label>Add an Artist:</label>
        <input
          type="text"
          name="newArtist"
          value={newArtist}
          onChange={(e) => setNewArtist(e.target.value)}
        />

        <label>Cost:</label>
        <input
          type="text"
          name="cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddShow;
