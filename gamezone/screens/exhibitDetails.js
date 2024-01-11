import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";

export default function ExhibitDetails({ route }) {
  const { exhibit } = route.params;

  return (
    <View style={globalStyles.container}>
      <Image
        source={{ uri: exhibit.image }}
        style={styles.exhibitImage}
      />
      <View style={styles.exhibitDetails}>
        <Text style={styles.exhibitTitle}>{exhibit.title}</Text>
        <Text style={styles.exhibitDescription}>{exhibit.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exhibitImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: -163
  },
  exhibitDetails: {
    padding: 16,
  },
  exhibitTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exhibitDescription: {
    fontSize: 18,
  },
});
