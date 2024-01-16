import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { MaterialIcons, EvilIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function Header({ navigation, title }) {
  const [username, setUsername] = useState("name");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openMenu = () => {
    navigation.openDrawer();
  }

  const fetchUsername = async () => {
    try {
      const response = await axios.get('http://192.168.1.67:3000/check-auth');
      const { isAuthenticated, username } = response.data;

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        setUsername(username);
      } else {
        setUsername("name");
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

  useEffect(() => {
    const fetchInitialUsername = async () => {
      await fetchUsername();
    };

    fetchInitialUsername();
  }, []);

  // UseEffect to fetch username when authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsername();
    }
  }, [isAuthenticated]);

  // Add a listener for focus events when the component is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Fetch the username when the component is focused
      fetchUsername();
    });

    // Cleanup the listener when the component is unmounted
    return unsubscribe;
  }, [navigation, isAuthenticated, username]);

  return (
    <ImageBackground source={require('../assets/game_bg.png')} style={styles.header}>
      <MaterialIcons name="menu" size={28} onPress={openMenu} style={styles.icon} />
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{username}</Text>
        <EvilIcons name="user" size={34} color="black" style={styles.icons} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 18,
    color: '#333',
    letterSpacing: 1,
    marginBottom: -2,
    marginLeft: 10,
  },
  icons: {
    marginBottom: -2
  },
  icon: {
    marginLeft: -10,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
