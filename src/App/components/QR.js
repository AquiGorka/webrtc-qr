import React, { Component, Fragment } from 'react'
import encode from 'qr-encode'
import QrR from 'react-qr-reader'
import GIF from './Gif'

const OPTIONS = { type: 10, size: 6, level: 'H' }
const SIZE = 40

class Reader extends Component {
  state = { data: null, segments: {}, total: 0, sent: false }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <p>
          Received {
            this.state.total
            ? Array.from(Array(this.state.total).keys()).map(
              (i) => i in this.state.segments ? '█' : '▁'
            ).join('')
            : "nothing so far."
          }
        </p>
        <QrR
          style={{
            opacity: 0.1,
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          delay={10}
          _facingMode="user"
          showViewFinder={false}
          onScan={this.handleData}
          onError={error => console.log('--> Error: ', error)}
        />
      </Fragment>
    )
  }

  handleData = data => {
    if (data) {
      const { segments, sent } = this.state
      const parsed = JSON.parse(data)
      if (!segments[parsed.i]){
        this.setState({
          segments: {...segments, [parsed.i]: parsed},
          total: parsed.t,
        })
      }
      if (parsed.t === Object.keys(segments).length && !sent) {
        this.setState({ sent: true })
        const raw = Object.values(segments)
          .sort((a, b) => a.i - b.i)
          .map(x => x.s)
          .join('')
        const signal = JSON.parse(atob(raw))
        this.props.onData(signal)
      }
    }
  }
}

class Encoder extends Component {
  state = { images: [] }

  componentDidMount() {
    const { data } = this.props
    if (!data) {
      return
    }
    this.generateImages(data)
  }

  render() {
    return <GIF images={this.state.images} />
  }

  generateImages = data => {
    const serialized = btoa(JSON.stringify(data))
    const segments = serialized.match(new RegExp('.{1,' + SIZE + '}', 'g'))
    const images = segments.map((s, i) =>
      encode(JSON.stringify({ t: segments.length, i, s }), OPTIONS),
    )
    this.setState({ images })
  }
}

export { Encoder, Reader }
