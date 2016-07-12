import React from 'react'

export default class Svg extends React.Component {
  // iterate through the surveys
  // and draw a polyline for each survey
  renderPolylines(surveys) {
    return surveys.map((survey) => {
        const points = survey.svg_polyline_points || []
        return(
          <polyline id={survey.key} key={survey.key} points={points} />
        )
      }
    )
  }

  render() {
    const cave = this.props.cave
    const surveys = cave.surveys || []
    return (
      <svg>
        {this.renderPolylines(surveys)}
      </svg>
    )
  }
}
