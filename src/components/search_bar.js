import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
 }

  render() {
    return (
      <div className={"search-bar"}>
        <form className={"input-group"}>
          <input 
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
          />
          <img
            className={"search-icon"}
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png"
          />
        </form>
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
