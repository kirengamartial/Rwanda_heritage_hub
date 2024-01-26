import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomBox from "react-native-customized-box";
import axios from 'axios';

const ExhibitSchema = yup.object({
  title: yup.string().min(2, 'Too short'),
  description: yup.string().min(5, 'Too short'),
  image: yup.string().url('Invalid URL'),
});

const DetailEdit = ({ route, navigation }) => {
  const { exhibitId } = route.params;
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetchExhibitDetails();
  }, [exhibitId]);

  const fetchExhibitDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.43.194:3000/exhibits/${exhibitId}`);
      const exhibitData = response.data;

      setInitialValues({
        title: exhibitData.title,
        description: exhibitData.description,
        image: exhibitData.image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateExhibit = async (values) => {
    try {
      const response = await axios.put(`http://192.168.43.194:3000/exhibits/${exhibitId}`, values);

      if (response.data.success) {
        console.log('Exhibit updated successfully');
        navigation.navigate('Home'); // Navigate back to the home screen or wherever you want
      } else {
        console.log('Exhibit update failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Exhibit Details</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={ExhibitSchema}
          onSubmit={(values, actions) => {
            handleUpdateExhibit(values);
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
                <Text style={{ color: 'white' }}>Update Exhibit</Text>
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

export default DetailEdit;
