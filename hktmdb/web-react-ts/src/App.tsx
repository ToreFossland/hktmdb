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
        <Login/>
        <LogOut/>
        <SearchHistory/>
        <SearchResults/>
        <Search/>
        <MobxExample/>
        <MovieDescription/>
      </div>
      </DataStoreProvider>
    )
  }

}

export default App;