import { useState, useEffect } from "react";
import ShowList from '../components/ShowList';
import axios from "axios";
const API_URL = "http://localhost:5005";


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
        <h1>Home Page</h1>
        <ShowList shows={shows}/>
      </div>
    );
  }
  
  export default HomePage;
  