import React from 'react';

const API_KEY= process.env.REACT_APP_API_KEY
const API_URL= process.env.REACT_APP_API_URL


const ApiMovie = () => {
    
    
    
    return (
        <div>
            <h1>ApiMovie</h1>
            <p>API_KEY = {API_KEY}</p>
            <p>API_URL = {API_URL}</p>
        </div>
    );
};

export default ApiMovie;