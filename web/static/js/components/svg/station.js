import React from 'react'
import StationInfo from './station_info'

var OverlayTrigger = require('pui-react-overlay-trigger').OverlayTrigger;


export default class Station extends React.Component {

  render() {
    const station = this.props.station
    const point = station.svg_point.split(",")
    return (
      <OverlayTrigger
        placement="top"
        overlay={<StationInfo
        station={station} />}>
        <rect
          key={station.name}
          className=" overlay-trigger station-name"
          x={point[0]-1} y={point[1]-1}
          width={2}
          height={2}
          />
      </OverlayTrigger>
    )
  }
}
