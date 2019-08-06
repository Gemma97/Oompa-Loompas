import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DetailView extends Component {
  render() {
    return (
      <div className={"top-bar"}>
        <img
          className={"oompa-icon"}
          src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
        />
        <Link to="/" className="link">
        Oompa Loompa's Crew
        </Link>
      </div>
    );
  }
}

export default DetailView;