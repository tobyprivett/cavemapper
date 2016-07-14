import React, { Component } from 'react'

var Tooltip = require('pui-react-tooltip').Tooltip;

export default class StationInfo extends Component {
  render() {
    const station = this.props.station
    return (
      <Tooltip>{station.name}</Tooltip>
    )
  }
}
