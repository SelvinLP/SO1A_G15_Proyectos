import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import MapChart from '../MapChart/MapChart';

export default function VaccineCountry(){
    const [content, setContent] = useState("");

    return (
        <div>
            <MapChart setTooltipContent={setContent} datos={{}} fontColor={"#17a14a"} tipo={3} />
            <ReactTooltip>{content}</ReactTooltip>    
        </div>
    )
}