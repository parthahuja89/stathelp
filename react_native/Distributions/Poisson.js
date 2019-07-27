import * as React from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, Picker} from 'react-native';
import {TextInput, Button, Snackbar, DataTable, IconButton, Paragraph, Portal, Dialog} from 'react-native-paper';
import axios from 'axios';
import firebase from 'react-native-firebase';
const win = Dimensions.get('window')


export default class Chi extends React.Component{
    constructor(){
        super();
        this.calculatePoisson = this.calculatePoisson.bind(this);
        Interstitial.loadAd(request.build());
    }
    state = {
        average: '',
        x: '',
        rounding: '',

        //warnings
        empty_data_warning: '',

    }
    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => this.setState({ visible: false });
    /**
     * Sends GET request to server 
     * Request: /Poisson
     * Json payload: {average: '',  x: 'random variable', rounding: 'rounding decimal place'}
     */
    calculatePoisson(){
        //checking for errors and sending warning
        if(this.state.x == '' || this.state.average == '' || this.state.rounding == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else{
            console.log("Average: " + this.state.average)
            console.log("X: " + this.state.x)

            axios.get('http://stathelp.herokuapp.com/Poisson', {
                //GET Request payload 
                params: {
                    average: String(this.state.average),
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
                    answer_lt: res_json['Answer_lt'],
                    answer_lt_eq: res_json['Answer_lt_eq'],
                    answer_gt: res_json['Answer_gt'],
                    answer_gt_eq: res_json['Answer_gt_eq'],
                    
                    showOutput: true,
                })
            })
    
    }}

    render(){
        return(
            <View>
                {!this.state.showOutput &&
                <View>
                <Button onPress={() => this._showDialog()}> Instructions </Button>
                {/** Input Field */}
                <TextInput
                        label='Average'
                        value={this.state.average}
                        onChangeText= {text  => this.setState({average: text})}
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
                <Button  mode="contained" onPress={this.calculatePoisson} style={styles.button}>
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
                        • Enter Average rate of success and Poisson random variable.{"\n"}
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

