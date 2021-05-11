import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import CanvasJSReact  from "../../libs/canvasjs.react";
//import { getDatos } from "../../services/api";
import { useState } from 'react';
import { useEffect } from 'react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

const chartPie = [
  {"y": 234,"label": "female"},
  {"y": 23,"label": "male"},
]

export default function DataDialog({typeData}) {
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
const options = {
  theme: "dark2",
  animationEnabled: true,
  exportFileName: "graph",
  exportEnabled: true,
  title:{
      text:" props.title"
  },
  data: [{
      type: "pie",
      showInLegend: true,
      legendText: "{label}",
      toolTipContent: "{label}: <strong>{y}%</strong>",
      indexLabel: "{y}%",
      indexLabelPlacement: "inside",
      dataPoints: chartPie
  }]
}

  if(typeData == 0){
    return (
      <div style={{ height: 400, width: '100%', container: {maxHeight: 440, }, }}>
        <DataGrid rows={list} columns={columns} />
      </div>
    );
  }else if(typeData == 2){
    return (
      <div>
        <h1>Hola a ver que pex</h1>
      </div>
    )
  }else if(typeData == 3){
    return (
      <div>
			  <CanvasJSChart options = {options} />
		  </div>
    )
  }
  
}
