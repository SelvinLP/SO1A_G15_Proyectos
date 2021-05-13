const axios = require('axios');

const API_URI = 'http://34.72.16.244:3000';

export function datosAlmacenados(){
    return axios.get(`${API_URI}/data`);
}

export function GenerosData(country){
    return axios.post(`${API_URI}/genderfrompais`, {location:country});
}

export function LastFive(country){
    return axios.post(`${API_URI}/last5ingresspais`, {location:country});
}
