import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOompas } from "../actions/index";

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      oompasToShow: 15,
      expanded: false
    };

    this.showMore = this.showMore.bind(this);
  }

  onInputChange(event) {
    this.setState({ search: event.target.value });
  }

  componentWillMount() {
    this.props.fetchOompas();
  }

  showMore() {
    this.state.oompasToShow === 15
      ? this.setState({
          oompasToShow: this.props.oompas.results.length,
          expanded: true
        })
      : this.setState({ oompasToShow: 15, expanded: false });
  }

  renderOompas() {
    if (this.props.oompas.results) {
      let filteredOompas = this.props.oompas.results.filter(oompa => {
        return (
          (oompa.first_name
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) &&
            oompa.last_name
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) &&
            oompa.profession
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase())) !== -1
        );
      });

      return filteredOompas
        .slice(0, this.state.oompasToShow)
        .map(function(oompa) {
          return (
            <li key={oompa.id}>
              <Link to={"/oompa/" + oompa.id}>
                <img className="oompa" src={oompa.image} />
              </Link>
              <div className="info">
                <Link to={"/oompa/" + oompa.id} className="name">
                  {oompa.first_name} {oompa.last_name}
                </Link>
                <p className="gender">
                  {oompa.gender === "F" ? "Woman" : "Man"}
                </p>
                <p className="profession">{oompa.profession}</p>
              </div>
            </li>
          );
        });
    }
  }

  render() {
    return (
      <div>
        <div className="top-bar">
          <img
            className="oompa-icon"
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
          />
          Oompa Loompa's Crew
        </div>
        <div className="search-bar">
          <form className="input-group">
            <input
              value={this.state.search}
              onChange={this.onInputChange.bind(this)}
              placeholder="Search"
            />
            <img
              className="search-icon"
              src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png"
            />
          </form>
        </div>
        <div className="title">
          <h1>Find your Oompa Loompa</h1>
          <h2>There are more than 100k</h2>
        </div>
        <ul className="oompas-container">{this.renderOompas()}</ul>
        <button
          className="btn btn-primary center-block"
          onClick={this.showMore}
        >
          {this.state.expanded ? (
            <span>Cargar menos Oompa Loompas</span>
          ) : (
            <span>Cargar más Oompa Loompas</span>
          )}
        </button>
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
