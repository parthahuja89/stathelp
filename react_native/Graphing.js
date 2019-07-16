import * as React from 'react';
import {View,Text, StyleSheet, ImageBackground, Picker} from 'react-native';
import { Dimensions, Clipboard} from 'react-native';
import BarChart from './Graphs/BarChart';


const win = Dimensions.get('window')

class Graphing extends React.Component {

    render(){
        return(
            <ImageBackground resizeMode = 'cover' source={require('./assets/utils/bg.png')} style ={styles.bg_image}>
                <BarChart/>
            </ImageBackground>

           
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
export default Graphing;