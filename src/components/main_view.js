import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOompas } from "../actions/index";
import SearchBar from "./search_bar";

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      oompasToShow: 15,
      expanded: false,
      showButton: true
    };

    this.showMore = this.showMore.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ search: event.target.value });
  }

  hideButton() {
    this.setState({ showButton: false });
  }

  showButton() {
    if (this.state.search === "") {
      this.setState({ showButton: true });
    } 
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
    const { showButton } = this.state;
    return (
      <div>
        
        <div className="top-bar">
          <img
            className="header-icon"
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
          />
          <div className="header">Oompa Loompa's Crew</div>
        </div>

        <SearchBar
          newValue={this.state.search}
          onChange={this.onInputChange}
          onClick={this.hideButton.bind(this)}
          onBlur={this.showButton.bind(this)}
        />
        
        <h1>Find your Oompa Loompa</h1>
        <h2>There are more than 100k</h2>
        {console.log(this.state.search)}
        {this.props.oompas.total > 0 ? (
          <Fragment>
            <ul className="oompas-container">{this.renderOompas()}</ul>
            {showButton && (
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
            )}
          </Fragment>
        ) : (
          <p className="alert alert-danger alert-dismissible show">
            There are no Oompa Loompas available at the moment. Try again later.
          </p>
        )}
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
