import React from 'react'
import MobxExample from './components/MobxExample';
import Search from './components/Search';
import SearchYear from './components/SearchYear';
import SearchType from './components/SearchType';
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
  input: string,
  firstYear: number,
  secondYear: number,
  filterType: string
}

interface myProps {

}



class App extends React.Component<myProps, myState> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: ".",
      firstYear: 0,
      secondYear: 2020,
      filterType: "title"
    }
    this.changeInput = this.changeInput.bind(this);
    this.changeFirstYear = this.changeFirstYear.bind(this);
    this.changeSecondYear = this.changeSecondYear.bind(this);
    this.changeFilterType = this.changeFilterType.bind(this);
  }

  changeInput(input: string) {
    this.setState({ input: input })
  }

  changeFirstYear(input: number) {
    this.setState({firstYear: input});
  }

  changeSecondYear(input: number) {
    this.setState({secondYear: input});
  }

  changeFilterType(input: string) {
    this.setState({filterType: input});
    console.log(this.state.filterType);
  }

  render() {
    return (
      <div id="grid-container">
        
        <Login/>
        <LogOut/>
        <SearchHistory/>
        <SearchResults input={this.state.input} firstYear={this.state.firstYear} secondYear={this.state.secondYear} filterType={this.state.filterType}/>
        <div> 
          <Search onChange={this.changeInput}/>
          <SearchYear onChange1={this.changeFirstYear} onChange2={this.changeSecondYear} /><br></br>
          <SearchType onChange={this.changeFilterType}/>
        </div>

        
        <div></div>
      </div>
    )
  }

}

export default App;