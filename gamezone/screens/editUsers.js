import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function EditUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
   try {
     const response = await axios.get('http://192.168.1.67:3000/get-all-users');
     const userData = response.data;
 
     // Check if userData is an array or a single object
     const usersArray = Array.isArray(userData) ? userData : [userData];
     
     setUsers(usersArray);
     setIsLoading(false);
   } catch (error) {
     console.error(error);
     setIsLoading(false);
   }
 };

  useEffect(() => {
    fetchUsers();
  }, []);


 

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://192.168.1.67:3000/users/${userId}`);
      // Refresh the users list after deletion
      fetchUsers();
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      await axios.put(`http://192.168.1.67:3000/users/make-admin/${userId}`);
      // Refresh the users list after making admin
      fetchUsers();
    } catch (error) {
      console.error(`Error making user ${userId} admin:`, error);
    }
  };

  const renderActions = (userId, isAdmin) => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={() => handleMakeAdmin(userId)}>
        <Text style={styles.actionText}>{isAdmin ? 'Is Admin' : 'Make Admin'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(userId)}>
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.head]}>
        <Text style={styles.headText}>First Name</Text>
        <Text style={styles.headText}>Actions</Text>
      </View>
      {users.map((user, index) => (
        <View
          key={index}
          style={[
            styles.row,
            index % 2 === 1 ? { backgroundColor: '#F7F6E7' } : null,
          ]}
        >
          <Text style={styles.text}>{user.firstname}</Text>
          {renderActions(user._id, user.isAdmin)}
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
});
