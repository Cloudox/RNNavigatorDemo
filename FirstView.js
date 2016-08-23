/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import SecondView from './SecondView';

export default class FirstView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressButton() {
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        name: 'SecondView',
        component: SecondView,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPressButton.bind(this)}>
          <Text style={styles.welcome}>
            点击跳转到下一页
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FirstView', () => FirstView);
