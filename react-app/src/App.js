import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types';
import './App.css'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Menu';
import dist_url from '../assets/dist.svg';
import graph_url from '../assets/graph.svg';

//animation 
import Anime from 'animejs'
const styles = {
  card: { 
    width: '70%',
    maxWidth: '600px',
    minHeight: '30%',
    left: '50%',
    top: '40%',
    transform: 'translate(-50%, -80%)',
    position: 'absolute',
    borderRadius: '24px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
    transition: 'box-shadow 0.3s ease-in-out',
    "&:hover": {
      boxShadow: '0 5px 15px rgba(0,0,0,0.18)',
      cursor: 'pointer',
    }
  },
  card_2: {
    width: '70%',
    maxWidth: '600px',
    minHeight: '30%',
    left: '50%',
    top: '40%',
    transform: 'translate(-50%, 30%)',
    position: 'absolute',
    borderRadius: '24px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function animateLogoDown(){
  Anime({
    targets: '.path_1',
    translateY: 10,
    duration: 1300,
    direction: "alternate",
    loop: true,
    elasticity: 600,
    easing: "easeOutElastic"
  });
  Anime({
    targets: '.path_2',
    translateY: 7,
    duration: 1300,
    direction: "alternate",
    loop: true,
    elasticity: 600,
    easing: "easeOutElastic"
  });
  Anime({
    targets: '.path_3',
    translateY: 5,
    duration: 1300,
    direction: "alternate",
    loop: true, 
    elasticity: 600,
    easing: "easeOutElastic"
  });
  Anime({
    targets: '.path_4',
    translateY: 5,
    duration: 1300,
    direction: "alternate",
    loop: true,
    elasticity: 600,
    easing: "easeOutElastic"
  });
}


class App extends React.Component {
  componentDidMount(){
    animateLogoDown() 
  }
  render(){
  function navigate() {
    console.log("Navigation issued from card")
    //Routing to /Utils 
    this.props.history.push('/Utils');
  }
  const { classes } = this.props;
  return (
   <div class='main_app'>
      {/*
      Nav Bar Grid 
      */}
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
      >

      <Grid align='center' Item xs={1}> 
      

      
        <svg width="61" height="41" viewBox="0 0 61 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class='path_1' d="M61 5.82872C61 2.60961 58.3137 -2.33598e-06 55 -2.33598e-06C51.6863 -2.33598e-06 49 2.60961 49 5.82872V35.1713C49 38.3904 51.6863 41 55 41C58.3137 41 61 38.3904 61 35.1713V5.82872Z" fill="#A85FBC"/>
          <path class='path_2' d="M45 16.7757C45 13.5859 42.3137 11 39 11C35.6863 11 33 13.5859 33 16.7757V35.2243C33 38.4141 35.6863 41 39 41C42.3137 41 45 38.4141 45 35.2243V16.7757Z" fill="#BC73BC"/>
          <path class='path_3' d="M28 26.1018C28 22.7319 25.3137 20 22 20C18.6863 20 16 22.7319 16 26.1018V34.8982C16 38.2681 18.6863 41 22 41C25.3137 41 28 38.2681 28 34.8982V26.1018Z" fill="#D48BBC"/>
          <path class='path_4' d="M11.898 31.643C11.898 28.3574 9.23454 25.694 5.949 25.694C2.66346 25.694 0 28.3574 0 31.643V34.948C0 38.2335 2.66346 40.897 5.949 40.897C9.23454 40.897 11.898 38.2335 11.898 34.948V31.643Z" fill="#E79EBC"/>
        </svg>
        <div id='logo'> 
            StatHelp
      </div>
      </Grid>

      <Grid align ='right' item xs={11}>
          <IconButton aria-label="Add">
          <AddIcon/>
          </IconButton>
      </Grid>
      </Grid>
      

      {//Card Grid
      }
      
          <Card width='50%'  className={classes.card} onClick={navigate}>
              <CardContent>
              <img src={dist_url} alt='can not load iamge' class='vectors'/>
              <div id='categories'>
                Utilities and Distributions 
              </div>
              </CardContent>
          </Card>

          <Card width='50%'className={classes.card_2} >
              <CardContent>
              <img src={graph_url} alt='can not load iamge' class='vectors'/>
              <div id='categories'>
                Graphing Tools 
              </div>
              </CardContent>
          </Card>
  </div>
  );
}}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
