import { useEffect } from 'react';
import { useState } from 'react';
import CanvasJSReact from '../../libs/canvasjs.react';
//import { getAgeRange } from '../../services/api';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const list = [
    {
      "y": 25,
      "label": "11 - 20"
    },
    {
      "y": 46,
      "label": "31 - 40"
    },
  ];

export default function AgeRange({country}){
    /*const [list, setList] = useState([]);

    useEffect(() =>{
        getAgeRange()
            .then((response)=>{
                setList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setList]);
    */

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", //"light1", "dark1", "dark2"
        title:{
            text: "Rango de edades"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: list
        }]
    }

    return (
		<div>
			<CanvasJSChart options = {options}/>
		</div>
	);
}