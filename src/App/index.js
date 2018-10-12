import React, { Component } from 'react'
import { P2PProvider } from './components/P2P'
import Host from './components/Host'
import Guest from './components/Guest'
import Chime from './components/Chime'

class App extends Component {
  render() {
    return (
      <P2PProvider>
        <Host />
        <Guest />
        <Chime />
      </P2PProvider>
    )
  }
}

export default App
