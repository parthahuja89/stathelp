import React, {Component} from 'react';
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

//animation lib 
import {useSpring, animated} from 'react-spring'
const styles = {
  card: { 
    width: '70%',
    maxWidth: '600px',
    minHeight: '30%',
    left: '50%',
    top: '40%',
    transform: 'translate(-50%, -90%)',
    position: 'absolute',
    borderRadius: '24px',
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

function App(props) {
  const { classes } = props;
  /**
   * Animation Definiton 
   * Reference: React-Spring Documentation
   */
  const anim_props = useSpring({opacity: 1, from: {opacity: 0}});
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
      <Grid Item xs={10}> 
      <animated.div style={anim_props} id='logo'>
          StatHelp 
      </animated.div>
      </Grid>

      <Grid align ='right' item xs={2}>
          <IconButton aria-label="Add">
          <AddIcon/>
          </IconButton>
      </Grid>
      </Grid>
      {//Card Grid
      }
          <animated.div style={anim_props}>
          <Card width='50%'style={anim_props}  className={classes.card}>
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
          </animated.div>
  </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
