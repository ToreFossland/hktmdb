import React from 'react'
import MobxExample from './components/MobxExample';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import {useLocalStore, useObserver} from "mobx-react";
import { DataStoreProvider } from './context'
import './styling/general.css';



interface myState {
  input: string
}

interface myProps {

}



class App extends React.Component<myProps, myState> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: "."
    }
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(input: string) {
    this.setState({ input: input })
  }

  render() {
    return (
      <div id="grid-container">
          <DataStoreProvider>
            <MobxExample/>
          </DataStoreProvider>
        <Search onChange={this.changeInput}/>
        <SearchResults input={this.state.input}/>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

}

export default App;