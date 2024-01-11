import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomBox from "react-native-customized-box";
import axios from 'axios';

const ExhibitSchema = yup.object({
  title: yup.string().min(2, 'Too short').required('Required'),
  description: yup.string().min(5, 'Too short').required('Required'),
  image: yup.string().url('Invalid URL').required('Required'),
});

const NewExhibitForm = ({ navigation }) => {
  useEffect(() => {
    // Fetch data or perform any other initial setup here
  }, []);

  const handleCreateExhibit = async (values) => {
   try {
     const response = await axios.post('http://192.168.1.64:3000/exhibits', values);
 
     if (response.data) {
       navigation.navigate('Home', { exhibitId: response.data._id, exhibitData: response.data });
     } else {
       console.log('Failed to create a new exhibit');
     }
   } catch (error) {
     console.error('Error creating a new exhibit:', error);
   }
 };
 

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.header}>Create New Exhibit</Text>
        <Formik
          initialValues={{ title: '', description: '', image: '' }}
          validationSchema={ExhibitSchema}
          onSubmit={(values, actions) => {
            handleCreateExhibit(values);
            actions.resetForm();
          }}
        >
          {(props) => (
            <View>
              <CustomBox
                placeholder={'Title'}
                boxColor={'silver'}
                focusColor={'#e07964'}
                boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                inputStyle={{
                  fontWeight: 'bold',
                  color: '#30302e',
                  paddingLeft: 20,
                  borderRadius: 40,
                }}
                onChangeText={props.handleChange('title')}
                value={props.values.title}
                onBlur={props.handleBlur('title')}
                labelConfig={{
                  text: 'Title',
                  style: {
                    color: '#0e0e21',
                    fontWeight: 'bold',
                  },
                }}
                requiredConfig={{
                  text: props.touched.title && props.errors.title,
                  style: {
                    marginBottom: 10,
                    color: 'red',
                  },
                }}
              />

              <CustomBox
                placeholder={'Description'}
                boxColor={'silver'}
                focusColor={'#e07964'}
                boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                inputStyle={{
                  fontWeight: 'bold',
                  color: '#30302e',
                  paddingLeft: 20,
                  borderRadius: 40,
                }}
                onChangeText={props.handleChange('description')}
                value={props.values.description}
                onBlur={props.handleBlur('description')}
                labelConfig={{
                  text: 'Description',
                  style: {
                    color: '#0e0e21',
                    fontWeight: 'bold',
                  },
                }}
                requiredConfig={{
                  text: props.touched.description && props.errors.description,
                  style: {
                    marginBottom: 10,
                    color: 'red',
                  },
                }}
              />

              <CustomBox
                placeholder={'Image URL'}
                boxColor={'silver'}
                focusColor={'#e07964'}
                boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                inputStyle={{
                  fontWeight: 'bold',
                  color: '#30302e',
                  paddingLeft: 20,
                  borderRadius: 40,
                }}
                onChangeText={props.handleChange('image')}
                value={props.values.image}
                onBlur={props.handleBlur('image')}
                labelConfig={{
                  text: 'Image URL',
                  style: {
                    color: '#0e0e21',
                    fontWeight: 'bold',
                  },
                }}
                requiredConfig={{
                  text: props.touched.image && props.errors.image,
                  style: {
                    marginBottom: 10,
                    color: 'red',
                  },
                }}
              />

              <TouchableOpacity style={styles.updateBtn} onPress={props.handleSubmit}>
                <Text style={{ color: 'white' }}>Create Exhibit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
  },
  updateBtn: {
    marginTop: 10,
    backgroundColor: '#e65c40',
    width: 300,
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    flexDirection: 'row',
  },
});

export default NewExhibitForm;
