import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function EditDetails({ route, navigation }) {
  const [exhibitDetails, setExhibitDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExhibitDetails();
  }, []);

  const fetchExhibitDetails = async () => {
    try {
      const response = await axios.get('http://192.168.1.64:3000/exhibits');
      setExhibitDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Extract exhibitData from route.params
  const exhibitData = route.params;

  // Check if exhibitData is available and add it to the exhibitDetails state
  useEffect(() => {
    if (exhibitData) {
      setExhibitDetails((prevExhibitDetails) => [...prevExhibitDetails, exhibitData]);
    }
  }, [exhibitData]);

  const handleDelete = async (exhibitId) => {
    try {
      await axios.delete(`http://192.168.1.64:3000/exhibits/${exhibitId}`);
      // Refresh the exhibit details after deletion
      fetchExhibitDetails();
    } catch (error) {
      console.error(`Error deleting exhibit ${exhibitId}:`, error);
    }
  };

  const renderActions = (exhibitId) => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('EditDetail', { exhibitId: exhibitId })}>
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(exhibitId)}>
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.newExhibitButton}
        onPress={() => navigation.navigate('newDetail')}
      >
        <Text style={styles.newExhibitButtonText}>New Exhibit</Text>
      </TouchableOpacity>
      <View style={[styles.row, styles.head]}>
        <Text style={styles.headText}>Title</Text>
        <Text style={styles.headText}>Actions</Text>
      </View>
      {exhibitDetails.map((detail, index) => (
        <View
          key={index}
          style={[
            styles.row,
            index % 2 === 1 ? { backgroundColor: '#F7F6E7' } : null,
          ]}
        >
          <Text style={styles.text}>{detail.title}</Text>
          {renderActions(detail._id)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { backgroundColor: '#808B97' },
  headText: { margin: 6, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40 },
  text: { margin: 6 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  actionText: { color: 'blue', marginLeft: 5, marginRight: 5 },
  newExhibitButton: {
    backgroundColor: '#18233A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  newExhibitButtonText: { color: 'white' },
});
