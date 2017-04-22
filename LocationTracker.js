import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FlatList from 'react-native/Libraries/CustomComponents/Lists/FlatList'


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
      latestLocation: {
        longitude: 'not known',
        latitude: 'not known',
        altitude: 'not known'
      },
      locations: []
    }
  };

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialLocation = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          altitude: position.coords.altitude,
          time: position.timestamp
        }
        const locations = this.state.locations
        locations.push(initialLocation)
        this.setState({locations})
      },
    (error) => {
      console.log(error.message)
    },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
     )

    this.watchId = navigator.geolocation.watchPosition((position) => {
      let latestLocation = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        altitude: position.coords.altitude,
        time: Date(position.timestamp).toString()
      }
      const locations = this.state.locations
      locations.push(latestLocation)
      this.setState({locations})
    },
    (error) => {
      console.log(error.message)
    },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchId)
  }

  renderLocation ({item}) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CURRENT LOCATION: </Text>
        <Text>
          <Text style={styles.title}>Longitude: </Text>
          {item.longitude}
        </Text>
        <Text>
          <Text style={styles.title}>Latitude: </Text>
            {item.latitude}
        </Text>
        <Text>
          <Text style={styles.title}>Altitude: </Text>
          {item.altitude}
        </Text>
        <Text>
          <Text style={styles.title}>Time: </Text>
          {item.time}
        </Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Locations</Text>
        <FlatList
          data={this.state.locations}
          renderItem={this.renderLocation}
          keyExtractor={(item, index) => (index)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500'
  }
})
