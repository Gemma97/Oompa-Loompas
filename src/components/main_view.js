import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOompas } from "../actions/index";
import SearchBar from './search_bar';

class MainView extends Component {
  componentWillMount() {
    this.props.fetchOompas();
  }

  renderOompas() {
    if (this.props.oompas.results) {
      //per assegurar que les dades no són 'null'
      return this.props.oompas.results.map(function(oompa) {
        return (
          <li key={oompa.id}>
            <img className={"oompa"} src={oompa.image} />
            <div className={"info"}>
              <p className={"name"}>
                {oompa.first_name} {oompa.last_name}
              </p>
              <p className={"gender"}>
                {oompa.gender === "F" ? "Woman" : "Man"}
              </p>
              <p className={"profession"}>{oompa.profession}</p>
            </div>
          </li>
        );
      });
    }
  }

  render() {
    return (
      //search bar
      <div>
        <div className={"top-bar"}>
          <img
            className={"oompa-icon"}
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
          />
          Oompa Loompa's Crew
        </div>
        <SearchBar/>
        <div className={"title"}>
          <h1>Find your Oompa Loompa</h1>
          <h2>There are more than 100k</h2>
        </div>
        <ul className="oompas-container">{this.renderOompas()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { oompas: state.oompas.all };
}

export default connect(
  mapStateToProps,
  { fetchOompas: fetchOompas }
)(MainView);
