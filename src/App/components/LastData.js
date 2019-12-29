import React, { createContext, useState, useEffect, useContext } from 'react'

import {P2PContext} from './P2P'

const LastDataContext = createContext({latestWebrtcData: ''})


const LastDataProvider = ({children}) => {
  const {connected, peer} = useContext(P2PContext)
  const [latestWebrtcData, setLastWebrtcData] = useState();
  useEffect(() => {
    console.log("effect")
    if(connected) {
      peer.on(
        'data',
        data => setLastWebrtcData(data)
      )
    }
  }, [connected, peer])

  return (
      <LastDataContext.Provider
        value={{latestWebrtcData}}
      >
        {children}
      </LastDataContext.Provider>
  )
}

const LastDataConsumer = LastDataContext.Consumer

export { LastDataContext, LastDataProvider, LastDataConsumer }
