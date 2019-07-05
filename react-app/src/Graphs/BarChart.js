import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import Plot from 'react-plotly.js';

const styles = {

}; 

class BarChart extends React.Component{
    constructor(){
        super();
        this.plot = this.plot.bind(this);
    }

    state = {
        x_axis: '',
        y_axis:'',
        x_array: [],
        y_array: [],
        showOutput: false,
        
        empty_data_warning: false,
        unequal_warning : false,
    };
    /**
     * Prepares the user input for plotly and sets output to true 
     */
    plot(){
        console.log("Plotting BarChart")
        //check if input_data has been added 
        if(this.state.x_axis == '' || this.state.y_axis == '' ){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })

        }
        else{
            //convert csv input_string -> array
            var x_arr = this.state.x_axis.split(',')
            var y_arr = this.state.y_axis.split(',')

            if(x_arr.length != y_arr.length){
                this.setState({unequal_warning: true })
               
            }
            else{
                this.setState({ 
                    showOutput: true, 
                    x_array: x_arr,
                    y_array: y_arr,
                })
            }
        }
    }
    
    render(){
        const { classes } = this.props;
        return(
            <div>
                <div className= {this.state.showOutput ? 'disappear':'' }>
                <TextField
                    id="outlined-full-width"
                    
                    value = {this.state.x_axis}
                    onChange = {e => this.setState({x_axis: e.target.value})} 
                    label="X axis"
                    placeholder="Example: apples, oranges, lemon"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />

                <TextField
                    id="outlined-full-width"
                    
                    value = {this.state.y_axis}
                    onChange = {e => this.setState({y_axis: e.target.value})} 
                    label="Y axis"
                    placeholder="Example: 12, 33, 44"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />

                <Button 
                        variant="contained"
                            color="secondary" 
                            onClick={this.plot}
                            className={classes.button}
                            style={{justifyContent: 'center'}}
                            size="large"
                >
                            Plot
                </Button>
                </div>
                <div className= {this.state.showOutput ? 'plotly_output':'disappear' }>
                {/** Plotly Graph */}
                <Plot
                    data={[
                    {
                        x: this.state.x_array,
                        y: this.state.y_array,
                        type: 'bar',
                    },
                    ]}
                    layout={ {  height: '100px',title: 'Bar Chart', autosize:true} }
                    useResizeHandler= {true}
                    style = {{width: "80%", height: "40%"}}
                />
                </div>

                {/** Empty data Warning SnackBar */}
                <Snackbar
                    autoHideDuration={2000}
                    open={this.state.empty_data_warning}
                    onClose={() => this.setState({empty_data_warning: false})}
                    message={<span id="message-id">Incomplete Data.</span>}
                
                />

                {/** Unequal axis  Warning SnackBar */}
                <Snackbar
                    open={this.state.unequal_warning}
                    onClose={() => this.setState({unequal_warning: false})}
                    message={<span id="message-id">X axis is not equal to Y axis.</span>}
                
                />

            </div>
        );
    }
}

BarChart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BarChart);

