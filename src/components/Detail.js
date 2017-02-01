import React, { Component } from 'react';
import {
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import MapView from 'react-native-maps';


export default class Detail extends Component {
  constructor() {
    super()
    this.state = {
      ready: false
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ready: true})
    })
  }

  backPressed() {
    this.props.navigator.pop()
  }

  backButton() {
    return (
      <TouchableHighlight
        style={styles.backButton}
        underlayColor={'#eee'}
        onPress={this.backPressed.bind(this)}>
        <Text>Back</Text>
      </TouchableHighlight>
    )
  }

  renderMap() {
    if (this.state.ready && Platform.OS === "ios") {
      return (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.backButton()}
        <Text>Time for details of {this.props.data}</Text>
        {this.renderMap()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  backButton: {
    backgroundColor: '#5f5',
    padding: 8,
  },
  mapContainer: {
    height: 400,
    width: 400
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
