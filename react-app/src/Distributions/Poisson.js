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
    ExpansionPanel: {
    },
};

class Poisson extends React.Component{
    constructor(){
        super();
        this.calculatePoisson = this.calculatePoisson.bind(this);
    }

    /**
     * Sends GET request to server 
     * Request: /Poisson
     * Json payload: {average: '',  x: 'random variable', rounding: 'rounding decimal place'}
     */
    calculatePoisson(){
        //checking for errors and sending warning
        if(this.state.x == '' || this.state.average == '' || this.state.rounding == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else{
            console.log("Average: " + this.state.average)
            console.log("X: " + this.state.x)

            axios.get('https://stathelp.herokuapp.com/Poisson', {
                //GET Request payload 
                params: {
                    average: String(this.state.average),
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
                    answer_lt: res_json['Answer_lt'],
                    answer_lt_eq: res_json['Answer_lt_eq'],
                    answer_gt: res_json['Answer_gt'],
                    answer_gt_eq: res_json['Answer_gt_eq'],
                    
                    showOutput: true,
                })
            })
    
        }
    }


    state = {
        average: '',
        x: '',
        rounding: '',
        //server response
        answer: '',
        answer_lt: '',
        answer_lt_eq: '',
        answer_gt: '',
        answer_gt_eq: '',
        //true when server output available
        showOutput: false,
        empty_data_warning: false,
    };


    render(){
        const { classes } = this.props;
        return(
            <div>
                
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
                        label="Average (μ)"
                        variant="outlined"
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        onChange = {e => this.setState({ average: e.target.value})} 
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
                        label="Rounding Decimal Place"
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
                            onClick={this.calculatePoisson}
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
                {/** Output Table */}
                <div className= {this.state.showOutput ? 'distribution_final_output':'disappear' }>

                {/** Button to go Back from the output screen*/}
                <IconButton style = {{ marginLeft: '1%'}}  size="small" color="primary" aria-label="Add" onClick = {() => {this.setState({ showOutput: false })}}>
                        <Arrow/> 
                </IconButton>

                <Table className={classes.table} style={{tableLayout: 'fixed'}}>
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


Poisson.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Poisson);




