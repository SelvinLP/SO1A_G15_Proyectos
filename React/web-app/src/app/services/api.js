const axios = require('axios');

const API_URI = 'http://localhost:5000';

/**
 * @returns genaral dates, example 
  [
       {
            "id": 1,
            "name": "Urban Beldum",
            "location": "Escuintla",
            "age": 4,
            "infectedtype": "non-imported",
            "state": "symptomatic",
            "way": "RabbitMq"
        },
  ]
 */
export function getDatos(){
    return axios.get(`${API_URI}/data`);
}

/**
 * @returns genaral dates, example 
  [
       {
            "id": 1,
            "name": "Oriente",
            "infectednumber": 25,
        },
  ]
 */
export function getRegions(){
    return axios.get(`${API_URI}/regions`);
}