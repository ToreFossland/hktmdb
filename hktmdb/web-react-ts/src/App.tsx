import React from 'react'
import MobxExample from './components/MobxExample';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import SearchHistory from './components/SearchHistory';
import Login from './components/Login';
import LogOut from './components/LogOut';
import AddMovie from './components/AddMovie';
import {useLocalStore, useObserver} from "mobx-react";
import { DataStoreProvider } from './context'
import './styling/general.css';
import auth0 from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";


interface myState {
  input: string
}

interface myProps {

}



class App extends React.Component<myProps, myState> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: ".",
    }
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(input: string) {
    this.setState({ input: input })
  }

  render() {
    return (
      <div id="grid-container">
        
        <Login/>
        <LogOut/>
        <SearchHistory/>
        <SearchResults input={this.state.input}/>
        <Search onChange={this.changeInput}/>
        <div></div>
      </div>
    )
  }

}

export default App;