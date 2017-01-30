import React, { Component } from 'react'
import {
  StyleSheet,
  Navigator,
  View,
  StatusBar,
  Platform,
  Text,
  BackAndroid,
  TouchableHighlight
} from 'react-native'
import List from './List'


const NavigationText = ({text}) => {
  return (
    <View style={{
      justifyContent: 'center',
      flex: 1,
      padding: 6,
    }}>
      <Text style={{color: 'white'}}>{text}</Text>
    </View>
  );
}

const NavigationButton = ({text, onPress}) => {
  return (
    <TouchableHighlight
      style={{
        justifyContent: 'center',
        flex: 1,
        padding: 6,
      }}
      underlayColor={'transparent'}
      onPress={onPress.bind(this)}>
      <Text style={{color: 'white'}}>{text}</Text>
    </TouchableHighlight>
  )
}

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
      component: List,
      root: true,
      props: {
        title: 'Demo List'
      }
    }
  }

  backButton(route, navigator, index, navState) {
    if (index !== 0) {
      return (
        <NavigationButton text="Back" onPress={() => navigator.pop()} />
      )
    }
  }

  render() {
    const iosNavigationHeight = 20 + 44
    const androidNavigationHeight = 0 + 54
    return (
      // https://facebook.github.io/react-native/docs/navigator.html#props
      <View style={styles.navigator}>
        <StatusBar
          backgroundColor='white'
          barStyle='dark-content'
          hidden={false}
        />
        <Navigator
          sceneStyle={{paddingTop: Platform.OS === 'ios' ? iosNavigationHeight : androidNavigationHeight}}
          initialRoute={this.initialRoute()}
          renderScene={(route, navigator) => {
            this.handleBackAndroid(route, navigator)

            const props = Object.assign(route.props || {}, {navigator})
            return React.createElement(route.component, props)
          }}
          configureScene={(route) =>
            route.transition || Navigator.SceneConfigs.PushFromRight}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: this.backButton,
                RightButton: (route, navigator, index, navState) => {},
                Title: (route, navigator, index, navState) => {
                  console.log(route)
                  return <NavigationText text={route.props.title} />
                }
              }}
              style={styles.navigationBar}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    alignSelf: 'stretch',
  },
  navigationBar: {
    backgroundColor: 'grey',
    flex: 1,
  }
})
