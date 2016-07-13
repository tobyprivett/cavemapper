import React from 'react'
import Polyline from './polyline'

export default class Svg extends React.Component {

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
    return (
      <div id="map-container">
        <svg key={cave.id} width="100%" viewBox="0 0 500 500">
          {this.renderPolylines(surveys)}
        </svg>
      </div>
    )
  }
}
