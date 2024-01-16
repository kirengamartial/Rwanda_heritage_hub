import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Alert } from 'react-native';
import Card from '../shared/card';
import axios from 'axios';

const Explore = ({ navigation }) => {
  const [exhibitsData, setExhibitsData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
    fetchExhibits();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get('http://192.168.1.67:3000/check-auth');
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExhibits = async () => {
    try {
      const response = await fetch('http://192.168.1.67:3000/exhibits');
      const data = await response.json();
      setExhibitsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExhibitPress = (exhibit) => {
    if (isAuthenticated) {
      navigation.navigate('ExhibitDetails', { exhibit });
    } else {
      Alert.alert(
        'Authentication Required',
        'Login First Please.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
         
        ],
        { cancelable: false }
      );
    }
  };

  const renderExhibitItem = ({ item }) => (
    <TouchableOpacity
      style={styles.exhibitItem}
      onPress={() => handleExhibitPress(item)}
    >
      <Card>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.exhibitTitle}>{item.title}</Text>
          <Text style={styles.exhibitDes}>{item.description}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Virtual Exhibits</Text>
      <FlatList
        data={exhibitsData}
        keyExtractor={(item) => item._id}
        renderItem={renderExhibitItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  exhibitItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  exhibitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exhibitDes: {
    marginBottom: 10
  },
  cardImage: {
    width: '100%',
    height: 200,
    marginTop: 6,
    marginBottom: 10,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  cardContent: {
    alignItems: 'center',
  },
});

export default Explore;
