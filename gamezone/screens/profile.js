import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import CustomBox from "react-native-customized-box";
import axios from 'axios';

const ProfileSchema = yup.object({
  firstName: yup.string().min(2, "Too short"),
  lastName: yup.string().min(2, "Too short"),
  useremail: yup.string().email("Invalid email address"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});


const Profile = ({ navigation }) => {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    useremail: "",
    password: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://192.168.43.194:3000/get-username', {
        credentials: 'include',
      });

      const userData = response.data;

      setInitialValues({
        firstName: userData.firstname,
        lastName: userData.lastname,
        useremail: userData.useremail,
        password: "", 
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileUpdate = async (values) => {
    try {
      const response = await axios.post('http://192.168.43.194:3000/update-user', {
        firstname: values.firstName,
        lastname: values.lastName,
        useremail: values.useremail,
        password: values.password,
      });
  
      if (response.data.success) {
        console.log("Profile updated successfully");
  
        setInitialValues({
          ...initialValues,
          firstName: values.firstName,
          lastName: values.lastName,
          useremail: values.useremail,
          password: values.password,
        });
  
        navigation.navigate('Home');
      } else {
        console.log("Profile update failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.header}>Update Profile</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={(values, actions) => {
            handleProfileUpdate(values);
            actions.resetForm();
          }}
        >
          {(props) => (
            <View>
              <CustomBox
                placeholder={"First Name"}
                boxColor={"silver"}
                focusColor={"#e07964"}
                boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                inputStyle={{
                  fontWeight: "bold",
                  color: "#30302e",
                  paddingLeft: 20,
                  borderRadius: 40,
                }}
                onChangeText={props.handleChange("firstName")}
                value={props.values.firstName}
                onBlur={props.handleBlur("firstName")}
                labelConfig={{
                  text: "First Name",
                  style: {
                    color: "#0e0e21",
                    fontWeight: "bold",
                  },
                }}
                requiredConfig={{
                  text: props.touched.firstName && props.errors.firstName,
                  style: {
                    marginBottom: 10,
                    color: "red",
                  },
                }}
              />

              <CustomBox
                placeholder={"Last Name"}
                boxColor={"silver"}
                focusColor={"#e07964"}
                boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                inputStyle={{
                  fontWeight: "bold",
                  color: "#30302e",
                  paddingLeft: 20,
                  borderRadius: 40,
                }}
                onChangeText={props.handleChange("lastName")}
                value={props.values.lastName}
                onBlur={props.handleBlur("lastName")}
                labelConfig={{
                  text: "Last Name",
                  style: {
                    color: "#0e0e21",
                    fontWeight: "bold",
                  },
                }}
                requiredConfig={{
                  text: props.touched.lastName && props.errors.lastName,
                  style: {
                    marginBottom: 10,
                    color: "red",
                  },
                }}
              />

              <CustomBox
                placeholder={"Email"}
                boxColor={"silver"}
                focusColor={"#e07964"}
                type={"email"}
                boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                inputStyle={{
                  fontWeight: "bold",
                  color: "#30302e",
                  paddingLeft: 20,
                  borderRadius: 40,
                }}
                onChangeText={props.handleChange("useremail")}
                value={props.values.useremail}
                onBlur={props.handleBlur("useremail")}
                labelConfig={{
                  text: "Email",
                  style: {
                    color: "#0e0e21",
                    fontWeight: "bold",
                  },
                }}
                requiredConfig={{
                  text: props.touched.email && props.errors.email,
                  style: {
                    marginBottom: 10,
                    color: "red",
                  },
                }}
              />

              <CustomBox
                placeholder={"Password"}
                boxColor={"silver"}
                focusColor={"#e07964"}
                boxStyle={{ borderRadius: 40, borderWidth: 2 }}
                inputStyle={{
                  fontWeight: "bold",
                  color: "#30302e",
                  paddingLeft: 20,
                  borderRadius: 40,
                  overflow: "hidden",
                }}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
                labelConfig={{
                  text: "Password",
                  style: {
                    color: "#0e0e21",
                    fontWeight: "bold",
                  },
                }}
                toggle={true}
                requiredConfig={{
                  text: props.touched.password && props.errors.password,
                  style: {
                    marginBottom: 10,
                    color: "red",
                  },
                }}
              />

              <TouchableOpacity style={styles.updateBtn} onPress={props.handleSubmit}>
                <Text style={{ color: "white" }}>Update Profile</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 25,
  },
  updateBtn: {
    marginTop: 10,
    backgroundColor: "#e65c40",
    width: 300,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    flexDirection: "row",
  },
});

export default Profile;
