import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as SMS from 'expo-sms';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

interface SMSState {
  message: string;
  clientNumbers: string[];
}

interface AdminSMSProps {
  onClose: () => void;
}

export default function AdminSMS({ onClose }: AdminSMSProps) {
  const [smsState, setSmsState] = useState<SMSState>({
    message: '',
    clientNumbers: [],
  });

  useEffect(() => {
    fetchClientNumbers();
    fetchRandomMessage();
  }, []);

  const handleInputChange = (value: string) => {
    setSmsState(prevState => ({ ...prevState, message: value }));
  };

  const fetchClientNumbers = async () => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "client"));
      const querySnapshot = await getDocs(q);
      const numbers = querySnapshot.docs.map(doc => doc.data().phoneNumber);
      setSmsState(prevState => ({ ...prevState, clientNumbers: numbers }));
    } catch (error) {
      console.error("Error fetching client numbers:", error);
      Alert.alert("Error", "Failed to fetch client numbers");
    }
  };

  const fetchRandomMessage = async () => {
    try {
      const messagesCollection = collection(db, "messages");
      const messagesSnapshot = await getDocs(messagesCollection);
      
      if (!messagesSnapshot.empty) {
        const messages = messagesSnapshot.docs.map(doc => doc.data().content);
        const randomIndex = Math.floor(Math.random() * messages.length);
        const randomMessage = messages[randomIndex];
        setSmsState(prevState => ({ ...prevState, message: randomMessage }));
      } else {
        console.log("No messages found in the database");
        Alert.alert("Error", "No messages found in the database");
      }
    } catch (error) {
      console.error("Error fetching random message:", error);
      Alert.alert("Error", "Failed to fetch a random message");
    }
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
    const { message, clientNumbers } = smsState;
    if (!message || clientNumbers.length === 0) {
      Alert.alert('Error', 'Please ensure there is a message and client numbers are available');
      return;
    }

    try {
      const { result } = await SMS.sendSMSAsync(clientNumbers, message);
      if (result === 'sent') {
        Alert.alert('Success', 'Messages sent successfully');
        fetchRandomMessage(); // Fetch a new random message after sending
      } else {
        Alert.alert('Error', 'Failed to send messages');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      Alert.alert('Error', 'An error occurred while sending the messages');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
        <TabBarIcon name="close" size={24} color="#000" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Send SMS to Clients</Text>

        <Text style={styles.infoText}>
          Number of clients: {smsState.clientNumbers.length}
        </Text>

        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder='Enter Message'
          value={smsState.message}
          onChangeText={handleInputChange}
          multiline
          accessibilityLabel="Message Input"
        />

        <TouchableOpacity 
          style={[styles.button, styles.checkButton]}
          onPress={checkSMS}
          accessibilityLabel="Check SMS Availability"
          accessibilityHint="Checks if SMS functionality is available on this device"
        >
          <Text style={styles.buttonText}>Check SMS Availability</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={sendSMS}
          accessibilityLabel="Send Message to All Clients"
          accessibilityHint="Sends the SMS message to all client numbers"
        >
          <Text style={styles.buttonText}>Send Message to All Clients</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={fetchRandomMessage}
          accessibilityLabel="Get New Random Message"
          accessibilityHint="Fetches a new random message from the database"
        >
          <Text style={styles.buttonText}>Get New Random Message</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 20,
    maxHeight: '80%',
    maxWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#006769',
    textAlign: 'center',
  },
  input: {
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 15,
    maxWidth: '100%',
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
  checkButton: {
    backgroundColor: '#4a90e2',
  },
  secondaryButton: {
    backgroundColor: '#0077be',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#006769',
    fontSize: 16,
    textAlign: 'center',
  },
});