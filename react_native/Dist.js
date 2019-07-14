import * as React from 'react';
import {ScrollView, Text, StyleSheet, ImageBackground, Dimensions, Picker} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
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
import Normal from './Distributions/Normal';

const dist = [ 
    <Bio/>,
    <Normal/>
]

export default class Dist extends React.Component{
    state = {
        dist_component: 0,

    }
    render(){
        return(
            <ImageBackground resizeMode = 'cover' source={require('./assets/utils/bg.png')} style ={styles.bg_image}>
            <ScrollView> 
            <Card style={styles.card}>
            <Card.Content style={styles.aligments} >
            <Title style={styles.title}>Probability Distributions</Title>
            {/** Picker selection decides what distribution component is rendered */}
            <Picker
                selectedValue={this.state.dist_component}
                style={{height: 100, width: 250}}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({dist_component: itemValue})
            }>
                <Picker.Item label="Bionomial Distribution" value={0} />
                <Picker.Item label="Normal Distribution" value={1} />
            </Picker>

            {/** Selection based rendering of each dist component */}
            {dist[this.state.dist_component]}

            </Card.Content>
            </Card>
            </ScrollView> 
            </ImageBackground>
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
        height: win.height/1.05,
        alignItems: 'center',
        textAlign: 'center',
    },
})