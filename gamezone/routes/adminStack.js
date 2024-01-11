import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Admin from '../screens/admin'
import EditUsers from '../screens/editUsers'
import EditDetails from '../screens/editDetails'
import EditDetail from '../screens/detailEdit'
import NewDetail from '../screens/newDetails'
import Header from '../shared/header'


const Stack = createStackNavigator();

const AdminStack = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen 
             name="Admin"
             component={Admin}
             options={({ navigation }) => ({
                headerTitle: () => <Header navigation={navigation} />,
              })} 
            />
            <Stack.Screen 
             name="EditUsers"
             component={EditUsers}
            />
            <Stack.Screen 
             name="EditDetails"
             component={EditDetails}
            />
            <Stack.Screen 
             name="EditDetail"
             component={EditDetail}
            />
            <Stack.Screen 
             name="newDetail"
             component={NewDetail} 
            />
        </Stack.Navigator>
    )
}


export default AdminStack