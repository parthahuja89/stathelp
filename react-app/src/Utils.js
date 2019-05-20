import React from 'react';
import './Utils.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//matrial styles 
const styles = {
    card: { 
        width: '90%',
        maxWidth: '800px',
        minHeight: '80%',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        borderRadius: '5px',
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


class Utils extends React.Component {
    state = { value:0, };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { classes } = this.props; //props for material ui
    return(
        <div class='utils'>
        <Card width='50%' className={classes.card}>
              <CardContent>
              <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
        <Grid container justify= 'center'>
            <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            </Tabs>
         </Grid>
        </Toolbar>
        </AppBar> 
              </CardContent>
          </Card>
        </div>
    );    
}  
}


Utils.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Utils);