import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const WhatWeOffer = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>What We Offer</Text>
        <View style={styles.separate}>
          <View style={styles.projectOverview}>
            <Text style={styles.subHeading}>Project Overview</Text>
            <Text style={styles.paragraph}>
              "Rwanda Heritage Hub" is a virtual museum app developed to showcase Rwandan history, traditions, and cultural artifacts. Users can explore exhibits, learn about significant events, and engage with multimedia content.
            </Text>
          </View>
          <View style={styles.features}>
            <Text style={styles.subHeading}>Features</Text>
            <View>
              <Text style={styles.listItem}>• User Registration and Login:</Text>
              <Text>Users can create accounts and log in to access additional features like saving favorite exhibits and tracking their exploration progress.</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};


export default WhatWeOffer;
