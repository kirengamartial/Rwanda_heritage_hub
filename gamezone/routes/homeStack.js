import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/home';
import Explore from '../screens/explore';
import ExhibitDetails from '../screens/exhibitDetails'
import Header from '../shared/header';

const Stack = createStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
             name="Home"
             options={({ navigation }) => ({
                headerTitle: () => <Header navigation={navigation} title='Heritage' />,
              })} 
             component={Home}
            />
            <Stack.Screen 
             name="Explore"
             component={Explore}
            />
            
            <Stack.Screen 
             name="ExhibitDetails"
             component={ExhibitDetails}
            />
        </Stack.Navigator>
    )
}

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    )
}

export default HomeStack