import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL;

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
            setShow(thisShow);
        })
        .catch((err) => console.log(err));
    }, [showId] );

    return(
        <div className="ShowDetails"
        style={{
            marginTop: '85px'
        }}>
        {show && (
            <>
            <div style={{
                marginBottom: '50px'
            }}>
                <h1>Event Details</h1>
            </div>
            

            <div style={{
                display: 'flex',
                border: 'solid 2px',
                borderColor: "rgb(75 38 147)",
                margin: '5%',
                backgroundColor: 'rgb(250, 250, 250, 0.4)',
                flexDirection: 'column'
                
                
                
            }}>
            <div style={{
                marginBottom: '10px'
            }}>
                <h3>{new Date(show.showDate).toDateString()}</h3>
            </div>
           

            {show.newVenue === "" && (
            <div style={{
                marginBottom: '10px'
            }}>
             <label>Venue:</label>
              <Link to={`/venue/${show.venue._id}`}>
                <h3>{show.venue.venueName}</h3>
              </Link>
            </div>
            )}
            {show.newVenue !== "" && (
                <div style={{
                marginBottom: '10px'
            }}>
                  <label>Venue:</label>
                    <h4>{show.newVenue}</h4>
                </div>)}
            

            {show.newArtist === "" && (
            <div style={{
                marginBottom: '10px'
            }}>
            <label>Artist:</label>
              <Link to={`/artist/${show.artist._id}`}>   
                <h3>{show.artist.artistName}</h3>
              </Link>
             </div>
             )}

             {show.newArtist !== "" && (
                <div style={{
                marginBottom: '10px'
            }}>
                <label>Artist:</label>
                    <h4>{show.newArtist}</h4>
                </div>)}

             
            
            <div style={{
                marginBottom: '10px'
            }}>
                <h4>Starts: {new Date (show.showDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'} )}</h4>
             </div>
           {show.description !== "" && (
            <div style={{
                marginBottom: '10px'
            }}>
             
                <h4>Info: </h4>
                <article>{show && show.description}</article>
             </div>
            )}

             <div style={{
                marginBottom: '10px'
            }}>
                <p><b>Cost: </b>{show.cost}</p>
             </div>
             {user && show && show.artist && show.artist._id.toString() === user._id.toString() && (
                <div style={{
                marginBottom: '10px'
            }}>
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
             </div>

            </>
         )}
        </div>
    )
}


export default ShowDetails