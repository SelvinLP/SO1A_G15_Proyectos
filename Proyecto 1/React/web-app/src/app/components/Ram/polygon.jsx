/* App.js */
import React from 'react';
import CanvasJSReact from '../../lib/canvasjs.react';
import { getRamPolygon } from '../../services/api';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class RamPolygon extends React.Component {
    constructor(props){
        super(props);
        this.state = {list:[], xVal:0}
    }

    componentDidMount(){
        this.timerID = setInterval( () => 
            this.loaderData(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    loaderData(){
        getRamPolygon()
            .then((response)=>{
                this.setState(state => {
                    const list = [...state.list, {x:state.xVal, y:response.data.y}];
                    const xVal = state.xVal+1;
                    return{
                        list,
                        xVal
                    }
                })
                if(this.state.list.length === 40){
                    this.state.list.shift();
                }
            })
            .catch((error)=>{
                console.log("[T_T] Error en els servidor");
                console.log(error);
            });
    }

	render() {
		const options = {
			animationEnabled: true,
			title:{
				text: "Rendimiento de memoria"
			},
            axisX:{
                title: "Segundos Activos"
            },
			data: [{
				type: "area",
				dataPoints: this.state.list
			}]
		}
        if(this.state.list.length >0){
            return (
                <div>
                    <CanvasJSChart options = {options}/>
                </div>
            );
        }else{
            return (
                <div>Cargando datos...</div>
            )
        }
		
	}
}