import * as React from 'react';
import {View,Text, StyleSheet, ImageBackground, Picker} from 'react-native';
import { Dimensions, Clipboard} from 'react-native';
import { TextInput, List, Menu, Divider, Provider, Snackbar} from 'react-native-paper';

import {
    Title,
    Caption,
    Paragraph,
    Card,
    Button,
    withTheme,
    Dialog, Portal,
    IconButton,
    DataTable  
  } from 'react-native-paper';
import {ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';

const win = Dimensions.get('window')

class Utils extends React.Component {
    constructor(){
        super();
        this.apiRequest = this.apiRequest.bind(this);
        this.copytoclipboard = this.copytoclipboard.bind(this);
    }
    state = {
        //textfield
        input_data: '',
        //operation selection
        operation: 'Arithmetic_Mean',
        //warning snackbar
        empty_data_warning: false,

        //server output
        answer: '',
        showOutput: false,

        //ouput copy to clipboard snackbar
        copied: false,
    };
    
    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });
  
    /**
     * Makes GET Request to Stathelp server 
     * Json payload: {input_data: 'csv_values'}
     */
    apiRequest(){
        console.log("Server request issued.")

        //empty data safety check
        if(this.state.input_data == ''){
            //send warning 
            this.setState({ empty_data_warning: true}) 
            console.log("%cCan't perform requests on empty data, sending warning.", "color: red; font-size: 20px")
        }else{

        axios.get('http://192.168.1.6:5000/' + String(this.state.operation), {
            //GET Request payload 
            params: {
                values: String(this.state.input_data)
            }
        })
        .then(res =>{
            //response 
            var res_json = res.data
            console.log("Server Response: " + JSON.stringify(res_json))
            //Displaying output once state set
            //Displaying output once state set
            this.setState({
                answer: res_json['Answer'],
                showOutput: true
            })
        })
        
    }
    }

    /***
     * Copies output to clipboard
     */
    copytoclipboard(){
        console.log("Copying text to clipboard")
        Clipboard.setString(this.state.answer)
        this.setState({copied: true})
    }
    render(){
        return(
            <Provider>
            <ImageBackground resizeMode = 'cover' source={require('./assets/utils/bg.png')} style ={styles.bg_image}>
            <ScrollView>
                <Card style={styles.card}>
                <Card.Content style={styles.aligments} >
                    <Title style={styles.aligments}>Utilities and Centeral Tendencies</Title>
                    <Caption>Instructions</Caption>
                    <TextInput
                        label='Input Data'
                        value={this.state.input_data}
                        onChangeText= {text  => this.setState({input_data: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                    />

                    {/** Operation Selection Menu */}

                    <Picker
                        selectedValue={this.state.operation}
                        style={styles.menu}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({operation: itemValue, showOutput: false})
                    }>
                        <Picker.Item  label="Arithmetic Mean" value="Arithmetic_Mean" />
                        <Picker.Item  label="Geometric Mean" value="Geometric_Mean" />
                        <Picker.Item  label="Harmonic Mean" value="Harmonic_Mean" />
                        <Picker.Item  label="Quadratic Mean" value="Quadratic_Mean" />
                        <Picker.Item  label="Median" value="Median" />
                        <Picker.Item  label="Mode" value="Mode" />
                        <Picker.Item  label="Range" value="Range" />
                        <Picker.Item  label="Variance(Population)" value="Variance" />
                        <Picker.Item  label="Variance(Sample)" value="Variance_Sample" />
                        <Picker.Item  label="Standard Deviation(Population)" value="Standard_Deviation_Population" />
                        <Picker.Item  label="Standard Deviation(Sample)" value="Standard_Deviation_Sample" />
                        <Picker.Item  label="Standard Error of Mean" value="Standard_Error" />

                    </Picker>

                     <Button  mode="contained" onPress={this.apiRequest} style={styles.button}>
                        Calculate
                    </Button>

                    {/** Shows server response -- Hidden until res accepted*/}
                    
                    {this.state.showOutput &&
                        <View style={styles.outputFlexbox}>
 
                         <DataTable>
                            <DataTable.Header>
                            <DataTable.Title>Operation</DataTable.Title>
                            <DataTable.Title numeric>Answer</DataTable.Title>
                            </DataTable.Header>

                            <DataTable.Row>
                            <DataTable.Cell>{this.state.operation.replace(/_/g, ' ')}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.state.answer} 
                            </DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                        <Button  onPress={this.copytoclipboard} style={styles.button}>
                            Copy to clipboard
                        </Button>  
                        </View>
                    }
                </Card.Content>  
                </Card>
            </ScrollView>
            </ImageBackground>
            {/** Incomplete data warning  */}
            <Snackbar
                    visible={this.state.empty_data_warning}
                    onDismiss={() => this.setState({ empty_data_warning: false })}
                    duration = {600}
                    >
                    Incomplete Data. 
            </Snackbar>

            {/** Copy to clipboard confirmation */}
            <Snackbar
                    visible={this.state.copied}
                    onDismiss={() => this.setState({ copied: false })}
                    duration = {600}
                    >
                    Copied to clipboard!
            </Snackbar>

            </Provider>
           
        );
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',

    },
    bg_image:{
        flex: 1,
        alignSelf: 'center',
        width: win.width,
        height: win.height,
    },
    card: {
        margin: 23,
        height: win.height/1.2,
        alignItems: 'center',
        textAlign: 'center',
       
    },
    textField:{
        top: 50,
        backgroundColor: 'white',
    },
    button:{
        top: 50,
    },
    menu:{
        height:    100,                     
        width: 300,                  
        top: 50,                   
    },
    outputFlexbox:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        top: 100,
    },
    output:{
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 17, 
        top: 125, 
    },
    copy:{
        top: 100,
    },
})
export default Utils;