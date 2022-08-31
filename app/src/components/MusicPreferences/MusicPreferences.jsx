import React, {useState, useEffect } from 'react';
import {
    Box,
    Text
} from '@chakra-ui/react';
import axios from 'axios'

export default function MusicPreferences(props) {
    
    const [userData, setUserData] = useState({})
    

    useEffect(() =>{
        const api = axios.create({
            baseURL: "https://api.spotify.com/v1",
            headers: {
                "Authorization": `Bearer ${props.token}`
            }  
        })
        // Logged in with no data? better get it!
        if (props.loggedIn && Object.keys(userData).length === 0) {
            let followedArtists, savedTracks = {}
            const artistsParams = new URLSearchParams({
                type: "artist",
                limit: 50
            })
            api.get(
                `me/following?${artistsParams.toString()}`
                ).then((res) => {
                    followedArtists = res.data.artists
                    console.log("followedArtists")
                    console.log(res.data)
                }).catch((error) => {
                    console.log(error)
                })
            const tracksParams = new URLSearchParams({
                limit: 50,
                offset: 0
            })
            api.get(
                `/me/tracks?${tracksParams.toString()}`
            ).then((res) => {
                savedTracks.push(res.data.items)
                while (res.data.next !== null) {
                    api.get(res.data.next).then((res) => {
                        savedTracks.push(res.data.items)
                    })
                }
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [ // List of dependencies that trigger the effect
        props.loggedIn,
        props.api,
        userData
    ])

    return (
        <Box>
            {(props.loggedIn === true) ? <Text>What kinda shit you like?</Text> : <Text>Shit outa luck bud...</Text>}
        </Box>
    );
}