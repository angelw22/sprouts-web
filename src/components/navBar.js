import { authContext } from '../App';
import { useContext } from 'react'; 
import { Link, useHistory } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/navBar.scss';
import '../styles/app.scss';

function NavBar () {
  let history = useHistory();
  let auth = useContext(authContext);

  return (
  <div className="navContainer">
    <div className="navItems">
      <Link className="homeLink" to="/">Home</Link>
      { auth.user.user_name ? <Link to="/garden">Garden </Link> : ''}
    </div>
    <div>
      { auth.user.user_name ? (
        <DropdownButton id="dropdown-basic-button" variant="success" title={auth.user.user_name}>
          <Dropdown.Item
            onClick={() => {
              auth.signout(() => history.push("/"));
            }}
          >
            Sign out
          </Dropdown.Item>
        </DropdownButton>
      ) : (
        <div>Hi! <Link to="/">Log in </Link> to continue</div>
      )}
    </div>
  </div>
  )
}

export default NavBar;