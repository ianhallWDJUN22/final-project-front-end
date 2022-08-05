import { useState, useEffect } from "react";
import ShowList from '../components/ShowList';
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;


function HomePage() {
    const [ shows, setShows ] = useState([])

    const getAllShows = () => {
        axios
            .get(`${API_URL}/api/shows`)
            .then((response) => {
              setShows(response.data)
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllShows();
    }, [] );

    return (
      <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <h1 style={{
          marginTop: '85px',
          color: 'rgb(119, 68, 242)'
        }}><b>ⓑaseNote</b></h1>
     
        </div>

        <h2 style={{
          marginTop: '5%',
          color: 'rgb(50, 42, 150)'
        }}>Upcoming Shows:</h2>
        <ShowList shows={shows}/>
      </div>
    );
  }
  
  export default HomePage;
  