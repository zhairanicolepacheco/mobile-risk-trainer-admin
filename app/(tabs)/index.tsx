import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as SMS from 'expo-sms';

interface SMSState {
  number: string;
  message: string;
}

export default function AdminSMS() {
  const [smsState, setSmsState] = useState<SMSState>({
    number: '',
    message: '',
  });

  const handleInputChange = (key: keyof SMSState, value: string) => {
    setSmsState(prevState => ({ ...prevState, [key]: value }));
  };

  const checkSMS = async () => {
    try {
      const isAvailable = await SMS.isAvailableAsync();
      Alert.alert(
        'SMS Availability',
        isAvailable ? 'SMS is available on this device' : 'SMS is not available on this device'
      );
    } catch (error) {
      console.error('Error checking SMS availability:', error);
      Alert.alert('Error', 'Failed to check SMS availability');
    }
  };

  const sendSMS = async () => {
    const { number, message } = smsState;
    if (!number || !message) {
      Alert.alert('Error', 'Please enter both a phone number and a message');
      return;
    }

    try {
      const { result } = await SMS.sendSMSAsync([number], message);
      if (result === 'sent') {
        Alert.alert('Success', 'Message sent successfully');
        setSmsState({ number: '', message: '' });
      } else {
        Alert.alert('Error', 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      Alert.alert('Error', 'An error occurred while sending the message');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <StatusBar style="auto" />
      <Image
        source={require('@/assets/images/mrt.png')}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="MRT Logo"
      />
      <Text style={styles.title}>Admin Side SMS</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={checkSMS}
        accessibilityLabel="Check SMS Availability"
        accessibilityHint="Checks if SMS functionality is available on this device"
      >
        <Text style={styles.buttonText}>Check SMS Availability</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder='Enter Phone Number'
        value={smsState.number}
        onChangeText={(value) => handleInputChange('number', value)}
        keyboardType='phone-pad'
        accessibilityLabel="Phone Number Input"
      />

      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder='Enter Message'
        value={smsState.message}
        onChangeText={(value) => handleInputChange('message', value)}
        multiline
        accessibilityLabel="Message Input"
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={sendSMS}
        accessibilityLabel="Send Message"
        accessibilityHint="Sends the SMS message to the specified number"
      >
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  logo: {
    width: '100%',
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#d9d9d9',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#059212',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});