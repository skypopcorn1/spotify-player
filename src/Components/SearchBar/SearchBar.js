import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchTerm: '',
    }
  }

  handleTermChange(e){
    this.setState({
      searchTerm: e.target.value,
    })
  }

  search(){
    console.log('searching: ' + this.state.searchTerm);
    this.props.onSearch(this.state.searchTerm);
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <button onClick={this.search} className="SearchButton">SEARCH</button>
      </div>
    );
  }
}

export default SearchBar;
