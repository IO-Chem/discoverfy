import { Router } from 'express';
import { generateRandomString } from '../src/serverConfig'

let router = Router();

// Insert custum middleware for auth routes here
router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`)
  next()
})

// Login to Spotify endpoint
router.get('/login', (req, res) => {
  res.send('respond with a resource');
});

// Callback from Login endpoint
router.get('/callback', (req, res) => {
})

export default router;
