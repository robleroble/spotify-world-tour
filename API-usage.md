# Spotify World Tour

## Spotify API usage & routes

## **Browse API calls**

**Get new releases/featured playlists/category playlists**

By clicking on a country, will get list of new releases. It appears that this returns a list of albums or playlists, so I'd have to chain on another API call to get the tracks for that specific album or playlist. When clicking countries, there will be filters to narrow down search results (using spotify's categories)

I might try to use some random number generator to offset the API results so that it doesn't return the same album/playlist each time.

    HTTP method: GET

    Endpoints:
        New Releases: /v1/browse/new-releases
        Featured Playlists: /v1/browse/featured-playlists
        Category Playlists: /v1/browse/categories/{category_id}/playlists

    Query parameters: country, offset (to randomize results)

## **Album API calls**

**Getting album's tracks**

When user retrieves an album, app must retrieve the tracks for album to generate on screen.

    HTTP method: GET

    Endpoint: /v1/albums/{id}/tracks

## **Playlist API calls**

**Getting a playlist**

When user clicks a country and selects filter that gets playlists, app must get the tracks for that playlist to appear on screen.

Later, when users have created playlists on this app, this can be used for users to get their old playlists to edit them (hoping to store playlist ID's in local storage for temporary use).

    HTTP method: GET

    Endpoint: /v1/playlists/{playlist_id}/tracks

**Creating a playlist**

User clicks a button that prompts them with a simple form with inputs for name and description.

    HTTP method: POST

    Endpoint: https://api.spotify.com/v1/users/{user_id}/playlists

    Request body:
    {
    "name": "New Playlist",
    "description": "New playlist description",
    "public": false
    }

**Adding songs to playlist**

When user selects countries and filters, list of songs will populate on screen. Each song will have button to add to current playlist (stretch goal to add drag and drop to put songs in playlist from a regular queue of songs).

    HTTP method: POST

    Endpoint: https://api.spotify.com/v1/playlists/{playlist_id}/tracks

    Requires comma-separated list of uri's to be passed to add to playlist

**Rearranging songs in playlist (stretch goal)**

User can re-arrange playlist songs to edit playlist. We will actually just be replacing the old playlist with the newly ordered playlist. Idea is to use drag and drop to allow users to change order.

    HTTP method: PUT

    Endpoint: /v1/playlists/{playlist_id}/tracks

    Requires an array of track uri's.

**Deleting songs from playlist**

User can remove songs from playlist (with button or some drag functionality).

    HTTP method: DELETE

    Endpoint: /v1/playlists/{playlist_id}/tracks

    Requires array of track objects with uri's

_Deleting playlists is not possible with the spotify web API_

_all endpoints and spotify API info retrieved from https://developer.spotify.com/console/_
