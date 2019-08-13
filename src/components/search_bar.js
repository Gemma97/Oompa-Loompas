import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className={"search-bar"}>
        <form className={"input-group"}>
          <input
            value={this.props.newValue}
            onChange={this.props.onChange}
            placeholder="Search"
            onClick={this.props.onClick}
            onBlur={this.props.onBlur}
          />
          <div className="divider"></div>
          <img
            className={"search-icon"}
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png"
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;