import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import MapChart from '../MapChart/MapChart';
import { scaleLinear } from "d3-scale";
import DataCountry from '../../libs/data';

let datos = [
    {"id": 1, "name": "China", "vacunados": 10000, },
    {"id": 2, "name": "Algeria", "vacunados": 9000, },
    {"id": 3, "name": "Ethiopia", "vacunados": 8000, },
    {"id": 4, "name": "Madagascar", "vacunados": 7000, },
    {"id": 5, "name": "Mexico", "vacunados": 6000, },
    {"id": 6, "name": "India", "vacunados": 5000, },
    {"id": 7, "name": "Australia", "vacunados": 4000, },
    {"id": 8, "name": "Spain", "vacunados": 3000, },
    {"id": 9, "name": "Germany", "vacunados": 2000, },
    {"id": 10, "name": "Mongolia", "vacunados": 1000, },
    {"id": 11, "name": "Uruguay", "vacunados": 900, },
    {"id": 12, "name": "Venezuela", "vacunados": 800, },
];

function colorScale(min, max, entrada){
    const color = scaleLinear()
        .domain([min, max])
        .range(["#ffedea", "#ff5233"]);

    return color(entrada);
}

function AddIso(){
    for (let index = 0; index < datos.length; index++) {
        const d = DataCountry.find((s) => s.Name === datos[index]["name"]);
        if(d !== undefined)
            datos[index]["ISO3"] = d["ISO3"];
        datos[index]["color"] = colorScale(datos[datos.length - 1]["vacunados"], datos[0]["vacunados"], datos[index]["vacunados"]);
    }
    return datos;
}

export default function VaccineCountry({tipo}){
    const [content, setContent] = useState("");
    const [data, s] = useState(AddIso())

    return (
        <div>
            <MapChart setTooltipContent={setContent} datos={data} fontColor={"#fae4e1"} tipo={tipo} />
            <ReactTooltip>{content}</ReactTooltip>    
        </div>
    )
}