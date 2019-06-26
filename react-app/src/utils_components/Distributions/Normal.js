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


import axios from 'axios'
const styles = {
    button: {
        marginTop: '3%',
        fontSize: '1.5vh',
        textTransform: 'none',
    },
};

class Normal extends React.Component{
    constructor(){
        super();
        this.calculateNormal = this.calculateNormal.bind(this);
    }

    state = {
        //true when server output available
        z_score: '',
        mean: '',
        standard_dev: '',

        showOutput: false,
        empty_data_warning: false,

    };
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
     * Request: /Normal
     * Json payload: {z_score, mean, standard_dev}
     */
    calculateNormal(){
        if(this.state.z_score == '' || this.state.mean == '' || this.state.standard_dev == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else{
            console.log("Mean: " + this.state.mean)
            console.log("Standard dev: " + this.state.standard_dev)
            console.log("Z Score: " + this.state.z_score)


            axios.get('http://localhost:5000/Normal', {
                //GET Request payload 
                params: {
                    z_score: String(this.state.z_score),
                    mean: String(this.state.mean),
                    standard_dev: String(this.state.standard_dev)
                }
            })
            .then(res =>{
                //response 
                var res_json = res.data
                console.log("Server Response: " + JSON.stringify(res_json))
                this.setState({
                    showOutput: true, 
                    answer: res_json['Answer']
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
                <div class = 'instructions'>
                    Instructions <br/>
                    • The field to be calculated should be left empty.<br/>
                    • There can not be more than one empty field.<br/>

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
                <Grid align= 'right' item xs ={6}>
                    <div style = {{fontSize:'1.8vh', verticalAlign:'middle'}}>
                    Z score (z)
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        className={classes.textField}                       
                        align= 'left'
                        onChange = {e => this.setState({z_score: e.target.value})}
                        
                    />  
                </Grid>  
                
                <Grid align= 'right' item xs ={6}>
                    <div style = {{fontSize:'1.8vh', verticalAlign:'middle'}}>
                    Mean
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        onChange = {e => this.setState({ mean: e.target.value})} 
                    />  
                </Grid>

                <Grid align= 'right' item xs ={6}>
                    <div style = {{fontSize:'1.8vh', verticalAlign:'middle'}}>
                    Standard Deviation
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        onChange = {e => this.setState({ standard_dev: e.target.value})} 
                    />  
                </Grid>


                <Grid item align = 'center'>
                    <Button 
                        variant="contained"
                            color="secondary" 
                            onClick={this.calculateNormal}
                            className={classes.button}
                            style={{justifyContent: 'center'}}
                            size="large"
                        >
                            Calculate
                    </Button>
                </Grid>
                </Grid>
                </div>
            {/** Output */}
            <div className= {this.state.showOutput ? 'final_output':'disappear' }>
                {/** Button to go Back from the output screen*/}
                <IconButton style = {{ marginLeft: '0%'}}  size="small" color="primary" aria-label="Add" onClick = {() => {this.setState({ showOutput: false })}}>
                         <Arrow/> 
                </IconButton>

                <Table className={classes.table} style={{tableLayout: 'fixed'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>P(Z)</TableCell>
                            <TableCell align="right">Probability</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        <TableRow>
                            <TableCell> P( Z ≤ z): </TableCell>
                            <TableCell align="right">
                                {this.state.answer}
                                <IconButton style = {{ marginTop: '-0.3%'}} aria-label="Add" onClick = {() => {this.copyToClipboard(this.state.answer)}}>
                                    <Copy/>
                                </IconButton>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>P( Z ≥ z):</TableCell>
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
        );
    }
}

Normal.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Normal);
