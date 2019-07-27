import * as React from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, Picker} from 'react-native';
import firebase from 'react-native-firebase';
import {TextInput, Button, Snackbar, DataTable, IconButton, Paragraph, Portal, Dialog} from 'react-native-paper';
import axios from 'axios';

const win = Dimensions.get('window')

//ads
const Interstitial = firebase.admob().interstitial('ca-app-pub-8336331709242638/6318248804');
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

export default class Geometric extends React.Component{
    constructor(){
        super();
        this.calculateGeo = this.calculateGeo.bind(this);
        Interstitial.loadAd(request.build());
    }
    state ={
        probability: '',
        failure: '',
        rounding: '',

        empty_data_warning: false,
        probability_warning: false,

        //server res
        answer: '',
        answer_lt: '',
        answer_gt: '',
        answer_lt_eq: '',
        answer_gt_eq: '',

        //true once server output is recieved
        showOutput:false, 
    }
    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => this.setState({ visible: false });
    /**
     * Sends GET request to server 
     * Request: /Chi
     * Json payload: {failure: number of trials, probablity: prob of success}
     */
    calculateGeo(){
        //checking for errors and sending warning
        if(this.state.failure == '' || this.state.probability == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else if(this.state.probability <0 || this.state.probability > 1){
            console.log("Probability not in range")
            this.setState({probability_warning: true})
        }

        else{
            Interstitial.show()
            console.log("Probability of success: " + this.state.probability)
            console.log("Number of failures: " + this.state.failure)

            axios.get('http://stathelp.herokuapp.com/Geo', {
                //GET Request payload 
                params: {
                    probability: String(this.state.probability),
                    failure: String(this.state.failure),
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
                    answer_lt : res_json['Answer_lt'],
                    answer_lt_eq: res_json['Answer_lt_eq'],
                    answer_gt: res_json['Answer_gt'],
                    answer_gt_eq: res_json['Answer_gt_eq'],

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
                        label='Probability of Success'
                        value={this.state.probability}
                        onChangeText= {text  => this.setState({probability: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                />


                <TextInput
                        label='Number of trials (n)'
                        value={this.state.failure}
                        onChangeText= {text  => this.setState({failure: text})}
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

                <Button  mode="contained" onPress={this.calculateGeo} style={styles.button}>
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

                {/**  Probability not in 1-0 Range Warning */}
                <Snackbar
                        visible={this.state.probability_warning}
                        onDismiss={() => this.setState({ probability_warning: false })}
                        duration = {600}
                        style = {styles.Snackbar}
                        >
                        Probability must be between 0-1. 
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
                            <DataTable.Title numeric>Probability</DataTable.Title>
                            </DataTable.Header>

                            <DataTable.Row>
                            <DataTable.Cell> P(X=x)</DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer} 
                            </DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                            <DataTable.Cell> P(X{"<"}x)</DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer_lt} 
                            </DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                            <DataTable.Cell> P(X ≤ x)</DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer_lt_eq} 
                            </DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                            <DataTable.Cell>P(X{">"}x)</DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer_gt} 
                            </DataTable.Cell>
                            </DataTable.Row>
                            

                            <DataTable.Row>
                            <DataTable.Cell>P(X≥x)</DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer_gt_eq} 
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
                        • Probability must be between 0-1. {"\n"}
                        • Enter Number of trials, which includes the last trial with success.

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
        top: 150,
    },
    outputFlexbox:{

    },
    table:{
        width: win.width/1.3,
    }
})




