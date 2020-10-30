import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../styling/login.css';

const LogoutButton = () => {
  const { logout, user} = useAuth0();

  function removeToken(){
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userID")
  }


  return (
    <div id="userBar">
      <p>Logged in as: {user.name}</p>
      <button onClick={() => {logout({ returnTo: window.location.origin}); removeToken();}}>Log Out</button>
    </div>
  );
};

export default LogoutButton;