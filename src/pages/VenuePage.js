import axios from "axios";
import { useEffect, useState} from 'react';
import { Link, useParams } from "react-router-dom";



const API_URL = process.env.REACT_APP_API_URL;







function VenuePage (props) {
    const [venue, setVenue] = useState(null);
    const { venueId } = useParams();



    useEffect(()=> {
        axios
        .get(`${API_URL}/api/venue/${venueId}`)
        .then((response) => {
            const thisVenue = response.data;
            console.log(response.data)
            setVenue(thisVenue);
        })
        .catch((err) => console.log(err));
    }, [venueId] );




    return (
        <div className="VenuePage">
         {venue && (
            <>
                <h1>{venue.venueName}</h1>
                {venue.address && (
                    <h2>{venue.address}</h2>
                )}
                
                {venue.description && (
                    <>
                    <label>Bio:</label>
                <p>{venue.description}</p>
                </>
                )}

            <div>
                <h3>Upcoming Shows:</h3>
                {venue.shows.map((individualShow) => {
                    return(
                        <>
                       
                            {new Date().toDateString() >= new Date(individualShow.showDate).toDateString() && (
                                <>
                                <div>
                                    <p>{new Date(individualShow.showDate).toDateString()}</p>
                           
                                </div>
                                <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                        }}>
                <p>Starts: {new Date (individualShow.showDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'} )}</p>
             
                <Link to={`/show/${individualShow._id}`}>
                    <p>Show Details</p>
                </Link>
              </div>
              </>
              )}
                        </>
                    )
                })}
            </div>
            </>

         )}

        </div>
    )
}

export default VenuePage