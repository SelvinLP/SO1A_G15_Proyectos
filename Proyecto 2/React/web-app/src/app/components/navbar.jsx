import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faUserInjured, faHome, faLungsVirus, faViruses, faHeadSideMask,
         faSyncAlt, faPercent, faBinoculars } from "@fortawesome/free-solid-svg-icons";

import ReactTooltip from "react-tooltip";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import MapChart from './MapChart/MapChart';
import DataBaseMongo from './DataBase/DataBase';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#ff8440',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: '#ffff72',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    background: '#ffc846',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    color: "black",
    outline: "none",
    textDecoration: "none"
  },
}));

function SwithcCase(props){
  switch(props.value) {
    case 0:
      return <FontAwesomeIcon icon={faHome} style={{ color: '#1f70cd' }} size="2x" />;
    case 1:
      return <FontAwesomeIcon icon={faDatabase} style={{ color: '#0861b9' }} size="2x"/>;
    case 2:
      return <FontAwesomeIcon icon={faUserInjured} style={{ color: 'red' }} size="2x" />;
    case 3:
      return <FontAwesomeIcon icon={faLungsVirus} style={{ color: 'red' }} size="2x" />;
    case 4:
      return <FontAwesomeIcon icon={faViruses} style={{ color: 'red' }} size="2x" />;
    case 5:
      return <FontAwesomeIcon icon={faHeadSideMask} style={{ color: 'red' }} size="2x" />;
    case 6:
      return <FontAwesomeIcon icon={faSyncAlt} style={{ color: '#3498DB' }} size="2x" />;
    case 7:
      return <FontAwesomeIcon icon={faPercent} style={{ color: '#3498DB' }} size="2x" />;
    default:
      return <FontAwesomeIcon icon={faBinoculars} style={{ color: '#3498DB' }} size="2x" />;
  }
}

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            COVID-19 en el Mundo
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link className={classes.link} to="/">
              <ListItem button key="home">
                <ListItemIcon><SwithcCase value={0} /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link> 
            {['MongoDB', 'Top Vacunados', 'Vacunados por País', 'Generos', 'Ultimos 5 Vacunados'].map((text, index) => (
              <Link className={classes.link} to={"page"+index}>
                <ListItem button key={text}>
                  <ListItemIcon><SwithcCase value={index + 1} /></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>  
            ))}
          </List>
          <Divider />
          <List>
            {['Edades', 'Mapa interactivo', 'Utilización de RAM'].map((text, index) => (
              <Link className={classes.link} to={"page"+(index+5)}>
                <ListItem button key={text}>
                  <ListItemIcon><SwithcCase value={index + 6} /></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link> 
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" >
                <div>
                    <MapChart setTooltipContent={setContent} />
                    <ReactTooltip>{content}</ReactTooltip>    
                </div>
              </Route>
              <Route exact path="/page0" >  
                <div>
                    <DataBaseMongo />
                </div>
              </Route>
              <Route exact path="/page1">
                part 2
              </Route>
              <Route exact path="/page2">
                2
              </Route>
              <Route exact path="/page3">
                <h1><strong>Ultimos 5 Casos registrados</strong> </h1>
                
              </Route>
              <Route exact path="/page4">
                4
              </Route>
              <Route exact path="/page5">
                5
              </Route>
              <Route exact path="/page6">
                6
              </Route>
              <Route exact path="/page7">
                7
              </Route>
            </Switch>
        </main> 
      </BrowserRouter>
      
    </div>
  );
}
