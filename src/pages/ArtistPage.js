import { useEffect, useState} from 'react';
import { Link, useParams } from "react-router-dom";


import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;


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
        <div className="ArtistPage" style={{
            marginTop: '85px'
        }}>
         {artist && (
            <>
                    <h1 style={{
                        marginBottom: '20px'

                    }}>{artist.artistName}</h1>
                {artist.description && (
                    <>
                    <label>Bio:</label>
                <p>{artist.description}</p>
                </>
                )}

            <div>
                <h3 style={{
                    marginTop: '40px'
                }}>Upcoming Shows:</h3>
                {artist.shows.map((individualShow) => {
                    console.log({individualShow})
                    return(
                        <>
                    {/* {new Date().toDateString() <= new Date(individualShow.showDate).toDateString() && ( */}
                    <div key={individualShow._id + 'b'}>
                        <>
                        <div  style={{
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
                        </>
                    </div>  
                    {/* )} */}
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