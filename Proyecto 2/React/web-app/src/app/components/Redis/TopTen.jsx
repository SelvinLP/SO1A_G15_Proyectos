import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChartTop from '../MapChart/MapChartTop'
import DataCountry from '../../libs/data';
import { scaleLinear } from "d3-scale";

function colorScale(min, max, entrada){
    const color = scaleLinear()
        .domain([min, max])
        .range(["#ffcfc7", "#fc3312"]);

    return color(entrada);
}

const top = [
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

function AddIso(){
    let max = 0;
    let min = 0;
    max = top[0]["vacunados"]
    for (let index = 0; index < top.length; index++) {
        const d = DataCountry.find((s) => s.Name === top[index]["name"]);
        if(d !== undefined)
            top[index]["ISO3"] = d["ISO3"];
        if(index === 9)
            min = top[index]["vacunados"];
    }
    for (let index = 0; index < top.length; index++) {
        if(index < 10){
            top[index]["color"] = colorScale(min, max, top[index]["vacunados"]);
        }else{
            top[index]["color"] = "#17a14a";
        }
        
    }
    return top;
}

export default function TopTen(){
    const [content, setContent] = useState("");
    const [data, setData] = useState(AddIso());

    return (
        <div>
            <MapChartTop setTooltipContent={setContent} datos={data} tipo={1} />
            <ReactTooltip>{content}</ReactTooltip>    
        </div>
    );
}