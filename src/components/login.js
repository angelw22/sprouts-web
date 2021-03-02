import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { authContext } from "../App";


function LoginPage () {
  const [role, setRole] = useState();
  const [id, setId] = useState();
  const auth = useContext(authContext);
  let { from } = window.location.state || { from: { pathname: "/"} }
  let history = useHistory();

  function change (ev) {
    var role = ev.target.value; 
    var id = ev.target.options[ev.target.options.selectedIndex].id
    console.log("role,", role, "id", id)
    if (role && id) {
      setRole(role)
      setId(ev.target.options[ev.target.options.selectedIndex].id)
    }
  }

  return (
    <authContext.Consumer>
      {() =>(
        <div>
          <form onSubmit={(ev) => {
            ev.preventDefault();
            auth.signin(role, id, () => {
              history.replace(from);
              history.push('/garden')
            })
            }}
          >
            <select defaultValue="" value={role} onChange={change} placeholder="select">
              <option disabled={true} value="">Select user</option>
              <option value="teacher" id="123">Teacher</option>
              <option value="parent" id="321">Parent</option>
              <option value="student" id="456">Student 1</option>
              <option value="student" id="789">Student 2</option>
            </select>
            <input type="submit" value="Log in" />
          </form>
        </div>
      )}
    </authContext.Consumer>
  )
}

export default LoginPage;