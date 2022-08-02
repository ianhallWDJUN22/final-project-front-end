import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context' 

function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <button>My Page</button>
          <Link to="/show/create">
            <button>Add Show</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup/venue"> <button>Sign Up</button> </Link>
          <Link to="/login/venue"> <button>Login</button> </Link>
        </>
      )}
    </nav>
  );
}
 
export default Navbar;