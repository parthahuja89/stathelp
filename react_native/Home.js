/* @flow */

import * as React from 'react';
import { Alert, ScrollView, StyleSheet , Image, Text, View, Dimensions, ImageBackground} from 'react-native';
import {
  Title,
  Caption,
  Paragraph,
  Card,
  Button,
  withTheme,
  Dialog, Portal,
} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { IconButton, Colors } from 'react-native-paper';

const win = Dimensions.get('window')

class Home extends React.Component {
  static title = 'Card';
  state = {
    dialog: false,
    dialog_text: '',

  };
  _showDialog = (text) => this.setState({ 
    dialog: true,
    dialog_text: text
   });

  _hideDialog = () => this.setState({ dialog: false });

  render() {
    
    return (
      <PaperProvider>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >


      {/** Navabar Row Flexbox  */}
      <View style= {styles.inputWrap}>
        <Image source={require('./assets/main_page_svgs/logo.png')} style ={styles.logo_image}/>
        
        <Text style ={styles.Logo}>
        StatHelp
        </Text>

        <IconButton
          icon="menu"
          color={Colors.black}
          size={30}
          
          onPress={() => console.log('Pressed')}
        />
      </View>

        <Card style={styles.card}>
          <Card.Content style={styles.aligments} >
              <Title style={styles.aligments}>Utilities and Centeral Tendencies</Title>
              <Image source={require('./assets/main_page_svgs/dist.png')} style = {styles.dist}/>
              <Card.Actions style={styles.aligments} >
                <Button onPress={() => this._showDialog('Includes Mean, Median, Mode, Variance, Standard Deviation, and Standard Error.')}> More Info </Button>
                <Button onPress={() => this.props.navigation.navigate('Utils')}> Open </Button>
              </Card.Actions>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.aligments} >
              <Title style={styles.aligments}>Graphing Tools</Title>
              <Image source={require('./assets/main_page_svgs/graph.png')} style = {styles.graphing}/>
              <Card.Actions style={styles.aligments} >
                <Button onPress={() => this._showDialog('Includes graphing tools like bar charts, box plots, histogram, and pie charts.')}> More Info </Button>
                <Button onPress={ () => this.props.navigation.navigate('Graphing') }> Open </Button>
              </Card.Actions>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.aligments} >
              <Title style={styles.aligments}>Probability Distributions</Title>
              <Image source={require('./assets/main_page_svgs/probability.png')} style = {styles.prob}/>
              <Card.Actions style={styles.aligments} >
                <Button onPress={() => this._showDialog('Includes probability distributions like bionomial, normal, poisson etc.')}> More Info </Button>
                <Button onPress={() => this.props.navigation.navigate('Dist')}> Open </Button>
              </Card.Actions>
          </Card.Content>
        </Card>

        {/** More Information Dialog */}
        <Portal>
          <Dialog
             visible={this.state.dialog}
             onDismiss={this._hideDialog}>
            <Dialog.Title>More Information</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{this.state.dialog_text}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Okay</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>

      <ImageBackground source={require('./assets/main_page_svgs/background_curve.png')} style ={styles.bg_image} />
      </PaperProvider>
      
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
  //Row flex box for logo and iconbutton
  inputWrap:{
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
  },
  Logo:{
    fontSize: 18,
    top: 9,
    left: '10%',
    marginRight: 'auto',
  },
  logo_image:{
    height: 30,
    width: 35,
  },
  dist:{
    height: 183,
    width: 241,
  },
  graphing:{
    height: 183,
    width: 263,
  },
  prob:{
    height: 183,
    width: 212,
  },
  card: {
    margin: 23,
    alignItems: 'center',
    textAlign: 'center'
  },
  aligments: {
    alignItems: 'center',
    textAlign: 'center'
  },
  bg_image:{
    position: "absolute",
    width: 165,
    left: '70%',
    top: '5%',
    height: 713,
    zIndex: -1,
  },
});


  
export default Home;
