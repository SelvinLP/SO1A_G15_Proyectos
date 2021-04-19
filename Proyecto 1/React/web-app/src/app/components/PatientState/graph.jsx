import CanvasJSReact  from "../../lib/canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function GraphDonut(props){
    const options = {
        theme: "dark2",
        animationEnabled: true,
        exportFileName: "graph",
        exportEnabled: true,
        title:{
            text: props.title
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints: props.data
        }]
    }

    return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
	);

}