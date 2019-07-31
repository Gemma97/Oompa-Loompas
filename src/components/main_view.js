import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOompas } from '../actions/index';

class MainView extends Component {
  componentWillMount() {
    this.props.fetchOompas();
  }
  
  renderOompas() {
    return this.props.oompas.results.map(function(oompa) {
      return (
        <li className="list-group-item" key={oompa.id}>
          <strong>{oompa.first_name}</strong>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Find your Oompa Loompa</h1>
        <h3>There are more than 100k</h3>
        <ul className="list-group">
          {this.renderOompas()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { oompas: state.oompas.all };
}

export default connect(mapStateToProps, {fetchOompas: fetchOompas} )(MainView);