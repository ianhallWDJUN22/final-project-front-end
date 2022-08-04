import axios from "axios";
import { useEffect, useState} from 'react';
import { Link, useParams } from "react-router-dom";



const API_URL = "http://localhost:5005";







function ArtistPage (props) {
    const [artist, setArtist] = useState(null);
    const { artistId } = useParams();



    useEffect(()=> {
        axios
        .get(`${API_URL}/api/artist/${artistId}`)
        .then((response) => {
            const thisArtist = response.data;
            console.log(response.data)
            setArtist(thisArtist);
        })
        .catch((err) => console.log(err));
    }, [artistId] );




    return (
        <div className="ArtistPage">
         {artist && (
            <>
                {artist.description && (
                    <>
                    <h1>{artist.artistName}</h1>
                    <label>Bio:</label>
                <p>{artist.description}</p>
                </>
                )}

            <div>
                <h3>Upcoming Shows:</h3>
                {artist.shows.map((individualShow) => {
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

export default ArtistPage