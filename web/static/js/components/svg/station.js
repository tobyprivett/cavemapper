import React from 'react'

export default class Station extends React.Component {

  render() {
    const station = this.props.station
    return (
      <g><text>{station.name}</text></g>
    )
  }
}
