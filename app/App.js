import React, {Component} from 'react';
import themes from './Style';
import Awesome from './components/Awesome';
import Breathe from './components/Breathe';
import Koans from './components/Koans';
import Meditate from './components/Meditate';

import {Text, FlatList, SafeAreaView, View, ScrollView} from 'react-native';

import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

var theme = themes.dark;

const TabNavigator = createBottomTabNavigator({
  Awesome: Awesome,
  Breathe: Breathe,
  Koans: Koans,
  Meditate: Meditate
}, {

  tabBarOptions: {
    activeTintColor: theme.nav_active.color,
    inactiveTintColor: theme.nav_inactive.color,
    style: theme.nav_container,
    labelStyle: theme.nav_text
  }
});

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer screenProps={{
      theme: theme
    }}/>;
  }
}