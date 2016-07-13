import React from 'react'
import Polyline from './polyline'
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

  renderPolylines(surveys) {
    return surveys.map((survey) => {
        const points = survey.svg_polyline_points || []
        return(
          <Polyline points={points} key={survey.key} survey={survey}/>
        )
      }
    )
  }


  render() {
    const cave = this.props.cave
    const surveys = cave.surveys
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
            {this.renderPolylines(surveys)}
          </svg>
        </div>
      </div>
    )
  }
}
