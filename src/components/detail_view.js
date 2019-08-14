import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOompa } from "../actions/index";

class DetailView extends Component {
  componentWillMount() {
    this.props.fetchOompa(this.props.match.params.oompaId);
  }

  render() {
    const { oompa } = this.props;

    if (!oompa) {
      return <div>Loading...</div>;
    }

    return (
      <Fragment>
        <div className="top-bar">
          <Link to="/" className="link">
            <img
              className="header-icon"
              src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
            />
          </Link>
          <Link to="/" className="link">
            <div className="header">Oompa Loompa's Crew /</div>
          </Link>
          <div className="header-name"> {oompa.first_name} {oompa.last_name}</div>
        </div>
        <div className="info-container">
          <img className="oompa-detail" src={oompa.image} />
          <div className="info">
            <p className="name">
              {oompa.first_name} {oompa.last_name}
            </p>
            <p className="gender">{oompa.gender === "F" ? "Woman" : "Man"}</p>
            <p className="profession">{oompa.profession}</p>
            <p className="description">{oompa.description}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { oompa: state.oompas.oompa };
}

export default connect(
  mapStateToProps,
  { fetchOompa }
)(DetailView);
