import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { datosAlmacenados } from "../../services/mongodb";

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

export default class DataBaseMongo extends React.Component {
  constructor(props){
    super(props);
    this.state = {list: []}
  }

  componentDidMount(){
    this.timerID = setInterval( () => 
      this.loaderData(), 
      3000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  loaderData(){
    datosAlmacenados()
      .then((res) => {
        this.setState({
          list: res.data  
        })
      })
      .catch((error) => {
        console.log("Error de respuesta", error);
      });
  }

  render(){
    return (
      <div style={{ height: 400, width: '100%', container: {maxHeight: 440, }, }}>
        <DataGrid rows={this.state.list} columns={columns} />
      </div>
    );
  }
}
