import React from 'react'
import Survey from './survey'

export default class Surveys extends React.Component {

  renderSurveys(surveys) {
    return surveys.map((survey) => {
        const points = survey.svg_polyline_points || []
        return(
          <Survey points={points} key={survey.key} survey={survey}/>
        )
      }
    )
  }

  render() {
    const surveys = this.props.surveys
    return (
      <g>
        {this.renderSurveys(surveys)}
      </g>
    )
  }
}
