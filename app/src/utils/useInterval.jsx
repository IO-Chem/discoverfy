import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
    // makes reference for this instance of useInterval
    const savedCallback = useRef();
    useEffect(
        () => {
            // rememeber last callback
            savedCallback.current = callback;
        },
        [ callback ]
    );

    // set up interval
    useEffect(
        () => {
            function tickFunction() {
                savedCallback.current();
            }
            if (delay !== null) {
                const id = setInterval(tickFunction, delay);
                return () => { clearInterval(id); }
            }
    }, [
        callback,
        delay
    ]);
}