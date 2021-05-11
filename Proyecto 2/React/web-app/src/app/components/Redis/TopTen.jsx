import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from '../MapChart/MapChart'

const top = [
    {"id": 1, "name": "China", "parameter": 15200, "ISO3": "CHN", },
    {"id": 2, "name": "Algeria", "parameter": 1520, "ISO3": "DZA", },
    {"id": 3, "name": "Ethiopia", "parameter": 152, "ISO3": "ETH",},
    {"id": 4, "name": "Madagascar", "parameter": 15, "ISO3": "MDG",},
    {"id": 5, "name": "Mexico", "parameter": 1, "ISO3": "MEX", },
    {"id": 6, "name": "India", "parameter": 12,"ISO3": "IND",},
    {"id": 7, "name": "Australia", "parameter": 123, "ISO3": "AUS",},
    {"id": 8, "name": "Spain", "parameter": 1234, "ISO3": "ESP",},
    {"id": 9, "name": "Germany", "parameter": 12345, "ISO3": "DEU",},
    {"id": 10, "name": "Mongolia", "parameter": 123456, "ISO3": "MNG",},
];

export default function TopTen(){
    const [content, setContent] = useState("");

    return (
        <div>
            <MapChart setTooltipContent={setContent} datos={top} fontColor={"#17a14a"} />
            <ReactTooltip>{content}</ReactTooltip>    
        </div>
    );
}