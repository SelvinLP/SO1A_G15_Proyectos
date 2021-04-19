import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getProcesses } from "../../services/api";

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

export default class Processes extends React.Component{
    constructor(props){
        super(props);
        this.state = {list:[]}
    }

    componentDidMount() {
        this.timerID = setInterval( () => 
            this.loaderData(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    loaderData() {      
        getProcesses()
            .then((response)=>{
                this.setState({list: response.data});
            })
            .catch((error)=>{
                console.log("[T_T] Error en els servidor");
                console.log(error);
            });
    }

    render(){
        if(this.state.list.length > 0){
            return (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={this.state.list} columns={columns} />
                </div>
            )
        }else{
            return (
                <div>
                    Cargando datos....
                </div>
            )
        }
    }
}