import './App.css';
import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import HomePage from './components/homePage'
import GardenPage from './components/gardenPage';
import NavBar from './components/navBar'

export function App() {
  return (
    <authContext.Provider value={useProvideAuth()}>
      <Router>
        <div className="App">
            <NavBar />
            <Switch>
              <Route exact path="/">
                <HomePage/>
              </Route>
              <PrivateRoute path="/garden">
                <GardenPage />
              </PrivateRoute>
            </Switch>
        </div>
      </Router>
    </authContext.Provider>
  );
}

const authentication = {
  isAuthenticated: false,
  userName: null,
  async signin(id) {
    return new Promise(async (resolve) => {
      let data = JSON.stringify({'user_id':id});
      try {
        let response = await fetch(
          "http://localhost:8000/api/user",
          {
            method: "POST", 
            headers: {'Content-Type':'application/json'},
            body: data
          }
        );
        if (response.status >= 200 && response.status < 300) {
          response.json().then((json) => {
            let data = JSON.parse(json).user_name;
            resolve(data);
            });
        }
      } catch (errors) {
        console.log(errors);
      } 
      
      authentication.isAuthenticated = true;
    })
    
  },
  signout(cb) {
    authentication.isAuthenticated = false;
    setTimeout(cb, 100)
  }
}


export const authContext = createContext();

function useProvideAuth() {
  const [user, setUser] = useState({role: '', id: '', user_name: ''});
  
  const signin = async (role, id) => { //when real auth, will take in log in credentials and pass to authentication.signin to authenticate instead.  
    authentication.signin(id).then((value) => {
      setUser({role: role, id: id, user_name: value});
    });
  }

  const signout = cb => {
    return authentication.signout(()=> {
      setUser({role: '', id: '', user_name: ''});
      cb()
    })
  };

  return {
    user,
    signin, 
    signout
  }
}


function PrivateRoute ({children, ...rest}) {
  let auth = useContext(authContext);

  return (
    <Route 
      {...rest}
      render={({ location }) => 
        auth.user.user_name ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}



export default App;
