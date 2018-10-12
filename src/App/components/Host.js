import React, { Fragment } from 'react'
import { P2PConsumer } from './P2P'
import { Encoder, Reader } from './QR'

export default () => (
  <P2PConsumer>
    {({ host, connect, offer, hosting, joining, connected }) => {
      if (joining) {
        return null
      }

      if (connected) {
        return <div>Host connected</div>
      }

      return (
        <Fragment>
          {offer && <Encoder data={offer} />}
          {hosting && <Reader onData={data => connect(data)} />}
          {!hosting && <button onClick={host}>Host</button>}
        </Fragment>
      )
    }}
  </P2PConsumer>
)
