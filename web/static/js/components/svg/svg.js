import React from 'react'
import Polyline from './polyline'

export default class Svg extends React.Component {
  // iterate through the surveys
  // and draw a polyline for each survey
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
      <svg key={cave.id} viewBox="0 0 700 600">
        {this.renderPolylines(surveys)}
      </svg>
    )
  }
}
