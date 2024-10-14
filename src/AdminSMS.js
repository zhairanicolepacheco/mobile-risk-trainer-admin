import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as SMS from 'expo-sms';

export default function AdminSMS() {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

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
  }

  const sendSMS = async () => {
    if (!number || !message) {
      Alert.alert('Error', 'Please enter both a phone number and a message');
      return;
    }

    try {
      const { result } = await SMS.sendSMSAsync([number], message);
      if (result === 'sent') {
        Alert.alert('Success', 'Message sent successfully');
        setNumber('');
        setMessage('');
      } else {
        Alert.alert('Error', 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      Alert.alert('Error', 'An error occurred while sending the message');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Admin Side SMS</Text>

      <TouchableOpacity style={styles.button} onPress={checkSMS}>
        <Text style={styles.buttonText}>Check SMS Availability</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder='Enter Phone Number'
        value={number}
        onChangeText={setNumber}
        keyboardType='phone-pad'
      />

      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder='Enter Message'
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={sendSMS}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#d9d9d9',
    borderWidth: 1,
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