import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LocationTracker from './LocationTracker.js';

export default class LocationTracking extends Component {
  render() {
    return (
      <View>
        <LocationTracker />
      </View>
    )
  }
}

AppRegistry.registerComponent('LocationTracking', () => LocationTracking);
