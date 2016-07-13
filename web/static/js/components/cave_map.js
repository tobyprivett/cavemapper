import React, { Component } from 'react'
import Svg from './svg/svg'

export default class CaveMap extends Component {
  render() {

    if (this.props.map_type == 'svg') {
      return (
        <Svg cave={this.props.cave} />
      )
    }
    return <div>That map type has not been implemented</div>
  }
}
