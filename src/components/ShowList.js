import { Link } from 'react-router-dom'



function ShowList(props) {

  return (
    <div className="ShowList">
      {props.shows.map((individualShow) => {
        return (
            <div key={individualShow._id}>
            
             <div style={{
                display: 'flex',
                border: 'solid 2px',
                borderColor: "rgb(75 38 147)",
                margin: '5%',
                
                
            }}>
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                justifyContent: 'space-around',
                borderRight: 'solid 2px',
                borderColor: "rgb(75 38 147)"
              }}>
                
                <p>{new Date(individualShow.showDate).toLocaleString('en-En',{weekday: "short", month: "short", day: "numeric"})}</p>
                
                <p>{new Date (individualShow.showDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'} )}</p>
              
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
  );
}


export default ShowList;
