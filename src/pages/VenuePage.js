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
        <div className="VenuePage" style={{
            marginTop: '85'
        }}>
         {venue && (
            <>
                <h1 style={{
                    marginTop: '85px',
                    marginBottom: '60px'
                }}>{venue.venueName}</h1>

                {venue.address && (
                    <h2>{venue.address}</h2>
                )}
                
                {venue.description && (
                    <>
                    <label>Bio:</label>
                <p>{venue.description}</p>
                </>
                )}

                <div >
                <h3>Upcoming Shows:</h3>
                {venue.shows.map((individualShow) => {
                    return(
                        <>
                        {new Date().toDateString() <= new Date(individualShow.showDate).toDateString() && (
                            <div style={{
                                    display: 'flex',
                                    border: 'solid 2px',
                                    borderColor: "rgb(75 38 147)",
                                    margin: '5%',
                                    backgroundColor: 'rgb(250, 250, 250, 0.4)',
                                    borderRadius: '5px',
                                    padding: '5px',
                                    justifyContent: 'space-between' 
                                    }}>
                                <div>
                                    <p>{new Date(individualShow.showDate).toDateString()}</p>
                           
                                </div>
                                <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                        }}>
                                <p>Starts: {new Date (individualShow.showDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'} )}</p>
                                </div>
                                <div>
                                    <Link to={`/show/${individualShow._id}`}>
                                        <p>Show Details</p>
                                    </Link>
                                </div>
                            </div>
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