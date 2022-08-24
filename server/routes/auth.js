import Router, { response } from 'express';
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
const rdr_uri = "http://localhost:5000/auth/callback"
var access_token = null;

// Insert custum middleware for auth routes here
router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`)
  next()
})

// Login to Spotify endpoint
router.get('/login', (req, res) => {
  // For more details on scope coverage visit
  // https://developer.spotify.com/documentation/general/guides/authorization/scopes/
  let scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
  ].join(' ');

  var state = generateRandomString(16);

  let auth_qparams = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scopes,
    redirect_uri: rdr_uri,
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
      redirect_uri: rdr_uri,
      grant_type: "authorization_code",
    },
    headers: {
      "Authorization": "Basic " + (Buffer.from(authString).toString("base64")),
      "ContentType": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      access_token = body.access_token;
      console.log(access_token)
      res.redirect('http://localhost:3000/')
    }
  });
});

// Endpoint to access token in JSON format
router.get('/token', (req, res) => {
  res.json({ access_token: access_token })
})
export default router;
