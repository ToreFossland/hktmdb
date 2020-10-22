import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'



const AppWithApollo = () => {
  const [accessToken, setAccessToken] = useState("")
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0()

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently()
      console.log(token)
      setAccessToken(token)
    } catch (err) {
      //loginWithRedirect()
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
  if (accessToken) {
  return {
      headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
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
