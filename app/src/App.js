import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './App.css'

import WebPlayback from './WebPlayback';
import Login from './Login';


function App() {

  const [token, setToken] = useState(null);
  let api_address = ""
  if (process.env.NODE_ENV === "development") {
      api_address = "http://localhost:5000/auth"
  }
  let href_token = `${api_address}/token`
  useEffect(() => {
      fetch(href_token)
        .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const json = isJson? await response.json() : "";
          // check for err in response
          if(!response.ok) {
            // get error message from body or default to response status
            const error = (json && json.message) || response.status;
            return Promise.reject(error)
          };
          // Set access_token if found in response
          setToken(json.access_token);
        }).catch(error => {
          console.error("This ya boi Erron foulin' up yo bizzness:", error)
        });
    });

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={10}>
            <>
              { (token === null) ? <Login/> : <WebPlayback token={token} /> }
            </>
            <Text>
              Edit {token} <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
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
