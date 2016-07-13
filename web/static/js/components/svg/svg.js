import React from 'react'
import Surveys from './surveys'
import Stations from './stations'
import svgPanZoom from 'svg-pan-zoom'

export default class Svg extends React.Component {
   constructor() {
    super()
    this.state = {
      zoomer: null
    }
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleResetZoom = this.handleResetZoom.bind(this)
  }

  handleZoomIn() { this.zoomer.zoomIn() }
  handleZoomOut() { this.zoomer.zoomOut() }
  handleResetZoom() { this.zoomer.resetZoom() }

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
        <div id="map-container">
          <svg key={cave.id}>
            <Surveys surveys={surveys} />
            <Stations stations={stations} />
          </svg>
        </div>
      </div>
    )
  }
}
