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

class Hyper extends React.Component{
    constructor(){
        super();
        this.calculateHyper = this.calculateHyper.bind(this) 
    }
    state ={
        empty_data_warning: false,
        warning_1: false,
        warning_2: false,
        warning_3: false, 

        showOutput: false,

        population_size: '',
        population_success: '',
        sample_size: '',
        sample_success: '',
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
     * Request: /Hyper
     * Json payload: {population_size, population_success, sample_size,sample_success}
     */
    calculateHyper(){
        console.log("Population Size: " + this.state.population_size)
            console.log("Population Success: " + this.state.population_success)
            console.log("Sample Size: " + this.state.sample_size)
            console.log("Sample Success: " + this.state.sample_success)

        //Safety Checks 
        if( this.state.population_size == '' || 
            this.state.population_success == '' || 
            this.state.sample_size == '' || 
            this.state.sample_success == ''||
            this.state.rounding == ''
            ){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else if(parseInt(this.state.population_size) <= parseInt(this.state.sample_size) ){
            console.log("Population is smaller than sample")
            this.setState({ warning_1: true })
        }
        else if(parseInt(this.state.sample_size) < parseInt(this.state.sample_success)){
            console.log("Sample size is smaller than sample success")
            this.setState({ warning_2: true })
        }
        else if(parseInt(this.state.population_size) < parseInt(this.state.population_success)){
            this.setState({ warning_3: true })
        }
        else if(parseInt(this.state.sample_success) > parseInt(this.state.population_success)){
            this.setState({ warning_4: true })
        }

        //Requesting 
        else{

            axios.get('https://stathelp.herokuapp.com/Hyper', {
                //GET Request payload 
                params: {
                    population_size: String(this.state.population_size),
                    population_success: String(this.state.population_success),
                    sample_size: String(this.state.sample_size),
                    sample_success: String(this.state.sample_success),
                    rounding: String(this.state.rounding)
                }
            })
            .then(res =>{
                //response 
                var res_json = res.data
                console.log("Server Response: " + JSON.stringify(res_json))
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
    render(){
        const { classes } = this.props;
        return(
            <div>
                <div className= {this.state.showOutput ? 'disappear':'' }>
                {/** Instructions */}
                <div class = 'instructions'>
                    <ExpansionPanel>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography className={classes.heading}>Instructions</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                • Sample Size must be smaller than Population Size. <br/>
                                • Number of Successes must be smaller than parent. <br/>
                                • The number of successes in the sample must be less than or equal to the number of successes in the population. <br/>
                                • Rounding Decimal must be between 0-100. <br/>
                            </Typography>
                            </ExpansionPanelDetails>
                    </ExpansionPanel>
                
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
                        label="Population Size(N)"
                        variant="outlined"
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        onChange = {e => this.setState({ population_size: e.target.value})} 
                />  
                </Grid>
                
                <Grid align ='center' item xs= {12}> 
                    <TextField
                        id="outlined-name"
                        label="Successes in Population"
                        variant="outlined"
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        onChange = {e => this.setState({ population_success: e.target.value})} 
                />  
                </Grid>

                <Grid align ='center' item xs= {12}> 
                    <TextField
                        id="outlined-name"
                        label="Sample Size"
                        variant="outlined"
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        onChange = {e => this.setState({ sample_size: e.target.value})} 
                />  
                </Grid>
                
                <Grid align ='center' item xs= {12}> 
                    <TextField
                        id="outlined-name"
                        label="Sample Success"
                        variant="outlined"
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        onChange = {e => this.setState({ sample_success: e.target.value})} 
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
                            onClick={this.calculateHyper}
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
                {/** warning_1 : Sample greater than population warning */}
                <Snackbar
                        
                        open={this.state.warning_1}
                        onClose={() => this.setState({warning_1: false})}
                        message={<span id="message-id">Population must be greater than sample.</span>}
                />

                {/** warning_2 : Sample Success greater than sample size warning */}
                <Snackbar
                        
                        open={this.state.warning_2}
                        onClose={() => this.setState({warning_2: false})}
                        message={<span id="message-id">Sample Success can't be greater than sample size.</span>}
                />

                {/** warning_3 : Population Success greater than population size warning */}
                <Snackbar
                        
                        open={this.state.warning_3}
                        onClose={() => this.setState({warning_3: false})}
                        message={<span id="message-id">Population Success can't be greater than Population size.</span>}
                />

                {/** warning_4 : The number of successes in the sample must be less than or equal to the number of successes in the population. */}
                <Snackbar
                        
                        open={this.state.warning_4}
                        onClose={() => this.setState({warning_4: false})}
                        message={<span id="message-id">Sample Success can't be greater than Population Success.</span>}
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


Hyper.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Hyper);


    