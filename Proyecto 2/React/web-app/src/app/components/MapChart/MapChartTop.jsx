import { scaleLinear } from "d3-scale";
import React, { useEffect, useState, } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";

import DataCountry from '../../libs/data';
import { getTopTen } from '../../services/redis';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else if (num > 1000) {
    return Math.round(num / 100) / 10 + "K";
  } else {
    return num;
  }
}

function colorScale(min, max, entrada){
  const color = scaleLinear()
      .domain([min, max])
      .range(["#ffcfc7", "#fc3312"]);

  return color(entrada);
}

function AddIso(top){
  let max = 0;
  let min = 0;
  max = top[0]["cont"]
  for (let index = 0; index < top.length; index++) {
      const d = DataCountry.find((s) => s.Name === top[index]["location"]);
      if(d !== undefined)
          top[index]["ISO3"] = d["ISO3"];
      if(index === 9)
          min = top[index]["cont"];
  }
  for (let index = 0; index < top.length; index++) {
      if(index < 10){
          top[index]["color"] = colorScale(min, max, top[index]["cont"]);
      }else{
          top[index]["color"] = "#17a14a";
      }
      
  }
  return top;
}

export default function MapChartTop({ setTooltipContent }){
  const [data, setData] = useState([{}]);
  
  const loaderData = () => {
    getTopTen()
      .then((res) => {
          setData(AddIso(res.data));
      })
      .catch((error) => {
          console.log("Error en el servidor", error);
      });
  }
  
  useEffect(()=>{
    loaderData();
  },[]);

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}>
        <ZoomableGroup>
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          {data.length > 0 && (
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d ? d["color"] : '#17a14a'}
                      onMouseEnter={() => {
                        loaderData();
                        const { NAME } = geo.properties;
                        setTooltipContent(`${NAME} — ${rounded(d ? d["cont"] : 0 )}`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        hover: {
                          fill: "#00b5c0",
                          outline: "none"
                        },
                        pressed: {
                          fill: "#00b5c0",
                          outline: "none"
                        }
                      }}
                      
                    />
                  );
                })
              }
            </Geographies>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
}
