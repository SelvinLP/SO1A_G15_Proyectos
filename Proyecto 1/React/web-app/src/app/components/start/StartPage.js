import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getDatos } from "../../services/api";
import { useState } from 'react';
import { useEffect } from 'react';

const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'location', headerName: 'Location', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  { field: 'infectedtype', headerName: 'Type of infection', width: 130 },
  { field: 'state', headerName: 'State', width: 130 },
  { field: 'tipo', headerName: 'Way', width: 130 },
];

export default function StartPage() {
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={list} columns={columns} />
    </div>
  );
}
