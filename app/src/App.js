import React, { useState, useEffect } from 'react';
import { ColorModeSwitcher } from './utils/ColorModeSwitcher';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import './App.css'

import Login from './components/Login';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(Date.now());
  // determine address for auth calls depending on
  // what NODE_ENV is set to
  let api_address = ""
  if (process.env.NODE_ENV === "development") {
      api_address = "http://localhost:5000/auth"
  }

  // looks for auth response from auth/token address on express server
  useEffect(() => {
    // this will trigger on initialization of app or expiration of token
    if (Date.now() > expiresAt) {
      // request a new token if refresh token missing
      fetch(`${api_address}/token`)
        .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const json = isJson? await response.json() : "";
          // check for err in response
          if(!response.ok) {
            // get error message from body or default to response status
            const error = (json && json.message) || response.status;
            return Promise.reject(error)
          };
          console.log(json)
          // start refresh sequence 15 seconds before actual expiration of token
          let expiry_time = Date.now() + 1000 * (json.authResponse.expires_in - 15)
          setExpiresAt(expiry_time);
          // Set access_token if found in response
          setAccessToken(json.authResponse.access_token);
        }).catch(err => {
          console.error("This ya boi erra foulin' up ya bizznis:", err)
        });
    }      
  });

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={10}>
            <>
              { 
                (accessToken === null) ?
                  <Login/>
                  :
                  <Text token={accessToken}>{accessToken}</Text>
              }
            </>
            <Text>
              with Hot Reload all up inya face from a containerized place...
            </Text>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
