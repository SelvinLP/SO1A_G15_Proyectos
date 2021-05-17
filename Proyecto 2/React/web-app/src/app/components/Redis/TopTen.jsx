import React, {useState} from "react";
import ReactTooltip from "react-tooltip";
import MapChartTop from '../MapChart/MapChartTop'

/*const top = [
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
*/

export default function TopTen(){
    const [content, setContent] = useState("");

    return (
        <div>
            <MapChartTop setTooltipContent={setContent} tipo={1} />
            <ReactTooltip>{content}</ReactTooltip>    
        </div>
    );
}