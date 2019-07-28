import * as React from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, Picker} from 'react-native';

import {TextInput, Button, Snackbar, DataTable, IconButton, Paragraph, Portal, Dialog} from 'react-native-paper';
import axios from 'axios';
import firebase from 'react-native-firebase';
const win = Dimensions.get('window')

//ads
const Interstitial = firebase.admob().interstitial('ca-app-pub-8336331709242638/8113001611');
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

export default class Exponential extends React.Component{
    constructor(){
        super();
        this.calculateExponential = this.calculateExponential.bind(this);
        Interstitial.loadAd(request.build());
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
    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => this.setState({ visible: false });
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
            Interstitial.show()
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
            <Button onPress={() => this._showDialog()}> Instructions </Button>
            {!this.state.showOutput &&
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
                {/** Instructions Dialog*/}
                <Portal>
                <Dialog
                    visible={this.state.visible}
                    onDismiss={this._hideDialog}>
                    <Dialog.Title style= {{textAlign:'center'}}>Instructions</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style= {{textAlign:'center'}}>
                        • Enter β. Note: λ=1/β.  {"\n"}
                        • Enter Random Variable(X). {"\n"}
                        • Convert fractions to demical before calculating.

                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                    <Button onPress={this._hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
                </Portal>

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
