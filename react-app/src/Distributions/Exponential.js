import React from 'react';
import PropTypes, { string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Copy from '@material-ui/icons/AssignmentOutlined';
import Arrow from '@material-ui/icons/ArrowBack';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios'

const styles = {
    button: {
        marginTop: '3%',
        fontSize: '1.5vh',
        textTransform: 'none',
    },
    ExpansionPanel: {
    },
};

class Exponential extends React.Component{
    constructor(){
        super();
        this.calculateExponential = this.calculateExponential.bind(this) 
    }
    state ={
        empty_data_warning: false,

        showOutput: false,

        beta: '',
        x: '',
    }
    /**
     * Copies the text to clipboard
     */
    copyToClipboard(text){
        console.log("Copying to clipboard: " + text)
        navigator.clipboard.writeText(text)
        .catch(err => {
            //User denied clipboard permissions
            console.log("Copy to clipboard failed")
            
          });

        //using snackbar to show text is copied 
        this.setState({copy_text: true})
    }

    /**
     * Sends GET request to server 
     * Request: /Exponential
     * Json payload: {population_size, population_success, sample_size,sample_success}
     */
    calculateExponential(){

        //Safety Checks 
        if( this.state.beta == '' || this.state.x == ''  || this.state.rounding == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }

        //Requesting 
        else{

            axios.get('https://stathelp.vercel.app/Expo', {
                //GET Request payload 
                params: {
                    x: String(this.state.x),
                    beta: String(this.state.beta),
                    rounding: String(this.state.rounding)
                }
            })
            .then(res =>{
                //response 
                var res_json = res.data
                console.log("Server Response: " + JSON.stringify(res_json))
                this.setState({ 
                    answer: res_json['Answer'],
                    showOutput: true,
                })
            })
    
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <div>
                <div className= {this.state.showOutput ? 'disappear':'' }>
                {/** Instructions */}
                <div class = 'instructions' style={{marginTop: '0%'}}>
                    Instructions <br/>
                    • Enter β. Note: λ=1/β. <br/>
                    • Enter Random Variable(X). <br/>
                    • Convert fractions to demical before calculating. <br/>
                </div>
                
                {/** Input fields */}
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing= {24}
                    style = {{transform: 'translateY(10%)'}}
                > 
                
                <Grid align ='center' item xs= {12}> 
                    <TextField
                        id="outlined-name"
                        label="β (1/λ)"
                        variant="outlined"
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        onChange = {e => this.setState({ beta: e.target.value})} 
                    />  
                </Grid>  

                <Grid align ='center' item xs= {12}> 
                    <TextField
                        id="outlined-name"
                        label="Random Variable (X)"
                        variant="outlined"
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        onChange = {e => this.setState({ x: e.target.value})} 
                    />  
                </Grid>  
                
                <Grid align ='center' item xs= {12}> 
                    <TextField
                        id="outlined-name"
                        label="Rounding"
                        variant="outlined"
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        onChange = {e => this.setState({ rounding: e.target.value})} 
                    />  
                </Grid>
                

                <Grid item align = 'center'>
                    <Button 
                        variant="contained"
                            color="secondary" 
                            onClick={this.calculateExponential}
                            className={classes.button}
                            style={{justifyContent: 'center'}}
                            size="large"
                        >
                            Calculate
                    </Button>
                </Grid>
                </Grid>

                {/** Empty data Warning SnackBar */}
                <Snackbar
                        autoHideDuration={2000}
                        open={this.state.empty_data_warning}
                        onClose={() => this.setState({empty_data_warning: false})}
                        message={<span id="message-id">Incomplete Data.</span>}
                />
            

                {/** Awares user that text is copied */}
                <Snackbar
                    autoHideDuration={2000}
                    open={this.state.copy_text}
                    onClose={() => this.setState({copy_text: false})}
                    message={<span id="message-id">Copied to clipboard.</span>}
                />

                </div>

                {/** Output Table */}
                <div className= {this.state.showOutput ? 'distribution_final_output':'disappear' }>
                    {/** Button to go Back from the output screen*/}
                    <IconButton style = {{ marginLeft: '1%'}}  size="small" color="primary" aria-label="Add" onClick = {() => {this.setState({ showOutput: false })}}>
                         <Arrow/> 
                    </IconButton>

                    <Table className={classes.table} style={{tableLayout: 'fixed',backgroundColor: 'white'}}>
                    <TableHead>
                    <TableRow>
                        <TableCell>P(X)</TableCell>
                        <TableCell align="right">Probability</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                        <TableCell>P(X ≤ x)</TableCell>
                        <TableCell align="right">
                            {this.state.answer}
                            <IconButton style = {{ marginTop: '-0.3%'}} aria-label="Add" onClick = {() => {this.copyToClipboard(this.state.answer)}}>
                                <Copy/>
                            </IconButton>                       
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>P(X ≥ x)</TableCell>
                        <TableCell align="right">
                            {1-this.state.answer}
                            <IconButton style = {{ marginTop: '-0.3%'}} aria-label="Add" onClick = {() => {this.copyToClipboard(1-this.state.answer)}}>
                                <Copy/>
                            </IconButton> 
                        </TableCell>
                    </TableRow>

                    </TableBody>
                    </Table>
                </div>


            </div>
        );
    }
}


Exponential.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Exponential);


    