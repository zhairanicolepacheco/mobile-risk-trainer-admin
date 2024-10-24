import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import auth from '@react-native-firebase/auth';

export default function Component(props) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          onPress: async () => {
            try {
              await auth().signOut();
              console.log("User signed out");
              navigation.reset({
                index: 0,
                routes: [{ name: 'index' }],
              });
              console.log("User redirected to login page");
            } catch (error) {
              console.error("Error signing out: ", error);
              Alert.alert("Error", "Failed to sign out. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={[styles.drawerHeaderText, { color: tintColor }]}>Menu</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        onPress={handleSignOut}
        icon={({ color, size }) => <TabBarIcon name="log-out-outline" color={color} size={size} />}
        labelStyle={styles.signOutLabel}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    height: 150,
    justifyContent: 'flex-end',
    padding: 20,
  },
  drawerHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  signOutLabel: {
    // Add any specific styles for the sign out label if needed
  },
});