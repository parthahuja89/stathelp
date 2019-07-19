import * as React from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, Picker} from 'react-native';
import {TextInput, Button, Snackbar, DataTable, IconButton} from 'react-native-paper';
import axios from 'axios';

const win = Dimensions.get('window')

export default class Hyper extends React.Component{
    constructor(){
        super();
        this.calculateHyper = this.calculateHyper.bind(this);
    }
    state = {
        population_size: '',
        population_success: '',
        sample_size: '',
        sample_success:  '',
        rounding: '',

        //warnings
        empty_data_warning: false,
        warning_1: false,
        warning_2: false,
        warning_3: false,
        warning_4: false,

    }

    /**
     * Sends GET request to server 
     * Request: /Hyper
     * Json payload: {population_size, population_success, sample_size,sample_success}
     */
    calculateHyper(){
        console.log("Population Size: " + this.state.population_size)
            console.log("Population Success: " + this.state.population_success)
            console.log("Sample Size: " + this.state.sample_size)
            console.log("Sample Success: " + this.state.sample_success)

        //Safety Checks 
        if( this.state.population_size == '' || 
            this.state.population_success == '' || 
            this.state.sample_size == '' || 
            this.state.sample_success == ''||
            this.state.rounding == ''
            ){
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
            this.setState({ empty_data_warning: true })
        }
        else if(parseInt(this.state.population_size) <= parseInt(this.state.sample_size) ){
            console.log("Population is smaller than sample")
            this.setState({ warning_1: true })
        }
        else if(parseInt(this.state.sample_size) < parseInt(this.state.sample_success)){
            console.log("Sample size is smaller than sample success")
            this.setState({ warning_2: true })
        }
        else if(parseInt(this.state.population_size) < parseInt(this.state.population_success)){
            this.setState({ warning_3: true })
        }
        else if(parseInt(this.state.sample_success) > parseInt(this.state.population_success)){
            this.setState({ warning_4: true })
        }

        //Requesting 
        else{

            axios.get('http://stathelp.herokuapp.com/Hyper', {
                //GET Request payload 
                params: {
                    population_size: String(this.state.population_size),
                    population_success: String(this.state.population_success),
                    sample_size: String(this.state.sample_size),
                    sample_success: String(this.state.sample_success),
                    rounding: String(this.state.rounding)
                }
            })
            .then(res =>{
                //response 
                var res_json = res.data
                console.log("Server Response: " + JSON.stringify(res_json))
                this.setState({ 
                    answer: res_json['Answer'],
                    answer_lt: res_json['Answer_lt'],
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
                {!this.state.showOutput &&
                <View>
                {/** Input Field */}
                <TextInput
                        label= 'Population Size'
                        value={this.state.population_size}
                        onChangeText= {text  => this.setState({population_size: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                />


                <TextInput
                        label='Population Success'
                        value={this.state.population_success}
                        onChangeText= {text  => this.setState({population_success: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                />

                <TextInput
                        label='Sample Size'
                        value={this.state.sample_size}
                        onChangeText= {text  => this.setState({sample_size: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                />

                <TextInput
                        label='Sample Success'
                        value={this.state.sample_success}
                        onChangeText= {text  => this.setState({sample_success: text})}
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
                <Button  mode="contained" onPress={this.calculateHyper} style={styles.button}>
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

                {/** Warning 1-4 */}
                <Snackbar
                        visible={this.state.warning_1}
                        onDismiss={() => this.setState({ warning_1: false })}
                        style = {styles.Snackbar}
                        >
                         Population must be greater than sample.
                </Snackbar>

                <Snackbar
                        visible={this.state.warning_2}
                        onDismiss={() => this.setState({ warning_2: false })}
                        duration = {600}
                        style = {styles.Snackbar}
                        >
                        Sample Success can't be greater than sample size. 
                </Snackbar>

                <Snackbar
                        visible={this.state.warning_3}
                        onDismiss={() => this.setState({ warning_3: false })}
                        duration = {600}
                        style = {styles.Snackbar}
                        >
                        Population Success can't be greater than Population size.
                </Snackbar>

                <Snackbar
                        visible={this.state.warning_4}
                        onDismiss={() => this.setState({ warning_4: false })}
                        duration = {600}
                        style = {styles.Snackbar}
                        >
                        Sample Success can't be greater than Population Success.
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
                            <DataTable.Cell> Answer</DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer} 
                            </DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                            <DataTable.Cell> Answer_lt</DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer_lt} 
                            </DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                            <DataTable.Cell> Answer_gt</DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer_gt} 
                            </DataTable.Cell>
                            </DataTable.Row>
                            
                            <DataTable.Row>
                            <DataTable.Cell> Answer_lt_eq</DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer_lt_eq} 
                            </DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                            <DataTable.Cell> Answer_gt_eq</DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer_gt_eq} 
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
        top: 15,
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

