import * as React from 'react';
import {View,Text, StyleSheet, ImageBackground, Picker} from 'react-native';
import { Dimensions, Clipboard} from 'react-native';
import { TextInput, List, Menu, Divider, Provider, Snackbar} from 'react-native-paper';

import { Title,Card,Button} from 'react-native-paper';

import {ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';
//Victory charts

import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";


const win = Dimensions.get('window')

class BarChart extends React.Component {
    constructor(){
        super();
        this.plot = this.plot.bind(this);
    }
    state = {
        x_axis:'',
        y_axis: '',

        graph_data: [],

        //warning
        empty_data_warning: false,
        unequal_axis: false,
    };

    /**
     * Populates the data array with cordinates
     */
    plot(){
        if(this.state.x_axis == '' || this.state.y_axis == ''){
            this.setState({ empty_data_warning: true})
            return
        }
        //converting x and y inputs into array 
        x_arr = this.state.x_axis.split(",")
        y_arr = this.state.y_axis.split(",")

        if(x_arr.length != y_arr.length){
            //unequal axis value warning
            this.setState({ unequal_axis: true})
            return
        }

        else{
            temp = []
            for(var i = 0; i < x_arr.length; i++){
                temp.push([x_arr[i], y_arr[i]])
            }
            console.log("Finished populating data: " + String(temp))
            this.setState({graph_data: temp})
            
        }
    }
    render(){
        return(
            <Provider>
            <ScrollView>
                <Card style={styles.card}>
                <Card.Content style={styles.content} >
                    <Title style={styles.title}>Graphing</Title>
                    <TextInput
                        label='X Axis'
                        value={this.state.x_axis}
                        onChangeText= {text  => this.setState({x_axis: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                    />

                    <TextInput
                        label='Y Axis'
                        value={this.state.y_axis}
                        onChangeText= {text  => this.setState({y_axis: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                    />

                    
                    <Button  mode="contained" onPress={this.plot} >
                        Plot
                    </Button>

                    <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}
                    >
                    <VictoryBar
                        style={{ data: { fill: "#EA4081" } }}
                        data={this.state.graph_data}
                        x={0}
                        y={1}
                    />
                    </VictoryChart>

                </Card.Content>
                </Card>
            </ScrollView>
            {/** Incomplete data warning  */}
            <Snackbar
                    visible={this.state.empty_data_warning}
                    onDismiss={() => this.setState({ empty_data_warning: false })}
                    duration = {600}
                    >
                    Incomplete Data. 
            </Snackbar>

            {/** Unequal Axis Warning  */}
            <Snackbar
                    visible={this.state.unequal_axis}
                    onDismiss={() => this.setState({ unequal_axis: false })}
                    duration = {2000}
                    >
                    X and Y axis are not equal.
            </Snackbar>

            </Provider>
           
        );
    }
}

const styles = StyleSheet.create({

    title:{
        fontSize: 20,
        textAlign: 'center',
    },
    instructions:{
        textAlign: 'center',
        top: 10,
    },
    bg_image:{
        flex: 1,
        alignSelf: 'center',
        width: win.width,
        height: win.height,
    },
    card: {
        margin: 20,
        height: win.height*0.93,
        alignItems: 'center',
        textAlign: 'center',
    },
    content:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: win.width/1.30
    },
    textField:{
        top: 50,
        width: win.width/1.30,
        backgroundColor: 'white',
    },
    button:{
        top: 50,
        maxWidth: win.width/1.30,
    },
    menu:{
        height: 100,                     
        width: win.width/1.30,                  
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
export default BarChart;