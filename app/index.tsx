import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useRouter } from 'expo-router';
import styles from './styles/styles';
import LinearGradient from 'react-native-linear-gradient';

console.log("Login component rendered");

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  
  const handleLogin = async () => {
    console.log("Login attempt with email:", email);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();

        if (userDocument.exists) {
          const userData = userDocument.data();
          if (userData && userData.role === 'admin') {
            console.log("User is an admin, navigating to tabs.");
            router.push('/(tabs)'); 
          } else {
            console.log("User is not an admin. Role:", userData?.role);
            Alert.alert("Access Denied", "Only admins are allowed to log in.");
            await auth().signOut();
          }
        } else {
          console.log("User not found in Firestore.");
          Alert.alert("User not found", "No user found in our records. Please register.");
          await auth().signOut();
        }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Login error:", error);
        Alert.alert("Login failed", error.message);
      } else {
        console.log("An unknown error occurred");
        Alert.alert("Login failed", "An unexpected error occurred. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#006769', '#40A578']}
        style={styles.container}
      >       
      <StatusBar style="auto" />
        <SafeAreaView style={styles.content}>
          <Image
            source={require('@/assets/images/mrt.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>Mobile Risk Trainer</Text>
          <Text style={styles.tagline}>A Mobile App for Smishing Attack Awareness</Text>

          <Text style={styles.header}>LOGIN</Text>
          {/* <Text style={styles.subheader}>Please log in to continue.</Text> */}

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#888"/>
            </TouchableOpacity>
          </View>

          <TouchableHighlight style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </SafeAreaView>  
      </LinearGradient> 
    </TouchableWithoutFeedback>
  );
}
