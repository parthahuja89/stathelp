import * as React from 'react';
import {ScrollView, Text, StyleSheet, ImageBackground, Dimensions, Picker, StatusBar} from 'react-native';
import {Provider} from 'react-native-paper';
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

const win = Dimensions.get('window')

//Distribution Components 
import Bio from './Distributions/Bionomial';
import Chi from './Distributions/Chi';
import Expo from './Distributions/Exponential';
import Geo from './Distributions/Geometric';
import Hyper from './Distributions/Hypergeometric';
import Normal from './Distributions/Normal';
import Poisson from './Distributions/Poisson';


const dist = [ 
    <Bio/>,
    <Chi/>,
    <Expo/>,
    <Geo/>,
    <Hyper/>,
    <Normal/>,
    <Poisson/>
]

export default class Dist extends React.Component{
    state = {
        dist_component: 0,

    }
    render(){
        return(
            <Provider>
            <ImageBackground resizeMode = 'cover' source={require('./assets/utils/bg.png')} style ={styles.bg_image}>
            {/** white notch area with dark contents */}
            <StatusBar
            backgroundColor="#42EAEA"
            barStyle="dark-content"
            />
            <ScrollView> 
            <Card style={styles.card}>
            <Card.Content style={styles.aligments} >
            <Title style={styles.title}>Probability Distributions</Title>
            {/** Picker selection decides what distribution component is rendered */}
            <Picker
                selectedValue={this.state.dist_component}
                style={{height: 100, width: 250, marginTop: '-10%'}}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({dist_component: itemValue})
            }>
                <Picker.Item label="Bionomial Distribution" value={0} />
                <Picker.Item label="Chi Squared Distribution" value={1} />
                <Picker.Item label="Expo Distribution" value={2} />
                <Picker.Item label="Geometric Distribution" value={3} />
                <Picker.Item label="Hypergeometric Distribution" value={4} />
                <Picker.Item label="Normal Distribution" value={5} />
                <Picker.Item label="Poisson Distribution" value={6} />
            </Picker>

            {/** Selection based rendering of each dist component */}
            {dist[this.state.dist_component]}

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
})