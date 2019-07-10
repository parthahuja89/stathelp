/* @flow */

import * as React from 'react';
import { Alert, ScrollView, StyleSheet , Image} from 'react-native';
import {
  Title,
  Caption,
  Paragraph,
  Card,
  Button,
  withTheme,
} from 'react-native-paper';

import { IconButton, Colors } from 'react-native-paper';


class App extends React.Component {
  static title = 'Card';

  render() {
    
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <IconButton
          icon="menu"
          color={Colors.black}
          size={30}
          onPress={() => console.log('Pressed')}
        />
        
        <Card style={styles.card}>
          <Card.Content style={styles.aligments} >
              <Title style={styles.aligments}>Utilities and Centeral Tendencies</Title>
              <Image source={require('./assets/main_page_svgs/dist.png')} style = {styles.dist}/>
              <Card.Actions style={styles.aligments} >
                <Button onPress={() => {}}> More Info </Button>
                <Button onPress={() => {}}> Open </Button>
              </Card.Actions>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.aligments} >
              <Title style={styles.aligments}>Graphing Tools</Title>
              <Image source={require('./assets/main_page_svgs/graph.png')} style = {styles.graphing}/>
              <Card.Actions style={styles.aligments} >
                <Button onPress={() => {}}> More Info </Button>
                <Button onPress={() => {}}> Open </Button>
              </Card.Actions>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.aligments} >
              <Title style={styles.aligments}>Probability Distributions</Title>
              <Image source={require('./assets/main_page_svgs/probability.png')} style = {styles.prob}/>
              <Card.Actions style={styles.aligments} >
                <Button onPress={() => {}}> More Info </Button>
                <Button onPress={() => {}}> Open </Button>
              </Card.Actions>
          </Card.Content>
        </Card>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 2,
    justifyContent: 'center'
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
    margin: 25,
    alignItems: 'center',
    textAlign: 'center'
  },
  aligments: {
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default App;
