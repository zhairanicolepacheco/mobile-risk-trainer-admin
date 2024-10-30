import React, { useState, useEffect, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  Text
} from 'react-native';''
import firestore from '@react-native-firebase/firestore';

type ReportedContact = {
  id: string;
  number: string;
  reason: string;
  reportedBy: string;
  username: string;
};

export default function AdminReportedContactsList() {
  const [reportedContacts, setReportedContacts] = useState<ReportedContact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportedContacts = async () => {
      try {
        const reportedContactsRef = firestore().collectionGroup('reportedNumbers');
        const snapshot = await reportedContactsRef.get();
        
        const fetchedContacts = await Promise.all(snapshot.docs.map(async (doc) => {
          const data = doc.data() as Omit<ReportedContact, 'id' | 'username'>;
          const userDoc = await firestore().collection('users').doc(data.reportedBy).get();
          const username = userDoc.data()?.username || 'Unknown User';
          
          return {
            id: doc.id,
            ...data,
            username
          };
        }));
        
        setReportedContacts(fetchedContacts);
      } catch (error) {
        console.error('Error fetching reported contacts:', error);
        Alert.alert('Error', 'Failed to load reported contacts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchReportedContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    return reportedContacts.filter(contact => 
      contact.number.includes(searchQuery) ||
      contact.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [reportedContacts, searchQuery]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Reported Contacts List</Text> */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search reported numbers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.usernameCell]}>Reported By</Text>
          <Text style={[styles.headerCell, styles.numberCell]}>Number</Text>
          <Text style={[styles.headerCell, styles.reasonCell]}>Reason</Text>
        </View>
        {filteredContacts.map(contact => (
          <View key={contact.id} style={styles.tableRow}>
            <Text style={[styles.cell, styles.usernameCell]}>{contact.username}</Text>
            <Text style={[styles.cell, styles.numberCell]}>{contact.number}</Text>
            <Text style={[styles.cell, styles.reasonCell]}>{contact.reason}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EFEFF4',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFF4',
  },
  tableContainer: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerCell: {
    fontWeight: 'bold',
    padding: 12,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cell: {
    padding: 12,
  },
  usernameCell: {
    flex: 2,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  numberCell: {
    flex: 2,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  reasonCell: {
    flex: 3,
  },
});