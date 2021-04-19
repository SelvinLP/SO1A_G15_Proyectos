import React from 'react';
import CanvasJSReact from '../../lib/canvasjs.react';
import { getRamPercentaje } from '../../services/api';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class RamPercentaje extends React.Component {
    constructor(props){
        super(props);
        this.state = {list:[], free:0}
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
        getRamPercentaje()
            .then((response)=>{
                this.setState({list: response.data,
                    free: response.data[0].y
                });
            })
            .catch((error)=>{
                console.log("[T_T] Error en els servidor");
                console.log(error);
            });
    }

	render() {
		const options = {
			animationEnabled: true,
			title: {
				text: "Porcentaje de utilización de la RAM"
			},
			subtitles: [{
				text: this.state.free + "% Free",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: this.state.list
			}]
		}
        if(this.state.list.length > 0){
            return (   
                <div>
                    <CanvasJSChart options = {options}/>
                </div>
            )
        }else{
            return (
                <div>
                    Cargando datos...
                </div>
            )
        }
		;
	}
}