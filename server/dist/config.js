"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scopes = exports.redirect_uri = exports.client_id = exports.auth_endpoint = void 0;
var auth_endpoint = "https://accounts.spotify.com/authorize";
exports.auth_endpoint = auth_endpoint;
var client_id = "797eb26e2ddf469584ea5a4f01a3fa07";
exports.client_id = client_id;
var redirect_uri = "http://localhost:3000/auth/callback";
exports.redirect_uri = redirect_uri;
var scopes = ["user-read-recently-played", "playlist-read-collaborative", "user-read-email", "streaming", "user-top-read", "playlist-modify-public", "user-follow-read", "user-library-read", "playlist-read-private", "playlist-modify-private", "user-read-private"];
exports.scopes = scopes;