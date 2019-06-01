import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
//material styles 
const styles = {
    textfield:{
        height: 150,
        width: 20, 
    },
}; 

class Tendencies extends React.Component{
    render(){
        const { classes } = this.props;
        return(
            <div>
                <TextField
                id="standard-full-width"
                label="Input Data"
                style={{ margin: 8 }}
                placeholder="Example: 12, 33, 44"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                <Grid Item xs={4} s={4}> Choose Operation: </Grid>
                <Grid align='left' Item xs = {8} s= {8}>
                {/*Menu for operation selection*/}
                    <FormControl className={classes.formControl}>
                        <Select
                        displayEmpty
                        name="age"
                        className={classes.selectEmpty}
                        >
                        <MenuItem value={10}>Arithmetic Mean </MenuItem>
                        <MenuItem value={10}>Geometric Mean </MenuItem>
                        <MenuItem value={10}>Harmonic Mean </MenuItem>
                        <MenuItem value={10}>Quadratic Mean </MenuItem>
                        <MenuItem value={20}>Median</MenuItem>
                        <MenuItem value={30}>Mode</MenuItem>
                        <MenuItem value={30}>Range</MenuItem>
                        <MenuItem value={30}>Variance</MenuItem>
                        <MenuItem value={30}>Standard Deviation (Sample)</MenuItem>
                        <MenuItem value={30}>Standard Deviation (Population)</MenuItem>
                        <MenuItem value={30}>Coefficient Standard Deviation</MenuItem>
                        <MenuItem value={30}>Standard Error of Mean</MenuItem>
                        </Select>
                </FormControl>
                </Grid>
            </Grid>
            </div>
        );
    }
}

Tendencies.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tendencies);