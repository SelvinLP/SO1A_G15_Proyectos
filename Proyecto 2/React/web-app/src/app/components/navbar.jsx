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
import { faDatabase, faMemory, faHeadSideMask, faBinoculars, 
         faUserInjured, faChartPie, faChartBar } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import DataBaseMongo from './DataBase/DataBase';
import TopTen from './Redis/TopTen';
import VaccineCountry from './Redis/VaccineCountry';

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
      return <FontAwesomeIcon icon={faDatabase} style={{ color: '#ff0fa4' }} size="2x"/>;
    case 1:
      return <FontAwesomeIcon icon={faMemory} style={{ color: '#ff7634' }} size="2x" />;
    case 2:
      return <FontAwesomeIcon icon={faUserInjured} style={{ color: '#0d8000' }} size="2x" />;
    case 3:
      return <FontAwesomeIcon icon={faChartPie} style={{ color: '#84ff99' }} size="2x" />;
    case 4:
      return <FontAwesomeIcon icon={faHeadSideMask} style={{ color: '#ff2ae6' }} size="2x" />;
    case 5:
      return <FontAwesomeIcon icon={faChartBar} style={{ color: '#07e7ff' }} size="2x" />;
    default:
      return <FontAwesomeIcon icon={faBinoculars} style={{ color: '#eb5347' }} size="2x" />;
  }
}

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
              <ListItem button key="Datos MongoDB">
                <ListItemIcon><SwithcCase value={0} /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link> 
            {['Top Vacunados', 'Vacunados por País', 'Generos', 'Ultimos 5 Vacunados', 'Edades'].map((text, index) => (
              <Link className={classes.link} to={"page"+index}>
                <ListItem button key={text}>
                  <ListItemIcon><SwithcCase value={index + 1} /></ListItemIcon>
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
                <DataBaseMongo />
              </Route>
              <Route exact path="/page0" >  
                <TopTen />
              </Route>
              <Route exact path="/page1">
                <VaccineCountry tipo={2} />
              </Route>
              <Route exact path="/page2">
                <VaccineCountry tipo={3} />
              </Route>
              <Route exact path="/page3">
                <VaccineCountry tipo={4} />
              </Route>
              <Route exact path="/page4">
                <VaccineCountry tipo={5} />
              </Route>
            </Switch>
        </main> 
      </BrowserRouter>
      
    </div>
  );
}
