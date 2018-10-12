import React from 'react'
import { P2PConsumer } from './P2P'
import chime from '../../assets/chime.mp3'

export default () => (
  <P2PConsumer>
    {({ connected }) => {
      if (!connected) {
        return null
      }

      return (
        <audio preload="auto" autoPlay playsInline>
          <source src={chime} />
        </audio>
      )
    }}
  </P2PConsumer>
)
