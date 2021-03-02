import React, { useContext }from 'react';
import { Link } from 'react-router-dom';
import LoginPage from "./login";
import { authContext } from "../App";

const HomePage = () => { 
  const auth = useContext(authContext);


  function loggedInHome () {
    return (
      <div>
        Hello {auth.user.user_name}
        <div> Click here to go to the <Link to="/garden">Garden</Link> </div>
      </div>
    )
   
  }

  return (
    <authContext.Consumer>
      {() => (
        <div>
          {auth.user.role ? loggedInHome() : <LoginPage/>}
        </div>
    )}
    </authContext.Consumer>
  )
}



export default HomePage;