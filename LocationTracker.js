import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default class LocationTracker extends Component {
  constructor () {
    super()
    this.watchId = null
    this.state = {
      initialLocation: {
        longitude: 'not known',
        latitude: 'not known',
        altitude: 'not known'
      },
      currentLocation: {
        longitude: 'not known',
        latitude: 'not known',
        altitude: 'not known'
      }
    }
  };

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialLocation = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          altitude: position.coords.altitude
        }
        this.setState({initialLocation})
      },
    (error) => {
      console.log(error.message)
    },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
     )

    this.watchId = navigator.geolocation.watchPosition((position) => {
      let currentLocation = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        altitude: position.coords.altitude
      }
      this.setState({currentLocation})
    },
    (error) => {
      console.log(error.message)
    },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchId)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>INITIAL LOCATION: </Text>
        <Text>
          <Text style={styles.title}>Longitude: </Text>
          {this.state.initialLocation.longitude}
        </Text>
        <Text>
          <Text style={styles.title}>Latitude: </Text>
          {this.state.initialLocation.latitude}
        </Text>
        <Text>
          <Text style={styles.title}>Altitude: </Text>
          {this.state.initialLocation.altitude}
        </Text>
        <Text style={styles.title}>CURRENT LOCATION: </Text>
        <Text>
          <Text style={styles.title}>Longitude: </Text>
          {this.state.currentLocation.longitude}
        </Text>
        <Text>
          <Text style={styles.title}>Latitude: </Text>
          {this.state.currentLocation.latitude}
        </Text>
        <Text>
          <Text style={styles.title}>Altitude: </Text>
          {this.state.currentLocation.altitude}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500'
  }
})
