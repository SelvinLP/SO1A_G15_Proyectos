const axios = require('axios');

const API_URI = 'https://us-central1-proyecto2sopes-311923.cloudfunctions.net';

export function getTopTen(){
    return axios.get(`${API_URI}/top-ten-dev-second`);
}

export function getRangoEdades(country){
    return axios.get(`${API_URI}/edades-dev-first`);
}