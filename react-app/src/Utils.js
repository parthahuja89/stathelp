import React from 'react';
import './Utils.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import triangle_url from '../assets/utils/triangle_boy.svg'
//matrial styles 
const styles = {
    card: { 
        width: '90%',
        maxWidth: '1000px',
        minHeight: '80%',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        borderRadius: '5px',
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    textfield:{
        width: 20, 
    },
};


class Utils extends React.Component {
    state = { value:0, };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { classes } = this.props; //props for material ui
    return(
        <div class='utils'>
        <div class='title'>Distributions and Utilities</div>
        <Card width='50%' className={classes.card}>
              <CardContent>
              <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
        <Grid container justify= 'center'>
            <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            >
            <Tab label="Central Tendencies" />
            <Tab label="Center Distributions" />
            <Tab label="Probability Distributions" />
            </Tabs>
         </Grid>
        </Toolbar>
        </AppBar>
        {/*Card Content depeneds on tab selections*/}
                <TextField
                id="standard-full-width"
                label="Input Data"
                style={{ margin: 8 }}
                placeholder="Example: 12, 33, 44"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
            />
            Choose Operation: 
            {/*Menu for operation selection*/}
                <FormControl className={classes.formControl}>
                    <Select
                    displayEmpty
                    name="age"
                    className={classes.selectEmpty}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>Without label</FormHelperText>
            </FormControl>
        </CardContent>
          </Card>
        </div>
    );    
}  
}


Utils.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Utils);