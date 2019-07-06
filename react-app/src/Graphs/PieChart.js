import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';

import Plot from 'react-plotly.js';

const styles = {
    root: {
        justifyContent: 'center'
    },
    button: {
        margin: '10% 0% 0% 0%',
        fontSize: '1.5vh',
        textTransform: 'none',
    },
}; 

class PieChart extends React.Component{
    constructor(){
        super();
        this.plot = this.plot.bind(this);
    }

    state = {
        labels: '',
        values: '',

        labels_arr: [],
        values_arr: [],
        showOutput: false,
        
        empty_data_warning: false,
        unequal_warning: false, 
    };
    /**
     * Prepares the user input for plotly and sets output to true 
     */
    plot(){
        console.log("Plotting Histogram")
        //check if input_data has been added 
        if(this.state.labels == '' || this.state.values == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })

        }
        else{
            //convert csv input_string -> array
            var label_array = this.state.labels.split(',')
            var values_array = this.state.values.split(',')

            if(label_array.length != values_array.length){
                this.setState({
                    unequal_warning: true,
                })
            }
            else{
            this.setState({ 
                labels_arr: label_array,
                values_arr: values_array,
                showOutput: true, 
            })
            }
        }
    }
    
    render(){
        const { classes } = this.props;
        return(
            <div style={{justifyContent: 'center'}}>
                <TextField
                    id="outlined-full-width"
                    
                    value = {this.state.labels}
                    onChange = {e => this.setState({labels: e.target.value})} 
                    label="Labels"
                    placeholder="Example: apples, oranges, lemons"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />

                <TextField
                    id="outlined-full-width"
                    
                    value = {this.state.values}
                    onChange = {e => this.setState({values: e.target.value})} 
                    label="Values"
                    placeholder="Example: 12, 11, 13"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <Grid item align = 'center'>
                <Button 
                        variant="contained"
                            color="secondary" 
                            onClick={this.plot}
                            className={classes.button}
                            style={{justifyContent: 'center'}}
                            size="medium"
                >
                            Plot
                </Button>
                </Grid>
                <div className= {this.state.showOutput ? '':'disappear' }>
                {/** Plotly Graph */}
                <Grid item align = 'center'>
                <Plot
                    data={[
                    {
                        values: this.state.values_arr,
                        labels: this.state.labels_arr,

                        type: 'pie',
                    },
                    ]}
                    layout={ {height: '100px', title: 'Pie Chart', autosize:true} }
                    useResizeHandler= {true}
                    style = {{width: "90%", height: "50%"}}
                />
                </Grid>
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
                    message={<span id="message-id">Labels and Values are not equal.</span>}
                
                />
            </div>
        );
    }
}

PieChart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PieChart);

