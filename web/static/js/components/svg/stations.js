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
    return (
      <g id="stations">
        {this.renderStations(stations)}
      </g>
    )
  }
}
