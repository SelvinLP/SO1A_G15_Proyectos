import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import CanvasJSReact  from "../../libs/canvasjs.react";
import { useState } from 'react';
import { useEffect } from 'react';
import AgeRange from './AgeRange';
import { GenerosData, LastFive } from '../../services/mongodb';

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

/*const list = [
    {"id": 1, "name": "Pablo Rodríguez", "location": "Guatemala","gender": "male", "age": 35, "vaccine_type": "Sputnik V"},
    {"id": 2, "name": "José Rodríguez", "location": "Mexico","gender": "male", "age": 25, "vaccine_type": "Sputnik V"},
    {"id": 3, "name": "Andres Rodríguez", "location": "Kenya","gender": "male", "age": 31, "vaccine_type": "Sputnik V"},
    {"id": 4, "name": "Cristian Rodríguez", "location": "Germany","gender": "male", "age": 35, "vaccine_type": "Sputnik V"},
    {"id": 5, "name": "Rosario Rodríguez", "location": "France","gender": "male", "age": 56, "vaccine_type": "Sputnik V"},
    {"id": 6, "name": "Antonio Rodríguez", "location": "Spain","gender": "male", "age": 87, "vaccine_type": "Sputnik V"},
    {"id": 7, "name": "Victor Rodríguez", "location": "Algeria","gender": "male", "age": 12, "vaccine_type": "Sputnik V"},
]

/*const chartPie = [
  {"y": 234,"label": "female"},
  {"y": 23,"label": "male"},
]*/

export default function DataDialog({typeData, country}) {
  const [list, setList] = useState([]);
  const [chartPie, setChartPie] = useState([]);

  useEffect(() =>{
    switch (typeData) {
      case 3:
        GenerosData(country["NAME_LONG"])
          .then((res) => {
            setChartPie(res.data)
          })
          .catch((error) => {
            console.log("Error en el server", error);
          });
        break;
      case 4:
        LastFive(country["NAME_LONG"])
          .then((response)=>{
            setList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      default:

        break;
    }
  }, []);

  const options = {
    theme: "dark2",
    animationEnabled: true,
    exportFileName: "graph",
    exportEnabled: true,
    title:{
        text: "Generos"
    },
    data: [{
        type: "pie",
        showInLegend: true,
        legendText: "{genero}",
        toolTipContent: "{genero}: <strong>{y}</strong>",
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        dataPoints: chartPie
    }]
  }

  if(typeData === 0){
    return (
      <div style={{ height: 400, width: '100%', container: {maxHeight: 440, }, }}>
        <DataGrid rows={list} columns={columns} />
      </div>
    );
  }else if(typeData === 2){
    return (
      <div>
        <h1>Consulta de vacunados</h1>
        <div style={{ height: 400, width: '100%', container: {maxHeight: 440, }, }}>
        <DataGrid rows={list} columns={columns} />
      </div>
      </div>
    )
  }else if(typeData === 3){
    return (
      <div>
			  <CanvasJSChart options = {options} />
		  </div>
    )
  }else if(typeData === 4){
    return (
      <div>
        <h1>Ultimos 5 vacunados</h1>
        <div style={{ height: 400, width: '100%', container: {maxHeight: 440, }, }}>
          <DataGrid rows={list} columns={columns} />
        </div>
      </div>
    )
  }else{
    return (
      <div>
        <AgeRange country={country["NAME_LONG"]} />
      </div>
    )
  }
  
}
