import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchCave } from '../actions/index';
import CaveMap from './cave_map'

export default class CaveShow extends React.Component {
  componentWillMount() {
    this.props.fetchCave(this.props.params.cave_id);
  }

  render() {
    const cave = this.props.cave;
    if (!cave.surveys) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h2>{cave.name}</h2>
        <CaveMap cave={this.props.cave} map_type="svg" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cave: state.cave.cave };
}

export default connect(mapStateToProps, { fetchCave })(CaveShow);

