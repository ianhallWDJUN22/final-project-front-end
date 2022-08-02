function ShowList(props) {

  return (
    <div className="ShowList">
      {props.shows.map((individualShow) => {
        return (
            <div key={individualShow._id}>
              <div className="showDate">
                {new Date(individualShow.showDate).toDateString()}
              </div>
              <div>
                
              </div>
              <div>
                <p>Starts: {new Date (individualShow.showDate)
                .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'} )}</p>
              </div>
            </div>
        );
      })}
    </div>
  );
}


export default ShowList;
