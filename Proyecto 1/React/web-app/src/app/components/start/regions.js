import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getRegions } from "../../services/api";
import { useState } from 'react';
import { useEffect } from 'react';

const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'infectednumber',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
];

export default function Regions() {
  const [list, setList] = useState([]);

  useEffect(() =>{
    getRegions()
      .then((response)=>{
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setList]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={list} columns={columns} sortModel={[{field: 'infectednumber', sort: 'desc'}]} />
    </div>
  );
}
