import * as React from 'react';
import {View,Text, StyleSheet, ImageBackground, Picker, StatusBar} from 'react-native';
import { ScrollView, Dimensions,Image} from 'react-native';
import BarChart from './Graphs/BarChart';
import BoxPlot from './Graphs/BoxPlot';
import PieChart from './Graphs/PieChart';
import Svg, {Path, Rect} from 'react-native-svg';

import {
    Title,
    Caption,
    Paragraph,
    Card,
    Button,
    withTheme,
    Dialog, Portal,
  } from 'react-native-paper';

const win = Dimensions.get('window')

class Graphing extends React.Component {

    render(){
        return(
            <ImageBackground resizeMode = 'cover' source={require('./assets/utils/bg.png')} style ={styles.bg_image}>
                {/** 42EAEA notch area with dark contents */}
                <StatusBar
                backgroundColor="#42EAEA"
                barStyle="dark-content"
                />
                <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                >    
                {/** Chart Selection */}
                <Card style={styles.card}>
                    <Card.Content style={styles.aligments} >
                        <Title style={styles.aligments}> Bar Chart </Title>
                        <Image source={require('./assets/Graphs/bar_chart.png')} style = {styles.dist}/>

                        <Card.Actions style={styles.aligments} >
                            <Button onPress={() => this._showDialog('Includes Mean, Median, Mode, Variance, Standard Deviation, and Standard Error.')}> More Info </Button>
                            <Button onPress={() => this.props.navigation.navigate('BarChart')}> Open </Button>
                        </Card.Actions>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content style={styles.aligments} >
                        <Title style={styles.aligments}> Box Plot </Title>
                        <Image source={require('./assets/Graphs/box_plot.png')} style = {styles.dist}/>
                        <Card.Actions style={styles.aligments} >
                            <Button onPress={() => this._showDialog('Includes Mean, Median, Mode, Variance, Standard Deviation, and Standard Error.')}> More Info </Button>
                            <Button onPress={() => this.props.navigation.navigate('BoxPlot')}> Open </Button>
                        </Card.Actions>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content style={styles.aligments} >
                        <Title style={styles.aligments}> Scatter Plot </Title>
                        <Image source={require('./assets/Graphs/scatter_chart.png')} style = {styles.dist}/>
                        <Card.Actions style={styles.aligments} >
                            <Button onPress={() => this._showDialog('Includes Mean, Median, Mode, Variance, Standard Deviation, and Standard Error.')}> More Info </Button>
                            <Button onPress={() => this.props.navigation.navigate('Scatter')}> Open </Button>
                        </Card.Actions>
                    </Card.Content>
                </Card>
                
                <Card style={styles.card}>
                    <Card.Content style={styles.aligments} >
                        <Title style={styles.aligments}> Pie Chart </Title>
                        <Image source={require('./assets/Graphs/pie_chart.png')} style = {styles.dist}/>
                        <Card.Actions style={styles.aligments} >
                            <Button onPress={() => this._showDialog('Includes Mean, Median, Mode, Variance, Standard Deviation, and Standard Error.')}> More Info </Button>
                            <Button onPress={() => this.props.navigation.navigate('PieChart')}> Open </Button>
                        </Card.Actions>
                    </Card.Content>
                </Card>


            </ScrollView>
            </ImageBackground>
           
        );
    }
}

const styles = StyleSheet.create({
    //main container flexbox 
    container: {
        flex: 1,
    },
    content: {
        padding: 2,
        justifyContent: 'center'
    },
    bg_image:{
        flex: 1,
        alignSelf: 'center',
        width: win.width,
        height: win.height,
    },
    card: {
        margin: 23,
        alignItems: 'center',
        textAlign: 'center'
    },
    dist:{
        height: 192,
        width: 310,
    },
    
    aligments: {
        alignItems: 'center',
        textAlign: 'center'
    }
})
export default Graphing;