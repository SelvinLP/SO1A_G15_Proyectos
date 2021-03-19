import React from 'react';
import CanvasJSReact from "../../lib/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphTop = ({dataDepartaments}) => {
    var dataPoint;
    var total;
    const options = {
        theme: "dark2",
        animationEnabled: true,
        title:{
            text: "Los 5 departamentos más infectados"
        },
        data: [{
            type: "funnel",
            indexLabel: "{label} - {y}",
            toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
            neckWidth: 20,
            neckHeight: 0,
            valueRepresents: "area",
            dataPoints: dataDepartaments
        }]
    }
    //calculate percentage
    dataPoint = options.data[0].dataPoints;
    total = dataPoint[0].y;
    for(var i = 0; i < dataPoint.length; i++) {
        if(i == 0) {
            options.data[0].dataPoints[i].percentage = 100;
        } else {
            options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
        }
    }
    //calculate percentage
    dataPoint = options.data[0].dataPoints;
    total = dataPoint[0].amount;
    for(let i = 0; i < dataPoint.length; i++) {
        if(i === 0) {
            options.data[0].dataPoints[i].percentage = 100;
        } else {
            options.data[0].dataPoints[i].percentage = ((dataPoint[i].amount / total) * 100).toFixed(2);
        }
    }

    return (
        <div>
            {console.log(dataDepartaments)}
            <CanvasJSChart options = {options}/>
        </div>
    );
}

export default GraphTop;