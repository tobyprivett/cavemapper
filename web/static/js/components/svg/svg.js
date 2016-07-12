import React from 'react'
import Polyline from './polyline'

export default class Svg extends React.Component {
  constructor() {
    super()
    this.state = {
      scale: 1
    }
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
  }

  handleZoomIn() {
    this.setState({scale: this.state.scale * 1.2})
  }

  handleZoomOut() {
    this.setState({scale: this.state.scale / 1.2})
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
    const surveys = cave.surveys || []
    console.log(this.state.scale)
    return (
      <div>
        <div className="btn-group">
          <button className="btn btn-default" onClick={this.handleZoomIn}>
            <span className="glyphicon glyphicon-plus" />
          </button>
          <button className="btn btn-default" onClick={this.handleZoomOut}>
            <span className="glyphicon glyphicon-minus" />
          </button>
        </div>

        <div id="map-container">
          <svg key={cave.id} width="100%" viewBox="0 0 500 500">
            <g
              transform={`scale(${this.state.scale})`}>
              {this.renderPolylines(surveys)}
            </g>
          </svg>
        </div>
      </div>
    )
  }
}
