import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component {

  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    console.log('target: ' + e.target.value);
    this.props.onNameChange(e.target.value);
  }

  // handleButtonClick(){}

  render(){
    console.log('Playlist rendering: ', this.props.tracks);
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} value={this.props.name}/>
        <TrackList onRemove={this.props.onRemove} isRemoval={true} results={this.props.tracks} />
        <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;
