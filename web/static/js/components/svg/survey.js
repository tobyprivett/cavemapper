import React from 'react'
import Shot from './shot'

export default class Survey extends React.Component {

  renderShots(shots) {
    return shots.map((shot) => {
      return (
        <Shot key={shot.id} shot={shot} />
      )
    })
  }
  render() {
    const survey = this.props.survey
    const shots = survey.shots
    return (
      <g key={`g_survey_${survey.id}`}>
        {this.renderShots(shots)}
      </g>
    )
  }
}
