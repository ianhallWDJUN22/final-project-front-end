import { Link } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'



function ShowList(props) {

  return (
    <>

{props.shows.length == 0 && (
      <div style ={{
        marginTop: '30%'
      }}>
        <LoadingSpinner />
        <h4 style={{
          margin: '20px'
        }}>Loading Info</h4>
      </div>
    )}

    <div className="ShowList">
      {props.shows.map((individualShow) => {
        return (
            <div key={individualShow._id}>
            
             <div style={{
                display: 'flex',
                border: 'solid 2px',
                borderColor: "rgb(75 38 147)",
                margin: '5%',
                backgroundColor: 'rgb(250, 250, 250, 0.4)',
                borderRadius: '5px'
                
                
                
            }}>
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1.5',
                justifyContent: 'space-around',
                borderRight: 'solid 2px',
                borderColor: "rgb(75 38 147)"
              }}>
                
                <p><b>{new Date(individualShow.showDate).toLocaleString('en-En',{weekday: "short", month: "short", day: "numeric"})}</b></p>
                
                <p><b>{new Date (individualShow.showDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'} )}</b></p>
              
            </div>

            <div style={{
              flex: '3'
            }}>
              <label>Venue:</label> 
            
              {individualShow.newVenue === "" && (
                <div>
                    <h5>{individualShow.venue.venueName}</h5>
                </div>)}
              
                {individualShow.newVenue !== "" && (
                <div>
                    <h5>{individualShow.newVenue}</h5>
                </div>)}
                
               <label>Act:</label>
                {individualShow.newArtist === "" && (
                <div>
                    <h5>{individualShow.artist.artistName}</h5>
                </div>)}
                {individualShow.newArtist !== "" && (
                <div>
                    <h5>{individualShow.newArtist}</h5>
                </div>)}
                
            </div>
            
            <div style={{
              position: 'relative'
            }}>
            <Link style={{
              marginRight: '1%',
              textDecoration: 'none'

              
            }} to={`/show/${individualShow._id}`}>
                    <small style={{

                      marginRight: '5px'
                    }} >details</small>
                </Link>
                </div>
            

            </div>
          </div> 
        );
      })}
    </div>
    </>
  );
}


export default ShowList;
