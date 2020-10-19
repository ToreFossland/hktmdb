import React from 'react'
import Test from './components/Test';
import MobxExample from './components/MobxExample';
import Input from './components/Input';
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
        <Test input={this.state.input} />
        <Input onChange={this.changeInput} />
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

}

export default App;