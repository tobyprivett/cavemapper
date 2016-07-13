import React from 'react'

export default class Station extends React.Component {

  render() {
    const station = this.props.station
    const point = station.svg_point.split(",")
    return (
      <text key={station.name} className="station-name" x={point[0]} y={point[1]}>
        {station.name}
      </text>
    )
  }
}
