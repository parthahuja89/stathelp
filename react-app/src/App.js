import React from 'react';
import PropTypes from 'prop-types';
import './App.css'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
const styles = {
  card: { 
    minWidth: '70%',
    minHeight: '70%',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute'
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

  return (
    <div>
      {/*
      TODO: change logo font+color
      */}
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
      >
      <Grid Item xs={11}> 
      <div id='logo'>
          StatHelp 
      </div>
      </Grid>

      <Grid align ='right' item xs={1}>
          <Fab color="white" aria-label="Add">
          <AddIcon color='#000000'/>
          </Fab>
      </Grid>
      
      </Grid>
      <Card className={classes.card}>
        <CardContent>
          this is the stuff inside the card
        </CardContent>
      </Card>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
