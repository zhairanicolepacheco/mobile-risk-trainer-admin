import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './src/Login';
import AdminSMS from './src/AdminSMS';
import BlockScreen from './src/BlockScreen';
import AboutScreen from './src/AboutScreen';
import SignOutScreen from './src/SignOutScreen';

import firebase from "@react-native-firebase/app";

if (!firebase.apps.length) {
  firebase.initializeApp();
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Dashboard = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#f1f1f1',
        width: 300,
      },
      drawerLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      drawerActiveTintColor: '#059212',
      drawerInactiveTintColor: '#757575',
    }}
  >
    <Drawer.Screen
      name="Mobile Risk Trainer"
      component={AdminSMS}
      options={{
        drawerIcon: ({ color }) => (
          <Icon name="home" size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Blocked Numbers"
      component={BlockScreen}
      options={{
        drawerIcon: ({ focused, color, size }) => (
          <Icon name="ban" size={size} color={focused ? '#059212' : '#757575'} />
        ),
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}
    />
    <Drawer.Screen
      name="About MRT"
      component={AboutScreen}
      options={{
        drawerIcon: ({ color }) => (
          <Icon name="info-circle" size={22} color={color} />
        ),
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}
    />
    <Drawer.Screen
      name="Sign Out"
      component={SignOutScreen}
      options={{
        drawerIcon: ({ color }) => (
          <Icon name="sign-out" size={22} color={color} />
        ),
      }}
    />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
