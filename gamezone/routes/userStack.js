import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import User from '../screens/profile'
import Header from '../shared/header';


const Stack = createStackNavigator();

const UsersStack = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen 
             name="User"
             component={User}
             options={({ navigation }) => ({
                headerTitle: () => <Header navigation={navigation} />,
              })} 
            />
        </Stack.Navigator>
    )
}


export default UsersStack