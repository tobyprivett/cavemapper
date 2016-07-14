import React from 'react'
import Station from './station'

export default class Stations extends React.Component {

  renderStations(stations) {
    return stations.map((station) => {
        return(
          <Station station={station} key={station.id} />
        )
      }
    )
  }

  render() {
    const stations = this.props.stations
    if (!this.props.visible) {
      return (<g key="g_stations"></g>)
    }
    return (
      <g key="g_stations">
        {this.renderStations(stations)}
      </g>
    )
  }
}
