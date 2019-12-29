import React, { Fragment } from 'react'
import { P2PConsumer } from './P2P'
import { Encoder, Reader } from './QR'
import { TextBox } from './TextBox'
import { LastDataConsumer } from './LastData'

export default () => (
  <P2PConsumer>
    {({ host, connect, offer, hosting, joining, connected, peer }) => {
      if (joining) {
        return null
      }

      if (connected) {
        return <div>
          <p>Host connected.</p>
          <TextBox peer={peer}/>
          <p>
            <LastDataConsumer>
              {({latestWebrtcData}) => latestWebrtcData}
            </LastDataConsumer>
          </p>
        </div>
      }

      return (
        <Fragment>
          {hosting && <Reader onData={data => connect(data)} />}
          {!hosting && <button onClick={host}>Host</button>}
          {offer && <Encoder data={offer} />}
        </Fragment>
      )
    }}
  </P2PConsumer>
)
