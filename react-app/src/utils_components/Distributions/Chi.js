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

class Chi extends React.Component{
    constructor(){
        super();
        this.calculateChi = this.calculateChi.bind(this)
    }
    state = {
        freedom: '',
        x: '',
        rounding: '',
        //server response
        answer: '',
        //true when server output available
        showOutput: false,
        empty_data_warning: false,
    };

    /**
     * Sends GET request to server 
     * Request: /Chi
     * Json payload: {freedom: '',  x: 'random variable', rounding: 'rounding decimal place'}
     */
    calculateChi(){
        //checking for errors and sending warning
        if(this.state.x == '' || this.state.freedom == '' || this.state.rounding == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else{
            console.log("freedom: " + this.state.freedom)
            console.log("X: " + this.state.x)

            axios.get('http://localhost:5000/Chi', {
                //GET Request payload 
                params: {
                    freedom: String(this.state.freedom),
                    x: String(this.state.x),
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
                    showOutput: true,
                })
            })
    
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
            {/** Input Fields */}
            <div className= {this.state.showOutput ? 'disappear':'' } >
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
                    Degrees of freedom:
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        
                        className={classes.textField}                       
                        align= 'left'
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        onChange = {e => this.setState({freedom: e.target.value})} 
                    />  
                </Grid> 

                <Grid align= 'right' item xs ={6}>
                    <div style = {{fontSize:'1.8vh', verticalAlign:'middle'}}>
                    Random Variable (x):
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        
                        className={classes.textField}                       
                        
                        align= 'left'
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        onChange = {e => this.setState({ x: e.target.value})} 
                    />  
                </Grid> 
                
                <Grid align= 'right' item xs ={6}>
                    <div style = {{fontSize:'1.5vh', verticalAlign:'middle'}}>
                    Round Decimal Place
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        style = {{maxWidth: '70px', marginTop: '-5px'}}
                        onChange = {e => this.setState({ rounding: e.target.value})} 
                    />  
                </Grid>

                <Grid item align = 'center'>
                    <Button 
                        variant="contained"
                            color="secondary" 
                            onClick={this.calculateChi}
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
                                <TableCell> P( Z {"<"} z): </TableCell>
                                <TableCell align="right">
                                    {this.state.answer}
                                    <IconButton style = {{ marginTop: '-0.3%'}} aria-label="Add" onClick = {() => {this.copyToClipboard(this.state.answer)}}>
                                        <Copy/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>P( Z {">"} z):</TableCell>
                                <TableCell align="right">
                                    {parseFloat(1-this.state.answer).toFixed(this.state.rounding)}
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

Chi.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Chi);
