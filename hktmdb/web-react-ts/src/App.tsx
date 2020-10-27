import React from 'react'
import MobxExample from './components/MobxExample';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import SearchHistory from './components/SearchHistory';
import Login from './components/Login';
import LogOut from './components/LogOut';
import MovieDescription from './components/MovieDescription'
import AddMovie from './components/AddMovie';
import {useLocalStore, useObserver} from "mobx-react";
import { DataStoreProvider } from './context'
import './styling/general.css';
import auth0 from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";




class App extends React.Component {

  render() {
    return (
      <DataStoreProvider>
      <div id="grid-container">
        <img src={require("./resources/hktMDB.svg")} />
        <div>
          <Login/>
          <LogOut/>
        </div>
        <SearchHistory/>
        <div>
          <Search/><br></br>
          <h1>Results:</h1>
          <SearchResults/>
        </div>
        <MobxExample/>
        <MovieDescription/>
      </div>
      </DataStoreProvider>
    )
  }

}

export default App;