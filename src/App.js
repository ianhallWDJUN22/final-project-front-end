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

function App() {
  return (
    <div className="App">
      
      <Navbar />

      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/signup/venue" element={<VenueSignupPage />} />
        <Route path="/signup/artist" element={<ArtistSignupPage />} />
        <Route path="/login/venue" element={<VenueLoginPage />} />
        <Route path="/login/artist" element={<ArtistLoginPage />} />
        <Route path="/show/create" element={<IsPrivate> <AddShow /> </IsPrivate>} />

      </Routes>
      
    </div>
  );
}

export default App;
