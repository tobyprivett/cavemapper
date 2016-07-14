import React from 'react'
import Surveys from './surveys'
import Stations from './stations'
import svgPanZoom from 'svg-pan-zoom'

export default class Svg extends React.Component {
   constructor() {
    super()
    this.state = {
      zoomer: null,
      stations_visible: false
    }
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleResetZoom = this.handleResetZoom.bind(this)
    this.toggleStations = this.toggleStations.bind(this)
  }

  handleZoomIn() { this.zoomer.zoomIn() }
  handleZoomOut() { this.zoomer.zoomOut() }
  handleResetZoom() { this.zoomer.resetZoom() }
  toggleStations() { this.setState({stations_visible: !this.state.stations_visible })}

  componentDidMount() {
    this.zoomer = svgPanZoom('svg', {
      controlIconsEnabled: false
    })
  }

  componentWillUnmount() {
    this.zoomer.destroy()
  }

  render() {
    const cave = this.props.cave
    const surveys = cave.surveys
    const stations = cave.stations
    return (
      <div>
        <div className="btn-group">
          <button className="btn btn-default" onClick={this.handleZoomIn}>
            <span className="glyphicon glyphicon-plus" />
          </button>
          <button className="btn btn-default" onClick={this.handleZoomOut}>
            <span className="glyphicon glyphicon-minus" />
          </button>
          <button className="btn btn-default" onClick={this.handleResetZoom}>
            Reset
          </button>
        </div>
        <div className="btn-group">
         <button className="btn btn-default" onClick={this.toggleStations}>
            Stations
          </button>
        </div>
        <div id="map-container">
          <svg key={cave.id}>
            <Surveys surveys={surveys} />
            <Stations stations={stations} visible={this.state.stations_visible} />
          </svg>
        </div>
      </div>
    )
  }
}
