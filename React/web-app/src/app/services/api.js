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
            "tipo": "RabbitMq"
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

/**
 * @returns type of infection
[
    {
        "y": 25, 
        "label": "non-imported"
    },
]
 */
export function getInfectedType(){
    return axios.get(`${API_URI}/infectedtype`);
}

/**
 * @returns number of patient by age range 
[
  {
    "y": 25,
    "label": "11 - 20"
  },
  {
    "y": 46,
    "label": "31 - 40"
  },
]
 */
export function getAgeRange(){
    return axios.get(`${API_URI}/agerange`);
}

/**
 * 
 * @returns processes
[
  {
    "pid": "1",
    "name": "system",
    "fatherid": "-",
    "status": "running"
  },
  {
    "pid": "2",
    "name": "gui",
    "fatherid": "-",
    "status": "running"
  },
  
]
 */
export function getProcesses(){
    return axios.get(`${API_URI}/processes`);
}

/**
 * 
 * @returns 
[
  {
    "name": "libre",
    "y": 75
  },
  {
    "name": "usado",
    "y": 25
  }
]
 */
export function getRamPercentaje(){
    return axios.get(`${API_URI}/rampercentaje`);
}

/**
 * 
 * @returns 
 * {
 *      y: 5
 * }
 */
export function getRamPolygon(){
    return axios.get(`${API_URI}/rampolygon`);
}