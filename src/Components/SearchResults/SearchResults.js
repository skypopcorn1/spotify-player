import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList isRemoval={false} onAdd={this.props.onAdd} results={this.props.results} />
      </div>
    );
  }
}

export default SearchResults;
