import React, { Component, createContext } from 'react'
import Peer from 'simple-peer'

const P2PContext = createContext({})

class P2PProvider extends Component {
  state = {
    offer: null,
    answer: null,
    peer: null,
    connected: false,
    hosting: false,
    joining: false,
  }

  render() {
    return (
      <P2PContext.Provider
        value={{
          ...this.state,
          connect: this.connect,
          host: this.host,
          guest: this.guest,
          join: this.join,
        }}
      >
        {this.props.children}
      </P2PContext.Provider>
    )
  }

  connect = qrcodeData => {
    const { peer } = this.state
    peer.on('connect', () => {
      console.log('Host connected')
      this.setState({ connected: true })
    })
    peer.signal(qrcodeData)
  }

  guest = () => {
    this.setState({ joining: true })
  }

  host = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      objectMode: true,
    })
    peer.on('signal', offer => this.setState({ offer }))
    this.setState({ peer, hosting: true })
  }

  join = data => {
    const peer = new Peer({
      trickle: false,
      objectMode: true,
    })
    peer.on('signal', answer => this.setState({ answer }))
    peer.on('connect', () => {
      console.log('Guest connected')
      this.setState({ connected: true })
    })
    peer.signal(data)
    this.setState({ peer })
  }
}

const P2PConsumer = P2PContext.Consumer

export { P2PContext, P2PProvider, P2PConsumer }
