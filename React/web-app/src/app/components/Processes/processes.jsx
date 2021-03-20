import { DataGrid } from '@material-ui/data-grid';
import { getProcesses } from "../../services/api";
import { useState } from 'react';
import { useEffect } from 'react';

const columns = [
    {
        field: 'id',
        headerName: 'PID',
        type: 'number',
        width: 90,
    },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'fatherid', headerName: 'Father ID', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
];

export default function Processes() {
  const [list, setList] = useState([]);

  useEffect(() =>{
    getProcesses()
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
