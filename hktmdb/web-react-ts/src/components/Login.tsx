import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import auth0 from "@auth0/auth0-react";


const LoginButton = () => {
  
const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, user} = useAuth0();


  return (
      <div>
            <button onClick={() => loginWithRedirect()}>Log In</button>
      </div>
  );
};

export default LoginButton;

