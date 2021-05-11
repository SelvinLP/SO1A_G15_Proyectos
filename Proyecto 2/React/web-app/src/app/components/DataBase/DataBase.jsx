import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
//import { getDatos } from "../../services/api";
import { useState } from 'react';
import { useEffect } from 'react';

const columns = [
  { key: 'id'},
  { field: 'name', headerName: 'Name', width: 260 },
  { field: 'location', headerName: 'Location', width: 175 },
  { field: 'gender', headerName: 'Gender', width: 150 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  { field: 'vaccine_type', headerName: 'Vaccine Type', width: 230 },
];

const list = [
    {"id": 1, "name": "Pablo Rodríguez", "location": "Guatemala","gender": "male", "age": 35, "vaccine_type": "Sputnik V"},
    {"id": 2, "name": "José Rodríguez", "location": "Mexico","gender": "male", "age": 25, "vaccine_type": "Sputnik V"},
    {"id": 3, "name": "Andres Rodríguez", "location": "Kenya","gender": "male", "age": 31, "vaccine_type": "Sputnik V"},
    {"id": 4, "name": "Cristian Rodríguez", "location": "Germany","gender": "male", "age": 35, "vaccine_type": "Sputnik V"},
    {"id": 5, "name": "Rosario Rodríguez", "location": "France","gender": "male", "age": 56, "vaccine_type": "Sputnik V"},
    {"id": 6, "name": "Antonio Rodríguez", "location": "Spain","gender": "male", "age": 87, "vaccine_type": "Sputnik V"},
    {"id": 7, "name": "Victor Rodríguez", "location": "Algeria","gender": "male", "age": 12, "vaccine_type": "Sputnik V"},
]

export default function DataBaseMongo() {
/*
  const [list, setList] = useState([]);
  useEffect(() =>{
    getDatos()
      .then((response)=>{
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setList]);
*/
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={list} columns={columns} />
    </div>
  );
}
