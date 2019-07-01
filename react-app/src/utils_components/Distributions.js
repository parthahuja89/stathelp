import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// ./Distributions imports 
import Bionomial_Distribution from './Distributions/Bionomial_Distribution';
import Normal_Distribution from './Distributions/Normal';
import Hyper from './Distributions/Hyper';
import Poisson from './Distributions/Poisson';
import Chi from './Distributions/Chi';
import Geo from './Distributions/Geometric';
import Expo from './Distributions/Exponential';

const styles = {
}; 

const distributions = [
    <Bionomial_Distribution />,
    <Normal_Distribution />,
    <Hyper />,
    <Poisson />,
    <Chi />,
    <Geo/>,
    <Expo />,
]


class Probability extends React.Component{
    state = {
        //starting distribution state shows bionomial distribution
        Distribution: 0,

    };

    /**
     * Changes Tab Selection
     */
    handleChange = (event, value) => {
        this.setState({ Distribution: value});
    }

    /**Changes Distribution selection from menu*/
    setDistribution = (event, value) => {
        this.setState({
            Distribution: event.target.value, 
        });
        console.log("Distribution selection: " + this.state.Distribution)
    }
    render(){
        const { classes } = this.props;
        
        return(
            <div>
                {/** Distribution Selection Tab*/}
                <Tabs
                value={this.state.Distribution}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                >
                {/** Tabs
                1. ./utils_components/centeral_tendencies
                2. ./utils_components/Distributions.js
                */}
                <Tab style = {{ fontWeight: 'Bold' }} label="Bionomial" />
                <Tab style = {{ fontWeight: 'Bold' }}label="Normal" />
                <Tab style = {{ fontWeight: 'Bold' }}label="Hypergeometric" />
                <Tab style = {{ fontWeight: 'Bold' }}label="Poisson" />
                <Tab style = {{ fontWeight: 'Bold' }}label="Geometric" />
                <Tab style = {{ fontWeight: 'Bold' }}label="Chi Squared" />
                <Tab style = {{ fontWeight: 'Bold' }}label="Exponential" />
                <Tab style = {{ fontWeight: 'Bold' }}label="Logarithmic" />
                <Tab style = {{ fontWeight: 'Bold' }}label="Hyperbolic" />
                </Tabs>
                {/**Conditional Rendering based on menu selection hooks for each distribution*/}
                <div>
                    {distributions[this.state.Distribution]}
                </div>

            </div>
        );
    }
}

Probability.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Probability);