import * as React from 'react';
import {View,Text, StyleSheet, ImageBackground, Picker} from 'react-native';
import { Dimensions, Clipboard} from 'react-native';
import { TextInput, List, Menu, Divider, Provider, Snackbar} from 'react-native-paper';
import firebase from 'react-native-firebase';
import { Title,Card,Button, Caption} from 'react-native-paper';

import {ScrollView } from 'react-native-gesture-handler';

//ads
const Interstitial = firebase.admob().interstitial('ca-app-pub-8336331709242638/9133836603');
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
//Victory charts

import { VictoryPie, VictoryChart, VictoryTheme } from "victory-native";


const win = Dimensions.get('window')

class PieChart extends React.Component {
    constructor(){
        super();
        this.plot = this.plot.bind(this);
        Interstitial.loadAd(request.build());
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
            Interstitial.show();
            temp = []
            for(var i = 0; i < x_arr.length; i++){
                temp.push([x_arr[i], parseInt(y_arr[i])])
            }
            console.log("Finished populating data: " + String(temp))
            this.setState({graph_data: temp, showOutput: true})
            
        }
    }
    render(){
        return(
            <Provider>
            <ImageBackground resizeMode = 'cover' source={require('../assets/utils/bg.png')} style ={styles.bg_image}>
            {!this.state.showOutput &&
            <ScrollView>
                <Card style={styles.card}>
                <Card.Content style={styles.content} >
                    <Title style={styles.title}>Pie Chart</Title>
                    
                    {/**Instructions */}
                    <Caption style= {styles.instructions}> 
                    Instructions {"\n"}
                    1. Enter Labels example: Apples, Mangoes, Lemon. {"\n"}
                    2. Enter Values corresponding to the labels example: 14,12,99.
                    </Caption>

                    <TextInput
                        label='Labels'
                        value={this.state.x_axis}
                        onChangeText= {text  => this.setState({x_axis: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        
                    />

                    <TextInput
                        label='Values'
                        value={this.state.y_axis}
                        onChangeText= {text  => this.setState({y_axis: text})}
                        style= {styles.textField}
                        multiline= {true}
                        mode= 'outlined'
                        keyboardType='numeric'
                    />

                    
                    <Button  mode="contained" style = {styles.button} onPress={this.plot}>
                        Plot
                    </Button>
                </Card.Content>
                </Card>
            </ScrollView>
            }

            {this.state.showOutput &&
            <Card style={styles.card}>
            <Card.Content style={styles.content} >
                    <VictoryPie
                        data={this.state.graph_data}
                        x={0}
                        y={1}
                        innerRadius={100}
                        padAngle={3}
                        height={400}
                        colorScale={["tomato", "orange", "pink", "cyan", "navy" ]}
                    />
                    <Button  mode="contained" style = {styles.button} onPress={() => this.setState({showOutput: false})}>
                        Back
                </Button>
                </Card.Content>
                </Card>
            }

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
            </ImageBackground>
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
        width: win.width/1.30,
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
        top: 20,
        width: win.width/1.30,
        backgroundColor: 'white',
    },
    button:{
        top: 50,
        maxWidth: win.width/1.30,
    },

})
export default PieChart;