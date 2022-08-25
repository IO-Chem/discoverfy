import React from 'react';

function Login() {
    
    let api_address = ""
    if (process.env.NODE_ENV === "development") {
        api_address = "http://localhost:5000/auth"
    }
    let href_login = `${api_address}/login`
    return (
        <div className="App">
            <header className="App-header">
                <a className="btn-spotify" href={href_login}>
                    Login with Spotify
                </a>
            </header>
        </div>
    );
}

export default Login;