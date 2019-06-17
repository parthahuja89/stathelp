import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        minWidth: 200,
    },
}; 


class Probability extends React.Component{
    render(){
        const { classes } = this.props;
        return(
            <div>
                {/* Menu for Distribution Selection */}
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="ops-label">Probability Distribution</InputLabel>
                        <Select
                        inputProps={{
                            name: 'ops',
                            id: 'ops-label',
                          }}
                        >
                        <MenuItem value={'Bionomial_Distribution'}>Bionomial Distribution</MenuItem>
                        <MenuItem value={'Geometric_Mean'}>Geometric Mean</MenuItem>
                        <MenuItem value={'Harmonic_Mean'}>Harmonic Mean</MenuItem>
                        <MenuItem value={'Quadratic_Mean'}>Quadratic Mean</MenuItem>
                        <MenuItem value={'Median'}>Median</MenuItem>
                        <MenuItem value={'Mode'}>Mode</MenuItem>
                        <MenuItem value={'Range'}>Range</MenuItem>
                        <MenuItem value={'Variance'}>Variance(Population)</MenuItem>
                        <MenuItem value={'Variance_Sample'}>Variance(Sample)</MenuItem>
                        <MenuItem value={'Standard_Deviation_Population'}>Standard Deviation(Population)</MenuItem>
                        <MenuItem value={'Standard_Deviation_Sample'}>Standard Deviation (Sample)</MenuItem>
                        <MenuItem value={'Standard_Error'}>Standard Error of Mean</MenuItem>
                        </Select>
                </FormControl>
                </form>

            </div>
        );
    }
}

Probability.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Probability);