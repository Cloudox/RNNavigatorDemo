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
    this.state = {
      id: 1,
      user: null
    };
  }

  onPressButtonA() {
    let _this = this;
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        name: 'SecondView',
        component: SecondView,
        params: {
          id: 1,
          getUser: function(user) {
            _this.setState({
              user: user
            })
          }
        }
      });
    }
  }

  onPressButtonB() {
    let _this = this;
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        name: 'SecondView',
        component: SecondView,
        params: {
          id: 2,
          getUser: function(user) {
            _this.setState({
              user: user
            })
          }
        }
      });
    }
  }

  render() {
    if( this.state.user ) {
      return (
          <View style={styles.container}>
            <TouchableOpacity onPress={this.onPressButtonA.bind(this)}>
              <Text style={styles.welcome}>
                查询ID为{ this.state.id }的学生信息
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressButtonB.bind(this)}>
              <Text style={styles.welcome}>
                查询ID为2的学生信息
              </Text>
            </TouchableOpacity>
            <Text style={styles.welcome}>
              学生信息：
            </Text>
            <Text style={styles.welcome}>
              { JSON.stringify(this.state.user) }
            </Text>
          </View>
        );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.onPressButtonA.bind(this)}>
            <Text style={styles.welcome}>
              查询ID为1的学生信息
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressButtonB.bind(this)}>
            <Text style={styles.welcome}>
              查询ID为2的学生信息
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
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
