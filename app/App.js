import React, {Component} from 'react';
import themes from './Style';
import Awesome from './components/Awesome';
import Circle from './components/Circle';
import Koans from './components/Koans';
import {Text, FlatList, SafeAreaView, View, ScrollView} from 'react-native';

import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

var style = themes.dark;
class TabButton extends Component {
  render() {
    const {name, color, size} = this.props;
    return (
      <View style={style.nav_container}>
        <Text style={style.nav_text}>{name}</Text>
      </View>
    );
  }
}
const TabNavigator = createBottomTabNavigator({
  Awesome: Awesome,
  Breathe: Circle,
  Koans: Koans
}, {

  tabBarOptions: {
    activeTintColor: style.nav_active.color,
    inactiveTintColor: style.nav_inactive.color,
    style: style.nav_container,
    labelStyle: style.nav_text
  }
});

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer screenProps={{
      style: style
    }}/>;
  }
}