import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text, View, Image, SafeAreaView, TextInput, TouchableHighlight,
  Keyboard, TouchableWithoutFeedback, Alert, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import styles from '../style/styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Sign in with email and password
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Check if user exists in Firestore
      const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      if (userDocument.exists) {
        // If existing user, navigate to dashboard
        navigation.navigate("Dashboard");
      } else {
        // If user does not exist in Firestore, handle accordingly
        Alert.alert("User not found", "No user found in our records. Please register.");
      }
    } catch (error) {
      console.log("Login error: ", error);
      Alert.alert("Login failed", error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Image
          source={require('../assets/mrt.png')}
          style={{ width: 175, height: 190 }}
        />

        <Text style={styles.title}>Mobile Risk Trainer</Text>
        <Text style={styles.tagline}>A Mobile App for Smishing Attack Awareness</Text>

        <Text style={styles.header}>LOGIN</Text>
        <Text style={styles.subheader}>Please log in to continue.</Text>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#888" style={styles.icon} />
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
          <Icon name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
            <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        <TouchableHighlight style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}