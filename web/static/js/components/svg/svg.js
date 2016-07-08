import React from 'react'

export default class Svg extends React.Component {
  // iterate through the surveys
  // and draw a polyline for each survey
  renderPolylines(surveys) {
    return surveys.map((survey) => {
        const points = survey.points || []
        return(
          <polyline key={survey.key} points={points.join(" ")} />
        )
      }
    )
  }

  render() {
    const cave = this.props.cave
    const surveys = cave.surveys || []
    return (
      <svg viewBox="0 0 1200 1200">
          <g transform="translate(100, 300) rotate(-90)">
          {this.renderPolylines(surveys)}
          </g>
      </svg>
    )
  }
}
