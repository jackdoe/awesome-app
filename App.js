/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          You are awesome!
        </Text>
        <Text style={styles.weather}>
          How are things going right now?
        </Text>
        <Text style={styles.weather}>
          It doesnt fucking matter.
        </Text>
        <Text style={styles.weather}>
          Go and have a great day!
        </Text>        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 40,
    fontFamily: "Menlo",
    textAlign: 'center',
    margin: 40,
  },

  weather: {
    fontSize: 20,
    fontFamily: "Menlo",
    textAlign: 'center',
    margin: 10,
  },
});
