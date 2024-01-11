import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Register from '../screens/register'
import Header from '../shared/header';
import Siginin from '../screens/signin'


const Stack = createStackNavigator();

const RegistersStack = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen 
             name="Register"
             component={Register}
             options={{
                title: "Register",
                headerShown: false,
              }} 
            />
            <Stack.Screen 
             name="Siginin"
             options={{
                title: "Siginin",
                headerShown: false,
              }} 
             component={Siginin}
            />
        </Stack.Navigator>
    )
}


export default RegistersStack