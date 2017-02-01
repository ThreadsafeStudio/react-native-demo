import React, { Component } from 'react';
import {
  Platform,
  Navigator,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  InteractionManager
} from 'react-native';
import Detail from './Detail'
import * as Api from '../services/Api'


export default class List extends Component {
  constructor() {
    super()
    this.state = {
      items: null
    }
  }

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
    if (this.state.items === null) {
      return <Text>No data to show :(</Text>
    } else {
      return (
        <ScrollView style={styles.scroll}>
          {this.state.items.map(e => {
            let name = e.name
            return (
              <TouchableHighlight
                key={name}
                style={styles.listItem}
                underlayColor={'#eee'}
                onPress={this.onButtonPressed.bind(this, name)}>
                <Text>{name}</Text>
              </TouchableHighlight>
            )
          })}
        </ScrollView>
      )
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      Api.getDemoList()
        .then(r => r.json())
        .then(d => {
          let items = d.data
          this.setState({items})
        })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderList()}
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
