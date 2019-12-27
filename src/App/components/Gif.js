import React, { Component } from 'react'

const INTERVAL = 200

class GIF extends Component {
  state = { index: 0, intervalId: null }

  componentDidMount() {
    const intervalId = setInterval(() => {
      const index =
        this.state.index === this.props.images.length - 1
          ? 0
          : this.state.index + 1
      this.setState({ index })
    }, INTERVAL)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  render() {
    const { images } = this.props
    if (!images.length) {
      return null
    }
    const { index } = this.state

    return (
      <div>
        <img
          key={index}
          src={images[index]}
          alt={index}
          style={{
            width: '90vw',
            height: '90vh',
            objectFit: 'contain',
            padding: '5vw',
            boxSizing: 'border-box',
          }}
        />
        <p>
          Sending {
            Array.from(images.keys()).map(
              (i) => i === index ? '█' : '▁'
            ).join('')}
        </p>
      </div>
    )
  }
}

export default GIF
