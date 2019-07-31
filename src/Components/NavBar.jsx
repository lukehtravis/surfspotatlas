import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import {Link} from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { loading, user } = useAuth0();

  if (loading) {
    return "Loading Login Button...";
  }
  return (
    <div>
      {!isAuthenticated && (
        <button
          onClick={() =>
            loginWithRedirect({})
          }
        >
          Log in
        </button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
      {/* NEW - add a link to the home and profile pages */}

      <span>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/profile">Profile</Link>
        <Link to="/addspot">Add Spot</Link>
      </span>

    </div>
  );
};

export default NavBar;
