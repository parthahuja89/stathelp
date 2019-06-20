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

// ./Distributions imports 
import Bionomial_Distribution from './Distributions/Bionomial_Distribution';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        minWidth: 200,
    },
    button: {
        marginTop: '10%',
        fontSize: '1.5vh',
        textTransform: 'none',
    },
}; 


class Probability extends React.Component{
    state = {
        //starting distribution state shows bionomial distribution
        Distribution: 'Bionomial_Distribution',

    };

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
                {/* Menu for Distribution Selection */}
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="ops-label">Probability Distribution</InputLabel>
                        <Select
                        value = {this.state.Distribution}
                        onChange = {this.setDistribution}
                        inputProps={{
                            name: 'ops',
                            id: 'ops-label',
                          }}
                        >
                        <MenuItem value={'Bionomial_Distribution'}>Bionomial Distribution</MenuItem>
                        <MenuItem value={'Normal_Distribution'}>Normal Distribution</MenuItem>
                        <MenuItem value={'Hypergeometric_Distribution'}>Hypergeometric Distribution</MenuItem>
                        <MenuItem value={'Uniform_Distribution'}>Uniform Distribution</MenuItem>
                        <MenuItem value={'Poisson_Distribution'}>Poisson Distribution</MenuItem>
                        <MenuItem value={'Bernoulli_Distribution'}>Bernoulli Distribution</MenuItem>
                        <MenuItem value={'Degenerate_Distribution'}>Degenerate Distribution</MenuItem>
                        <MenuItem value={'Geometric_Distribution'}>Geometric Distribution</MenuItem>
                        <MenuItem value={'Beta_Distribution'}>Beta Distribution</MenuItem>
                        <MenuItem value={'Chi_Squared_Distribution'}>Chi Squared Distribution</MenuItem>
                        <MenuItem value={'Exponential_Distribution'}>Exponential Distribution</MenuItem>
                        <MenuItem value={'Logarithmic_Distribution'}>Logarithmic Distribution</MenuItem>
                        <MenuItem value={'Gamma_Distribution'}>Gamma Distribution</MenuItem>
                        <MenuItem value={'Rayleigh_Distribution'}>Rayleigh Distribution</MenuItem>
                        <MenuItem value={'Student_t_Distribution'}>Student's t Distribution</MenuItem>
                        <MenuItem value={'Hyperbolic_Distribution'}>Hyperbolic Distribution</MenuItem>
                        <MenuItem value={'Zeta_Distribution'}>Zeta Distribution</MenuItem>
                        <MenuItem value={'Borel_Distribution'}>Borel Distribution</MenuItem>
                        </Select>
                </FormControl>
                </form>

                {/**Conditional Rendering based on menu selection hooks for each distribution*/}

                {/** Bionomial Distribution */}
                <div className= {this.state.Distribution=='Bionomial_Distribution' ? '':'disappear' }>
                    <Bionomial_Distribution />
                </div>

            </div>
        );
    }
}

Probability.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Probability);