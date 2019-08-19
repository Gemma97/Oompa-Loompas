import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    const { newValue, onChange, onClick, onBlur } = this.props;
    return (
      <div className="search-bar">
        <form className="input-group">
          <input
            value={newValue}
            onChange={onChange}
            placeholder="Search"
            onClick={onClick}
            onBlur={onBlur}
          />
          <div className="divider"></div>
          <img
            className="search-icon"
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png"
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;