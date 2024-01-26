import React, { useState, useCallback } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import HomeStack from './homeStack';
import RegistersStack from './registerStack';
import UsersStack from './userStack';
import AdminStack from './adminStack';
import axios from 'axios';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchAuthStatus = useCallback(async () => {
    try {
      const response = await axios.get('http://192.168.43.194:3000/check-auth');
      const { isAuthenticated, isAdmin } = response.data;
      setIsAuthenticated(isAuthenticated);
      setIsAdmin(isAdmin);
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  }, []);

  // Fetch authentication status when the screen is focused
  if (isFocused) {
    fetchAuthStatus();
  }

  return (
    <DrawerContentScrollView style={{ backgroundColor: '#18233A' }}>
      <DrawerItem
        label="Home"
        icon={() => <Ionicons name="home-outline" size={24} color="white" />}
        onPress={() => navigation.navigate('HomeDrawer')}
        labelStyle={{ color: 'white' }}
      />

      {isAuthenticated ? (
        <>
          <DrawerItem
            label="Profile"
            icon={() => <Ionicons name="person-circle-outline" size={24} color="white" />}
            onPress={() => navigation.navigate('UserDrawer')}
            labelStyle={{ color: 'white' }}
          />

          {isAdmin && (
            <DrawerItem
              label="Admin"
              icon={() => <Feather name="user-check" size={24} color="white" />}
              onPress={() => navigation.navigate('AdminDrawer')}
              labelStyle={{ color: 'white' }}
            />
          )}

          <DrawerItem
            label="Logout"
            icon={() => <AntDesign name="logout" size={24} color="white" />}
            onPress={async () => {
              try {
                await axios.get('http://192.168.43.194:3000/logout');
                setIsAuthenticated(false);
                navigation.navigate('RegisterDrawer');
              } catch (error) {
                console.error('Error logging out:', error);
              }
            }}
            labelStyle={{ color: 'white' }}
          />
        </>
      ) : (
        <DrawerItem
          label="Register"
          icon={() => <AntDesign name="login" size={24} color="white" />}
          onPress={() => navigation.navigate('RegisterDrawer')}
          labelStyle={{ color: 'white' }}
        />
      )}
    </DrawerContentScrollView>
  );
};

const RootDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: '#FFBF00',
        width: 240,
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeStack}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="UserDrawer"
        component={UsersStack}
        options={{
          title: 'User',
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="AdminDrawer"
        component={AdminStack}
        options={{
          title: 'Admin',
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="RegisterDrawer"
        component={RegistersStack}
        options={{
          title: 'Register',
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootDrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
