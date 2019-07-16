import * as React from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, Picker} from 'react-native';

import {TextInput, Button, Snackbar, DataTable} from 'react-native-paper';
import axios from 'axios';

const win = Dimensions.get('window')

export default class Exponential extends React.Component{
    constructor(){
        super();
        this.calculateExponential = this.calculateExponential.bind(this);
    }
    state ={
        beta: '',
        rounding: '',
        x: '',

        empty_data_warning: false,

        //server res
        answer: '',

        //true once server output is recieved
        showOutput:false, 
    }

    /**
     * Sends GET request to server 
     * Request: /Exponential
     * Json payload: {population_size, population_success, sample_size,sample_success}
     */
    calculateExponential(){

        //Safety Checks 
        if( this.state.beta == '' || this.state.x == ''  || this.state.rounding == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }

        //Requesting 
        else{

            axios.get('http://stathelp.herokuapp.com/Expo', {
                //GET Request payload 
                params: {
                    x: String(this.state.x),
                    beta: String(this.state.beta),
                    rounding: String(this.state.rounding)
                }
            })
            .then(res =>{
                //response 
                var res_json = res.data
                console.log("Server Response: " + JSON.stringify(res_json))
                this.setState({ 
                    answer: res_json['Answer'],
                    showOutput: true,
                })
            })
    
        }
    }
    render(){
        return(
            <View>
                {/** Input Field */}
                <TextInput
                        label='β (1/λ)'
                        value={this.state.beta}
                        onChangeText= {text  => this.setState({beta: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                />


                <TextInput
                        label='Random Variable(X)'
                        value={this.state.x}
                        onChangeText= {text  => this.setState({x: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                />

                <TextInput
                        label='Rounding'
                        value={this.state.rounding}
                        onChangeText= {text  => this.setState({rounding: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                />
                <Button  mode="contained" onPress={this.calculateExponential} style={styles.button}>
                        Calculate
                </Button>

                {/** Incomplete data warning  */}
                <Snackbar
                        visible={this.state.empty_data_warning}
                        onDismiss={() => this.setState({ empty_data_warning: false })}
                        duration = {600}
                        style = {styles.Snackbar}
                        >
                        Incomplete Data. 
                </Snackbar>

                {/** Server Output */}
                {this.state.showOutput &&
                        <View style={styles.outputFlexbox}>
 
                         <DataTable>
                            <DataTable.Header>
                            <DataTable.Title>P(X)</DataTable.Title>
                            <DataTable.Title numeric>Probabiliy</DataTable.Title>
                            </DataTable.Header>


                            <DataTable.Row>
                            <DataTable.Cell>  P(X ≤ x)  </DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer} 
                            </DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                            <DataTable.Cell> P(X ≥ x) </DataTable.Cell>
                            <DataTable.Cell numeric>{parseFloat(1-this.state.answer).toFixed(this.state.rounding)} 
                            </DataTable.Cell>
                            </DataTable.Row>
                            

                        </DataTable>
                        <Button  onPress={this.copytoclipboard} style={styles.button}>
                            Copy to clipboard
                        </Button>  
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textField:{
        backgroundColor: 'white',
        maxWidth: win.width/1.08
    },
    button:{
        top: 50,
        maxWidth: win.width/1.08
    },
    Snackbar:{
        top: 150,
    },
    outputFlexbox:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        top: 50,
    },
})
