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
import dist_url from '../assets/dist_and_utils.svg';
import graph_url from '../assets/graph.svg';
import testing_url from '../assets/testing.svg'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';

//animation 
import Anime from 'animejs'

//material ui styles 
const styles = {
  card: { 
    minWidth: '20%',
    maxWidth: '80%',
    minHeight: '5%',
    maxHeight: '10%',
    borderRadius: '20px',
    border: '3px',
    marginTop: '4%',
    transition: 'box-shadow 0.3s ease-in-out',
    "&:hover": {
      boxShadow: '0 5px 15px rgba(0,0,0,0.18)',
      cursor: 'pointer',
    }
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

//animates the logo 
function animateLogoDown(){
  Anime({
    targets: '.path_1',
    translateY: 10,
    duration: 2000,
    direction: "alternate",
    loop: true,
    elasticity: 600,
    easing: "easeOutElastic"
  });
  Anime({
    targets: '.path_2',
    translateY: 7,
    duration: 2000,
    direction: "alternate",
    loop: true,
    elasticity: 600,
    easing: "easeOutElastic"
  });
  Anime({
    targets: '.path_3',
    translateY: 5,
    duration: 2000,
    direction: "alternate",
    loop: true, 
    elasticity: 600,
    easing: "easeOutElastic"
  });
  Anime({
    targets: '.path_4',
    translateY: 5,
    duration: 2000,
    direction: "alternate",
    loop: true,
    elasticity: 600,
    easing: "easeOutElastic"
  });
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.navigate = this.navigate.bind(this);
  }
  
  //Shows menu on navIcon clicks 
  showNav = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  //Hides menu on navIcon clicks 
  hideNav = () => {
    this.setState({ anchorEl: null });
  }

  //avoid async 
  animateCard(){
    this.setState({grow: !this.state.grow})
  }
  //Navigates the user to next page with card fade animation 
  navigate(route) {
    console.log("Navigation issued from card")
    //fading card 
    this.setState({grow: !this.state.grow})

    //waiting for animation to finish 
    setTimeout(function(props){
      this.props.history.push(route);
    }.bind(this), 250);
    //Routing to /Utils 
    
  }

  //loads logo animation on mounting 
  componentDidMount(){
    animateLogoDown() 
  }

  //current state only includes trigger for nav menu
  state = {
    anchorEl: null,
    //cards growing animation on load
    grow: true,
  }; 

  render(){
  const { classes } = this.props; //for prop usage
  const { anchorEl } = this.state; //for state usage 

  const open = Boolean(anchorEl); //for nav triggers

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
        spacing={3}
      >

      <Grid align='center' Item xs={1}> 
      {/*logo svg */}
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
          
          <IconButton aria-label="Add" onClick = {this.showNav}>
          <AddIcon/>
          </IconButton>
          {/*Show menu options on nav-bar icon clicks */}
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.hideNav}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={this.hideNav}>Play Store</MenuItem>
            <MenuItem onClick={() => {window.location = 'https://ko-fi.com/theoldclassified'}}>Donate</MenuItem>
        </Menu>

      </Grid>
      </Grid>
      {/*Card Grid
      Animations:
      1. Growing animation: occcurs at intervals of 500 --> Card1(0) --> Card2 (500) -> Card3(1000)
      */}
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        style={{
          margin: 0,
          height: '75vh',
        }}
      > 
      <Grid align='center' item lg={4} sm={7} md={7} xs={11} > 
      <Grow
          in={this.state.grow} 
      > 
          <Card className={classes.card} onClick={() => this.navigate('/utils')}>
              <CardContent>
              <img src={dist_url} class='vectors'/>
              <div id='categories'>
                Utilities and Centeral Tendencies
              </div>
              </CardContent>
          </Card>
         
        </Grow>
      </Grid>

      <Grid align='center' item lg={4} sm={7} md={7} xs={11} > 
      <Grow
          in={this.state.grow} 
          {...(this.state. grow
             ? { timeout: 500 } : {})}
      >
          <Card className={classes.card} onClick={() => this.navigate('/graphing')}>
              <CardContent>
              <img src={graph_url}  class='vectors'/>
              <div id='categories'>
                Graphing Tools 
              </div>
              </CardContent>
          </Card>
      </Grow>
      </Grid>

      <Grid align='center' item lg={4} sm={7} md={7} xs={11} > 
      <Grow
          in={this.state.grow} 
          {...(this.state. grow
             ? { timeout: 1000 } : {})}
      >
          <Card className={classes.card} onClick={() => this.navigate('/dist')}>
              <CardContent>
              <img src={testing_url} class='vectors'/>
              <div id='categories'>
                Probabilty Distributions
              </div>
              </CardContent>
          </Card>
      </Grow>
      </Grid>
      </Grid>
    </div>
  );
}}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
