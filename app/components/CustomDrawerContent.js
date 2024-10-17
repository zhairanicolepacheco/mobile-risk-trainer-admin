import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import auth from '@react-native-firebase/auth'; // Make sure to import Firebase Auth

export default function CustomDrawerContent(props) {
  const router = useRouter();
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
              await auth().signOut(); // Sign out from Firebase
              console.log("User signed out");
              router.replace('login'); // Redirect to the login screen after sign out
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
});
