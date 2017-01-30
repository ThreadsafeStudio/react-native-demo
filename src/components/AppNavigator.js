import React, { Component } from 'react'
import {
  StyleSheet,
  Navigator,
  View,
  StatusBar,
  Platform,
  BackAndroid
} from 'react-native'
import List from './List'


export default class AppNavigator extends Component {
  handleBackAndroid(route, navigator) {
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if (!route.root) {
        navigator.pop()
        return true
      }
      BackAndroid.exitApp()
      return false
    })
  }

  initialRoute() {
    return {
      component: List
    }
  }

  render() {
    return (
      // https://facebook.github.io/react-native/docs/navigator.html#props
      <View style={[{paddingTop: Platform.OS === 'ios' ? 20 : 0}, styles.navigator]}>
        <StatusBar
          backgroundColor='white'
          barStyle='dark-content'
          hidden={false}
        />
        <Navigator
          initialRoute={this.initialRoute()}
          renderScene={(route, navigator) => {
            this.handleBackAndroid(route, navigator)

            const props = Object.assign(route.props || {}, {navigator})
            return React.createElement(route.component, props)
          }}
          configureScene={(route) =>
            route.transition || Navigator.SceneConfigs.PushFromRight}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    alignSelf: 'stretch',
  }
})
