import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BoxPlot from './Graphs/BoxPlot';
import Histogram from './Graphs/Histogram';
import BarChart from './Graphs/BarChart';
import PieChart from './Graphs/PieChart';

import './Graphing.css';
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
}; 

const graphs = [
    <BoxPlot/>,
    <Histogram/>,
    <BarChart/>,
    <PieChart/>
]
class Graphing extends React.Component{
    state = {
        Graph: 0
    };

    /**
     * Changes Tab Selection
     */
    handleChange = (event, value) => {
        this.setState({ Graph: value});
    
    }
    render(){
        const { classes } = this.props;
        return(
            <div class = 'Graphing'>
                <div class ='title'>
                    Graphing
                </div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                <Grid item xs = {12}>
                <Card className={classes.card}>
                <CardContent>
                
                {/** Graph Selection Tab*/}
                <Tabs
                value={this.state.Graph}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                >
                    <Tab style = {{ fontWeight: 'Bold' }} label="BoxPlot" />
                    <Tab style = {{ fontWeight: 'Bold' }} label="Histogram" />
                    <Tab style = {{ fontWeight: 'Bold' }} label="BarChart" />
                    <Tab style = {{ fontWeight: 'Bold' }} label="PieChart" />
                </Tabs>
                
                {/**Conditional Rendering based on menu selection hooks for each distribution*/}
                <div>
                    {graphs[this.state.Graph]}
                </div>
                
                </CardContent>
                </Card>
                </Grid>
                </Grid>
            </div>
        );
    }
}

Graphing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Graphing);
