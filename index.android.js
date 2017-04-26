import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import LocationTracker from './LocationTracker.js'

export default class LocationTracking extends Component {
  render () {
    return (
      <LocationTracker />
    )
  }
}

AppRegistry.registerComponent('LocationTracking', () => LocationTracking);
