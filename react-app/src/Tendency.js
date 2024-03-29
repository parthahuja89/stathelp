/* eslint-disable */ 
import React from 'react';
import './Tendency.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Copy from '@material-ui/icons/AssignmentOutlined';
import IconButton from '@material-ui/core/IconButton';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


//material styles
const styles ={
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
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        marginTop: '5%',
        minWidth: 200,
      },
    button: {
        marginTop: '10%',
        fontSize: '1.5vh',
        textTransform: 'none',
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
    // Use the system font.
    fontFamily:
        'Overpass',
    },
});

class Tendencies extends React.Component{
    constructor(){
        super();
        this.apiRequest = this.apiRequest.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
    }
    state = { 
        //operation selection
        operation: '',
        operation_name: '',
        //textField data
        input_data: '',
        //user warning snackbar state
        open: false, 
        //copied to clipboard snackbar state
        clipboard: false, 
        //shows output
        showOutput: false, 
        //final output
        answer: '',
    };

    /**
     * sets state.operation value from ui selector 
     * operation val further used for API consumption
     */
    setOperation = (event, value) => {
        //on Operation Selecton => Change operation value, Disable output
        console.log("Current operation selection: " + event.target.value)
        this.setState({
            operation: event.target.value,
            showOutput: false, 
        });
    };

    /**
     * Makes GET Request to Stathelp server 
     * Json payload: {input_data: 'csv_values'}
     */
    apiRequest(){
        console.log("Requesting data with axios")
        
        //empty data safety check
        if(this.state.input_data == ''){
            //send warning 
            this.setState({open: true}) 
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
        }else{

        axios.get('https://stathelp.vercel.app/' + String(this.state.operation), {
            //GET Request payload 
            params: {
                values: String(this.state.input_data)
            }
        })
        .then(res =>{
            //response 
            var res_json = res.data
            console.log("Server Response: " + JSON.stringify(res_json))
            //Displaying output once state set
            this.setState({
                answer: res_json['Answer'],
                showOutput: true
            })
        })
        
    }
    }

    //Copies the output text to clipboard 
    copyToClipboard(){
        navigator.clipboard.writeText(this.state.answer)

        this.setState({ clipboard: true});
    }
    render(){
        const { classes } = this.props;
        return(
            <div class = 'utils'>

            <MuiThemeProvider theme={theme}>
                <div class= 'title'>
                    Utilities and Centeral Tendencies
                </div>
            <Card className={classes.card}>
            <CardContent>
            <div class='card_content'>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                <Grid item xs={12} s={12} align= 'center'>
                
                    <TextField
                        id="outlined-full-width"
                        
                        value = {this.state.input_data}
                        onChange = {e => this.setState({input_data: e.target.value})} 
                        label="Input Data"
                        placeholder="Example: 12, 33, 44"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                
                </Grid>
                <Grid item xs={12} s={12} >
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
                        <MenuItem value={'sum'}>Sum Σx</MenuItem>
                        <MenuItem value={'length'}>Number of Values (N)</MenuItem>
                        <MenuItem value={'sum_of_squared'}> Sum of Squared Σ(x^2)</MenuItem>
                        <MenuItem value={'Arithmetic_Mean'}>Arithmetic Mean</MenuItem>
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
                </Grid>
                <Grid item xs={12} s={12} align= 'center' >
                    <Button 
                    variant="contained"
                        color="secondary" 
                        className={classes.button}
                        onClick={this.apiRequest}  
                        style={{justifyContent: 'center'}}
                        size="large"
                    >
                        Calculate
                    </Button>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-end"
            >
                
            <Grid item xs={12} s={12} align= 'center' >
            
            {/**Output hidden until server response is accepted*/}
            <div className= {this.state.showOutput ? 'final_output':'disappear' }>
                <div class = 'line'/>
                <div id ='output_text'>
                {this.state.operation.replace(/_/g, " ")+ ": " }
                {this.state.answer}
                <IconButton style = {{ marginTop: '-0.3%'}} aria-label="Add" onClick = {this.copyToClipboard}>
                    <Copy/>
                </IconButton>
            </div>
            </div>
            </Grid>
            </Grid>
            {/** Snackbar warning when user makes request with empty data */}
            <Snackbar
                autoHideDuration={2000}
                open={this.state.open}
                onClose={() => this.setState({open: false})}
                message={<span id="message-id">Please enter data.</span>}
            />

            {/** Snackbar that indicates when output has been copied to clipboard */}
            <Snackbar
                autoHideDuration={2000}
                open={this.state.clipboard}
                onClose={() => this.setState({clipboard: false})}
                message={<span id="message-id"> Copied to clipboard! </span>}
            />
            </div>
            </CardContent>
            </Card>
        </MuiThemeProvider>
        </div>
        );
    }
}

Tendencies.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tendencies);