import React from 'react'
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import SearchHistory from './components/SearchHistory';
import Login from './components/Login';
import LogOut from './components/LogOut';
import MovieDescription from './components/MovieDescription'
import AddReview from './components/AddReview'
import Reviews from './components/Reviews'
import AddMovie from './components/AddMovie';
import {useLocalStore, useObserver} from "mobx-react";
import { DataStoreProvider } from './context'
import './styling/general.css';
import './styling/searchresults.css';
import './styling/search.css';
import './styling/moviedescription_review.css';
import auth0 from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";





class App extends React.Component {

  render() {
    return (
      <DataStoreProvider>
      <div id="grid-container">
        <img id="Header" src={require("./resources/hktMDB.svg")} />
        <div>
          <Login/>
          <LogOut/>
        </div>
        <div id="Search">
          <Search/><br></br>
          <SearchResults/>
        </div>
        <MovieDescription/>
        <Reviews/>
        <AddReview/>
      </div>
      </DataStoreProvider>
    )
  }

}

export default App;