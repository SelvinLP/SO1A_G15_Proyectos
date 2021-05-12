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

export default function MapChartTop({ setTooltipContent, datos, tipo }){
  const [data, setData] = useState([]);
  
  useEffect(() => {
    if(datos.length > 0){
      setData(datos);
    }else{
      setData(DataCountry)
    }
  }, []);
  
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
                        const { NAME } = geo.properties;
                        setTooltipContent(`${NAME} — ${rounded(d ? d["vacunados"] : 0 )}`);
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
