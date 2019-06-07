import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

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
    constructor(){
        super();
        this.testAPI = this.testAPI.bind(this);
    }
    state = { 
        //operation selection
        operation: '',
        operation_name: '',
        //textField data
        input_data: '',
        //user warning
        open: false, 
        //final output
        answer: '',
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
        console.log("Requesting data with axios")
        
        //empty data safety check
        if(this.state.input_data == ''){
            this.setState({open: true}) 
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
        }else{

        axios.get('http://localhost:5000/' + String(this.state.operation), {
            //GET Request payload 
            params: {
                values: String(this.state.input_data)
            }
        })
        .then(res =>{
            var res_json = res.data
            console.log("Server Response: " + JSON.stringify(res_json))
            this.setState({answer: res_json['Answer']})
        })
        
    }
    }


    render(){
        const { classes } = this.props;
        return(
            <div>
                <TextField
                id="standard-full-width"
                value = {this.state.input_data}
                onChange = {e => this.setState({input_data: e.target.value})} 
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
                        <MenuItem value={'Arithmetic_Mean'}>Arithmetic Mean</MenuItem>
                        <MenuItem value={'Geometric_Mean'}>Geometric Mean</MenuItem>
                        <MenuItem value={'Harmonic_Mean'}>Harmonic Mean</MenuItem>
                        <MenuItem value={'Quadratic_Mean'}>Quadratic Mean</MenuItem>
                        <MenuItem value={'Median'}>Median</MenuItem>
                        <MenuItem value={'Mode'}>Mode</MenuItem>
                        <MenuItem value={'Range'}>Range</MenuItem>
                        <MenuItem value={'Variance'}>Variance</MenuItem>
                        <MenuItem value={'Standard_Deviation_Sample'}>Standard Deviation (Sample)</MenuItem>
                        <MenuItem value={'Standard_Deviation_Population'}>Standard Deviation (Population)</MenuItem>
                        <MenuItem value={'Coefficient_Standard_Deviation'}>Coefficient Standard Deviation</MenuItem>
                        <MenuItem value={'Standard_Error'}>Standard Error of Mean</MenuItem>
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
            
            {/**Displays server response*/}
            <div class='final_output'>
                {this.state.operation.replace(/_/g, " ")}:
                {this.state.answer}
            </div>

            {/** Snackbar warning when user makes request with empty data*/}
            <Snackbar
                autoHideDuration={2000}
                open={this.state.open}
                onClose={() => this.setState({open: false})}
                message={<span id="message-id">Please enter data.</span>}
            />
        </div>
        );
    }
}

Tendencies.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tendencies);