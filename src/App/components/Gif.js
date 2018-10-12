import React, { Component } from 'react'

const INTERVAL = 100

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
    )
  }
}

export default GIF
