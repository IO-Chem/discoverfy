import React from 'react';
import {
    chakra,
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
        <Flex boxShadow="base" minWidth='max-content' alignItems='center' gap='4'>
            <Box p='2'>
                <Heading size='md' color="1ED760">Discoverfy</Heading>
            </Box>
            <Spacer />
            <>
            {(props.token === "") ?
                <Button as="a" leftIcon={<BLKSpotifyIcon />} variant="solid" colorScheme="green" color="blackAlpha.900" href={href_login}>
                    Login with Spotify
                </Button>
                :
                <Button leftIcon={<GRNSpotifyIcon />} variant="outline" colorScheme="green" _hover="none" _active="none" border="2px">
                    Logged in
                </Button>
            }
            </>
        </Flex>
    );
}
