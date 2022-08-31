import React, { useState, useEffect } from 'react';
import {
  Box,
  Center,
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import theme from './styles/Theme';
import NavBar from './components/NavBar';
import MusicPreferences from './components/MusicPreferences'

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expiresAt, setExpiresAt] = useState(Date.now() - 100000);
  
  // determine address for auth calls depending on
  // what NODE_ENV is set to
  let auth_address = ""
  if (process.env.NODE_ENV === "development") {
      auth_address = "http://localhost:5000/auth"
  }

  // looks for auth response from auth/token address on express server
  useEffect(() => {
    // this will trigger on initialization of app or expiration of token
    if (Date.now() > expiresAt) {
      // request a new token if refresh token missing
      fetch(`${auth_address}/token`)
        .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const json = isJson? await response.json() : "";
          // check for err in response
          if(!response.ok) {
            // get error message from body or default to response status
            const error = (json && json.message) || response.status;
            return Promise.reject(error)
          };
          // start refresh sequence 15 seconds before actual expiration of token
          let expiry_time = Date.now() + 1000 * (json.authResponse.expires_in - 15)
          setExpiresAt(expiry_time);
          // Set access_token if found in response
          setAccessToken(json.authResponse.access_token);
          setIsLoggedIn(true)
        }).catch(err => {
          console.error("This ya boi erra foulin' up ya bizznis:", err)
        });    
    }
  });

  return (
    <ChakraProvider theme={theme}>
      <NavBar loggedIn={isLoggedIn}></NavBar>
      <Center>
        <Box m="1" w="100%" h="xl" borderColor="gray" borderWidth="2px" borderRadius="md">
          <Tabs isLazy isFitted defaultIndex={0} colorScheme="purple">
            <TabList>
              <Tab>Music Preferences</Tab>
              <Tab>Discover New Artists</Tab>
              <Tab>Build / Manage Playlist</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <MusicPreferences token={accessToken} loggedIn={isLoggedIn}>
                </MusicPreferences>
              </TabPanel>
              <TabPanel>

              </TabPanel>
              <TabPanel>

              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
