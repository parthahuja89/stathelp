import React from 'react';
import PropTypes, { string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Card from  '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const styles = {
    button: {
        marginTop: '3%',
        fontSize: '1.5vh',
        textTransform: 'none',
    },
};

class Normal extends React.Component{
    state = {
        //true when server output available
        showOutput: false,
    };

    render(){
        const { classes } = this.props;
        return(
            <div>

            {/** Once Output recieved calculation fields are removed */}
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
                    Z score
                    </div>
                </Grid>
                <Grid align ='left' item xs= {6}> 
                    <TextField
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        className={classes.textField}                       
                        align= 'left'
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
                        className={classes.textField}                       
                        style = {{maxWidth: '70px', marginTop: '5px'}}
                        align= 'left'
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
                        className={classes.textField}                       
                        margin = 'normal'
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
                </div>

            </div>
        );
    }
}

Normal.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Normal);
