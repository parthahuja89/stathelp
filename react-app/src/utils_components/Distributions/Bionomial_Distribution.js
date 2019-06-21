import React from 'react';
import PropTypes, { string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Copy from '@material-ui/icons/AssignmentOutlined';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

const styles = {
    button: {
        marginTop: '10%',
        fontSize: '1.5vh',
        textTransform: 'none',
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
        //snackbar warning
        empty_data_warning: false,
        comparison_warning: false,
        probability_warning: false,
        
        //server response
        answer: '',
        //true when server output available
        showOutput: false,
    };

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
                //Displaying output once state set
                this.setState({
                    answer: res_json['Answer'],
                    showOutput: true
                })
            })
    
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <div>                             
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
                    Probability of Success
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        id="standard-name"
                        className={classes.textField}                       
                        margin="normal"
                        align= 'left'
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        onChange = {e => this.setState({success: e.target.value})} 
                    />  
                </Grid> 

                <Grid align= 'right' item xs ={6}>
                    <div style = {{fontSize:'1.8vh', verticalAlign:'middle'}}>
                    Trial Count
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        id="standard-name"
                        className={classes.textField}                       
                        margin="normal"
                        align= 'left'
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        onChange = {e => this.setState({ trial_count: e.target.value})} 
                    />  
                </Grid> 
                
                <Grid align= 'right' item xs ={6}>
                    <div style = {{fontSize:'1.8vh', verticalAlign:'middle'}}>
                    Number of Successes (X)
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        id="standard-name"
                        className={classes.textField}                       
                        margin="normal"
                        align= 'left'
                        style = {{maxWidth: '70px', marginTop: '5px'}}
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

                {/**Output hidden until server response is accepted*/}
                <div className= {this.state.showOutput ? 'distribution_final_output':'disappear' }>
                    <div id ='output_text' style = {{fontSize:'1.8vh'}}>
                    P(X=x): 
                    {this.state.answer}
                    <IconButton style = {{ marginTop: '-0.3%'}} aria-label="Add" onClick = {this.copyToClipboard}>
                        <Copy/>
                    </IconButton>
                </div>
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
                {/**X greater than trial count warning*/}
                <Snackbar
                    autoHideDuration={2500}
                    open={this.state.comparison_warning}
                    onClose={() => this.setState({comparison_warning: false})}
                    message={<span id="message-id">X can't be greater than trial count.</span>}
                />
            </div>
        );
    }
}

Bionomial_Distribution.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Bionomial_Distribution);
