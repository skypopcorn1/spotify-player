import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Spotify from '../../util/Spotify.js';
import Playlist from '../Playlist/Playlist.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.state = {
      playlistName: 'New Playlist',
      playlistTracks: [],
      searchResults: [],
    }
  }

  addTrack(track) {
    const playlistTracks = [ ...this.state.playlistTracks];
    console.log('playlistTracks:', playlistTracks);
    const filteredList = playlistTracks.filter(playlistTrack=>{
      return playlistTrack.id === track.id;
    });
    if(filteredList.length === 0){
      playlistTracks.push(track);
      this.setState({
        playlistTracks: playlistTracks
      });
    }
  }

  removeTrack(track){
    const playlistTracks = [ ...this.state.playlistTracks];
    const filteredList = playlistTracks.filter(playlistTrack=>{
      return playlistTrack.id === track.id;
    });
    if(filteredList){
      playlistTracks.forEach((trackToDelete, index)=>{
        if(trackToDelete.id === track.id){
          playlistTracks.splice(index, 1);
        }
      });
      this.setState({
        playlistTracks: playlistTracks
      })
    }
  }

  async search(searchTerm){
    console.log('search term: ' + searchTerm);
    const result = await Spotify.search(searchTerm);
    if(result){
      this.setState({
        searchResults: result,
      });
    } else {
      console.log('no result');
    }
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name,
    });
  }

  async savePlaylist(){
    const playListName = this.state.playlistName;
    const trackUris = this.state.playlistTracks.map(track => track.uri);

    const result = await Spotify.savePlaylist(playListName, trackUris);

    if(result){
      console.log('playlist ID:', result);
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
      });
    }
  }

  render(){
    Spotify.getAccessToken();

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              results={this.state.searchResults}
            />
            <Playlist
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              name={this.state.playlistName}
              onSave={this.savePlaylist}
              tracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
