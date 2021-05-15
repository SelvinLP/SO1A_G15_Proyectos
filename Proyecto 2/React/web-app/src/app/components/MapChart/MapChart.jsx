import React, { useEffect, useState, } from "react";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import DataCountry from '../../libs/data';
import DataDialog from './DataDialog';

import {getTopTen} from '../../services/redis';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
      .range(["#f7b0a6", "#ff5233"]);

  return color(entrada);
}

function AddIso(datos){
  for (let index = 0; index < datos.length; index++) {
      const d = DataCountry.find((s) => s.Name === datos[index]["location"]);
      if(d !== undefined)
          datos[index]["ISO3"] = d["ISO3"];
      datos[index]["color"] = colorScale(datos[datos.length - 1]["cont"], datos[0]["cont"], datos[index]["cont"]);
  }
  return datos;
}

export default function MapChart({ setTooltipContent, fontColor, tipo }){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [country, setCountry] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = geo => () => {
    setOpen(true);
    setCountry(geo);
    loaderData();
  };

  const loaderData = () =>{
    getTopTen()
      .then((res) => {
        setData(AddIso(res.data));
      })
      .catch((error) => {
        console.log("Error en el servidor", error);
      });
  }

  useEffect(() => {
    loaderData();
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
                      fill={d ? d["color"] : fontColor}
                      onMouseEnter={() => {
                        const { NAME } = geo.properties;
                        setTooltipContent(`${NAME} — ${rounded(d ? d["cont"] : 0)}`);
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
                      onClick={handleClick(geo.properties)}
                    />
                  );
                })
              }
            </Geographies>
          )}
        </ZoomableGroup>
      </ComposableMap>

      <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {country["NAME"]}
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                close
              </Button>
            </Toolbar>
          </AppBar>
          <div>
            <DataDialog typeData={tipo} country={country} />
          </div>
        </Dialog>
      </div>
    </>
  );
}
