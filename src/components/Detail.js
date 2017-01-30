import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';


export default class Detail extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        {this.backButton()}
        <Text>Time for details of {this.props.data}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  backButton: {
    backgroundColor: '#5f5',
    padding: 8,
  }
});
