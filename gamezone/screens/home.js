import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';
import WhatWeOffer from './WhatWeOffer'; 

export default function Home({ navigation }) {
  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <ImageBackground   source={{
            uri: "http://www.visitrwanda.com/wp-content/uploads/fly-images/3132/Visit-Rwanda-NH_OO_Landscape_Kings_Palace_0470_MASTER-1920x1280.jpg",
          }} style={globalStyles.image}>
        <View style={globalStyles.overlay}>
          <Text style={globalStyles.title}>Rwanda Heritage Hub</Text>
          <Text style={globalStyles.subtitle}>Explore the Rich Cultural Heritage of Rwanda</Text>
          <TouchableOpacity
            style={globalStyles.exploreButton}
            onPress={() => navigation.navigate('Explore')}>
            <Text style={globalStyles.exploreButtonText}>Start Exploring</Text>
          </TouchableOpacity>
        </View>
       
      </ImageBackground>
      
    </ScrollView>
  );
}
