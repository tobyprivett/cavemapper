import React, { Component } from 'react'

var Tooltip = require('pui-react-tooltip').Tooltip;

export default class ShotInfo extends Component {
  render() {
    const shot = this.props.shot
    return (
      <Tooltip>
        {shot.station_from} to {shot.station_to}
        <p>
          Distance: {shot.distance}<br />
          Azimuth: {shot.azimuth}<br />
          Depth change: {shot.depth_change}
        </p>
      </Tooltip>
    )
  }
}
