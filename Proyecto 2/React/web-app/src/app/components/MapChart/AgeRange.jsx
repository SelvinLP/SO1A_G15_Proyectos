import { useState, useEffect } from 'react';
import CanvasJSReact from '../../libs/canvasjs.react';
import { getRangoEdades } from '../../services/redis';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

/*const list = [
    {
      "y": 25,
      "label": "11 - 20"
    },
    {
      "y": 46,
      "label": "31 - 40"
    },
  ];
*/
function arreglardatos(datos, country){
    let result = [];
    if(datos.length > 0){
        const location = datos.find((s) => s["location"] === country);
        if(location !== undefined){
            if(location["cero_diez"] > 0){
                result.push({
                    "y": location["cero_diez"],
                    "label": "1 - 10",
                })
            }
            if(location["diez_veinte"] > 0){
                result.push({
                    "y": location["diez_veinte"],
                    "label": "11 - 20",
                })
            }
            if(location["veinte_treinta"] > 0){
                result.push({
                    "y": location["veinte_treinta"],
                    "label": "21 - 30",
                })
            }
            if(location["treinta_cuarenta"] > 0){
                result.push({
                    "y": location["treinta_cuarenta"],
                    "label": "31 - 40",
                })
            }
            if(location["cuarenta_cincuenta"] > 0){
                result.push({
                    "y": location["cuarenta_cincuenta"],
                    "label": "41 - 50",
                })
            }
            if(location["cincuenta_sesenta"] > 0){
                result.push({
                    "y": location["cincuenta_sesenta"],
                    "label": "51 - 60",
                })
            }
            if(location["sesenta_setenta"] > 0){
                result.push({
                    "y": location["sesenta_setenta"],
                    "label": "61 - 70",
                })
            }
            if(location["setenta_ochenta"] > 0){
                result.push({
                    "y": location["setenta_ochenta"],
                    "label": "71 - 80",
                })
            }
            if(location["ochenta_noventa"] > 0){
                result.push({
                    "y": location["ochenta_noventa"],
                    "label": "81 - 90",
                })
            }
            if(location["noventa_cien"] > 0){
                result.push({
                    "y": location["noventa_cien"],
                    "label": "91+",
                })
            }

        }
    }
    return result;
}

export default function AgeRange({country}){
    const [list, setList] = useState([]);

    useEffect(() =>{
        getRangoEdades(country)
            .then((response)=>{
                setList(arreglardatos(response.data, country));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setList]);

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