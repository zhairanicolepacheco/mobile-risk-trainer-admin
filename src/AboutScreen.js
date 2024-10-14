import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

export default function AboutScreen() {
  const [expanded, setExpanded] = useState({
    aboutUs: false,
    currentVersion: false,
    privacyPolicy: false,
  });

  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.stage}>
      <TableView>
        <Section>
          <TouchableOpacity onPress={() => toggleSection('aboutUs')}>
            <Cell
              cellStyle="Basic"
              title="About Us"
              accessory={expanded.aboutUs ? 'chevron-up' : 'chevron-down'}
            />
          </TouchableOpacity>
          {expanded.aboutUs && (
            <View style={styles.collapseContent}>
              <Text style={styles.collapseText}>        A mobile app for smishing attack awareness. The 
                development of MRT aims to educate users about the dangers of smishing attacks, how to identify, 
                and mitigate them, and promote safe mobile device usage practices.
              </Text>
            </View>
          )}
        </Section>

        <Section>
          <TouchableOpacity onPress={() => toggleSection('currentVersion')}>
            <Cell
              cellStyle="Basic"
              title="Current Version"
              accessory={expanded.currentVersion ? 'chevron-up' : 'chevron-down'}
            />
          </TouchableOpacity>
          {expanded.currentVersion && (
            <View style={styles.collapseContent}>
              <Text style={styles.collapseText}>Current Version:  1.0.0</Text>
            </View>
          )}
        </Section>

        <Section>
          <TouchableOpacity onPress={() => toggleSection('privacyPolicy')}>
            <Cell
              cellStyle="Basic"
              title="Privacy Policy"
              accessory={expanded.privacyPolicy ? 'chevron-up' : 'chevron-down'}
            />
          </TouchableOpacity>
          {expanded.privacyPolicy && (
            <View style={styles.collapseContent}>
              <Text style={styles.collapseText}>        This Privacy Policy describes how Mobile Rsik Trainer collects, uses, 
                and discloses your personal information when you use our services or otherwise communicate with us.</Text>
            </View>
          )}
        </Section>

        <Section>
          <TouchableOpacity onPress={() => toggleSection('contactUs')}>
            <Cell
              cellStyle="Basic"
              title="Contact Us"
              accessory={expanded.contactUs ? 'chevron-up' : 'chevron-down'}
            />
          </TouchableOpacity>
          {expanded.contactUs && (
            <View style={styles.collapseContent}>
              <Text style={styles.collapseText}>Email:  mobile.risk.trainer@gmail.com</Text>
            </View>
          )}
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
  collapseContent: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  collapseText: {
    color: '#333333',
  },
});
