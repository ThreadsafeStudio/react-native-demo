import React, { Component } from 'react';
import {
  Platform,
  Navigator,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Detail from './Detail'


export default class List extends Component {
  onButtonPressed(e) {
    this.props.navigator.push({
      component: Detail,
      props: {
        data: e,
        title: e
      },
      // transition: Platform.OS === "android" ? Navigator.SceneConfigs.FloatFromBottomAndroid : Navigator.SceneConfigs.FloatFromBottom,
    })
  }

  renderList() {
    return (
      ["Item One", "Item Two", "Item Three"].map(e => {
        return (
          <TouchableHighlight
            key={e}
            style={styles.listItem}
            underlayColor={'#eee'}
            onPress={this.onButtonPressed.bind(this, e)}>
            <Text>{e}</Text>
          </TouchableHighlight>
        )
      })
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
            {this.renderList()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  listItem: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    padding: 20,
    backgroundColor: '#ddd'
  },
  scroll: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
  },
});
