import React from 'react';
import {
  ScrollView,
  StyleSheet
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

export default function BlockScreen() {
  return (
    <ScrollView contentContainerStyle={styles.stage}>
      <TableView>
        <Section header="Blocked Contacts">
          <Cell cellStyle="Basic" title="+63 9123456789" />
          <Cell cellStyle="Basic" title="+63 9010101010" />
          <Cell cellStyle="Basic" title="+63 9888888888" />
        </Section> 
      </TableView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
