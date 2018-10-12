import React, { Component, createContext } from 'react'
import Peer from 'simple-peer'

const P2PContext = createContext({})

class P2PProvider extends Component {
  state = { signal: null, peer: null, connected: false }

  render() {
    return (
      <P2PContext.Provider
        value={{
          ...this.state,
          connect: this.connect,
          host: this.host,
          join: this.join,
        }}
      >
        {this.props.children}
      </P2PContext.Provider>
    )
  }

  connect = data => {
    const { peer } = this.state
    peer.on('connect', () => {
      console.log('Host connected')
      this.setState({ connected: true })
    })
    peer.signal(data)
  }

  host = () => {
    const peer = new Peer({ initiator: true, trickle: false })
    peer.on('signal', signal => this.setState({ signal }))
    this.setState({ peer })
  }

  join = data => {
    const peer = new Peer({ trickle: false })
    peer.on('signal', signal => this.setState({ signal }))
    peer.on('connect', () => {
      console.log('Guest connected')
      this.setState({ connected: true })
    })
    peer.signal(data)
    this.setState({ peer })
  }
}

const P2PConsumer = P2PContext.Consumer

export { P2PProvider, P2PConsumer }
