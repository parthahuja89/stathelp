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

//card tab components: Tendency..
import Tendency from './utils_components/centeral_tendencies';
import Probability from './utils_components/probability';
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
    state = { value:0, };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { classes } = this.props; //props for material ui
    return(
        <div class='utils'>
        <div class='title'>Distributions and Utilities</div>
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
            indicatorColor={'secondary'}
            textColor={'secondary'}
            >
            <Tab label="Utilities" />
            <Tab label="Probability Distributions" />
            </Tabs>
         </Grid>
        </Toolbar>
        </AppBar>
        {/*Content depeneds on tab selections
        Selection of tabs is avail @ this.state.value 
        Tabs render the files avail in ./utils_components
        */}
        {this.state.value === 0 && <TabContainer> <Tendency/> </TabContainer>}
        {this.state.value === 1 && <TabContainer> <Probability/> </TabContainer>}
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