import * as React from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, Picker} from 'react-native';
import {TextInput, Button, Snackbar, DataTable, IconButton, Paragraph, Portal, Dialog} from 'react-native-paper';
import axios from 'axios';

const win = Dimensions.get('window')

export default class Normal extends React.Component{
    constructor(){
        super();
        this.calculateNormal = this.calculateNormal.bind(this);
    }
    state = {
        z_score: '',
        standard_dev: '',
        mean: '',

        //warnings
        empty_data_warning: '',

        //server res
        answer: '',
    }
    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => this.setState({ visible: false });
    /**
     * Sends GET request to server 
     * Request: /Normal
     * Json payload: {z_score, mean, standard_dev}
     */
    calculateNormal(){
        if(this.state.z_score == '' || this.state.mean == '' || this.state.standard_dev == ''){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else{
            console.log("Mean: " + this.state.mean)
            console.log("Standard dev: " + this.state.standard_dev)
            console.log("Z Score: " + this.state.z_score)


            axios.get('http://stathelp.herokuapp.com/Normal', {
                //GET Request payload 
                params: {
                    z_score: String(this.state.z_score),
                    mean: String(this.state.mean),
                    standard_dev: String(this.state.standard_dev)
                }
            })
            .then(res =>{
                //response 
                var res_json = res.data
                console.log("Server Response: " + JSON.stringify(res_json))
                this.setState({
                    showOutput: true, 
                    answer: res_json['Answer']
                })
            })
    
        }
    }

    render(){
        return(
            <View>
                {!this.state.showOutput &&
                <View>
                    <Button onPress={() => this._showDialog()}> Instructions </Button>
                {/** Input Field */}
                <TextInput
                        label='Z Score (z)'
                        value={this.state.z_score}
                        onChangeText= {text  => this.setState({z_score: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                />


                <TextInput
                        label='Mean'
                        value={this.state.mean}
                        onChangeText= {text  => this.setState({mean: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                />

                <TextInput
                        label='Standard Deviation'
                        value={this.state.standard_dev}
                        onChangeText= {text  => this.setState({standard_dev: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                />
                <Button  mode="contained" onPress={this.calculateNormal} style={styles.button}>
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
                            <DataTable.Cell numeric>{parseFloat(1-this.state.answer)} 
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
                        • Enter Random Variable (x/z), Mean, and Standard Deviation. {"\n"}

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

