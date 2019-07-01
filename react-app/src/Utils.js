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
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//card tab components: Tendency..
import Tendency from './utils_components/centeral_tendencies';
import Distributions from './utils_components/Distributions';
//matrial styles 
const styles = {
    card: { 
        width: '90%',
        maxWidth: '1000px',
        minHeight: '80%',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        borderRadius: '5px',
        justifyContent: 'center',
    },
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const theme = createMuiTheme({

    palette: {
        primary:{
            main: '#9148BC'

        },
        secondary: {
            main: '#9148BC'
        }
      },
    typography: {
        fontFamily:
            'Overpass',
    },
});

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

  
class Utils extends React.Component {
    render() {
    const { classes } = this.props; //props for material ui
    return(
        <div class='utils'>
        <MuiThemeProvider theme={theme}>
        <div class='title'>Distributions and Utilities</div>
        <Card className={classes.card}>
            <CardContent >
            <Distributions/>
        </CardContent>
          </Card>
        </MuiThemeProvider>
        </div>
    );    
}  
}


Utils.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Utils);