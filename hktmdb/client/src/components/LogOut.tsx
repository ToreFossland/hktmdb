import React from "react";
import { useAuth0} from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, user } = useAuth0();

  function removeToken(){
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userID")
  }


  return (
    <div>
      <p>Logged in as: {user.name}</p>
      <button onClick={() => {logout({ returnTo: window.location.origin}); removeToken();}}>
      Log Out
    </button>
    </div>
  );
};

export default LogoutButton;