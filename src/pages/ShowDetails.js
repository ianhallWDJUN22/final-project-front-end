import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function ShowDetails(props){

    const {user} = useContext(AuthContext)
    console.log(user)
    const [show, setShow] = useState(null)
    const { showId } = useParams();

    
    useEffect(()=> {
        axios
        .get(`${API_URL}/api/show/${showId}`)
        .then((response) => {
            const thisShow = response.data;
            console.log(response.data)
            setShow(thisShow);
        })
        .catch((err) => console.log(err));
    }, [showId] );

    return(
        <div className="ShowDetails">
        {show && (
            <>
            <div>
                <h1>Event Details</h1>
            </div>
            
            <div>
                <h3>{new Date(show.showDate).toDateString()}</h3>
            </div>
           

            {show.newVenue === "" && (
            <div>
              <Link to={`/venue/${show.venue._id}`}>
                <h3>Venue: {show.venue.venueName}</h3>
              </Link>
            </div>
            )}
            {show.newVenue !== "" && (
                <div>
                    <h4>Venue: {show.newVenue}</h4>
                </div>)}
            

            {show.newArtist === "" && (
            <div>
              <Link to={`/artist/${show.artist._id}`}>   
                <h3>Act: {show.artist.artistName}</h3>
              </Link>
             </div>
             )}

             {show.newArtist !== "" && (
                <div>
                    <h4>Artist: {show.newArtist}</h4>
                </div>)}

             
            
            <div>
                <h4>Starts: {new Date (show.showDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'} )}</h4>
             </div>
           
            <div>
                <h4>Description:</h4>
                <article>{show && show.description}</article>
             </div>

             {user && show && show.artist && show.artist._id.toString() === user._id.toString() && (
                <div>
                    <Link to={`/shows/edit/${show._id}`}>
                        <small>update your event!</small>
                    </Link>
                </div>
             )}

             {user && show && show.venue && show.venue._id.toString() === user._id.toString() && (
                <div>
                    <Link to={`/shows/edit/${show._id}`}>
                        <small>update your event!</small>
                    </Link>
                </div>
             )}

            </>
         )}
        </div>
    )
}


export default ShowDetails