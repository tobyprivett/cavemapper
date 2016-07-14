import React from 'react'
import Survey from './survey'

export default class Surveys extends React.Component {

  renderSurveys(surveys) {
    return surveys.map((survey) => {
      return(
        <Survey key={survey.id} survey={survey}/>
      )
    })
  }

  render() {
    const surveys = this.props.surveys
    return (
      <g key="g_surveys">
        {this.renderSurveys(surveys)}
      </g>
    )
  }
}
