import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import {Link} from "react-router-dom";
import SpotMenu from "./SpotMenu/SpotMenu";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { loading, user } = useAuth0();

  if (loading) {
    return "Loading Login Button...";
  }
  return (
    <div>
      <span>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/AddSpot">Add Spot</Link>
        <Link to="/Area/San Diego">San Diego</Link>
        <Link to="/Search">Search</Link>
        <Link to="/profile">Profile</Link>
      </span>
      {!isAuthenticated && (<button onClick={() => loginWithRedirect({})}>Log in</button>)}
      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
      <SpotMenu />
    </div>
  );
};

export default NavBar;
