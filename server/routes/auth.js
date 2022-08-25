import Router, { response } from 'express';
import cors from 'cors';
import request from 'request';
import { generateRandomString } from '../src/serverConfig'

// This module picks up .env variables in root of source folder
import dotenv from 'dotenv';
dotenv.config();

let router = Router();

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_key = process.env.SPOTIFY_CLIENT_SECRET
// explicitly state redirect uri, this is a white listed address
// that can be found and modified on Spotify's API service dashboard
let api_address = ""
if (process.env.NODE_ENV === "development") {
    api_address = "http://localhost:5000/auth"
}
let callback_uri = `${api_address}/callback`


var authResponse = null;

// Insert custum middleware for auth routes here
router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`);
  if (process.env.NODE_ENV === "development") {
    console.log("CORS Enabled")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  };
  next();
});

// Login to Spotify endpoint
router.get('/login', (req, res) => {
  // For more details on scope coverage visit
  // https://developer.spotify.com/documentation/general/guides/authorization/scopes/
  let scopes = [
    // "ugc-image-upload",            // write access for user provided images
    // "user-modify-playback-state",  // write access to playback state
    // "user-follow-modify",          // write/delete access to list of followed artists and users
    "user-read-recently-played",   // Read access to recently played tracks
    // "user-read-playback-position", // read access to playback position
    // "playlist-read-collaborative", // include collaborative playlists when requesting playlists
    // "app-remote-control",          // remote control plaback of Spotify (iOS/Android only)
    // "user-read-playback-state",    // read access to playback state
    // "user-read-email",             // read access to user's email address
    // "streaming",                   // control playback of Spotify track (Web Playback SDK only)
    "user-top-read",               // read access to top artists and tracks
    "playlist-modify-public",      // write access to pulic playlists
    // "user-library-modify",         // save/remove albums, tracks, and episodes
    "user-follow-read",            // read access to list of followed artists and other users
    "user-read-currently-playing", // read access to currently playing content
    "user-library-read",           // read access to library
    "playlist-read-private",       // read access to private playlists
    // "user-read-private",           // read access to subscription details (type of account)
    "playlist-modify-private",     // write access to private playslists
  ].join(' ');

  var state = generateRandomString(16);

  let auth_qparams = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scopes,
    redirect_uri: callback_uri,
    state: state,
  });
  res.redirect(
    "https://accounts.spotify.com/authorize/?" + auth_qparams.toString()
  );
});

// Callback from Login endpoint
router.get('/callback', (req, res) => {
  let code = req.query.code;
  let authString = `${client_id}:${client_key}`
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: callback_uri,
      grant_type: "authorization_code",
    },
    headers: {
      "Authorization": "Basic " + (Buffer.from(authString).toString("base64")),
      "ContentType": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      authResponse = body;
      res.redirect('http://localhost:3000/')
    } else {
      console.log(err)
    }
  });
});

// Endpoint to access token in JSON format
router.get('/token', (req, res) => {
  res.json({ authResponse: authResponse })
})

export default router;