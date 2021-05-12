import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
//import { getDatos } from "../../services/api";
import { useState } from 'react';
import { useEffect } from 'react';

import trafficTest from '../../libs/data2';

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

let list = [];

function addId(){
  for (let index = 0; index < trafficTest.length; index++) {
    trafficTest[index]["id"] = index;
  }
  list = trafficTest;
  console.log(list[0]);
}

export default function DataBaseMongo() {
  addId();
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
    <div style={{ height: 400, width: '100%', container: {maxHeight: 440, }, }}>
      <DataGrid rows={list} columns={columns} />
    </div>
  );
}
