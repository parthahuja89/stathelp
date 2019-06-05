import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
//material styles 
const styles ={
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        minWidth: 120,
      },
};

class Tendencies extends React.Component{
    state = { 
        //operation performed on the input data 
        operation: '' 
    };
    /**
     * sets state.operation value from ui selector 
     * operation val further used for API consumption
     */
    setOperation = (event, value) => {
        console.log("Current operation selection: " + event.target.value)
        this.setState({
            operation: event.target.value,
        });
    };

    //Testing API temporary 
    testAPI(){
        console.log("Testing API!!")
        fetch('http://localhost:5000/range', {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        },
        ).then(response => {
        if (response.ok) {
            response.json().then(json => {
            console.log(json);
            });
        }
        });
    }
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
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="ops-label">Operation</InputLabel>
                        <Select
                        value = {this.state.operation}
                        onChange = {this.setOperation}
                        inputProps={{
                            name: 'ops',
                            id: 'ops-label',
                          }}
                        >
                        <MenuItem value={'ar_mean'}>Arithmetic Mean</MenuItem>
                        <MenuItem value={'geo_mean'}>Geometric Mean</MenuItem>
                        <MenuItem value={'harm_mean'}>Harmonic Mean</MenuItem>
                        <MenuItem value={'quad_mean'}>Quadratic Mean</MenuItem>
                        <MenuItem value={'median'}>Median</MenuItem>
                        <MenuItem value={'mode'}>Mode</MenuItem>
                        <MenuItem value={'range'}>Range</MenuItem>
                        <MenuItem value={'variance'}>Variance</MenuItem>
                        <MenuItem value={'standard_dev'}>Standard Deviation (Sample)</MenuItem>
                        <MenuItem value={'standard_dev_pop'}>Standard Deviation (Population)</MenuItem>
                        <MenuItem value={'coeff_standard_dev'}>Coefficient Standard Deviation</MenuItem>
                        <MenuItem value={'standard_error'}>Standard Error of Mean</MenuItem>
                        </Select>
                </FormControl>
                </form>
                </Grid>
            </Grid>
            <Button variant="outlined" color="secondary" className={classes.button}
                    onClick={this.testAPI}
            >
                Test    
            </Button>
            </div>
        );
    }
}

Tendencies.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tendencies);