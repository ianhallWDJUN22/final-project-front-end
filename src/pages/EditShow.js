import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import DatePicker from "react-datepicker";


import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;



function EditShow(props) {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [showDate, setShowDate] = useState(new Date());


  const navigate = useNavigate();
  const { showId } = useParams();
  

  useEffect(() => {                                  
    axios
      .get(`${API_URL}/api/show/${showId}`)
      .then((response) => {
      const thisShow = response.data;
      setDescription(thisShow.description);
      setCost(thisShow.cost);
      setShowDate(thisShow.showDate)
      })
      .catch((err) => console.log(err));
    }, [showId]);

    const handleFormSubmit = (e) => {      
        e.preventDefault();



        const requestBody = { description, cost, showDate };

        const storedToken = localStorage.getItem('authToken');
     
       
        axios
          .put(`${API_URL}/api/shows/edit/${showId}`, requestBody, { headers: {Authorization: `Bearer ${storedToken}` } })
          .then((response) => {

            navigate(`/show/${showId}`)
          });
      };

      const maxDate = new Date()
      maxDate.setDate(maxDate.getDate() + 30)

      const deleteShow = () => {
       
        const storedToken = localStorage.getItem('authToken');

        axios
          .delete(`${API_URL}/api/shows/delete/${showId}`, { headers: {Authorization: `Bearer ${storedToken}` } })
          .then(() => {
            navigate("/");
          })
          .catch((err) => console.log(err));
      };
    
      return (
    
    
        <div className="EditShow" style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '3%',
            margin: '10px'

        }}>
          <h3
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: '20px',
            marginTop: '60px'

           }}
          >Update Show</h3>
    
          <form onSubmit={handleFormSubmit}>
    
           <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: '10px'

           }}>
            <label>Description:</label>
            <textarea
            style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px',

           }}

              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
           </div>

           <div style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            marginBottom: '40px',
            marginTop: '40px'
          }}>
          <label><b>Cost:</b></label>
          <input
            type="text"
            name="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
            
        

        <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: '10px'

           }}>
          <DatePicker
          
          selected={ new Date(showDate)}
          onChange={(date) => setShowDate(date)}
          minDate={new Date()}
          maxDate={maxDate}
          showTimeSelectOnly
          timeInputLabel="Time:"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        </div>
        
        <div>
            <button type="submit">Submit</button>
        </div>
    
    
          </form>
          <div style={{
            marginTop: "40px"
          }}>
            <button onClick={deleteShow} >
                Delete Event
            </button>
          </div>
    
    
        </div>
      )
}

export default EditShow
