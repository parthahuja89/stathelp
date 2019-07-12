import * as React from 'react';
import {View,Text, StyleSheet, ImageBackground} from 'react-native';
import { Dimensions } from 'react-native';
import { TextInput, List, Menu, Divider, Provider} from 'react-native-paper';

import {
    Title,
    Caption,
    Paragraph,
    Card,
    Button,
    withTheme,
    Dialog, Portal,
  } from 'react-native-paper';
import {ScrollView } from 'react-native-gesture-handler';

const win = Dimensions.get('window')

class Utils extends React.Component {
    state = {
        //textfield
        input_data: '',
        //menu
        visible: false,
    };
    
    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });
  

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
                    <Menu
                        visible={this.state.visible}
                        onDismiss={this._closeMenu}
                        anchor={
                        <Button onPress={this._openMenu}>Operation</Button>
                        }
                        style ={styles.menu}

                    >
                        <Menu.Item onPress={() => {}} title="Arithmetic Mean" />
                        <Menu.Item onPress={() => {}} title="Geometric Mean" />
                        <Menu.Item onPress={() => {}} title="Harmonic Mean" />
                        <Menu.Item onPress={() => {}} title="Quadratic Mean" />
                        <Menu.Item onPress={() => {}} title="Median" />
                        <Menu.Item onPress={() => {}} title="Mode" />
                        <Menu.Item onPress={() => {}} title="Range" />
                        <Menu.Item onPress={() => {}} title="Variance(Population)" />
                        <Menu.Item onPress={() => {}} title="Variance(Sample)" />
                        <Menu.Item onPress={() => {}} title="Standard Deviation(Population)" />
                        <Menu.Item onPress={() => {}} title="Standard Deviation(Sample)" />
                        <Menu.Item onPress={() => {}} title="Standard Error of Mean" />
                    </Menu>
                     <Button  mode="contained" onPress={() => console.log('Pressed')} style={styles.button}>
                        Calculate
                    </Button>

                </Card.Content>
                </Card>
                
            </ScrollView>
            </ImageBackground>
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
        top: 100,
    },
    menu:{
        top: 50,
    }
})
export default Utils;