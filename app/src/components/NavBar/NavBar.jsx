import React from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    Spacer,
} from '@chakra-ui/react';

import BLKSpotifyIcon from './Parts/BLKSpotifyIcon';
import GRNSpotifyIcon from './Parts/GRNSpotifyIcon';

export default function NavBar(props) {

    let api_address = ""
    if (process.env.NODE_ENV === "development") {
        api_address = "http://localhost:5000/auth"
    }
    let href_login = `${api_address}/login`

    return (
        <Flex minWidth='max-content' alignItems='center' gap='4' bgGradient="linear(to-r, green.500 20%, purple.700, black 80%)">
            <Box pl="5">
                <Heading size="lg" fontFamily="trebuchet ms" letterSpacing="10px" bgGradient="linear(to-r, purple.600, black 80%)" bgClip="text" fontWeight="extrabold">
                    Discoverfy
                </Heading>
            </Box>
            <Spacer />
            <Box p='3'>
            {(props.loggedIn === false) ?
                <Button as="a" leftIcon={<BLKSpotifyIcon />} variant="solid" colorScheme="green" href={href_login} color="black">
                    Login with Spotify
                </Button>
                :
                <Button leftIcon={<GRNSpotifyIcon />} variant="outline" colorScheme="green" _hover="none" _active="none" border="2px">
                    Logged in
                </Button>
            }
            </Box>
        </Flex>
    );
}
