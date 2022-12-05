import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="home"
                size={30}
                color={focused ? '#876445' : 'grey'}></Icon>
            );
          },
        }}></Tab.Screen>

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="cog"
                size={30}
                color={focused ? '#876445' : 'grey'}></Icon>
            );
          },
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 35,
    height: 60,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#F4DFBA',
  },
});

export default BottomTabNavigator;
