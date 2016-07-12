import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchCave } from '../actions/index';
import Svg from './svg/svg'

export default class CaveShow extends React.Component {
  componentWillMount() {
    this.props.fetchCave(this.props.params.cave_id);
  }

  render() {
    const cave = this.props.cave;

    if (!cave) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h2>{cave.name}</h2>
        <div id="map-container">
          <Svg cave={this.props.cave} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cave: state.cave.cave };
}

export default connect(mapStateToProps, { fetchCave })(CaveShow);

