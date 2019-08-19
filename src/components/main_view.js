import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOompas } from "../actions/index";
import SearchBar from "./search_bar";
import {
  NO_RESULTS,
  HEADER,
  TITLE,
  SUBTITLE,
  SHOW_MORE,
  SHOW_LESS,
  NO_OOMPAS
} from "./strings";
import styles from "../../style/style.css";


class MainView extends Component {
  state = {
    search: "",
    oompasToShow: 15,
    expanded: false,
    showButton: true
  };

  componentWillMount() {
    this.props.fetchOompas();
  }

  onInputChange = event => {
    this.setState({ search: event.target.value });
  };

  hideButton = () => {
    this.setState({ showButton: false });
  };

  showButton = () => {
    if (this.state.search === "") {
      this.setState({ showButton: true });
    }
  };

  showMore = () => {
    this.state.oompasToShow === 15
      ? this.setState({
          oompasToShow: this.props.oompas.results.length,
          expanded: true
        })
      : this.setState({ oompasToShow: 15, expanded: false });
  };

  renderOompas() {
    const { search } = this.state;

    if (this.props.oompas.results) {
      let filteredOompas = this.props.oompas.results.filter(oompa => {
        return (
          (oompa.first_name.toLowerCase().indexOf(search.toLowerCase()) &&
            oompa.last_name.toLowerCase().indexOf(search.toLowerCase()) &&
            oompa.profession.toLowerCase().indexOf(search.toLowerCase())) !== -1
        );
      });

      if (filteredOompas.length === 0) {
        return (
          <p className="alert alert-danger alert-dismissible show">
            {NO_RESULTS}
          </p>
        );
      } else {
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
  }

  render() {
    const { showButton } = this.state;

    return (
      <div className={styles.body}>
        <div className="top-bar">
          <img
            className="header-icon"
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
          />
          <div className="header">{HEADER}</div>
        </div>

        <SearchBar
          newValue={this.state.search}
          onChange={this.onInputChange}
          onClick={this.hideButton}
          onBlur={this.showButton}
        />

        <h1>{TITLE}</h1>
        <h2>{SUBTITLE}</h2>
        {this.props.oompas.total > 0 ? (
          <Fragment>
            <ul className="oompas-container">{this.renderOompas()}</ul>

            {showButton && (
              <button
                className="btn btn-primary center-block"
                onClick={this.showMore}
              >
                {this.state.expanded ? (
                  <span>{SHOW_LESS}</span>
                ) : (
                  <span>{SHOW_MORE}</span>
                )}
              </button>
            )}
          </Fragment>
        ) : (
          <p className="alert alert-danger alert-dismissible show">
            {NO_OOMPAS}
          </p>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({ oompas: state.oompas.all }),
  { fetchOompas }
)(MainView);
