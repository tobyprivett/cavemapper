import React from 'react'

export default class Survey extends React.Component {

  render() {
    return (
      <polyline
        key={this.props.survey.id}
        points={this.props.points}
      />
    )
  }
}
