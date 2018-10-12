import React, { Fragment } from 'react'
import { P2PConsumer } from './P2P'
import { Encoder, Reader } from './QR'

export default () => (
  <P2PConsumer>
    {({ guest, join, answer, hosting, joining, connected }) => {
      if (hosting) {
        return null
      }

      if (connected) {
        return <div>Guest connected</div>
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
