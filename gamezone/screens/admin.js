import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import Card from '../shared/card';


export default function Admin({navigation}) {
    return(
 <View>
    <TouchableOpacity onPress={() => navigation.navigate('EditUsers')} >
          <Card>
           <Text> Users</Text>
         </Card>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('EditDetails')} >
          <Card>
           <Text> Details</Text>
         </Card>
    </TouchableOpacity>
 </View>
     
    )
}