import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import CustomBox from "react-native-customized-box";
import axios from 'axios';

const RegisterSchema = yup.object({
  firstName: yup.string().required("First Name is required").min(2, "Too short"),
  lastName: yup.string().required("Last Name is required").min(2, "Too short"),
  useremail: yup.string().required("Email is required").email("Invalid email address"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export default function Register({ navigation }) {
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.header}>Create Account</Text>
        <Image
          style={styles.registerImage}
          source={{
            uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/register.png",
          }}
        />

        <Formik
          initialValues={{ firstName: "", lastName: "", useremail: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={(values, actions) => {
            axios.post('http://192.168.1.64:3000/register',{
              firstname: values.firstName,
              lastname: values.lastName,
              useremail: values.useremail,
              password: values.password,
            })
              .then(response => {
                navigation.navigate('Explore');
              })
              .catch(error => {
                console.error(error);
              });
    
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
                labelConfig={{
                  text: "First Name",
                  style: {
                    color: "#0e0e21",
                    fontWeight: "bold",
                  },
                }}
                onChangeText={props.handleChange("firstName")}
                value={props.values.firstName}
                onBlur={props.handleBlur("firstName")}
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
                labelConfig={{
                  text: "Last Name",
                  style: {
                    color: "#0e0e21",
                    fontWeight: "bold",
                  },
                }}
                onChangeText={props.handleChange("lastName")}
                value={props.values.lastName}
                onBlur={props.handleBlur("lastName")}
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
                labelConfig={{
                  text: "Email",
                  style: {
                    color: "#0e0e21",
                    fontWeight: "bold",
                  },
                }}
                onChangeText={props.handleChange("useremail")}
                value={props.values.useremail}
                onBlur={props.handleBlur("useremail")}
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
                labelConfig={{
                  text: "Password",
                  style: {
                    color: "#0e0e21",
                    fontWeight: "bold",
                  },
                }}
                toggle={true}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
                requiredConfig={{
                  text: props.touched.password && props.errors.password,
                  style: {
                    marginBottom: 10,
                    color: "red",
                  },
                }}
              />

              <TouchableOpacity style={styles.registerbtn} onPress={props.handleSubmit}>
                <Text style={{color: "white"}}>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={styles.createAccount}>
        <Text style={styles.createAccountText}>Already have an Account? </Text>
        <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate("Siginin")}>
          <Text style={styles.registerBtnText}>Login</Text>
        </TouchableOpacity>
      </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  registerImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  header: {
    fontSize: 25,
  },
  registerbtn: {
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
  registerBtnText: {
    color: "white",
    fontSize: 22,
  },
  createAccount: {
    marginTop:-40,
    width: 280,
    marginBottom: 20,
    height: 20,
    flexDirection: "row",
  },
  createAccountText: {
    color: "grey",
  },
  registerBtn: {},
  registerBtnText: {
    color: "#e65c40",
    textDecorationLine: "underline",
  },
});
