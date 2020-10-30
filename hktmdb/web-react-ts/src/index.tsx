import React, { useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'



const AppWithApollo = () => {
  const { getAccessTokenSilently, loginWithRedirect, user } = useAuth0()


  const getAccessToken = useCallback(async () => {
    try {
      let token = await getAccessTokenSilently()
      localStorage.setItem("accessToken", token);
      let userIdTemp = await user.sub.split("|")[1]
      if(typeof userIdTemp != 'undefined'){
        localStorage.setItem("userID", userIdTemp);
        console.log(userIdTemp)
        console.log("user id ble hentet!")
      }
    } catch (err) {
    }
  }, [getAccessTokenSilently, loginWithRedirect])

  useEffect(() => {
    getAccessToken()
  }, [getAccessToken])

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:4001/graphql'
});


const authLink = setContext((_, { headers }) => {
  let test = localStorage.getItem("accessToken");
  let userid = localStorage.getItem("userID");
  if (test) {
  return {
      headers: {
          ...headers,
          userid,
          Authorization: `Bearer ${test}`,
      }
    }
  }else {
    return{
    headers: {
      userid,
      ...headers,
    }
  }
}
});


  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
  })

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}



ReactDOM.render(

  <Auth0Provider
    domain="dev-ka434tjj.eu.auth0.com"
    clientId="7dFlgpZ5Jjosjkws4b3Qgyo7uEltZ8gy"
    redirectUri={window.location.origin}
    audience="https://dev-ka434tjj.eu.auth0.com/api/v2/">
    <AppWithApollo />
  </Auth0Provider>,
  document.getElementById('root')
);
