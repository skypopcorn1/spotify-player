import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  render(){
    console.log('props.result: ' + this.props.results + ' isRemoval: ' + this.props.isRemoval);
    // let tracks = <h1> Heyo! Mutha fuckers</h1>;
    //
    // if(this.props.results){
    //   tracks = this.props.results.map(track=>{
    //     console.log('track name: ' + track.name);
    //     return <Track onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} name={track.name} artist={track.artist} album={track.album} />;
    //   });
    //   console.log('tracks: ' + tracks);
    // }

    return (
      <div className="TrackList">
        {this.props.results && this.props.results.map(track=>{
          console.log('track name: ' + track.name);
          return <Track onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} track={track} />;
        })}
      </div>
    );
  }
}

export default TrackList;
