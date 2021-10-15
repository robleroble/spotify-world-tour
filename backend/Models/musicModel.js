const SpotifyApiCaller = require("../SpotifyAPICaller");

class Music {
  /** Requires:
   *
   * - country code
   * - randomly generate offset
   * - playlist or album
   *      -playlists can take category
   *
   * ** need to research different spotify browse API calls
   *
   */
  static async getFeaturedPlaylist(data) {
    const { country } = data;
    const offset = Math.floor(Math.random() * 20) + 1;

    // Need to filter out data that I need
    const featuredPlaylist = await SpotifyApiCaller.getFeaturedPlaylist(
      country,
      offset
    );

    // return featuredPlaylist;

    // get 20 track URI's from playlist
    let trackURIs = [];
    for (let item of featuredPlaylist) {
      console.log(item.track.uri);
      trackURIs.push(item.track.uri);
    }
    console.log(trackURIs);
    // console.log("hi");
    return trackURIs;
  }

  static async getPlaylistByCategory(data) {
    const { country, category_id } = data;
    const offset = Math.floor(Math.random() * 20) + 1;

    const playlist = await SpotifyApiCaller.getPlaylistByCategory(
      country,
      category_id,
      offset
    );
    return playlist;
  }

  static async getAlbumNewReleases(data) {
    const { country } = data;
    const offset = Math.floor(Math.random() * 20) + 1;

    const albums = await SpotifyApiCaller.getAlbumNewReleases(country, offset);
    return albums;
  }
}

module.exports = Music;
