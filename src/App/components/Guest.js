import React, { Fragment } from 'react'
import { P2PConsumer } from './P2P'
import { Encoder, Reader } from './QR'
import { TextBox } from './TextBox'
import { LastDataConsumer } from './LastData'

export default () => (
  <P2PConsumer>
    {({ guest, join, answer, hosting, joining, connected, peer }) => {
      if (hosting) {
        return null
      }

      if (connected) {
        return <div>
          <p>Guest connected.</p>
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
          {!joining && <button onClick={guest}>Join</button>}
          {joining && <Reader onData={data => join(data)} />}
          {answer && <Encoder data={answer} />}
        </Fragment>
      )
    }}
  </P2PConsumer>
)
