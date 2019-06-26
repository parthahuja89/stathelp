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

class Hyper extends React.Component{
    constructor(){
        super();
        this.calculateHyper = this.calculateHyper.bind(this) 
    }
    state ={
        showOutput: false,

        population_size: '',
        population_success: '',
        sample_size: '',
        sample_success: '',
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
        if(this.state.population_size == '' || this.state.population_success == '' || this.state.sample_size == '' || this.state.sample_success == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else{
            


            axios.get('http://localhost:5000/Hyper', {
                //GET Request payload 
                params: {
                    population_size: String(this.state.population_size),
                    population_success: String(this.state.population_success),
                    sample_size: String(this.state.sample_size),
                    sample_success: String(this.state.sample_success)
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
                    Population Size(N) 
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        className={classes.textField}                       
                        align= 'left'
                        onChange = {e => this.setState({population_size: e.target.value})}
                    />  
                </Grid>  
                
                <Grid align= 'right' item xs ={6}>
                    <div style = {{fontSize:'1.8vh', verticalAlign:'middle'}}>
                    Number of successes of Population
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        onChange = {e => this.setState({ population_success: e.target.value})} 
                    />  
                </Grid>

                <Grid align= 'right' item xs ={6}>
                    <div style = {{fontSize:'1.8vh', verticalAlign:'middle'}}>
                        Sample Size(n)
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        onChange = {e => this.setState({ sample_size: e.target.value})} 
                    />  
                </Grid>

                <Grid align= 'right' item xs ={6}>
                    <div style = {{fontSize:'1.8vh', verticalAlign:'middle'}}>
                    Number of successes of sample
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        className={classes.textField}                       
                        margin = 'normal'
                        align= 'left'
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        onChange = {e => this.setState({ sample_success: e.target.value})} 
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

                </div>
            </div>
        );
    }
}


Hyper.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Hyper);


    