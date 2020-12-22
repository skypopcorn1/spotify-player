const CLIENT_ID = 'b7eaa69122c44503bbb23c2592a9d5ed';
const REDIRECT_URI = "https://skypopcorn1.github.io/spotify-player/";
let userAccessToken;
const Spotify = {
  getAccessToken(){
    if(userAccessToken){
      return userAccessToken;
    }
    const url = window.location.href;
    console.log('url: ' + url);
    const returnedAccessToken = url.match(/access_token=([^&]*)/);
    if (returnedAccessToken) {
      userAccessToken = returnedAccessToken[1];
      const returnedExpiration = url.match(/expires_in=([^&]*)/);
      const expiresIn = returnedExpiration[1];
      console.log('token[1]: ' + userAccessToken);
      console.log('expires[1]: ' + expiresIn);

      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }


    if(!userAccessToken){
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      window.location = authUrl;
    }
  },

  async search(searchTerm){
    const searchUrl = "https://api.spotify.com/v1/search?type=track&q=" + searchTerm;
    const searchResults = await fetch( searchUrl, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      }
    })
    .then(response => response.json())
    .then(data => {
      const tracks = data.tracks.items;
      return tracks.map(track => {return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      };});
    });

    return searchResults;
  },

  async getPlaylists() {
    const accessToken = userAccessToken;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
    const userPlaylists = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: headers,
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      return data.items;
    });
    return userPlaylists;
  },

  async savePlaylist(playListName, trackUris){
    if (playListName && trackUris) {
      const accessToken = userAccessToken;
      console.log('accessToken:', accessToken);
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
      const userId = await fetch('https://api.spotify.com/v1/me', {
        headers: headers,
      }).then(response => response.json())
      .then(data => data.id);

      console.log('userId:', userId, ' playListName: ', playListName);

      let playListId = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({"name": playListName})
      }).then(response => response.json())
      .then(data => data.id);

      playListId = await fetch(`https://api.spotify.com/v1/playlists/${playListId}/tracks`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({uris: trackUris})
      }).then(response => response.json())
      .then(data => data.snapshot_id);
      console.log('playListId data:', playListId);
      return playListId;

    } else {
      return null;
    }
  },

}

export default Spotify;
