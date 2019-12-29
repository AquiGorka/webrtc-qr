import React, { Component } from 'react'
import { P2PProvider } from './components/P2P'
import Host from './components/Host'
import Guest from './components/Guest'
import Chime from './components/Chime'
import { LastDataProvider } from './components/LastData'

class App extends Component {
  render() {
    return (
      <P2PProvider>
        <LastDataProvider>
          <Host />
          <Guest />
          <Chime />
        </LastDataProvider>
      </P2PProvider>
    )
  }
}

export default App
