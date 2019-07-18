import * as React from 'react';
import {View,Text, StyleSheet, ImageBackground, Picker} from 'react-native';
import { Dimensions, Clipboard} from 'react-native';
import { TextInput, List, Menu, Divider, Provider, Snackbar} from 'react-native-paper';

import { Title,Card,Button} from 'react-native-paper';

import {ScrollView } from 'react-native-gesture-handler';

//Victory charts

import { VictoryBoxPlot, VictoryChart, VictoryTheme, VictoryAxis} from "victory-native";


const win = Dimensions.get('window')

class BoxPlot extends React.Component {
    constructor(){
        super();
        this.plot = this.plot.bind(this);
    }
    state = {
        y_axis: '',

        graph_data: [0],

        //warning
        empty_data_warning: false,
        unequal_axis: false,

        showOutput: false, 
    };

    /**
     * Populates the data array with cordinates
     */
    plot(){
        if(this.state.y_axis == ''){
            this.setState({ empty_data_warning: true})
            return
        }
        //converting x and y inputs into array 
        y_arr = this.state.y_axis.split(",")

        temp = []
        for(var i = 0; i < y_arr.length; i++){
            temp.push([y_arr[i]])
        }


        this.setState({graph_data: temp, showOutput: true})
  
    }
    render(){
        return(
            <Provider>
            <ScrollView>
                <Card style={styles.card}>
                <Card.Content style={styles.content} >
                    <Title style={styles.title}>Box Plot</Title>

                    <TextInput
                        label='Data'
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
                    {this.state.showOutput &&
                    <VictoryChart domainPadding={20}
                    
                    >
                        <VictoryAxis tickFormat={(datum) => datum.y} />
                        <VictoryBoxPlot
                        minLabels
                        maxLabels
                        data={[
                            { x: 1, y: this.state.graph_data },
                        ]}
                        style={{
                            min: { stroke: "tomato" },}}
                        />
                    </VictoryChart>
                    }
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
        top: 0,
        width: win.width/1.30,
        backgroundColor: 'white',
    },
    button:{
        top: 10,
        maxWidth: win.width/1.30,
    },

})
export default BoxPlot;