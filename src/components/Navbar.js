import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth.context'
import "./Navbar.css"

function Navbar() {

  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

    return () => {
        window.removeEventListener('resize', changeWidth)
    }

  }, [])

  const { isLoggedIn, logOutUser } = useContext(AuthContext)

  return (
    <nav>

    {(toggleMenu || screenWidth > 500) && (
    <ul className="list">
    <li className="items">
    <Link style={{
            textDecoration: 'none',
            color: 'white'
          }}
          onClick={toggleNav} to="/">
        HOME
        </Link>
    </li>
    {isLoggedIn && (
        <>
    <li className="items">
          <Link style={{
            textDecoration: 'none',
            color: 'white'
          }}
          onClick={toggleNav}
          to="/show/create">
            ADD SHOW
          </Link>
    </li>
    <li className="items">
    <Link style={{
            textDecoration: 'none',
            color: 'white'
          }}
          to="/" 
          onClick={logOutUser}>Logout</Link>
    </li>
        </>
      )}

      {!isLoggedIn && (
        <>
        <li className="items">
          <Link style={{
            textDecoration: 'none',
            color: 'white'
          }} 
          onClick={toggleNav}
          to="/signup/venue">Sign Up</Link>
        </li>
         <li className="items">
          <Link style={{
            textDecoration: 'none',
            color: 'white'
          }} 
          onClick={toggleNav}
          to="/login/venue">Login</Link>
        </li>
        </>
      )}
  </ul>


    )}
  {/* <button style={{
      color: 'rgb(57, 22, 159, 0.8)',
      border: 'solid 2px',
      borderColor: 'rgb(57, 22, 159, 0.7)',
      
      
    }}className="btn"><b>ⓑ</b></button> */}

    {(screenWidth <= 500) && (
    <button style={{
      color: 'white',
      border: 'solid 2px',
      borderColor: 'white',
      backgroundColor: 'rgb(57, 22, 159, 0.2)',
      fontSize: '25px',
      padding: '0 10px',
    }} onClick={toggleNav} className="btn">≡</button>
    )}
    </nav>
  );
}
 

export default Navbar;



