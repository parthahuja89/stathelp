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


class Geo extends React.Component{
    constructor(){
        super();
        this.calculateGeo = this.calculateGeo.bind(this)
    }
    state = {
        //values used for calculations
        probability: '',
        failure: '',
        rounding: '',
        //server response
        answer: '',
        //true when server output available
        showOutput: false,
        empty_data_warning: false,
        probability_warning: false,
    };

    /**
     * Sends GET request to server 
     * Request: /Chi
     * Json payload: {freedom: '',  x: 'random variable', rounding: 'rounding decimal place'}
     */
    calculateGeo(){
        //checking for errors and sending warning
        if(this.state.failure == '' || this.state.probability == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else if(this.state.probability <0 || this.state.probability > 1){
            console.log("Probability not in range")
            this.setState({probability_warning: true})
        }

        else{
            console.log("Probability of success: " + this.state.probability)
            console.log("Number of failures: " + this.state.failure)

            axios.get('https://stathelp.herokuapp.com/Geo', {
                //GET Request payload 
                params: {
                    probability: String(this.state.probability),
                    failure: String(this.state.failure),
                    rounding: String(this.state.rounding),
                }
            })
            .then(res =>{
                //response 
                var res_json = res.data
                console.log("Server Response: " + JSON.stringify(res_json))
                //Response JSON: {answer(=) , answer_lt(<), answer_lt_eq(=<), answer_gt_eq(>=)}
                this.setState({
                    answer: res_json['Answer'],   
                    answer_lt : res_json['Answer_lt'],
                    answer_lt_eq: res_json['Answer_lt_eq'],
                    answer_gt: res_json['Answer_gt'],
                    answer_gt_eq: res_json['Answer_gt_eq'],

                    showOutput: true,
                })
            })
    
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
            <div class = 'instructions' style={{marginTop: '0%'}}>
                Instructions <br/>
                • Enter Probability of Success between 0-1<br/>
                • Enter Number of trials, which includes the last trial with success.<br/>
            </div>
            {/** Input Fields */}
            <div className= {this.state.showOutput ? 'disappear':'' }>
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
                        label="Probability of Success"
                        variant="outlined"
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        onChange = {e => this.setState({ probability: e.target.value})} 
                    />  
                </Grid>

                <Grid align ='center' item xs= {12}> 
                    <TextField
                        id="outlined-name"
                        label="Number of trials (n)"
                        variant="outlined"
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        onChange = {e => this.setState({ failure: e.target.value})} 
                    />  
                </Grid> 
                
                <Grid align ='center' item xs= {12}> 
                    <TextField
                        id="outlined-name"
                        label="Round Decimal Place"
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
                            onClick={this.calculateGeo}
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
                
                {/**  Probability not in 1-0 Range Warning */}
                <Snackbar
                    autoHideDuration={2500}
                    open={this.state.probability_warning}
                    onClose={() => this.setState({probability_warning: false})}
                    message={<span id="message-id">Probability must be between 0-1.</span>}
                />

                </div>

                {/**Output hidden until server response is accepted*/}
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
                        <TableCell>P(X=x)</TableCell>
                        <TableCell align="right">  
                            {this.state.answer}
                            <IconButton style = {{ marginTop: '-0.3%'}} aria-label="Add" onClick = {() => {this.copyToClipboard(this.state.answer)}}>
                                <Copy/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell>P(X{"<"}x)</TableCell>
                        <TableCell align="right">
                            {this.state.answer_lt}
                            <IconButton style = {{ marginTop: '-0.3%'}} aria-label="Add" onClick = {() => {this.copyToClipboard(this.state.answer_lt)}}>
                                <Copy/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell>P(X ≤ x)</TableCell>
                        <TableCell align="right">
                            {this.state.answer_lt_eq}
                            <IconButton style = {{ marginTop: '-0.3%'}} aria-label="Add" onClick = {() => {this.copyToClipboard(this.state.answer_lt_eq)}}>
                                <Copy/>
                            </IconButton>                       
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>P(X ≥ x)</TableCell>
                        <TableCell align="right">
                            {this.state.answer_gt}
                            <IconButton style = {{ marginTop: '-0.3%'}} aria-label="Add" onClick = {() => {this.copyToClipboard(this.state.answer_gt)}}>
                                <Copy/>
                            </IconButton> 
                        </TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell>P(X{">="}x)</TableCell>
                        <TableCell align="right">
                            {this.state.answer_gt_eq}
                            <IconButton style = {{ marginTop: '-0.3%'}} aria-label="Add" onClick = {() => {this.copyToClipboard(this.state.answer_gt_eq)}}>
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

Geo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Geo);
