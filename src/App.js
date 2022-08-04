import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";     
import HomePage from "./pages/HomePage"; 
import VenueSignupPage from "./pages/VenueSignupPage"  ;
import ArtistSignupPage from "./pages/ArtistSignupPage";
import VenueLoginPage from "./pages/VenueLoginPage";
import ArtistLoginPage from './pages/ArtistLoginPage';
import IsPrivate from "./components/IsPrivate";
import AddShow from "./pages/AddShow";
import ShowDetails from "./pages/ShowDetails";
import EditShow from "./pages/EditShow";
import VenuePage from "./pages/VenuePage";
import ArtistPage from "./pages/ArtistPage";

function App() {
  return (
    <div className="App">

     <div>
      <Navbar />
      </div> 

      <div>
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/signup/venue" element={<VenueSignupPage />} />
        <Route path="/signup/artist" element={<ArtistSignupPage />} />
        <Route path="/login/venue" element={<VenueLoginPage />} />
        <Route path="/login/artist" element={<ArtistLoginPage />} />
        <Route path="/show/create" element={<IsPrivate> <AddShow /> </IsPrivate>} />
        <Route path="/show/:showId" element={<ShowDetails />} />
        <Route path="/venue/:venueId" element={<VenuePage />} />
        <Route path="/artist/:artistId" element={<ArtistPage /> } />
        <Route path="/shows/edit/:showId" element={<EditShow />} />
      </Routes>
      </div>

    </div>
  );
}

export default App;
