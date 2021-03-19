const axios = require('axios');

const API_URI = 'http://localhost:5000';

/**
 * @returns genaral dates, example EL ULTIMO DE PRIMERO
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

/**
 * @returns 5 register with top of departaments top
[
    {
        "label": "Guatemala",
        "y": 175,
    }, ... 5
]
 */
export function getTopDepartaments(){
    return axios.get(`${API_URI}/topDepartaments`);
}

/**
 * @returns only 2 registers symptomatic, asymptomatic
[
    {
        "y": 234,
        "label": "symptomatic"
    }
]
 */
export function getStatePatients(){
    return axios.get(`${API_URI}/statepatients`);
}

export function getInfectedType(){
    return axios.get(`${API_URI}/infectedtype`);
}