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
                margin: '10px',
                padding: '10px',
                justifyContent: 'space-between',
                
            }}>
              <div className="showDate">
                {new Date(individualShow.showDate).toDateString()}
              </div>

            <div>
            <label>Venue:</label> 
            
             {individualShow.newVenue === "" && (
                <div>
                    <h4>{individualShow.venue.venueName}</h4>
              </div>)}
              
              {individualShow.newVenue !== "" && (
                <div>
                    <h4>{individualShow.newVenue}</h4>
                </div>)}
                
               <label>Act:</label>
                {individualShow.newArtist === "" && (
                <div>
                    <h4>{individualShow.artist.artistName}</h4>
                </div>)}
                {individualShow.newArtist !== "" && (
                <div>
                    <h4>{individualShow.newArtist}</h4>
                </div>)}
                
            </div>
              
              
              <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            
              }}>
                <p>Starts: {new Date (individualShow.showDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'} )}</p>
             
                <Link to={`/show/${individualShow._id}`}>
                    <small>details</small>
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
