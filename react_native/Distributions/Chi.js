import * as React from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, Picker} from 'react-native';
import {TextInput, Button, Snackbar, DataTable, IconButton} from 'react-native-paper';
import axios from 'axios';

const win = Dimensions.get('window')

export default class Chi extends React.Component{
    constructor(){
        super();
        this.calculateChi = this.calculateChi.bind(this);
    }
    state = {
        freedom: '',
        x: '',
        rounding: '',

        //warnings
        empty_data_warning: '',

    }

    /*
    * Sends GET request to server 
    * Request: /Chi
    * Json payload: {freedom: '',  x: 'random variable', rounding: 'rounding decimal place'}
    */
    calculateChi(){
        //checking for errors and sending warning
        if(this.state.x == '' || this.state.freedom == '' || this.state.rounding == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else{
            console.log("freedom: " + this.state.freedom)
            console.log("X: " + this.state.x)

            axios.get('http://stathelp.herokuapp.com/Chi', {
                //GET Request payload 
                params: {
                    freedom: String(this.state.freedom),
                    x: String(this.state.x),
                    rounding: String(this.state.rounding),
                }
            })
            .then(res =>{
                //response 
                var res_json = res.data
                console.log("Server Response: " + JSON.stringify(res_json))
                //Response JSON: {answer(=) , answer_lt(<), answer_lt_eq(=<), answer_gt_eq(>=)}
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
                {!this.state.showOutput &&
                <View>
                {/** Input Field */}
                <TextInput
                        label='Degrees of freedom'
                        value={this.state.freedom}
                        onChangeText= {text  => this.setState({freedom: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                />


                <TextInput
                        label='Random Variable (X)'
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
                <Button  mode="contained" onPress={this.calculateChi} style={styles.button}>
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
                </View>
                }
                {/** Server Output */}
                {this.state.showOutput &&
                        <View style={styles.outputFlexbox}>
                        <IconButton icon='arrow-back' onPress = {() => this.setState({showOutput: false})}/>
                         <DataTable style = {styles.table}>
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
        top: 125,
    },
    outputFlexbox:{
      
    },
    table:{
        width: win.width/1.3,
    }
})

