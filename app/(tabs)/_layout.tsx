import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import IndexScreen from './index';
import ExploreScreen from './explore';
import ReportList from './reportList';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
const Drawer = createDrawerNavigator();

export default function MainAppLayout() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  return (
    <Drawer.Navigator
      initialRouteName="Mobile Risk Trainer"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: tintColor,
        drawerInactiveTintColor: Colors[colorScheme ?? 'light'].text,
      }}
    >
      <Drawer.Screen
        name="Mobile Risk Trainer"
        component={IndexScreen}
        options={{
          title: 'Mobile Risk Trainer',
          drawerIcon: ({ color, size, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} size={size} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Reported Numbers"
        component={ReportList}
        options={{
          title: 'Reported Numbers',
          drawerIcon: ({ color, size, focused }) => (
            <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} size={size} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="About Us"
        component={ExploreScreen}
        options={{
          title: 'About Us',
          drawerIcon: ({ color, size, focused }) => (
            <TabBarIcon name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
