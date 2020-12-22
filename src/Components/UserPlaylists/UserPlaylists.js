import React from 'react';
import PlayListTitle from '../PlayListTitle/PlayListTitle.js';
import './UserPlaylists.css';

class UserPlaylists extends React.Component {
  render () {
    console.log()
    return (
      <div className="UserPlaylists">
        <h2>My Playlists</h2>
        {this.props.playlists &&
          this.props.playlists.map( playlist =>
            <PlayListTitle key={playlist.id} playlist={playlist} />)
        }
      </div>
    );
  }
}

export default UserPlaylists;
