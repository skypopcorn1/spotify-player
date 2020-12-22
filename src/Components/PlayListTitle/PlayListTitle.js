import React from 'react';
import './PlayListTitle.css';

class PlayListTitle extends React.Component {
  render() {
    return (
      <div className="PlayListTitle">
        <h2>{this.props.playlist.name}</h2>
        <p>{this.props.playlist.tracks.total} songs  |  <a href={this.props.playlist.external_urls.spotify} target="blank">Edit</a></p>
      </div>
    );
  }
}

export default PlayListTitle;
