import React, { Component } from 'react'
import ShotInfo from './shot_info'

var OverlayTrigger = require('pui-react-overlay-trigger').OverlayTrigger;

export default class Shot extends Component {

  render() {
    const shot = this.props.shot
    const x1 = shot.svg_station_from.split(",")[0]
    const y1 = shot.svg_station_from.split(",")[1]
    const x2 = shot.svg_station_to.split(",")[0]
    const y2 = shot.svg_station_to.split(",")[1]
    return (
      <OverlayTrigger
        placement="right"
        overlay={<ShotInfo shot={shot} />}>
        <line
          className="overlay-trigger"
          key={shot.id}
          x1={x1} y1={y1} x2={x2} y2={y2} />
      </OverlayTrigger>
    )
  }
}
