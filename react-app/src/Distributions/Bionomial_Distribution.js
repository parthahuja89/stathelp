import React from 'react';
import PropTypes, { string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Copy from '@material-ui/icons/AssignmentOutlined';
import Arrow from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import axios from 'axios';

const styles = {
    button: {
        marginTop: '3%',
        fontSize: '1.5vh',
        textTransform: 'none',
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
      },
      tableRow: {
        cursor: 'pointer',
      },
      tableCell: {
        flex: 1,
      },
      noClick: {
        cursor: 'initial',
      },
};

class Bionomial_Distribution  extends React.Component{
    constructor(){
        super();
        this.calculateBionomial = this.calculateBionomial.bind(this);
    }

    state = {
        success :'',
        trial_count : '',
        x : '',
        //snackbar hooks
        empty_data_warning: false,
        probability_warning: false,
        copy_text: false,

        //server response
        answer: '',
        answer_lt: '',
        answer_lt_eq: '',
        answer_gt: '',
        answer_gt_eq: '',
        //true when server output available
        showOutput: false,
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
     * Request: /Bionomial 
     * Json payload: {success: '0<=X<=1', trial_count: '1->INF' , x: 'num of success'}
     */
    calculateBionomial(){
        //checking for errors and sending warning
        if(this.state.success == '' || this.state.trial_count == '' || this.state.x == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else if(this.state.success <0 || this.state.success > 1){
            console.log("Probability not in range")
            this.setState({probability_warning: true})
        }
        else{
            console.log("Sucess: " + this.state.success)
            console.log("Trial Count: " + this.state.trial_count)
            console.log("X: " + this.state.x)

            axios.get('http://localhost:5000/Bionomial', {
                //GET Request payload 
                params: {
                    success: String(this.state.success),
                    trial_count: String(this.state.trial_count),
                    x: String(this.state.x)
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

                    showOutput: true
                })
            })
    
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <div>    
            <div class = 'instructions'>
                Instructions <br/>
                • Probability must be between 0-1.<br/>
                • Number of Successes (X) should be less than or equal to trial count.<br/>

            </div>

            {/** Once Output recieved calculation fields are removed */}
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
                        align= 'left'
                        onChange = {e => this.setState({success: e.target.value})} 
                    />
                </Grid> 

                <Grid align ='center' item xs= {12}> 
                    <TextField
                        id="outlined-trial_count"
                        label="Trial Count"
                        variant="outlined"
                        className={classes.textField}
                        align= 'left'
                        onChange = {e => this.setState({ trial_count: e.target.value})} 
                    />  
                </Grid> 
                
                
                <Grid align ='center' item xs= {12}> 
                    <TextField
                        id="outlined-x"
                        label="Number of Successes (X)"
                        variant="outlined"
                        className={classes.textField}                       
                        margin="normal"
                        align= 'left'
                        onChange = {e => this.setState({ x: e.target.value})} 
                    />  
                </Grid>

                <Grid item align = 'center'>
                    <Button 
                        variant="contained"
                            color="secondary" 
                            onClick={this.calculateBionomial}
                            className={classes.button}
                            style={{justifyContent: 'center'}}
                            size="large"
                        >
                            Calculate
                    </Button>
                </Grid>
                </Grid>
                </div>
                {/**Output hidden until server response is accepted*/}
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

                {/** Awares user that text is copied */}
                <Snackbar
                    autoHideDuration={2000}
                    open={this.state.copy_text}
                    onClose={() => this.setState({copy_text: false})}
                    message={<span id="message-id">Copied to clipboard.</span>}
                />

                {/** Alert Copy to clipboard failed permission warning */}
                
            </div>
        );
    }
}

Bionomial_Distribution.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Bionomial_Distribution);
