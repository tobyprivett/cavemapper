import React from 'react'
import Polyline from './polyline'

export default class Svg extends React.Component {
  constructor() {
    super()
    this.state = {
      scale: 1,
      translate: 0
    }
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleResetZoom = this.handleResetZoom.bind(this)
  }

  handleZoomIn() {
    this.setState({
      scale: this.state.scale * 1.2,
      translate: this.state.translate - 40
    })
  }

  handleZoomOut() {
    this.setState({
      scale: this.state.scale / 1.2,
      translate: this.state.translate + 40
    })
  }

  handleResetZoom() {
    this.setState({
      scale: 1, translate: 0
    })
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
    console.log(this.state.translate)
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
          <svg key={cave.id} width="100%" viewBox="0 0 500 500">
            <g
              transform={`
                translate(${this.state.translate} ${this.state.translate})
                scale(${this.state.scale})
              `}>
              {this.renderPolylines(surveys)}
            </g>
          </svg>
        </div>
      </div>
    )
  }
}
