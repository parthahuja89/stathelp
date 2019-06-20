import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';

const styles = {
    button: {
        marginTop: '10%',
        fontSize: '1.5vh',
        textTransform: 'none',
    },
};

class Bionomial_Distribution  extends React.Component{
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
                    />  
                </Grid>

                <Grid item align = 'center'>
                    <Button 
                        variant="contained"
                            color="secondary" 
                            className={classes.button}
                            style={{justifyContent: 'center'}}
                            size="large"
                        >
                            Calculate
                    </Button>
                </Grid>
                </Grid>
            </div>
        );
    }
}

Bionomial_Distribution.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Bionomial_Distribution);
