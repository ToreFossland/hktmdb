import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import auth0 from "@auth0/auth0-react";


const LoginButton = () => {
  
const { loginWithRedirect, isAuthenticated, getAccessTokenSilently} = useAuth0();
/*
const haakon = async () =>{
    if(isAuthenticated){
        const token = await getAccessTokenSilently();
        localStorage.setItem('id_token', token);
    }else{
        localStorage.setItem('id_token', "");
    }
}

haakon()
*/

 /*
  useEffect(() => {
    if(isAuthenticated){
        let k:any
        k.auth0.parseHash((err:any, authResult:any) => {
            if(authResult){
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
            } else if (err) {
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }
}, [isAuthenticated])
*/

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;

