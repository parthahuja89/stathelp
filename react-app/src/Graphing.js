import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import Plot from 'react-plotly.js';

import './Graphing.css';
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
        justifyContent: 'center',
    },
}; 

class Graphing extends React.Component{
    state = {
        input_data: ''
    };
    render(){
        const { classes } = this.props;
        return(
            <div class = 'Graphing'>
                <div class ='title'>
                    Graphing
                </div>
                <Card className={classes.card}>
                <CardContent>
                    <TextField
                            id="outlined-full-width"
                            
                            value = {this.state.input_data}
                            onChange = {e => this.setState({input_data: e.target.value})} 
                            label="Input Data"
                            placeholder="Example: 12, 33, 44"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                            shrink: true,
                            }}
                    />

                {/** Graph Plot */}
                <Plot
                    data={[
                    {
                        x: [20, 14, 23],
                        y: [20, 14, 21],
                        mode: 'lines',
                        type: 'scatter'
                    },
                    ]}
                    layout={ {width: '10vh', height: '20vh', title: 'Chart'} }
                />
                
                </CardContent>
                </Card>
            </div>
        );
    }
}

Graphing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Graphing);
